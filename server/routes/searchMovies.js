const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');

router.get('/api/search', async (req, res) => {
  try {
    const searchTerm = req.query.term;
    const searchType = req.query.type;

    let searchResults;

    if (searchType === 'title') {
      searchResults = await Movie.find({ Title: { $regex: searchTerm, $options: 'i' } });
    } else if (searchType === 'year') {
      searchResults = await Movie.find({ Year: searchTerm });
    } else if (searchType === 'actor') {
      searchResults = await Movie.find({ Actors: { $regex: searchTerm, $options: 'i' } });
    } else if (searchType === 'genre') {
      searchResults = await Movie.find({ Genre: { $regex: searchTerm, $options: 'i' } });
    } else if (searchType === 'language') {
      searchResults = await Movie.find({ Language: { $regex: searchTerm, $options: 'i' } });
    } else {
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
