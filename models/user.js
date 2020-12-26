const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  _id: String,
  username: String,
  email: String,
  password: String,
  siteAdmin: {
    type: Boolean,
    default: false
  },
  banned: {
    type: Boolean,
    default: false
  }
}, {
  collection: 'users',
  versionKey: false
});

mongoose.model('user', UserSchema);