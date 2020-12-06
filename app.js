const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(express.static(path.join(__dirname, 'app', 'build')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  next();
});

app.use('/api/app', require('./routes/api/app'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'app', 'build', 'index.html'));
});

app.listen(57483);
console.log('Connected');