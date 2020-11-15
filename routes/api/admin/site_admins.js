const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('mongoose').model('user');

router.post('/', async (req, res) => {
  if (!req.body.auth || req.body.auth !== 'adminSiteAdmins') {
    return res.json({ success: false });
  }

  if (!req.body.payload || !req.body.payload.jwt) {
    return res.json({ success: false });
  }

  jwt.verify(req.body.payload.jwt, process.env.STEMON_JWT_TOKEN, async (error, result) => {
    if (error || !result.siteAdmin) {
      return res.json({ success: false });
    }

    if (!req.body.type) {
      return res.json({ success: false });
    }

    if (['assignSiteAdmin', 'revokeSiteAdmin'].includes(req.body.type)) {
      let user;

      try {
        user = await User.findOneAndUpdate({
          $or: [
            { username: req.body.payload.username },
            { email: req.body.payload.username.toLowerCase() }
          ]
        }, {
          $set: {
            siteAdmin: req.body.type === 'assignSiteAdmin'
          }
        }, {
          useFindAndModify: false
        }).select('_id');
      } catch (error) {
        return res.json({ success: false });
      }

      if (!user) {
        return res.json({ success: false });
      }

      return res.json({ success: true });
    } else {
      return res.json({ success: false });
    }
  });
});

module.exports = router;