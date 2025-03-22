// src/utils/performanceTracking.ts
import * as Sentry from "@sentry/react";

export const performanceTracking = {
  startTransaction: (name: string) => {
    return Sentry.startTransaction({ name });
  },

  trackPerformance: <T>(
    name: string, 
    operation: () => Promise<T>
  ): Promise<T> => {
    const transaction = Sentry.startTransaction({ name });
    
    return Sentry.configureScope(async (scope) => {
      scope.setSpan(transaction);
      
      try {
        const result = await operation();
        transaction.setStatus('ok');
        return result;
      } catch (error) {
        transaction.setStatus('internal_error');
        Sentry.captureException(error);
        throw error;
      } finally {
        transaction.finish();
      }
    });
  },

  // Track specific component render times
  measureRenderTime: (componentName: string) => {
    const startTime = performance.now();
    
    return {
      end: () => {
        const endTime = performance.now();
        const renderTime = endTime - startTime;
        
        Sentry.metrics.timing(`component.render.${componentName}`, renderTime);
      }
    };
  }
};