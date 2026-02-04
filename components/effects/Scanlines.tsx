'use client';

import React from 'react';
import '@/styles/effects/scanlines.css';

interface ScanlinesProps {
  animated?: boolean;
  heavy?: boolean;
  className?: string;
}

export default function Scanlines({
  animated = false,
  heavy = false,
  className = '',
}: ScanlinesProps) {
  const classNames = [
    'scanlines',
    animated && 'scanlines-animated',
    heavy && 'scanlines-heavy',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={classNames} />;
}
