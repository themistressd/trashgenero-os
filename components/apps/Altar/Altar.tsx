'use client';

import React from 'react';

const relics = [
  { id: 'relic-01', name: 'Reliquia Pixel', rarity: 'Rara', icon: '💎' },
  { id: 'relic-02', name: 'Códice Glitch', rarity: 'Épica', icon: '📼' },
  { id: 'relic-03', name: 'Totem Neon', rarity: 'Legendaria', icon: '🗿' },
];

const achievements = [
  { id: 'ach-01', title: 'Primera invocación', status: 'Desbloqueado' },
  { id: 'ach-02', title: 'Coleccionista', status: 'En progreso' },
  { id: 'ach-03', title: 'Ritualista suprema', status: 'Bloqueado' },
];

export default function Altar() {
  return (
    <div className="flex h-full flex-col gap-4 bg-[#c0c0c0] p-4">
      <div className="border-b-2 border-[#808080] pb-3">
        <div className="font-vcr text-2xl text-bubblegum-pink">Altar.exe</div>
        <div className="font-vt323 text-sm text-gray-700">
          Tus reliquias, trofeos y logros del culto.
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded border-2 border-[#808080] bg-[#dfdfdf] p-4">
          <div className="mb-3 font-vcr text-lg text-gray-800">Reliquias</div>
          <div className="space-y-2">
            {relics.map((relic) => (
              <div
                key={relic.id}
                className="flex items-center justify-between border border-[#808080] bg-white px-3 py-2 font-vt323 text-sm"
              >
                <span className="flex items-center gap-2">
                  <span className="text-lg">{relic.icon}</span>
                  {relic.name}
                </span>
                <span className="text-xs text-purple-700">{relic.rarity}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded border-2 border-[#808080] bg-[#dfdfdf] p-4">
          <div className="mb-3 font-vcr text-lg text-gray-800">Logros</div>
          <div className="space-y-2">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="flex items-center justify-between border border-[#808080] bg-white px-3 py-2 font-vt323 text-sm"
              >
                <span>{achievement.title}</span>
                <span className="text-xs text-gray-600">{achievement.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
