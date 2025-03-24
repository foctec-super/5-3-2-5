import React, { useEffect, useRef } from 'react';
import './About.css';
import img1 from '../assets/img1.jpg';
import img3 from '../assets/img3.jpg';
import img5 from '../assets/img5.jpg';

const About = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const featureRefs = useRef([]);
  const imageRef = useRef(null);
  const phoneRef = useRef(null);
  
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    }, observerOptions);
    
    const elementObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          elementObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    if (sectionRef.current) {
      sectionObserver.observe(sectionRef.current);
    }
    
    if (textRef.current) {
      elementObserver.observe(textRef.current);
    }
    
    featureRefs.current.forEach(ref => {
      if (ref) elementObserver.observe(ref);
    });
    
    if (imageRef.current) {
      elementObserver.observe(imageRef.current);
    }
    
    if (phoneRef.current) {
      elementObserver.observe(phoneRef.current);
    }
    
    // Floating phone animation on scroll
    const handleScroll = () => {
      if (phoneRef.current) {
        const scrollY = window.scrollY;
        const phoneElement = phoneRef.current;
        
        // Calculate phone rotation and movement based on scroll position
        const rotateY = scrollY * 0.05;
        const rotateX = Math.sin(scrollY * 0.005) * 10;
        const translateY = Math.sin(scrollY * 0.01) * 20;
        
        phoneElement.style.transform = `
          rotateY(${rotateY}deg) 
          rotateX(${rotateX}deg) 
          translateY(${translateY}px)
        `;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      if (sectionRef.current) sectionObserver.unobserve(sectionRef.current);
      if (textRef.current) elementObserver.unobserve(textRef.current);
      featureRefs.current.forEach(ref => {
        if (ref) elementObserver.unobserve(ref);
      });
      if (imageRef.current) elementObserver.unobserve(imageRef.current);
      if (phoneRef.current) elementObserver.unobserve(phoneRef.current);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const addFeatureRef = (el) => {
    if (el && !featureRefs.current.includes(el)) {
      featureRefs.current.push(el);
    }
  };
  
  return (
    <div ref={sectionRef} className="about-container">
      <div className="about-background">
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
        <div className="bg-shape shape-3"></div>
        <div className="particles-container">
          {[...Array(20)].map((_, index) => (
            <div 
              key={index} 
              className="particle"
              style={{
                '--delay': `${Math.random() * 5}s`,
                '--size': `${Math.random() * 10 + 5}px`,
                '--speed': `${Math.random() * 20 + 10}s`,
                '--x': `${Math.random() * 100}%`,
                '--y': `${Math.random() * 100}%`,
              }}
            ></div>
          ))}
        </div>
      </div>
      
      {/* Floating Phone */}
      <div ref={phoneRef} className="floating-phone-container">
        <div className="floating-phone">
          <div className="phone-device">
            <div className="phone-screen">
              <div className="screen-content">
                <div className="app-icons">
                  <div className="app-icon"></div>
                  <div className="app-icon"></div>
                  <div className="app-icon"></div>
                  <div className="app-icon"></div>
                </div>
                <div className="notification">
                  <div className="notification-icon">🔔</div>
                  <div className="notification-content">
                    <div className="notification-title">New Reward!</div>
                    <div className="notification-text">You've earned 25 points</div>
                  </div>
                </div>
                <div className="referral-message">
                  <div className="referral-title">Your Referral Link</div>
                  <div className="referral-link">njc.band/ref/u12345</div>
                  <div className="referral-share">Share & Earn</div>
                </div>
              </div>
            </div>
            <div className="phone-button"></div>
          </div>
          <div className="phone-reflection"></div>
          <div className="phone-shadow"></div>
        </div>
      </div>
      
      <div className="about-content">
        <div ref={textRef} className="about-text fade-in-up">
          <h2 className="section-title">About NJ.C Bandwidth</h2>
          <p className="section-description">
            NJ.C Bandwidth is revolutionizing the digital landscape in Nairobi, USA with 
            our innovative platform that combines community engagement, digital rewards, 
            and marketplace trading. Our mission is to create a vibrant ecosystem where 
            users can connect, share, and prosper together.
          </p>
        </div>
        
        <div className="about-grid">
          <div className="features-column">
            <div ref={(el) => addFeatureRef(el)} className="feature-card slide-in-left" style={{ '--delay': '0.1s' }}>
              <div className="feature-icon">🌐</div>
              <div className="feature-content">
                <h3>Community Focus</h3>
                <p>Build meaningful connections with like-minded individuals in the Nairobi digital space</p>
              </div>
              <div className="feature-bg"></div>
            </div>
            
            <div ref={(el) => addFeatureRef(el)} className="feature-card slide-in-left" style={{ '--delay': '0.3s' }}>
              <div className="feature-icon">💰</div>
              <div className="feature-content">
                <h3>Earning Opportunities</h3>
                <p>Multiple ways to earn points, rewards, and digital assets through active participation</p>
              </div>
              <div className="feature-bg"></div>
            </div>
            
            <div ref={(el) => addFeatureRef(el)} className="feature-card slide-in-left" style={{ '--delay': '0.5s' }}>
              <div className="feature-icon">🔄</div>
              <div className="feature-content">
                <h3>Trading Platform</h3>
                <p>Buy, sell, and exchange goods and services in our secure and innovative marketplace</p>
              </div>
              <div className="feature-bg"></div>
            </div>
          </div>
          
          <div ref={imageRef} className="image-column fade-in-right">
            <div className="image-grid">
              <div className="image-item image-large" style={{ backgroundImage: `url(${img1})` }}>
                <div className="image-overlay">
                  <span>Digital Innovation</span>
                </div>
              </div>
              <div className="image-item" style={{ backgroundImage: `url(${img3})` }}>
                <div className="image-overlay">
                  <span>Community</span>
                </div>
              </div>
              <div className="image-item" style={{ backgroundImage: `url(${img5})` }}>
                <div className="image-overlay">
                  <span>Rewards</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="about-counter-section">
          <div ref={(el) => addFeatureRef(el)} className="counter-item zoom-in" style={{ '--delay': '0.2s' }}>
            <div className="counter-value">15,000+</div>
            <div className="counter-label">Active Users</div>
          </div>
          <div ref={(el) => addFeatureRef(el)} className="counter-item zoom-in" style={{ '--delay': '0.4s' }}>
            <div className="counter-value">250,000+</div>
            <div className="counter-label">Transactions</div>
          </div>
          <div ref={(el) => addFeatureRef(el)} className="counter-item zoom-in" style={{ '--delay': '0.6s' }}>
            <div className="counter-value">500,000+</div>
            <div className="counter-label">Points Awarded</div>
          </div>
          <div ref={(el) => addFeatureRef(el)} className="counter-item zoom-in" style={{ '--delay': '0.8s' }}>
            <div className="counter-value">98%</div>
            <div className="counter-label">User Satisfaction</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 