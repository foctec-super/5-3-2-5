import React, { useState, useEffect } from 'react';
import './Marketplace.css';

// Higher quality product images
const productImages = [
  'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1470&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1470&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=1074&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?q=80&w=1470&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1630779656961-4a927dab67d8?q=80&w=1170&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop'
];

// Sample product data with enhanced descriptions
const sampleProducts = [
  {
    id: 1,
    name: 'Premium Website Template',
    price: 250,
    njPoints: 120,
    image: productImages[0],
    category: 'digital',
    description: 'Professional website template with modern design and responsive features. Includes SEO optimization and speed enhancements.',
    rating: 4.8,
    sales: 124
  },
  {
    id: 2,
    name: 'Marketing Consultation',
    price: 500,
    njPoints: 300,
    image: productImages[1],
    category: 'service',
    description: 'One-hour consultation with our marketing experts to boost your business. Includes personalized strategy and actionable insights.',
    rating: 4.9,
    sales: 89
  },
  {
    id: 3,
    name: 'Social Media Package',
    price: 350,
    njPoints: 180,
    image: productImages[2],
    category: 'digital',
    description: 'Complete package of social media templates and strategy guides. Includes 30+ post templates and content calendar.',
    rating: 4.7,
    sales: 210
  },
  {
    id: 4,
    name: 'SEO Optimization',
    price: 450,
    njPoints: 250,
    image: productImages[3],
    category: 'service',
    description: 'Comprehensive SEO optimization for your website to rank higher. Includes keyword research and on-page optimization.',
    rating: 4.6,
    sales: 76
  },
  {
    id: 5,
    name: 'Brand Identity Kit',
    price: 300,
    njPoints: 150,
    image: productImages[4],
    category: 'digital',
    description: 'Complete brand identity kit including logo, colors, typography, and brand guidelines document.',
    rating: 4.8,
    sales: 153
  },
  {
    id: 6,
    name: 'Video Editing Service',
    price: 400,
    njPoints: 220,
    image: productImages[5],
    category: 'service',
    description: 'Professional video editing service for your marketing campaigns. Includes color grading and motion graphics.',
    rating: 4.7,
    sales: 93
  }
];

const Marketplace = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading and data fetching
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setVisibleProducts(sampleProducts);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleFilterChange = (category) => {
    setIsLoading(true);
    setFilter(category);
    
    // Simulate api call latency
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };
  
  const filteredProducts = sampleProducts.filter(product => {
    const matchesCategory = filter === 'all' || product.category === filter;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  // Star rating component
  const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="star-rating">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={
            i < fullStars 
              ? "star full-star" 
              : i === fullStars && hasHalfStar 
                ? "star half-star" 
                : "star empty-star"
          }>
            {i < fullStars 
              ? "★" 
              : i === fullStars && hasHalfStar 
                ? "★" 
                : "☆"}
          </span>
        ))}
        <span className="rating-number">({rating})</span>
      </div>
    );
  };

  return (
    <div className="marketplace-container">
      <div className="marketplace-header">
        <h2>Explore the Black Market</h2>
        <p>Discover digital products and services from our community members</p>
      </div>
      
      <div className="marketplace-controls">
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </button>
        </div>
        <div className="filter-buttons">
          <button 
            className={filter === 'all' ? 'active' : ''} 
            onClick={() => handleFilterChange('all')}
          >
            All Products
          </button>
          <button 
            className={filter === 'digital' ? 'active' : ''} 
            onClick={() => handleFilterChange('digital')}
          >
            Digital Products
          </button>
          <button 
            className={filter === 'service' ? 'active' : ''} 
            onClick={() => handleFilterChange('service')}
          >
            Services
          </button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="loading-products">
          <div className="spinner"></div>
          <p>Loading products...</p>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map(product => (
            <div className="product-card" key={product.id}>
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <div className="product-badge">
                  {product.category === 'digital' ? 'Digital' : 'Service'}
                </div>
              </div>
              <div className="product-details">
                <h3>{product.name}</h3>
                <StarRating rating={product.rating} />
                <p className="product-description">{product.description}</p>
                <div className="product-meta">
                  <span className="sales-count">{product.sales} sold</span>
                </div>
                <div className="product-pricing">
                  <div className="price-options">
                    <span className="price">${product.price}</span>
                    <span className="points">or {product.njPoints} NJ Points</span>
                  </div>
                  <button className="buy-button">Purchase</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {!isLoading && filteredProducts.length === 0 && (
        <div className="no-products">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" viewBox="0 0 16 16">
            <path d="M2.873 11.297V4.142H1.699L0 5.74v1.408l1.64-1.593h.04v5.742h1.193zm1.198-2.976h-.038c.104-1.13.164-1.7.193-1.872.397-2.28 1.703-3.453 3.917-3.453 1.047 0 1.98.195 2.58.748.46.346.78.298.762 1.1h1.376c.16-.798.42-1.407 1.03-1.86C14.95 1.54 16 2.09 16 3.773v4.903c0 .398-.14.914-.504 1.424-.366.51-1.104.933-2.306.993-1.298.064-2.513-.058-2.66-.477-.033-.09-.065-.185-.093-.283-.098-.359-.18-.767-.26-1.176h-1.094c.054.38.072.608.072.68 0 .506-.336 1.845-1.879 1.916-1.496.07-2.815-.455-2.815-1.956 0-.567.218-1.066.65-1.356.55-.384 1.44-.582 2.61-.582h.665c.001-.577.147-1.272.796-1.607.49-.252 1.158-.266 1.733-.136-.084-.398-.168-.742-.55-1.137-.43-.439-1.046-.637-1.926-.637-1.12 0-1.688.418-2.071 1.084-.358.618-.49 1.454-.577 2.02v.03c0 .29-.032.53-.032.705 0 .18.05.776.191 1.196h1.657v.075c0 .552-.453 1.028-1.403 1.028-1.103 0-1.599-.74-1.599-1.725 0-.93.092-1.303.287-1.786h-1.658v.058c0 .374.104.934.468 1.338.437.48 1.201.815 2.438.815 1.16 0 2.438-.27 3.062-.909.6-.61.703-1.38.703-2.318V4.273c0-.682-.277-1.035-.513-1.249a1.646 1.646 0 0 0-.907-.313c-.47-.03-.937.048-1.236.273-.299.225-.486.504-.583.939h-1.658v-.125c0-.56-.219-1.122-.81-1.463-.592-.34-1.284-.338-1.845-.206a2.85 2.85 0 0 0-1.27.777c-.348.354-.596.768-.664 1.303h-1.574v.076c0 .46.115.929.468 1.338.448.48 1.209.815 2.446.815 1.244 0 2.52-.27 3.155-.9z"/>
          </svg>
          <p>No products found matching your criteria.</p>
          <button onClick={() => {setSearchTerm(''); setFilter('all');}}>Reset Filters</button>
        </div>
      )}
      
      <div className="sell-cta">
        <div className="cta-content">
          <h3>Want to Sell Your Products?</h3>
          <p>Join our marketplace and reach thousands of potential customers today!</p>
          <ul className="benefits-list">
            <li>✓ No listing fees</li>
            <li>✓ Reach engaged audience</li>
            <li>✓ Accept NJ.C Points</li>
          </ul>
          <button className="sell-button">Start Selling</button>
        </div>
        <div className="cta-image">
          <div className="image-placeholder"></div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace; 