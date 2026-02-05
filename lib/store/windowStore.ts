import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  snapState?: 'left' | 'right' | 'maximized' | null;
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
  updateWindowSnap: (id: string, snapState: Window['snapState']) => void;
}

export const useWindowStore = create<WindowStore>()(
  persist(
    (set, get) => ({
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
          snapState: null,
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
                snapState: 'maximized',
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
                snapState: null,
              };
            }
            return { ...w, isMaximized: false, snapState: null };
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
            w.id === id ? { ...w, position, snapState: null } : w
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

      updateWindowSnap: (id, snapState) => {
        set((state) => ({
          windows: state.windows.map((w) =>
            w.id === id ? { ...w, snapState } : w
          ),
        }));
      },
    }),
    {
      name: 'trash-os-windows',
      partialize: (state) => ({
        windows: state.windows,
        activeWindow: state.activeWindow,
        highestZIndex: state.highestZIndex,
      }),
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        const maxZIndex = state.windows.reduce(
          (max, window) => Math.max(max, window.zIndex),
          1000
        );
        state.highestZIndex = Math.max(maxZIndex, 1000);
      },
    }
  )
);
