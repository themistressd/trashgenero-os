'use client';

import React, { useState } from 'react';

const entries = [
  {
    id: 'grim-01',
    title: 'Manifiesto Trash',
    excerpt: 'Un juramento de estética tóxica y belleza radical.',
    tags: ['manifesto', 'trash-core'],
  },
  {
    id: 'grim-02',
    title: 'Manual de Glitches',
    excerpt: 'Recetas para distorsionar la realidad con estilo.',
    tags: ['glitch', 'tutorial'],
  },
  {
    id: 'grim-03',
    title: 'Crónicas del culto',
    excerpt: 'Notas internas y rituales documentados.',
    tags: ['lore', 'secta'],
  },
];

export default function Grimorio() {
  const [search, setSearch] = useState('');

  const filtered = entries.filter((entry) =>
    entry.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-full flex-col gap-4 bg-[#c0c0c0] p-4">
      <div className="border-b-2 border-[#808080] pb-3">
        <div className="font-vcr text-2xl text-bubblegum-pink">Grimorio.exe</div>
        <div className="font-vt323 text-sm text-gray-700">Archivo de textos, manifiestos y notas.</div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <label className="font-vt323 text-sm text-gray-700" htmlFor="grimorio-search">
          Buscar
        </label>
        <input
          id="grimorio-search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="win95-input flex-1"
          placeholder="Filtra por título..."
        />
      </div>

      <div className="space-y-3">
        {filtered.map((entry) => (
          <div
            key={entry.id}
            className="rounded border-2 border-[#808080] bg-[#dfdfdf] p-4"
          >
            <div className="font-vcr text-lg text-gray-800">{entry.title}</div>
            <p className="font-vt323 text-sm text-gray-700">{entry.excerpt}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-black px-2 py-1 font-vt323 text-xs text-green-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="rounded border-2 border-[#808080] bg-[#dfdfdf] p-4 font-vt323 text-sm text-gray-700">
            No hay entradas con ese filtro.
          </div>
        )}
      </div>
    </div>
  );
}
