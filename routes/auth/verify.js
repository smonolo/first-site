const router = require('express').Router();
const jwt = require('jsonwebtoken');

router.post('/', (req, res) => {
  if (req.body.auth && req.body.auth === 'authVerify') {
    if (!req.body.jwt) {
      return res.json({ success: false });
    }

    jwt.verify(req.body.jwt, process.env.STEMON_JWT_TOKEN, (err, result) => {
      if (result && !err) {
        res.json({
          success: true,
          payload: {
            jwt: req.body.jwt,
            id: result.id,
            username: result.username,
            email: result.email,
            siteAdmin: result.siteAdmin
          }
        });
      } else {
        res.json({ success: false });
      }
    });
  } else {
    res.json({ success: false });
  }
});

module.exports = router;