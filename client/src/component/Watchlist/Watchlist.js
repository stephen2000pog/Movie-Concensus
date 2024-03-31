import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';
import ErrorPage from '../ErrorPage/ErrorPage';

const Watchlist = () => {
    const { user } = useAuthContext();
    const [info, setInfo] = useState([])
    useEffect(() => {
        const fetchInfo = async () => {
            const response = await axios.get('http://localhost:5000/api/user', {
                headers: {
                    'Auhtorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json();

            if(response.ok) {
                console.log(json)
            }
            setInfo(json)
        }
        if(user) {
          fetchInfo()
        }
    }, [])

    return (
        <div>
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