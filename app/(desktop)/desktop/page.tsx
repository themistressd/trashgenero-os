'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useBootStore } from '@/lib/store/bootStore';
import { useWindowStore } from '@/lib/store/windowStore';
import CRTScreen from '@/components/effects/CRTScreen';
import Scanlines from '@/components/effects/Scanlines';
import StaticNoise from '@/components/effects/StaticNoise';
import Window from '@/components/desktop/Window';
import SectaTrash from '@/components/apps/SectaTrash/SectaTrash';
import { DESKTOP_ICONS } from '@/lib/constants/icons';
import '@/styles/themes/trash-os.css';

export default function DesktopPage() {
  const router = useRouter();
  const { hasBooted } = useBootStore();
  const { windows, openWindow } = useWindowStore();
  const containerRef = useRef<HTMLDivElement>(null);

  // State for icon positions with localStorage
  const [iconPositions, setIconPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [isClient, setIsClient] = useState(false);

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

  return (
    <CRTScreen turnOn flicker={false}>
      <div className="desktop-background relative min-h-screen">
        <Scanlines animated />
        <StaticNoise opacity={0.03} intensity="low" />

        {/* Desktop Icons */}
        <div ref={containerRef} className="relative z-10 p-4 w-full h-full">
          <div className="grid gap-4">
            {isClient && DESKTOP_ICONS.slice(0, 4).map((icon) => (
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
              initialPosition={window.position}
              initialSize={window.size}
            >
              {/* Render SectaTrash component */}
              {(window.component === 'secta-trash' || window.component === '/apps/secta-trash') && (
                <SectaTrash />
              )}
              
              {/* Default placeholder for other apps */}
              {window.component !== 'secta-trash' && window.component !== '/apps/secta-trash' && (
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
        <div className="taskbar fixed bottom-0 left-0 right-0 z-50">
          <button className="win95-button flex items-center gap-2">
            <span className="text-xl">⚡</span>
            <span className="font-vt323 text-base">Inicio</span>
          </button>

          <div className="ml-auto flex items-center gap-2 font-vt323 text-sm">
            <div className="flex items-center gap-1">
              <span>🪙</span>
              <span>0 Pesetrash</span>
            </div>
            <div className="flex items-center gap-1">
              <span>🃏</span>
              <span>0 Estampitas</span>
            </div>
            <div className="flex items-center gap-1">
              <span>💎</span>
              <span>0 Reliquias</span>
            </div>
          </div>
        </div>

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
