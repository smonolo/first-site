const router = require('express').Router();
const jwt = require('jsonwebtoken');
const validator = require('validator');

const User = require('mongoose').model('user');

const { allowedEmailChars } = require('../../../app');
const { error, internalError, invalidRequest } = require('../helpers');

router.post('/', async (req, res) => {
  if (!req.body.auth || req.body.auth !== 'adminUsers') {
    return invalidRequest(res);
  }

  if (!req.body.payload || !req.body.payload.jwt) {
    return invalidRequest(res);
  }

  try {
    jwt.verify(req.body.payload.jwt, process.env.STEMON_JWT_TOKEN, async (err, result) => {
      if (err || !result.siteAdmin || result.banned) {
        return error(res, 'not authorized');
      }

      if (!req.body.type) {
        return invalidRequest(res);
      }

      if (req.body.type === 'getEmailsList') {
        let users;

        try {
          users = await User.find({}).select('username email siteAdmin banned').lean();
        } catch (err) {
          return internalError(res);
        }

        if (!users) {
          return error(res, 'could not parse users');
        }

        return res.json({
          success: true,
          payload: {
            users
          }
        });
      } else if (req.body.type === 'deleteUser') {
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
          user = await User.findOneAndDelete({
            $or: [
              { username },
              { email: username.toLowerCase() }
            ]
          }).select('_id');
        } catch (err) {
          return internalError(res);
        }

        if (!user) {
          return error(res, 'could not find user');
        }

        return res.json({ success: true });
      } else if (req.body.type === 'loginAsUser') {
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
          user = await User.findOne({
            $or: [
              { username },
              { email: username.toLowerCase() }
            ]
          }).select('_id username email siteAdmin banned');
        } catch (error) {
          return internalError(res);
        }

        if (!user) {
          return error(res, 'could not find user');
        }

        const jwtContent = {
          id: user._id,
          username: user.username,
          email: user.email,
          siteAdmin: user.siteAdmin,
          banned: user.banned
        };

        const jwtValue = jwt.sign(jwtContent, process.env.STEMON_JWT_TOKEN);

        return res.json({
          success: true,
          payload: {
            jwt: jwtValue,
            ...jwtContent
          }
        });
      } else if (req.body.type === 'banUser') {
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
              siteAdmin: false,
              banned: true
            }
          }).select('_id');
        } catch (err) {
          return internalError(res);
        }

        if (!user) {
          return error(res, 'could not find user');
        }

        return res.json({ success: true });
      } else if (req.body.type === 'unbanUser') {
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
              banned: false
            }
          }).select('_id');
        } catch (err) {
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