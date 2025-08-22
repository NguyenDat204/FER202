import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { OrderContext } from "../context/OrderContext";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";

const Checkout = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { cartItems, totalValue, clearCart } = useContext(CartContext);
  const { addOrder } = useContext(OrderContext);
  const nav = useNavigate();

  // Nếu chưa login thì điều hướng về trang Login
  useEffect(() => {
    if (!isAuthenticated) {
      nav("/login");
    }
  }, [isAuthenticated, nav]);

  const handlePayment = () => {
    if (cartItems.length === 0) {
      alert("Giỏ hàng trống!");
      return nav("/products");
    }

    // Tạo đơn hàng mới
    const newOrder = {
      id: Date.now(),
      items: cartItems,
      total: totalValue,
      date: new Date().toLocaleString(),
    };

    // Lưu đơn hàng vào OrderContext
    addOrder(newOrder);

    // Xóa giỏ hàng
    clearCart();

    // Điều hướng sang chi tiết đơn hàng
    nav(`/orders/${newOrder.id}`);
  };

  return (
    <Container className="mt-4">
      <h2>Checkout</h2>
      <p>Giả lập thanh toán ở đây…</p>
      <h5>Tổng: ${totalValue}</h5>
      <Button variant="success" onClick={handlePayment}>
        Pay now
      </Button>
    </Container>
  );
};

export default Checkout;
