import React from 'react';
import { Container } from 'react-bootstrap';

function HeroSection() {
  return (
    <Container className="text-center my-4" style={{ maxWidth: '800px' }}>
      <h2 className="fw-bold">Explore our simple, healthy recipes</h2>
      <p className="text-muted" style={{ fontSize: '1rem' }}>
        Discover eight quick, whole-food dishes that fit real-life schedules and taste amazing.
        Use the search bar to find a recipe by name or ingredient, or simply scroll the list
        and let something delicious catch your eye.
      </p>
    </Container>
  );
}

export default HeroSection;
