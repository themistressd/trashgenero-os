'use client';

import React, { useMemo, useState } from 'react';

type GameStatus = 'live' | 'locked' | 'coming';

interface GameModule {
  id: string;
  title: string;
  description: string;
  status: GameStatus;
  icon: string;
  reward?: string;
}

const statusStyles: Record<GameStatus, string> = {
  live: 'bg-black text-green-300',
  locked: 'bg-[#312e81] text-pink-200',
  coming: 'bg-[#27272a] text-gray-200',
};

export default function XXXperience() {
  const [search, setSearch] = useState('');
  const [activeGame, setActiveGame] = useState<GameModule | null>(null);

  const games = useMemo<GameModule[]>(
    () => [
      {
        id: 'xp-01',
        title: 'Glitch Runner',
        description: 'Esquiva errores del sistema y recolecta reliquias de neon.',
        status: 'live',
        icon: '🧿',
        reward: '+120 pesetrash',
      },
      {
        id: 'xp-02',
        title: 'Ritual Rhythm',
        description: 'Sincroniza tus clicks con el pulso del culto.',
        status: 'locked',
        icon: '🎚️',
        reward: '+1 estampita',
      },
      {
        id: 'xp-03',
        title: 'Trash Memory',
        description: 'Memoriza secuencias tóxicas para desbloquear perks.',
        status: 'live',
        icon: '🃏',
        reward: '+1 reliquia',
      },
      {
        id: 'xp-04',
        title: 'Neon Hunt',
        description: 'Encuentra los símbolos ocultos en el escritorio.',
        status: 'coming',
        icon: '🔦',
      },
    ],
    []
  );

  const filtered = useMemo(
    () =>
      games.filter((game) =>
        game.title.toLowerCase().includes(search.toLowerCase())
      ),
    [games, search]
  );

  return (
    <div className="flex h-full flex-col gap-4 bg-[#c0c0c0] p-4">
      <div className="border-b-2 border-[#808080] pb-3">
        <div className="font-vcr text-2xl text-bubblegum-pink">XXXperience.zip</div>
        <div className="font-vt323 text-sm text-gray-700">
          Mini-juegos del culto: desbloquea puntos, reliquias y estatus.
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <label className="font-vt323 text-sm text-gray-700" htmlFor="xxx-search">
          Buscar juego
        </label>
        <input
          id="xxx-search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="win95-input flex-1"
          placeholder="Filtra por título..."
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((game) => (
          <button
            key={game.id}
            type="button"
            onClick={() => setActiveGame(game)}
            className="rounded border-2 border-[#808080] bg-[#dfdfdf] p-4 text-left transition hover:border-bubblegum-pink"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{game.icon}</span>
                <div>
                  <div className="font-vcr text-lg text-gray-800">{game.title}</div>
                  <div className="font-vt323 text-xs text-gray-600">{game.description}</div>
                </div>
              </div>
              <span
                className={`rounded px-2 py-1 font-vt323 text-xs uppercase ${statusStyles[game.status]}`}
              >
                {game.status}
              </span>
            </div>
            {game.reward && (
              <div className="mt-3 font-vt323 text-xs text-purple-700">
                Recompensa: {game.reward}
              </div>
            )}
          </button>
        ))}

        {filtered.length === 0 && (
          <div className="rounded border-2 border-[#808080] bg-[#dfdfdf] p-4 font-vt323 text-sm text-gray-700">
            No hay juegos que coincidan con tu búsqueda.
          </div>
        )}
      </div>

      {activeGame && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="win95-window relative max-h-[80vh] w-full max-w-xl overflow-hidden">
            <div className="win95-window-title flex items-center justify-between bg-gradient-to-r from-purple-600 to-bubblegum-pink px-4 py-2">
              <span className="font-vt323 text-white">{activeGame.title}</span>
              <button
                className="win95-button px-2 py-0 text-sm"
                onClick={() => setActiveGame(null)}
              >
                X
              </button>
            </div>
            <div className="win95-window-body max-h-[70vh] overflow-auto bg-white p-6">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{activeGame.icon}</span>
                <div>
                  <div className="font-vcr text-xl text-gray-800">{activeGame.title}</div>
                  <div className="font-vt323 text-sm text-gray-600">{activeGame.description}</div>
                </div>
              </div>
              <div className="mt-4 rounded border-2 border-[#808080] bg-[#dfdfdf] p-4">
                <div className="font-vt323 text-sm text-gray-700">
                  Estado actual: <strong>{activeGame.status}</strong>
                </div>
                {activeGame.reward && (
                  <div className="mt-2 font-vt323 text-sm text-purple-700">
                    Recompensa potencial: {activeGame.reward}
                  </div>
                )}
              </div>
              <div className="mt-4 font-vt323 text-sm text-gray-700">
                {activeGame.status === 'live'
                  ? 'Disponible para jugar desde la app. Próximamente conectaremos el runtime con scoring.'
                  : activeGame.status === 'locked'
                  ? 'Necesitas subir de rango para desbloquear este módulo.'
                  : 'Este juego está en preparación. Mantente atenta a los drop alerts.'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
