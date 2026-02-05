export interface WallpaperOption {
  id: string;
  name: string;
  background: string;
}

export const WALLPAPERS: WallpaperOption[] = [
  {
    id: 'void',
    name: 'Void Black',
    background: 'radial-gradient(circle at top, #111 0%, #000 55%, #000 100%)',
  },
  {
    id: 'toxic-sunset',
    name: 'Toxic Sunset',
    background: 'linear-gradient(135deg, #ff00ff 0%, #7c3aed 45%, #000 100%)',
  },
  {
    id: 'hacker-grid',
    name: 'Hacker Grid',
    background:
      'linear-gradient(180deg, rgba(0,255,0,0.12) 0%, rgba(0,0,0,0.95) 70%), repeating-linear-gradient(90deg, rgba(0,255,0,0.08) 0 1px, transparent 1px 80px)',
  },
  {
    id: 'bubblegum-noise',
    name: 'Bubblegum Noise',
    background:
      'linear-gradient(160deg, rgba(255,0,255,0.35) 0%, rgba(0,0,0,0.9) 70%), radial-gradient(circle at 20% 20%, rgba(0,255,255,0.25) 0%, transparent 55%)',
  },
];
