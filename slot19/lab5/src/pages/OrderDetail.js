import React, { useContext } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { OrderContext } from "../context/OrderContext";
import { Table, Container, Button, Alert } from "react-bootstrap";

const OrderDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const { orders } = useContext(OrderContext);

  const order = orders.find((o) => String(o.id) === String(id));

  if (!order) {
    return (
      <Container className="py-4">
        <h3>Order not found ❌</h3>
        <Button as={Link} to="/" variant="secondary">
          Back Home
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      {/* Alert chỉ hiện nếu có state.success */}
      {location.state?.success && (
        <Alert variant="success">Thanh toán thành công!</Alert>
      )}

      <h2>Order #{order.id}</h2>
      <p>
        <strong>Date:</strong> {order.date}
      </p>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((it, idx) => (
            <tr key={`${it.id}-${idx}`}>
              <td>{idx + 1}</td>
              <td>{it.title}</td>
              <td>${parseFloat(it.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h4 className="mt-3">Total: ${order.total}</h4>

      <Button as={Link} to="/products" variant="primary" className="mt-3">
        Continue Shopping
      </Button>
    </Container>
  );
};

export default OrderDetail;
