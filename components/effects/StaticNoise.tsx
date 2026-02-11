'use client';

import React, { useMemo } from 'react';

interface StaticNoiseProps {
  opacity?: number;
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
}

const NOISE_BY_INTENSITY: Record<NonNullable<StaticNoiseProps['intensity']>, string> = {
  low: `<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'><rect width='48' height='48' fill='black'/><g fill='white' opacity='0.18'><rect x='2' y='2' width='1' height='1'/><rect x='10' y='7' width='1' height='1'/><rect x='23' y='14' width='1' height='1'/><rect x='36' y='11' width='1' height='1'/><rect x='8' y='24' width='1' height='1'/><rect x='31' y='21' width='1' height='1'/><rect x='20' y='33' width='1' height='1'/><rect x='42' y='37' width='1' height='1'/></g></svg>`,
  medium: `<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'><rect width='64' height='64' fill='black'/><g fill='white' opacity='0.22'><rect x='2' y='4' width='1' height='1'/><rect x='7' y='12' width='1' height='1'/><rect x='18' y='9' width='1' height='1'/><rect x='24' y='21' width='1' height='1'/><rect x='34' y='8' width='1' height='1'/><rect x='44' y='18' width='1' height='1'/><rect x='57' y='13' width='1' height='1'/><rect x='11' y='33' width='1' height='1'/><rect x='22' y='38' width='1' height='1'/><rect x='31' y='29' width='1' height='1'/><rect x='47' y='37' width='1' height='1'/><rect x='55' y='45' width='1' height='1'/><rect x='5' y='52' width='1' height='1'/><rect x='16' y='58' width='1' height='1'/><rect x='39' y='55' width='1' height='1'/></g></svg>`,
  high: `<svg xmlns='http://www.w3.org/2000/svg' width='72' height='72' viewBox='0 0 72 72'><rect width='72' height='72' fill='black'/><g fill='white' opacity='0.28'><rect x='2' y='2' width='1' height='1'/><rect x='6' y='8' width='1' height='1'/><rect x='13' y='5' width='1' height='1'/><rect x='20' y='11' width='1' height='1'/><rect x='28' y='7' width='1' height='1'/><rect x='34' y='14' width='1' height='1'/><rect x='43' y='9' width='1' height='1'/><rect x='51' y='13' width='1' height='1'/><rect x='60' y='10' width='1' height='1'/><rect x='66' y='16' width='1' height='1'/><rect x='8' y='26' width='1' height='1'/><rect x='17' y='23' width='1' height='1'/><rect x='26' y='30' width='1' height='1'/><rect x='37' y='24' width='1' height='1'/><rect x='45' y='32' width='1' height='1'/><rect x='56' y='27' width='1' height='1'/><rect x='65' y='35' width='1' height='1'/><rect x='4' y='43' width='1' height='1'/><rect x='15' y='49' width='1' height='1'/><rect x='24' y='45' width='1' height='1'/><rect x='33' y='53' width='1' height='1'/><rect x='42' y='47' width='1' height='1'/><rect x='53' y='55' width='1' height='1'/><rect x='62' y='50' width='1' height='1'/><rect x='9' y='64' width='1' height='1'/><rect x='29' y='67' width='1' height='1'/><rect x='49' y='64' width='1' height='1'/></g></svg>`,
};

export default function StaticNoise({
  opacity = 0.05,
  intensity = 'medium',
  className = '',
}: StaticNoiseProps) {
  const noiseData = useMemo(() => {
    const svg = NOISE_BY_INTENSITY[intensity];
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }, [intensity]);

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-50 ${className}`}
      style={{
        backgroundImage: `url(${noiseData})`,
        backgroundRepeat: 'repeat',
        opacity,
        mixBlendMode: 'overlay',
      }}
    />
  );
}
