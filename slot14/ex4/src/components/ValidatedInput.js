import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";

const validateInput = (value) => value.length >= 5;

function ValidatedInputAuto() {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [submittedValue, setSubmittedValue] = useState(null);

  useEffect(() => {
    const valid = validateInput(value);
    setIsValid(valid);
    setErrorMessage(valid ? "" : "Giá trị phải có ít nhất 5 ký tự!");
  }, [value]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      setSubmittedValue(value);
    }
  };

  useEffect(() => {
    if (submittedValue) {
      const timer = setTimeout(() => setSubmittedValue(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [submittedValue]);

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Nhập giá trị</Form.Label>
          <Form.Control
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            isInvalid={!isValid && value.length > 0}
          />
          <Form.Control.Feedback type="invalid">
            {errorMessage}
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" className="mt-3" disabled={!isValid}>
          Gửi
        </Button>
      </Form>

      {submittedValue && (
        <Alert variant="success" className="mt-3">
          Bạn đã nhập: {submittedValue}
        </Alert>
      )}
    </div>
  );
}

export default ValidatedInputAuto;
