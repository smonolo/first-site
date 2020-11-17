const router = require('express').Router();
const jwt = require('jsonwebtoken');
const validator = require('validator');

const User = require('mongoose').model('user');

const { allowedEmailChars } = require('../../../app');

router.post('/', async (req, res) => {
  if (!req.body.auth || req.body.auth !== 'adminUsers') {
    return res.json({
      success: false,
      error: 'invalid request'
    });
  }

  if (!req.body.payload || !req.body.payload.jwt) {
    res.json({
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

      if (req.body.type === 'getEmailsList') {
        let emailsList;

        try {
          emailsList = await User.find({}).select('email').lean();
        } catch (error) {
          return res.json({
            success: false,
            error: 'internal error'
          });
        }

        if (!emailsList) {
          return res.json({
            success: false,
            error: 'could not parse users'
          });
        }

        return res.json({
          success: true,
          payload: {
            users: emailsList.map(user => user.email)
          }
        });
      } else if (req.body.type === 'deleteUser') {
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
          user = await User.findOneAndDelete({
            $or: [
              { username },
              { email: username.toLowerCase() }
            ]
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
      } else if (req.body.type === 'loginAsUser') {
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
          user = await User.findOne({
            $or: [
              { username },
              { email: username.toLowerCase() }
            ]
          }).select('_id username email siteAdmin');
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

        const jwtContent = {
          id: user._id,
          username: user.username,
          email: user.email,
          siteAdmin: user.siteAdmin
        };

        const jwtValue = jwt.sign(jwtContent, process.env.STEMON_JWT_TOKEN);

        return res.json({
          success: true,
          payload: {
            jwt: jwtValue,
            ...jwtContent
          }
        });
      } else {
        return res.json({
          success: false,
          error: 'invalid request'
        });
      }
    });
  } catch (error) {
    res.json({
      success: false,
      error: 'internal error'
    });
  }
});

module.exports = router;