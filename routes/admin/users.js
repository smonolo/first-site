const router = require('express').Router();

const User = require('mongoose').model('user');

router.post('/', async (req, res) => {
  if (req.body.auth && req.body.auth === 'adminUsers') {
    if (req.body.type) {
      if (req.body.type === 'getList') {
        let dbList;

        try {
          dbList = await User.find({}).select('email').lean();
        } catch (error) {
          res.json({ success: false });
        }

        if (dbList) {
          const users = [];

          dbList.forEach(user => users.push(user.email));

          res.json({
            success: true,
            payload: {
              users
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
  } else {
    res.json({ success: false });
  }
});

module.exports = router;