import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 50);
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'referrals', 'marketplace', 'contact'];
      const sectionElements = sections.map(section => 
        document.getElementById(section)
      );
      
      sectionElements.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop - 100;
          const sectionBottom = sectionTop + section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(sections[index]);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && !event.target.closest('.navbar-container')) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <div className="logo-container">
            <img src={logo} alt="NJ.C Bandwidth Logo" className="logo-image" />
          </div>
          <span className="logo-text">NJ.C <span className="highlight">Bandwidth</span></span>
        </Link>

        <div className={`menu-icon ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <a 
              href="#home" 
              className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Home
              <span className="nav-indicator"></span>
            </a>
          </li>
          <li className="nav-item">
            <a 
              href="#about" 
              className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              About
              <span className="nav-indicator"></span>
            </a>
          </li>
          <li className="nav-item">
            <a 
              href="#referrals" 
              className={`nav-link ${activeSection === 'referrals' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Referrals
              <span className="nav-indicator"></span>
            </a>
          </li>
          <li className="nav-item">
            <a 
              href="#marketplace" 
              className={`nav-link ${activeSection === 'marketplace' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Marketplace
              <span className="nav-indicator"></span>
            </a>
          </li>
          <li className="nav-item dropdown">
            <div 
              className={`nav-link dropdown-toggle ${dropdownOpen ? 'active' : ''}`}
              onClick={toggleDropdown}
            >
              More
              <span className="dropdown-arrow">▼</span>
              <span className="nav-indicator"></span>
            </div>
            <ul className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
              <li>
                <a href="#contact" onClick={closeMenu}>Contact Us</a>
              </li>
              <li>
                <Link to="/faq" onClick={closeMenu}>FAQ</Link>
              </li>
              <li>
                <Link to="/terms" onClick={closeMenu}>Terms of Service</Link>
              </li>
            </ul>
          </li>
        </ul>

        <div className="nav-buttons">
          <Link to="/login" className="nav-button login-button" onClick={closeMenu}>
            Login
          </Link>
          <Link to="/register" className="nav-button register-button" onClick={closeMenu}>
            Sign Up
          </Link>
        </div>
      </div>
      
      {/* Mobile overlay when menu is open */}
      <div 
        className={`nav-overlay ${menuOpen ? 'show' : ''}`} 
        onClick={closeMenu}
      ></div>
    </nav>
  );
};

export default Navbar; 