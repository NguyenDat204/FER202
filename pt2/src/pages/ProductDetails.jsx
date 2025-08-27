import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import api from '../services/api';
import { formatPrice } from '../utils/format';

export default function ProductDetails() {
  const { id } = useParams();
  const [prod, setProd] = useState(null);

  useEffect(() => {
    (async () => {
      const { data } = await api.get(`/products/${id}`);
      setProd(data);
    })();
  }, [id]);

  if (!prod) return <Container className="py-4">Loading...</Container>;

  return (
    <Container className="py-4">
      <Row className="g-4">
        <Col md={6}>
          <Card>
            <Card.Img src={prod.image || `https://picsum.photos/seed/${prod.id}/800/600`} />
          </Card>
        </Col>
        <Col md={6}>
          <h2>{prod.title || prod.name}</h2>
          <p className="text-muted">{prod.description}</p>
          <h4 className="mb-3">{formatPrice(prod.price)}</h4>
          <Button variant="success" className="me-2">Add to Cart</Button>
          <Button as={Link} to="/products" variant="outline-secondary">Back</Button>
        </Col>
      </Row>
    </Container>
  );
}
