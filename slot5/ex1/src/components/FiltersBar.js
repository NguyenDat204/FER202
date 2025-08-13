import React from 'react';
import { Container, Row, Col, Form, InputGroup } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';

function FiltersBar({ search, setSearch, maxPrep, setMaxPrep, maxCook, setMaxCook }) {
  return (
    <Container className="mb-4 mt-4">
      <Row className="g-3 align-items-center">
        {/* Max Prep Time */}
        <Col md={3} sm={6}>
          <Form.Select
            value={maxPrep}
            onChange={e => setMaxPrep(e.target.value)}
            className="rounded-pill shadow-sm"
          >
            <option value="">Max Prep Time</option>
            <option value="5">5 mins</option>
            <option value="10">10 mins</option>
            <option value="15">15 mins</option>
          </Form.Select>
        </Col>

        {/* Max Cook Time */}
        <Col md={3} sm={6}>
          <Form.Select
            value={maxCook}
            onChange={e => setMaxCook(e.target.value)}
            className="rounded-pill shadow-sm"
          >
            <option value="">Max Cook Time</option>
            <option value="5">5 mins</option>
            <option value="10">10 mins</option>
            <option value="15">15 mins</option>
            <option value="20">20 mins</option>
          </Form.Select>
        </Col>

        {/* Search */}
        <Col md={6} sm={12}>
          <InputGroup>
            <InputGroup.Text className="bg-white border-end-0 rounded-start-pill">
              <Search />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search by name or ingredient..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="rounded-end-pill shadow-sm border-start-0"
            />
          </InputGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default FiltersBar;
