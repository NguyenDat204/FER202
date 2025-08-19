import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Form, Toast, Modal, Card } from "react-bootstrap";

function ProfileForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const isValidName = name.trim() !== "";
  const isValidEmail = email.includes("@");
  const isValidAge = age && Number(age) >= 1;

  const isFormValid = isValidName && isValidEmail && isValidAge;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      setShowToast(true);
      setShowModal(true);
      if (onSubmit) {
        onSubmit({ name, email, age });
      }
    }
  };

  return (
    <div className="container mt-4">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            isInvalid={!isValidName && name !== ""}
          />
          <Form.Control.Feedback type="invalid">
            Name không được rỗng.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isInvalid={!isValidEmail && email !== ""}
          />
          <Form.Control.Feedback type="invalid">
            Email phải hợp lệ và chứa @.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            isInvalid={!isValidAge && age !== ""}
          />
          <Form.Control.Feedback type="invalid">
            Age tối thiểu là 1.
          </Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" variant="primary" disabled={!isFormValid}>
          Submit
        </Button>
      </Form>

      {/* Toast hiển thị */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={3000}
        autohide
        style={{ position: "absolute", top: 20, right: 20 }}
      >
        <Toast.Body>Submitted successfully!</Toast.Body>
      </Toast>

      {/* Modal hiển thị thông tin */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Submitted Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <p><b>Name:</b> {name}</p>
              <p><b>Email:</b> {email}</p>
              <p><b>Age:</b> {age}</p>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>
    </div>
  );
}

// PropTypes để validate props
ProfileForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default ProfileForm;
