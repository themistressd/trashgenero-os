'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
  color?: 'magenta' | 'green' | 'purple';
}

const colorClasses = {
  magenta: 'from-bubblegum-pink to-purple-600',
  green: 'from-hacker-green to-green-600',
  purple: 'from-purple-600 to-bubblegum-pink',
};

export default function ProgressBar({
  current,
  total,
  label,
  color = 'magenta',
}: ProgressBarProps) {
  const percentage = Math.min(Math.round((current / total) * 100), 100);

  return (
    <div className="w-full">
      {label && (
        <div className="mb-2 flex justify-between font-vt323 text-sm">
          <span>{label}</span>
          <span className="text-gray-600">
            {current} / {total} pts
          </span>
        </div>
      )}
      
      <div className="win95-input h-6 overflow-hidden bg-white p-0">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`h-full bg-gradient-to-r ${colorClasses[color]} relative`}
        >
          {/* Animated shine effect */}
          <motion.div
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
        </motion.div>
        
        {/* Percentage text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-vt323 text-sm font-bold text-black drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
            {percentage}%
          </span>
        </div>
      </div>
    </div>
  );
}
