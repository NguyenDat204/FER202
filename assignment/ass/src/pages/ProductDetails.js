import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProduct } from '../utils/api.js'
import { Container, Row, Col, Image, Button, Badge } from 'react-bootstrap'
import { useCart } from '../contexts/CartContext.js'
import { useWishlist } from '../contexts/WishlistContext.js'
import { useAuth } from '../contexts/AuthContext.js'
import { useToast } from '../contexts/ToastContext.js'
import { useLocation, useNavigate } from 'react-router-dom'

export default function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const { addToCart } = useCart()
  const { wishlist, addToWishlist } = useWishlist()
  const { user } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    getProduct(id).then(setProduct)
  }, [id])

  if (!product) return <Container className="mt-4">Đang tải...</Container>

  const isWished = wishlist.some((w) => w.id === product.id)
  const price = product.salePrice || product.price

  const onWishlist = () => {
    if (!user) {
      toast.showToast('info', 'Please sign in to save wishlist')
      const redirect = encodeURIComponent(location.pathname + location.search)
      navigate(`/login?redirect_uri=${redirect}`)
      return
    }
    if (!isWished) {
      addToWishlist(product)
      toast.showToast('success', 'Added to wishlist!')
    } else {
      navigate('/wishlist')
    }
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.title} fluid onError={(e) => (e.currentTarget.src = '/images/placeholder.png')} />
        </Col>
        <Col md={6}>
          <h3>
            {product.title}{' '}
            {product.tags?.includes('hot') && <Badge bg="danger">HOT</Badge>}{' '}
            {product.tags?.includes('sale') && <Badge bg="success">SALE</Badge>}
          </h3>
          <p className="lead">
            {product.salePrice ? (
              <>
                <span className="text-muted text-decoration-line-through me-2">{product.price}</span>
                <strong>{price}</strong>
              </>
            ) : <strong>{price}</strong>}
          </p>
          <p className="text-muted">Mô tả ngắn: {product.name}</p>
          <div className="d-flex gap-2">
            <Button onClick={() => { addToCart(product); toast.showToast('success', 'Added to cart!') }}>
              Add to Cart
            </Button>
            <Button variant={isWished ? 'outline-danger' : 'danger'} onClick={onWishlist}>
              {isWished ? 'View Wishlist' : 'Add to Wishlist'}
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
