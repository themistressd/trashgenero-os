'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface DesktopIconProps {
  id: string;
  icon: string;
  name: string;
  position: { x: number; y: number };
  containerRef: React.RefObject<HTMLDivElement | null>;
  onDoubleClick: (id: string) => void;
  onPositionChange: (id: string, position: { x: number; y: number }) => void;
}

const GRID_SIZE = 88;
const ICON_PADDING = 12;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export default function DesktopIcon({
  id,
  icon,
  name,
  position,
  containerRef,
  onDoubleClick,
  onPositionChange,
}: DesktopIconProps) {
  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={containerRef}
      onDragEnd={(event, info) => {
        const currentPos = position;
        const rawPosition = {
          x: currentPos.x + info.offset.x,
          y: currentPos.y + info.offset.y,
        };
        const snapped = {
          x: Math.round(rawPosition.x / GRID_SIZE) * GRID_SIZE,
          y: Math.round(rawPosition.y / GRID_SIZE) * GRID_SIZE,
        };

        const bounds = containerRef.current?.getBoundingClientRect();
        const maxX = bounds ? bounds.width - GRID_SIZE : snapped.x;
        const maxY = bounds ? bounds.height - GRID_SIZE : snapped.y;

        onPositionChange(id, {
          x: clamp(snapped.x, ICON_PADDING, maxX),
          y: clamp(snapped.y, ICON_PADDING, maxY),
        });
      }}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
      }}
      className="desktop-icon cursor-move"
      onDoubleClick={(event) => {
        event.stopPropagation();
        onDoubleClick(id);
      }}
      aria-label={`Abrir ${name}`}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onDoubleClick(id);
        }
      }}
    >
      <div className="desktop-icon-image">{icon}</div>
      <div className="desktop-icon-name">{name}</div>
    </motion.div>
  );
}
