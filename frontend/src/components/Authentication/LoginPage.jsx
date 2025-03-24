import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';
import {
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaApple
} from 'react-icons/fa';

import './AuthStyles.css';

/* 
  Smaller sphere model, placed top-left, 
  with slower rotation and smaller scale 
*/
const AnimatedBackground = () => {
  return (
    <Canvas className="auth-canvas">
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Sphere args={[1, 100, 200]} scale={1.2} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#4a00e0"
          attach="material"
          distort={0.6}
          speed={1.5}
          roughness={0}
          metalness={0.8}
        />
      </Sphere>
      <OrbitControls enableZoom={false} autoRotate rotateSpeed={0.4} />
    </Canvas>
  );
};

const LoginForm = () => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  /* Slide in effect for the form container on mount */
  useEffect(() => {
    // Optionally trigger any custom animations or side effects here
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formState.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formState.password) {
      newErrors.password = 'Password is required';
    } else if (formState.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);

      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        // Navigate to dashboard or show success
        // e.g. navigate('/dashboard')
      }, 1500);
    }
  };

  return (
    <motion.div
      className="auth-form-container"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <motion.div
        className="auth-form-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <h1 className="gradient-text">Welcome Back</h1>
        <p className="subtitle">Sign in to continue your journey</p>
      </motion.div>

      <form className="auth-form" onSubmit={handleSubmit}>
        {/* Email Input */}
        <motion.div
          className="input-group"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <div className="input-wrapper">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formState.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
            />
          </div>
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </motion.div>

        {/* Password Input */}
        <motion.div
          className="input-group"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          <div className="input-wrapper">
            <FaLock className="input-icon" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formState.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
            />
          </div>
          {errors.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </motion.div>

        {/* Remember Me + Forgot Password */}
        <motion.div
          className="form-actions"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
        >
          <label className="remember-me">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formState.rememberMe}
              onChange={handleChange}
            />
            <span>Remember me</span>
          </label>
          <Link to="/forgot-password" className="forgot-link">
            Forgot Password?
          </Link>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className={`login-button ${isLoading ? 'loading' : ''}`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isLoading}
          transition={{ duration: 0.2 }}
        >
          {isLoading ? (
            <div className="spinner"></div>
          ) : (
            'Sign In'
          )}
        </motion.button>

        {/* Divider */}
        <div className="divider">
          <span>or continue with</span>
        </div>

        {/* Social Auth Buttons */}
        <motion.div
          className="social-login"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
        >
          <motion.button
            className="social-button google"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaGoogle />
            <span>Google</span>
          </motion.button>

          <motion.button
            className="social-button apple"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaApple />
            <span>Apple</span>
          </motion.button>
        </motion.div>

        {/* Sign Up Prompt */}
        <p className="signup-prompt">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </form>
    </motion.div>
  );
};

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-page">
      {/* Left side: small 3D model at top, text below */}
      <div className="auth-left">
        <div className="model-container">
          <AnimatedBackground />
        </div>
        <div className="details-text">
          <h2 className="details-title">Join the Revolution</h2>
          <p className="details-paragraph">
            Connect with a thriving community in Nairobi and earn rewards 
            through referrals. Unlock the Black Market with NJ Points 
            and level up your digital presence.
          </p>
          <div className="auth-features">
            <div className="auth-feature">
              <div className="feature-icon">💰</div>
              <div className="feature-text">Earn with Referrals</div>
            </div>
            <div className="auth-feature">
              <div className="feature-icon">🌟</div>
              <div className="feature-text">NJ Points System</div>
            </div>
            <div className="auth-feature">
              <div className="feature-icon">🛒</div>
              <div className="feature-text">Black Market Access</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: the login form */}
      <div className="auth-right">
        <LoginForm />
        <p className="signup-prompt">
           {' '}
          <Link 
            to="/register" 
            className="signup-link"
            onClick={(e) => {
              e.preventDefault();
              navigate('/register');
            }}
          >
            
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
