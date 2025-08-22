import React, { useContext } from "react";
import { FavouritesContext } from "../context/FavouritesContext";
import { products } from "../data/products";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Favourites = () => {
  const { favourites, clearFavourites } = useContext(FavouritesContext);
  const list = products.filter((p) => favourites.includes(p.id));

  return (
    <Container>
      <h2 className="mb-3">My Favourites</h2>
      {list.length === 0 ? (
        <>
          <p>Danh sách yêu thích trống.</p>
          <Button as={Link} to="/products">Browse products</Button>
        </>
      ) : (
        <>
          <Row>
            {list.map((p) => (
              <Col key={p.id} sm={6} md={4} lg={3}>
                <Card className="mb-3">
                  <Card.Img variant="top" src={p.image} />
                  <Card.Body>
                    <Card.Title>{p.title}</Card.Title>
                    <Card.Text>${parseFloat(p.price).toFixed(2)}</Card.Text>
                    <Button as={Link} to={`/product/${p.id}`} variant="primary">
                      View Details
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <Button variant="outline-danger" onClick={clearFavourites}>
            Clear favourites
          </Button>
        </>
      )}
    </Container>
  );
};

export default Favourites;
