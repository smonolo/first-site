const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const fs = require('fs');

const app = express();

mongoose.connect(process.env.STEMON_MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
console.log('Connected to database');

fs.readdirSync(path.join(__dirname, 'models')).forEach(model => {
  require(path.join(__dirname, 'models', model));
});
console.log('Loaded database models');

app.use(express.static(path.join(__dirname, 'app', 'build')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  next();
});

app.use('/auth/login', require('./routes/auth/login'));
app.use('/auth/verify', require('./routes/auth/verify'));

app.use('/admin/users', require('./routes/admin/users'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'app', 'build', 'index.html'));
});

app.listen(57483);
console.log('Connected');