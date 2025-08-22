import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";

const Login = () => {
  const { login, isAuthenticated } = useContext(AuthContext);
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const nav = useNavigate();
  const location = useLocation();

  const onSubmit = (e) => {
    e.preventDefault();
    try {
      login(form.username, form.password); // sẽ throw nếu sai
      const redirectTo = location.state?.from || "/checkout";
      nav(redirectTo);
    } catch (err) {
      setError(err.message); // hiện lỗi
    }
  };

  // Nếu đã login thì redirect
  useEffect(() => {
    if (isAuthenticated) {
      nav("/checkout");
    }
  }, [isAuthenticated, nav]);

  return (
    <Container className="mt-4" style={{ maxWidth: "400px" }}>
      <h2>Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </Form.Group>
        <Button type="submit" className="w-100" variant="primary">
          Login
        </Button>
      </Form>
      <p className="mt-3">
        Don’t have an account? <Link to="/register">Register here</Link>
      </p>
    </Container>
  );
};

export default Login;
