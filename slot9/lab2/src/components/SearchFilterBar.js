import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, InputGroup } from 'react-bootstrap';
import { BiSearch } from 'react-icons/bi';

function SearchFilterBar({ search, setSearch, genre, setGenre, sort, setSort, genres, count }) {
  return (
    <Form className="mb-3">
      <Row className="g-2 align-items-end">
        <Col xs={12} md={6}>
          <Form.Label>Tìm kiếm</Form.Label>
          <InputGroup>
            <InputGroup.Text><BiSearch /></InputGroup.Text>
            <Form.Control
              placeholder="Nhập tên phim..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col xs={6} md={3}>
          <Form.Label>Genre</Form.Label>
          <Form.Select value={genre} onChange={(e) => setGenre(e.target.value)}>
            {genres.map(g => <option key={g} value={g}>{g}</option>)}
          </Form.Select>
        </Col>
        <Col xs={6} md={3}>
          <Form.Label>Sắp xếp</Form.Label>
          <Form.Select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="none">None</option>
            <option value="asc">Duration ↑</option>
            <option value="desc">Duration ↓</option>
          </Form.Select>
        </Col>
        <Col xs={12}>
          <small className="text-muted">Kết quả: {count}</small>
        </Col>
      </Row>
    </Form>
  );
}

SearchFilterBar.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  genre: PropTypes.string.isRequired,
  setGenre: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired,
  setSort: PropTypes.func.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  count: PropTypes.number.isRequired
};

export default SearchFilterBar;
