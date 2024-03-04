// AddUserButton.jsx
import React from 'react';
import axios from 'axios';

const AddUserButton = () => {
  const handleAddUser = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/users', {
        username: 'JohnDoe2',
        email: 'john.doe@example.com',
      });

      console.log(response.data);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'utilisateur depuis le frontend :', error);
    }
  };

  return (
    <button onClick={handleAddUser}>Ajouter un utilisateur</button>
  );
};

export default AddUserButton;
