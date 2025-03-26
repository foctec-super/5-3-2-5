import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope
} from 'react-icons/fa';
import logo from '../assets/logo.png';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Top Section: Logo + Motto + Social */}
      <div className="footer-top">
        <div className="footer-top-left">
          <Link to="/" className="footer-brand">
            <img
              src={logo}
              alt="NJ.C Bandwidth Logo"
              className="footer-logo-img"
            />
            <span className="footer-brand-text">
              NJ.C <span className="gradient-span">Bandwidth</span>
            </span>
          </Link>
          <p className="footer-motto">
            Connecting Nairobi's digital future through community, rewards,
            and trade.
          </p>
        </div>

        <div className="footer-top-right">
          <div className="footer-social">
            <a href="#" className="social-link" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#" className="social-link" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="#" className="social-link" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" className="social-link" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Middle Section: Four Columns */}
      <div className="footer-columns">
        {/* Company */}
        <div className="footer-column">
          <h3>Company</h3>
          <Link to="/about">About Us</Link>
          <Link to="/team">Our Team</Link>
          <Link to="/careers">Careers</Link>
          <Link to="/contact">Contact Us</Link>
        </div>

        {/* Services */}
        <div className="footer-column">
          <h3>Services</h3>
          <Link to="/referrals">Referral Program</Link>
          <Link to="/marketplace">Black Market</Link>
          <Link to="/points">Points System</Link>
          <Link to="/premium">Premium Membership</Link>
        </div>

        {/* Support */}
        <div className="footer-column">
          <h3>Support</h3>
          <Link to="/help">Help Center</Link>
          <Link to="/faq">FAQs</Link>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/privacy">Privacy Policy</Link>
        </div>

        {/* Contact */}
        <div className="footer-column">
          <h3>Contact</h3>
          <div className="footer-contact-item">
            <FaMapMarkerAlt />
            <span>Nairobi, NJ Kenya</span>
          </div>
          <div className="footer-contact-item">
            <FaPhoneAlt />
            <span>+254764455987</span>
          </div>
          <div className="footer-contact-item">
            <FaEnvelope />
            <span>fox_tec@yahoo.com</span>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <p>
          &copy; {currentYear} NJ.C Bandwidth. All rights reserved.
        </p>
        <div className="footer-bottom-links">
          <Link to="/terms">Terms</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/cookies">Cookies</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
