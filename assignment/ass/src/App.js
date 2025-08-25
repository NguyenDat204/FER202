import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Header from './components/Header.js'
import Footer from './components/Footer.js'
import Home from './pages/Home.js'
import Login from './pages/Login.js'
import Register from './pages/Register.js'
import WishlistPage from './pages/WishlistPage.js'
import CartPage from './pages/CartPage.js'
import ProductDetails from './pages/ProductDetails.js'
import Checkout from './pages/Checkout.js'
import { useAuth } from './contexts/AuthContext.js'
import AccountPage from './pages/AccountPage.js'
import './App.css'

function RequireAuth({ children }) {
  const { user } = useAuth()
  const location = useLocation()
  if (!user) {
    const redirect = encodeURIComponent(location.pathname + location.search)
    return <Navigate to={`/login?redirect_uri=${redirect}`} replace />
  }
  return children
}

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/account" element={<AccountPage />} />
        <Route
          path="/checkout"
          element={
            <RequireAuth>
              <Checkout />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  )
}
