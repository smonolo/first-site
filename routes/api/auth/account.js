const router = require('express').Router();
const jwt = require('jsonwebtoken');
const validator = require('validator');

const User = require('mongoose').model('user');

const { allowedUsernameChars } = require('../../../app');

router.post('/', (req, res) => {
  if (!req.body.auth || req.body.auth !== 'authAccount') {
    return res.json({ success: false });
  }

  if (!req.body.payload || !req.body.payload.jwt) {
    res.json({ success: false });
  }

  try {
    jwt.verify(req.body.payload.jwt, process.env.STEMON_JWT_TOKEN, async (error, result) => {
      if (error) {
        return res.json({ success: false });
      }

      if (!req.body.type) {
        return res.json({ success: false });
      }

      if (req.body.type === 'deleteAccount') {
        if (!req.body.payload.username) {
          return res.json({ success: false });
        }

        const username = validator.unescape(validator.trim(req.body.payload.username));

        if (username.length < 3 || username.length > 15) {
          return res.json({ success: false });
        }

        if (!username.match(allowedUsernameChars)) {
          return res.json({ success: false });
        }

        if (result.username !== username) {
          return res.json({ success: false });
        }

        if (result.siteAdmin) {
          return res.json({ success: false });
        }

        let user;

        try {
          user = await User.findOneAndDelete({ username }).select('_id');
        } catch (error) {
          return res.json({ success: false });
        }

        if (!user) {
          return res.json({ success: false });
        }

        return res.json({ success: true });
      } else if (req.body.type === 'updateUsername') {
        if (!req.body.payload.username) {
          return res.json({ success: false });
        }

        const username = validator.unescape(validator.trim(req.body.payload.username));

        if (username.length < 3 || username.length > 15) {
          return res.json({ success: false });
        }

        if (!username.match(allowedUsernameChars)) {
          return res.json({ success: false });
        }

        if (result.username === username) {
          return res.json({ success: false });
        }

        let user;

        try {
          user = await User.findOneAndUpdate({
            _id: result.id
          }, {
            $set: {
              username
            }
          }, {
            useFindAndModify: false
          }).select('_id');
        } catch (error) {
          return res.json({ success: false });
        }

        if (!user) {
          return res.json({ success: false });
        }

        return res.json({ success: true });
      } else {
        return res.json({ success: false });
      }
    });
  } catch (error) {
    res.json({ success: false });
  }
});

module.exports = router;