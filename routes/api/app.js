const router = require('express').Router();
const gitLastCommit = require('git-last-commit');
const dateformat = require('dateformat');

const { error, internalError, invalidRequest } = require('./helpers');

router.post('/', async (req, res) => {
  if (!req.body.auth || req.body.auth !== 'app') {
    return invalidRequest(res);
  }

  if (!req.body.type) {
    return invalidRequest(res);
  }

  if (req.body.type === 'getGitCommit') {
    try {
      gitLastCommit.getLastCommit((err, commit) => {
        if (err) {
          return error(res, 'could not parse commit info');
        }

        if (commit) {
          return res.json({
            success: true,
            payload: {
              gitCommit: {
                shortHash: commit.shortHash,
                hash: commit.hash,
                subject: commit.subject,
                committedOn: dateformat(new Date(parseInt(commit.committedOn))),
                committer: {
                  name: commit.committer.name,
                  email: commit.committer.email
                },
                branch: commit.branch
              }
            }
          });
        } else {
          return error(res, 'could not parse commit info');
        }
      })
    } catch (error) {
      return internalError(res);
    }
  } else {
    return invalidRequest(res);
  }
});

module.exports = router;