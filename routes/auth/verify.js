const router = require('express').Router();
const jwt = require('jsonwebtoken');

router.post('/', (req, res) => {
  if (!req.body.auth || req.body.auth !== 'authVerify') {
    return res.json({ success: false });
  }

  if (!req.body.type || !req.body.payload || !req.body.payload.jwt) {
    return res.json({ success: false });
  }

  if (req.body.type === 'verify') {
    jwt.verify(req.body.payload.jwt, process.env.STEMON_JWT_TOKEN, (error, result) => {
      if (error) {
        return res.json({ success: false });
      }

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
    });
  } else {
    return res.json({ success: false });
  }
});

module.exports = router;