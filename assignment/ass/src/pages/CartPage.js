import React from 'react'
import { Table, Container, Button } from 'react-bootstrap'
import { useCart } from '../contexts/CartContext.js'
import { Link } from 'react-router-dom'

export default function CartPage() {
  const { items, incQty, decQty, removeFromCart, subtotal } = useCart()

  return (
    <Container className="mt-4">
      <h3 className="mb-3">Cart</h3>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Product</th>
            <th style={{ width: 120 }}>Qty</th>
            <th>Price</th>
            <th style={{ width: 120 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it) => (
            <tr key={it.id}>
              <td>{it.title}</td>
              <td>
                <div className="d-flex align-items-center gap-2">
                  <Button size="sm" variant="outline-secondary" onClick={() => decQty(it.id)}>-</Button>
                  <span>{it.qty}</span>
                  <Button size="sm" variant="outline-secondary" onClick={() => incQty(it.id)}>+</Button>
                </div>
              </td>
              <td>{(it.salePrice || it.price) * it.qty}</td>
              <td>
                <Button size="sm" variant="outline-danger" onClick={() => removeFromCart(it.id)}>Remove</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h4 className="text-end">Subtotal: {subtotal}</h4>
      <div className="text-end">
        <Button as={Link} to="/">back</Button>
        <Button as={Link} to="/checkout" variant="success">Proceed to Checkout</Button>
      </div>
    </Container>
  )
}
