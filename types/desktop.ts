// Desktop Types
export interface DesktopIcon {
  id: string;
  name: string;
  icon: string;
  route?: string;
  action?: string;
  description: string;
  position: {
    x: number;
    y: number;
  };
  locked?: boolean;
  hidden?: boolean;
  requiredRank?: string;
}

export interface DesktopState {
  icons: DesktopIcon[];
  selectedIconId: string | null;
  wallpaper: string;
  theme: 'trash-os' | 'trash-mate';
}

export interface WallpaperConfig {
  id: string;
  name: string;
  url: string;
  thumbnail: string;
  unlockRequirement?: string;
}
