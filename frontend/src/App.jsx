import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import './styles/variables.css';
import logo from './assets/logo.png';
import img1 from './assets/img1.jpg';
import img2 from './assets/img2.jpg';
import img3 from './assets/img3.jpg';
import img4 from './assets/img4.jpg';
import img5 from './assets/img5.jpg';

// Components
import Navbar from './components/Navbar';
import HeroAnimation from './components/HeroAnimation';
import ReferralRewards from './components/ReferralRewards';
import Marketplace from './components/Marketplace';
import ScrollAnimations from './components/ScrollAnimations';
import LoginPage from './components/Authentication/LoginPage';
import RegisterPage from './components/Authentication/RegisterPage';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import About from './components/About';
import MarketPage from './components/Marketpage';
import SellerRegistrationForm from './components/SellerRegistration';
import BankDashboard from './components/Bankdashboard';
import TransactionHistoryPage from './components/TransactionhistoryPage';
import TransactionsPage from './components/TransactionPage';

function App() {
  const [scrollY, setScrollY] = useState(0);
  // Remove or comment out the loading state
  // const [isLoading, setIsLoading] = useState(true);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Add loading animation
    // const timer = setTimeout(() => {
    //   setIsLoading(false);
    // }, 2000);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      // clearTimeout(timer);
    };
  }, []);

  // Main content
  const MainContent = () => (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section id="home" className="hero-section">
        <ErrorBoundary>
          <HeroAnimation />
        </ErrorBoundary>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <About />
      </section>

      {/* Referrals Section */}
      <section id="referrals" className="referrals-section">
        <div className="section-side-image" style={{ backgroundImage: `url(${img3})` }}>
          <div className="image-content">
            <h3>Share. Connect. Earn.</h3>
            <p>Join thousands of users growing their networks and earning rewards</p>
          </div>
        </div>
        <div className="referrals-content">
          <h2 className="section-title">Referral Rewards</h2>
          <p className="section-description">
            Our revolutionary referral system allows you to earn points and exclusive rewards 
            by inviting friends and family to join NJ.C Bandwidth. Each successful referral 
            brings you closer to premium benefits and special status in our community.
          </p>
          <ReferralRewards />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Sign Up</h3>
            <p>Create your account and complete your profile</p>
            <div className="step-icon">📝</div>
          </div>
          <div className="step-connector"></div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Refer Friends</h3>
            <p>Invite others to join using your unique referral code</p>
            <div className="step-icon">👥</div>
          </div>
          <div className="step-connector"></div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Earn Points</h3>
            <p>Build your point balance through referrals and activities</p>
            <div className="step-icon">⭐</div>
          </div>
          <div className="step-connector"></div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Trade & Redeem</h3>
            <p>Use your points in our marketplace or for exclusive rewards</p>
            <div className="step-icon">🎁</div>
          </div>
        </div>
      </section>

      {/* Marketplace Section */}
      <section id="marketplace" className="marketplace-section">
        <h2 className="section-title">Black Market Trading</h2>
        <p className="section-description">
          Our exclusive marketplace brings together buyers and sellers in a secure, 
          user-friendly environment. Browse through a wide range of products and services, 
          or list your own items to reach thousands of potential customers. With our point-based 
          system, trading has never been more rewarding.
        </p>
        <div className="marketplace-container-wrapper">
          <Marketplace />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="contact-content">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-description">
            Have questions or feedback? We'd love to hear from you. Reach out to our team 
            and we'll get back to you shortly.
          </p>
          <form className="contact-form">
            <div className="form-group">
              <input type="text" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Your Email" required />
            </div>
            <div className="form-group">
              <input type="text" placeholder="Subject" />
            </div>
            <div className="form-group">
              <textarea placeholder="Your Message" rows="5" required></textarea>
            </div>
            <button type="submit" className="submit-button">Send Message</button>
          </form>
        </div>
        <div className="contact-info">
          <div className="info-item">
            <div className="info-icon">📍</div>
            <div className="info-content">
              <h3>Location</h3>
              <p>Nairobi, NJ kenya</p>
            </div>
          </div>
          <div className="info-item">
            <div className="info-icon">📱</div>
            <div className="info-content">
              <h3>Phone</h3>
              <p>+254764455987</p>
            </div>
          </div>
          <div className="info-item">
            <div className="info-icon">✉️</div>
            <div className="info-content">
              <h3>Email</h3>
              <p>fox_tec@yahoo.com</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />

     
    </>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path='/marketplace' element={<MarketPage />} />
        <Route path='/seller-reg' element={<SellerRegistrationForm />} />
        <Route path='/dashboard' element={<BankDashboard />} />
        <Route path='/transaction-history' element={<TransactionHistoryPage />} />
        <Route path='/transactions' element={<TransactionsPage />} />
        {/* ...other routes... */}
      </Routes>
    </Router>
  );
}

export default App;
