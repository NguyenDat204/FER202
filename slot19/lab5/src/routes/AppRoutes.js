import React, { useContext } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetail from "../pages/ProductDetail";
import CartPage from "../pages/CartPage";
import Favourites from "../pages/Favourites";
import Checkout from "../pages/Checkout";
import Register from "../pages/Register";
import Login from "../pages/Login";
import { AuthContext } from "../context/AuthContext";
import OrderDetail from "../pages/OrderDetail";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/products" element={<Products/>} />
      <Route path="/product/:id" element={<ProductDetail/>} />
      <Route path="/cart" element={<CartPage/>} />
      <Route path="/favourites" element={<Favourites/>} />
      <Route path="/orders/:id" element={<OrderDetail />} />
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route
        path="/checkout"
        element={
          <PrivateRoute>
            <Checkout/>
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
