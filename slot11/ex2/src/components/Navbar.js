import React from "react";
import { Navbar, Nav, Form, FormControl, Container } from "react-bootstrap";

function AppNavbar({ search, setSearch }) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm sticky-top">
      <Container fluid>
        <Navbar.Brand href="/" className="fw-bold text-primary">
          🎓 StudentApp
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">Students</Nav.Link>
            <Nav.Link href="#">About</Nav.Link>
          </Nav>

          <Form className="d-flex">
            <FormControl
              type="text"
              placeholder="🔍 Quick search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="me-2 search-input"
            />
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;