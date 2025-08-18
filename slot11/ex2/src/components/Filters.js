import React from "react";
import { Form } from "react-bootstrap";

function Filters({ filterAge, setFilterAge, hasAvatar, setHasAvatar }) {
  return (
    <div className="filters-box d-flex gap-4 mb-3">
      <Form.Select
        value={filterAge}
        onChange={(e) => setFilterAge(e.target.value)}
      >
        <option value="">All ages</option>
        <option value="<=20">≤ 20</option>
        <option value="21-25">21 – 25</option>
        <option value=">25">> 25</option>
      </Form.Select>

      <Form.Check
        type="checkbox"
        label="Has avatar"
        checked={hasAvatar}
        onChange={(e) => setHasAvatar(e.target.checked)}
      />
    </div>
  );
}

export default Filters;
