import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/index.css';
import App from './App';
import Connexion from './component/Connexion/Connexion';
import CreateAccount from './component/CreateAccount/CreateAccount';
import Movies from './component/Movies/Movies';
import MovieDetails from './component/Movies/MovieDetails'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './component/Home/Home';
import ErrorPage from './component/ErrorPage/ErrorPage';
import Account from './component/Account/Account'
import SearchResults from './component/SearchResults/SearchResults';
import Watchlist from './component/Watchlist/Watchlist'
import ListeAvis from './component/Avis/ListeAvis';
import SearchList from './component/SearchList/SearchList';
import Profil from './component/Profil/Profil'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home/>,
      },
      {
        path: "movies",
        element: <Movies />,
      },
      {
        path: "movies/:id",
        element: <MovieDetails />,
      },
      {
        path: "search-results/:searchType/:searchTerm",
        element: <SearchResults />,
      },
      {
        path: "connexion",
        element: <Connexion />,
      },
      {
        path: "create-account",
        element: <CreateAccount />,
      },
      {
        path: "/account-info/:id",
        element: <Account />
      },
      {
        path: "/watchlist/:id",
        element: <Watchlist />
      },
      {
        path: "/listeAvis",
        element: <ListeAvis />
      },
      {
        path: "/searchlist",
        element: <SearchList />
      },
      {
        path: "/profil/:email",
        element: <Profil />
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

