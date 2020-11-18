const router = require('express').Router();
const gitLastCommit = require('git-last-commit');

router.post('/', async (req, res) => {
  if (!req.body.auth || req.body.auth !== 'app') {
    return res.json({
      success: false,
      error: 'invalid request'
    });
  }

  if (!req.body.type) {
    return res.json({
      success: false,
      error: 'invalid request'
    });
  }

  if (req.body.type === 'getGitCommit') {
    try {
      gitLastCommit.getLastCommit((error, commit) => {
        if (error) {
          return res.json({
            success: false,
            error: 'could not parse commit info'
          });
        }

        if (commit) {
          return res.json({
            success: true,
            payload: {
              gitCommit: {
                shortHash: commit.shortHash,
                committer: {
                  name: commit.committer.name,
                  email: commit.committer.email
                },
                branch: commit.branch
              }
            }
          });
        } else {
          return res.json({
            success: false,
            error: 'could not parse commit info'
          });
        }
      })
    } catch (error) {
      return res.json({
        success: false,
        error: 'internal error'
      });
    }
  } else {
    return res.json({
      success: false,
      error: 'invalid request'
    });
  }
});

module.exports = router;