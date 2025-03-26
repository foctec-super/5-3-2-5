import React, { useEffect, useRef } from 'react';
import './FloatingPhone.css';

const FloatingPhone = () => {
  const phoneRef = useRef(null);
  const notificationTimerRef = useRef(null);
  const currentSectionRef = useRef('hero');

  useEffect(() => {
    const handleScroll = () => {
      if (!phoneRef.current) return;

      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const phoneElement = phoneRef.current;

      // Identify current section by scroll position
      const sections = [
        { id: 'hero', top: 0, bottom: viewportHeight },
        { id: 'about', top: viewportHeight, bottom: viewportHeight * 2 },
        { id: 'referrals', top: viewportHeight * 2, bottom: viewportHeight * 3 },
        { id: 'marketplace', top: viewportHeight * 3, bottom: viewportHeight * 4 },
        { id: 'contact', top: viewportHeight * 4, bottom: Infinity }
      ];

      const currentSection = sections.find(
        (section) => scrollY >= section.top && scrollY < section.bottom
      );

      // If we've moved to a new section, switch phone classes & content
      if (currentSection && currentSection.id !== currentSectionRef.current) {
        currentSectionRef.current = currentSection.id;
        phoneElement.classList.remove(
          'in-hero',
          'in-about',
          'in-referrals',
          'in-marketplace',
          'in-contact'
        );
        phoneElement.classList.add(`in-${currentSection.id}`);
        updatePhoneContent(currentSection.id);
      }

      // Calculate scroll progress to transform phone
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight
      );
      const scrollPercentage = scrollY / (docHeight - viewportHeight);

      // Subtle 3D rotations
      const rotateY = Math.sin(scrollY * 0.002) * 15;
      const rotateX = Math.sin(scrollY * 0.001) * 10;

      // Position & scale phone differently per section
      let translateX, translateY, scale;

      if (scrollY < viewportHeight) {
        // Hero area
        translateX = '0%';
        translateY = Math.sin(scrollY * 0.005) * 30;
        scale = 1 - (scrollY / viewportHeight) * 0.2;
      } else if (scrollY < viewportHeight * 2) {
        // About
        const sectionProgress = (scrollY - viewportHeight) / viewportHeight;
        translateX = `${-15 * sectionProgress}%`;
        translateY = 20 + Math.sin(scrollY * 0.005) * 20;
        scale = 0.8 - sectionProgress * 0.1;
      } else if (scrollY < viewportHeight * 3) {
        // Referrals
        const sectionProgress = (scrollY - viewportHeight * 2) / viewportHeight;
        translateX = `-${15 + sectionProgress * 15}%`;
        translateY = 10 + Math.sin(scrollY * 0.005) * 15;
        scale = 0.7 - sectionProgress * 0.1;
      } else {
        // Marketplace & contact
        translateX = '-35%';
        translateY = Math.sin(scrollY * 0.005) * 10;
        scale = 0.6;
      }

      // Apply transformations
      phoneElement.style.transform = `
        translateX(${translateX})
        translateY(${translateY}px)
        rotateY(${rotateY}deg)
        rotateX(${rotateX}deg)
        scale(${scale})
      `;

      // Fade phone out slightly near bottom
      phoneElement.style.opacity = 1 - scrollPercentage * 0.3;
    };

    const updatePhoneContent = (sectionId) => {
      const notificationElement = document.querySelector('.phone-notification');
      const referralElement = document.querySelector('.phone-referral');
      const appIconsElement = document.querySelector('.app-icons');

      if (!notificationElement || !referralElement || !appIconsElement) return;

      // Clear any existing timers for notifications
      if (notificationTimerRef.current) {
        clearTimeout(notificationTimerRef.current);
      }

      // Reset their states
      notificationElement.style.opacity = 0;
      notificationElement.style.transform = 'translateX(50px)';
      referralElement.style.opacity = 0;
      referralElement.style.transform = 'translateY(30px)';

      // We'll tweak these based on the section
      let notificationTitle = '';
      let notificationText = '';
      let referralTitle = '';
      let referralText = '';

      switch (sectionId) {
        case 'hero':
          notificationTitle = 'Welcome!';
          notificationText = 'Explore NJ.C Bandwidth';
          appIconsElement.setAttribute('data-section', 'hero');
          break;
        case 'about':
          notificationTitle = 'About Us';
          notificationText = 'Learn how we revolutionize connections';
          appIconsElement.setAttribute('data-section', 'about');
          break;
        case 'referrals':
          notificationTitle = 'New Reward!';
          notificationText = "You've earned 25 points";
          referralTitle = 'Your Referral Link';
          referralText = 'njc.band/ref/u12345';
          appIconsElement.setAttribute('data-section', 'referrals');
          break;
        case 'marketplace':
          notificationTitle = 'Black Market Deal';
          notificationText = 'New products available now';
          appIconsElement.setAttribute('data-section', 'marketplace');
          break;
        case 'contact':
          notificationTitle = 'Get in Touch';
          notificationText = "We'd love to hear from you";
          appIconsElement.setAttribute('data-section', 'contact');
          break;
        default:
          notificationTitle = 'Welcome!';
          notificationText = 'Explore NJ.C Bandwidth';
      }

      // Update text content
      document.querySelector('.notification-title').textContent = notificationTitle;
      document.querySelector('.notification-text').textContent = notificationText;

      // If there's referral data, plug it in
      if (referralTitle && referralText) {
        document.querySelector('.referral-title').textContent = referralTitle;
        document.querySelector('.referral-link').textContent = referralText;
      }

      // Stagger display
      notificationTimerRef.current = setTimeout(() => {
        notificationElement.style.opacity = 1;
        notificationElement.style.transform = 'translateX(0)';

        // Show referral after a short delay, if present
        if (referralTitle && referralText) {
          setTimeout(() => {
            referralElement.style.opacity = 1;
            referralElement.style.transform = 'translateY(0)';
          }, 500);
        }
      }, 300);
    };

    // Initial run
    handleScroll();
    updatePhoneContent('hero');

    // Listen for scroll
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (notificationTimerRef.current) {
        clearTimeout(notificationTimerRef.current);
      }
    };
  }, []);

  return (
    <div ref={phoneRef} className="global-floating-phone in-hero">
      {/* Glow ring behind phone */}
      <div className="phone-glow-ring"></div>

      <div className="phone-inner">
        <div className="phone-device">
          {/* Camera lens for realism */}
          <div className="phone-camera"></div>

          <div className="phone-notch"></div>
          <div className="phone-screen">
            <div className="screen-content">

              {/*
                ---------------------------------------------------------
                NEW: Marketing Banner 
                ---------------------------------------------------------
              */}
              <div className="phone-banner">
                <h2 className="banner-title">Marketing NJC Bandwidth</h2>
                <p className="banner-subtitle">
                  Empowering You for the Digital Revolution
                </p>
                <div className="banner-buttons">
                  <button className="banner-cta join-now">
                    Join Now
                  </button>
                  <button className="banner-cta learn-more">
                    Learn More
                  </button>
                </div>
              </div>

              {/*
                Existing icons & notifications
              */}
              <div className="app-icons" data-section="hero">
                <div className="app-icon icon-1"></div>
                <div className="app-icon icon-2"></div>
                <div className="app-icon icon-3"></div>
                <div className="app-icon icon-4"></div>
                <div className="app-icon icon-5"></div>
                <div className="app-icon icon-6"></div>
                <div className="app-icon icon-7"></div>
                <div className="app-icon icon-8"></div>
              </div>

              <div className="phone-notification">
                <div className="notification-icon">🔔</div>
                <div className="notification-content">
                  <div className="notification-title">Welcome!</div>
                  <div className="notification-text">Explore NJ.C Bandwidth</div>
                </div>
              </div>

              <div className="phone-referral">
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
  );
};

export default FloatingPhone;
