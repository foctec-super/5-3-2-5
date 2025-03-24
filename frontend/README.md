# Marketing NJ.C Bandwidth Website

This is a modern, responsive website for Marketing NJ.C Bandwidth, featuring advanced 3D animations, scroll effects, and interactive features. The website focuses on community engagement in Nairobi, USA and includes features for earning rewards, trading, and a black market section.

## Features

- **Modern Responsive Design**: Fully responsive website that works on all devices
- **Advanced 3D Animations**: Interactive 3D models showcasing people trading and digital referrals
- **Scroll Animations**: Beautiful animations that reveal content as users scroll
- **Referral Rewards System**: Interactive system for users to earn rewards through referrals
- **Black Market Trading**: Platform for users to buy and sell products
- **Authentication System**: Beautifully designed login and registration pages

## Tech Stack

- React
- Vite
- React Router DOM
- Three.js
- React Three Fiber
- CSS with modern animations and transitions

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- NPM or Yarn

### Installation

1. Clone the repository
   ```
   git clone <repository-url>
   cd frontend
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Install 3D animation dependencies
   ```
   npm install three @react-three/fiber @react-three/drei
   ```

4. Install routing dependencies
   ```
   npm install react-router-dom
   ```

### Running the Development Server

```
npm run dev
```

The website will be available at `http://localhost:5173`

### Building for Production

```
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

- `src/components/`: Main components of the website
  - `Authentication/`: Authentication-related components
  - `HeroAnimation.jsx`: 3D animation component for hero section
  - `Marketplace.jsx`: Black market business component
  - `Navbar.jsx`: Navigation bar component
  - `ReferralRewards.jsx`: Referral system component
  - `ScrollAnimations.jsx`: Scroll effects component
- `src/styles/`: CSS files for styling
- `src/assets/`: Images and other static assets

## Design Details

### Color Scheme

- Primary: #4A00E0 (Deep Purple)
- Secondary: #8E2DE2 (Medium Purple)
- Accent: #FF9900 (Bright Orange)
- Dark: #111827 (Nearly Black)
- Light: #F9FAFC (Off White)

### Typography

- Headings: Poppins
- Body: Inter

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
