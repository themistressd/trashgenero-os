'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { notificationVariants } from '@/lib/utils/animations';
import { useNotificationStore } from '@/lib/store/notificationStore';

const typeStyles: Record<string, { border: string; text: string; icon: string }> = {
  success: { border: 'border-green-500', text: 'text-green-700', icon: '✅' },
  error: { border: 'border-red-500', text: 'text-red-700', icon: '⛔' },
  warning: { border: 'border-yellow-500', text: 'text-yellow-700', icon: '⚠️' },
  info: { border: 'border-blue-500', text: 'text-blue-700', icon: 'ℹ️' },
};

export default function NotificationToaster() {
  const notifications = useNotificationStore((state) => state.notifications);
  const removeNotification = useNotificationStore((state) => state.removeNotification);

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[9999] flex w-[320px] flex-col gap-3">
      <AnimatePresence>
        {notifications.map((notification) => {
          const style = typeStyles[notification.type] ?? typeStyles.info;
          return (
            <motion.div
              key={notification.id}
              variants={notificationVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className={`pointer-events-auto rounded border-2 bg-[#dfdfdf] p-3 shadow-lg ${style.border}`}
              style={{
                borderTop: '2px solid #fff',
                borderLeft: '2px solid #fff',
                borderRight: '2px solid #808080',
                borderBottom: '2px solid #808080',
              }}
            >
              <div className="flex items-start gap-3">
                <div className="text-xl">{style.icon}</div>
                <div className="flex-1">
                  <div className={`font-vcr text-sm ${style.text}`}>{notification.title}</div>
                  <div className="font-vt323 text-sm text-gray-700">{notification.message}</div>
                </div>
                <button
                  type="button"
                  onClick={() => removeNotification(notification.id)}
                  className="win95-button px-2 py-0 text-sm leading-none"
                  aria-label="Cerrar notificación"
                >
                  ×
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
