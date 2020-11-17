const router = require('express').Router();
const jwt = require('jsonwebtoken');
const validator = require('validator');

const User = require('mongoose').model('user');

const { allowedEmailChars } = require('../../../app');

router.post('/', async (req, res) => {
  if (!req.body.auth || req.body.auth !== 'adminSiteAdmins') {
    return res.json({
      success: false,
      error: 'invalid request'
    });
  }

  if (!req.body.payload || !req.body.payload.jwt) {
    return res.json({
      success: false,
      error: 'invalid request'
    });
  }

  try {
    jwt.verify(req.body.payload.jwt, process.env.STEMON_JWT_TOKEN, async (error, result) => {
      if (error || !result.siteAdmin) {
        return res.json({
          success: false,
          error: 'not authorized'
        });
      }

      if (!req.body.type) {
        return res.json({
          success: false,
          error: 'invalid request'
        });
      }

      if (['assignSiteAdmin', 'revokeSiteAdmin'].includes(req.body.type)) {
        if (!req.body.payload.username) {
          return res.json({
            success: false,
            error: 'username is missing'
          });
        }

        const username = validator.unescape(validator.trim(req.body.payload.username));

        if (username.length < 3 || username.length > 320) {
          return res.json({
            success: false,
            error: 'username length is invalid'
          });
        }

        if (!username.match(allowedEmailChars)) {
          return res.json({
            success: false,
            error: 'username contains invalid characters'
          });
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
          return res.json({
            success: false,
            error: 'internal error'
          });
        }

        if (!user) {
          return res.json({
            success: false,
            error: 'could not find user'
          });
        }

        return res.json({ success: true });
      } else {
        return res.json({
          success: false,
          error: 'invalid request'
        });
      }
    });
  } catch (error) {
    return res.json({
      success: false,
      error: 'internal error'
    });
  }
});

module.exports = router;