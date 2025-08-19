import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";

function StudentCard({ student, onView }) {
  return (
    <Card className="card h-100 shadow-sm">
      {student.avatar ? (
        <Card.Img
          variant="top"
          src={student.avatar}
          style={{
            height: "600px",
            objectFit: "cover",
          }}
        />
      ) : (
        <div
          className="bg-secondary text-white d-flex justify-content-center align-items-center"
          style={{ height: "600px" }}
        >
          No Avatar
        </div>
      )}
      <Card.Body>
        <Card.Title>{student.name}</Card.Title>
        <Card.Text>
          <b>ID:</b> {student.id} <br />
          <b>Email:</b> {student.email} <br />
          <b>Age:</b> {student.age}
        </Card.Text>
        <Button variant="primary" onClick={() => onView(student)}>
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
}

StudentCard.propTypes = {
  student: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    avatar: PropTypes.string,
  }).isRequired,
  onView: PropTypes.func.isRequired,
};

export default StudentCard;
