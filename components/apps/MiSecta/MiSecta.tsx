'use client';

import React from 'react';
import RankBadge from '@/components/apps/SectaTrash/RankBadge';

const badges = [
  { title: 'Bruja Invitada', unlocked: true },
  { title: 'Ritualista', unlocked: true },
  { title: 'Glitch Oracle', unlocked: false },
];

const stats = [
  { label: 'Días activa', value: 47 },
  { label: 'Racha', value: '7 días' },
  { label: 'Rituales completados', value: 28 },
  { label: 'Compras', value: 3 },
];

export default function MiSecta() {
  return (
    <div className="flex h-full flex-col gap-4 bg-[#c0c0c0] p-4">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-[#808080] pb-3">
        <div>
          <div className="font-vcr text-2xl text-bubblegum-pink">MiSecta.exe</div>
          <div className="font-vt323 text-sm text-gray-700">
            Perfil ritual: <span className="font-bold">Bruja Invitada</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <RankBadge rank="Bruja Invitada" unlocked size="md" isCurrentRank />
          <div className="rounded border-2 border-[#808080] bg-[#dfdfdf] px-3 py-2 font-vt323 text-sm">
            🪙 5,420 pesetrash
          </div>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded border-2 border-[#808080] bg-[#dfdfdf] p-3"
          >
            <div className="font-vt323 text-xs uppercase text-gray-600">{stat.label}</div>
            <div className="font-vcr text-lg text-gray-800">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="rounded border-2 border-[#808080] bg-[#dfdfdf] p-4">
        <div className="mb-2 font-vcr text-lg text-purple-700">Rangos desbloqueados</div>
        <div className="flex flex-wrap gap-3">
          {badges.map((badge) => (
            <RankBadge
              key={badge.title}
              rank={badge.title}
              unlocked={badge.unlocked}
              size="sm"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
