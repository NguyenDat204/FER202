import React, { useState } from 'react'
import { Form, Button, Container, Card, ProgressBar, Image } from 'react-bootstrap'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.js'
import { useToast } from '../contexts/ToastContext.js'

export default function Register() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: '',
    email: '',
    avatar: null,
    avatarPreview: '',
    username: '',
    password: '',
    confirm: '',
    question: '',
    answer: ''
  })
  const [sp] = useSearchParams()
  const navigate = useNavigate()
  const { register } = useAuth()
  const toast = useToast()

  // xử lý input
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  // xử lý avatar
  // xử lý avatar
const handleAvatar = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  if (!['image/jpeg', 'image/png'].includes(file.type)) {
    toast.showToast('danger', 'Chỉ chấp nhận jpg hoặc png');
    return;
  }
  if (file.size > 2 * 1024 * 1024) {
    toast.showToast('danger', 'Ảnh ≤ 2MB');
    return;
  }

  const reader = new FileReader();
  reader.onloadend = () => {
    setForm({
      ...form,
      avatar: reader.result,        // lưu base64 string
      avatarPreview: reader.result, // để preview luôn
    });
  };
  reader.readAsDataURL(file);
};


  // validate
  const validateStep1 = () => {
    if (!form.name) return 'Name is required'
    if (!form.email.includes('@')) return 'Invalid email'
    return ''
  }
  const validateStep2 = () => {
    if (!form.username) return 'Username is required'
    if (form.password.length < 6) return 'Password must be ≥ 6 chars'
    if (!/[A-Z]/.test(form.password) || !/[a-z]/.test(form.password) || !/[^A-Za-z0-9]/.test(form.password)) {
      return 'Password must include upper, lower, special char'
    }
    if (form.password !== form.confirm) return 'Passwords do not match'
    if (!form.question || !form.answer) return 'Secret question & answer required'
    return ''
  }

  const handleNext = () => {
    const err = validateStep1()
    if (err) return toast.showToast('danger', err)
    setStep(2)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const err = validateStep2()
    if (err) return toast.showToast('danger', err)

    try {
      const newUser = {
        name: form.name,
        email: form.email,
        username: form.username,
        password: form.password,
        question: form.question,
        answer: form.answer,
        avatar: form.avatar,
        wishlist: [],
        cart: []
      }
      await register(newUser)

      toast.showToast('success', 'Registration successful. You are now signed in.')
      navigate(sp.get('redirect_uri') || '/', { replace: true })
    } catch (err) {
      toast.showToast('danger', err.message || 'Registration failed')
    }
  }

  return (
    <Container className="mt-4" style={{ maxWidth: '700px' }}>
      <Card body>
        <h2 className="mb-3">Create an Account</h2>
        <ProgressBar now={step === 1 ? 50 : 100} label={`Step ${step}/2`} className="mb-3" />

        {step === 1 && (
          <>
            <h4>About</h4>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" name="name" value={form.name} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" value={form.email} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Avatar (jpg/png ≤ 2MB)</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={handleAvatar} />
                {form.avatarPreview && (
                  <div className="mt-2">
                    <Image src={form.avatarPreview} thumbnail width={100} height={100} />
                  </div>
                )}
              </Form.Group>
              <Button variant="primary" onClick={handleNext}>Next</Button>
            </Form>
          </>
        )}

        {step === 2 && (
          <>
            <h4>Account</h4>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name="username" value={form.username} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" value={form.password} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" name="confirm" value={form.confirm} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Secret Question</Form.Label>
                <Form.Select name="question" value={form.question} onChange={handleChange} required>
                  <option value="">-- Select a question --</option>
                  <option value="pet">What is your first pet's name?</option>
                  <option value="school">What was your primary school?</option>
                  <option value="city">In which city were you born?</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Answer</Form.Label>
                <Form.Control type="text" name="answer" value={form.answer} onChange={handleChange} required />
              </Form.Group>

              <div className="d-flex justify-content-between">
                <Button variant="secondary" onClick={() => setStep(1)}>Previous</Button>
                <Button type="submit" variant="success">Submit</Button>
              </div>
            </Form>
          </>
        )}
      </Card>
    </Container>
  )
}
