const router = require('express').Router();
const validator = require('validator');

const User = require('mongoose').model('user');

const { allowedUsernameChars } = require('../../app');

router.post('/', async (req, res) => {
  if (!req.body.auth || req.body.auth !== 'profile') {
    return res.json({
      success: false,
      error: 'invalid request'
    });
  }

  if (!req.body.type || !req.body.payload) {
    return res.json({
      success: false,
      error: 'invalid request'
    });
  }

  if (req.body.type === 'getProfile') {
    if (!req.body.payload.username) {
      return res.json({
        success: false,
        error: 'username is missing'
      });
    }

    const username = validator.unescape(validator.trim(req.body.payload.username));

    if (username.length < 3 || username.length > 15) {
      return res.json({
        success: false,
        error: 'username length is invalid'
      });
    }

    if (!username.match(allowedUsernameChars)) {
      return res.json({
        success: false,
        error: 'username contains invalid characters'
      });
    }

    let user;

    try {
      user = await User.findOne({
        username: username
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

    return res.json({
      success: true,
      payload: {
        username: user.username,
        email: user.email,
        siteAdmin: user.siteAdmin
      }
    });
  } else {
    return res.json({
      success: false,
      error: 'invalid request'
    });
  }
});

module.exports = router;