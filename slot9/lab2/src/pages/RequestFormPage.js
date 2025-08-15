import React from 'react';
import { Container } from 'react-bootstrap';
import MovieForm from '../components/MovieForm';
import { allGenres } from '../data/movies';

function RequestFormPage() {
  return (
    <Container className="py-4">
      <h3 className="mb-3">Movie Request Form</h3>
      <MovieForm genres={allGenres} />
    </Container>
  );
}

export default RequestFormPage;
