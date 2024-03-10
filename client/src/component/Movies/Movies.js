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
    <div className="App-header">
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {movies.slice(0, 100).map((movie) => (
          <li key={movie._id} style={{ marginBottom: '20px' }}>
            {movie.Poster !== 'N/A' && movie.Poster && (
              <>
                <h3>{movie.Title}</h3>
                <img
                  src={movie.Poster}
                  alt={`${movie.Title} Poster`}
                  style={{ width: '200px', height: '300px' }}
                />
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
