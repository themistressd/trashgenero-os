'use client';

import React, { useEffect, useState } from 'react';

interface StaticNoiseProps {
  opacity?: number;
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
}

export default function StaticNoise({
  opacity = 0.05,
  intensity = 'medium',
  className = '',
}: StaticNoiseProps) {
  const [noiseData, setNoiseData] = useState<string>('');

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    const size = intensity === 'low' ? 64 : intensity === 'medium' ? 128 : 256;
    canvas.width = size;
    canvas.height = size;

    const imageData = ctx.createImageData(size, size);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const value = Math.random() * 255;
      data[i] = value; // R
      data[i + 1] = value; // G
      data[i + 2] = value; // B
      data[i + 3] = 255; // A
    }

    ctx.putImageData(imageData, 0, 0);
    setNoiseData(canvas.toDataURL());

    // Update noise periodically
    const interval = setInterval(() => {
      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
      }
      ctx.putImageData(imageData, 0, 0);
      setNoiseData(canvas.toDataURL());
    }, 100);

    return () => clearInterval(interval);
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
