'use client';

import React from 'react';
import '@/styles/effects/crt.css';

interface CRTScreenProps {
  children: React.ReactNode;
  flicker?: boolean;
  turnOn?: boolean;
  className?: string;
}

export default function CRTScreen({
  children,
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
