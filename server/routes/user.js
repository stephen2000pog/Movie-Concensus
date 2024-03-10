const express = require('express');
const UserModel = require('../models/user'); // Assurez-vous d'ajuster le chemin
const router = express.Router();
const jwt = require('jsonwebtoken');
const generator = require('generate-password')

router.use(express.json())

const secret = generator.generate({
  length: 36,
  numbers: true
});

const createToken = (_id) => {
  return jwt.sign(_id, secret)
}

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email })
    .then(user => {
      if (user) {
        if (user.password === password) {
          const _id = { _id: user._id }
          const token = createToken(_id)
          res.json({ email, token, status: 200 })
        } else {
          res.json({ msg: "Mot de passe invalide", status: 400 })
        }
      } else {
        res.json({ msg: "Compte introuvable", status: 400 })
      }
    })
    .catch(() => res.json({ msg: "Erreur innatendue côté serveur", status: 500 }))
})

router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let errors = {};
    if ((await UserModel.find({ username: username })).length) {
      errors.username = "Le nom d'utilisateur est déjà pris.";
    }
    if ((await UserModel.find({ email: email })).length) {
      errors.email = "Cette adresse courriel est déjà utilisée.";
    }
    if ((await UserModel.find({ password: password })).length) {
      errors.password = "Ce mot de passe est indisponible.";
    }
    if (Object.keys(errors).length > 0) {
      res.json(errors);
    } else {
      const user = new UserModel({ username, email, password });
      user.save();
      res.json("User added!");
    }
  } catch (err) {
    err => res.json(err);
  }
});

module.exports = router;