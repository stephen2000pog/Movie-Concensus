import React, {useState} from 'react';
import {Button, Form, Modal} from 'react-bootstrap';

function UpdateProfil({username, email, showModal, closeModal, handleActionBtnModalProfil}) {

  const [profil, setProfil] =
      useState({email: email,username:username});

  const handleChange = (e) => {
    const {name, value} = e.target;
    setProfil(prevState => ({...prevState, [name]: value}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleActionBtnModalProfil(profil);
    closeModal();
  };

  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton className='fs-5 bg-secondary text-white'>
        <Modal.Title >Mise a jour du Profil</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Nom:</Form.Label>
            <Form.Control as='textarea' rows={1}  name='username' value={profil.username} onChange={handleChange} required />
          </Form.Group>
          <br/>
          <Button variant="primary" type="submit">
            Modifier
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default UpdateProfil;