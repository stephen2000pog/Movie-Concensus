import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import AvisFilm from '../Avis/AvisFilm';

import AddAvisModal from './Modal/AddAvisModal';

import MovieReview from '../Review/MovieReview'

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [listeAvis, setListeAvis] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  


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

  useEffect(() => {
    const fetchMovieAvis = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/avis/movieId=${id}`);
        const avisUtilisateur = response.data.filter(avis => avis.email === email);

        setListeAvis(avisUtilisateur);
      } catch (error) {
        console.error('Error fetching movies from API:', error);
      }
    };
    fetchMovieAvis();
  }, [id,email]);

  useEffect(() => {
    const userJSON = localStorage.getItem('user');
    if (userJSON) {
      const user = JSON.parse(userJSON);
      console.log(user.email)
      setEmail(user.email);
    } 
  }, [id]);


  if (!movie) {
    return <div>Chargement...</div>;
  }

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const ajoutAvis = (nouvelAvis) => {
   
    const AjoutCall = async () => {
      try {
        console.log(nouvelAvis);
        const response = await axios.post(`http://localhost:5000/api/avis/add`,nouvelAvis);
        console.log(response.data);
      } catch (error) {
        console.error('Error add or update  avis from API:', error);
      }
    };
    AjoutCall();
    setListeAvis([nouvelAvis]);
    closeModal();
  };

  const deleteAvis = () => {

    const deleteCall = async () => {
      try {
        const response = await axios.delete(`http://localhost:5000/api/avis/${listeAvis[0]._id}`);
        console.log(response.data);
      } catch (error) {
        console.error('Error delete avis from API:', error);
      }
    };
    deleteCall();
    
    setListeAvis([]);
    window.alert("Votre avis est en cours de suppression");
    
  };

  const updateAvis = (nouvelAvis) => {
   
    const updateCall = async () => {
      try {
        console.log(nouvelAvis);
        const response = await axios.post(`http://localhost:5000/api/avis/update`,nouvelAvis);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching movies from API:', error);
      }
    };
    updateCall();
    setListeAvis([nouvelAvis]);
    closeModal();
  };

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-4'>
          <img src={movie.Poster} alt={movie.Title} className='img-fluid rounded mt-5' />
        </div>
        <div className="col-md-8">
          <h2 className="mb-4">{movie.Title}</h2>
          <div className='text-left'>
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

      <AddAvisModal
        titleFilm= {movie.Title} 
        idMovie = {id}
        email={email}
        showModal={showModal}
        closeModal={closeModal}
        handleActionBtnModalAvis={listeAvis.length === 0 ? ajoutAvis : updateAvis}
        avis={listeAvis.length === 0 ? '' : listeAvis[0].avis}
        note={listeAvis.length === 0 ? 0 : parseInt(listeAvis[0].note)}
        
      />        

    <AvisFilm listeAvis={listeAvis}/> 
    {listeAvis.length === 0 ? 
          (<button onClick={openModal} className="btn btn-primary text-center" >Ajouter mon avis</button>) :
           (<div><button onClick={openModal} className="btn btn-primary text-center" >Mettre à jour mon avis</button>
            &nbsp;&nbsp;&nbsp;&nbsp;<button onClick={deleteAvis} className="btn btn-danger text-center" >Supprimer mon avis</button></div>)}

    <MovieReview id={id}></MovieReview>
    </div>
  );
};

export default MovieDetails;
