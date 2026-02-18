'use client';

import { useEffect } from 'react';

type ErrorPayload = {
  type: 'error' | 'unhandledrejection';
  message: string;
  stack?: string;
  source?: string;
  line?: number;
  column?: number;
  path?: string;
  timestamp: number;
};

const shouldReportErrors = process.env.NEXT_PUBLIC_ENABLE_ERROR_REPORTING === 'true';
const errorEndpoint = process.env.NEXT_PUBLIC_ERROR_REPORTING_ENDPOINT;

const sendError = (payload: ErrorPayload) => {
  if (!shouldReportErrors) {
    return;
  }

  if (errorEndpoint && typeof navigator !== 'undefined' && navigator.sendBeacon) {
    navigator.sendBeacon(errorEndpoint, JSON.stringify(payload));
    return;
  }

  if (process.env.NODE_ENV !== 'production') {
    console.error('[client-error]', payload);
  }
};

export default function ErrorReporter() {
  useEffect(() => {
    if (!shouldReportErrors) {
      return;
    }

    const onError = (event: ErrorEvent) => {
      sendError({
        type: 'error',
        message: event.message || 'Unknown client error',
        stack: event.error?.stack,
        source: event.filename,
        line: event.lineno,
        column: event.colno,
        path: window.location.pathname,
        timestamp: Date.now(),
      });
    };

    const onUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      const message =
        typeof reason === 'string'
          ? reason
          : reason instanceof Error
            ? reason.message
            : 'Unhandled promise rejection';

      sendError({
        type: 'unhandledrejection',
        message,
        stack: reason instanceof Error ? reason.stack : undefined,
        path: window.location.pathname,
        timestamp: Date.now(),
      });
    };

    window.addEventListener('error', onError);
    window.addEventListener('unhandledrejection', onUnhandledRejection);

    return () => {
      window.removeEventListener('error', onError);
      window.removeEventListener('unhandledrejection', onUnhandledRejection);
    };
  }, []);

  return null;
}
