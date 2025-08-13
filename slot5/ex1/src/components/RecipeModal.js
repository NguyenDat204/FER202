import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function RecipeModal({ show, onHide, recipe, onAddToCart }) {
  if (!recipe) return null;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{recipe.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {recipe.image && (
          <img
            src={recipe.image}
            alt={recipe.title}
            className="img-fluid mb-3"
          />
        )}
        <p>{recipe.description}</p>
        <p><strong>Servings:</strong> {recipe.servings}</p>
        <p><strong>Prep time:</strong> {recipe.prep} mins</p>
        <p><strong>Cook time:</strong> {recipe.cook} mins</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="success"
          style={{ backgroundColor: '#234f38', border: 'none' }}
          onClick={() => {
            onAddToCart(recipe.title);
            onHide();
          }}
        >
          Add to Cart
        </Button>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RecipeModal;
