import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

const FormInput = ({ label, type, name, value, onChange, error }) => {
  return (
    <Form.Group controlId={`form-${name}`} className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        isInvalid={!!error}
      />
      <Form.Control.Feedback type="invalid">
        {error}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

FormInput.defaultProps = {
  type: "text",
  error: "",
};

export default FormInput;
