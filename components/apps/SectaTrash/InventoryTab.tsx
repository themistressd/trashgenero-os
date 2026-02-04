'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useGamification } from '@/lib/hooks/useGamification';
import ProgressBar from './ProgressBar';

export default function InventoryTab() {
  const { gamification, isLoading } = useGamification();

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="font-vt323 text-lg text-gray-600">Cargando inventario...</div>
      </div>
    );
  }

  const points = gamification?.points || { pesetrash: 0, estampitas: 0, reliquias: 0 };
  const currentRank = gamification?.rank?.title || 'Iniciada';
  const nextRank = gamification?.next_rank?.title || null;
  const progress = gamification?.progress_to_next || 0;
  const currentPoints = points.pesetrash;
  const nextRankPoints = gamification?.next_rank?.requirements?.[0]?.points_required || 0;

  return (
    <div className="space-y-6 p-4">
      <h2 className="font-vcr text-2xl text-bubblegum-pink">💰 Tu Inventario</h2>

      {/* Currency Cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {/* Pesetrash */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="win95-input flex flex-col items-center justify-center gap-2 bg-white p-4"
          title="Pesetrash - La moneda oficial del culto"
        >
          <div className="text-4xl">🪙</div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-vcr text-3xl text-purple-600"
          >
            {points.pesetrash.toLocaleString()}
          </motion.div>
          <div className="font-vt323 text-sm text-gray-600">Pesetrash</div>
        </motion.div>

        {/* Estampitas */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="win95-input flex flex-col items-center justify-center gap-2 bg-white p-4"
          title="Estampitas - Coleccionables de eventos especiales"
        >
          <div className="text-4xl">🃏</div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-vcr text-3xl text-bubblegum-pink"
          >
            {points.estampitas.toLocaleString()}
          </motion.div>
          <div className="font-vt323 text-sm text-gray-600">Estampitas</div>
        </motion.div>

        {/* Reliquias */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="win95-input flex flex-col items-center justify-center gap-2 bg-white p-4"
          title="Reliquias - Objetos raros y místicos"
        >
          <div className="text-4xl">💎</div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-vcr text-3xl text-hacker-green"
          >
            {points.reliquias.toLocaleString()}
          </motion.div>
          <div className="font-vt323 text-sm text-gray-600">Reliquias</div>
        </motion.div>
      </div>

      {/* Current Rank and Progress */}
      <div className="win95-input space-y-4 bg-white p-4">
        <div className="flex items-center gap-2 font-vt323 text-lg">
          <span>🎖️</span>
          <span className="font-bold">Rango Actual:</span>
          <span className="text-bubblegum-pink">{currentRank}</span>
        </div>

        {nextRank && (() => {
          const pointsEarned = Math.floor(nextRankPoints * progress / 100);
          const pointsRemaining = nextRankPoints - pointsEarned;
          return (
            <ProgressBar
              current={currentPoints}
              total={nextRankPoints}
              label={`${pointsRemaining} pts para ${nextRank}`}
              color="magenta"
            />
          );
        })()}

        {!nextRank && (
          <div className="font-vt323 text-center text-sm text-gray-600">
            ¡Has alcanzado el rango máximo! 👑
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="rounded border-2 border-hacker-green bg-black/10 p-3">
        <p className="font-vt323 text-sm text-gray-700">
          💡 <strong>Tip:</strong> Gana más Pesetrash completando challenges,
          comprando productos y participando en la comunidad. Las Estampitas se
          obtienen en eventos especiales y las Reliquias son objetos únicos de
          drops limitados.
        </p>
      </div>
    </div>
  );
}
