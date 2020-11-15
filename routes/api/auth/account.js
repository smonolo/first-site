const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('mongoose').model('user');

router.post('/', (req, res) => {
  if (!req.body.auth || req.body.auth !== 'authAccount') {
    return res.json({ success: false });
  }

  if (!req.body.payload || !req.body.payload.jwt) {
    res.json({ success: false });
  }

  jwt.verify(req.body.payload.jwt, process.env.STEMON_JWT_TOKEN, async (error, result) => {
    if (error) {
      return res.json({ success: false });
    }

    if (!req.body.type) {
      return res.json({ success: false });
    }

    if (req.body.type === 'deleteAccount') {
      if (result.username !== req.body.payload.username) {
        return res.json({ success: false });
      }

      if (result.siteAdmin) {
        return res.json({ success: false });
      }

      let user;

      try {
        user = await User.findOneAndDelete({
          username: req.body.payload.username
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