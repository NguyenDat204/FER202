import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products } from "../data/products";
import { CartContext } from "../context/CartContext";
import { FavouritesContext } from "../context/FavouritesContext";
import { Container, Row, Col, Button, Image } from "react-bootstrap";

const ProductDetail = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const product = products.find((p) => String(p.id) === String(id));
  const { addToCart } = useContext(CartContext);
  const { favourites, toggleFavourite } = useContext(FavouritesContext);

  if (!product) return <h3 className="text-center">Product not found</h3>;

  const isFav = favourites.includes(product.id);

  return (
    <Container>
      <Row className="align-items-center">
        <Col md={5}>
          <Image src={`/${product.image}`} alt={product.title} fluid rounded />
        </Col>
        <Col md={7}>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <h4>${parseFloat(product.price).toFixed(2)}</h4>
          <div className="d-flex gap-2 mt-3">
            <Button variant="success" onClick={() => addToCart(product)}>
              Add to Cart
            </Button>
            <Button variant="secondary" onClick={() => nav("/products")}>
              Back to List
            </Button>
            <Button
              variant={isFav ? "danger" : "warning"}
              onClick={() => toggleFavourite(product.id)}
            >
              {isFav ? "Remove Favourite" : "Add to Favourite"}
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
