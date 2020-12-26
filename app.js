const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const fs = require('fs');
const cors = require('cors');

exports.allowedUsernameChars = /[A-Za-z0-9_]/g;
exports.allowedEmailChars = /[A-Za-z0-9@_.]/g;
exports.allowedPasswordChars = /[A-Za-z0-9/\\{}#,!_@():;.|`$=+\-*[\]^?&~%"']/g;

const app = express();

mongoose.connect(process.env.STEMON_MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to database');
});

fs.readdirSync(path.join(__dirname, 'models')).forEach(model => {
  require(path.join(__dirname, 'models', model));
});
console.log('Loaded database models');

app.use(express.static(path.join(__dirname, 'app', 'build')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/api/auth/login', require('./routes/api/auth/login'));
app.use('/api/auth/register', require('./routes/api/auth/register'));
app.use('/api/auth/verify', require('./routes/api/auth/verify'));
app.use('/api/auth/account', require('./routes/api/auth/account'));

app.use('/api/admin/users', require('./routes/api/admin/users'));
app.use('/api/admin/site-admins', require('./routes/api/admin/site_admins'));

app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/app', require('./routes/api/app'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'app', 'build', 'index.html'));
});

app.listen(57483);
console.log('Connected');