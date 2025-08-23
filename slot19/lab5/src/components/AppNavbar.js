import React, { useContext } from "react";
import { Navbar, Nav, Container, Badge, NavDropdown, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { FavouritesContext } from "../context/FavouritesContext";
import { AuthContext } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";

const AppNavbar = () => {
  const { cartItems = [] } = useContext(CartContext);
  const { favourites = [] } = useContext(FavouritesContext);
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" className="mb-3">
      <Container>
        <Navbar.Brand as={Link} to="/">Dishes Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/products">Products</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/favourites">
              ❤️ <Badge bg="secondary">{favourites.length}</Badge>
            </Nav.Link>
            <Nav.Link as={Link} to="/cart">
              🛒 <Badge bg="secondary">{cartItems.length}</Badge>
            </Nav.Link>

            <NavDropdown title={isAuthenticated ? `👤 ${user?.username}` : "Account"} align="end">
              {!isAuthenticated ? (
                <NavDropdown.Item onClick={() => navigate("/login")}>Login</NavDropdown.Item>
              ) : (
                <>
                  <NavDropdown.Item onClick={() => navigate("/profile")}>Profile</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => navigate("/favourites")}>My Favourites</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </>
              )}
            </NavDropdown>

            <Button variant="outline-info" className="ms-2">
              <ThemeToggle />
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
