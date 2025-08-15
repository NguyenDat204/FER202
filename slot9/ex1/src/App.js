import React, { useState } from "react";
import UserForm from "./components/UserForm";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Alert, Container } from "react-bootstrap";

function App() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState(null);

  const handleFormSubmit = (data) => {
    setFormData(data);
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  return (
    <Container className="App">
      <h1 className="text-center my-4">Validate Form</h1>

      {showSuccess && (
        <Alert
          variant="success"
          onClose={() => setShowSuccess(false)}
          dismissible
        >
          <strong>Thành công!</strong> Dữ liệu hợp lệ và đã gửi thành công.
        </Alert>
      )}

      <UserForm onSubmit={handleFormSubmit} />

      {formData && (
        <pre className="mt-3 bg-light p-3 rounded">
          {JSON.stringify(formData, null, 2)}
        </pre>
      )}
    </Container>
  );
}

export default App;
