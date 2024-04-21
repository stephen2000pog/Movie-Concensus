import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Watchlist.css'
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import ErrorPage from '../ErrorPage/ErrorPage';
import { Button } from 'react-bootstrap';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'react-share'

const Watchlist = () => {
    const { user } = useAuthContext();
    const [watchlist, setWatchlist] = useState([])
    const [setError] = useState([])

    const removeMovie = async (_id) => {
        console.log(_id)
        console.log(user.email)
        await axios.delete(`http://localhost:5000/api/user/watchlist${user.email}/${_id}`, {
            params: {
                email: user.email,
                _id: _id
            }
            // headers: {
            //     'Auhtorization': `Bearer ${user.token}`
            // }
        }).then((response) => {
            if (response.data.status === 200) {
                console.log("Movie removed from wathclist")
                window.location.reload()
            } else {
                setError("Erreur lors de la suppresion du film");
            }
        }).catch(() => {
            setError("Erreur lors de la suppresion du film");
        })
    }

    useEffect(() => {
        const fetchWatchlist = async () => {
            const response = await axios.get(`http://localhost:5000/api/user/watchlist${user.email}`, {
                params: {
                    email: user.email
                }
                // headers: {
                //     'Auhtorization': `Bearer ${user.token}`
                // }
            })
            if (response.data.status === 200) {
                setWatchlist(response.data.movies)
            }
            console.log(response.data)
        }
        if (user) {
            fetchWatchlist()
        }
    }, [user])

    return (
        <div className="App-header">
            <h1>Votre liste de visionnement</h1>
            {user && (
                <><ul className='watchlist'>
                    {watchlist.map(function (movie, i) {
                        return <li key={movie._id}>
                            <Link to={`/movies/${movie._id}`} key={movie._id}>
                                <img
                                    src={movie.Poster}
                                    alt={`${movie.Title} Poster`}
                                    style={{ width: '160px', height: '240px' }} />
                                <h2>{movie.Title}</h2>
                            </Link>
                            <p>{movie.Year} &emsp; {movie.Runtime} &emsp; {movie.Rated} &emsp; {movie.Genre}</p>
                            <p>Director : {movie.Director} &emsp; Actors : {movie.Actors}</p>
                            <p>{movie.Plot}</p>
                            {(<Button variant="outline-danger" size='sm' onClick={() => removeMovie(movie._id)}>Supprimer</Button>)}
                        </li>;
                    })}
                </ul><span>
                        <br />
                        <FacebookShareButton
                            url={'http://example.com'}
                            quote={'Regarder ma liste de visionnement et conseiller moi!'}
                            hashtag="#movieconsensus"
                        >
                            <FacebookIcon size={32} round />
                            Partager liste
                        </FacebookShareButton>
                        <br />
                        <TwitterShareButton
                            url={'http://example.com'}
                            quote={'Regarder ma liste de visionnement et conseiller moi!'}
                            hashtag="#movieconsensus"
                        >
                            <TwitterIcon size={32} round />
                            Partager liste
                        </TwitterShareButton>
                    </span></>
            )}
            {!user && (
                <ErrorPage />
            )}
        </div>
    );
};

export default Watchlist