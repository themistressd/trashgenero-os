'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface BIOSScreenProps {
  onComplete?: () => void;
  autoAdvance?: boolean;
  duration?: number;
}

export default function BIOSScreen({
  onComplete,
  autoAdvance = true,
  duration = 2000,
}: BIOSScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!autoAdvance) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete?.(), 300);
          return 100;
        }
        return prev + 2;
      });
    }, duration / 50);

    return () => clearInterval(interval);
  }, [autoAdvance, duration, onComplete]);

  return (
    <div className="flex min-h-screen flex-col bg-void-black p-8 font-mono text-hacker-green">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-2"
      >
        <div className="text-sm">TrashGènero OS v0.1.0</div>
        <div className="text-sm">Copyright (C) 2024 Mistress D</div>
        <div className="mt-4 text-sm">BIOS Date: 02/04/26 13:21:54 Ver: TRASH.BIOS.01</div>
        <div className="text-sm">CPU: Intel Pentium II 400MHz (or equivalent trash)</div>
        <div className="text-sm">Memory Test: 666MB OK</div>
        
        <div className="mt-6 space-y-1">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm"
          >
            Detecting Primary Master ... TrashDisk-0 (13.37GB)
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-sm"
          >
            Detecting Primary Slave ... None
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-sm"
          >
            Detecting Secondary Master ... CDROM-TRASH
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-6 space-y-2"
        >
          <div className="text-sm">POST Memory Test: OK</div>
          <div className="text-sm">Initializing Trash Protocol...</div>
          
          <div className="mt-4 flex items-center gap-2">
            <div className="text-sm">Loading System:</div>
            <div className="flex-1">
              <div className="h-4 w-full border border-hacker-green">
                <motion.div
                  className="h-full bg-hacker-green"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>
            <div className="text-sm">{progress}%</div>
          </div>
        </motion.div>

        {progress === 100 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 animate-flicker text-sm"
          >
            Press any key to continue...
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
