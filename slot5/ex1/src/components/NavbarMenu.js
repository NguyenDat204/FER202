import React from "react";
import { Navbar, Nav, Container, Button, Badge } from "react-bootstrap";

function NavbarMenu({ favouritesCount, onOpenRequestForm }) {
  return (
    <Navbar bg="light" expand="lg" fixed="top" className="py-3 shadow-sm">
      <Container>
        <Navbar.Brand href="#">
          <img src="/logo.png" alt="Logo" height="30" className="me-2" />
          Healthy Recipe Finder
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="mx-auto text-center">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">About</Nav.Link>
            <Nav.Link href="#">Recipes</Nav.Link>
            <Nav.Link onClick={onOpenRequestForm}>Recipe Request Form</Nav.Link>
          </Nav>

          <Button variant="success" className="rounded-pill position-relative">
            Browse recipes
            {favouritesCount > 0 && (
              <Badge
                bg="danger"
                pill
                className="position-absolute top-0 start-100 translate-middle"
              >
                {favouritesCount}
              </Badge>
            )}
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarMenu;
