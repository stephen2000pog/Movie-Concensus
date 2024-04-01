const express = require('express');
const UserModel = require('../models/user');
const MovieModel = require('../models/movie')
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

// router.get('/api/users/watchlist', getWatchlist)
router.post('api/users/watchlist', (req, res) => {
    const {_id, email} = req.body;
    console.log("test add to watchlist")
    MovieModel.findbyId({ _id })
        .then(movie => {
            UserModel.updateOne({email: email}, {
                watchlist: _id
            })
            res.json({ msg: "Compte utilistateur supprimé", status: 200 })
        })
        .catch(() => res.json({ msg: "Erreur innatendue côté serveur", status: 500 }))
})

module.exports = router;