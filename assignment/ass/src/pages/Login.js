import React, { useEffect, useState } from 'react'
import { Form, Button, Container, Card, Row, Col } from 'react-bootstrap'
import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.js'
import { useToast } from '../contexts/ToastContext.js'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [sp] = useSearchParams()
  const navigate = useNavigate()
  const { login, setRedirectAfterLogin, redirectAfterLogin } = useAuth()
  const toast = useToast()

  useEffect(() => {
    const r = sp.get('redirect_uri') || '/'
    setRedirectAfterLogin(r)
  }, [sp, setRedirectAfterLogin])

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(form.email, form.password)
      toast.showToast('success', 'Signed in!')
      navigate(redirectAfterLogin, { replace: true })
    } catch (err) {
      toast.showToast('danger', err.message || 'Login failed')
    }
  }

  return (
    <Container className="mt-4" style={{ maxWidth: '700px' }}>
      <Card body>
        <Row>
          <Col md={7}>
            <h3 className="mb-3">Registered Customers</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Button type="submit" variant="primary" className="w-100">
                Sign in
              </Button>
            </Form>
          </Col>
          <Col md={5} className="border-start">
            <h3 className="mb-3">New Customer</h3>
            <p>Tạo tài khoản để lưu wishlist & thanh toán nhanh hơn.</p>
            <Button
              as={Link}
              to="/register"
              variant="success"
              className="w-100"
            >
              Create an account
            </Button>
          </Col>
        </Row>
      </Card>
    </Container>
  )
}
