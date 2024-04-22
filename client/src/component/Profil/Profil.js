import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Profil.css';

function Profil({}) {
  const { email } = useParams();
  const [profil, setProfil] = useState(null);

  useEffect(() => {
    const fetchProfil = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user/${email}`);
        setProfil(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    fetchProfil();
  }, [email]);

  if (!profil) {
    return <div className="loading">Chargement...</div>;
  }

  return (
    <div className="profil-container">
      <h2 className="profil-heading">Profil de l'utilisateur</h2>
      <div className="profil-info">
        <p><strong>Email:</strong> {profil.email}</p>
        <p><strong>Username:</strong> {profil.username}</p>
        <p><strong>Watchlist:</strong> {profil.watchlist.join(', ')}</p>
      </div>
      <div className="avis-section">
        <h3 className="avis-heading">Avis de l'utilisateur</h3>
        <ul className="avis-list">
          {profil.avis && profil.avis.length > 0 ? (
            profil.avis.map((avis, index) => (
              <li key={index} className="avis-item">
                <p className="avis-title"><strong>Titre:</strong> {avis.title}</p>
                <p className="avis-comment"><strong>Avis:</strong> {avis.comment}</p>
                <p className="avis-rating"><strong>Note:</strong> {avis.rating}/5</p>
              </li>
            ))
          ) : (
            <li className="no-avis">Pas d'avis pour le moment</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Profil;
