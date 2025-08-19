import React from "react";
import { Form } from "react-bootstrap";

function SortDropdown({ sortOption, setSortOption }) {
  return (
    <div className="sort-box p-3">
      <Form.Select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="">Sort by...</option>
        <option value="age-asc">Age ↑</option>
        <option value="age-desc">Age ↓</option>
        <option value="name-asc">Name A → Z</option>
        <option value="name-desc">Name Z → A</option>
      </Form.Select>
    </div>
  );
}

export default SortDropdown;
