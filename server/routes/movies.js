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

router.get('/api/movie/:id', async (req, res) => {
  try {
    const movie = await Movies.findById(req.params.id);
    res.json(movie);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const AvisTable = require('../models/avisTable');

router.get('/api/movie/:id/comments', async (req, res) => {
  try {
    const movieId = req.params.id;
    const avis = await AvisTable.find({ idMovie: movieId });
    res.json(avis);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
