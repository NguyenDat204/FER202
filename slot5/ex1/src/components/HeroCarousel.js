import React from 'react';
import { Carousel, Container } from 'react-bootstrap';

function HeroCarousel({ items = [] }) {
  return (
    <Container style={{ maxWidth: 1100 }}>
      <Carousel className="mb-4 shadow-soft rounded">
        {items.map((it, idx) => (
          <Carousel.Item key={idx}>
            <img className="d-block w-100" src={it.image} alt={it.title} style={{ maxHeight: 360, objectFit: 'cover', borderRadius: 8 }} />
            <Carousel.Caption>
              <h3>{it.title}</h3>
              <p>{it.caption}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
}

export default HeroCarousel;
