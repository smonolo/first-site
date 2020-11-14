const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const sha1 = require('sha1');

const app = express();

const production = !process.argv.includes('--dev');

let creds = {};

if (production) {
  fs.readFile('/home/stemon-me/creds.json', 'uf8', (err, data) => {
    if (data && !err) {
       creds = { username, password } = JSON.parse(data);
    } else {
      console.log('Could not read creds.json file');
    }
  });
}

const USERNAME = production ? creds.username : 'dev';
const PASSWORD = production ? creds.password : '34c6fceca75e456f25e7e99531e2425c6c1de443';

app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  next();
});

app.post('/login', (req, res) => {
  const hash = sha1(req.body.password);

  if (req.body.username === USERNAME && hash === PASSWORD) {
    const jwtContent = { username: USERNAME };
    const jwtValue = jwt.sign(jwtContent, process.env.STEMON_JWT_TOKEN);

    res.json({
      success: true,
      payload: {
        jwt: jwtValue,
        ...jwtContent
      }
    });
  } else {
    res.json({ success: false });
  }
});

app.post('/verify', (req, res) => {
  jwt.verify(req.body.jwt, process.env.STEMON_JWT_TOKEN, (err, result) => {
    if (result && !err) {
      res.json({
        success: true,
        payload: {
          jwt: req.body.jwt,
          username: result.username
        }
      });
    } else {
      res.json({ success: false });
    }
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(5034);
console.log('Connected');