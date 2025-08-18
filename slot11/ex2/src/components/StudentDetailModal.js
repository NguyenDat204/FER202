import React from "react";
import { Modal, Card } from "react-bootstrap";

function StudentDetailModal({ student, show, onHide }) {
  if (!student) return null;

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Student Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card>
          {student.avatar && <Card.Img src={student.avatar} />}
          <Card.Body>
            <p><b>ID:</b> {student.id}</p>
            <p><b>Name:</b> {student.name}</p>
            <p><b>Email:</b> {student.email}</p>
            <p><b>Age:</b> {student.age}</p>
          </Card.Body>
        </Card>
      </Modal.Body>
    </Modal>
  );
}

export default StudentDetailModal;
