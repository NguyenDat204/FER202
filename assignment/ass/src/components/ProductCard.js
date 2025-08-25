import React from 'react'
import { Card, Button, Badge } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext.js'
import { useWishlist } from '../contexts/WishlistContext.js'
import { useAuth } from '../contexts/AuthContext.js'
import { useToast } from '../contexts/ToastContext.js'
import { BsHeart, BsHeartFill } from 'react-icons/bs'

export default function ProductCard({ product, isWished }) {
  const { addToCart } = useCart()
  const { addToWishlist } = useWishlist()
  const { user } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const location = useLocation()

  const price = product.salePrice || product.price
  const onAddCart = () => {
    addToCart(product)
    toast.showToast('success', 'Added to cart!')
  }

  const onWishlist = () => {
    if (!user) {
      toast.showToast('info', 'Please sign in to save wishlist')
      const redirect = encodeURIComponent(location.pathname + location.search)
      navigate(`/login?redirect_uri=${redirect}`)
      return
    }
    if (isWished) {
      navigate('/wishlist')
      return
    }
    addToWishlist(product)
    toast.showToast('success', 'Added to wishlist!')
  }

  const hasHot = product.tags?.includes('hot')
  const hasSale = product.tags?.includes('sale')

  return (
    <Card className="h-100">
      <Link to={`/product/${product.id}`}>
        <Card.Img variant="top" src={product.image} alt={product.title}
          onError={(e) => (e.currentTarget.src = '/images/placeholder.png')}
        />
      </Link>
      <Card.Body>
        <div className="d-flex align-items-start justify-content-between">
          <Card.Title className="me-2">{product.title}</Card.Title>
          <div>
            {hasHot && <Badge bg="danger" className="me-1">HOT</Badge>}
            {hasSale && <Badge bg="success">SALE</Badge>}
          </div>
        </div>
        <Card.Text className="mt-2">
          {product.salePrice ? (
            <>
              <span className="text-muted text-decoration-line-through me-2">{product.price}</span>
              <strong>{price}</strong>
            </>
          ) : (
            <strong>{price}</strong>
          )}
        </Card.Text>
        <div className="d-flex gap-2">
          <Button variant="primary" onClick={onAddCart}>Add to Cart</Button>
          <Button variant={isWished ? 'outline-danger' : 'danger'} onClick={onWishlist} title="Wishlist">
            {isWished ? <BsHeartFill /> : <BsHeart />} {isWished ? 'View' : 'Wishlist'}
          </Button>
          <Button as={Link} to={`/product/${product.id}`} variant="outline-secondary">View Details</Button>
        </div>
      </Card.Body>
    </Card>
  )
}
