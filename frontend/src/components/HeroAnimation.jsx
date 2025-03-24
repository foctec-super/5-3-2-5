import React from 'react';
import { motion } from 'framer-motion';
import img2 from '../assets/img2.jpg';
import './HeroAnimation.css';

const HeroAnimation = () => {
  return (
    <div className="hero-container">
      {/* Parallax Background */}
      <div className="parallax-bg" style={{ backgroundImage: `url(${img2})` }}></div>
      
      {/* Dark Gradient Overlay */}
      <div className="dark-overlay"></div>

      {/* Text + Buttons Content */}
      <div className="hero-content-wrapper">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Title Section */}
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            <span className="gradient-text">Marketing</span>
            <span className="company-title">NJ.C Bandwidth</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="hero-description"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Build your network, earn rewards, and trade in our 
            <span className="highlight"> digital marketplace</span>.
            <br />
            Join the revolution in Nairobi's digital community.
          </motion.p>

          {/* Call-to-Action Buttons */}
          <motion.div
            className="cta-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <button className="primary-cta">Get Started →</button>
            <button className="secondary-cta">Learn More</button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroAnimation;
