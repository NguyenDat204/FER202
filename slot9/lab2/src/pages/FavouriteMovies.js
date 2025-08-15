import React, { useEffect, useMemo, useState } from 'react';
import { Container, Row, Col, Alert, Toast, ToastContainer } from 'react-bootstrap';
import MovieCard from '../components/MovieCard';
import { movies as allMovies } from '../data/movies';

const FAV_KEY = 'favourites';

function FavouriteMovies() {
  const [favourites, setFavourites] = useState([]);
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    try {
      const raw = localStorage.getItem(FAV_KEY);
      setFavourites(raw ? JSON.parse(raw) : []);
    } catch {
      setFavourites([]);
    }
  }, []);

  const favMovies = useMemo(
    () => allMovies.filter(m => favourites.includes(m.id)),
    [favourites]
  );

  const toggleFavourite = (id) => {
    setFavourites(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      localStorage.setItem(FAV_KEY, JSON.stringify(next));
      setToastMsg(prev.includes(id) ? 'Removed from favourites' : 'Added to favourites!');
      return next;
    });
  };

  return (
    <Container className="py-4">
      <h3 className="mb-3">My Favourite Movies</h3>

      {favMovies.length === 0 ? (
        <Alert variant="info">No favourites yet.</Alert>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-3">
          {favMovies.map(movie => (
            <Col key={movie.id}>
              <MovieCard
                movie={movie}
                onToggleFavourite={toggleFavourite}
                isFavourite={true}
              />
            </Col>
          ))}
        </Row>
      )}

      <ToastContainer position="bottom-end" className="p-3">
        <Toast onClose={() => setToastMsg('')} show={!!toastMsg} delay={1500} autohide bg="success">
          <Toast.Header><strong className="me-auto">Movie Explorer</strong></Toast.Header>
          <Toast.Body className="text-white">{toastMsg}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
}

export default FavouriteMovies;
