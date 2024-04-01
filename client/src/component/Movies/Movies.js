import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Movie.css'
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const { user } = useAuthContext();

  const addMovieToWatchlist = async (_id) => {
    await axios.post('http://localhost:5000/api/user/watchlist', {
      _id: _id,
      email: user.email
      // headers: {
      //     'Auhtorization': `Bearer ${user.token}`
      // }
    })
      .then((response) => {
        console.log(_id)
        if (response.data.status === 200) {
          console.log("Movie Added successfully")
          alert('MOvie succesfully added to watchlist');
        } else {
          console.log("Erreur lors de l'ajout à la liste de visionnement");
        }
      })
      .catch(error => {
        console.log(error)
      })
  };

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
          <div className="movie-link">
            {user && (
              <span onClick={() => addMovieToWatchlist(movie._id)}>
                <button id="addWatchlist" value="+" >+</button>
              </span>
            )}
            <Link to={`/movies/${movie._id}`} key={movie._id}>
              <div className="d-flex justify-content-start m-1">
                {movie.Poster !== 'N/A' && movie.Poster && (
                  <img
                    src={movie.Poster}
                    alt={`${movie.Title} Poster`}
                    style={{ width: '200px', height: '300px' }}
                  />
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>

  );

};

export default MovieList;
