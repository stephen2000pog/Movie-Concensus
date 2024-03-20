import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/movie/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des détails du film :', error);
      }
    };
    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <img src={movie.Poster} alt={movie.Title} className="img-fluid rounded mt-5" />
        </div>
        <div className="col-md-8">
          <h2 className="mb-4">{movie.Title}</h2>
          <div className="text-left">
            <p><strong>Director:</strong> {movie.Director}</p>
            <p><strong>Writer:</strong> {movie.Writer}</p>
            <p><strong>Actors:</strong> {movie.Actors}</p>
            <p><strong>Genre:</strong> {movie.Genre}</p>
            <p><strong>Language:</strong> {movie.Language}</p>
            <p><strong>Country:</strong> {movie.Country}</p>
            <p><strong>Year:</strong> {movie.Year}</p>
            <p><strong>Runtime:</strong> {movie.Runtime}</p>
            <p><strong>Rated:</strong> {movie.Rated}</p>
            <p><strong>Released:</strong> {movie.Released}</p>
            <p><strong>Awards:</strong> {movie.Awards}</p>
            <p><strong>Plot:</strong> {movie.Plot}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
