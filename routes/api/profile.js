const router = require('express').Router();

const User = require('mongoose').model('user');

router.post('/', async (req, res) => {
  if (!req.body.auth || req.body.auth !== 'profile') {
    return res.json({ success: false });
  }

  if (!req.body.type || !req.body.payload) {
    return res.json({ success: false });
  }

  if (req.body.type === 'getProfile') {
    let user;

    try {
      user = await User.findOne({
        username: req.body.payload.username
      }).select('_id username email siteAdmin');
    } catch (error) {
      return res.json({ success: false });
    }

    if (!user) {
      return res.json({ success: false });
    }

    return res.json({
      success: true,
      payload: {
        username: user.username,
        email: user.email,
        siteAdmin: user.siteAdmin
      }
    });
  } else {
    return res.json({ success: false });
  }
});

module.exports = router;