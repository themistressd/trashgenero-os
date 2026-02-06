'use client';

import React, { useMemo, useState } from 'react';
import SectaTrash from '@/components/apps/SectaTrash/SectaTrash';
import Trashtienda from '@/components/apps/Trashtienda/Trashtienda';
import MistressD from '@/components/apps/MistressD/MistressD';
import Divas from '@/components/apps/Divas/Divas';
import Centerfolds from '@/components/apps/Centerfolds/Centerfolds';
import StalkerZone from '@/components/apps/StalkerZone/StalkerZone';

type TrashMateView = 'home' | 'app';

interface TrashMateApp {
  id: string;
  name: string;
  icon: string;
  description: string;
  component: React.ReactNode;
}

export default function TrashMateShell() {
  const [view, setView] = useState<TrashMateView>('home');
  const [activeAppId, setActiveAppId] = useState<string>('secta-trash');

  const apps = useMemo<TrashMateApp[]>(
    () => [
      {
        id: 'secta-trash',
        name: 'SectaTrash.exe',
        icon: '🎮',
        description: 'Perfil, rangos y puntos.',
        component: <SectaTrash />,
      },
      {
        id: 'trashtienda',
        name: 'Trashtienda.exe',
        icon: '🛍️',
        description: 'Compras y drops rituales.',
        component: <Trashtienda />,
      },
      {
        id: 'mistress-d',
        name: 'Mistress D.exe',
        icon: '📝',
        description: 'Archivo personal y manifiesto.',
        component: <MistressD />,
      },
      {
        id: 'divas',
        name: 'Divas.rar',
        icon: '💿',
        description: 'Lore de divas y personajes.',
        component: <Divas />,
      },
      {
        id: 'centerfolds',
        name: 'CENTERFOLDS.zip',
        icon: '📸',
        description: 'Lookbooks y editoriales.',
        component: <Centerfolds />,
      },
      {
        id: 'stalker-zone',
        name: 'STsLK3R_Z0NE',
        icon: '👾',
        description: 'Social y transmisiones.',
        component: <StalkerZone />,
      },
    ],
    []
  );

  const activeApp = apps.find((app) => app.id === activeAppId) ?? apps[0];

  const openApp = (id: string) => {
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

            <div className="trash-mate-grid">
              {apps.map((app) => (
                <button
                  key={app.id}
                  type="button"
                  className="trash-mate-icon"
                  onClick={() => openApp(app.id)}
                >
                  <span className="trash-mate-icon-emoji">{app.icon}</span>
                  <span className="trash-mate-icon-label">{app.name}</span>
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
          className={`trash-mate-nav-item ${activeAppId === 'stalker-zone' ? 'active' : ''}`}
          onClick={() => openApp('stalker-zone')}
        >
          <span>👾</span>
          <span>Social</span>
        </button>
      </nav>
    </div>
  );
}
