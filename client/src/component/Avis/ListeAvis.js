import axios from 'axios';
import React, {useEffect, useState} from 'react';


function ListeAvis() {
    const [listeAvis, setListeAvis] = useState([]);
    const [email, setEmail] = useState('');


    useEffect(() => {
        const userJSON = localStorage.getItem('user');
        if (userJSON) {
          const user = JSON.parse(userJSON);
          console.log(user.email)
          setEmail(user.email);
        } 
      }, []);

    useEffect(() => {
        const fetchMoviesAvis = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/api/avis/email=${email}`);
            const avisUtilisateur = response.data.filter(avis => avis.email === email);
            console.log('Liste Avis:', avisUtilisateur);
    
            setListeAvis(avisUtilisateur);
          } catch (error) {
            console.error('Error fetching movies from API:', error);
          }
        };
        fetchMoviesAvis();
      }, [email]);


    return (
        <div className='container mt-5'>
          
          <h2 className='fs-4 bg-secondary text-white'>Mon Avis du film</h2>
      <table className="table">
          <thead className="thead-dark">
            <tr>
                <th scope="col">Film</th>
              <th scope="col">Avis</th>
              <th scope="col">Note</th>
            </tr>
          </thead>
          <tbody>
            {listeAvis.map((avisItem, index) => (
              <tr key={index}>
                <td>{avisItem.idMovie.Title}</td>
                <td>{avisItem.avis}</td>
                <td>{avisItem.note}</td>
              </tr>
            ))}
          </tbody>
        </table>

        </div>
      );
    };

export default ListeAvis;