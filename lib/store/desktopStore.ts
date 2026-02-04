import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { WindowState, WindowConfig } from '@/types/window';

interface DesktopState {
  windows: WindowState[];
  nextZIndex: number;
  activeWindowId: string | null;

  // Actions
  openWindow: (config: WindowConfig) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindowPosition: (id: string, position: { x: number; y: number }) => void;
  updateWindowSize: (id: string, size: { width: number; height: number }) => void;
  restoreWindow: (id: string) => void;
  closeAllWindows: () => void;
}

export const useDesktopStore = create<DesktopState>()(
  persist(
    (set, get) => ({
      windows: [],
      nextZIndex: 1,
      activeWindowId: null,

      openWindow: (config) => {
        const existingWindow = get().windows.find((w) => w.id === config.id);
        
        if (existingWindow) {
          // Focus existing window
          get().focusWindow(config.id);
          if (existingWindow.minimized) {
            get().restoreWindow(config.id);
          }
          return;
        }

        const newWindow: WindowState = {
          id: config.id,
          title: config.title,
          component: config.component,
          position: config.defaultPosition || { x: 100, y: 100 },
          size: config.defaultSize || { width: 800, height: 600 },
          zIndex: get().nextZIndex,
          minimized: false,
          maximized: false,
          focused: true,
          resizable: config.resizable ?? true,
          draggable: config.draggable ?? true,
          icon: config.icon,
          data: config.data,
        };

        set((state) => ({
          windows: [...state.windows.map((w) => ({ ...w, focused: false })), newWindow],
          nextZIndex: state.nextZIndex + 1,
          activeWindowId: newWindow.id,
        }));
      },

      closeWindow: (id) => {
        set((state) => {
          const newWindows = state.windows.filter((w) => w.id !== id);
          const newActiveId =
            state.activeWindowId === id
              ? newWindows.length > 0
                ? newWindows[newWindows.length - 1].id
                : null
              : state.activeWindowId;

          return {
            windows: newWindows,
            activeWindowId: newActiveId,
          };
        });
      },

      minimizeWindow: (id) => {
        set((state) => ({
          windows: state.windows.map((w) =>
            w.id === id ? { ...w, minimized: true, focused: false } : w
          ),
          activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
        }));
      },

      maximizeWindow: (id) => {
        set((state) => ({
          windows: state.windows.map((w) =>
            w.id === id ? { ...w, maximized: !w.maximized } : w
          ),
        }));
      },

      focusWindow: (id) => {
        set((state) => ({
          windows: state.windows.map((w) =>
            w.id === id
              ? { ...w, focused: true, zIndex: state.nextZIndex }
              : { ...w, focused: false }
          ),
          nextZIndex: state.nextZIndex + 1,
          activeWindowId: id,
        }));
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
          windows: state.windows.map((w) => (w.id === id ? { ...w, size } : w)),
        }));
      },

      restoreWindow: (id) => {
        set((state) => ({
          windows: state.windows.map((w) =>
            w.id === id
              ? { ...w, minimized: false, focused: true, zIndex: state.nextZIndex }
              : { ...w, focused: false }
          ),
          nextZIndex: state.nextZIndex + 1,
          activeWindowId: id,
        }));
      },

      closeAllWindows: () => {
        set({ windows: [], activeWindowId: null });
      },
    }),
    {
      name: 'trash-os-desktop',
      // Don't persist windows, they should start fresh each session
    }
  )
);
