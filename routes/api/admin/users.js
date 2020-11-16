const router = require('express').Router();
const jwt = require('jsonwebtoken');
const validator = require('validator');

const User = require('mongoose').model('user');

const { allowedEmailChars } = require('../../../app');

router.post('/', async (req, res) => {
  if (!req.body.auth || req.body.auth !== 'adminUsers') {
    return res.json({ success: false });
  }

  if (!req.body.payload || !req.body.payload.jwt) {
    res.json({ success: false });
  }

  jwt.verify(req.body.payload.jwt, process.env.STEMON_JWT_TOKEN, async (error, result) => {
    if (error || !result.siteAdmin) {
      return res.json({ success: false });
    }

    if (!req.body.type) {
      return res.json({ success: false });
    }

    if (req.body.type === 'getEmailsList') {
      let emailsList;

      try {
        emailsList = await User.find({}).select('email').lean();
      } catch (error) {
        return res.json({ success: false });
      }

      if (!emailsList) {
        return res.json({ success: false });
      }

      return res.json({
        success: true,
        payload: {
          users: emailsList.map(user => user.email)
        }
      });
    } else if (req.body.type === 'deleteUser') {
      if (!req.body.payload.username) {
        return res.json({ success: false });
      }

      const username = validator.unescape(validator.trim(req.body.payload.username));

      if (username.length < 3 || username.length > 320) {
        return res.json({ success: false });
      }

      if (!username.match(allowedEmailChars)) {
        return res.json({ success: false });
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
});

module.exports = router;