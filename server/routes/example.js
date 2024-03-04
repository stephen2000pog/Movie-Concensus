const express = require('express');
const UserModel = require('../models/exampleForUser'); // Assurez-vous d'ajuster le chemin
const router = express.Router();

// Ajouter un utilisateur
router.post('/', async (req, res) => {
  try {
    const { username, email } = req.body;

    // Créer une instance du modèle avec les données de la requête
    const user = new UserModel({ username, email });
    await user.save();

    res.json({ message: 'Utilisateur ajouté avec succès !' });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'utilisateur :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
