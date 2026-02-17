'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

type GameStatus = 'live' | 'locked';

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
};

const SYMBOLS = ['🧿', '💾', '⚡', '🔮', '🪙', '🃏', '💎', '✨'];
const ROULETTE_PRIZES = ['+20 pesetrash', '+1 estampita', '+1 reliquia', '+50 pesetrash', 'Bonus x2', 'Nada (glitch)'];

export default function XXXperience() {
  const [search, setSearch] = useState('');
  const [activeGame, setActiveGame] = useState<GameModule | null>(null);
  const [lockMessage, setLockMessage] = useState('');

  const [targetIndex, setTargetIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [round, setRound] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const [rouletteIndex, setRouletteIndex] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rouletteResult, setRouletteResult] = useState<string | null>(null);
  const [glitchHits, setGlitchHits] = useState(0);
  const [easterUnlocked, setEasterUnlocked] = useState(false);
  const [secretClaimed, setSecretClaimed] = useState(false);
  const [bestScore, setBestScore] = useState(() => {
    if (typeof window === 'undefined') return 0;
    try {
      const raw = localStorage.getItem('xxxperience-stats');
      if (!raw) return 0;
      const parsed = JSON.parse(raw) as { bestScore?: number };
      return parsed.bestScore || 0;
    } catch {
      return 0;
    }
  });
  const [totalSpins, setTotalSpins] = useState(() => {
    if (typeof window === 'undefined') return 0;
    try {
      const raw = localStorage.getItem('xxxperience-stats');
      if (!raw) return 0;
      const parsed = JSON.parse(raw) as { totalSpins?: number };
      return parsed.totalSpins || 0;
    } catch {
      return 0;
    }
  });
  const [secretClaims, setSecretClaims] = useState(() => {
    if (typeof window === 'undefined') return 0;
    try {
      const raw = localStorage.getItem('xxxperience-stats');
      if (!raw) return 0;
      const parsed = JSON.parse(raw) as { secretClaims?: number };
      return parsed.secretClaims || 0;
    } catch {
      return 0;
    }
  });

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const spinTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (spinTimerRef.current) {
        clearInterval(spinTimerRef.current);
      }
    };
  }, []);



  useEffect(() => {
    if (typeof window === 'undefined') return;

    localStorage.setItem(
      'xxxperience-stats',
      JSON.stringify({
        bestScore,
        totalSpins,
        secretClaims,
      })
    );
  }, [bestScore, totalSpins, secretClaims]);
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
        status: 'live',
        icon: '🔦',
        reward: '+80 pesetrash',
      },
      {
        id: 'xp-05',
        title: 'Caos Roulette',
        description: 'Gira la ruleta ritual y recibe recompensas aleatorias.',
        status: 'live',
        icon: '🎰',
        reward: 'Premio aleatorio',
      },
    ],
    []
  );

  const filtered = useMemo(
    () => games.filter((game) => game.title.toLowerCase().includes(search.toLowerCase())),
    [games, search]
  );

  const targetSymbol = SYMBOLS[targetIndex % SYMBOLS.length];

  const huntGrid = useMemo(
    () =>
      Array.from({ length: 16 }).map((_, index) => ({
        id: index,
        symbol: SYMBOLS[(index + round + score) % SYMBOLS.length],
      })),
    [round, score]
  );

  const openGame = (game: GameModule) => {
    if (game.status === 'locked') {
      setLockMessage('🔒 Este juego sigue bloqueado hasta el siguiente rango ritual.');
      return;
    }

    setLockMessage('');
    setActiveGame(game);
  };

  const closeModal = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (spinTimerRef.current) {
      clearInterval(spinTimerRef.current);
      spinTimerRef.current = null;
    }
    setActiveGame(null);
    setIsRunning(false);
    setRound(0);
    setTimeLeft(30);
    setScore(0);
    setTargetIndex(0);
    setRouletteResult(null);
    setIsSpinning(false);
    setGlitchHits(0);
    setEasterUnlocked(false);
    setSecretClaimed(false);
  };

  const startNeonHunt = () => {
    setScore(0);
    setRound(0);
    setTimeLeft(30);
    setIsRunning(true);
    setTargetIndex(0);

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          setIsRunning(false);
          setBestScore((currentBest) => Math.max(currentBest, score));
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const spinRoulette = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setRouletteResult(null);
    setTotalSpins((prev) => prev + 1);

    const spins = Math.floor(Math.random() * 14) + 18;
    let currentStep = 0;

    if (spinTimerRef.current) {
      clearInterval(spinTimerRef.current);
    }

    spinTimerRef.current = setInterval(() => {
      setRouletteIndex((prev) => (prev + 1) % ROULETTE_PRIZES.length);
      currentStep += 1;

      if (currentStep >= spins) {
        if (spinTimerRef.current) {
          clearInterval(spinTimerRef.current);
          spinTimerRef.current = null;
        }

        setRouletteIndex((finalIndex) => {
          const result = ROULETTE_PRIZES[finalIndex];
          setRouletteResult(result);

          if (result === 'Nada (glitch)') {
            setGlitchHits((prev) => {
              const next = prev + 1;
              if (next >= 3) {
                setEasterUnlocked(true);
              }
              return next;
            });
          } else {
            setGlitchHits(0);
          }

          return finalIndex;
        });
        setIsSpinning(false);
      }
    }, 110);
  };

  const onHuntClick = (symbol: string) => {
    if (!isRunning) return;

    if (symbol === targetSymbol) {
      setScore((prev) => prev + 10);
      setRound((prev) => prev + 1);
      setTargetIndex((prev) => (prev + 1) % SYMBOLS.length);
      return;
    }

    setScore((prev) => Math.max(0, prev - 3));
  };

  const renderGameStatus = (game: GameModule) => {
    if (game.id === 'xp-04' && isRunning) {
      return `Neon Hunt activo · ${timeLeft}s`;
    }

    if (game.status === 'locked') {
      return 'Necesitas subir de rango para desbloquear este módulo.';
    }

    if (game.id === 'xp-04') {
      return 'Ya está jugable: pulsa Iniciar ritual para empezar una partida corta.';
    }

    if (game.id === 'xp-05') {
      return easterUnlocked
        ? 'Easter egg desbloqueado: reclama la reliquia secreta del glitch.'
        : 'Ruleta activa: pulsa Girar ruleta para caos y premio aleatorio.';
    }

    return 'Disponible para jugar desde la app. Próxima iteración: guardar scoring en backend.';
  };

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



      <div className="grid gap-2 rounded border-2 border-[#808080] bg-[#dfdfdf] p-3 font-vt323 text-xs text-gray-700 md:grid-cols-3">
        <div>
          Best score Neon Hunt: <strong>{bestScore}</strong>
        </div>
        <div>
          Giros de ruleta: <strong>{totalSpins}</strong>
        </div>
        <div>
          Reliquias secretas reclamadas: <strong>{secretClaims}</strong>
        </div>
      </div>

      {lockMessage && (
        <div className="win95-input bg-white p-2 font-vt323 text-xs text-[#7c2d12]">
          {lockMessage}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((game) => (
          <button
            key={game.id}
            type="button"
            onClick={() => openGame(game)}
            className={`rounded border-2 border-[#808080] bg-[#dfdfdf] p-4 text-left transition ${game.status === 'locked' ? 'cursor-not-allowed opacity-80' : 'hover:border-bubblegum-pink'}`}
            aria-disabled={game.status === 'locked'}
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
              <div className="mt-3 font-vt323 text-xs text-purple-700">Recompensa: {game.reward}</div>
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
              <button className="win95-button px-2 py-0 text-sm" onClick={closeModal}>
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

              {activeGame.id === 'xp-04' && activeGame.status === 'live' && (
                <div className="mt-4 rounded border-2 border-[#808080] bg-[#f5f5f5] p-4">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2 font-vt323 text-sm text-gray-700">
                    <span>
                      Objetivo actual: <strong className="text-lg">{targetSymbol}</strong>
                    </span>
                    <span>
                      Tiempo: <strong>{timeLeft}s</strong> · Score: <strong>{score}</strong>
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {huntGrid.map((cell) => (
                      <button
                        key={cell.id}
                        type="button"
                        onClick={() => onHuntClick(cell.symbol)}
                        className="rounded border border-[#808080] bg-white py-2 text-xl hover:bg-[#f3e8ff]"
                        disabled={!isRunning}
                      >
                        {cell.symbol}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={startNeonHunt}
                    className="mt-4 win95-button px-3 py-1 font-vt323"
                  >
                    {isRunning ? 'Reiniciar ritual' : 'Iniciar ritual'}
                  </button>
                </div>
              )}

              {activeGame.id === 'xp-05' && activeGame.status === 'live' && (
                <div className="mt-4 rounded border-2 border-[#808080] bg-[#f5f5f5] p-4">
                  <div className="mb-3 font-vt323 text-sm text-gray-700">Ritual de ruleta del caos</div>

                  <div className="grid grid-cols-3 gap-2">
                    {ROULETTE_PRIZES.map((prize, index) => (
                      <div
                        key={prize}
                        className={`rounded border px-2 py-2 text-center font-vt323 text-xs ${
                          index === rouletteIndex
                            ? 'border-[#000080] bg-[#dbeafe] text-[#000080]'
                            : 'border-[#808080] bg-white text-gray-700'
                        }`}
                      >
                        {prize}
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={spinRoulette}
                    className="mt-4 win95-button px-3 py-1 font-vt323"
                    disabled={isSpinning}
                  >
                    {isSpinning ? 'Girando...' : 'Girar ruleta'}
                  </button>

                  {rouletteResult && (
                    <div className="mt-3 font-vt323 text-sm text-purple-700">
                      Resultado: <strong>{rouletteResult}</strong>
                    </div>
                  )}

                  <div className="mt-2 font-vt323 text-xs text-gray-600">
                    Glitches consecutivos: <strong>{glitchHits}</strong>/3
                  </div>

                  {easterUnlocked && (
                    <div className="mt-3 rounded border-2 border-[#000080] bg-[#eef2ff] p-3">
                      <div className="font-vt323 text-sm text-[#000080]">
                        🕳️ EASTER EGG: ARCHIVO OCULTO DESBLOQUEADO
                      </div>
                      <div className="mt-1 font-vt323 text-xs text-gray-700">
                        Has invocado 3 glitches seguidos. Recompensa secreta disponible.
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          if (!secretClaimed) {
                            setSecretClaims((prev) => prev + 1);
                          }
                          setSecretClaimed(true);
                        }}
                        className="mt-2 win95-button px-3 py-1 font-vt323 text-sm"
                        disabled={secretClaimed}
                      >
                        {secretClaimed ? 'Reliquia reclamada ✓' : 'Reclamar reliquia secreta'}
                      </button>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-4 font-vt323 text-sm text-gray-700">{renderGameStatus(activeGame)}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
