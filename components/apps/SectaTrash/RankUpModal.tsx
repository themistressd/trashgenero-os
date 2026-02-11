'use client';

import React, { useMemo } from 'react';
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

  const confettiParticles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, index) => ({
        id: index,
        x: (index * 37) % 400,
        scale: 0.5 + ((index * 17) % 50) / 100,
        rotate: (index * 53) % 360,
        duration: 2 + ((index * 19) % 20) / 10,
        delay: ((index * 11) % 5) / 10,
        icon: ['✨', '⭐', '💖', '🌟'][index % 4],
      })),
    []
  );

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
                  {confettiParticles.map((particle) => (
                    <motion.div
                      key={particle.id}
                      initial={{
                        y: -20,
                        x: particle.x,
                        opacity: 1,
                        scale: particle.scale,
                      }}
                      animate={{
                        y: 600,
                        rotate: particle.rotate,
                        opacity: 0,
                      }}
                      transition={{
                        duration: particle.duration,
                        ease: 'easeOut',
                        delay: particle.delay,
                      }}
                      className="absolute text-2xl"
                    >
                      {particle.icon}
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
