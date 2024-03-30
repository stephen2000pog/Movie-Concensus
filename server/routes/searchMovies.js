const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');

router.get('/api/search', async (req, res) => {
  try {
    const searchTerm = req.query.term;
    const searchType = req.query.type; // Ajout de la prise en charge du type de recherche

    let searchResults;

    if (searchType === 'title') {
      // Recherche par titre
      searchResults = await Movie.find({ Title: { $regex: searchTerm, $options: 'i' } });
    } else if (searchType === 'year') {
      // Recherche par année
      searchResults = await Movie.find({ Year: searchTerm });
    } else if (searchType === 'actor') {
      // Recherche par acteur
      searchResults = await Movie.find({ Actors: { $regex: searchTerm, $options: 'i' } });
    } else if (searchType === 'genre') {
      // Recherche par genre
      searchResults = await Movie.find({ Genre: { $regex: searchTerm, $options: 'i' } });
    } else if (searchType === 'language') {
      // Recherche par langue
      searchResults = await Movie.find({ Language: { $regex: searchTerm, $options: 'i' } });
    } else {
      // Par défaut, recherche tous
      searchResults = await Movie.find({
        $or: [
          { Title: { $regex: searchTerm, $options: 'i' } },
          { Year: searchTerm },
          { Actors: { $regex: searchTerm, $options: 'i' } },
          { Genre: { $regex: searchTerm, $options: 'i' } },
          { Language: { $regex: searchTerm, $options: 'i' } }
        ]
      });
    }

    res.json(searchResults);
  } catch (error) {
    console.error('Error searching movies:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
