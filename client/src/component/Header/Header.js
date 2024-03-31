import { Button, Container, Form, Navbar } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';
import Dropdown from 'react-bootstrap/Dropdown';

function Header() {

  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  }

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">MOVIE-CONCENSUS</Navbar.Brand>
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
            <Nav.Link href="/">Accueil</Nav.Link>
            <Nav.Link href="/movies">Films</Nav.Link>
            {!user && (
              <div>
                <Nav.Link href="/connexion">Connexion</Nav.Link>
              </div>
            )}
            {user && (
            //https://react-bootstrap.netlify.app/docs/components/dropdowns/
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic">
                Profil
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/account-info">Configurer Profil</Dropdown.Item>
                <Dropdown.Item href="/watchlist">Liste de visionnement</Dropdown.Item>
                <Dropdown.Item href="#/action-7">Favoris</Dropdown.Item>
                <Dropdown.Item href="#/action-4">Vos Avis</Dropdown.Item>
                <Dropdown.Item href="/" onClick={handleClick}>Déconnexion</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
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