import React, { useContext } from "react";
import { Card, Button } from "react-bootstrap";
import { CartContext } from "../context/CartContext";
import { FavouritesContext } from "../context/FavouritesContext";
import { Link } from "react-router-dom";

const ProductCard = ({ product, onToast }) => {
  const { addToCart } = useContext(CartContext);
  const { favourites, toggleFavourite } = useContext(FavouritesContext);
  const isFav = favourites.includes(product.id);

  const handleAddCart = () => {
    addToCart(product);
    onToast && onToast("Added to cart");
  };

  const handleFav = () => {
    toggleFavourite(product.id);
    onToast && onToast(isFav ? "Removed from favourites" : "Added to favourites");
  };

  return (
    <Card className="product-card">
      <Card.Img variant="top" src={product.image} />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Card.Text><b>${parseFloat(product.price).toFixed(2)}</b></Card.Text>
        <div className="d-flex flex-wrap gap-2">
          <Button as={Link} to={`/product/${product.id}`} variant="primary">
            View Details
          </Button>
          <Button variant="success" onClick={handleAddCart}>
            Add to Cart
          </Button>
          {!isFav ? (
            <Button variant="warning" onClick={handleFav}>
              Add to Favourite
            </Button>
          ) : (
            <Button as={Link} to="/favourites" variant="info">
              Browse to My favourite
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
