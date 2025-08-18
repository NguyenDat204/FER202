import React from "react";
import { Row, Col } from "react-bootstrap";
import StudentCard from "./StudentCard";

function StudentGrid({ students, onView }) {
  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {students.map((s) => (
        <Col key={s.id}>
          <StudentCard student={s} onView={onView} />
        </Col>
      ))}
    </Row>
  );
}

export default StudentGrid;
