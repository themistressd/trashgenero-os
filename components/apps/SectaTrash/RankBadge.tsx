'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface RankBadgeProps {
  rank: string;
  unlocked: boolean;
  size?: 'sm' | 'md' | 'lg';
  isCurrentRank?: boolean;
}

const sizeClasses = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
  lg: 'px-4 py-2 text-base',
};

export default function RankBadge({
  rank,
  unlocked,
  size = 'md',
  isCurrentRank = false,
}: RankBadgeProps) {
  const baseClasses = `${sizeClasses[size]} font-vt323 inline-flex items-center gap-2 border-2`;

  if (!unlocked) {
    return (
      <div
        className={`${baseClasses} border-gray-400 bg-gray-300 text-gray-600`}
        title="Bloqueado"
      >
        <span>🔒</span>
        <span>{rank}</span>
      </div>
    );
  }

  if (isCurrentRank) {
    return (
      <motion.div
        animate={{
          boxShadow: [
            '0 0 0px rgba(255, 0, 255, 0)',
            '0 0 20px rgba(255, 0, 255, 0.6)',
            '0 0 0px rgba(255, 0, 255, 0)',
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`${baseClasses} border-bubblegum-pink bg-gradient-to-r from-purple-600 to-bubblegum-pink text-white`}
      >
        <span>⭐</span>
        <span className="font-bold">{rank}</span>
      </motion.div>
    );
  }

  return (
    <div
      className={`${baseClasses} border-hacker-green bg-gradient-to-r from-green-600 to-hacker-green text-white`}
    >
      <span>✅</span>
      <span>{rank}</span>
    </div>
  );
}
