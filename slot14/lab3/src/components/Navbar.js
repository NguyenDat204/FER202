import React, { useState } from "react";
import { Navbar, Nav, Form, FormControl, Container, Button } from "react-bootstrap";
import ProfileWizard from "./ProfileWizard";

function AppNavbar({ search, setSearch }) {
  const [showWizard, setShowWizard] = useState(false);

  return (
    <>
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

            <Form className="d-flex me-2">
              <FormControl
                type="text"
                placeholder="🔍 Quick search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="me-2 search-input"
              />
            </Form>

            {/* Nút mở Profile Wizard */}
            <Button variant="outline-info" onClick={() => setShowWizard(true)}>
              Build Profile
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Profile Wizard Modal */}
      <ProfileWizard show={showWizard} onHide={() => setShowWizard(false)} />
    </>
  );
}

export default AppNavbar;
