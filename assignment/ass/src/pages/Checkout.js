import React from 'react'
import { Container, Card, Button, ListGroup } from 'react-bootstrap'
import { useCart } from '../contexts/CartContext.js'
import { useAuth } from '../contexts/AuthContext.js'
import { createOrder } from '../utils/api.js'
import { useToast } from '../contexts/ToastContext.js'
import { useNavigate } from 'react-router-dom'

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart()
  const { user } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()

  const handleConfirm = async () => {
    if (!user) return
    const order = {
      userid: user.id,
      items,
      total: subtotal,
      date: new Date().toISOString()
    }
    try {
      await createOrder(order)
      toast.showToast('success', 'Order placed!')
      clearCart()
      navigate('/', { replace: true })
    } catch {
      toast.showToast('danger', 'Checkout failed')
    }
  }

  return (
    <Container className="mt-4" style={{ maxWidth: '720px' }}>
      <Card body>
        <h3>Xác nhận đơn hàng</h3>
        <ListGroup className="my-3">
          {items.map((it) => (
            <ListGroup.Item key={it.id} className="d-flex justify-content-between">
              <div>{it.title} × {it.qty}</div>
              <div>{(it.salePrice || it.price) * it.qty}</div>
            </ListGroup.Item>
          ))}
          {items.length === 0 && <ListGroup.Item>Giỏ hàng trống</ListGroup.Item>}
        </ListGroup>
        <h4 className="text-end">Total: {subtotal}</h4>
        <div className="text-end">
          <Button disabled={items.length === 0} onClick={handleConfirm}>Đặt hàng</Button>
        </div>
      </Card>
    </Container>
  )
}
