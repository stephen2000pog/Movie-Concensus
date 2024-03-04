const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  // Ajoutez d'autres champs selon vos besoins
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;