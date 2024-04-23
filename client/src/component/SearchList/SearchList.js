import axios from 'axios';
import React, {useEffect, useState} from 'react';


function SearchList() {
    const [listeSearch, setListeSearch] = useState([]);
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
        const fetchMoviesSearch = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/api/search/email=${email}`);
            const listeSearchUser = response.data.filter(search => search.email === email);
            console.log('Liste serach:', listeSearchUser);
    
            setListeSearch(listeSearchUser);
          } catch (error) {
            console.error('Error fetching search from API:', error);
          }
        };
        fetchMoviesSearch();
      }, [email]);


    return (
        <div className='container mt-5'>
          
          <h2 className='fs-4 bg-secondary text-white'>Ma Liste de recherche - films</h2>
      <table className="table">
          <thead className="thead-dark">
            <tr>
                <th scope="col">No</th>
              <th scope="col">Type</th>
              <th scope="col">terme</th>
            </tr>
          </thead>
          <tbody>
            {listeSearch.map((searchItem, index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{searchItem.type}</td>
                <td>{searchItem.terme}</td>
              </tr>
            ))}
          </tbody>
        </table>

        </div>
      );
    };

export default SearchList;