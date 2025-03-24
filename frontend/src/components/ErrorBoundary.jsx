import React, { Component } from 'react';
import './ErrorBoundary.css';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="error-boundary">
          <div className="error-icon">⚠️</div>
          <h2>Something went wrong</h2>
          <p>We're sorry for the inconvenience. The application encountered an error.</p>
          {this.props.fallback || null}
          <button
            className="refresh-button"
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </button>
          
          {/* Show error details in development mode */}
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <div className="error-details">
              <h3>Error Details (visible in development only):</h3>
              <p>{this.state.error.toString()}</p>
              <pre>{this.state.errorInfo && this.state.errorInfo.componentStack}</pre>
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 