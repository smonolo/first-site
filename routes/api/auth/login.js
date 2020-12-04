const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const User = require('mongoose').model('user');

const { allowedEmailChars, allowedPasswordChars } = require('../../../app');
const { error, internalError, invalidRequest } = require('../helpers');

router.post('/', async (req, res) => {
  if (!req.body.auth || req.body.auth !== 'authLogin') {
    return invalidRequest(res);
  }

  if (!req.body.type || !req.body.payload) {
    return invalidRequest(res);
  }

  if (req.body.type === 'login') {
    if (!req.body.payload.username || !req.body.payload.password) {
      return error(res, 'username or password is missing');
    }

    const username = validator.unescape(validator.trim(req.body.payload.username));
    const password = validator.unescape(validator.trim(req.body.payload.password));

    if (
      username.length < 3 ||
      username.length > 320 ||
      password.length < 8 ||
      password.length > 1024
    ) {
      return error(res, 'username or password length is invalid');
    }

    if (
      !username.match(allowedEmailChars) ||
      !password.match(allowedPasswordChars)
    ) {
      return error(res, 'username or password includes invalid characters');
    }

    let user;

    try {
      user = await User.findOne({
        $or: [
          { username },
          { email: username.toLowerCase() }
        ]
      }).select('_id username email password siteAdmin banned');
    } catch (error) {
      return internalError(res);
    }

    if (!user) {
      return error(res, 'could not find user');
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return error(res, 'password is invalid');
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
  } else {
    return invalidRequest(res);
  }
});

module.exports = router;