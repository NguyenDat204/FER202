import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

import Welcome from "./components/Welcome";
import UserProfile from "./components/UserProfile";
import NameList from "./components/NameList";
import StudentCard from "./components/StudentCard";

function App() {
  const userData = { name: "traltb@fe.edu.vn", age: 39 };
  const namesList = ["traltb@fe.edu.vn", "test@fe.edu.vn"];

  const students = [
    { name: "traltb1@fe.edu.vn", age: 39, avatar: "/images/student1.jpg" },
    { name: "traltb2@fe.edu.vn", age: 40, avatar: "/images/student2.jpg" },
    { name: "traltb3@fe.edu.vn", age: 41, avatar: "/images/student3.jpg" },
  ];

  return (
    <>
      {/* Phần trên */}
      <div style={{ padding: "1rem", backgroundColor: "#f8f9fa" }}>
        <Welcome name={userData.name} />
        <UserProfile user={userData} />
        <NameList names={namesList} />
      </div>

      {/* Danh sách Student */}
      <Container>
        <h1 className="my-4 text-center">Student Information</h1>
        <Row>
          {students.map((student, index) => (
            <Col key={index} sm={12} md={4}>
              <StudentCard student={student} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default App;
