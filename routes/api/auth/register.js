const router = require('express').Router();
const sha1 = require('sha1');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');

const User = require('mongoose').model('user');

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

    if (
      req.body.payload.username.length < 3 ||
      req.body.payload.username.length > 15 ||
      req.body.payload.email.length < 5 ||
      req.body.payload.password.length < 8 ||
      req.body.payload.password.length > 1024 ||
      req.body.payload.repeatPassword.length < 8 ||
      req.body.payload.repeatPassword.length > 1024
    ) {
      return res.json({ success: false });
    }

    if (sha1(req.body.payload.password) !== sha1(req.body.payload.repeatPassword)) {
      return res.json({ success: false });
    }

    let user;

    try {
      user = await User.exists({
        $or: [
          { username: req.body.payload.username },
          { email: req.body.payload.email.toLowerCase() }
        ]
      });
    } catch (error) {
      return res.json({ success: false });
    }

    if (user) {
      return res.json({ success: false });
    }

    const id = uuid.v4();
    const email = req.body.payload.email.toLowerCase();
    const password = sha1(req.body.payload.password);

    const userDocument = {
      _id: id,
      username: req.body.payload.username,
      email,
      password,
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
      email,
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