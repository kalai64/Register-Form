const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  gender: String,
  city: String,
  state: String,
  zip: String,
  file: String,
});

module.exports = mongoose.model('User', UserSchema);
