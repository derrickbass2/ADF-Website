// src/sentry.ts
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import * as SentryReplay from "@sentry/replay";

export const initSentry = () => {
  Sentry.init({
    dsn: process.env.SENTRY_DSN, // Store in .env file
    integrations: [
      new BrowserTracing({
        // Add performance monitoring
        tracePropagationTargets: [
          "localhost",
          /^https:\/\/yourdomain\.com/,
        ],
      new SentryReplay.Replay({
      new Sentry.Replay({
        // Capture screen recordings
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
    // Performance
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 0.5,

    // Custom error filtering
    beforeSend(event, hint) {
      // Filter out known, non-critical errors
      const error = hint.originalException;
      
      // Example: Ignore specific error types or messages
      if (
        error instanceof TypeError && 
        error.message.includes('Network request failed')
      ) {
        return null;
      }

      return event;
    },

    // Add custom tags and user context
    initialScope: (scope) => {
      scope.setTag('environment', process.env.NODE_ENV);
      scope.setTag('app_version', process.env.npm_package_version);
      
      return scope;
    }
  });
};