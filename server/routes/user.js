const express = require('express');
const UserModel = require('../models/user');
const router = express.Router();
// const requireAuth = require('../middleware/requireAuth');

router.use(express.json())

// requireAuth for all user data
// router.use(requireAuth)

router.get('/api/user:email', (req, res) => {
    const email = req.params.email;
    UserModel.findOne({ email: email })
        .then(user => {
            res.json({user, status: 200})
        })
        .catch(() => res.json({ msg: "Erreur innatendue côté serveur", status: 500 }))
})

// router.get('/api/users/watchlist', getWatchlist)
// router.post('api/users/watchlist', addToWatchlist)
// router.delete('api/users/watchlist', removeFromWatchlist)

module.exports = router;