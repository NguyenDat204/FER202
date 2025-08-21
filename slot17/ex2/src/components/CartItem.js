import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { ListGroup, Button } from "react-bootstrap";

function CartItem({ item }) {
  const { removeFromCart } = useContext(CartContext);

  return (
    <ListGroup.Item className="d-flex justify-content-between align-items-center">
      {item.name} - ${item.price}
      <Button size="sm" variant="danger" onClick={() => removeFromCart(item.id)}>
        Remove
      </Button>
    </ListGroup.Item>
  );
}

export default CartItem;
