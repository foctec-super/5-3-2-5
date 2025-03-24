import React, { useEffect, useState, useRef } from 'react';
import './ScrollAnimations.css';
import img1 from '../assets/img1.jpg';
import img4 from '../assets/img4.jpg';

const ScrollAnimations = () => {
  const [scrollY, setScrollY] = useState(0);
  const [sections, setSections] = useState([]);
  const phoneRef = useRef(null);
  const notificationRef = useRef(null);
  const referralMessageRef = useRef(null);
  const sectionsRef = useRef([]);
  const particlesRef = useRef(null);

  // Handle scroll event
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    setScrollY(currentScrollY);

    // Show notification at specific scroll position
    if (notificationRef.current && currentScrollY > 300 && currentScrollY < 800) {
      notificationRef.current.classList.add('active');
    } else if (notificationRef.current) {
      notificationRef.current.classList.remove('active');
    }

    // Show referral message at specific scroll position
    if (referralMessageRef.current && currentScrollY > 1000 && currentScrollY < 1500) {
      referralMessageRef.current.classList.add('active');
    } else if (referralMessageRef.current) {
      referralMessageRef.current.classList.remove('active');
    }

    // Animate sections when they come into view
    sectionsRef.current.forEach((section) => {
      if (!section) return;
      
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionVisible = currentScrollY + window.innerHeight > sectionTop + 150;
      
      if (sectionVisible) {
        section.classList.add('visible');
      }
    });

    // Animate phone position and rotation based on scroll
    if (phoneRef.current) {
      const { translateY, translateX, rotate, scale, opacity } = calculatePhoneAnimation(currentScrollY);
      phoneRef.current.style.transform = `translateY(${translateY}px) translateX(${translateX}px) rotate(${rotate}deg) scale(${scale})`;
      phoneRef.current.style.opacity = opacity;
    }
  };

  // Calculate phone animation values based on scroll position
  const calculatePhoneAnimation = (scrollPos) => {
    // Define scroll checkpoints for animation
    const start = 0;
    const mid1 = 800;
    const mid2 = 1600;
    const end = 2400;
    
    let translateY = -50; // Base position (centered)
    let translateX = 0;
    let rotate = 0;
    let scale = 1;
    let opacity = 1;
    
    // First section animation (phone moves down and rotates slightly)
    if (scrollPos <= mid1) {
      const progress = Math.min(1, scrollPos / mid1);
      translateY = -50 + progress * 100;
      rotate = progress * 10;
      scale = 1 - progress * 0.1;
    } 
    // Second section animation (phone moves to the side)
    else if (scrollPos <= mid2) {
      const progress = Math.min(1, (scrollPos - mid1) / (mid2 - mid1));
      translateY = 50 - progress * 100;
      translateX = progress * 100;
      rotate = 10 - progress * 20;
      scale = 0.9 + progress * 0.2;
    } 
    // Final section animation (phone fades out)
    else if (scrollPos <= end) {
      const progress = Math.min(1, (scrollPos - mid2) / (end - mid2));
      translateY = -50 - progress * 100;
      translateX = 100 - progress * 50;
      rotate = -10 - progress * 10;
      scale = 1.1 - progress * 0.3;
      opacity = 1 - progress;
    } 
    // Out of view
    else {
      opacity = 0;
    }
    
    return { translateY, translateX, rotate, scale, opacity };
  };

  // Create particles
  const createParticles = () => {
    if (!particlesRef.current) return;
    
    const container = particlesRef.current;
    container.innerHTML = '';
    
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random size between 10px and 40px
      const size = Math.random() * 30 + 10;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random position
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      // Random delay and duration
      const delay = Math.random() * 10;
      const duration = Math.random() * 10 + 10;
      particle.style.animation = `floatParticle ${duration}s linear ${delay}s infinite`;
      
      container.appendChild(particle);
    }
  };

  // Add section ref for animation
  const addSectionRef = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  // Initialize
  useEffect(() => {
    // Create demo sections
    setSections([
      {
        title: "Unlock the Power of Referrals",
        description: "Our revolutionary referral system allows you to earn points and rewards by inviting friends and family to join the platform. Each successful referral brings you closer to exclusive benefits.",
        buttonText: "Start Referring",
        buttonLink: "#referrals"
      },
      {
        title: "Trade on Our Exclusive Marketplace",
        description: "Buy, sell, and exchange products and services in our secure marketplace. With thousands of active users, you'll find everything you need within our vibrant community.",
        buttonText: "Explore Marketplace",
        buttonLink: "#marketplace"
      },
      {
        title: "Join Nairobi's Digital Revolution",
        description: "Be part of the fastest growing digital community in Nairobi, USA. Connect with like-minded individuals, entrepreneurs, and businesses to unlock new opportunities.",
        buttonText: "Join Now",
        buttonLink: "#signup"
      }
    ]);
    
    // Create particles
    createParticles();
    
    // Set up scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial check for elements in view
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Update scroll progress bar width
  const progressWidth = Math.min(100, (scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);

  return (
    <div className="scroll-animations-container">
      {/* Scroll Progress Indicator */}
      <div className="scroll-progress-container">
        <div 
          className="scroll-progress-bar" 
          style={{ width: `${progressWidth}%` }}
        ></div>
      </div>
      
      {/* Floating Phone */}
      <div className="floating-phone" ref={phoneRef}>
        <div className="phone-device">
          <div className="phone-screen">
            <div className="screen-content">
              <div className="app-header">
                <div className="app-logo">NJ.C</div>
                <div className="app-title">NJ.C Bandwidth</div>
                <div className="app-subtitle">Earn, Connect, Trade</div>
              </div>
              
              <div className="app-icons">
                <div className="app-icon">🏠</div>
                <div className="app-icon">👥</div>
                <div className="app-icon">🔄</div>
                <div className="app-icon">💰</div>
                <div className="app-icon">🛒</div>
                <div className="app-icon">⭐</div>
              </div>
              
              <div className="notification" ref={notificationRef}>
                <div className="notification-header">
                  <div className="notification-app">Referral Program</div>
                  <div className="notification-time">Just now</div>
                </div>
                <div className="notification-content">
                  Your friend John just joined using your referral code! You earned 500 points.
                </div>
              </div>
              
              <div className="referral-message" ref={referralMessageRef}>
                <div className="referral-content">
                  Share your referral code
                  <div className="referral-code">NJ2023REF</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Animated Sections */}
      <div className="animated-sections">
        {sections.map((section, index) => (
          <div 
            key={index}
            className="animated-section"
            ref={addSectionRef}
          >
            <div className="section-content">
              <h2 className="section-title">{section.title}</h2>
              <p className="section-description">{section.description}</p>
              <a href={section.buttonLink} className="section-button">
                {section.buttonText}
              </a>
            </div>
            
            {/* Add a card flip demonstration for the second section */}
            {index === 1 && (
              <div className="card-flip-container">
                <div className="card-flip">
                  <div className="card-front">
                    <h3>Trading Made Easy</h3>
                  </div>
                  <div className="card-back">
                    <h3>NJ.C Black Market</h3>
                    <p>Buy and sell securely with our trusted platform</p>
                    <img 
                      src={img4} 
                      alt="Marketplace" 
                      style={{ width: '80%', height: 'auto', borderRadius: '10px', marginTop: '10px' }}
                    />
                  </div>
                </div>
              </div>
            )}
            
            {/* Add a profile showcase for the third section */}
            {index === 2 && (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                marginTop: '40px' 
              }}>
                <div style={{
                  width: '200px',
                  borderRadius: '15px',
                  overflow: 'hidden',
                  background: 'rgba(255, 255, 255, 0.1)',
                  padding: '20px',
                  textAlign: 'center',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
                }}>
                  <div style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    margin: '0 auto 20px',
                    border: '3px solid #8E2DE2'
                  }}>
                    <img 
                      src={img1} 
                      alt="Profile" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <h3 style={{ margin: '0 0 10px', color: 'white' }}>Sarah Johnson</h3>
                  <p style={{ margin: '0 0 15px', color: 'rgba(255, 255, 255, 0.8)' }}>Premium Member</p>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '10px'
                  }}>
                    <span style={{ color: '#FFD700', marginRight: '3px' }}>⭐</span>
                    <span style={{ color: '#FFD700', marginRight: '3px' }}>⭐</span>
                    <span style={{ color: '#FFD700', marginRight: '3px' }}>⭐</span>
                    <span style={{ color: '#FFD700', marginRight: '3px' }}>⭐</span>
                    <span style={{ color: '#FFD700' }}>⭐</span>
                  </div>
                  <p style={{ color: '#4A00E0', fontWeight: 'bold' }}>5,432 Points</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Background Particles */}
      <div className="particles-container" ref={particlesRef}></div>
      
      {/* Section Transition Effect */}
      <div className="section-transition">
        <div className="transition-wave"></div>
      </div>
    </div>
  );
};

export default ScrollAnimations; 