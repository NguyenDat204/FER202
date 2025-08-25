import React from 'react'
import { Container, ListGroup, Button } from 'react-bootstrap'
import { useWishlist } from '../contexts/WishlistContext.js'
import { useCart } from '../contexts/CartContext.js'
import { useToast } from '../contexts/ToastContext.js'

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()
  const toast = useToast()

  return (
    <Container className="mt-4" style={{ maxWidth: '720px' }}>
      <h3 className="mb-3">Wishlist</h3>
      <ListGroup>
        {wishlist.map((it) => (
          <ListGroup.Item key={it.id} className="d-flex justify-content-between align-items-center">
            <div>{it.title}</div>
            <div className="d-flex gap-2">
              <Button size="sm" onClick={() => { addToCart(it); toast.showToast('success', 'Added to cart!') }}>Add to Cart</Button>
              <Button size="sm" variant="outline-danger" onClick={() => removeFromWishlist(it.id)}>Remove</Button>
            </div>
          </ListGroup.Item>
        ))}
        {wishlist.length === 0 && <ListGroup.Item>Chưa có sản phẩm yêu thích</ListGroup.Item>}
      </ListGroup>
    </Container>
  )
}
