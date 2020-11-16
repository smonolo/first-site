const router = require('express').Router();
const sha1 = require('sha1');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const validator = require('validator');

const User = require('mongoose').model('user');

const { allowedUsernameChars, allowedEmailChars, allowedPasswordChars } = require('../../../app');

router.post('/', async (req, res) => {
  if (!req.body.auth || req.body.auth !== 'authRegister') {
    return res.json({ success: false });
  }

  if (!req.body.type || !req.body.payload) {
    return res.json({ success: false });
  }

  if (req.body.type === 'register') {
    if (
      !req.body.payload.username ||
      !req.body.payload.email ||
      !req.body.payload.password ||
      !req.body.payload.repeatPassword
    ) {
      return res.json({ success: false });
    }

    const username = validator.unescape(validator.trim(req.body.payload.username));
    const email = validator.unescape(validator.trim(req.body.payload.email));
    const password = validator.unescape(validator.trim(req.body.payload.username));
    const repeatPassword = validator.unescape(validator.trim(req.body.payload.username));

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
      return res.json({ success: false });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false });
    }

    if (
      !username.match(allowedUsernameChars) ||
      !email.match(allowedEmailChars) ||
      !password.match(allowedPasswordChars) ||
      !repeatPassword.match(allowedPasswordChars)
    ) {
      return res.json({ success: false });
    }

    if (sha1(password) !== sha1(repeatPassword)) {
      return res.json({ success: false });
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
      return res.json({ success: false });
    }

    if (user) {
      return res.json({ success: false });
    }

    const id = uuid.v4();
    const finalEmail = email.toLowerCase();
    const finalPassword = sha1(password);

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
      return res.json({ success: false });
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
    return res.json({ success: false });
  }
});

module.exports = router;