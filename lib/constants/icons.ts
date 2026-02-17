import type { DesktopIcon } from '@/types/desktop';

/**
 * Desktop icons configuration
 */
export const DESKTOP_ICONS: DesktopIcon[] = [
  {
    id: 'mistress-d',
    name: 'Mistress D.exe',
    icon: '⚡',
    route: '/apps/mistress-d',
    description: 'Bio, manifiesto y archivo personal.',
    position: { x: 20, y: 20 },
  },
  {
    id: 'divas',
    name: 'Divas.rar',
    icon: '👯‍♀️',
    route: '/apps/divas',
    description: 'Lore y personajes del universo TrashGènero.',
    position: { x: 20, y: 140 },
  },
  {
    id: 'stalker-zone',
    name: 'STsLK3R_Z0NE',
    icon: '📡',
    route: '/apps/stalker-zone',
    description: 'Redes sociales en modo retro.',
    position: { x: 20, y: 260 },
  },
  {
    id: 'xxxperience',
    name: 'XXXperience.zip',
    icon: '🎯',
    route: '/apps/xxxperience',
    description: 'Mini-juegos rituales y challenges interactivos.',
    position: { x: 20, y: 380 },
  },
  {
    id: 'centerfolds',
    name: 'CENTERFOLDS.zip',
    icon: '📌',
    route: '/apps/centerfolds',
    description: 'Lookbooks, editoriales y archivo visual.',
    position: { x: 20, y: 500 },
  },
  {
    id: 'trashtienda',
    name: 'Trashtienda.exe',
    icon: '🛍️',
    route: '/apps/trashtienda',
    description: 'Tienda oficial. Scroll infinito de productos prohibidos.',
    position: { x: 140, y: 20 },
  },
  {
    id: 'secta-trash',
    name: 'SectaTrash.exe',
    icon: '🎮',
    route: '/apps/secta-trash',
    description: 'Dashboard de gamificación: puntos, rangos, logros y progreso.',
    position: { x: 140, y: 140 },
  },
  {
    id: 'mi-secta',
    name: 'MiSecta.exe',
    icon: '👤',
    route: '/apps/mi-secta',
    description: 'Tu perfil, rango, estampitas y progreso en el culto.',
    position: { x: 140, y: 260 },
  },
  {
    id: 'rituales',
    name: 'Rituales.exe',
    icon: '🔮',
    route: '/apps/rituales',
    description: 'Calendario de eventos, drops y rituales secretos.',
    position: { x: 140, y: 380 },
  },
  {
    id: 'altar',
    name: 'Altar.exe',
    icon: '✨',
    route: '/apps/altar',
    description: 'Tus reliquias coleccionadas y logros desbloqueados.',
    position: { x: 140, y: 500 },
  },
  {
    id: 'grimorio',
    name: 'TRASH-ZINE.pdf',
    icon: '📖',
    route: '/apps/grimorio',
    description: 'Blog. Noticias, salseo y cultura trash.',
    position: { x: 140, y: 620 },
  },
  {
    id: 'transmisiones',
    name: 'TRASH_VISION.exe',
    icon: '📡',
    route: '/apps/transmisiones',
    description: 'TV estilo Winamp. Campañas y clips.',
    position: { x: 260, y: 20 },
  },
  {
    id: 'pesetrash-wallet',
    name: 'Pesetrash.exe',
    icon: '🪙',
    route: '/apps/pesetrash-wallet',
    description: 'Tu wallet de Pesetrash, historial y transacciones.',
    position: { x: 260, y: 140 },
  },
  {
    id: 'carrito',
    name: 'Carrito.exe',
    icon: '🛒',
    route: '/apps/carrito',
    description: 'Tu carrito de compras actual.',
    position: { x: 260, y: 260 },
  },
  {
    id: 'ajustes',
    name: 'Ajustes.exe',
    icon: '⚙️',
    route: '/apps/ajustes',
    description: 'Configuración del sistema, wallpapers y preferencias.',
    position: { x: 260, y: 380 },
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
