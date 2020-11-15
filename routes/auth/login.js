const router = require('express').Router();
const sha1 = require('sha1');
const jwt = require('jsonwebtoken');

const User = require('mongoose').model('user');

router.post('/', async (req, res) => {
  if (req.body.auth && req.body.auth === 'authLogin') {
    if (!req.body.username || !req.body.password) {
      return res.json({ success: false });
    }

    if (req.body.username.length < 3) {
      return res.json({ success: false });
    }

    if (req.body.password.length < 8 || req.body.password.length > 1024) {
      return res.json({ success: false });
    }

    const passwordHash = sha1(req.body.password);

    let dbUser;

    try {
      dbUser = await User.findOne({
        $or: [
          { username: req.body.username },
          { email: req.body.username.toLowerCase() }
        ],
        password: passwordHash
      }).select('_id username email siteAdmin');
    } catch (error) {
      return res.json({ success: false });
    }

    if (dbUser) {
      const jwtContent = {
        id: dbUser._id,
        username: dbUser.username,
        email: dbUser.email,
        siteAdmin: dbUser.siteAdmin
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