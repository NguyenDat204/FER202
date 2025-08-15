import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Badge, Modal } from 'react-bootstrap';

function MovieCard({ movie, onToggleFavourite, isFavourite }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <Card className="mb-3 h-100 d-flex flex-column">
                <Card.Img variant="top" src={movie.poster} alt={movie.title} />
                <Card.Body className="d-flex flex-column">
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text className="flex-grow-1">
                        {movie.description.substring(0, 60)}...
                    </Card.Text>
                    <Badge bg="info" className="mb-2">{movie.genre}</Badge>
                    <div className="mt-auto">
                        <Button
                            variant={isFavourite ? "danger" : "primary"}
                            onClick={() => onToggleFavourite(movie.id)}
                            className="me-2"
                        >
                            {isFavourite ? "Remove Favourite" : "Add to Favourites"}
                        </Button>
                        <Button variant="secondary" onClick={() => setShowModal(true)}>Details</Button>
                    </div>
                </Card.Body>
            </Card>


            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{movie.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{movie.description}</p>
                    <p><strong>Year:</strong> {movie.year}</p>
                    <p><strong>Country:</strong> {movie.country}</p>
                    <p><strong>Duration:</strong> {movie.duration} min</p>
                </Modal.Body>
            </Modal>
        </>
    );
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        poster: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
        duration: PropTypes.number.isRequired,
        country: PropTypes.string.isRequired
    }).isRequired,
    onToggleFavourite: PropTypes.func.isRequired,
    isFavourite: PropTypes.bool.isRequired
};

export default MovieCard;
