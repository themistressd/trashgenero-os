'use client';

import { useReportWebVitals } from 'next/web-vitals';

const shouldReportVitals = process.env.NEXT_PUBLIC_ENABLE_WEB_VITALS === 'true';
const vitalsEndpoint = process.env.NEXT_PUBLIC_WEB_VITALS_ENDPOINT;

export default function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    if (!shouldReportVitals) {
      return;
    }

    const payload = {
      id: metric.id,
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      navigationType: metric.navigationType,
      timestamp: Date.now(),
      path: typeof window !== 'undefined' ? window.location.pathname : 'unknown',
    };

    if (vitalsEndpoint && typeof navigator !== 'undefined' && navigator.sendBeacon) {
      navigator.sendBeacon(vitalsEndpoint, JSON.stringify(payload));
      return;
    }

    if (process.env.NODE_ENV !== 'production') {
      console.info('[web-vitals]', payload);
    }
  });

  return null;
}
