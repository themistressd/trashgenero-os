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
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
      ),
    }));
  },

  focusWindow: (id) => {
    const { windows, highestZIndex } = get();
    const window = windows.find((w) => w.id === id);
    
    if (!window) return;

    set({
      windows: windows.map((w) =>
        w.id === id ? { ...w, zIndex: highestZIndex + 1 } : w
      ),
      activeWindow: id,
      highestZIndex: highestZIndex + 1,
    });
  },

  updateWindowPosition: (id, position) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, position } : w
      ),
    }));
  },
}));
