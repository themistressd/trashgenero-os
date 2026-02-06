'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
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
  const menuRef = useRef<HTMLDivElement>(null);
  const [menu, setMenu] = useState<{
    id: string;
    x: number;
    y: number;
  } | null>(null);
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null);

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

  useLayoutEffect(() => {
    if (!menu || !menuRef.current) return;
    const { innerWidth, innerHeight } = window;
    const { offsetWidth, offsetHeight } = menuRef.current;
    const padding = 8;
    let nextX = menu.x;
    let nextY = menu.y;

    if (nextX + offsetWidth + padding > innerWidth) {
      nextX = innerWidth - offsetWidth - padding;
    }
    if (nextY + offsetHeight + padding > innerHeight) {
      nextY = innerHeight - offsetHeight - padding;
    }

    nextX = Math.max(padding, nextX);
    nextY = Math.max(padding, nextY);
    setMenuPosition({ x: nextX, y: nextY });
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
              setMenuPosition(null);
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
          ref={menuRef}
          className="taskbar-context"
          style={{
            left: menuPosition?.x ?? menu.x,
            top: menuPosition?.y ?? menu.y,
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
