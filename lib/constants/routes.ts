/**
 * Application routes configuration
 */

export interface RouteConfig {
  path: string;
  name: string;
  icon: string;
  description: string;
  requiredRank?: string;
  isPublic?: boolean;
}

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
  trashtienda: {
    path: '/apps/trashtienda',
    name: 'Trashtienda',
    icon: '🛍️',
    description: 'Official store',
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
    name: 'Grimorio',
    icon: '📖',
    description: 'Blog and manifestos',
    isPublic: false,
  },
  transmisiones: {
    path: '/apps/transmisiones',
    name: 'Transmisiones',
    icon: '📡',
    description: 'Live streams and exclusive content',
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
  
  // TODO: Implement rank hierarchy check
  return true;
};
