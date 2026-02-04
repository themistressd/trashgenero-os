import { create } from 'zustand';

type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  duration?: number;
  timestamp: number;
}

interface NotificationState {
  notifications: Notification[];
  maxNotifications: number;

  // Actions
  addNotification: (
    type: NotificationType,
    title: string,
    message: string,
    duration?: number
  ) => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  maxNotifications: 5,

  addNotification: (type, title, message, duration = 5000) => {
    const id = `notification-${Date.now()}-${Math.random()}`;
    const notification: Notification = {
      id,
      type,
      title,
      message,
      duration,
      timestamp: Date.now(),
    };

    set((state) => {
      const newNotifications = [notification, ...state.notifications].slice(
        0,
        state.maxNotifications
      );
      return { notifications: newNotifications };
    });

    // Auto-remove after duration
    if (duration > 0) {
      setTimeout(() => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        }));
      }, duration);
    }
  },

  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },

  clearAllNotifications: () => {
    set({ notifications: [] });
  },
}));

// Helper hooks for specific notification types
export const useNotifications = () => {
  const addNotification = useNotificationStore((state) => state.addNotification);

  return {
    success: (title: string, message: string, duration?: number) =>
      addNotification('success', title, message, duration),
    error: (title: string, message: string, duration?: number) =>
      addNotification('error', title, message, duration),
    warning: (title: string, message: string, duration?: number) =>
      addNotification('warning', title, message, duration),
    info: (title: string, message: string, duration?: number) =>
      addNotification('info', title, message, duration),
  };
};
