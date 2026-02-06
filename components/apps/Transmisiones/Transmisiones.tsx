'use client';

import React from 'react';

const streams = [
  {
    id: 'stream-01',
    title: 'TRASH_VISION.exe · Ep. 07',
    status: 'Live',
    time: 'Ahora',
  },
  {
    id: 'stream-02',
    title: 'Backstage Ritual',
    status: 'Replay',
    time: 'hace 2 días',
  },
  {
    id: 'stream-03',
    title: 'Drop Reveal',
    status: 'Replay',
    time: 'hace 1 semana',
  },
];

export default function Transmisiones() {
  return (
    <div className="flex h-full flex-col gap-4 bg-[#c0c0c0] p-4">
      <div className="border-b-2 border-[#808080] pb-3">
        <div className="font-vcr text-2xl text-bubblegum-pink">Transmisiones.exe</div>
        <div className="font-vt323 text-sm text-gray-700">
          Streams en vivo, replays y contenido exclusivo.
        </div>
      </div>

      <div className="rounded border-2 border-[#808080] bg-[#dfdfdf] p-4">
        <div className="mb-3 font-vcr text-lg text-gray-800">Panel de emisión</div>
        <div className="flex h-40 items-center justify-center border border-[#808080] bg-black text-green-300">
          TRASH_VISION SIGNAL
        </div>
      </div>

      <div className="space-y-3">
        {streams.map((stream) => (
          <div
            key={stream.id}
            className="flex flex-wrap items-center justify-between gap-3 border-2 border-[#808080] bg-[#dfdfdf] px-3 py-2"
          >
            <div>
              <div className="font-vt323 text-base text-gray-800">{stream.title}</div>
              <div className="font-vt323 text-xs text-gray-600">{stream.time}</div>
            </div>
            <span className="rounded bg-black px-2 py-1 font-vt323 text-xs text-green-300">
              {stream.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
