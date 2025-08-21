import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import CartItem from "./CartItem";
import { Card, ListGroup, Button, Alert, Modal } from "react-bootstrap";

const Cart = () => {
  const { cartItems, clearCart, totalValue } = useContext(CartContext);
  const [message, setMessage] = useState("");
  const [showConfirm, setShowConfirm] = useState(false); 
  const [isConfirmed, setIsConfirmed] = useState(false); 
  const [orderDetails, setOrderDetails] = useState(null);

  const handleConfirmOrder = () => {
    if (cartItems.length === 0) {
      setMessage("❌ Giỏ hàng trống, không thể xác nhận đơn hàng!");
      return;
    }
    setShowConfirm(true);
  };

  const handleConfirmYes = () => {
    setIsConfirmed(true);
    setShowConfirm(false);
    setMessage("✅ Đơn hàng đã được xác nhận! Vui lòng bấm Thanh toán.");
  };

  const handleConfirmNo = () => {
    setShowConfirm(false);
  };

  // Thanh toán
  const handlePayment = () => {
    if (!isConfirmed) {
      setMessage("⚠️ Vui lòng xác nhận đơn hàng trước khi thanh toán!");
      return;
    }

    // Lưu thông tin đơn hàng
    const newOrder = {
      items: [...cartItems],
      total: totalValue,
      time: new Date().toLocaleString(),
    };
    setOrderDetails(newOrder);

    setMessage("💳 Thanh toán thành công!");
    clearCart();
    setIsConfirmed(false);
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>🛒 Giỏ hàng</Card.Title>
        
        {cartItems.length === 0 && !orderDetails && (
          <p>Giỏ hàng của bạn đang trống.</p>
        )}

        {cartItems.length > 0 && (
          <>
            <ListGroup variant="flush" className="mb-3">
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </ListGroup>

            <div className="mb-3">
              <p><strong>Tổng số món:</strong> {cartItems.length}</p>
              <p><strong>Tổng giá trị:</strong> ${totalValue}</p>
            </div>

            <Button variant="secondary" onClick={clearCart} className="me-2">
              Clear Cart
            </Button>
            <Button variant="warning" onClick={handleConfirmOrder} className="me-2">
              Xác nhận đơn hàng
            </Button>
            <Button variant="primary" onClick={handlePayment}>
              Thanh toán
            </Button>
          </>
        )}

        {/* Hiển thị thông tin đơn hàng sau khi thanh toán */}
        {orderDetails && (
          <div className="mt-4">
            <h5>📦 Thông tin đơn hàng</h5>
            <ListGroup className="mb-3">
              {orderDetails.items.map((item, index) => (
                <ListGroup.Item key={index}>
                  {item.name} - ${item.price}
                </ListGroup.Item>
              ))}
            </ListGroup>
            <p><strong>Tổng thanh toán:</strong> ${orderDetails.total}</p>
            <p><strong>Thời gian:</strong> {orderDetails.time}</p>
          </div>
        )}

        {message && <Alert variant="info" className="mt-3">{message}</Alert>}
      </Card.Body>

      {/* Modal xác nhận */}
      <Modal show={showConfirm} onHide={handleConfirmNo}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận đơn hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xác nhận đơn hàng này không?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleConfirmNo}>
            Hủy
          </Button>
          <Button variant="success" onClick={handleConfirmYes}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default Cart;
