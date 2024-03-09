import React from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const {user} = useAuthContext();
    const navigate = useNavigate();

    return (
        <div>
            {user && (
                <h1> Welcome, {user.username} !</h1>
            )}
            {!user && (
                navigate('/connexion')
            ) }
        </div>
    );
};

export default Profile