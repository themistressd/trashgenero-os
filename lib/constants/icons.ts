import type { DesktopIcon } from '@/types/desktop';

/**
 * Desktop icons configuration
 */
export const DESKTOP_ICONS: DesktopIcon[] = [
  {
    id: 'trashtienda',
    name: 'Trashtienda.exe',
    icon: '🛍️',
    route: '/apps/trashtienda',
    description: 'Tienda oficial. Scroll infinito de productos prohibidos.',
    position: { x: 20, y: 20 },
  },
  {
    id: 'mi-secta',
    name: 'MiSecta.exe',
    icon: '👤',
    route: '/apps/mi-secta',
    description: 'Tu perfil, rango, estampitas y progreso en el culto.',
    position: { x: 20, y: 140 },
  },
  {
    id: 'rituales',
    name: 'Rituales.exe',
    icon: '🔮',
    route: '/apps/rituales',
    description: 'Calendario de eventos, drops y rituales secretos.',
    position: { x: 20, y: 260 },
  },
  {
    id: 'altar',
    name: 'Altar.exe',
    icon: '✨',
    route: '/apps/altar',
    description: 'Tus reliquias coleccionadas y logros desbloqueados.',
    position: { x: 20, y: 380 },
  },
  {
    id: 'grimorio',
    name: 'Grimorio.exe',
    icon: '📖',
    route: '/apps/grimorio',
    description: 'Blog, manifiestos y la biblia trash.',
    position: { x: 20, y: 500 },
  },
  {
    id: 'transmisiones',
    name: 'Transmisiones.exe',
    icon: '📡',
    route: '/apps/transmisiones',
    description: 'Live streams, replays y contenido exclusivo.',
    position: { x: 140, y: 20 },
  },
  {
    id: 'pesetrash-wallet',
    name: 'Pesetrash.exe',
    icon: '🪙',
    route: '/apps/pesetrash-wallet',
    description: 'Tu wallet de Pesetrash, historial y transacciones.',
    position: { x: 140, y: 140 },
  },
  {
    id: 'carrito',
    name: 'Carrito.exe',
    icon: '🛒',
    route: '/apps/carrito',
    description: 'Tu carrito de compras actual.',
    position: { x: 140, y: 260 },
  },
  {
    id: 'ajustes',
    name: 'Ajustes.exe',
    icon: '⚙️',
    route: '/apps/ajustes',
    description: 'Configuración del sistema, wallpapers y preferencias.',
    position: { x: 140, y: 380 },
  },
];

/**
 * Get icon by ID
 */
export const getIconById = (id: string): DesktopIcon | undefined => {
  return DESKTOP_ICONS.find((icon) => icon.id === id);
};

/**
 * Get icons by route
 */
export const getIconsByRoute = (route: string): DesktopIcon[] => {
  return DESKTOP_ICONS.filter((icon) => icon.route === route);
};
