const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('mongoose').model('user');

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
    } else {
      return res.json({ success: false });
    }
  });
});

module.exports = router;