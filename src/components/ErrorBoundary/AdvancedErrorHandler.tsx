// src/components/ErrorBoundary/AdvancedErrorHandler.tsx
import React, { ErrorInfo } from 'react';
import * as Sentry from "@sentry/react";
import { motion } from 'framer-motion';
import styles from './AdvancedErrorHandler.module.scss';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class AdvancedErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to monitoring service
    Sentry.captureException(error, { extra: { componentStack: errorInfo.componentStack } });
    
    // Optional: Send error to custom logging service
    this.logErrorToService(error, errorInfo);
  }

  logErrorToService = (error: Error, errorInfo: ErrorInfo) => {
    // Implement custom error logging
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ? (
        this.props.fallback
      ) : (
        <motion.div 
          className={styles.errorContainer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h1>Something Went Wrong</h1>
          <p>Our AI is working to resolve the issue</p>
          <button onClick={() => window.location.reload()}>
            Reload Page
          </button>
        </motion.div>
      );
    }

    return this.props.children;
  }
}

export default AdvancedErrorBoundary;