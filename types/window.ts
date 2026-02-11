// Window Manager Types
export interface WindowPosition {
  x: number;
  y: number;
}

export interface WindowSize {
  width: number;
  height: number;
}

export interface WindowState {
  id: string;
  title: string;
  component: string;
  position: WindowPosition;
  size: WindowSize;
  zIndex: number;
  minimized: boolean;
  maximized: boolean;
  focused: boolean;
  resizable: boolean;
  draggable: boolean;
  icon?: string;
  data?: unknown;
}

export interface WindowManagerState {
  windows: WindowState[];
  nextZIndex: number;
  activeWindowId: string | null;
}

export interface WindowConfig {
  id: string;
  title: string;
  component: string;
  defaultPosition?: WindowPosition;
  defaultSize?: WindowSize;
  resizable?: boolean;
  draggable?: boolean;
  icon?: string;
  data?: unknown;
}
