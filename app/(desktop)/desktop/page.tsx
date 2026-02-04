'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useBootStore } from '@/lib/store/bootStore';
import CRTScreen from '@/components/effects/CRTScreen';
import Scanlines from '@/components/effects/Scanlines';
import StaticNoise from '@/components/effects/StaticNoise';
import { DESKTOP_ICONS } from '@/lib/constants/icons';
import '@/styles/themes/trash-os.css';

export default function DesktopPage() {
  const router = useRouter();
  const { hasBooted } = useBootStore();

  useEffect(() => {
    // Check if boot sequence should be shown
    const enableBootSequence = process.env.NEXT_PUBLIC_ENABLE_BOOT_SEQUENCE === 'true';
    
    if (enableBootSequence && !hasBooted) {
      router.push('/bios');
    }
  }, [hasBooted, router]);

  return (
    <CRTScreen turnOn flicker={false}>
      <div className="desktop-background relative min-h-screen">
        <Scanlines animated />
        <StaticNoise opacity={0.03} intensity="low" />

        {/* Desktop Icons */}
        <div className="relative z-10 p-4">
          <div className="grid gap-4">
            {DESKTOP_ICONS.slice(0, 3).map((icon) => (
              <div
                key={icon.id}
                className="desktop-icon"
                style={{
                  position: 'absolute',
                  left: icon.position.x,
                  top: icon.position.y,
                }}
              >
                <div className="desktop-icon-image">{icon.icon}</div>
                <div className="desktop-icon-name">{icon.name}</div>
              </div>
            ))}
          </div>
        </div>

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

        {/* Welcome Message */}
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
      </div>
    </CRTScreen>
  );
}
