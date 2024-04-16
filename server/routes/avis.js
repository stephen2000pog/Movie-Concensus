const express = require('express');
const router = express.Router();
const AvisTable = require('../models/avisTable');

router.get('/api/avis/movieId=:id', async (req, res) => {
  try {
    const avis = await AvisTable.find({idMovie: req.params.id});
    res.json(avis);
  } catch (error) {
    console.error('Error fetching Avis:', error);
    res.status(500).json({error: 'Internal server error'});
  }
});

router.get('/api/avis/email=:email', async (req, res) => {
  try {
    const avis = await AvisTable.find({email: req.params.email}).populate('idMovie', 'Title');
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

    if ((await AvisTable.find({email: email, idMovie: idMovie})).length) {
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
    req.body
    console.log(req.body);

    if ((await AvisTable.find({email: email, idMovie: idMovie})).length) {
      res.json('Avis not added!');
    } else {
      const nouvelAvis =
          {email: email, idMovie: idMovie, avis: avis, note: note};

          AvisTable.create(nouvelAvis).then(avis => {
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
  await AvisTable.deleteOne({ _id: req.params.id });

    res.json('Avis delete!');
  } catch (err) {
    err => res.json(err);
  }
 
});

module.exports = router;