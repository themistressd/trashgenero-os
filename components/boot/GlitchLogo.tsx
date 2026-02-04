'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import GlitchEffect from '@/components/effects/GlitchEffect';
import ChromaticAberration from '@/components/effects/ChromaticAberration';
import { playSound } from '@/lib/constants/sounds';

interface GlitchLogoProps {
  onComplete?: () => void;
  autoAdvance?: boolean;
  duration?: number;
}

export default function GlitchLogo({
  onComplete,
  autoAdvance = true,
  duration = 1500,
}: GlitchLogoProps) {
  useEffect(() => {
    // Play glitch sound
    playSound('glitch');

    if (autoAdvance && onComplete) {
      const timer = setTimeout(() => {
        onComplete();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoAdvance, duration, onComplete]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-void-black">
      <GlitchEffect active>
        <ChromaticAberration intensity="heavy">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0, 1, 0, 1],
              scale: [0.8, 1.1, 0.9, 1],
            }}
            transition={{
              duration: 1.5,
              times: [0, 0.3, 0.6, 1],
            }}
            className="text-center"
          >
            <h1 className="mb-4 font-vcr text-6xl font-bold text-bubblegum-pink md:text-8xl">
              TrashGènero OS
            </h1>
            <p className="font-vt323 text-xl text-hacker-green md:text-2xl">
              Digital Witchcraft meets Windows 95
            </p>
          </motion.div>
        </ChromaticAberration>
      </GlitchEffect>

      <motion.div
        className="absolute inset-0 bg-bubblegum-pink"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.2, 0, 0.3, 0] }}
        transition={{ duration: 1.5, times: [0, 0.2, 0.4, 0.6, 1] }}
        style={{ mixBlendMode: 'overlay' }}
      />
    </div>
  );
}
