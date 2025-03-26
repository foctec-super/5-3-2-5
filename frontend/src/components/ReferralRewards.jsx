import React, { useState, useEffect, useRef } from 'react';
import './ReferralRewards.css';

const ReferralRewards = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [promoCode, setPromoCode] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  // We'll observe when this section enters the viewport
  const referralSectionRef = useRef(null);

  useEffect(() => {
    const section = referralSectionRef.current;
    if (!section) return;

    // Create IntersectionObserver to track when "ReferralRewards" is in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        const phone = document.querySelector('.global-floating-phone');
        if (!phone) return;
        if (entry.isIntersecting) {
          // We want the phone to become small & move to the top-left of this section
          phone.classList.add('phone-in-referral-rewards');
        } else {
          phone.classList.remove('phone-in-referral-rewards');
        }
      },
      { threshold: 0.2 } // Adjust threshold as needed
    );

    observer.observe(section);

    return () => {
      observer.unobserve(section);
    };
  }, []);

  const generatePromoCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'NJ';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPromoCode(code);
  };

  const copyToClipboard = () => {
    if (!promoCode) return;
    navigator.clipboard.writeText(promoCode).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const referralData = [
    {
      id: 1,
      title: 'Refer Friends',
      description: 'Get $10 for each friend who joins using your promo code.',
      icon: '👥',
      color: '#4a00e0',
      details:
        'Share your unique promo code with friends and family. When they sign up and make their first transaction, you both receive $10 in your accounts.'
    },
    {
      id: 2,
      title: 'NJ Points',
      description: 'Earn points for every activity on our platform.',
      icon: '🌟',
      color: '#8e2de2',
      details:
        'Earn NJ Points for referrals, purchases, and daily engagement. Exchange points for cash or use them in our marketplace.'
    },
    {
      id: 3,
      title: 'Trade & Sell',
      description: 'Buy and sell products using your earned points.',
      icon: '💼',
      color: '#ff6b6b',
      details:
        'List your products and services. Set prices in dollars or NJ Points. Reach our growing community of active users.'
    }
  ];

  return (
    <div
      className="referral-rewards-container parallax-referral-bg"
      id="referral-rewards"
      ref={referralSectionRef}
    >
      <div className="referral-title-wrapper">
        <h2 className="referral-main-title">Referral Rewards</h2>
        <p className="referral-subtitle">
          Invite friends, share your unique code, and earn big!
        </p>
      </div>

      <div className="referral-cards">
        {referralData.map((card) => (
          <div
            className={`referral-card ${activeCard === card.id ? 'active' : ''}`}
            key={card.id}
            style={{ '--card-color': card.color }}
            onClick={() =>
              setActiveCard(activeCard === card.id ? null : card.id)
            }
          >
            {/* "card-inner" for 3D flip animation */}
            <div className="card-inner">
              {/* Card front */}
              <div className="card-front">
                <div className="card-icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
              {/* Card back */}
              <div className="card-back">
                <h4>Details</h4>
                <p>{card.details}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="promo-code-section">
        <h3>Your Unique Promo Code</h3>
        <div className="promo-code-container">
          {promoCode ? (
            <>
              <div className="promo-code">{promoCode}</div>
              <button className="copy-button" onClick={copyToClipboard}>
                {isCopied ? 'Copied!' : 'Copy'}
              </button>
            </>
          ) : (
            <button className="generate-button" onClick={generatePromoCode}>
              Generate Code
            </button>
          )}
        </div>

        <div className="promo-stats">
          <div className="stat">
            <span className="stat-number">0</span>
            <span className="stat-label">Referrals</span>
          </div>
          <div className="stat">
            <span className="stat-number">0</span>
            <span className="stat-label">NJ Points</span>
          </div>
          <div className="stat">
            <span className="stat-number">$0</span>
            <span className="stat-label">Earnings</span>
          </div>
        </div>
      </div>

      <div className="referral-steps">
        <h3>How It Works</h3>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Generate Your Code</h4>
              <p>Create your unique promo code to share with others</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Share With Friends</h4>
              <p>Share your code on social media or directly with friends</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Earn Rewards</h4>
              <p>Get rewarded when friends sign up using your code</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralRewards;
