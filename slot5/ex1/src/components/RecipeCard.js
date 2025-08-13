import React from 'react';
import { Card, Button } from 'react-bootstrap';

function RecipeCard({ recipe, onView }) {
  if (!recipe) return null;

  return (
    <Card className="mb-4 h-100 shadow-sm" style={{ borderRadius: '12px', overflow: 'hidden' }}>
      <Card.Img
        variant="top"
        src={recipe.image}
        alt={recipe.title}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <Card.Body>
        <Card.Title>{recipe.title}</Card.Title>
        <Card.Text className="text-muted">{recipe.description}</Card.Text>
        <Card.Text>
          <small>
            <strong>Servings:</strong> {recipe.servings} <br />
            <strong>Prep:</strong> {recipe.prep} mins &nbsp;
            <strong>Cook:</strong> {recipe.cook} mins
          </small>
        </Card.Text>
        <Button
          variant="success"
          className="w-100"
          style={{ backgroundColor: '#234f38', border: 'none', borderRadius: '8px' }}
          onClick={() => onView(recipe)}
        >
          View Recipe
        </Button>
      </Card.Body>
    </Card>
  );
}

export default RecipeCard;
