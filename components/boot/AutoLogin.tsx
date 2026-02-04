'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface AutoLoginProps {
  onComplete?: () => void;
  autoAdvance?: boolean;
  duration?: number;
}

export default function AutoLogin({
  onComplete,
  autoAdvance = true,
  duration = 1500,
}: AutoLoginProps) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<'authenticating' | 'granted' | 'loading'>('authenticating');

  useEffect(() => {
    if (!autoAdvance) return;

    // Authenticating stage
    const authTimer = setTimeout(() => {
      setStage('granted');
    }, 500);

    // Progress bar
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 4;
      });
    }, duration / 25);

    // Complete
    const completeTimer = setTimeout(() => {
      onComplete?.();
    }, duration);

    return () => {
      clearTimeout(authTimer);
      clearTimeout(completeTimer);
      clearInterval(interval);
    };
  }, [autoAdvance, duration, onComplete]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-void-black p-8">
      <div className="w-full max-w-md space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="mb-4 flex justify-center">
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="text-6xl"
            >
              ⚡
            </motion.div>
          </div>
          
          <h2 className="mb-2 font-vcr text-3xl text-bubblegum-pink">
            TrashGènero OS
          </h2>
          
          {stage === 'authenticating' && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-vt323 text-lg text-system-gray"
            >
              Autenticando usuario...
            </motion.p>
          )}
          
          {stage === 'granted' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-2"
            >
              <p className="font-vcr text-2xl text-hacker-green">
                ✓ ACCESO CONCEDIDO
              </p>
              <p className="font-vt323 text-sm text-system-gray">
                Autorizado por Mistress D
              </p>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-2"
        >
          <div className="h-2 w-full overflow-hidden border border-system-gray bg-void-black">
            <motion.div
              className="h-full bg-hacker-green"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          
          <div className="text-center font-vt323 text-sm text-system-gray">
            Cargando sistema... {progress}%
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center font-vt323 text-xs text-system-gray/50"
        >
          Welcome to the cult ✨
        </motion.div>
      </div>
    </div>
  );
}
