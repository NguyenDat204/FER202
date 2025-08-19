import React from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

function AboutForm({ data, dispatch, onFileChange }) {
  const errors = {};

  if (!data.name) {
    errors.name = "Name không được để trống";
  }

  if (data.email && !/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Email không hợp lệ";
  }

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          type="text"
          value={data.name}
          onChange={(e) =>
            dispatch({ type: "SET_ABOUT", payload: { name: e.target.value } })
          }
          isInvalid={!!errors.name}
        />
        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={data.email}
          onChange={(e) =>
            dispatch({ type: "SET_ABOUT", payload: { email: e.target.value } })
          }
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Avatar</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          onChange={onFileChange}
        />
      </Form.Group>
    </Form>
  );
}

AboutForm.propTypes = {
  data: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  onFileChange: PropTypes.func.isRequired,
};

export default AboutForm;
