'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useUserStats, useRecentActivity } from '@/lib/hooks/useGamification';

export default function StatsTab() {
  const { stats, isLoading: statsLoading } = useUserStats();
  const { activities, isLoading: activitiesLoading } = useRecentActivity(10);

  if (statsLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="font-vt323 text-lg text-gray-600">Cargando estadísticas...</div>
      </div>
    );
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) {
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      return `hace ${diffMinutes} ${diffMinutes === 1 ? 'minuto' : 'minutos'}`;
    }
    if (diffHours < 24) {
      return `hace ${diffHours} ${diffHours === 1 ? 'hora' : 'horas'}`;
    }
    if (diffDays < 7) {
      return `hace ${diffDays} ${diffDays === 1 ? 'día' : 'días'}`;
    }
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="space-y-6 p-4">
      <h2 className="font-vcr text-2xl text-bubblegum-pink">📊 Estadísticas</h2>

      {/* Stats Grid */}
      {stats && (
        <div className="win95-input space-y-3 bg-white p-4">
          <div className="flex justify-between font-vt323 text-base">
            <span className="text-gray-700">Total Pesetrash Ganadas:</span>
            <span className="font-bold text-purple-600">
              {stats.total_points_earned.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between font-vt323 text-base">
            <span className="text-gray-700">Challenges Completados:</span>
            <span className="font-bold text-bubblegum-pink">
              {stats.challenges_completed}
            </span>
          </div>
          <div className="flex justify-between font-vt323 text-base">
            <span className="text-gray-700">Logros Desbloqueados:</span>
            <span className="font-bold text-hacker-green">
              {stats.achievements_unlocked}
            </span>
          </div>
          <div className="flex justify-between font-vt323 text-base">
            <span className="text-gray-700">Días Activa:</span>
            <span className="font-bold text-gray-800">{stats.days_active}</span>
          </div>
        </div>
      )}

      {/* Streak */}
      {stats && stats.current_streak > 0 && (
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="win95-input bg-gradient-to-r from-orange-100 to-yellow-100 p-4"
        >
          <div className="flex items-center gap-2 font-vt323 text-lg">
            <span className="text-2xl">🔥</span>
            <span className="font-bold">Racha Actual:</span>
            <span className="text-orange-600">{stats.current_streak} días</span>
          </div>
        </motion.div>
      )}

      {/* Recent Activity */}
      <div className="win95-input bg-white p-4">
        <h3 className="mb-3 font-vt323 text-lg font-bold text-gray-800">
          📈 Actividad Reciente
        </h3>

        {activitiesLoading ? (
          <div className="font-vt323 text-sm text-gray-600">Cargando actividad...</div>
        ) : activities.length === 0 ? (
          <div className="font-vt323 text-sm text-gray-600">
            No hay actividad reciente
          </div>
        ) : (
          <div className="max-h-64 space-y-2 overflow-y-auto">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-2 border-l-2 border-gray-300 py-2 pl-3"
              >
                <span className="text-xl">{activity.icon}</span>
                <div className="flex-1">
                  <div className="font-vt323 text-sm font-bold text-gray-800">
                    {activity.amount && activity.currency && (
                      <span className="text-purple-600">
                        +{activity.amount}{' '}
                        {activity.currency === 'pesetrash' && '🪙'}
                        {activity.currency === 'estampitas' && '🃏'}
                        {activity.currency === 'reliquias' && '💎'} -{' '}
                      </span>
                    )}
                    {activity.title}
                  </div>
                  <div className="font-vt323 text-xs text-gray-600">
                    {formatTimestamp(activity.timestamp)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
