import React, { useState } from 'react';
import { Container, Alert } from 'react-bootstrap';
import NavbarMenu from '../components/NavbarMenu';
import HeroSection from '../components/HeroSection';
import FiltersBar from '../components/FiltersBar';
import RecipeGrid from '../components/RecipeGrid';
import RecipeModal from '../components/RecipeModal';
import Footer from '../components/Footer';

function RecipesPage() {
  const recipes = [
    {
      title: "Mediterranean Chickpea Salad",
      description: "A refreshing, protein-packed salad tossed in a lemon-olive oil dressing.",
      servings: 2,
      prep: 10,
      cook: 0,
      image: "/images/mediterranean-chickpea-salad.jpg"
    },
    {
      title: "Avocado & Tomato Wholegrain Toast",
      description: "Creamy avocado spread over toasted wholegrain bread, topped with juicy tomatoes.",
      servings: 1,
      prep: 5,
      cook: 5,
      image: "/images/avocado-tomato-toast.jpg"
    },
    {
      title: "One-Pan Lemon Garlic Salmon",
      description: "A 15-minute weeknight dinner of flaky salmon and tender asparagus.",
      servings: 2,
      prep: 5,
      cook: 12,
      image: "/images/one-pan-lemon-garlic-salmon.jpg"
    },
    {
      title: "Quinoa Veggie Power Bowl",
      description: "A balanced bowl of fluffy quinoa, roasted veggies and healthy fats.",
      servings: 2,
      prep: 10,
      cook: 15,
      image: "/images/quinoa-veggie-power-bowl.jpg"
    },
    {
      title: "Sweet Potato Black Bean Tacos",
      description: "Smoky roasted sweet potatoes and black beans tucked into warm tortillas.",
      servings: 3,
      prep: 10,
      cook: 15,
      image: "/images/sweet-potato-black-bean-tacos.jpg"
    },
    {
      title: "Greek Yogurt Berry Parfait",
      description: "Layers of creamy yogurt, fresh berries and crunchy oats for a high-protein snack.",
      servings: 1,
      prep: 5,
      cook: 0,
      image: "/images/greek-yogurt-berry-parfait.jpg"
    },
    {
      title: "Lentil & Spinach Soup",
      description: "A hearty 30-minute soup rich in plant protein and iron.",
      servings: 4,
      prep: 10,
      cook: 20,
      image: "/images/lentil-spinach-soup.jpg"
    },
    {
      title: "Banana Oat Pancakes",
      description: "Flour-free pancakes sweetened naturally with ripe bananas.",
      servings: 2,
      prep: 5,
      cook: 10,
      image: "/images/banana-oat-pancakes.jpg"
    }
  ];

  const [search, setSearch] = useState('');
  const [maxPrep, setMaxPrep] = useState('');
  const [maxCook, setMaxCook] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleViewRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setShowModal(true);
  };

  const handleAddToCart = (recipeTitle) => {
    setAlertMessage(`"${recipeTitle}" has been added to your cart!`);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch =
      recipe.title.toLowerCase().includes(search.toLowerCase()) ||
      recipe.description.toLowerCase().includes(search.toLowerCase());
    const matchesPrep = maxPrep ? recipe.prep <= parseInt(maxPrep) : true;
    const matchesCook = maxCook ? recipe.cook <= parseInt(maxCook) : true;
    return matchesSearch && matchesPrep && matchesCook;
  });

  return (
    <>
      <NavbarMenu />
      <HeroSection />

      {/* Alert thông báo thêm vào giỏ */}
      {showAlert && (
        <Container className="mt-3">
          <Alert
            variant="success"
            onClose={() => setShowAlert(false)}
            dismissible
          >
            {alertMessage}
          </Alert>
        </Container>
      )}

      <FiltersBar
        search={search}
        setSearch={setSearch}
        maxPrep={maxPrep}
        setMaxPrep={setMaxPrep}
        maxCook={maxCook}
        setMaxCook={setMaxCook}
      />
      <Container>
        {filteredRecipes.length === 0 ? (
          <Alert variant="warning" className="text-center my-5">
            No recipes found.
          </Alert>
        ) : (
          <RecipeGrid recipes={filteredRecipes} onView={handleViewRecipe} />
        )}
      </Container>
      <Footer />
      <RecipeModal
        show={showModal}
        onHide={() => setShowModal(false)}
        recipe={selectedRecipe}
        onAddToCart={handleAddToCart}
      />
    </>
  );
}

export default RecipesPage;
