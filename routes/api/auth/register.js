const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const validator = require('validator');

const User = require('mongoose').model('user');

const { allowedUsernameChars, allowedEmailChars, allowedPasswordChars } = require('../../../app');

router.post('/', async (req, res) => {
  if (!req.body.auth || req.body.auth !== 'authRegister') {
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

  if (req.body.type === 'register') {
    if (
      !req.body.payload.username ||
      !req.body.payload.email ||
      !req.body.payload.password ||
      !req.body.payload.repeatPassword
    ) {
      return res.json({
        success: false,
        error: 'username, email or password is missing'
      });
    }

    const username = validator.unescape(validator.trim(req.body.payload.username));
    const email = validator.unescape(validator.trim(req.body.payload.email));
    const password = validator.unescape(validator.trim(req.body.payload.password));
    const repeatPassword = validator.unescape(validator.trim(req.body.payload.repeatPassword));

    if (
      username.length < 3 ||
      username.length > 15 ||
      email.length < 5 ||
      email.length > 320 ||
      password.length < 8 ||
      password.length > 1024 ||
      repeatPassword.length < 8 ||
      repeatPassword.length > 1024
    ) {
      return res.json({
        success: false,
        error: 'username, email or password length is invalid'
      });
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        error: 'email is invalid'
      });
    }

    if (
      !username.match(allowedUsernameChars) ||
      !email.match(allowedEmailChars) ||
      !password.match(allowedPasswordChars) ||
      !repeatPassword.match(allowedPasswordChars)
    ) {
      return res.json({
        success: false,
        error: 'username, email or password includes invalid characters'
      });
    }

    if (password !== repeatPassword) {
      return res.json({
        success: false,
        error: 'passwords do not match'
      });
    }

    let user;

    try {
      user = await User.exists({
        $or: [
          { username },
          { email: email.toLowerCase() }
        ]
      });
    } catch (error) {
      return res.json({
        success: false,
        error: 'internal error'
      });
    }

    if (user) {
      return res.json({
        success: false,
        error: 'could not find user'
      });
    }

    const id = uuid.v4();
    const finalEmail = email.toLowerCase();
    const finalPassword = bcrypt.hashSync(password, 15);

    const userDocument = {
      _id: id,
      username,
      email: finalEmail,
      password: finalPassword,
      siteAdmin: false
    };

    try {
      await User.create(userDocument);
    } catch (error) {
      return res.json({
        success: false,
        error: 'internal error'
      });
    }

    const jwtContent = {
      id,
      username: userDocument.username,
      email: finalEmail,
      siteAdmin: userDocument.siteAdmin
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