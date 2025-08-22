import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { Container, Table, Button } from "react-bootstrap";

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart, totalValue } =
    useContext(CartContext);
  const nav = useNavigate();

  return (
    <Container>
      <h2 className="mb-3">My Cart</h2>
      {cartItems.length === 0 ? (
        <>
          <p>Giỏ trống.</p>
          <Button as={Link} to="/products">
            Go to Products
          </Button>
        </>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((it, idx) => (
                <tr key={`${it.id}-${idx}`}>
                  <td>{idx + 1}</td>
                  <td>{it.title}</td>
                  <td>${parseFloat(it.price).toFixed(2)}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeFromCart(it.id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h4>Total: ${totalValue}</h4>
          <div className="d-flex gap-2 mt-3">
            <Button onClick={() => nav("/products")} variant="secondary">
              Continue Shopping
            </Button>
            <Button onClick={() => nav("/checkout")} variant="primary">
              Checkout
            </Button>
            <Button onClick={clearCart} variant="outline-danger">
              Clear Cart
            </Button>
          </div>
        </>
      )}
    </Container>
  );
};

export default CartPage;
