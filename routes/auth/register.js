const router = require('express').Router();
const sha1 = require('sha1');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');

const User = require('mongoose').model('user');

router.post('/', async (req, res) => {
  if (req.body.auth && req.body.auth === 'authRegister') {
    if (!req.body.username || !req.body.email || !req.body.password || !req.body.repeatPassword) {
      return res.json({ success: false });
    }

    if (req.body.username.length < 3 || req.body.username.length > 15) {
      return res.json({ success: false });
    }

    if (req.body.password.length < 8 || req.body.password.length > 1024) {
      return res.json({ success: false });
    }

    if (req.body.repeatPassword.length < 8 || req.body.repeatPassword.length > 1024) {
      return res.json({ success: false });
    }

    if (sha1(req.body.password) !== sha1(req.body.repeatPassword)) {
      return res.json({ success: false });
    }

    let dbUserCount;

    try {
      dbUserCount = await User.countDocuments({
        $or: [
          { username: req.body.username },
          { email: req.body.username.toLowerCase() }
        ]
      });
    } catch (error) {
      return res.json({ success: false });
    }

    if (!dbUserCount && dbUserCount === 0) {
      const userDoc = {
        _id: uuid.v4(),
        username: req.body.username,
        email: req.body.email.toLowerCase(),
        password: sha1(req.body.password),
        siteAdmin: false
      };

      try {
        await User.create(userDoc);
      } catch (error) {
        return res.json({ success: false });
      }

      const jwtContent = {
        id: userDoc._id,
        username: userDoc.username,
        email: userDoc.email,
        siteAdmin: userDoc.siteAdmin
      };
      const jwtValue = jwt.sign(jwtContent, process.env.STEMON_JWT_TOKEN);

      res.json({
        success: true,
        payload: {
          jwt: jwtValue,
          ...jwtContent
        }
      });
    } else {
      res.json({ success: false });
    }
  } else {
    res.json({ success: false });
  }
});

module.exports = router;