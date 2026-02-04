'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useWindowStore } from '@/lib/store/windowStore';

interface WindowProps {
  id: string;
  title: string;
  icon: string;
  children: React.ReactNode;
  initialPosition?: { x: number; y: number };
  initialSize?: { width: number; height: number };
}

export default function Window({
  id,
  title,
  icon,
  children,
  initialPosition = { x: 100, y: 100 },
  initialSize = { width: 600, height: 400 },
}: WindowProps) {
  const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, windows } = useWindowStore();
  const windowData = windows.find((w) => w.id === id);
  
  const constraintsRef = useRef(null);

  if (!windowData) return null;

  const { isMinimized, isMaximized, zIndex } = windowData;

  // Don't render if minimized
  if (isMinimized) return null;

  const handleClose = () => {
    closeWindow(id);
  };

  const handleMinimize = () => {
    minimizeWindow(id);
  };

  const handleMaximize = () => {
    maximizeWindow(id);
  };

  const handleMouseDown = () => {
    focusWindow(id);
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.2 }}
      drag={!isMaximized}
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={{
        left: 0,
        top: 0,
        right: typeof window !== 'undefined' ? window.innerWidth - (isMaximized ? 0 : windowData.size.width) : 0,
        bottom: typeof window !== 'undefined' ? window.innerHeight - (isMaximized ? 0 : windowData.size.height) - 40 : 0,
      }}
      onMouseDown={handleMouseDown}
      style={{
        position: 'fixed',
        left: isMaximized ? 0 : initialPosition.x,
        top: isMaximized ? 0 : initialPosition.y,
        width: isMaximized ? '100vw' : initialSize.width,
        height: isMaximized ? 'calc(100vh - 40px)' : initialSize.height,
        zIndex,
      }}
      className="win95-window overflow-hidden"
    >
      {/* Title Bar */}
      <div
        className="win95-window-title cursor-move select-none bg-gradient-to-r from-purple-600 to-bubblegum-pink px-2 py-1 flex items-center justify-between"
        style={{ cursor: isMaximized ? 'default' : 'move' }}
      >
        <span className="flex items-center gap-2">
          <span>{icon}</span>
          <span>{title}</span>
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={handleMinimize}
            className="win95-button px-3 py-0 text-lg leading-none hover:bg-gray-300"
            title="Minimize"
          >
            _
          </button>
          <button
            onClick={handleMaximize}
            className="win95-button px-3 py-0 text-lg leading-none hover:bg-gray-300"
            title={isMaximized ? 'Restore' : 'Maximize'}
          >
            □
          </button>
          <button
            onClick={handleClose}
            className="win95-button px-3 py-0 text-lg leading-none hover:bg-gray-300"
            title="Close"
          >
            ×
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="win95-window-body bg-white overflow-auto" style={{ height: 'calc(100% - 32px)' }}>
        {children}
      </div>
    </motion.div>
  );
}
