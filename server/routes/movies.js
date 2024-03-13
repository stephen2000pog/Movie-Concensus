const express = require('express');
const router = express.Router();
const Movies = require('../models/movie'); 

router.get('/api/movies', async (req, res) => {
  try {
    const movies = await Movies.find();
    res.json(movies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
