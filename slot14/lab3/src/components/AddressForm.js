import React from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

function AddressForm({ data, dispatch }) {
  return (
    <Form className="address-form">
      <Form.Group className="form-group">
        <Form.Label>Street Name</Form.Label>
        <Form.Control
          type="text"
          value={data.street || ""}
          onChange={(e) =>
            dispatch({ type: "SET_ADDRESS", payload: { street: e.target.value } })
          }
        />
      </Form.Group>

      <Form.Group className="form-group">
        <Form.Label>Street Number</Form.Label>
        <Form.Control
          type="text"
          value={data.number || ""}
          onChange={(e) =>
            dispatch({ type: "SET_ADDRESS", payload: { number: e.target.value } })
          }
        />
      </Form.Group>

      <Form.Group className="form-group">
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          value={data.city || ""}
          onChange={(e) =>
            dispatch({ type: "SET_ADDRESS", payload: { city: e.target.value } })
          }
        />
      </Form.Group>

      <Form.Group className="form-group">
        <Form.Label>Country</Form.Label>
        <Form.Select
          value={data.country || ""}
          onChange={(e) =>
            dispatch({ type: "SET_ADDRESS", payload: { country: e.target.value } })
          }
        >
          <option value="">Select...</option>
          <option value="Vietnam">Vietnam</option>
          <option value="Korea">Korea</option>
          <option value="Italy">Italy</option>
          <option value="USA">USA</option>
        </Form.Select>
      </Form.Group>
    </Form>
  );
}

AddressForm.propTypes = {
  data: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default AddressForm;
