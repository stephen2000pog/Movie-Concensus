import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
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

    fetchSearchResults();
  }, [searchTerm]);

  return (
    <div>
      <h2>Résultats de la recherche pour "{searchTerm}" ({searchResults.length} résultats)</h2>
      <br></br>
      <hr></hr>
      <div className="search-results">
        {searchResults.map(result => (
          <div key={result._id} className="search-result">
            <div className="poster">
              <img src={result.Poster} alt={result.Title} />
            </div>
            <div className="details">
              <h3>{result.Title}</h3>
              <p>{result.Year}</p>
              <p>{result.Actors}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
