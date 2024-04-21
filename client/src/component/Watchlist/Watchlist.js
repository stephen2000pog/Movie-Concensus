import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Watchlist.css'
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Button } from 'react-bootstrap';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'react-share'

const Watchlist = () => {
    const { user } = useAuthContext();
    const [watchlist, setWatchlist] = useState([])
    const [error, setError] = useState([])
    const path = window.location.pathname
    const id = path.substring(path.indexOf(':') + 1)
    const [isPrivate, setIsPrivate] = useState(false);

    const removeMovie = async (_id) => {
        console.log(_id)
        console.log(user.email)
        await axios.delete(`http://localhost:5000/api/user/watchlist${user.email}/${_id}`, {
            params: {
                email: user.email,
                _id: _id
            }
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

    // const updatePrivate = async (isPrivate) => {
    //     await axios.post('http://localhost:5000/api/user/private', {
    //         email: user.email,
    //         private: isPrivate
    //     })
    //         .then((res) => {
    //             if (res.data.status === 200) {
    //                 console.log("in here with", isPrivate)
    //                 setIsPrivate(!isPrivate)
    //                 console.log(!isPrivate)
    //             } else {
    //                 setError("Pas Réussi à changer du côté serveur")
    //             }
    //         })
    //         .catch((err) => {
    //             console.log("Some sort of error", err)
    //         })
    // }

    const changeValue = (e) => {
        e.preventDefault()
        setIsPrivate(!isPrivate)
    }

    useEffect(() => {
        const fetchWatchlist = async () => {
            await axios.get(`http://localhost:5000/api/user/watchlist${id}`, {
                params: {
                    id: id
                }
            })
                .then(watchlist => {
                    if (watchlist.data.status === 200) {
                        setWatchlist(watchlist.data.movies)
                    }
                    console.log(watchlist.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
        fetchWatchlist()
    }, [id])

    return (
        <div className="App-header">
            <div className='Wrapper'>
                {user && user.id === id && (
                    <><h1 className='titleAuth'>Votre liste de visionnement</h1><span>
                        <br />
                        <FacebookShareButton
                            url={'http://example.com'}
                            quote={'Regarder ma liste de visionnement et conseiller moi!'}
                            hashtag="#movieconsensus"
                        >
                            <FacebookIcon size={32} round />
                            <span className='partage'>Partager liste</span>
                        </FacebookShareButton>
                        <span>&emsp;</span>
                        <TwitterShareButton
                            url={'http://example.com'}
                            quote={'Regarder ma liste de visionnement et conseiller moi!'}
                            hashtag="#movieconsensus"
                        >
                            <TwitterIcon size={32} round />
                            <span className='partage'>Partager liste</span>
                        </TwitterShareButton>
                    </span>
                        <span>&emsp;</span>
                        {isPrivate === false && (
                            <Button variant="outline-success" onClick={changeValue}>Mettre watchlist privée</Button>
                        )}
                        {isPrivate === true && (
                            <Button variant='success' onClick={changeValue}>Mettre watchlist publique</Button>
                        )}
                        {error && (
                            <p>{error}</p>
                        )}
                    </>

                )}
                {(!user || (user && user.id !== id)) && (
                    <h1>Liste de visionnement</h1>
                )}
                <ul className='watchlist'>
                    {watchlist.map(function (movie, i) {
                        return <li key={movie._id}>
                            <Link to={`/movies/${movie._id}`} key={movie._id}>
                                <img
                                    src={movie.Poster}
                                    alt={`${movie.Title} Poster`}
                                    style={{ width: '160px', height: '240px' }} />
                                <h2 className='movietitle'>{movie.Title}</h2>
                            </Link>
                            <p>{movie.Year} &emsp; {movie.Runtime} &emsp; {movie.Rated} &emsp; {movie.Genre}</p>
                            <p>Director : {movie.Director} &emsp; Actors : {movie.Actors}</p>
                            <p>{movie.Plot}</p>
                            {user && user.id === id && (<Button variant="outline-danger" size='sm' onClick={() => removeMovie(movie._id)}>Supprimer</Button>)}
                        </li>;
                    })}
                </ul>
            </div>
        </div>
    );
};

export default Watchlist