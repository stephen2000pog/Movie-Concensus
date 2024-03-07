import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import Connexion from './component/Connexion/Connexion';
import Movies from './component/Movies/Movies';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './component/Home/Home';
import ErrorPage from './component/ErrorPage/ErrorPage';

import AddUserButton from './component/AddUserButton';

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
        path: "connexion",
        element: <Connexion />,
      },
      {
        path: "adduser",
        element: <AddUserButton />,
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

