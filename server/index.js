const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const UserModel = require('./models/user')

const app = express();
const port = process.env.PORT || 5000;
const auth = require('./routes/user');
const { addMovieToDatabase, fetchDataAndStoreInDB } = require('./routes/addMovieInDb.js');
const movieRoutes = require('./routes/movies');
const { fetchDataAndStoreInDB } = require('./routes/addMovieInDb.js');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(auth);
fetchDataAndStoreInDB();

const mongoURI = 'mongodb+srv://admin1:admin1@cluster0.sbmpwv4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/', movieRoutes);

app.listen(port, () => {
  console.log(`Le serveur Express est en cours d'exécution sur http://localhost:${port}`);
});
