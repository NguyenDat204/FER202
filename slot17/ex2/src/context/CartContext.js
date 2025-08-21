import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Thêm món ăn
  const addToCart = (dish) => {
    setCartItems((prev) => [...prev, dish]);
  };

  // Xóa món theo id
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Xóa toàn bộ giỏ
  const clearCart = () => setCartItems([]);

  // Tính tổng giá
  const totalValue = cartItems
    .reduce((acc, item) => acc + parseFloat(item.price), 0)
    .toFixed(2);

  // Load từ localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cartItems"));
    if (saved) setCartItems(saved);
  }, []);

  // Lưu vào localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, totalValue }}
    >
      {children}
    </CartContext.Provider>
  );
};
