import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

function NavbarMenu() {
  return (
    <Navbar bg="white" expand="lg" fixed="top" className="border-bottom shadow-sm py-3">
      <Container className="d-flex justify-content-between align-items-center position-relative">
        {/* Logo bên trái */}
        <div className="d-flex align-items-center">
          <Navbar.Brand href="#" className="fw-bold text-success m-0">
            <img src="/logo.png" alt="Logo" height="30" className="me-2" />
            Healthy Recipe Finder
          </Navbar.Brand>
        </div>

        {/* Menu giữa màn hình */}
        <div className="position-absolute start-50 translate-middle-x">
          <Nav className="gap-4">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">About</Nav.Link>
            <Nav.Link href="#">Recipes</Nav.Link>
          </Nav>
        </div>

        {/* Nút bên phải */}
        <div>
          <Button
            variant="success"
            className="px-4"
            style={{
              borderRadius: '20px',
              backgroundColor: '#234f38',
              border: 'none'
            }}
          >
            Browse recipes
          </Button>
        </div>
      </Container>
    </Navbar>
  );
}

export default NavbarMenu;
