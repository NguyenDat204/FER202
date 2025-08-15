import React, { useEffect, useMemo, useState } from 'react';
import { Container, Row, Col, Alert, Toast, ToastContainer } from 'react-bootstrap';
import MovieCarousel from '../components/MovieCarousel';
import MovieCard from '../components/MovieCard';
import SearchFilterBar from '../components/SearchFilterBar';
import { movies as allMovies, allGenres } from '../data/movies';

const FAV_KEY = 'favourites';

function readFavourites() {
  try {
    const raw = localStorage.getItem(FAV_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeFavourites(arr) {
  localStorage.setItem(FAV_KEY, JSON.stringify(arr));
}

function FreeMovies() {
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('All');
  const [sort, setSort] = useState('none');
  const [favourites, setFavourites] = useState([]);
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    setFavourites(readFavourites());
  }, []);

  const filtered = useMemo(() => {
    let list = [...allMovies];

    // filter by genre
    if (genre !== 'All') {
      list = list.filter(m => m.genre === genre);
    }

    // search (case-insensitive) on title (mở rộng: description)
    const kw = search.trim().toLowerCase();
    if (kw) {
      list = list.filter(m =>
        m.title.toLowerCase().includes(kw) ||
        m.description.toLowerCase().includes(kw)
      );
    }

    // sort by duration
    if (sort === 'asc') list.sort((a, b) => a.duration - b.duration);
    if (sort === 'desc') list.sort((a, b) => b.duration - a.duration);

    return list;
  }, [search, genre, sort]);

  const toggleFavourite = (id) => {
    setFavourites(prev => {
      let next;
      if (prev.includes(id)) {
        next = prev.filter(x => x !== id);
        setToastMsg('Removed from favourites');
      } else {
        next = [...prev, id];
        setToastMsg('Added to favourites!');
      }
      writeFavourites(next);
      return next;
    });
  };

  return (
    <>
      <MovieCarousel />
      <Container className="py-4">
        <SearchFilterBar
          search={search}
          setSearch={setSearch}
          genre={genre}
          setGenre={setGenre}
          sort={sort}
          setSort={setSort}
          genres={allGenres}
          count={filtered.length}
        />

        {filtered.length === 0 && (
          <Alert variant="warning">No movies found</Alert>
        )}

        <Row xs={1} md={2} lg={3} className="g-3">
          {filtered.map(movie => (
            <Col key={movie.id}>
              <MovieCard
                movie={movie}
                onToggleFavourite={toggleFavourite}
                isFavourite={favourites.includes(movie.id)}
              />
            </Col>
          ))}
        </Row>
      </Container>

      <ToastContainer position="bottom-end" className="p-3">
        <Toast onClose={() => setToastMsg('')} show={!!toastMsg} delay={1500} autohide bg="success">
          <Toast.Header><strong className="me-auto">Movie Explorer</strong></Toast.Header>
          <Toast.Body className="text-white">{toastMsg}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default FreeMovies;
