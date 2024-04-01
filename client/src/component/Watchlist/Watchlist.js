import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';
import ErrorPage from '../ErrorPage/ErrorPage';

const Watchlist = () => {
    const { user } = useAuthContext();
    const [watchlist, setWatchlist] = useState([])
    useEffect(() => {
        const fetchWatchlist = async () => {
            const response = await axios.get('http://localhost:5000/api/user/watchlist', {
                // headers: {
                //     'Auhtorization': `Bearer ${user.token}`
                // }
            })
            const json = await response.json();

            if(response.ok) {
                // console.log(json)
                setWatchlist(response.data.watchlist)
            }
        }
        if(user) {
          fetchWatchlist()
        }
    }, [])

    return (
        <div className="App-header">
            {user && (
                <h1> Liste de visionnement </h1>
            )}
            {!user && (
                <ErrorPage />
            )}
        </div>
    );
};

export default Watchlist