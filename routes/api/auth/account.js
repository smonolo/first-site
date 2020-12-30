const router = require('express').Router();
const jwt = require('jsonwebtoken');
const validator = require('validator');

const User = require('mongoose').model('user');

const { allowedUsernameChars, allowedEmailChars, disallowedUsernames } = require('../../../app');
const { error, internalError, invalidRequest } = require('../helpers');

router.post('/', (req, res) => {
  if (!req.body.auth || req.body.auth !== 'authAccount') {
    return invalidRequest(res);
  }

  if (!req.body.payload || !req.body.payload.jwt) {
    return invalidRequest(res);
  }

  try {
    jwt.verify(req.body.payload.jwt, process.env.STEMON_JWT_TOKEN, async (err, result) => {
      if (err) {
        return internalError(res);
      }

      if (!req.body.type) {
        return invalidRequest(res);
      }

      if (req.body.type === 'deleteAccount') {
        if (!req.body.payload.username) {
          return error(res, 'username is missing');
        }

        const username = validator.unescape(validator.trim(req.body.payload.username));

        if (username.length < 3 || username.length > 15) {
          return error(res, 'username length is invalid');
        }

        if (!username.match(allowedUsernameChars)) {
          return error(res, 'username contains invalid characters');
        }

        if (result.username !== username) {
          return error(res, 'username is invalid');
        }

        if (result.siteAdmin) {
          return error(res, 'cannot delete account as site admin');
        }

        let user;

        try {
          user = await User.findOneAndDelete({ username }).select('_id');
        } catch (error) {
          return internalError(res);
        }

        if (!user) {
          return error(res, 'could not find user');
        }

        return res.json({ success: true });
      } else if (req.body.type === 'updateUsername') {
        if (!req.body.payload.username) {
          return error(res, 'username is missing');
        }

        const username = validator.unescape(validator.trim(req.body.payload.username));

        if (username.length < 3 || username.length > 15) {
          return error(res, 'username length is invalid');
        }

        if (!username.match(allowedUsernameChars)) {
          return error(res, 'username contains invalid characters');
        }

        if (disallowedUsernames.includes(username)) {
          return error(res, 'username is not allowed');
        }

        if (result.username === username) {
          return error(res, 'username is invalid');
        }

        let user;

        try {
          user = await User.findOneAndUpdate({
            _id: result.id
          }, {
            $set: {
              username
            }
          }, {
            useFindAndModify: false
          }).select('_id');
        } catch (error) {
          return internalError(res);
        }

        if (!user) {
          return error(res, 'could not find user');
        }

        return res.json({ success: true });
      }  else if (req.body.type === 'updateEmail') {
        if (!req.body.payload.email) {
          return error(res, 'email is missing');
        }

        const email = validator.unescape(validator.trim(req.body.payload.email));

        if (email.length < 5 || email.length > 320) {
          return error(res, 'email length is invalid');
        }

        if (!email.match(allowedEmailChars)) {
          return error(res, 'email contains invalid characters');
        }

        if (!validator.isEmail(email)) {
          return error(res, 'email is invalid');
        }

        if (result.email === email) {
          return error(res, 'email is invalid');
        }

        let user;

        try {
          user = await User.findOneAndUpdate({
            _id: result.id
          }, {
            $set: {
              email
            }
          }, {
            useFindAndModify: false
          }).select('_id');
        } catch (error) {
          return internalError(res);
        }

        if (!user) {
          return error(res, 'could not find user');
        }

        return res.json({ success: true });
      } else {
        return invalidRequest(res);
      }
    });
  } catch (error) {
    return internalError(res);
  }
});

module.exports = router;