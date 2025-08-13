import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';

function RecipeCard({ recipe, onView, onToggleFavourite, isFavourite }) {
  if (!recipe) return null;
  return (
    <Card className="mb-3 h-100 shadow-sm">
      <div style={{ position: 'relative' }}>
        <Card.Img variant="top" src={recipe.image} alt={recipe.title} style={{ height: 200, objectFit: 'cover' }} />
        <Button
          variant={isFavourite ? "danger" : "light"}
          size="sm"
          onClick={() => onToggleFavourite(recipe)}
          style={{ position: 'absolute', top: 10, right: 10, borderRadius: 20, boxShadow: '0 2px 6px rgba(0,0,0,0.12)' }}
        >
          {isFavourite ? '♥' : '♡'} <span style={{ marginLeft: 6 }}>{isFavourite ? 'Saved' : 'Add to Favourite'}</span>
        </Button>
      </div>

      <Card.Body className="d-flex flex-column">
        <Card.Title>{recipe.title}</Card.Title>
        <Card.Text className="text-muted" style={{ flex: 1 }}>{recipe.description}</Card.Text>
        <Card.Text>
          <small>
            <strong>Servings:</strong> {recipe.servings} <br />
            <strong>Prep:</strong> {recipe.prep} mins &nbsp;
            <strong>Cook:</strong> {recipe.cook} mins
          </small>
        </Card.Text>
        <Button variant="success" className="w-100 mt-2" onClick={() => onView(recipe)}>View Recipe</Button>
      </Card.Body>
    </Card>
  );
}

export default RecipeCard;
