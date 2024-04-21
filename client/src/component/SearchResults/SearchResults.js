import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import userIcon from '../../images/user-icon.svg'
import './SearchResults.css'

const SearchResults = () => {
  const { searchTerm, searchType } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/search?term=${searchTerm}&type=${searchType}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    const AjoutCall = async (email) => {
      try {

        const nouvelSearch = { email: email, type: searchType, terme: searchTerm }
        const response = await axios.post(`http://localhost:5000/api/search/add`, nouvelSearch);
        console.log(response.data);
      } catch (error) {
        console.error('Error add or update  avis from API:', error);
      }
    };
    const userJSON = localStorage.getItem('user');
    if (userJSON) {
      const user = JSON.parse(userJSON);
      console.log(user.email)
      if (user.email) {
        AjoutCall(user.email);
      }
    }

    fetchSearchResults();
  }, [searchTerm, searchType]);

  return (
    <div className='"search-results"'>
      <h2>Résultats de la recherche pour "{searchTerm}" ({searchResults.length} résultats)</h2>
      <br></br>
      <hr></hr>
      <div>
        {searchType === 'user' && (
          searchResults.map(result => (
            <div key={result._id} className="search-item">
              <Link to={`/account-info/:${result._id}`}>
                <div className="poster">
                  <img src={userIcon} alt="" />
                </div>
                <div className="details">
                  <h3>{result.username}</h3>
                </div>
              </Link>
            </div>
          ))
        )}
        {searchResults.map(result => (
          <div key={result._id} className="search-item">
            <Link to={`/movies/${result._id}`}>
              <div className="poster">
                <img src={result.Poster} alt={result.Title} />
              </div>
              <div className="details">
                <h3>{result.Title}</h3>
                <p>{result.Year}</p>
                <p>{result.Actors}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div >
  );
};

export default SearchResults;
