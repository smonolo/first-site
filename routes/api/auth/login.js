const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const User = require('mongoose').model('user');

const { allowedEmailChars, allowedPasswordChars } = require('../../../app');

router.post('/', async (req, res) => {
  if (!req.body.auth || req.body.auth !== 'authLogin') {
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

  if (req.body.type === 'login') {
    if (!req.body.payload.username || !req.body.payload.password) {
      return res.json({
        success: false,
        error: 'username or password is missing'
      });
    }

    const username = validator.unescape(validator.trim(req.body.payload.username));
    const password = validator.unescape(validator.trim(req.body.payload.password));

    if (
      username.length < 3 ||
      username.length > 320 ||
      password.length < 8 ||
      password.length > 1024
    ) {
      return res.json({
        success: false,
        error: 'username or password length is invalid'
      });
    }

    if (
      !username.match(allowedEmailChars) ||
      !password.match(allowedPasswordChars)
    ) {
      return res.json({
        success: false,
        error: 'username or password includes invalid characters'
      });
    }

    let user;

    try {
      user = await User.findOne({
        $or: [
          { username },
          { email: username.toLowerCase() }
        ]
      }).select('_id username email password siteAdmin');
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

    if (!bcrypt.compareSync(password, user.password)) {
      return res.json({
        success: false,
        error: 'password is invalid'
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

module.exports = router;