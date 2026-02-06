'use client';

import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useAchievements } from '@/lib/hooks/useGamification';
import type { Achievement } from '@/types/gamification';

type FilterType = 'all' | 'unlocked' | 'locked';

export default function AchievementsTab() {
  const { achievements, unlocked, locked, isLoading, isError } = useAchievements();
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [filter, setFilter] = useState<FilterType>('all');
  const [query, setQuery] = useState('');

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="font-vt323 text-lg text-gray-600">Cargando logros...</div>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="win95-input bg-white p-4 text-center font-vt323 text-sm text-gray-700">
          ⚠️ No se pudieron cargar los logros.
        </div>
      </div>
    );
  }

  const handleAchievementClick = (achievement: Achievement) => {
    setSelectedAchievement(
      selectedAchievement?.id === achievement.id ? null : achievement
    );
  };

  const formatUnlockedDate = (dateStr?: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const filteredAchievements = useMemo(() => {
    const pool =
      filter === 'unlocked' ? unlocked : filter === 'locked' ? locked : achievements;
    const normalized = query.trim().toLowerCase();
    if (!normalized) return pool;
    return pool.filter((achievement) =>
      `${achievement.title} ${achievement.description}`.toLowerCase().includes(normalized)
    );
  }, [achievements, filter, locked, query, unlocked]);

  const grouped = useMemo(() => {
    return {
      unlocked: filteredAchievements.filter((achievement) => achievement.unlocked),
      locked: filteredAchievements.filter((achievement) => !achievement.unlocked),
    };
  }, [filteredAchievements]);

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-vcr text-2xl text-bubblegum-pink">
            🏆 Logros
          </h2>
          <div className="font-vt323 text-sm text-gray-700">
            {unlocked.length} / {achievements.length} desbloqueados
          </div>
        </div>
        <div className="flex gap-2">
          {(['all', 'unlocked', 'locked'] as const).map((type) => (
            <button
              key={type}
              className={`win95-button px-3 py-1 text-sm ${
                filter === type ? 'bg-gray-300' : 'bg-[#dfdfdf]'
              }`}
              onClick={() => setFilter(type)}
            >
              {type === 'all' && 'Todos'}
              {type === 'unlocked' && 'Desbloqueados'}
              {type === 'locked' && 'Bloqueados'}
            </button>
          ))}
        </div>
      </div>

      <div className="win95-input flex items-center gap-2 bg-white p-3">
        <span className="text-lg">🔎</span>
        <input
          className="w-full bg-transparent font-vt323 text-sm outline-none"
          placeholder="Buscar logros..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      {/* Unlocked Achievements Grid */}
      {grouped.unlocked.length > 0 && (
        <div>
          <h3 className="mb-3 font-vt323 text-lg font-bold text-gray-800">
            ✨ Desbloqueados
          </h3>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {grouped.unlocked.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => handleAchievementClick(achievement)}
                className="win95-input cursor-pointer bg-white p-3 transition-all hover:border-bubblegum-pink"
                title={achievement.description}
              >
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="text-4xl">{achievement.icon}</div>
                  <div className="font-vt323 text-xs font-bold text-gray-800">
                    {achievement.title}
                  </div>
                  <div className="font-vt323 text-xs text-purple-600">
                    +{achievement.points_awarded} pts
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Locked Achievements */}
      {grouped.locked.length > 0 && (
        <div>
          <h3 className="mb-3 font-vt323 text-lg font-bold text-gray-600">
            🔒 Bloqueados ({grouped.locked.length})
          </h3>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {grouped.locked.slice(0, 8).map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: (grouped.unlocked.length + index) * 0.05 }}
                onClick={() => handleAchievementClick(achievement)}
                className="win95-input cursor-pointer bg-gray-100 p-3 grayscale hover:grayscale-0"
                title={achievement.description}
              >
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="text-4xl opacity-50">{achievement.icon}</div>
                  <div className="font-vt323 text-xs text-gray-500">
                    {achievement.title}
                  </div>
                  <div className="font-vt323 text-xs text-gray-400">
                    +{achievement.points_awarded} pts
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          {grouped.locked.length > 8 && (
            <div className="mt-3 text-center">
              <button className="win95-button px-4 py-2 font-vt323 text-sm">
                Ver Todos ({grouped.locked.length})
              </button>
            </div>
          )}
        </div>
      )}

      {/* Achievement Detail Modal */}
      {selectedAchievement && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setSelectedAchievement(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="win95-window w-full max-w-md"
          >
            <div className="win95-window-title bg-gradient-to-r from-purple-600 to-bubblegum-pink">
              <span className="font-vt323">
                {selectedAchievement.unlocked ? '🏆' : '🔒'} Logro
              </span>
            </div>
            <div className="win95-window-body space-y-4 bg-white p-6">
              <div className="text-center text-6xl">{selectedAchievement.icon}</div>
              <h3 className="text-center font-vcr text-2xl text-bubblegum-pink">
                {selectedAchievement.title}
              </h3>
              <p className="text-center font-vt323 text-base text-gray-700">
                {selectedAchievement.description}
              </p>
              <div className="rounded bg-purple-100 p-3 text-center">
                <div className="font-vt323 text-lg font-bold text-purple-600">
                  +{selectedAchievement.points_awarded} Pesetrash
                </div>
              </div>
              {selectedAchievement.unlocked && selectedAchievement.unlocked_at && (
                <div className="text-center font-vt323 text-sm text-gray-600">
                  Desbloqueado el {formatUnlockedDate(selectedAchievement.unlocked_at)}
                </div>
              )}
              {!selectedAchievement.unlocked && (
                <div className="text-center font-vt323 text-sm text-gray-600">
                  Todavía no desbloqueado
                </div>
              )}
              <div className="text-center">
                <button
                  onClick={() => setSelectedAchievement(null)}
                  className="win95-button px-6 py-2 font-vt323"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Empty State */}
      {achievements.length === 0 && (
        <div className="flex h-64 flex-col items-center justify-center text-center">
          <div className="mb-4 text-6xl">🏆</div>
          <div className="font-vt323 text-lg text-gray-600">
            No hay logros disponibles todavía
          </div>
        </div>
      )}

      {achievements.length > 0 && grouped.unlocked.length === 0 && grouped.locked.length === 0 && (
        <div className="flex h-40 flex-col items-center justify-center text-center">
          <div className="mb-2 text-4xl">🕵️‍♀️</div>
          <div className="font-vt323 text-sm text-gray-600">
            No hay resultados con esos filtros.
          </div>
        </div>
      )}
    </div>
  );
}
