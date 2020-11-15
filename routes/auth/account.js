const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('mongoose').model('user');

router.post('/', (req, res) => {
  if (req.body.auth && req.body.auth === 'authAccount') {
    if (req.body.type) {
      if (req.body.type === 'deleteAccount') {
        if (!req.body.username || !req.body.propsUsername || !req.body.jwt) {
          return res.json({ success: false });
        }

        if (req.body.username.length < 3 || req.body.username.length > 15) {
          return res.json({ success: false });
        }

        if (req.body.propsUsername.length < 3 || req.body.propsUsername.length > 15) {
          return res.json({ success: false });
        }

        if (req.body.username !== req.body.propsUsername) {
          return res.json({ success: false });
        }

        if (req.body.siteAdmin) {
          return res.json({ success: false });
        }

        jwt.verify(req.body.jwt, process.env.STEMON_JWT_TOKEN, async (err, result) => {
          if (result && !err) {
            if (req.body.username !== result.username || req.body.propsUsername !== result.username) {
              return res.json({ success: false });
            }

            let dbUser;

            try {
              dbUser = await User.findOneAndDelete({ username: req.body.username }).select('_id');
            } catch (error) {
              return res.json({ success: false });
            }

            if (dbUser) {
              res.json({ success: true });
            } else {
              res.json({ success: false });
            }
          } else {
            res.json({ success: false });
          }
        });
      } else {
        res.json({ success: false });
      }
    } else {
      res.json({ success: false });
    }
  } else {
    res.json({ success: false });
  }
});

module.exports = router;