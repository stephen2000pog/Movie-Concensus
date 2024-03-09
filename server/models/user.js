const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  // Ajoutez d'autres champs selon vos besoins
});

const UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;