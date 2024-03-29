import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SearchResults = () => {
  const { searchTerm } = useParams();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/search?term=${searchTerm}`); //
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchSearchResults();
  }, [searchTerm]);

  return (
    <div>
      <h2>Résultats de la recherche pour "{searchTerm}"</h2>
      <ul>
        {searchResults.map(result => (
          <li key={result._id}>{result.Title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
