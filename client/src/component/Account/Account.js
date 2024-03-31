import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';
import ErrorPage from '../ErrorPage/ErrorPage';

const Profile = () => {
    const { user } = useAuthContext();
    const [info, setInfo] = useState([])

    const handleDelete = async () => {
        const response = await axios.delete(`http://localhost:5000/api/user${user.email}`, {
            params: {
                email: user.email
            }
            // headers: {
            //     'Auhtorization': `Bearer ${user.token}`
            // }
        })
        if (response.data.status === 200) {
            console.log("Account Deleted successfully")
        }
        setInfo(response.data.user)
    }

    useEffect(() => {
        const fetchInfo = async () => {
            const response = await axios.get(`http://localhost:5000/api/user${user.email}`, {
                params: {
                    email: user.email
                }
                // headers: {
                //     'Auhtorization': `Bearer ${user.token}`
                // }
            })
            if (response.data.status === 200) {
                console.log("response.data")
            }
            setInfo(response.data.user)
        }
        if (user) {
            fetchInfo()
        }
    }, [user])

    return (
        <div className="App-header">
            {user && (
                <div>
                    <h1>Informations du compte</h1>
                    <h2>Nom d'utilisateur : {info.username}</h2>
                    <h2>Adresse courriel : {info.email}</h2>
                    <span onClick={handleDelete}>
                        <input className="delete" type='submit' value="Supprimer compte" />
                    </span>
                </div>
            )}
            {!user && (
                <ErrorPage />
            )}
        </div>
    );
};

export default Profile