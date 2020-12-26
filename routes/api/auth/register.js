const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const validator = require('validator');

const User = require('mongoose').model('user');

const { allowedUsernameChars, allowedEmailChars, allowedPasswordChars } = require('../../../app');
const { error, internalError, invalidRequest } = require('../helpers');

router.post('/', async (req, res) => {
  if (!req.body.auth || req.body.auth !== 'authRegister') {
    return invalidRequest(res);
  }

  if (!req.body.type || !req.body.payload) {
    return invalidRequest(res);
  }

  if (req.body.type === 'register') {
    if (
      !req.body.payload.username ||
      !req.body.payload.email ||
      !req.body.payload.password ||
      !req.body.payload.repeatPassword
    ) {
      return error(res, 'username, email or password is missing');
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
      return error(res, 'username, email or password length is invalid');
    }

    if (!validator.isEmail(email)) {
      return error(res, 'email is invalid');
    }

    if (
      !username.match(allowedUsernameChars) ||
      !email.match(allowedEmailChars) ||
      !password.match(allowedPasswordChars) ||
      !repeatPassword.match(allowedPasswordChars)
    ) {
      return error(res, 'username, email or password includes invalid characters');
    }

    if (password !== repeatPassword) {
      return error(res, 'passwords do not match');
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
      return internalError(res);
    }

    if (user) {
      return error(res, 'could not find user');
    }

    const id = uuid.v4();
    const finalEmail = email.toLowerCase();
    const finalPassword = bcrypt.hashSync(password, 15);

    const userDocument = {
      _id: id,
      username,
      email: finalEmail,
      password: finalPassword,
      siteAdmin: false,
      banned: false
    };

    try {
      await User.create(userDocument);
    } catch (error) {
      return internalError(res);
    }

    const jwtContent = {
      id,
      username: userDocument.username,
      email: finalEmail,
      siteAdmin: userDocument.siteAdmin,
      banned: userDocument.banned
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