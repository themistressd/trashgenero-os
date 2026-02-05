import { create } from 'zustand';

export interface Window {
  id: string;
  title: string;
  icon: string;
  component: string;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  restoreState?: { position: { x: number; y: number }; size: { width: number; height: number } };
}

interface WindowStore {
  windows: Window[];
  activeWindow: string | null;
  highestZIndex: number;
  openWindow: (window: Omit<Window, 'isMinimized' | 'isMaximized' | 'zIndex'>) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindowPosition: (id: string, position: { x: number; y: number }) => void;
  updateWindowSize: (id: string, size: { width: number; height: number }) => void;
}

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: [],
  activeWindow: null,
  highestZIndex: 1000,

  openWindow: (windowData) => {
    const { windows, highestZIndex } = get();
    
    // Check if window already exists
    const existingWindow = windows.find((w) => w.id === windowData.id);
    
    if (existingWindow) {
      // If exists, just focus it
      get().focusWindow(windowData.id);
      return;
    }

    // Create new window
    const newWindow: Window = {
      ...windowData,
      isMinimized: false,
      isMaximized: false,
      zIndex: highestZIndex + 1,
    };

    set({
      windows: [...windows, newWindow],
      activeWindow: newWindow.id,
      highestZIndex: highestZIndex + 1,
    });
  },

  closeWindow: (id) => {
    const { windows, activeWindow } = get();
    const newWindows = windows.filter((w) => w.id !== id);
    
    set({
      windows: newWindows,
      activeWindow: activeWindow === id ? (newWindows[0]?.id || null) : activeWindow,
    });
  },

  minimizeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMinimized: !w.isMinimized } : w
      ),
      activeWindow: state.activeWindow === id ? null : state.activeWindow,
    }));
  },

  maximizeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map((w) => {
        if (w.id !== id) return w;
        if (!w.isMaximized) {
          return {
            ...w,
            isMaximized: true,
            restoreState: w.restoreState ?? {
              position: { ...w.position },
              size: { ...w.size },
            },
          };
        }
        if (w.restoreState) {
          return {
            ...w,
            isMaximized: false,
            position: { ...w.restoreState.position },
            size: { ...w.restoreState.size },
            restoreState: undefined,
          };
        }
        return { ...w, isMaximized: false };
      }),
    }));
  },

  focusWindow: (id) => {
    const { windows, highestZIndex } = get();
    const window = windows.find((w) => w.id === id);
    
    if (!window) return;

    // Normalize z-index if it gets too high
    let newHighestZIndex = highestZIndex + 1;
    let updatedWindows = windows;
    
    if (newHighestZIndex > 10000) {
      // Reset all z-indices while maintaining order
      const sortedWindows = [...windows].sort((a, b) => a.zIndex - b.zIndex);
      updatedWindows = sortedWindows.map((w, index) => ({
        ...w,
        zIndex: 1000 + index + (w.id === id ? 1 : 0),
      }));
      newHighestZIndex = 1000 + windows.length;
    } else {
      updatedWindows = windows.map((w) =>
        w.id === id ? { ...w, zIndex: newHighestZIndex } : w
      );
    }

    set({
      windows: updatedWindows,
      activeWindow: id,
      highestZIndex: newHighestZIndex,
    });
  },

  updateWindowPosition: (id, position) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, position } : w
      ),
    }));
  },

  updateWindowSize: (id, size) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, size } : w
      ),
    }));
  },
}));
