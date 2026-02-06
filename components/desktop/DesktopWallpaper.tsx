'use client';

import React from 'react';
import type { WallpaperOption } from '@/lib/constants/wallpapers';

interface DesktopWallpaperProps {
  wallpaper: WallpaperOption;
}

export default function DesktopWallpaper({ wallpaper }: DesktopWallpaperProps) {
  return (
    <div
      className="desktop-wallpaper"
      style={{
        backgroundImage: wallpaper.background,
      }}
    />
  );
}
