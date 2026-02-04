'use client';

import React from 'react';
import '@/styles/effects/glitch.css';

interface ChromaticAberrationProps {
  children: React.ReactNode;
  intensity?: 'light' | 'medium' | 'heavy';
  animated?: boolean;
  className?: string;
}

export default function ChromaticAberration({
  children,
  intensity = 'medium',
  animated = true,
  className = '',
}: ChromaticAberrationProps) {
  const classNames = [
    animated && 'chromatic-aberration',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const intensityValue = intensity === 'light' ? 1 : intensity === 'heavy' ? 4 : 2;

  const style = animated
    ? {}
    : {
        textShadow: `${intensityValue}px 0 0 #FF00FF, -${intensityValue}px 0 0 #00FFFF`,
      };

  return (
    <div className={classNames} style={style}>
      {children}
    </div>
  );
}
