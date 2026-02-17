const isProduction = process.env.NODE_ENV === 'production';

export const shouldAllowApiMockFallback =
  process.env.NEXT_PUBLIC_ALLOW_API_MOCKS === 'true' || !isProduction;

export const resolveFallback = <T>(fallbackValue: T, serviceName: string): T => {
  if (shouldAllowApiMockFallback) {
    return fallbackValue;
  }

  throw new Error(
    `${serviceName} API unavailable and mock fallback is disabled in production.`
  );
};
