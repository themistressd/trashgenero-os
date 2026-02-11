'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
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
    updateWindowSize,
    updateWindowSnap,
    windows,
  } = useWindowStore();
  const windowData = windows.find((w) => w.id === id);
  const isMissing = !windowData;
  const isMinimized = windowData?.isMinimized ?? true;
  const isMaximized = windowData?.isMaximized ?? false;
  const zIndex = windowData?.zIndex ?? 0;
  const position = windowData?.position ?? { x: 0, y: 0 };
  const size = windowData?.size ?? { width: 600, height: 400 };
  const [isResizing, setIsResizing] = useState(false);
  const startPointer = useRef({ x: 0, y: 0 });
  const startSize = useRef({ width: size.width, height: size.height });
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    disabled: isMissing || isMaximized,
  });
  const dragTransform = useMemo(
    () => (transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined),
    [transform]
  );

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
    if (isMissing) return;
    startSize.current = { width: size.width, height: size.height };
  }, [isMissing, size.height, size.width]);

  useEffect(() => {
    if (isMissing || !isResizing) return;

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
  }, [id, isMissing, isResizing, updateWindowSize]);


  const dragHint = useMemo<'left' | 'right' | 'maximized' | null>(() => {
    if (isMissing || !transform || isMaximized) return null;

    const nextPosition = {
      x: position.x + transform.x,
      y: position.y + transform.y,
    };
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : size.width;
    const snapThreshold = 40;

    if (nextPosition.y <= snapThreshold) return 'maximized';
    if (nextPosition.x <= snapThreshold) return 'left';
    if (nextPosition.x + size.width >= viewportWidth - snapThreshold) return 'right';

    return null;
  }, [isMaximized, isMissing, position.x, position.y, size.width, transform]);

  // Don't render if minimized or missing
  if (isMissing || isMinimized) return null;

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.2 }}
      ref={setNodeRef}
      onMouseDown={handleMouseDown}
      style={{
        position: 'fixed',
        left: isMaximized ? 0 : position.x,
        top: isMaximized ? 0 : position.y,
        width: isMaximized ? '100vw' : size.width,
        height: isMaximized ? 'calc(100vh - 40px)' : size.height,
        zIndex,
        transform: dragTransform,
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
        {...listeners}
        {...attributes}
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
