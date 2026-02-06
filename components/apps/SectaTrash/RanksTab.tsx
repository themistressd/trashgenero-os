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
  const currentRankOrder = gamification?.rank?.order || 0;

  // Sort ranks by order
  const sortedRanks = [...ranks].sort((a, b) => a.order - b.order);
  const maxOrder = sortedRanks[sortedRanks.length - 1]?.order || 1;
  const rankProgress = Math.min(100, Math.round((currentRankOrder / maxOrder) * 100));

  const handleRankClick = (rankId: number) => {
    setSelectedRank(selectedRank === rankId ? null : rankId);
  };

  return (
    <div className="space-y-6 p-4">
      <h2 className="font-vcr text-2xl text-bubblegum-pink">🎖️ Jerarquía de Rangos</h2>

      {/* Rank Roadmap */}
      <div className="win95-input bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-vt323 text-lg font-bold text-gray-800">🧭 Roadmap de rangos</h3>
          <span className="font-vt323 text-sm text-gray-600">
            Progreso: {rankProgress}%
          </span>
        </div>
        {sortedRanks.length === 0 ? (
          <div className="font-vt323 text-center text-gray-600">
            No hay rangos disponibles
          </div>
        ) : (
          <div className="space-y-3">
            <div className="h-2 w-full rounded bg-gray-200">
              <div
                className="h-2 rounded bg-bubblegum-pink"
                style={{ width: `${rankProgress}%` }}
              />
            </div>
            <div className="flex items-center gap-4 overflow-x-auto pb-2">
              {sortedRanks.map((rank) => {
                const isUnlocked = rank.order <= currentRankOrder;
                const isCurrentRank = rank.id === currentRankId;
                return (
                  <div
                    key={rank.id}
                    className="flex min-w-[160px] flex-col items-center gap-2 text-center"
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                        isCurrentRank
                          ? 'border-bubblegum-pink bg-pink-100'
                          : isUnlocked
                          ? 'border-hacker-green bg-green-100'
                          : 'border-gray-300 bg-gray-100'
                      }`}
                    >
                      <span>{isUnlocked ? '⭐' : '🔒'}</span>
                    </div>
                    <div className="font-vt323 text-sm font-bold text-gray-800">
                      {rank.title}
                    </div>
                    {isCurrentRank && (
                      <div className="rounded bg-bubblegum-pink px-2 py-0.5 font-vt323 text-xs text-white">
                        Tu rango
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

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
                    <RankBadge
                      rank={rank.title}
                      unlocked={isUnlocked}
                      size="sm"
                      isCurrentRank={isCurrentRank}
                    />
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
