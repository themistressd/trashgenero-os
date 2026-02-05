'use client';

import React from 'react';
import type { DesktopIcon } from '@/types/desktop';
import type { WallpaperOption } from '@/lib/constants/wallpapers';

interface StartMenuProps {
  isOpen: boolean;
  icons: DesktopIcon[];
  wallpapers: WallpaperOption[];
  activeWallpaperId: string;
  onOpenApp: (icon: DesktopIcon) => void;
  onSelectWallpaper: (wallpaper: WallpaperOption) => void;
  onClose: () => void;
}

export default function StartMenu({
  isOpen,
  icons,
  wallpapers,
  activeWallpaperId,
  onOpenApp,
  onSelectWallpaper,
  onClose,
}: StartMenuProps) {
  if (!isOpen) return null;

  return (
    <div
      className="start-menu"
      role="menu"
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <div className="start-menu-header">
        <div className="start-menu-logo">⚡</div>
        <div>
          <p className="start-menu-title">TrashGènero OS</p>
          <p className="start-menu-subtitle">Digital Witchcraft System</p>
        </div>
      </div>

      <div className="start-menu-section">
        <h3>Apps destacadas</h3>
        <div className="start-menu-grid">
          {icons.slice(0, 6).map((icon) => (
            <button
              key={icon.id}
              className="start-menu-item"
              onClick={() => {
                onOpenApp(icon);
                onClose();
              }}
            >
              <span className="start-menu-item-icon">{icon.icon}</span>
              <span>
                <strong>{icon.name}</strong>
                <small>{icon.description}</small>
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="start-menu-section">
        <h3>Wallpapers</h3>
        <div className="start-menu-wallpapers">
          {wallpapers.map((wallpaper) => (
            <button
              key={wallpaper.id}
              className={`start-menu-wallpaper ${
                wallpaper.id === activeWallpaperId ? 'active' : ''
              }`}
              onClick={() => onSelectWallpaper(wallpaper)}
            >
              <span
                className="start-menu-wallpaper-thumb"
                style={{ backgroundImage: wallpaper.background }}
              />
              <span>{wallpaper.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="start-menu-footer">
        <button className="win95-button" onClick={onClose}>
          Cerrar menú
        </button>
      </div>
    </div>
  );
}
