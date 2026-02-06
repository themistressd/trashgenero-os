'use client';

import React from 'react';

const rituals = [
  {
    id: 'ritual-01',
    title: 'Drop Lunar',
    date: '13 Oct · 22:00',
    status: 'Confirmado',
    highlight: 'stream',
  },
  {
    id: 'ritual-02',
    title: 'Círculo de Brujas',
    date: '18 Oct · 19:30',
    status: 'Invitación',
    highlight: 'invite',
  },
  {
    id: 'ritual-03',
    title: 'Ritual de Estampitas',
    date: '24 Oct · 21:00',
    status: 'Abierto',
    highlight: 'open',
  },
];

const highlightStyles: Record<string, string> = {
  stream: 'bg-[#1f2937] text-green-300',
  invite: 'bg-[#312e81] text-pink-200',
  open: 'bg-[#065f46] text-green-100',
};

export default function Rituales() {
  return (
    <div className="flex h-full flex-col gap-4 bg-[#c0c0c0] p-4">
      <div className="border-b-2 border-[#808080] pb-3">
        <div className="font-vcr text-2xl text-bubblegum-pink">Rituales.exe</div>
        <div className="font-vt323 text-sm text-gray-700">
          Calendario de eventos, drops y ceremonias de la Secta.
        </div>
      </div>

      <div className="rounded border-2 border-[#808080] bg-[#dfdfdf] p-4">
        <div className="mb-3 font-vcr text-lg text-gray-800">Próximos rituales</div>
        <div className="space-y-3">
          {rituals.map((ritual) => (
            <div
              key={ritual.id}
              className="flex flex-wrap items-center justify-between gap-3 border border-[#808080] bg-white px-3 py-2 font-vt323 text-sm"
            >
              <div>
                <div className="text-base text-gray-900">{ritual.title}</div>
                <div className="text-xs text-gray-600">{ritual.date}</div>
              </div>
              <div
                className={`rounded px-3 py-1 text-xs uppercase ${highlightStyles[ritual.highlight]}`}
              >
                {ritual.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded border-2 border-[#808080] bg-[#dfdfdf] p-4">
        <div className="mb-2 font-vcr text-lg text-gray-800">Checklist ritual</div>
        <ul className="list-disc space-y-1 pl-5 font-vt323 text-sm text-gray-700">
          <li>Sincroniza tu alarma ritual.</li>
          <li>Prepara tus reliquias y estampitas.</li>
          <li>Comparte tu look en STsLK3R_Z0NE.</li>
        </ul>
      </div>
    </div>
  );
}
