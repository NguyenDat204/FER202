import { useState } from 'react';
import AppRoutes from './routes/AppRoutes';
import AppNavbar from './components/Navbar';
import LoginModal from './components/LoginModal';

export default function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <AppNavbar onLoginClick={() => setShowLogin(true)} />
      <div className="container py-4">
        <AppRoutes />
      </div>
      <LoginModal show={showLogin} onHide={() => setShowLogin(false)} />
    </>
  );
}
