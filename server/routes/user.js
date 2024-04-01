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
                console.log(movie.Title)
            }
            res.json({ movies, status: 200 })
        })
        .catch(() => {
            res.json({ msg: "Erreur innatendue côté serveur", status: 500 })
        })
})

router.post('/api/user/watchlist', (req, res) => {
    const { _id, email } = req.body;
    console.log("test add to watchlist")
    UserModel.updateOne({ email: email }, {
        $push: { watchlist: _id }
    }).then(() => {
        res.json({ msg: "Movie added to watchlist", status: 200 })
    })
        .catch((error) => res.json({ msg: error, status: 500 }))
})

module.exports = router;