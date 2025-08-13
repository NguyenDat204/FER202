import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, InputGroup } from 'react-bootstrap';

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
       viewBox="0 0 16 16" fill="currentColor">
    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85h-.017zm-5.242.656a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"/>
  </svg>
);

function FiltersBar({ search, setSearch, maxPrep, setMaxPrep, maxCook, setMaxCook, sortOption, setSortOption }) {
  const [tempSearch, setTempSearch] = useState(search);

  useEffect(() => {
    const t = setTimeout(() => setSearch(tempSearch), 300);
    return () => clearTimeout(t);
  }, [tempSearch, setSearch]);

  return (
    <Container className="mb-4">
      <Row className="g-2 align-items-center">
        <Col md={2} sm={6}>
          <Form.Select value={maxPrep} onChange={e => setMaxPrep(e.target.value)} className="rounded-pill shadow-sm">
            <option value="">Max Prep</option>
            <option value="5">5 min</option>
            <option value="10">10 min</option>
            <option value="15">15 min</option>
            <option value="30">30 min</option>
          </Form.Select>
        </Col>

        <Col md={2} sm={6}>
          <Form.Select value={maxCook} onChange={e => setMaxCook(e.target.value)} className="rounded-pill shadow-sm">
            <option value="">Max Cook</option>
            <option value="5">5 min</option>
            <option value="10">10 min</option>
            <option value="15">15 min</option>
            <option value="20">20 min</option>
            <option value="30">30 min</option>
          </Form.Select>
        </Col>

        <Col md={4} sm={12}>
          <InputGroup className="shadow-sm">
            <InputGroup.Text className="bg-white border-end-0 rounded-start-pill"><SearchIcon/></InputGroup.Text>
            <Form.Control
              placeholder="Search by name or ingredient..."
              value={tempSearch}
              onChange={e => setTempSearch(e.target.value)}
              className="border-start-0 rounded-end-pill"
            />
          </InputGroup>
        </Col>

        <Col md={4} sm={12}>
          <Form.Select value={sortOption} onChange={e => setSortOption(e.target.value)} className="rounded-pill shadow-sm">
            <option value="">Sort by</option>
            <option value="name-asc">Name A → Z</option>
            <option value="name-desc">Name Z → A</option>
            <option value="prep-asc">Prep ↑</option>
            <option value="prep-desc">Prep ↓</option>
            <option value="cook-asc">Cook ↑</option>
            <option value="cook-desc">Cook ↓</option>
          </Form.Select>
        </Col>
      </Row>
    </Container>
  );
}

export default FiltersBar;
