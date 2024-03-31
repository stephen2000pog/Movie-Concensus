const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;
const auth = require('./routes/connection.js');
const userInfo = require('./routes/user.js');
const { fetchDataAndStoreInDB } = require('./routes/addMovieInDb.js');
const movieRoutes = require('./routes/movies');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(auth);
app.use(userInfo);
fetchDataAndStoreInDB();

const mongoURI = 'mongodb+srv://admin1:admin1@cluster0.sbmpwv4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI);

app.use('/', movieRoutes);

app.listen(port, () => {
  console.log(`Le serveur Express est en cours d'exécution sur http://localhost:${port}`);
});
