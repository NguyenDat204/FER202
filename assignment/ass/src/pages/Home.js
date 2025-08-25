import React, { useCallback, useState } from 'react'
import HeroSlider from '../components/HeroSlider.js'
import NavBarFilter from '../components/NavbarFilter.js'
import ProductGrid from '../components/ProductGrid.js'
import { Container } from 'react-bootstrap'

export default function Home() {
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('name-asc')
  
  const onSearch = useCallback((q) => setQuery(q), [])
  const onSort = useCallback((s) => setSort(s), [])

  return (
    <>
      <HeroSlider />
      <Container>
        <NavBarFilter onSearch={onSearch} onSort={onSort} />
        <ProductGrid query={query} sort={sort} />
      </Container>
    </>
  )
}
