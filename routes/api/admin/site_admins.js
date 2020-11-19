const router = require('express').Router();
const jwt = require('jsonwebtoken');
const validator = require('validator');

const User = require('mongoose').model('user');

const { allowedEmailChars } = require('../../../app');
const { error, internalError, invalidRequest } = require('../helpers');

router.post('/', async (req, res) => {
  if (!req.body.auth || req.body.auth !== 'adminSiteAdmins') {
    return invalidRequest(res);
  }

  if (!req.body.payload || !req.body.payload.jwt) {
    return invalidRequest(res);
  }

  try {
    jwt.verify(req.body.payload.jwt, process.env.STEMON_JWT_TOKEN, async (err, result) => {
      if (err || !result.siteAdmin) {
        return error(res, 'not authorized');
      }

      if (!req.body.type) {
        return invalidRequest(res);
      }

      if (['assignSiteAdmin', 'revokeSiteAdmin'].includes(req.body.type)) {
        if (!req.body.payload.username) {
          return error(res, 'username is missing');
        }

        const username = validator.unescape(validator.trim(req.body.payload.username));

        if (username.length < 3 || username.length > 320) {
          return error(res, 'username length is invalid');
        }

        if (!username.match(allowedEmailChars)) {
          return error(res, 'username contains invalid characters');
        }

        let user;

        try {
          user = await User.findOneAndUpdate({
            $or: [
              { username },
              { email: username.toLowerCase() }
            ]
          }, {
            $set: {
              siteAdmin: req.body.type === 'assignSiteAdmin'
            }
          }, {
            useFindAndModify: false
          }).select('_id');
        } catch (error) {
          return internalError(res);
        }

        if (!user) {
          return error(res, 'could not find user');
        }

        return res.json({ success: true });
      } else {
        return invalidRequest(res);
      }
    });
  } catch (error) {
    return internalError(res);
  }
});

module.exports = router;