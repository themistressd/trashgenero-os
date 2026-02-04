'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRanks, useGamification } from '@/lib/hooks/useGamification';
import RankBadge from './RankBadge';

export default function RanksTab() {
  const { ranks, isLoading: ranksLoading } = useRanks();
  const { gamification, isLoading: gamificationLoading } = useGamification();
  const [selectedRank, setSelectedRank] = useState<number | null>(null);

  const isLoading = ranksLoading || gamificationLoading;

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="font-vt323 text-lg text-gray-600">Cargando rangos...</div>
      </div>
    );
  }

  const currentRankId = gamification?.rank?.id;
  const currentPoints = gamification?.points?.pesetrash || 0;

  // Sort ranks by order
  const sortedRanks = [...ranks].sort((a, b) => a.order - b.order);

  const handleRankClick = (rankId: number) => {
    setSelectedRank(selectedRank === rankId ? null : rankId);
  };

  return (
    <div className="space-y-6 p-4">
      <h2 className="font-vcr text-2xl text-bubblegum-pink">🎖️ Jerarquía de Rangos</h2>

      {/* Ranks List */}
      <div className="win95-input space-y-3 bg-white p-4">
        {sortedRanks.length === 0 ? (
          <div className="font-vt323 text-center text-gray-600">
            No hay rangos disponibles
          </div>
        ) : (
          sortedRanks.map((rank, index) => {
            const isUnlocked = rank.order <= (gamification?.rank?.order || 0);
            const isCurrentRank = rank.id === currentRankId;
            const pointsRequired =
              rank.requirements.find((r) => r.points_type === 'pesetrash')?.points_required || 0;

            return (
              <motion.div
                key={rank.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`cursor-pointer rounded border-2 p-3 transition-colors ${
                  isCurrentRank
                    ? 'border-bubblegum-pink bg-pink-50'
                    : isUnlocked
                    ? 'border-hacker-green bg-green-50'
                    : 'border-gray-300 bg-gray-50'
                }`}
                onClick={() => handleRankClick(rank.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {isUnlocked ? '✅' : '🔒'}
                    </span>
                    <div>
                      <div className="font-vt323 text-lg font-bold">
                        {rank.title}
                        {isCurrentRank && (
                          <span className="ml-2 text-bubblegum-pink">← TÚ</span>
                        )}
                      </div>
                      <div className="font-vt323 text-sm text-gray-600">
                        {pointsRequired} pts {isUnlocked && currentPoints >= pointsRequired && '(Desbloqueado)'}
                      </div>
                    </div>
                  </div>
                  <span className="text-gray-400">{selectedRank === rank.id ? '▲' : '▼'}</span>
                </div>

                {/* Expanded Details */}
                {selectedRank === rank.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-3 border-t-2 border-gray-300 pt-3"
                  >
                    {rank.description && (
                      <p className="mb-3 font-vt323 text-sm text-gray-700">
                        {rank.description}
                      </p>
                    )}

                    {rank.requirements.length > 0 && (
                      <div className="mb-3">
                        <h4 className="mb-2 font-vt323 text-sm font-bold text-gray-800">
                          Requisitos:
                        </h4>
                        <ul className="space-y-1 font-vt323 text-sm text-gray-700">
                          {rank.requirements.map((req) => (
                            <li key={req.id} className="flex items-start gap-2">
                              <span className="text-purple-600">•</span>
                              <span>
                                {req.points_required} {req.points_type} points
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="rounded bg-purple-100 p-2">
                      <h4 className="mb-1 font-vt323 text-sm font-bold text-purple-800">
                        💫 Beneficios:
                      </h4>
                      <ul className="space-y-1 font-vt323 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="text-hacker-green">•</span>
                          <span>Acceso a contenido exclusivo del rango</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-hacker-green">•</span>
                          <span>Badge especial en tu perfil</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-hacker-green">•</span>
                          <span>Descuentos especiales en Trashtienda</span>
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })
        )}
      </div>

      {/* Progress Info */}
      <div className="rounded border-2 border-purple-600 bg-purple-50 p-3">
        <p className="font-vt323 text-sm text-gray-700">
          💡 <strong>Tip:</strong> Gana puntos completando challenges, comprando
          productos y participando en eventos para subir de rango y desbloquear
          beneficios exclusivos.
        </p>
      </div>
    </div>
  );
}
