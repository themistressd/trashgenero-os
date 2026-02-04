'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BSODOverlayProps {
  visible: boolean;
  title?: string;
  message?: string;
  onDismiss?: () => void;
}

export default function BSODOverlay({
  visible,
  title = 'A problem has been detected',
  message = 'TRASH_OS has encountered a critical error and needs to restart.',
  onDismiss,
}: BSODOverlayProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-glitch-blue p-8"
          onClick={onDismiss}
        >
          <div className="w-full max-w-3xl font-mono text-system-gray">
            <div className="mb-8 text-2xl font-bold">{title}</div>

            <div className="mb-6 text-lg leading-relaxed">{message}</div>

            <div className="mb-8 rounded border border-system-gray bg-void-black p-4 font-mono text-sm">
              <div>*** STOP: 0x0000007B (0xFFFFF880009A9928,</div>
              <div>0xFFFFFFFFC0000034, 0x0000000000000000,</div>
              <div>0x0000000000000000)</div>
              <div className="mt-4">*** TRASH_OS - GLITCH_ERROR</div>
            </div>

            <div className="text-sm">
              <div>Technical information:</div>
              <div className="mt-2">
                *** STOP: 0x0000007B (0xFFFFF880009A9928)
              </div>
              <div className="mt-4">
                If this is the first time you&apos;ve seen this error screen,
              </div>
              <div>restart your computer. If this screen appears again,</div>
              <div>contact Mistress D for further instructions.</div>
            </div>

            {onDismiss && (
              <div className="mt-8 text-center text-xs animate-flicker">
                Press any key to continue...
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
