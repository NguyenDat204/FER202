import React from "react";
import { Card, Button } from "react-bootstrap";

const StudentCard = ({ student }) => {
  return (
    <Card className="mb-4 h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={student.avatar}
        alt={`${student.name}'s avatar`}
        style={{ objectFit: "cover", height: "500px" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{student.name}</Card.Title>
        <Card.Text>Age: {student.age}</Card.Text>
        <div className="mt-auto">
          <Button variant="primary">Edit</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default StudentCard;
