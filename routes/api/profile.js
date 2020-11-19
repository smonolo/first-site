const router = require('express').Router();
const validator = require('validator');

const User = require('mongoose').model('user');

const { allowedUsernameChars } = require('../../app');
const { error, internalError, invalidRequest } = require('./helpers');

router.post('/', async (req, res) => {
  if (!req.body.auth || req.body.auth !== 'profile') {
    return invalidRequest(res);
  }

  if (!req.body.type || !req.body.payload) {
    return invalidRequest(res);
  }

  if (req.body.type === 'getProfile') {
    if (!req.body.payload.username) {
      return error(res, 'username is missing');
    }

    const username = validator.unescape(validator.trim(req.body.payload.username));

    if (username.length < 3 || username.length > 15) {
      return error(res, 'username length is invalid');
    }

    if (!username.match(allowedUsernameChars)) {
      return error(res, 'username contains invalid characters');
    }

    let user;

    try {
      user = await User.findOne({
        username: username
      }).select('_id username email siteAdmin');
    } catch (err) {
      return internalError(res);
    }

    if (!user) {
      return error(res, 'could not find user');
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
    return invalidRequest(res);
  }
});

module.exports = router;