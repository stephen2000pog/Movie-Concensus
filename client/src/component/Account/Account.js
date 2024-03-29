import React from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import ErrorPage from '../ErrorPage/ErrorPage'

const Profile = () => {
    const { user } = useAuthContext();
    return (
        <div>
            {user && (
                <h1> Welcome, {user.email} !</h1>
            )}
            {!user && (
                <ErrorPage />
            )}
        </div>
    );
};

export default Profile