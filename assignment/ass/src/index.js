import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AuthProvider } from './contexts/AuthContext.js'
import { CartProvider } from './contexts/CartContext.js'
import { WishlistProvider } from './contexts/WishlistContext.js'
import { ToastProvider } from './contexts/ToastContext.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <App />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>
);