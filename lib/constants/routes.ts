/**
 * Application routes configuration
 */

import { RANK_DISCOUNTS } from './ranks';

export interface RouteConfig {
  path: string;
  name: string;
  icon: string;
  description: string;
  requiredRank?: string;
  isPublic?: boolean;
}

const RANK_ORDER = Object.keys(RANK_DISCOUNTS);

const getRankIndex = (rankSlug?: string): number => {
  if (!rankSlug) return -1;
  return RANK_ORDER.indexOf(rankSlug);
};

export const ROUTES: Record<string, RouteConfig> = {
  // Boot routes
  bios: {
    path: '/bios',
    name: 'BIOS',
    icon: '⚡',
    description: 'Boot sequence - BIOS',
    isPublic: true,
  },
  glitch: {
    path: '/glitch',
    name: 'Glitch',
    icon: '✨',
    description: 'Boot sequence - Glitch logo',
    isPublic: true,
  },
  login: {
    path: '/login',
    name: 'Login',
    icon: '🔐',
    description: 'Auto-login sequence',
    isPublic: true,
  },

  // Desktop
  desktop: {
    path: '/',
    name: 'Desktop',
    icon: '🖥️',
    description: 'Main desktop',
    isPublic: false,
  },

  // Apps
  mistressD: {
    path: '/apps/mistress-d',
    name: 'Mistress D.exe',
    icon: '⚡',
    description: 'Bio, manifiesto y archivo personal',
    isPublic: false,
  },
  divas: {
    path: '/apps/divas',
    name: 'Divas.rar',
    icon: '👯‍♀️',
    description: 'Lore y personajes del universo TrashGènero',
    isPublic: false,
  },
  stalkerZone: {
    path: '/apps/stalker-zone',
    name: 'STsLK3R_Z0NE',
    icon: '📡',
    description: 'Social DOS: enlaces a IG, TikTok, OF y Twitter',
    isPublic: false,
  },
  xxxperience: {
    path: '/apps/xxxperience',
    name: 'XXXperience.zip',
    icon: '🎯',
    description: 'Juegos, ruletas, easter eggs y caos interactivo',
    isPublic: false,
  },
  centerfolds: {
    path: '/apps/centerfolds',
    name: 'CENTERFOLDS.zip',
    icon: '📌',
    description: 'Lookbook editorial de moda estilo póster/mugshot',
    isPublic: false,
  },
  sectaTrash: {
    path: '/apps/secta-trash',
    name: 'SectaTrash.exe',
    icon: '🎮',
    description: 'Dashboard de gamificación y progreso',
    isPublic: false,
  },
  trashtienda: {
    path: '/apps/trashtienda',
    name: 'Trashtienda.exe',
    icon: '🛍️',
    description: 'Tienda con scroll infinito de productos prohibidos',
    isPublic: false,
  },
  miSecta: {
    path: '/apps/mi-secta',
    name: 'Mi Secta',
    icon: '👤',
    description: 'User profile and progression',
    isPublic: false,
  },
  rituales: {
    path: '/apps/rituales',
    name: 'Rituales',
    icon: '🔮',
    description: 'Events calendar',
    isPublic: false,
  },
  altar: {
    path: '/apps/altar',
    name: 'Altar',
    icon: '✨',
    description: 'Collectibles and achievements',
    isPublic: false,
  },
  grimorio: {
    path: '/apps/grimorio',
    name: 'TRASH-ZINE.pdf',
    icon: '📖',
    description: 'Blog: noticias, salseo y cultura trash',
    isPublic: false,
  },
  transmisiones: {
    path: '/apps/transmisiones',
    name: 'TRASH_VISION.exe',
    icon: '📡',
    description: 'TV player estilo Winamp para campañas y clips',
    isPublic: false,
  },
  pesetrashWallet: {
    path: '/apps/pesetrash-wallet',
    name: 'Pesetrash Wallet',
    icon: '🪙',
    description: 'Currency wallet and transactions',
    isPublic: false,
  },
  carrito: {
    path: '/apps/carrito',
    name: 'Carrito',
    icon: '🛒',
    description: 'Shopping cart',
    isPublic: false,
  },
  ajustes: {
    path: '/apps/ajustes',
    name: 'Ajustes',
    icon: '⚙️',
    description: 'System settings',
    isPublic: false,
  },
};

/**
 * Get route by path
 */
export const getRouteByPath = (path: string): RouteConfig | undefined => {
  return Object.values(ROUTES).find((route) => route.path === path);
};

/**
 * Get all app routes (excluding system routes)
 */
export const getAppRoutes = (): RouteConfig[] => {
  return Object.values(ROUTES).filter((route) => route.path.startsWith('/apps/'));
};

/**
 * Check if route requires authentication
 */
export const routeRequiresAuth = (path: string): boolean => {
  const route = getRouteByPath(path);
  return route ? !route.isPublic : true;
};

/**
 * Check if user can access route based on rank
 */
export const canAccessRoute = (path: string, userRank?: string): boolean => {
  const route = getRouteByPath(path);
  if (!route) return false;
  if (route.isPublic) return true;
  if (!route.requiredRank) return true;

  const userRankIndex = getRankIndex(userRank);
  const requiredRankIndex = getRankIndex(route.requiredRank);

  if (requiredRankIndex === -1) return true;
  if (userRankIndex === -1) return false;

  return userRankIndex >= requiredRankIndex;
};
