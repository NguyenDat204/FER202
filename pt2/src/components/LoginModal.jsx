import { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import api from '../services/api';

export default function LoginModal({ show, onHide }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErr('');

    if (!email || !password) {
      setErr('Please enter email and password');
      return;
    }

    try {
      // Cách 1: query phía server (json-server hỗ trợ query string cơ bản)
      const { data } = await api.get(`/accounts?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
      const user = data?.[0];

      if (user) {
        localStorage.setItem('user', JSON.stringify({ id: user.id, name: user.name, email: user.email }));
        onHide();
      } else {
        setErr('Invalid email or password');
      }
    } catch (e) {
      setErr('Login failed. Please try again.');
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Form onSubmit={handleLogin}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {err && <Alert variant="danger" className="mb-3">{err}</Alert>}
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email}
              onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={password}
              onChange={e => setPassword(e.target.value)} placeholder="••••••" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Cancel</Button>
          <Button type="submit" variant="primary">Login</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
