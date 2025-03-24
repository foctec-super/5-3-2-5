import React, { useState, useEffect } from 'react';

const ThreeJsLoading = ({ error }) => {
  const [loadingFailed, setLoadingFailed] = useState(false);
  const [loadingTime, setLoadingTime] = useState(0);
  
  useEffect(() => {
    // If loading takes too long (over 10 seconds), show retry option
    const timer = setTimeout(() => {
      setLoadingFailed(true);
    }, 10000);
    
    // Counter for loading time
    const interval = setInterval(() => {
      setLoadingTime(prev => prev + 1);
    }, 1000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);
  
  // If there is an error passed, show error state immediately
  useEffect(() => {
    if (error) {
      setLoadingFailed(true);
    }
  }, [error]);
  
  const handleRetry = () => {
    window.location.reload();
  };
  
  return (
    <div style={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(45deg, #060820, #111827)',
      color: 'white'
    }}>
      <div style={{
        textAlign: 'center',
        padding: '2rem'
      }}>
        {!loadingFailed ? (
          <>
            <div className="loading-spinner" style={{
              width: '50px',
              height: '50px',
              border: '4px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              borderTop: '4px solid #8E2DE2',
              margin: '0 auto 20px',
              animation: 'spin 1s linear infinite'
            }}></div>
            <h2 style={{
              fontSize: '1.5rem',
              marginBottom: '10px',
              background: 'linear-gradient(45deg, #fff, #8E2DE2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Loading 3D Experience
            </h2>
            <p>Please wait while we prepare something amazing... ({loadingTime}s)</p>
          </>
        ) : (
          <>
            <div style={{
              fontSize: '3rem',
              marginBottom: '1rem',
              color: '#8E2DE2'
            }}>⚠️</div>
            <h2 style={{
              fontSize: '1.5rem',
              marginBottom: '15px',
              background: 'linear-gradient(45deg, #fff, #8E2DE2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              {error ? 'Loading Error' : 'Loading is taking longer than expected'}
            </h2>
            <p style={{ marginBottom: '20px', maxWidth: '600px' }}>
              {error 
                ? 'We encountered an issue loading the 3D experience. This could be due to your browser or device limitations.'
                : 'The 3D experience is taking longer than expected to load. This might be due to your internet connection or device capabilities.'}
            </p>
            <button 
              onClick={handleRetry}
              style={{
                padding: '10px 20px',
                background: 'linear-gradient(45deg, #4A00E0, #8E2DE2)',
                color: 'white',
                border: 'none',
                borderRadius: '30px',
                cursor: 'pointer',
                fontWeight: 'bold',
                boxShadow: '0 5px 15px rgba(74, 0, 224, 0.3)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
            >
              Try Again
            </button>
          </>
        )}
        
        <style jsx="true">{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default ThreeJsLoading; 