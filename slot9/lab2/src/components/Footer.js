import React from 'react';
import { Container } from 'react-bootstrap';

function Footer() {
  return (
    <footer style={{ backgroundColor: "#222", color: "#fff", padding: "20px 0", marginTop: "40px" }}>
      <Container className="text-center">
        <p className="mb-1">© {new Date().getFullYear()} Movie Explorer</p>
        <p className="mb-0" style={{ fontSize: "0.9rem", color: "#bbb" }}>
          Built with React & React-Bootstrap
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
