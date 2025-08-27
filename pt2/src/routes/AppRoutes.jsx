import { Routes, Route, Navigate } from 'react-router-dom';
import ProductsPage from '../pages/ProductsPage';
import ProductDetails from '../pages/ProductDetails';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/products" replace />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      {/* routes phụ: */}
      <Route path="/cart" element={<div className="container">Cart (coming soon)</div>} />
      <Route path="/favourites" element={<div className="container">Favourites (coming soon)</div>} />
    </Routes>
  );
}
