'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RankUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  rankName: string;
  benefits: string[];
}

export default function RankUpModal({
  isOpen,
  onClose,
  rankName,
  benefits,
}: RankUpModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          >
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="win95-window relative max-w-md"
            >
              {/* Title Bar */}
              <div className="win95-window-title bg-gradient-to-r from-purple-600 to-bubblegum-pink px-4 py-2">
                <span className="font-vt323 text-lg">🎉 ¡RANK UP!</span>
              </div>

              {/* Content */}
              <div className="win95-window-body bg-white p-6 text-center">
                {/* Animated Badge */}
                <motion.div
                  animate={{
                    rotate: [0, -10, 10, -10, 10, 0],
                    scale: [1, 1.1, 1, 1.1, 1],
                  }}
                  transition={{
                    duration: 0.8,
                    ease: 'easeInOut',
                  }}
                  className="mb-4 text-6xl"
                >
                  🎖️
                </motion.div>

                {/* Confetti effect */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ 
                        y: -20, 
                        x: Math.random() * 400,
                        opacity: 1,
                        scale: Math.random() * 0.5 + 0.5,
                      }}
                      animate={{
                        y: 600,
                        rotate: Math.random() * 360,
                        opacity: 0,
                      }}
                      transition={{
                        duration: Math.random() * 2 + 2,
                        ease: 'easeOut',
                        delay: Math.random() * 0.5,
                      }}
                      className="absolute text-2xl"
                    >
                      {['✨', '⭐', '💖', '🌟'][Math.floor(Math.random() * 4)]}
                    </motion.div>
                  ))}
                </div>

                {/* Text */}
                <h2 className="mb-2 font-vcr text-2xl text-bubblegum-pink">
                  ¡Felicidades!
                </h2>
                <p className="mb-4 font-vt323 text-lg text-gray-700">
                  Has alcanzado el rango:
                </p>

                <div className="mb-6 rounded bg-gradient-to-r from-purple-600 to-bubblegum-pink p-4">
                  <h3 className="font-vcr text-3xl text-white drop-shadow-lg">
                    {rankName}
                  </h3>
                </div>

                {/* Benefits */}
                {benefits.length > 0 && (
                  <div className="mb-6 text-left">
                    <h4 className="mb-2 font-vt323 text-lg font-bold text-gray-800">
                      Beneficios desbloqueados:
                    </h4>
                    <ul className="space-y-1 font-vt323 text-sm text-gray-700">
                      {benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-hacker-green">•</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="win95-button px-8 py-2 font-vt323 text-lg"
                >
                  Continuar
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
