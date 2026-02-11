'use client';

import React, { useMemo, useState } from 'react';
import SectaTrash from '@/components/apps/SectaTrash/SectaTrash';
import Trashtienda from '@/components/apps/Trashtienda/Trashtienda';
import MistressD from '@/components/apps/MistressD/MistressD';
import Divas from '@/components/apps/Divas/Divas';
import Centerfolds from '@/components/apps/Centerfolds/Centerfolds';
import StalkerZone from '@/components/apps/StalkerZone/StalkerZone';
import XXXperience from '@/components/apps/XXXperience/XXXperience';
import Grimorio from '@/components/apps/Grimorio/Grimorio';
import Transmisiones from '@/components/apps/Transmisiones/Transmisiones';
import { useGamification } from '@/lib/hooks/useGamification';
import { canAccessRoute, getRouteByPath } from '@/lib/constants/routes';
import { getRankNameBySlug } from '@/lib/constants/ranks';

type TrashMateView = 'home' | 'app';

interface TrashMateApp {
  id: string;
  name: string;
  icon: string;
  description: string;
  route: string;
  component: React.ReactNode;
}

export default function TrashMateShell() {
  const [view, setView] = useState<TrashMateView>('home');
  const [activeAppId, setActiveAppId] = useState<string>('secta-trash');
  const [lockMessage, setLockMessage] = useState<string>('');
  const { gamification } = useGamification();

  const apps = useMemo<TrashMateApp[]>(
    () => [
      {
        id: 'secta-trash',
        name: 'SectaTrash.exe',
        icon: '🎮',
        description: 'Perfil, rangos y puntos.',
        route: '/apps/secta-trash',
        component: <SectaTrash />,
      },
      {
        id: 'trashtienda',
        name: 'Trashtienda.exe',
        icon: '🛍️',
        description: 'Compras y drops rituales.',
        route: '/apps/trashtienda',
        component: <Trashtienda />,
      },
      {
        id: 'mistress-d',
        name: 'Mistress D.exe',
        icon: '📝',
        description: 'Archivo personal y manifiesto.',
        route: '/apps/mistress-d',
        component: <MistressD />,
      },
      {
        id: 'divas',
        name: 'Divas.rar',
        icon: '💿',
        description: 'Lore de divas y personajes.',
        route: '/apps/divas',
        component: <Divas />,
      },
      {
        id: 'centerfolds',
        name: 'CENTERFOLDS.zip',
        icon: '📸',
        description: 'Lookbooks y editoriales.',
        route: '/apps/centerfolds',
        component: <Centerfolds />,
      },
      {
        id: 'stalker-zone',
        name: 'STsLK3R_Z0NE',
        icon: '👾',
        description: 'Social y transmisiones.',
        route: '/apps/stalker-zone',
        component: <StalkerZone />,
      },
      {
        id: 'xxxperience',
        name: 'XXXperience.zip',
        icon: '🕹️',
        description: 'Mini-juegos rituales.',
        route: '/apps/xxxperience',
        component: <XXXperience />,
      },
      {
        id: 'grimorio',
        name: 'TRASH-ZINE.pdf',
        icon: '📖',
        description: 'Blog y manifiestos.',
        route: '/apps/grimorio',
        component: <Grimorio />,
      },
      {
        id: 'transmisiones',
        name: 'TRASH_VISION.exe',
        icon: '📺',
        description: 'Streams y contenido exclusivo.',
        route: '/apps/transmisiones',
        component: <Transmisiones />,
      },
    ],
    []
  );

  const activeApp = apps.find((app) => app.id === activeAppId) ?? apps[0];

  const userRank = gamification?.rank?.slug;
  const appAccessMap = useMemo(
    () =>
      Object.fromEntries(
        apps.map((app) => {
          const canOpen = canAccessRoute(app.route, userRank);
          const route = getRouteByPath(app.route);
          const requiredRankLabel = route?.requiredRank
            ? getRankNameBySlug(route.requiredRank)
            : undefined;
          return [app.id, { canOpen, requiredRankLabel }];
        })
      ),
    [apps, userRank]
  );

  const openApp = (id: string) => {
    const app = apps.find((item) => item.id === id);
    if (!app) return;

    const canOpen = canAccessRoute(app.route, userRank);
    if (!canOpen) {
      const route = getRouteByPath(app.route);
      const requiredRank = route?.requiredRank
        ? getRankNameBySlug(route.requiredRank)
        : 'un rango superior';
      setLockMessage(`🔒 Necesitas ${requiredRank} para abrir ${app.name}.`);
      return;
    }

    setLockMessage('');
    setActiveAppId(id);
    setView('app');
  };

  return (
    <div className="trash-mate-container">
      <header className="trash-mate-header">
        <div>
          <div className="trash-mate-title">Trash-Mate</div>
          <div className="trash-mate-subtitle">Modo móvil · Single-app shell</div>
        </div>
        <span className="trash-mate-signal">📶</span>
      </header>

      <main className="trash-mate-content">
        {view === 'home' && (
          <section className="trash-mate-home">
            <div className="gb-screen trash-mate-welcome">
              <div className="gb-text">
                Bienvenida, bruja móvil. Selecciona una app para iniciar tu ritual.
              </div>
            </div>

            {lockMessage && (
              <div className="win95-input bg-white p-2 font-vt323 text-xs text-[#7c2d12]">
                {lockMessage}
              </div>
            )}

            <div className="trash-mate-grid">
              {apps.map((app) => (
                <button
                  key={app.id}
                  type="button"
                  className="trash-mate-icon"
                  onClick={() => openApp(app.id)}
                >
                  <span className="trash-mate-icon-emoji">
                    {app.icon}
                    {!appAccessMap[app.id]?.canOpen && <span className="ml-1 text-xs">🔒</span>}
                  </span>
                  <span className="trash-mate-icon-label">{app.name}</span>
                  {!appAccessMap[app.id]?.canOpen && appAccessMap[app.id]?.requiredRankLabel && (
                    <span className="mt-1 font-vt323 text-[10px] text-[#7c2d12]">
                      Req: {appAccessMap[app.id].requiredRankLabel}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </section>
        )}

        {view === 'app' && (
          <section className="trash-mate-app">
            <div className="trash-mate-app-header">
              <button
                type="button"
                className="trash-mate-button"
                onClick={() => setView('home')}
              >
                ← Home
              </button>
              <div>
                <div className="trash-mate-app-title">{activeApp.name}</div>
                <div className="trash-mate-app-subtitle">{activeApp.description}</div>
              </div>
            </div>
            <div className="trash-mate-app-body">{activeApp.component}</div>
          </section>
        )}
      </main>

      <nav className="trash-mate-nav">
        <button
          type="button"
          className={`trash-mate-nav-item ${view === 'home' ? 'active' : ''}`}
          onClick={() => setView('home')}
        >
          <span>🏠</span>
          <span>Home</span>
        </button>
        <button
          type="button"
          className={`trash-mate-nav-item ${activeAppId === 'secta-trash' ? 'active' : ''}`}
          onClick={() => openApp('secta-trash')}
        >
          <span>🎮</span>
          <span>Secta</span>
        </button>
        <button
          type="button"
          className={`trash-mate-nav-item ${activeAppId === 'trashtienda' ? 'active' : ''}`}
          onClick={() => openApp('trashtienda')}
        >
          <span>🛍️</span>
          <span>Shop</span>
        </button>
        <button
          type="button"
          className={`trash-mate-nav-item ${activeAppId === 'grimorio' ? 'active' : ''}`}
          onClick={() => openApp('grimorio')}
        >
          <span>📖</span>
          <span>Zine</span>
        </button>
        <button
          type="button"
          className={`trash-mate-nav-item ${activeAppId === 'stalker-zone' ? 'active' : ''}`}
          onClick={() => openApp('stalker-zone')}
        >
          <span>👾</span>
          <span>Social</span>
        </button>
        <button
          type="button"
          className={`trash-mate-nav-item ${activeAppId === 'xxxperience' ? 'active' : ''}`}
          onClick={() => openApp('xxxperience')}
        >
          <span>🕹️</span>
          <span>Play</span>
        </button>
      </nav>
    </div>
  );
}
