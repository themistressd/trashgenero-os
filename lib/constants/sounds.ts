/**
 * Sound effects configuration
 */

export interface SoundConfig {
  id: string;
  name: string;
  path: string;
  volume?: number;
}

export const SOUNDS: Record<string, SoundConfig> = {
  // System sounds
  startup: {
    id: 'startup',
    name: 'Sistema Iniciando',
    path: '/sounds/system/startup.mp3',
    volume: 0.7,
  },
  shutdown: {
    id: 'shutdown',
    name: 'Sistema Cerrando',
    path: '/sounds/system/shutdown.mp3',
    volume: 0.7,
  },
  error: {
    id: 'error',
    name: 'Error',
    path: '/sounds/system/error.mp3',
    volume: 0.5,
  },
  
  // Window sounds
  windowOpen: {
    id: 'windowOpen',
    name: 'Ventana Abierta',
    path: '/sounds/windows/open.mp3',
    volume: 0.4,
  },
  windowClose: {
    id: 'windowClose',
    name: 'Ventana Cerrada',
    path: '/sounds/windows/close.mp3',
    volume: 0.4,
  },
  windowMinimize: {
    id: 'windowMinimize',
    name: 'Ventana Minimizada',
    path: '/sounds/windows/minimize.mp3',
    volume: 0.4,
  },
  windowMaximize: {
    id: 'windowMaximize',
    name: 'Ventana Maximizada',
    path: '/sounds/windows/maximize.mp3',
    volume: 0.4,
  },
  
  // UI sounds
  click: {
    id: 'click',
    name: 'Click',
    path: '/sounds/ui/click.mp3',
    volume: 0.3,
  },
  hover: {
    id: 'hover',
    name: 'Hover',
    path: '/sounds/ui/hover.mp3',
    volume: 0.2,
  },
  notification: {
    id: 'notification',
    name: 'Notificación',
    path: '/sounds/ui/notification.mp3',
    volume: 0.5,
  },
  
  // Purchase sounds
  addToCart: {
    id: 'addToCart',
    name: 'Añadir al Carrito',
    path: '/sounds/purchase/add-to-cart.mp3',
    volume: 0.5,
  },
  checkout: {
    id: 'checkout',
    name: 'Checkout',
    path: '/sounds/purchase/checkout.mp3',
    volume: 0.6,
  },
  purchaseComplete: {
    id: 'purchaseComplete',
    name: 'Compra Completada',
    path: '/sounds/purchase/complete.mp3',
    volume: 0.7,
  },
  
  // Gamification sounds
  pointsEarned: {
    id: 'pointsEarned',
    name: 'Puntos Ganados',
    path: '/sounds/gamification/points-earned.mp3',
    volume: 0.6,
  },
  rankUp: {
    id: 'rankUp',
    name: 'Subida de Rango',
    path: '/sounds/gamification/rank-up.mp3',
    volume: 0.8,
  },
  achievementUnlocked: {
    id: 'achievementUnlocked',
    name: 'Logro Desbloqueado',
    path: '/sounds/gamification/achievement.mp3',
    volume: 0.7,
  },
  
  // Special sounds
  glitch: {
    id: 'glitch',
    name: 'Glitch',
    path: '/sounds/effects/glitch.mp3',
    volume: 0.5,
  },
  static: {
    id: 'static',
    name: 'Estática',
    path: '/sounds/effects/static.mp3',
    volume: 0.3,
  },
};

/**
 * Get sound by ID
 */
export const getSoundById = (id: string): SoundConfig | undefined => {
  return SOUNDS[id];
};

/**
 * Preload sounds
 */
export const preloadSounds = (soundIds: string[]): void => {
  if (typeof window === 'undefined') return;

  soundIds.forEach((id) => {
    const sound = getSoundById(id);
    if (sound) {
      const audio = new Audio(sound.path);
      audio.preload = 'auto';
    }
  });
};

/**
 * Play sound
 */
export const playSound = (id: string, options?: { volume?: number }): void => {
  if (typeof window === 'undefined') return;

  const enableSounds = process.env.NEXT_PUBLIC_ENABLE_SOUNDS !== 'false';
  if (!enableSounds) return;

  const persistedPreference = localStorage.getItem('trash-os-sounds');
  if (persistedPreference === 'false') return;

  const sound = getSoundById(id);
  if (!sound) return;

  const audio = new Audio(sound.path);
  audio.volume = options?.volume ?? sound.volume ?? 0.5;
  audio.play().catch((error) => {
    console.warn(`Failed to play sound ${id}:`, error);
  });
};
