import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';
import ErrorPage from '../ErrorPage/ErrorPage';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout';
import UpdateProfil from './Modal/UpdateProfil';

const Profile = () => {
    const { user } = useAuthContext();
    const [info, setInfo] = useState([])
    const [error, setError] = useState([])
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate()
    const { logout } = useLogout()

    const handleDelete = async () => {
        await axios.delete(`http://localhost:5000/api/user${user.email}`, {
            params: {
                email: user.email
            }
            // headers: {
            //     'Auhtorization': `Bearer ${user.token}`
            // }
        }).then((response) => {
            if (response.data.status === 200) {
                console.log("Account deleted successfully")
                logout()
                navigate('/');
                alert('Votre compte a été supprimé avec succès');
            } else {
                setError("Erreur lors de la suppresion du compte");
            }
        }).catch(() => {
            setError("Erreur lors de la suppresion du compte");
        })
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
                setInfo(response.data.user)
            }
        }
        if (user) {
            fetchInfo()
        }
    }, [user])



    const openModal = () => {
        setShowModal(true);
      };
    
      const closeModal = () => {
        setShowModal(false);
      };

      const updateProfil = (profil) => {
   
        const updateCall = async () => {
          try {
            console.log(profil);
            const response = await axios.post(`http://localhost:5000/api/user/updateUser`,profil);
            console.log(response.data);
          } catch (error) {
            console.error('Error fetching movies from API:', error);
          }
        };
        updateCall();
        closeModal();
        console.log("Mise a jour du profil termine",info)
        setInfo({ ...info, username: profil.username });
        
        
      };

    return (
        <div className="App-header" >

            {user && (
                <div className='text-center '> 
                    <h1>Informations du compte</h1> 
                    <h2>Nom d'utilisateur : {info.username}</h2> 
                    <button onClick={openModal} className="btn btn-primary text-center" >Modifier Profil</button>
                    <br/><br/>
                    <h2>Adresse courriel : {info.email}</h2>
                    <span onClick={handleDelete}>
                        <input className="delete" type='submit' value="Supprimer compte" />
                    </span>
                    
                    {error ? (
                        <p className='error'>
                            {error}
                        </p>
                    ) : null}
                </div>
            )}
            {!user && (
                <ErrorPage />
            )}

{user && <UpdateProfil
                        username= {user.username} 
                        email={user.email}
                        showModal={showModal}
                        closeModal={closeModal}
                        handleActionBtnModalProfil={updateProfil}
        
    /> }


        </div>
    );
};

export default Profile