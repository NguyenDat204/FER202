import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Container, Alert, ToastContainer, Toast, Row, Col, Form, Pagination } from 'react-bootstrap';
import NavbarMenu from '../components/NavbarMenu';
import HeroCarousel from '../components/HeroCarousel';
import FiltersBar from '../components/FiltersBar';
import RecipeGrid from '../components/RecipeGrid';
import RecipeModal from '../components/RecipeModal';
import Footer from '../components/Footer';
import RecipeRequestForm from '../components/RecipeRequestForm';

// Dữ liệu recipes tích hợp sẵn
const allRecipes = [
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

function RecipesPage() {
  // Filter & control states
  const [search, setSearch] = useState('');
  const [maxPrep, setMaxPrep] = useState('');
  const [maxCook, setMaxCook] = useState('');
  const [sortOption, setSortOption] = useState('');

  // Modal & viewing
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Favourites (store titles)
  const [favourites, setFavourites] = useState(() => {
    try {
      const stored = localStorage.getItem('favourites_v1');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const favouritesSet = useMemo(() => new Set(favourites), [favourites]);

  // Toast for favourites and add-to-cart
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const toastTimerRef = useRef(null);

  // Request form modal
  const [showRequestForm, setShowRequestForm] = useState(false);

  // Pagination
  const [itemsPerPage, setItemsPerPage] = useState(6); // default 6
  const [currentPage, setCurrentPage] = useState(1);

  // On favourites change persist
  useEffect(() => {
    localStorage.setItem('favourites_v1', JSON.stringify(favourites));
  }, [favourites]);

  // Open modal to view recipe
  const handleViewRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setShowModal(true);
  };

  // Add to cart (from modal) -> show success toast
  const handleAddToCart = (title) => {
    showTemporaryToast(`"${title}" has been added to your cart!`);
  };

  // Toggle favourite add/remove
  const handleToggleFavourite = (recipe) => {
    const title = recipe.title;
    setFavourites(prev => {
      if (prev.includes(title)) {
        showTemporaryToast(`Removed "${title}" from favourites`);
        return prev.filter(x => x !== title);
      } else {
        showTemporaryToast(`Added "${title}" to favourites`);
        return [...prev, title];
      }
    });
  };

  // show toast with auto-hide 5s (requirement)
  const showTemporaryToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setShowToast(false), 5000);
  };

  const handleFormSubmitSuccess = (message) => {
    showTemporaryToast(message);
  };

  // Filtering
  const filtered = useMemo(() => {
    return allRecipes.filter(r => {
      const q = search.trim().toLowerCase();
      const matchesSearch = !q || r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q);
      const matchesPrep = maxPrep ? r.prep <= parseInt(maxPrep, 10) : true;
      const matchesCook = maxCook ? r.cook <= parseInt(maxCook, 10) : true;
      return matchesSearch && matchesPrep && matchesCook;
    });
  }, [search, maxPrep, maxCook]);

  // Sorting
  const sorted = useMemo(() => {
    const arr = [...filtered];
    switch (sortOption) {
      case 'name-asc': arr.sort((a, b) => a.title.localeCompare(b.title)); break;
      case 'name-desc': arr.sort((a, b) => b.title.localeCompare(a.title)); break;
      case 'prep-asc': arr.sort((a, b) => a.prep - b.prep); break;
      case 'prep-desc': arr.sort((a, b) => b.prep - a.prep); break;
      case 'cook-asc': arr.sort((a, b) => a.cook - b.cook); break;
      case 'cook-desc': arr.sort((a, b) => b.cook - a.cook); break;
      default: break;
    }
    return arr;
  }, [filtered, sortOption]);

  // Pagination calculations
  const totalItems = sorted.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  useEffect(() => {
    // if currentPage beyond totalPages due to filter change -> reset
    if (currentPage > totalPages) setCurrentPage(1);
  }, [totalPages, currentPage]);

  const indexLast = currentPage * itemsPerPage;
  const indexFirst = indexLast - itemsPerPage;
  const currentRecipes = sorted.slice(indexFirst, indexLast);

  // Carousel items: use first 4 recipes as slides
  const carouselItems = allRecipes.slice(0, 4).map(r => ({ image: r.image, title: r.title, caption: r.description }));

  return (
    <>
      <NavbarMenu favouritesCount={favourites.length} onOpenRequestForm={() => setShowRequestForm(true)} />
      <Container className="mb-3">
        <HeroCarousel items={carouselItems} />
      </Container>

      {/* Toast container (top-right) */}
      <ToastContainer position="top-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} autohide={false}>
          <Toast.Header>
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>

      {/* Filters + Sort (FiltersBar contains sort) */}
      <FiltersBar
        search={search}
        setSearch={setSearch}
        maxPrep={maxPrep}
        setMaxPrep={setMaxPrep}
        maxCook={maxCook}
        setMaxCook={setMaxCook}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />

      <Container>
        {/* If no results -> show Not Found */}
        {sorted.length === 0 ? (
          <Alert variant="warning" className="text-center my-5">No recipes found.</Alert>
        ) : (
          <>
            <RecipeGrid recipes={currentRecipes} onView={handleViewRecipe} onToggleFavourite={handleToggleFavourite} favouritesSet={new Set(favourites)} />

            {/* Pagination row */}
            <Row className="align-items-center mt-4">
              <Col md={6} sm={12}>
                <Form.Select value={itemsPerPage} onChange={e => { setItemsPerPage(parseInt(e.target.value, 10)); setCurrentPage(1); }} style={{ width: 160 }}>
                  <option value={6}>Items per page: 6</option>
                  <option value={9}>Items per page: 9</option>
                  <option value={12}>Items per page: 12</option>
                </Form.Select>
              </Col>

              <Col md={6} sm={12} className="text-end">
                <Pagination className="justify-content-end">
                  <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
                  <Pagination.Prev onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} />

                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const page = idx + 1;
                    return (
                      <Pagination.Item key={page} active={page === currentPage} onClick={() => setCurrentPage(page)}>
                        {page}
                      </Pagination.Item>
                    );
                  })}

                  <Pagination.Next onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} />
                  <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
                </Pagination>
              </Col>
            </Row>
          </>
        )}
      </Container>

      <Footer />

      <RecipeModal show={showModal} onHide={() => setShowModal(false)} recipe={selectedRecipe} onAddToCart={handleAddToCart} />

      <RecipeRequestForm
        show={showRequestForm}
        onHide={() => setShowRequestForm(false)}
        onSuccess={handleFormSubmitSuccess}
      />
    </>
  );
}

export default RecipesPage;
