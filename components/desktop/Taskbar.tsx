'use client';

import React from 'react';
import type { Window } from '@/lib/store/windowStore';
import Clock from './Clock';

interface TaskbarProps {
  windows: Window[];
  onStartClick: () => void;
  onWindowClick: (id: string) => void;
}

export default function Taskbar({ windows, onStartClick, onWindowClick }: TaskbarProps) {
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
            title={window.title}
          >
            <span className="taskbar-button-icon">{window.icon}</span>
            <span className="taskbar-button-label">{window.title}</span>
          </button>
        ))}
      </div>

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
