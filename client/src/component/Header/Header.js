import { Button, Container, Form, Navbar } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';

function Header() {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">MOVIE-CONCENSUS</Navbar.Brand>
          <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
            <Nav.Link href="/">Accueil</Nav.Link>
            <Nav.Link href="/movies">Films</Nav.Link> 
            <Nav.Link href="/adduser">Fonctionnalité non implementée</Nav.Link>
            <Nav.Link href="/connexion">Connexion</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Recherche"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Recherche</Button>
          </Form>
        </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}

export default Header;