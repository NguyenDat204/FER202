import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function NavbarMenu() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand>Movie Explorer</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/" end>Free Movies</Nav.Link>
          <Nav.Link as={NavLink} to="/favourites">My Favourite Movies</Nav.Link>
          <Nav.Link as={NavLink} to="/request">Movie Request Form</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavbarMenu;
