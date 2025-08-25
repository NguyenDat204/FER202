import React, { useEffect, useMemo, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { getProducts } from '../utils/api.js'
import ProductCard from './ProductCard.js'
import { useWishlist } from '../contexts/WishlistContext.js'

export default function ProductGrid({ query, sort }) {
  const [products, setProducts] = useState([])
  const { wishlist } = useWishlist()

  useEffect(() => {
    getProducts().then(setProducts).catch(() => setProducts([]))
  }, [])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    let arr = products.filter((p) => p.title.toLowerCase().includes(q))
    if (sort === 'name-asc') arr = arr.sort((a, b) => a.title.localeCompare(b.title))
    if (sort === 'price-asc') arr = arr.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price))
    if (sort === 'price-desc') arr = arr.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price))
    return arr
  }, [products, query, sort])

  const wishedIds = useMemo(() => new Set(wishlist.map((w) => w.id)), [wishlist])

  return (
    <Container className="mb-5">
      <Row>
        {visible.map((p) => (
          <Col key={p.id} xs={12} md={6} lg={4} className="mb-3">
            <ProductCard product={p} isWished={wishedIds.has(p.id)} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}
