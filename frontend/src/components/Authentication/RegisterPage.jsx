import React, { useState, useRef, useEffect, Suspense, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaGoogle,
  FaApple,
  FaCalendar,
  FaVenusMars,
  FaGlobe
} from 'react-icons/fa';
import logo from '../../assets/logo.png';
import './AuthStyles.css';

/* 
  ================================
    1) 3D BACKGROUND ANIMATION
  ================================
*/
const AnimatedBackground = () => {
  return (
    <Canvas className="auth-canvas">
      <color attach="background" args={['#06081A']} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />

      <Suspense fallback={null}>
        <Particles count={100} />
        <FloatingShapes />
        <GridFloor />
        <Environment preset="night" />
      </Suspense>
    </Canvas>
  );
};

const Particles = ({ count = 100 }) => {
  const mesh = useRef();

  // Create initial particle positions
  const [positions, sizes, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Random position
      positions[i3 + 0] = (Math.random() - 0.5) * 30;
      positions[i3 + 1] = (Math.random() - 0.5) * 30;
      positions[i3 + 2] = (Math.random() - 0.5) * 30;

      // Purple-ish colors
      colors[i3 + 0] = 0.5 + Math.random() * 0.3; // R
      colors[i3 + 1] = 0.2 + Math.random() * 0.3; // G
      colors[i3 + 2] = 0.8 + Math.random() * 0.2; // B

      // Size
      sizes[i] = Math.random() * 0.5 + 0.1;
    }

    return [positions, sizes, colors];
  }, [count]);

  useFrame(({ clock }) => {
    if (mesh.current) {
      const time = clock.getElapsedTime();
      mesh.current.rotation.x = time * 0.05;
      mesh.current.rotation.y = time * 0.08;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attachObject={['attributes', 'position']}
          array={positions}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attachObject={['attributes', 'color']}
          array={colors}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attachObject={['attributes', 'size']}
          array={sizes}
          count={count}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.5}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
};

const FloatingShapes = () => {
  const shapeCount = 8;

  const shapes = useMemo(() => {
    return new Array(shapeCount).fill().map(() => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10 - 5
      ],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ],
      scale: Math.random() * 0.5 + 0.5,
      speed: Math.random() * 0.5 + 0.5,
      type: Math.floor(Math.random() * 4),
      color: new THREE.Color().setHSL(
        Math.random() * 0.1 + 0.7, // Purple hue range
        0.8,
        0.5
      )
    }));
  }, [shapeCount]);

  return (
    <group>
      {shapes.map((shape, i) => (
        <FloatingShape key={i} {...shape} />
      ))}
    </group>
  );
};

const FloatingShape = ({ position, rotation, scale, speed, type, color }) => {
  const mesh = useRef();
  const initialPos = useMemo(() => position, [position]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (mesh.current) {
      // Sway around
      mesh.current.position.x = initialPos[0] + Math.sin(t * speed) * 2;
      mesh.current.position.y = initialPos[1] + Math.cos(t * speed * 1.5) * 2;
      mesh.current.position.z = initialPos[2] + Math.sin(t * speed * 0.5) * 2;

      // Gentle rotation
      mesh.current.rotation.x = rotation[0] + t * speed * 0.2;
      mesh.current.rotation.y = rotation[1] + t * speed * 0.3;
      mesh.current.rotation.z = rotation[2] + t * speed * 0.1;
    }
  });

  let geometry = <boxGeometry args={[1, 1, 1]} />;
  if (type === 1) geometry = <sphereGeometry args={[0.8, 16, 16]} />;
  if (type === 2) geometry = <torusGeometry args={[0.6, 0.2, 16, 32]} />;
  if (type === 3) geometry = <octahedronGeometry args={[0.8]} />;

  return (
    <mesh ref={mesh} scale={scale}>
      {geometry}
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.2}
        roughness={0.3}
        metalness={0.8}
      />
    </mesh>
  );
};

const GridFloor = () => {
  const size = 30;
  const divisions = 30;
  return (
    <gridHelper
      args={[size, divisions, '#4A00E0', '#8E2DE2']}
      position={[0, -10, 0]}
      rotation={[Math.PI / 2, 0, 0]}
    />
  );
};

/* 
  ================================
    2)  MAIN REGISTER COMPONENT
  ================================
*/

// Updated country list
const countryOptions = [
  { name: 'Select Country', code: '' },
  { name: 'Kenya', code: '+254' },
  { name: 'United States', code: '+1' },
  { name: 'United Kingdom', code: '+44' },
  { name: 'Nigeria', code: '+234' },
  { name: 'Ghana', code: '+233' },
  { name: 'Cameroon', code: '+237' },
  { name: 'South Africa', code: '+27' },
  { name: 'Canada', code: '+1' },
  { name: 'India', code: '+91' }
];

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    phone: '',
    password: '',
    age: '',
    gender: ''
  });

  // Handle changes for all fields except for country
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Special handler for country selection
  const handleCountryChange = (e) => {
    const selectedCountryCode = e.target.value;
    setFormData((prev) => {
      let newPhone = prev.phone;

      // If phone is empty or if it had the old country code, replace it
      if (!prev.phone || prev.phone.startsWith(prev.country)) {
        newPhone = selectedCountryCode;
      } else {
        // Otherwise, prefix the new code with a space
        newPhone = selectedCountryCode + ' ' + prev.phone;
      }

      return {
        ...prev,
        country: selectedCountryCode,
        phone: newPhone
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form, do something (like an API call)
    console.log('Registration form data:', formData);
  };

  return (
    <div className="auth-page register-page">
      {/* Left side with 3D BG + some text */}
      <div className="auth-left">
        <div className="model-container">
          <AnimatedBackground />
        </div>

        {/* OPTIONAL: Logo in top-left corner */}
        <motion.div
          className="logo-container"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img src={logo} alt="Logo" className="brand-logo" />
        </motion.div>

        {/* Welcome / Marketing Content */}
        <motion.div
          className="welcome-section"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Join Our Community</h1>
          <p className="welcome-text">
            Begin your journey with NJ.C Bandwidth and discover endless
            possibilities in digital marketing and community networking.
          </p>
          <div className="features-grid">
            <div className="feature-item">
              <span className="feature-icon">💰</span>
              <p>Earn Through Referrals</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🚀</span>
              <p>Access Premium Features</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🤝</span>
              <p>Join Expert Network</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📈</span>
              <p>Grow Your Business</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right side: The registration form */}
      <div className="auth-right">
        <motion.div
          className="register-form-container"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Create Account</h2>

          <form className="register-form" onSubmit={handleSubmit}>
            {/* Name Row */}
            <div className="name-row">
              <div className="form-group">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Email */}
            <div className="form-group">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Country: new field */}
            <div className="form-group country-group">
              <FaGlobe className="input-icon" />
              <select
                name="country"
                className="select-input"
                value={formData.country}
                onChange={handleCountryChange}
              >
                {countryOptions.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Phone */}
            <div className="form-group">
              <FaPhone className="input-icon" />
              <input
                type="tel"
                placeholder="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <FaLock className="input-icon" />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {/* Age & Gender */}
            <div className="form-row">
              <div className="form-group">
                <FaCalendar className="input-icon" />
                <input
                  type="number"
                  placeholder="Age"
                  name="age"
                  min="18"
                  max="100"
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <FaVenusMars className="input-icon" />
                <select
                  name="gender"
                  className="select-input"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <button type="submit" className="register-btn">
              Create Account
            </button>

            <div className="social-divider">
              <span>Or continue with</span>
            </div>

            <div className="social-buttons">
              <button type="button" className="social-btn google">
                <FaGoogle /> Google
              </button>
              <button type="button" className="social-btn apple">
                <FaApple /> Apple
              </button>
            </div>

            <p className="login-link">
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
