import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useCart } from '../context/CartContext';
import { ShoppingCart, LogIn, User } from 'lucide-react';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { totalCount } = useCart();
  const { authStatus, signOut, user } = useAuthenticator(context => [context.authStatus, context.user]);

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-content">
        <Link to="/" className="logo">
          <span className="logo-icon">🐾</span>
          <span className="logo-text neon-text">GatoTech</span>
        </Link>
        <ul className="nav-links">
          <li><Link to="/" className="nav-item">Home</Link></li>
          <li><Link to="/portfolio" className="nav-item">Portfolio</Link></li>
          <li><Link to="/store" className="nav-item">GatoShop</Link></li>
        </ul>
        <div className="navbar-actions">
          <Link to="/cart" className="nav-cart glass">
            <ShoppingCart size={20} />
            {totalCount > 0 && <span className="cart-badge">{totalCount}</span>}
          </Link>
          
          {authStatus === 'authenticated' ? (
            <div className="user-menu">
              <Link to="/profile" className="user-profile-link glass">
                <User size={18} />
              </Link>
              <button onClick={signOut} className="btn btn-outline btn-sm">Sign Out</button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary btn-sm login-btn">
              <LogIn size={18} /> Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
