import React, { useEffect, useState } from 'react'
import { Row, Col, Form } from 'react-bootstrap'
import useDebouncedValue from '../hooks/useDebouncedValue.js'

export default function NavBarFilter({ onSearch, onSort }) {
  const [q, setQ] = useState('')
  const debounced = useDebouncedValue(q, 300)

  useEffect(() => { onSearch(debounced) }, [debounced, onSearch])

  return (
    <Row className="g-2 my-3">
      <Col md={8}>
        <Form.Control
          type="text"
          placeholder="Tìm kiếm theo tiêu đề..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </Col>
      <Col md={4}>
        <Form.Select onChange={(e) => onSort(e.target.value)} defaultValue="name-asc">
          <option value="name-asc">Name A→Z</option>
          <option value="price-asc">Price Ascending</option>
          <option value="price-desc">Price Descending</option>
        </Form.Select>
      </Col>
    </Row>
  )
}
