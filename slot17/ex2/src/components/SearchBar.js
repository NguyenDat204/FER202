import React from "react";
import { Form } from "react-bootstrap";

function SearchBar({ search, setSearch }) {
  return (
    <Form className="mb-4">
      <Form.Control
        type="text"
        placeholder="🔍 Tìm món ăn..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </Form>
  );
}

export default SearchBar;
