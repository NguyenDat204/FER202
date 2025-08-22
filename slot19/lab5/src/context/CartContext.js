import React, { createContext, useEffect, useMemo, useReducer } from "react";
import { cartInitial, cartReducer } from "../reducers/cartReducer";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, cartInitial, (init) => {
    try {
      const saved = localStorage.getItem("cart_state_v2");
      return saved ? JSON.parse(saved) : init;
    } catch {
      return init;
    }
  });

  useEffect(() => {
    localStorage.setItem("cart_state_v2", JSON.stringify(state));
  }, [state]);

  const addToCart = (product) => dispatch({ type: "ADD", payload: product });
  const removeFromCart = (id) => dispatch({ type: "REMOVE_ONE_BY_ID", payload: id });
  const clearCart = () => dispatch({ type: "CLEAR" });

  const totalValue = useMemo(
    () =>
      state.items.reduce((sum, it) => sum + parseFloat(it.price), 0).toFixed(2),
    [state.items]
  );

  const value = useMemo(
  () => ({
    cartItems: state.items || [], 
    addToCart,
    removeFromCart,
    clearCart,
    totalValue,
  }),
  [state.items, totalValue]
);


  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
