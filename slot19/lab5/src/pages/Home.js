import React from "react";
import { Container } from "react-bootstrap";
import AppCarousel from "../components/AppCarousel";

const Home = () => {
  return (
    <Container>
      <AppCarousel />
      <h2 className="mt-3">Welcome to Dishes Shop</h2>
    </Container>
  );
};

export default Home;
