import { Navbar, Container, Nav, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaUser } from 'react-icons/fa';

export default function AppNavbar({ onLoginClick }) {
  return (
    <Navbar bg="light" expand="md" className="mb-4 shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/products">My Shop</Navbar.Brand>
        <Nav className="ms-auto align-items-center gap-3">
          <Nav.Link as={Link} to="/favourites">
            <FaHeart /> <Badge bg="secondary">0</Badge>
          </Nav.Link>
          <Nav.Link as={Link} to="/cart">
            <FaShoppingCart /> <Badge bg="secondary">0</Badge>
          </Nav.Link>
          <Nav.Link onClick={onLoginClick}>
            <FaUser /> Login
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
