import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
          <button className="btn btn-primary">Let's Meow</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
