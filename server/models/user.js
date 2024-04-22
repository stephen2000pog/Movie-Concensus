const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  watchlist: Array,
  private: Boolean,
});

const UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;