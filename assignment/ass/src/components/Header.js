import React from 'react'
import { Navbar, Nav, Container, Badge, NavDropdown, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { BsCart3, BsHeart, BsPersonCircle, BsBoxArrowInRight, BsBoxArrowRight } from 'react-icons/bs'
import { useAuth } from '../contexts/AuthContext.js'
import { useCart } from '../contexts/CartContext.js'
import { useWishlist } from '../contexts/WishlistContext.js'

export default function Header() {
  const { user, logout } = useAuth()
  const { count } = useCart()
  const { wishlist } = useWishlist()
  const navigate = useNavigate()

  return (
    <Navbar bg="light" expand="lg" className="mb-3 shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">MyShop</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/wishlist">
              <BsHeart /> Wishlist{' '}
              {wishlist.length > 0 && <Badge bg="danger">{wishlist.length}</Badge>}
            </Nav.Link>
            <Nav.Link as={Link} to="/cart">
              <BsCart3 /> Cart {count > 0 && <Badge bg="primary">{count}</Badge>}
            </Nav.Link>
            <Nav.Link as={Link} to="/checkout">Checkout</Nav.Link>
          </Nav>

          {user ? (
            <Nav>
              <NavDropdown
                align="end"
                title={<span><BsPersonCircle /> {user.name}</span>}
                id="user-menu"
              >
                <NavDropdown.Item as={Link} to="/wishlist">Wishlist</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/account">Account</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>
                  <BsBoxArrowRight /> Sign out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav>
              <Button
                variant="outline-primary"
                size="sm"
                className="me-2"
                as={Link}
                to="/login"
              >
                <BsBoxArrowInRight /> Sign in
              </Button>
              <Button size="sm" as={Link} to="/register">Create account</Button>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
