'use client';

import React from 'react';
import '@/styles/effects/crt.css';

interface CRTScreenProps {
  children: React.ReactNode;
  intensity?: 'light' | 'medium' | 'heavy';
  flicker?: boolean;
  turnOn?: boolean;
  className?: string;
}

export default function CRTScreen({
  children,
  intensity = 'medium',
  flicker = false,
  turnOn = false,
  className = '',
}: CRTScreenProps) {
  const classNames = [
    'crt-screen',
    flicker && 'crt-flicker',
    turnOn && 'crt-turn-on',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={classNames}>{children}</div>;
}
