import React, { useState } from 'react';
import { Form, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('all');
  const [dropdownTitle, setDropdownTitle] = useState('Tous');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchTypeChange = (type, title) => {
    setSearchType(type);
    setDropdownTitle(title);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm, searchType);
  };

  return (
    <Form className="d-flex" onSubmit={handleSubmit}>
      <DropdownButton id="dropdown-basic-button" title={dropdownTitle}>
        <Dropdown.Item onClick={() => handleSearchTypeChange('all', 'Tous')}>Tous</Dropdown.Item>
        <Dropdown.Item onClick={() => handleSearchTypeChange('title', 'Titre')}>Titre</Dropdown.Item>
        <Dropdown.Item onClick={() => handleSearchTypeChange('year', 'Année')}>Année</Dropdown.Item>
        <Dropdown.Item onClick={() => handleSearchTypeChange('actor', 'Acteur')}>Acteur</Dropdown.Item>
        <Dropdown.Item onClick={() => handleSearchTypeChange('genre', 'Genre')}>Genre</Dropdown.Item>
        <Dropdown.Item onClick={() => handleSearchTypeChange('language', 'Langue')}>Langue</Dropdown.Item>
      </DropdownButton>
      <Form.Control
        type="search"
        placeholder="Recherche"
        className="me-2"
        aria-label="Search"
        value={searchTerm}
        onChange={handleChange}
      />
      <Link to={`/search-results/${searchTerm}`}>
        <Button variant="outline-success">Recherche</Button>
      </Link>
    </Form>
  );
};

export default SearchBar;
