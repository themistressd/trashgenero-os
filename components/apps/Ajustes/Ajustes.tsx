'use client';

import React, { useEffect, useState } from 'react';
import { WALLPAPERS } from '@/lib/constants/wallpapers';

export default function Ajustes() {
  const [selectedWallpaper, setSelectedWallpaper] = useState('void');
  const [soundsEnabled, setSoundsEnabled] = useState(true);

  useEffect(() => {
    const savedWallpaper = localStorage.getItem('desktop-wallpaper');
    if (savedWallpaper) {
      setSelectedWallpaper(savedWallpaper);
    }
    const savedSounds = localStorage.getItem('trash-os-sounds');
    if (savedSounds) {
      setSoundsEnabled(savedSounds !== 'false');
    }
  }, []);

  const handleWallpaperChange = (wallpaperId: string) => {
    setSelectedWallpaper(wallpaperId);
    localStorage.setItem('desktop-wallpaper', wallpaperId);
  };

  const handleSoundToggle = () => {
    setSoundsEnabled((prev) => {
      const next = !prev;
      localStorage.setItem('trash-os-sounds', String(next));
      return next;
    });
  };

  return (
    <div className="flex h-full flex-col gap-4 bg-[#c0c0c0] p-4">
      <div className="border-b-2 border-[#808080] pb-3">
        <div className="font-vcr text-2xl text-bubblegum-pink">Ajustes.exe</div>
        <div className="font-vt323 text-sm text-gray-700">
          Configura el sistema, wallpapers y preferencias.
        </div>
      </div>

      <div className="rounded border-2 border-[#808080] bg-[#dfdfdf] p-4">
        <div className="mb-2 font-vcr text-lg text-gray-800">Wallpaper activo</div>
        <div className="grid gap-2 md:grid-cols-2">
          {WALLPAPERS.map((wallpaper) => (
            <button
              key={wallpaper.id}
              type="button"
              onClick={() => handleWallpaperChange(wallpaper.id)}
              className={`flex items-center justify-between border-2 px-3 py-2 font-vt323 text-sm ${
                selectedWallpaper === wallpaper.id
                  ? 'border-bubblegum-pink bg-black text-white'
                  : 'border-[#808080] bg-white text-gray-800'
              }`}
            >
              <span>{wallpaper.name}</span>
              <span>{selectedWallpaper === wallpaper.id ? '✓' : ''}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded border-2 border-[#808080] bg-[#dfdfdf] p-4">
        <div className="mb-2 font-vcr text-lg text-gray-800">Sonidos del sistema</div>
        <button type="button" className="win95-button" onClick={handleSoundToggle}>
          {soundsEnabled ? 'Desactivar sonidos' : 'Activar sonidos'}
        </button>
      </div>
    </div>
  );
}
