const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('mongoose').model('user');

router.post('/', (req, res) => {
  if (!req.body.auth || req.body.auth !== 'authVerify') {
    return res.json({ success: false });
  }

  if (!req.body.type || !req.body.payload || !req.body.payload.jwt) {
    return res.json({ success: false });
  }

  try {
    jwt.verify(req.body.payload.jwt, process.env.STEMON_JWT_TOKEN, async (error, result) => {
      if (error) {
        return res.json({ success: false });
      }

      if (result) {
        if (req.body.type === 'verify') {
          return res.json({
            success: true,
            payload: {
              jwt: req.body.payload.jwt,
              id: result.id,
              username: result.username,
              email: result.email,
              siteAdmin: result.siteAdmin
            }
          });
        } else if (req.body.type === 'refresh') {
          let user;

          try {
            user = await User.findOne({ _id: result.id }).select('_id username email siteAdmin');
          } catch (error) {
            return res.json({ success: false });
          }

          if (!user) {
            return res.json({ success: false });
          }

          if (result.id !== user._id) {
            return res.json({ success: false });
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
          return res.json({ success: false });
        }
      } else {
        return res.json({ success: false });
      }
    });
  } catch (error) {
    return res.json({ success: false });
  }
});

module.exports = router;