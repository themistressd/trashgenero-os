'use client';

import React, { useEffect, useState } from 'react';
import '@/styles/effects/glitch.css';

interface GlitchEffectProps {
  children: React.ReactNode;
  active?: boolean;
  intensity?: 'light' | 'medium' | 'heavy';
  trigger?: 'always' | 'hover' | 'random';
  className?: string;
}

export default function GlitchEffect({
  children,
  active = true,
  intensity = 'medium',
  trigger = 'always',
  className = '',
}: GlitchEffectProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    if (trigger === 'random' && active) {
      const interval = setInterval(
        () => {
          setIsGlitching(true);
          setTimeout(() => setIsGlitching(false), 300);
        },
        Math.random() * 5000 + 2000
      ); // Random between 2-7 seconds

      return () => clearInterval(interval);
    }
  }, [trigger, active]);

  const classNames = [
    trigger === 'always' && active && 'glitch',
    trigger === 'hover' && 'glitch-hover',
    trigger === 'random' && isGlitching && 'glitch-random',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={classNames}>{children}</div>;
}
