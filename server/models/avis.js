const mongoose = require('mongoose');

const avisSchema = new mongoose.Schema({
  email: { type: String, required: true },
  idMovie: { type: String, required: true },
  avis: { type: String },
  note: { type: Number }
});

// Création de la clé composite nomUtilisateur-nomFilm
avisSchema.index({ idUsername: 1, idMovie: 1 }, { unique: true });

module.exports = mongoose.model('Avis', avisSchema);