const mongoose = require('mongoose');
const Movie = require('./movie');

const avisTableSchema = new mongoose.Schema({
  email: { type: String, required: true },
  idMovie: { type: String, required: true ,ref: 'Movie'},
  avis: { type: String },
  note: { type: Number }
});

// Création de la clé composite nomUtilisateur-nomFilm
avisTableSchema.index({ email: 1, idMovie: 1 }, { unique: true });

module.exports = mongoose.model('AvisTable', avisTableSchema);