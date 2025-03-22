// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as Sentry from "@sentry/react";
import { store } from './store';
import App from './App';
import './styles/global.scss';

// Initialize Sentry before rendering
Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    new Sentry.BrowserTracing({
      // Instrument rendering and navigation with React Router
      routingInstrumentation: Sentry.reactRouterV6Instrumentation(
        React.useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes
      ),
    }),
    new Sentry.Replay({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
  // Performance monitoring sample rate (adjust as needed)
  tracesSampleRate: import.meta.env.PROD ? 0.1 : 1.0,
  // Session replay sample rates
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 0.5,
  
  // Optional: Custom error filtering
  beforeSend(event) {
    // Modify or filter out events if needed
    if (import.meta.env.DEV) {
      console.log('Sentry event:', event);
    }
    return event;
  },
});

// Error boundary wrapper
const SentryErrorBoundary = Sentry.ErrorBoundary;

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <SentryErrorBoundary 
        fallback={({ error }) => (
          <div>
            <h1>Oops! An error occurred</h1>
            <p>{error.message}</p>
          </div>
        )}
      >
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </SentryErrorBoundary>
    </React.StrictMode>
  );
} else {
  Sentry.captureException(new Error('Root element not found'));
  console.error('Root element not found');
}

// Performance monitoring
if (import.meta.env.PROD) {
  // Track initial page load
  Sentry.addPerformanceMonitoringMark('app-init');
}