import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children, hideFooter = false }) => {
  return (
    <>
      <Navbar />
      <main className="main-content">
        {children}
      </main>
      {!hideFooter && <Footer />}
    </>
  );
};

export default Layout; 