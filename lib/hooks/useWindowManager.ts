import { useDesktopStore } from '@/lib/store/desktopStore';
import type { WindowConfig } from '@/types/window';

/**
 * Hook to manage desktop windows
 */
export const useWindowManager = () => {
  const {
    windows,
    activeWindowId,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
    restoreWindow,
    closeAllWindows,
  } = useDesktopStore();

  const activeWindow = windows.find((w) => w.id === activeWindowId);
  const minimizedWindows = windows.filter((w) => w.minimized);
  const visibleWindows = windows.filter((w) => !w.minimized);

  return {
    windows,
    activeWindow,
    minimizedWindows,
    visibleWindows,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
    restoreWindow,
    closeAllWindows,
  };
};
