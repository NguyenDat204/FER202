import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

const FormSelect = ({ label, name, value, onChange, options, error }) => {
  return (
    <Form.Group controlId={`form-${name}`} className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Select
        name={name}
        value={value}
        onChange={onChange}
        isInvalid={!!error}
      >
        <option value="">-- Chọn giới tính --</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </Form.Select>
      <Form.Control.Feedback type="invalid">
        {error}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

FormSelect.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  error: PropTypes.string,
};

FormSelect.defaultProps = {
  error: "",
};

export default FormSelect;
