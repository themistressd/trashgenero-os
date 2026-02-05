'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useBootStore } from '@/lib/store/bootStore';
import { useWindowStore } from '@/lib/store/windowStore';
import CRTScreen from '@/components/effects/CRTScreen';
import Scanlines from '@/components/effects/Scanlines';
import StaticNoise from '@/components/effects/StaticNoise';
import Window from '@/components/desktop/Window';
import Taskbar from '@/components/desktop/Taskbar';
import StartMenu from '@/components/desktop/StartMenu';
import DesktopWallpaper from '@/components/desktop/DesktopWallpaper';
import SectaTrash from '@/components/apps/SectaTrash/SectaTrash';
import Trashtienda from '@/components/apps/Trashtienda/Trashtienda';
import MistressD from '@/components/apps/MistressD/MistressD';
import Divas from '@/components/apps/Divas/Divas';
import StalkerZone from '@/components/apps/StalkerZone/StalkerZone';
import Centerfolds from '@/components/apps/Centerfolds/Centerfolds';
import { DESKTOP_ICONS } from '@/lib/constants/icons';
import { WALLPAPERS } from '@/lib/constants/wallpapers';
import '@/styles/themes/trash-os.css';

export default function DesktopPage() {
  const router = useRouter();
  const { hasBooted } = useBootStore();
  const { windows, openWindow, minimizeWindow, focusWindow } = useWindowStore();
  const containerRef = useRef<HTMLDivElement>(null);

  // State for icon positions with localStorage
  const [iconPositions, setIconPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [isClient, setIsClient] = useState(false);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [activeWallpaperId, setActiveWallpaperId] = useState('void');

  const activeWallpaper = useMemo(
    () => WALLPAPERS.find((wallpaper) => wallpaper.id === activeWallpaperId) || WALLPAPERS[0],
    [activeWallpaperId]
  );

  useEffect(() => {
    // Set client-side flag and load positions from localStorage
    setIsClient(true);
    const saved = localStorage.getItem('desktop-icon-positions');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Validate structure
        if (parsed && typeof parsed === 'object') {
          setIconPositions(parsed);
        }
      } catch (error) {
        console.error('Failed to parse icon positions from localStorage:', error);
        localStorage.removeItem('desktop-icon-positions');
      }
    }

    const savedWallpaper = localStorage.getItem('desktop-wallpaper');
    if (savedWallpaper) {
      setActiveWallpaperId(savedWallpaper);
    }
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
            {isClient && DESKTOP_ICONS.map((icon) => (
              <motion.div
                key={icon.id}
                drag
                dragMomentum={false}
                dragElastic={0}
                dragConstraints={containerRef}
                onDragEnd={(e, info) => {
                  // info.point gives absolute position on page, we need relative to container
                  const currentPos = iconPositions[icon.id] || icon.position;
                  const newPos = {
                    x: currentPos.x + info.offset.x,
                    y: currentPos.y + info.offset.y,
                  };
                  const updated = { ...iconPositions, [icon.id]: newPos };
                  setIconPositions(updated);
                  try {
                    localStorage.setItem('desktop-icon-positions', JSON.stringify(updated));
                  } catch (error) {
                    console.error('Failed to save icon positions to localStorage:', error);
                  }
                }}
                style={{
                  position: 'absolute',
                  left: iconPositions[icon.id]?.x || icon.position.x,
                  top: iconPositions[icon.id]?.y || icon.position.y,
                }}
                className="desktop-icon cursor-move"
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  handleIconDoubleClick(icon.id);
                }}
              >
                <div className="desktop-icon-image">{icon.icon}</div>
                <div className="desktop-icon-name">{icon.name}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Windows */}
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
               window.component !== '/apps/centerfolds' && (
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

        {/* Taskbar */}
        <Taskbar
          windows={windows}
          onStartClick={handleStartClick}
          onWindowClick={handleTaskbarWindowClick}
        />

        <StartMenu
          isOpen={isStartMenuOpen}
          icons={DESKTOP_ICONS}
          wallpapers={WALLPAPERS}
          activeWallpaperId={activeWallpaperId}
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
      </div>
    </CRTScreen>
  );
}
