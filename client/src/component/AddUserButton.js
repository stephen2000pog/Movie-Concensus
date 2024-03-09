// AddUserButton.jsx
import React from 'react';
import axios from 'axios';
import '../App.css';

const AddUserButton = () => {
  const handleAddUser = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/users', {
        username: 'JohnDoe5',
        email: 'john.doe5@example.com',
        password: 'jonhdoe5'
      });
      console.log(response.data);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'utilisateur depuis le frontend :', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleAddUser}>Ajouter un utilisateur</button>
      </header>
    </div>
  );
};

export default AddUserButton;
