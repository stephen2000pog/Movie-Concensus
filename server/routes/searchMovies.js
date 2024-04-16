const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');
const Search = require('../models/search');

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

router.post('/api/search/add', async (req, res) => {
  try {
 
    const {email, terme, type} = req.body;
    req.body
    console.log(req.body);

    if (email.length === 0) {
      res.json('search not added!');
    } else {
      const nouvelSearch =
          {email: email, terme: terme, type: type};

          Search.create(nouvelSearch).then(search => {
        console.log('recherche ajoutée :', search);
        res.json('search added!');
      });
    }
  } catch (err) {
    err => res.json(err);
  }
});

router.get('/api/search/email=:email', async (req, res) => {
  try {
    const search = await Search.find({email: req.params.email});
    res.json(search);
  } catch (error) {
    console.error('Error fetching list searchs:', error);
    res.status(500).json({error: 'Internal server error'});
  }
});

module.exports = router;
