const mongoose = require('mongoose');

const searchSchema = new mongoose.Schema({
  email: { type: String},
  type: { type: String},
  terme: { type: String }
});



module.exports = mongoose.model('Search', searchSchema);