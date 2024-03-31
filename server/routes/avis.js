const express = require('express');
const router = express.Router();
const Avis = require('../models/avis');

router.get('/api/avis/movieId=:id', async (req, res) => {
  try {
    const avis = await Avis.find({idMovie: req.params.id});
    res.json(avis);
  } catch (error) {
    console.error('Error fetching Avis:', error);
    res.status(500).json({error: 'Internal server error'});
  }
});

router.post('/api/avis/update', async (req, res) => {
  try {
    const {email, idMovie, avis, note} = req.body;
    let errors = {};

    if ((await Avis.find({email: email, idMovie: idMovie})).length) {
      const filtre = {email: email, idMovie: idMovie};
      const nouvellesValeurs = {avis: avis, note: note};
      Avis.updateOne(filtre, nouvellesValeurs).then(resultat => {
        console.log('Avis mise à jour');
        res.json('Avis update');
      })
    }
  } catch (err) {
    err => res.json(err);
  }
});



router.post('/api/avis/add', async (req, res) => {
  try {
    const {email, idMovie, avis, note} = req.body;
    let errors = {};

    if ((await Avis.find({email: email, idMovie: idMovie})).length) {
      res.json('Avis not added!');
    } else {
      const nouvelAvis =
          {email: email, idMovie: idMovie, avis: avis, note: note};

      Avis.create(nouvelAvis).then(avis => {
        console.log('Avis ajouté :', avis);
        res.json('Avis added!');
      });
    }
  } catch (err) {
    err => res.json(err);
  }
});

router.delete('/api/avis/:id', async (req, res) => {
  try {
  await Avis.deleteOne({ _id: req.params.id });

    res.json('Avis delete!');
  } catch (err) {
    err => res.json(err);
  }
 
});

module.exports = router;