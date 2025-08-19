import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import PropTypes from "prop-types";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";

function AccountForm({ data, dispatch }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const errors = {};

  if (data.username && data.username.length < 6) {
    errors.username = "Username phải có ít nhất 6 ký tự";
  }

  if (data.password && !/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(data.password)) {
    errors.password = "Password ≥ 8 ký tự, gồm 1 chữ hoa, 1 số, 1 ký tự đặc biệt";
  }

  if (data.confirm !== data.password) {
    errors.confirm = "Confirm password không khớp";
  }

  if (!data.question) {
    errors.question = "Secret question không được để trống";
  }

  if (!data.answer) {
    errors.answer = "Answer không được để trống";
  }

  return (
    <Form>
      {/* Username */}
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          value={data.username}
          onChange={(e) =>
            dispatch({ type: "SET_ACCOUNT", payload: { username: e.target.value } })
          }
          isInvalid={!!errors.username}
        />
        <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
      </Form.Group>

      {/* Password */}
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <InputGroup>
          <Form.Control
            type={showPassword ? "text" : "password"}
            value={data.password}
            onChange={(e) =>
              dispatch({ type: "SET_ACCOUNT", payload: { password: e.target.value } })
            }
            isInvalid={!!errors.password}
          />
          <InputGroup.Text
            onClick={() => setShowPassword(!showPassword)}
            style={{ cursor: "pointer" }}
          >
            {showPassword ? <EyeSlashFill /> : <EyeFill />}
          </InputGroup.Text>
          <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      {/* Confirm Password */}
      <Form.Group className="mb-3">
        <Form.Label>Confirm Password</Form.Label>
        <InputGroup>
          <Form.Control
            type={showConfirm ? "text" : "password"}
            value={data.confirm}
            onChange={(e) =>
              dispatch({ type: "SET_ACCOUNT", payload: { confirm: e.target.value } })
            }
            isInvalid={!!errors.confirm}
          />
          <InputGroup.Text
            onClick={() => setShowConfirm(!showConfirm)}
            style={{ cursor: "pointer" }}
          >
            {showConfirm ? <EyeSlashFill /> : <EyeFill />}
          </InputGroup.Text>
          <Form.Control.Feedback type="invalid">{errors.confirm}</Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      {/* Secret Question */}
      <Form.Group className="mb-3">
        <Form.Label>Secret Question</Form.Label>
        <Form.Control
          type="text"
          value={data.question}
          onChange={(e) =>
            dispatch({ type: "SET_ACCOUNT", payload: { question: e.target.value } })
          }
          isInvalid={!!errors.question}
        />
        <Form.Control.Feedback type="invalid">{errors.question}</Form.Control.Feedback>
      </Form.Group>

      {/* Answer */}
      <Form.Group className="mb-3">
        <Form.Label>Answer</Form.Label>
        <Form.Control
          type="text"
          value={data.answer}
          onChange={(e) =>
            dispatch({ type: "SET_ACCOUNT", payload: { answer: e.target.value } })
          }
          isInvalid={!!errors.answer}
        />
        <Form.Control.Feedback type="invalid">{errors.answer}</Form.Control.Feedback>
      </Form.Group>
    </Form>
  );
}

AccountForm.propTypes = {
  data: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default AccountForm;
