import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaPaperPlane } from "react-icons/fa";

function RecipeRequestForm({ show, onHide, onSuccess }) {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    ingredient: "",
    prepTime: "5 minutes",
    notes: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      // ✅ Gọi toast từ parent
      if (onSuccess) {
        onSuccess(`✅ Recipe request submitted for "${formData.ingredient}"`);
      }

      // Reset form
      setFormData({
        name: "",
        email: "",
        ingredient: "",
        prepTime: "5 minutes",
        notes: ""
      });

      onHide(); // đóng modal
    }

    setValidated(true);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Recipe Request Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Your Name</Form.Label>
            <Form.Control
              required
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please enter your name
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              required
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Desired Ingredient</Form.Label>
            <Form.Control
              required
              type="text"
              name="ingredient"
              placeholder="Enter desired ingredient"
              value={formData.ingredient}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please enter desired ingredient
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Max Prep Time</Form.Label>
            <Form.Select
              name="prepTime"
              value={formData.prepTime}
              onChange={handleChange}
            >
              <option>5 minutes</option>
              <option>10 minutes</option>
              <option>15 minutes</option>
              <option>30 minutes</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="notes"
              value={formData.notes}
              onChange={handleChange}
            />
          </Form.Group>

          <Button type="submit" variant="primary">
            <FaPaperPlane className="me-2" />
            Submit Request
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default RecipeRequestForm;
