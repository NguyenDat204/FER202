import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

const FormCheckbox = ({ label, name, checked, onChange, error }) => {
  return (
    <Form.Group controlId={`form-${name}`} className="mb-3">
      <Form.Check
        type="checkbox"
        label={label}
        name={name}
        checked={checked}
        onChange={onChange}
        isInvalid={!!error}
      />
      {error && (
        <div className="invalid-feedback d-block">{error}</div>
      )}
    </Form.Group>
  );
};

FormCheckbox.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

FormCheckbox.defaultProps = {
  error: "",
};

export default FormCheckbox;
