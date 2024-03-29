const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');

router.get('/api/search', async (req, res) => {
  try {
    const searchTerm = req.query.term;

    const searchResults = await Movie.find({
      $or: [
        { Title: { $regex: searchTerm, $options: 'i' } },
        { Year: searchTerm },
        { Actors: { $regex: searchTerm, $options: 'i' } },
        { Genre: { $regex: searchTerm, $options: 'i' } },
        { Language: { $regex: searchTerm, $options: 'i' } }
      ]
    });

    res.json(searchResults);
  } catch (error) {
    console.error('Error searching movies:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
