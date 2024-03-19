import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Movie.css'

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/movies');
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies from API:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="App-header container-fluid movie-app">
      <h2>Liste des Films</h2>
      <div className="movies-container">
        {movies.slice(0, 100).map((movie) => (
          <div key={movie._id} className="d-flex justify-content-start m-1">
            {movie.Poster !== 'N/A' && movie.Poster && (
              <>
                <img
                  src={movie.Poster}
                  alt={`${movie.Title} Poster`}
                  style={{ width: '200px', height: '300px' }}
                />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
  

  
};

export default MovieList;
