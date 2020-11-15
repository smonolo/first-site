const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  _id: String,
  username: String,
  email: String,
  password: String,
  siteAdmin: Boolean
}, {
  collection: 'users',
  versionKey: false
});

mongoose.model('user', UserSchema);