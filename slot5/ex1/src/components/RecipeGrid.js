import React from 'react';
import { Row, Col } from 'react-bootstrap';
import RecipeCard from './RecipeCard';

function RecipeGrid({ recipes, onView, onToggleFavourite, favouritesSet }) {
  return (
    <Row className="g-4">
      {recipes.map((recipe, idx) => (
        <Col key={idx} lg={4} md={6} sm={12}>
          <RecipeCard
            recipe={recipe}
            onView={onView}
            onToggleFavourite={onToggleFavourite}
            isFavourite={favouritesSet.has(recipe.title)}
          />
        </Col>
      ))}
    </Row>
  );
}

export default RecipeGrid;
