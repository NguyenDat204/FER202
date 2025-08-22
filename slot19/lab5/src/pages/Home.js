import React from "react";
import { Container } from "react-bootstrap";
import AppCarousel from "../components/AppCarousel";

const Home = () => {
  return (
    <Container>
      <AppCarousel />
      <h2 className="mt-3">Welcome to React Shop</h2>
      <p>Trang demo Lab5: Router, Context, Reducer, Favourites, Checkout…</p>
    </Container>
  );
};

export default Home;
