import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';

function MovieForm({ genres }) {
  const [values, setValues] = useState({
    title: '',
    genre: '',
    year: '',
    duration: '',
    description: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(v => ({ ...v, [name]: value }));
  };

  const validate = () => {
    const err = {};
    if (!values.title.trim()) err.title = 'Title is required';
    if (!values.genre || values.genre === 'All') err.genre = 'Please choose a genre';
    const yearNum = Number(values.year);
    if (!yearNum || yearNum <= 1900) err.year = 'Year must be > 1900';
    const dur = Number(values.duration);
    if (!dur || dur <= 0) err.duration = 'Duration must be > 0';
    if (!values.description || values.description.trim().length < 30) err.description = 'Description must be at least 30 characters';
    return err;
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length === 0) {
      setSubmitted(true);
      // reset form (tuỳ chọn)
      setValues({ title: '', genre: '', year: '', duration: '', description: '' });
    }
  };

  return (
    <>
      {submitted && <Alert variant="success">Request submitted. Thank you!</Alert>}
      <Form noValidate onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="title"
                value={values.title}
                onChange={handleChange}
                isInvalid={!!errors.title}
                placeholder="Nhập tiêu đề phim"
              />
              <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Genre</Form.Label>
              <Form.Select
                name="genre"
                value={values.genre}
                onChange={handleChange}
                isInvalid={!!errors.genre}
              >
                <option value="">-- Select --</option>
                {genres.filter(g => g !== 'All').map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.genre}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Year</Form.Label>
              <Form.Control
                name="year"
                type="number"
                value={values.year}
                onChange={handleChange}
                isInvalid={!!errors.year}
                placeholder="e.g. 2023"
              />
              <Form.Control.Feedback type="invalid">{errors.year}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Duration (minutes)</Form.Label>
              <Form.Control
                name="duration"
                type="number"
                value={values.duration}
                onChange={handleChange}
                isInvalid={!!errors.duration}
                placeholder="e.g. 120"
              />
              <Form.Control.Feedback type="invalid">{errors.duration}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="description"
            value={values.description}
            onChange={handleChange}
            isInvalid={!!errors.description}
            placeholder="Mô tả ít nhất 30 ký tự..."
          />
          <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" variant="primary">Submit</Button>
      </Form>
    </>
  );
}

MovieForm.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default MovieForm;
