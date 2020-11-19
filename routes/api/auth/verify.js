const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('mongoose').model('user');

const { error, internalError, invalidRequest } = require('../helpers');

router.post('/', (req, res) => {
  if (!req.body.auth || req.body.auth !== 'authVerify') {
    return invalidRequest(res);
  }

  if (!req.body.type || !req.body.payload || !req.body.payload.jwt) {
    return invalidRequest(res);
  }

  try {
    jwt.verify(req.body.payload.jwt, process.env.STEMON_JWT_TOKEN, async (err, result) => {
      if (err) {
        return internalError(res);
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
            return internalError(res);
          }

          if (!user) {
            return error(res, 'could not find user');
          }

          if (result.id !== user._id) {
            return error(res, 'invalid user');
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
          return invalidRequest(res);
        }
      } else {
        return invalidRequest(res);
      }
    });
  } catch (error) {
    return internalError(res);
  }
});

module.exports = router;