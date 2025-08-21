import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Card, Button } from "react-bootstrap";

function DishItem({ dish }) {
  const { addToCart } = useContext(CartContext);

  return (
    <Card className="dish-card h-100 d-flex flex-column">
      <Card.Img variant="top" src={dish.image} alt={dish.name} className="dish-img"/>
      <Card.Body className="d-flex flex-column">
        <Card.Title>{dish.name}</Card.Title>
        <Card.Text className="flex-grow-1">{dish.description}</Card.Text>
        <Card.Text className="fw-bold">Price: ${parseFloat(dish.price).toFixed(2)}</Card.Text>
        <div className="mt-auto">
          <Button variant="success" onClick={() => addToCart(dish)} className="w-100">
            Add to Cart
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default DishItem;
