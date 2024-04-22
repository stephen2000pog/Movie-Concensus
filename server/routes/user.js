const express = require('express');
const UserModel = require('../models/user');
const MovieModel = require('../models/movie');
const router = express.Router();
// const requireAuth = require('../middleware/requireAuth');

router.use(express.json())

// requireAuth for all user data
// router.use(requireAuth)

router.get('/api/user:email', (req, res) => {
    const email = req.params.email;
    UserModel.findOne({ email: email })
        .then(user => {
            res.json({ user, status: 200 })
        })
        .catch(() => res.json({ msg: "Erreur innatendue côté serveur", status: 500 }))
})

router.delete('/api/user:email', (req, res) => {
    const email = req.params.email;
    console.log(email)
    UserModel.deleteOne({ email: email })
        .then(() => {
            res.json({ msg: "Compte utilistateur supprimé", status: 200 })
        })
        .catch(() => res.json({ msg: "Erreur innatendue côté serveur", status: 500 }))
})

router.get('/api/user/watchlist:email', async (req, res) => {
    const email = req.params.email;
    UserModel.findOne({ email: email })
        .then(async user => {
            const watchlist = user.watchlist
            const movies = []
            for (let i = 0; i < watchlist.length; i++) {
                const movie = await MovieModel.findById(watchlist[i])
                movies.push(movie)
            }
            res.json({ movies, status: 200 })
        })
        .catch(() => {
            res.json({ msg: "Erreur innatendue côté serveur", status: 500 })
        })
})

router.post('/api/user/watchlist', (req, res) => {
    const { _id, email } = req.body;
    UserModel.updateOne({ email: email }, {
        $push: {
            watchlist: { _id: _id }
        }
    }).then(() => {
        res.json({ msg: "Movie added to watchlist", status: 200 })
    })
        .catch((error) => res.json({ msg: error, status: 500 }))
})

router.delete('/api/user/watchlist:email/:_id', (req, res) => {
    UserModel.updateOne({ email: req.params.email }, {
        $pull: {
            watchlist: { _id: req.params._id }
        }
    })
        .then(() => {
            res.json({ status: 200 })
        })
        .catch(() => {
            console.log("error")
            res.json({ msg: "Erreur innatendue côté serveur", status: 500 })
        })
})

router.post('/api/user/updateUser', async (req, res) => {
    try {
      const {email, username} = req.body;
      let errors = {};
  
      if ((await UserModel.find({email: email})).length) {
        const filtre = {email: email};
        const nouvellesValeurs = {username: username};
        UserModel.updateOne(filtre, nouvellesValeurs).then(resultat => {
          console.log('Username mise à jour');
          res.json('username update');
        })
      }
    } catch (err) {
      err => res.json(err);
    }
  });

  router.post('/api/user/updatePassword', async (req, res) => {
    try {
      const {email, password} = req.body;
      let errors = {};
  
      if ((await UserModel.find({email: email})).length) {
        const filtre = {email: email};
        const nouvellesValeurs = {password: password};
        UserModel.updateOne(filtre, nouvellesValeurs).then(resultat => {
          console.log('Mot de passe mise à jour');
          res.json('password update');
        })
      }
    } catch (err) {
      err => res.json(err);
    }
  });

  router.get('/api/user/:email', async (req, res) => {
    try {
      const email = req.params.email;
      // Retrieve user profile information from the database based on the email
      const userProfil = await UserModel.findOne({ email });
      if (!userProfil) {
        return res.status(404).json({ message: "User profile not found" });
      }
      // Return user profile information
      res.status(200).json(userProfil);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


module.exports = router;