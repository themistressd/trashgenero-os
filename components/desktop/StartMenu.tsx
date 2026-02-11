'use client';

import React, { useMemo, useState } from 'react';
import type { DesktopIcon } from '@/types/desktop';
import type { WallpaperOption } from '@/lib/constants/wallpapers';
import { useGamification } from '@/lib/hooks/useGamification';
import { canAccessRoute, getRouteByPath } from '@/lib/constants/routes';
import { getRankNameBySlug } from '@/lib/constants/ranks';

interface StartMenuProps {
  isOpen: boolean;
  icons: DesktopIcon[];
  wallpapers: WallpaperOption[];
  activeWallpaperId: string;
  recentApps: DesktopIcon[];
  onOpenApp: (icon: DesktopIcon) => void;
  onSelectWallpaper: (wallpaper: WallpaperOption) => void;
  onClose: () => void;
}

export default function StartMenu({
  isOpen,
  icons,
  wallpapers,
  activeWallpaperId,
  recentApps,
  onOpenApp,
  onSelectWallpaper,
  onClose,
}: StartMenuProps) {
  const [query, setQuery] = useState('');
  const [lockMessage, setLockMessage] = useState<string>('');
  const { gamification } = useGamification();

  const userRank = gamification?.rank?.slug;
  const iconAccessMap = useMemo(
    () =>
      Object.fromEntries(
        icons.map((icon) => {
          const canOpen = icon.route ? canAccessRoute(icon.route, userRank) : true;
          const route = icon.route ? getRouteByPath(icon.route) : undefined;
          const requiredRankLabel = route?.requiredRank
            ? getRankNameBySlug(route.requiredRank)
            : undefined;
          return [icon.id, { canOpen, requiredRankLabel }];
        })
      ),
    [icons, userRank]
  );

  if (!isOpen) return null;

  const categoryMap: Record<string, string> = {
    'secta-trash': 'Gamificación',
    'trashtienda': 'Shop',
    'mistress-d': 'Contenido',
    'divas': 'Contenido',
    'centerfolds': 'Contenido',
    'stalker-zone': 'Interactive',
  };

  const filteredIcons = icons.filter((icon) =>
    icon.name.toLowerCase().includes(query.toLowerCase())
  );

  const categorized = filteredIcons.reduce<Record<string, DesktopIcon[]>>((acc, icon) => {
    const category = categoryMap[icon.id] || 'Utilidades';
    acc[category] = acc[category] ? [...acc[category], icon] : [icon];
    return acc;
  }, {});


  const handleOpenIcon = (icon: DesktopIcon) => {
    const access = iconAccessMap[icon.id];
    if (access && !access.canOpen) {
      setLockMessage(
        `🔒 ${icon.name} requiere ${access.requiredRankLabel || 'un rango superior'}.`
      );
      return;
    }
    setLockMessage('');
    onOpenApp(icon);
    onClose();
  };

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
        <label className="start-menu-search">
          <span>🔎</span>
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar app..."
          />
        </label>
      </div>

      {lockMessage && (
        <div className="start-menu-section">
          <div className="win95-input bg-white p-2 font-vt323 text-xs text-[#7c2d12]">
            {lockMessage}
          </div>
        </div>
      )}

      {recentApps.length > 0 && (
        <div className="start-menu-section">
          <h3>Recientes</h3>
          <div className="start-menu-grid">
            {recentApps.map((icon) => (
              <button
                key={icon.id}
                className="start-menu-item"
                onClick={() => handleOpenIcon(icon)}
              >
                <span className="start-menu-item-icon">
                  {icon.icon}
                  {!iconAccessMap[icon.id]?.canOpen && <span className="ml-1 text-xs">🔒</span>}
                </span>
                <span>
                  <strong>{icon.name}</strong>
                  <small>{icon.description}</small>
                  {!iconAccessMap[icon.id]?.canOpen && iconAccessMap[icon.id]?.requiredRankLabel && (
                    <small className="block text-[#7c2d12]">Req: {iconAccessMap[icon.id].requiredRankLabel}</small>
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="start-menu-section">
        <h3>Apps</h3>
        {Object.entries(categorized).map(([category, items]) => (
          <div key={category} className="start-menu-category">
            <h4>{category}</h4>
            <div className="start-menu-grid">
              {items.map((icon) => (
                <button
                  key={icon.id}
                  className="start-menu-item"
                  onClick={() => handleOpenIcon(icon)}
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
        ))}
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
