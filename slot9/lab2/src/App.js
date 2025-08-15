import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarMenu from './components/NavbarMenu';
import FreeMovies from './pages/FreeMovies';
import FavouriteMovies from './pages/FavouriteMovies';
import RequestFormPage from './pages/RequestFormPage';
import Footer from './components/Footer';
import './App.css'; // để lấy CSS sticky footer

function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <NavbarMenu />
        <div className="app-content" style={{ paddingTop: 32 }}>
          <Routes>
            <Route path="/" element={<FreeMovies />} />
            <Route path="/favourites" element={<FavouriteMovies />} />
            <Route path="/request" element={<RequestFormPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
