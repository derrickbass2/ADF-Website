// src/components/ErrorBoundary/SentryErrorBoundary.tsx
import React, { ErrorInfo } from 'react';
import * as Sentry from "@sentry/react";
import { motion } from 'framer-motion';
import styles from './ErrorBoundary.module.scss';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class SentryErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to Sentry
    Sentry.captureException(error, { 
      extra: {
        errorInfo,
        componentStack: errorInfo.componentStack
      }
    });

    // Optional: Log to custom error tracking
    this.logErrorToService(error, errorInfo);
  }

  logErrorToService = (error: Error, errorInfo: ErrorInfo) => {
    // Implement additional custom error logging
    console.error('Caught an error:', error, errorInfo);
  }

  handleErrorReset = () => {
    // Attempt to recover from the error
    this.setState({ hasError: false });
    
    // Optional: Log error recovery attempt
    Sentry.captureMessage('Error boundary reset attempted', 'info');
  }

  render() {
    if (this.state.hasError) {
      return (
        <motion.div 
          className={styles.errorContainer}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1>Oops! Something Went Wrong</h1>
          <p>Our AI is working to resolve the issue</p>
          <div className={styles.errorActions}>
            <button 
              onClick={this.handleErrorReset}
              className={styles.resetButton}
            >
              Try Again
            </button>
            <button 
              onClick={() => window.location.reload()}
              className={styles.reloadButton}
            >
              Reload Page
            </button>
          </div>
          <div className={styles.errorDetails}>
            <details>
              <summary>Error Details</summary>
              <pre>{this.state.error?.toString()}</pre>
            </details>
          </div>
        </motion.div>
      );
    }

    return this.props.children;
  }
}

// Wrap with Sentry's error boundary for additional tracking
export default Sentry.withErrorBoundary(SentryErrorBoundary, {
  fallback: ({ error }) => (
    <div>An error occurred: {error?.message}</div>
  ),
});