const mongoose = require('mongoose');
const Movie = require('../models/Movie');
const axios = require('axios');
const { faker } = require('@faker-js/faker');

const getRandomLetter = () => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const randomIndex = Math.floor(Math.random() * alphabet.length);
  return alphabet[randomIndex];
};

const generateSearchTerm = async () => {
  //const randomWord = faker.word.words(1); 
  const randomWord = getRandomLetter() + getRandomLetter();
  return randomWord;
};

const fetchDataAndStoreInDB = async () => {
  const MovieToStore = 200;
  try {
      for (let i = 0; i < MovieToStore; i++) {
          const searchTerm = await generateSearchTerm();
          console.log('searchTerm', searchTerm);
          const response = await axios.get(`https://www.omdbapi.com/?apikey=53cb3007&t=${searchTerm}`);

          const filteredData = {
            Title: response.data.Title,
            Year: response.data.Year,
            Rated: response.data.Rated,
            Released: response.data.Released,
            Runtime: response.data.Runtime,
            Genre: response.data.Genre,
            Director: response.data.Director,
            Writer: response.data.Writer,
            Actors: response.data.Actors,
            Plot: response.data.Plot,
            Language: response.data.Language,
            Country: response.data.Country,
            Awards: response.data.Awards,
            Poster: response.data.Poster,
          };
          console.log('filteredData', filteredData);

          await Movie.create(filteredData);
      }

      console.log('Données stockées avec succès dans la base de données.');
  } catch (error) {
      console.error('Erreur lors du stockage des données dans la base de données :', error);
  } finally {
      mongoose.connection.close();
  }
};

module.exports = {
  fetchDataAndStoreInDB 
};