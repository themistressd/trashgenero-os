'use client';

import React, { useEffect, useState } from 'react';
import type { Window } from '@/lib/store/windowStore';
import Clock from './Clock';

interface TaskbarProps {
  windows: Window[];
  onStartClick: () => void;
  onWindowClick: (id: string) => void;
  onWindowMinimize: (id: string) => void;
  onWindowMaximize: (id: string) => void;
  onWindowClose: (id: string) => void;
}

export default function Taskbar({
  windows,
  onStartClick,
  onWindowClick,
  onWindowMinimize,
  onWindowMaximize,
  onWindowClose,
}: TaskbarProps) {
  const [menu, setMenu] = useState<{
    id: string;
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    if (!menu) return;
    const handleClick = () => setMenu(null);
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenu(null);
    };
    window.addEventListener('click', handleClick);
    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [menu]);

  const activeWindow = menu ? windows.find((window) => window.id === menu.id) : null;

  return (
    <div className="taskbar fixed bottom-0 left-0 right-0 z-50">
      <button
        className="win95-button flex items-center gap-2"
        onClick={(event) => {
          event.stopPropagation();
          onStartClick();
        }}
      >
        <span className="text-xl">⚡</span>
        <span className="font-vt323 text-base">Inicio</span>
      </button>

      <div className="taskbar-windows">
        {windows.map((window) => (
          <button
            key={window.id}
            className={`taskbar-button ${window.isMinimized ? 'minimized' : 'active'}`}
            onClick={() => onWindowClick(window.id)}
            onContextMenu={(event) => {
              event.preventDefault();
              setMenu({ id: window.id, x: event.clientX, y: event.clientY });
            }}
            title={window.title}
          >
            <span className="taskbar-button-icon">{window.icon}</span>
            <span className="taskbar-button-label">{window.title}</span>
          </button>
        ))}
      </div>

      {menu && activeWindow && (
        <div
          className="taskbar-context"
          style={{
            left: menu.x,
            top: menu.y,
          }}
          role="menu"
        >
          <button
            className="taskbar-context-item"
            onClick={() => {
              onWindowMinimize(activeWindow.id);
              setMenu(null);
            }}
            type="button"
          >
            {activeWindow.isMinimized ? 'Restaurar' : 'Minimizar'}
          </button>
          <button
            className="taskbar-context-item"
            onClick={() => {
              onWindowMaximize(activeWindow.id);
              setMenu(null);
            }}
            type="button"
          >
            {activeWindow.isMaximized ? 'Restaurar tamaño' : 'Maximizar'}
          </button>
          <button
            className="taskbar-context-item danger"
            onClick={() => {
              onWindowClose(activeWindow.id);
              setMenu(null);
            }}
            type="button"
          >
            Cerrar
          </button>
        </div>
      )}

      <div className="taskbar-tray">
        <div className="taskbar-stats">
          <span>🪙 0</span>
          <span>🃏 0</span>
          <span>💎 0</span>
        </div>
        <Clock />
      </div>
    </div>
  );
}
