'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useWindowStore } from '@/lib/store/windowStore';

interface WindowProps {
  id: string;
  title: string;
  icon: string;
  children: React.ReactNode;
}

export default function Window({
  id,
  title,
  icon,
  children,
}: WindowProps) {
  const {
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
    updateWindowSnap,
    windows,
  } = useWindowStore();
  const windowData = windows.find((w) => w.id === id);
  
  if (!windowData) return null;

  const { isMinimized, isMaximized, zIndex, position, size } = windowData;
  const [isResizing, setIsResizing] = useState(false);
  const [dragHint, setDragHint] = useState<'left' | 'right' | 'maximized' | null>(null);
  const startPointer = useRef({ x: 0, y: 0 });
  const startSize = useRef({ width: size.width, height: size.height });

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

  const handleTitleDoubleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest('button')) return;
    handleMaximize();
  };

  const handleResizeStart = (event: React.PointerEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (isMaximized) return;
    updateWindowSnap(id, null);
    setIsResizing(true);
    startPointer.current = { x: event.clientX, y: event.clientY };
    startSize.current = { width: size.width, height: size.height };
  };

  useEffect(() => {
    startSize.current = { width: size.width, height: size.height };
  }, [size.height, size.width]);

  useEffect(() => {
    if (!isResizing) return;

    const handlePointerMove = (event: PointerEvent) => {
      const deltaX = event.clientX - startPointer.current.x;
      const deltaY = event.clientY - startPointer.current.y;
      const maxWidth = typeof window !== 'undefined' ? window.innerWidth - 40 : startSize.current.width;
      const maxHeight = typeof window !== 'undefined' ? window.innerHeight - 80 : startSize.current.height;
      const nextWidth = Math.max(360, Math.min(maxWidth, startSize.current.width + deltaX));
      const nextHeight = Math.max(240, Math.min(maxHeight, startSize.current.height + deltaY));
      updateWindowSize(id, { width: nextWidth, height: nextHeight });
    };

    const handlePointerUp = () => {
      setIsResizing(false);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [id, isResizing, updateWindowSize]);

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.2 }}
      drag={!isMaximized}
      dragMomentum={false}
      dragElastic={0}
      onDrag={(event, info) => {
        const nextPosition = {
          x: position.x + info.offset.x,
          y: position.y + info.offset.y,
        };
        const viewportWidth = window.innerWidth;
        const snapThreshold = 40;
        if (nextPosition.y <= snapThreshold) {
          setDragHint('maximized');
          return;
        }
        if (nextPosition.x <= snapThreshold) {
          setDragHint('left');
          return;
        }
        if (nextPosition.x + size.width >= viewportWidth - snapThreshold) {
          setDragHint('right');
          return;
        }
        setDragHint(null);
      }}
      dragConstraints={{
        left: 0,
        top: 0,
        right: typeof window !== 'undefined' ? window.innerWidth - (isMaximized ? 0 : size.width) : 0,
        bottom:
          typeof window !== 'undefined'
            ? window.innerHeight - (isMaximized ? 0 : size.height) - 40
            : 0,
      }}
      onDragEnd={(event, info) => {
        if (isMaximized) return;
        const nextPosition = {
          x: position.x + info.offset.x,
          y: position.y + info.offset.y,
        };

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight - 40;
        const snapThreshold = 40;

        if (nextPosition.y <= snapThreshold) {
          maximizeWindow(id);
          setDragHint(null);
          return;
        }

        if (nextPosition.x <= snapThreshold) {
          updateWindowPosition(id, { x: 0, y: 0 });
          updateWindowSize(id, {
            width: Math.floor(viewportWidth / 2),
            height: viewportHeight,
          });
          updateWindowSnap(id, 'left');
          setDragHint(null);
          return;
        }

        if (nextPosition.x + size.width >= viewportWidth - snapThreshold) {
          updateWindowPosition(id, { x: Math.floor(viewportWidth / 2), y: 0 });
          updateWindowSize(id, {
            width: Math.floor(viewportWidth / 2),
            height: viewportHeight,
          });
          updateWindowSnap(id, 'right');
          setDragHint(null);
          return;
        }

        updateWindowPosition(id, nextPosition);
        updateWindowSnap(id, null);
        setDragHint(null);
      }}
      onMouseDown={handleMouseDown}
      style={{
        position: 'fixed',
        left: isMaximized ? 0 : position.x,
        top: isMaximized ? 0 : position.y,
        width: isMaximized ? '100vw' : size.width,
        height: isMaximized ? 'calc(100vh - 40px)' : size.height,
        zIndex,
      }}
      className="win95-window overflow-hidden"
    >
      {dragHint && (
        <div className={`window-snap-hint ${dragHint}`} aria-hidden="true" />
      )}
      {/* Title Bar */}
      <div
        className="win95-window-title cursor-move select-none bg-gradient-to-r from-purple-600 to-bubblegum-pink px-2 py-1 flex items-center justify-between"
        style={{ cursor: isMaximized ? 'default' : 'move' }}
        onDoubleClick={handleTitleDoubleClick}
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
            aria-label="Minimize window"
            type="button"
          >
            _
          </button>
          <button
            onClick={handleMaximize}
            className="win95-button px-3 py-0 text-lg leading-none hover:bg-gray-300"
            title={isMaximized ? 'Restore' : 'Maximize'}
            aria-label={isMaximized ? 'Restore window' : 'Maximize window'}
            type="button"
          >
            {isMaximized ? '❐' : '□'}
          </button>
          <button
            onClick={handleClose}
            className="win95-button px-3 py-0 text-lg leading-none hover:bg-gray-300"
            title="Close"
            aria-label="Close window"
            type="button"
          >
            ×
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="win95-window-body bg-white overflow-auto" style={{ height: 'calc(100% - 32px)' }}>
        {children}
      </div>
      {!isMaximized && (
        <div
          className="absolute bottom-1 right-1 h-4 w-4 cursor-se-resize border border-gray-600 bg-gray-200"
          onPointerDown={handleResizeStart}
        />
      )}
    </motion.div>
  );
}
