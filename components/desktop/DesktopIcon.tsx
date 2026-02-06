'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface DesktopIconProps {
  id: string;
  icon: string;
  name: string;
  position: { x: number; y: number };
  gridSize: number;
  padding: number;
  occupiedKeys: Set<string>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onDoubleClick: (id: string) => void;
  onPositionChange: (id: string, position: { x: number; y: number }) => void;
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
const keyFor = (x: number, y: number) => `${x},${y}`;
const getGridStart = (value: number, gridSize: number) =>
  Math.round(value / gridSize) * gridSize;

export default function DesktopIcon({
  id,
  icon,
  name,
  position,
  gridSize,
  padding,
  occupiedKeys,
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
        const rawPosition = {
          x: position.x + info.offset.x,
          y: position.y + info.offset.y,
        };
        const snapped = {
          x: getGridStart(rawPosition.x, gridSize),
          y: getGridStart(rawPosition.y, gridSize),
        };

        const bounds = containerRef.current?.getBoundingClientRect();
        const maxX = bounds ? bounds.width - gridSize : snapped.x;
        const maxY = bounds ? bounds.height - gridSize : snapped.y;

        const clamped = {
          x: clamp(snapped.x, padding, maxX),
          y: clamp(snapped.y, padding, maxY),
        };

        if (!occupiedKeys.has(keyFor(clamped.x, clamped.y))) {
          onPositionChange(id, clamped);
          return;
        }

        const maxRadius = Math.ceil(Math.max(maxX, maxY) / gridSize);
        for (let radius = 1; radius <= maxRadius; radius += 1) {
          for (let dx = -radius; dx <= radius; dx += 1) {
            for (let dy = -radius; dy <= radius; dy += 1) {
              const isEdge = Math.abs(dx) === radius || Math.abs(dy) === radius;
              if (!isEdge) continue;
              const candidate = {
                x: clamp(clamped.x + dx * gridSize, padding, maxX),
                y: clamp(clamped.y + dy * gridSize, padding, maxY),
              };
              if (!occupiedKeys.has(keyFor(candidate.x, candidate.y))) {
                onPositionChange(id, candidate);
                return;
              }
            }
          }
        }

        onPositionChange(id, clamped);
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
