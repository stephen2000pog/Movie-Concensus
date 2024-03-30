import React, {useState} from 'react';
import {Button, Form, Modal} from 'react-bootstrap';

function AddAvisModal({titleFilm,idMovie, email, showModal, closeModal, handleActionBtnModalAvis}) {

  const [nouvelAvis, setNouvelAvis] =
      useState({email: email,idMovie:idMovie, avis: '', note: 0});

  const handleChange = (e) => {
    const {name, value} = e.target;
    setNouvelAvis(prevState => ({...prevState, [name]: value}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleActionBtnModalAvis(nouvelAvis);
    closeModal();
  };

  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton className='fs-5 bg-secondary text-white'>
        <Modal.Title >Donner votre avis sur: {titleFilm} </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Avis:</Form.Label>
            <Form.Control as='textarea' rows={3} name='avis' value={nouvelAvis.avis} onChange={handleChange} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Note: (0-5) </Form.Label>
            <Form.Control type='number' name='note' value={nouvelAvis.note} onChange={handleChange}  min={0}
          max={5} required />
          </Form.Group>
          <Button variant="primary" type="submit">
            Ajouter
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddAvisModal;