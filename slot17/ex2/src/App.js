import React, { useState } from "react";
import { CartProvider } from "./context/CartContext";
import DishesList from "./components/DishesList";
import Cart from "./components/Cart";
import SearchBar from "./components/SearchBar";
import { Container, Navbar, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

const dishes = [
  {
    id: 0,
    name: "Uthappizza",
    image: "images/uthappizza.png",
    price: "4.99",
    description: "A unique combination of Indian Uthappam and Italian pizza.",
  },
  {
    id: 1,
    name: "Zucchipakoda",
    image: "images/zucchipakoda.png",
    price: "1.99",
    description: "Deep fried Zucchini with chickpea batter.",
  },
  {
    id: 2,
    name: "Vadonut",
    image: "images/vadonut.png",
    price: "1.99",
    description: "A combination of vada and donut.",
  },
  {
    id: 3,
    name: "ElaiCheese Cake",
    image: "images/elaicheesecake.png",
    price: "2.99",
    description: "New York Style Cheesecake with Indian cardamoms.",
  },
];

function App() {
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  return (
    <CartProvider>
      <div className={darkMode ? "dark-mode" : ""}>
        <Navbar bg={darkMode ? "dark" : "light"} variant={darkMode ? "dark" : "light"} className="mb-4">
          <Container>
            <Navbar.Brand href="#">🍽️ Food Order App</Navbar.Brand>
            <Button variant={darkMode ? "light" : "dark"} onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
            </Button>
          </Container>
        </Navbar>

        <Container>
          <SearchBar search={search} setSearch={setSearch} />
          <DishesList dishes={dishes} search={search} />
          <Cart />
        </Container>
      </div>
    </CartProvider>
  );
}

export default App;
