'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { DndContext, type DragEndEvent, type DragStartEvent } from '@dnd-kit/core';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { useBootStore } from '@/lib/store/bootStore';
import { useWindowStore } from '@/lib/store/windowStore';
import CRTScreen from '@/components/effects/CRTScreen';
import Scanlines from '@/components/effects/Scanlines';
import StaticNoise from '@/components/effects/StaticNoise';
import Window from '@/components/desktop/Window';
import Taskbar from '@/components/desktop/Taskbar';
import StartMenu from '@/components/desktop/StartMenu';
import DesktopWallpaper from '@/components/desktop/DesktopWallpaper';
import DesktopIcon from '@/components/desktop/DesktopIcon';
import SectaTrash from '@/components/apps/SectaTrash/SectaTrash';
import Trashtienda from '@/components/apps/Trashtienda/Trashtienda';
import MistressD from '@/components/apps/MistressD/MistressD';
import Divas from '@/components/apps/Divas/Divas';
import StalkerZone from '@/components/apps/StalkerZone/StalkerZone';
import Centerfolds from '@/components/apps/Centerfolds/Centerfolds';
import XXXperience from '@/components/apps/XXXperience/XXXperience';
import MiSecta from '@/components/apps/MiSecta/MiSecta';
import Rituales from '@/components/apps/Rituales/Rituales';
import Altar from '@/components/apps/Altar/Altar';
import Grimorio from '@/components/apps/Grimorio/Grimorio';
import Transmisiones from '@/components/apps/Transmisiones/Transmisiones';
import PesetrashWallet from '@/components/apps/PesetrashWallet/PesetrashWallet';
import Carrito from '@/components/apps/Carrito/Carrito';
import Ajustes from '@/components/apps/Ajustes/Ajustes';
import NotificationToaster from '@/components/ui/NotificationToaster';
import TrashMateShell from '@/components/mobile/TrashMateShell';
import { DESKTOP_ICONS } from '@/lib/constants/icons';
import { WALLPAPERS } from '@/lib/constants/wallpapers';
import { useNotifications } from '@/lib/store/notificationStore';
import { useGamification } from '@/lib/hooks/useGamification';
import { canAccessRoute, getRouteByPath } from '@/lib/constants/routes';
import { getRankNameBySlug } from '@/lib/constants/ranks';
import '@/styles/themes/trash-os.css';

const ICON_GRID_SIZE = 88;
const ICON_PADDING = 12;

export default function DesktopPage() {
  const router = useRouter();
  const { hasBooted } = useBootStore();
  const {
    windows,
    openWindow,
    minimizeWindow,
    maximizeWindow,
    closeWindow,
    updateWindowPosition,
    updateWindowSize,
    updateWindowSnap,
    focusWindow,
  } = useWindowStore();
  const notifications = useNotifications();
  const { gamification } = useGamification();
  const containerRef = useRef<HTMLDivElement>(null);

  // State for icon positions with localStorage
  const [iconPositions, setIconPositions] = useState<Record<string, { x: number; y: number }>>(() => {
    if (typeof window === 'undefined') return {};
    const saved = localStorage.getItem('desktop-icon-positions');
    if (!saved) return {};
    try {
      const parsed = JSON.parse(saved);
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch {
      localStorage.removeItem('desktop-icon-positions');
      return {};
    }
  });
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [activeWallpaperId, setActiveWallpaperId] = useState(() => {
    if (typeof window === 'undefined') return 'void';
    return localStorage.getItem('desktop-wallpaper') || 'void';
  });
  const [recentApps, setRecentApps] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('desktop-recent-apps');
    if (!saved) return [];
    try {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      localStorage.removeItem('desktop-recent-apps');
      return [];
    }
  });
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(max-width: 768px)').matches;
  });

  const activeWallpaper = useMemo(
    () => WALLPAPERS.find((wallpaper) => wallpaper.id === activeWallpaperId) || WALLPAPERS[0],
    [activeWallpaperId]
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const listener = (event: MediaQueryListEvent) => setIsMobile(event.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    // Check if boot sequence should be shown
    const enableBootSequence = process.env.NEXT_PUBLIC_ENABLE_BOOT_SEQUENCE === 'true';
    
    if (enableBootSequence && !hasBooted) {
      router.push('/bios');
    }
  }, [hasBooted, router]);

  // Handler for double-clicking icons
  const handleIconDoubleClick = (iconId: string) => {
    const icon = DESKTOP_ICONS.find((i) => i.id === iconId);
    if (!icon) return;

    const userRank = gamification?.rank?.slug;
    const canOpen = icon.route ? canAccessRoute(icon.route, userRank) : true;
    if (!canOpen) {
      const route = icon.route ? getRouteByPath(icon.route) : undefined;
      const requiredRank = route?.requiredRank
        ? getRankNameBySlug(route.requiredRank)
        : 'rango superior';
      notifications.warning(
        `${icon.name} bloqueada`,
        `Necesitas alcanzar ${requiredRank} para abrir esta app.`
      );
      return;
    }

    setRecentApps((prev) => {
      const next = [iconId, ...prev.filter((id) => id !== iconId)].slice(0, 6);
      localStorage.setItem('desktop-recent-apps', JSON.stringify(next));
      return next;
    });
    notifications.info(`Abriendo ${icon.name}`, 'Inicializando aplicación...');

    openWindow({
      id: iconId,
      title: icon.name,
      icon: icon.icon,
      component: icon.route || iconId,
      position: { x: 100 + windows.length * 30, y: 100 + windows.length * 30 },
      size: { width: 600, height: 400 },
    });
  };

  const handleStartClick = () => {
    setIsStartMenuOpen((prev) => !prev);
  };

  const handleSelectWallpaper = (wallpaperId: string) => {
    setActiveWallpaperId(wallpaperId);
    localStorage.setItem('desktop-wallpaper', wallpaperId);
  };

  const handleTaskbarWindowClick = (id: string) => {
    const window = windows.find((item) => item.id === id);
    if (!window) return;
    if (window.isMinimized) {
      minimizeWindow(id);
    }
    focusWindow(id);
  };

  const handleIconPositionChange = (id: string, position: { x: number; y: number }) => {
    const updated = { ...iconPositions, [id]: position };
    setIconPositions(updated);
    try {
      localStorage.setItem('desktop-icon-positions', JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save icon positions to localStorage:', error);
    }
  };

  const iconPositionMap = useMemo(
    () =>
      DESKTOP_ICONS.reduce<Record<string, { x: number; y: number }>>((acc, icon) => {
        acc[icon.id] = iconPositions[icon.id] || icon.position;
        return acc;
      }, {}),
    [iconPositions]
  );

  const occupiedIconKeys = useMemo(() => {
    const keys = new Set<string>();
    Object.values(iconPositionMap).forEach((pos) => {
      keys.add(`${pos.x},${pos.y}`);
    });
    return keys;
  }, [iconPositionMap]);

  const handleDragStart = (event: DragStartEvent) => {
    const id = String(event.active.id);
    focusWindow(id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    const id = String(active.id);
    const windowData = windows.find((item) => item.id === id);
    if (!windowData || windowData.isMaximized) return;

    const nextPosition = {
      x: windowData.position.x + delta.x,
      y: windowData.position.y + delta.y,
    };

    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : windowData.size.width;
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight - 40 : windowData.size.height;
    const snapThreshold = 40;
    const maxX = Math.max(0, viewportWidth - windowData.size.width);
    const maxY = Math.max(0, viewportHeight - windowData.size.height);

    if (nextPosition.y <= snapThreshold) {
      maximizeWindow(id);
      return;
    }

    if (nextPosition.x <= snapThreshold) {
      updateWindowPosition(id, { x: 0, y: 0 });
      updateWindowSize(id, {
        width: Math.floor(viewportWidth / 2),
        height: viewportHeight,
      });
      updateWindowSnap(id, 'left');
      return;
    }

    if (nextPosition.x + windowData.size.width >= viewportWidth - snapThreshold) {
      updateWindowPosition(id, { x: Math.floor(viewportWidth / 2), y: 0 });
      updateWindowSize(id, {
        width: Math.floor(viewportWidth / 2),
        height: viewportHeight,
      });
      updateWindowSnap(id, 'right');
      return;
    }

    const clampedPosition = {
      x: Math.max(0, Math.min(maxX, nextPosition.x)),
      y: Math.max(0, Math.min(maxY, nextPosition.y)),
    };
    updateWindowPosition(id, clampedPosition);
    updateWindowSnap(id, null);
  };

  if (isMobile) {
    return <TrashMateShell />;
  }

  return (
    <CRTScreen turnOn flicker={false}>
      <div
        className="desktop-background relative min-h-screen"
        onClick={() => setIsStartMenuOpen(false)}
      >
        <DesktopWallpaper wallpaper={activeWallpaper} />
        <Scanlines animated />
        <StaticNoise opacity={0.03} intensity="low" />

        {/* Desktop Icons */}
        <div ref={containerRef} className="relative z-10 p-4 w-full h-full">
          <div className="grid gap-4">
            {DESKTOP_ICONS.map((icon) => {
              const currentPosition = iconPositionMap[icon.id];
              const occupiedKeys = new Set(occupiedIconKeys);
              occupiedKeys.delete(`${currentPosition.x},${currentPosition.y}`);
              return (
                <DesktopIcon
                  key={icon.id}
                  id={icon.id}
                  icon={icon.icon}
                  name={icon.name}
                  position={currentPosition}
                  gridSize={ICON_GRID_SIZE}
                  padding={ICON_PADDING}
                  occupiedKeys={occupiedKeys}
                  containerRef={containerRef}
                  onDoubleClick={handleIconDoubleClick}
                  onPositionChange={handleIconPositionChange}
                />
              );
            })}
          </div>
        </div>

        {/* Windows */}
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <AnimatePresence>
            {windows.map((window) => (
              <Window
                key={window.id}
                id={window.id}
                title={window.title}
                icon={window.icon}
              >
                {/* Render Trashtienda component */}
                {(window.component === 'trashtienda' || window.component === '/apps/trashtienda') && (
                  <Trashtienda />
                )}

                {/* Render SectaTrash component */}
                {(window.component === 'secta-trash' || window.component === '/apps/secta-trash') && (
                  <SectaTrash />
                )}

                {/* Render MistressD component */}
                {(window.component === 'mistress-d' || window.component === '/apps/mistress-d') && (
                  <MistressD />
                )}

                {/* Render Divas component */}
                {(window.component === 'divas' || window.component === '/apps/divas') && (
                  <Divas />
                )}

                {/* Render StalkerZone component */}
                {(window.component === 'stalker-zone' || window.component === '/apps/stalker-zone') && (
                  <StalkerZone />
                )}

                {/* Render Centerfolds component */}
                {(window.component === 'centerfolds' || window.component === '/apps/centerfolds') && (
                  <Centerfolds />
                )}

                {(window.component === 'xxxperience' || window.component === '/apps/xxxperience') && (
                  <XXXperience />
                )}

                {(window.component === 'mi-secta' || window.component === '/apps/mi-secta') && (
                  <MiSecta />
                )}

                {(window.component === 'rituales' || window.component === '/apps/rituales') && (
                  <Rituales />
                )}

                {(window.component === 'altar' || window.component === '/apps/altar') && (
                  <Altar />
                )}

                {(window.component === 'grimorio' || window.component === '/apps/grimorio') && (
                  <Grimorio />
                )}

                {(window.component === 'transmisiones' || window.component === '/apps/transmisiones') && (
                  <Transmisiones />
                )}

                {(window.component === 'pesetrash-wallet' || window.component === '/apps/pesetrash-wallet') && (
                  <PesetrashWallet />
                )}

                {(window.component === 'carrito' || window.component === '/apps/carrito') && (
                  <Carrito />
                )}

                {(window.component === 'ajustes' || window.component === '/apps/ajustes') && (
                  <Ajustes />
                )}
                
                {/* Default placeholder for other apps */}
                {window.component !== 'trashtienda' && 
                 window.component !== '/apps/trashtienda' &&
                 window.component !== 'secta-trash' && 
                 window.component !== '/apps/secta-trash' &&
                 window.component !== 'mistress-d' && 
                 window.component !== '/apps/mistress-d' &&
                 window.component !== 'divas' && 
                 window.component !== '/apps/divas' &&
                 window.component !== 'stalker-zone' && 
                 window.component !== '/apps/stalker-zone' &&
                 window.component !== 'centerfolds' && 
                 window.component !== '/apps/centerfolds' &&
                 window.component !== 'xxxperience' &&
                 window.component !== '/apps/xxxperience' &&
                 window.component !== 'mi-secta' &&
                 window.component !== '/apps/mi-secta' &&
                 window.component !== 'rituales' &&
                 window.component !== '/apps/rituales' &&
                 window.component !== 'altar' &&
                 window.component !== '/apps/altar' &&
                 window.component !== 'grimorio' &&
                 window.component !== '/apps/grimorio' &&
                 window.component !== 'transmisiones' &&
                 window.component !== '/apps/transmisiones' &&
                 window.component !== 'pesetrash-wallet' &&
                 window.component !== '/apps/pesetrash-wallet' &&
                 window.component !== 'carrito' &&
                 window.component !== '/apps/carrito' &&
                 window.component !== 'ajustes' &&
                 window.component !== '/apps/ajustes' && (
                  <div className="font-vt323 text-lg p-4">
                    <h2 className="text-2xl font-bold text-[#FF00FF] mb-4">
                      {window.title}
                    </h2>
                    <p className="text-gray-800">Contenido de {window.component}</p>
                    <p className="text-gray-600 mt-2">Esta ventana es funcional y se puede arrastrar, minimizar, maximizar y cerrar.</p>
                  </div>
                )}
              </Window>
            ))}
          </AnimatePresence>
        </DndContext>

        {/* Taskbar */}
        <Taskbar
          windows={windows}
          onStartClick={handleStartClick}
          onWindowClick={handleTaskbarWindowClick}
          onWindowMinimize={minimizeWindow}
          onWindowMaximize={maximizeWindow}
          onWindowClose={closeWindow}
        />

        <StartMenu
          isOpen={isStartMenuOpen}
          icons={DESKTOP_ICONS}
          wallpapers={WALLPAPERS}
          activeWallpaperId={activeWallpaperId}
          recentApps={recentApps
            .map((id) => DESKTOP_ICONS.find((icon) => icon.id === id))
            .filter((icon): icon is (typeof DESKTOP_ICONS)[number] => Boolean(icon))}
          onOpenApp={(icon) => handleIconDoubleClick(icon.id)}
          onSelectWallpaper={(wallpaper) => handleSelectWallpaper(wallpaper.id)}
          onClose={() => setIsStartMenuOpen(false)}
        />

        {/* Welcome Message - Only show when no windows open */}
        {windows.length === 0 && (
          <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 text-center">
            <h1 className="mb-4 font-vcr text-4xl text-bubblegum-pink drop-shadow-[0_0_10px_rgba(255,0,255,0.5)]">
              TrashGènero OS
            </h1>
            <p className="font-vt323 text-xl text-hacker-green drop-shadow-[0_0_10px_rgba(0,255,0,0.5)]">
              Digital Witchcraft meets Windows 95
            </p>
            <p className="mt-4 font-vt323 text-sm text-system-gray">
              Double-click an icon to open
            </p>
          </div>
        )}
        <NotificationToaster />
      </div>
    </CRTScreen>
  );
}
