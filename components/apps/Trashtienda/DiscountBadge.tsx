'use client';

import React from 'react';

interface DiscountBadgeProps {
  emoji: string;
  name: string;
  discount: number;
}

export default function DiscountBadge({ emoji, name, discount }: DiscountBadgeProps) {
  return (
    <div className="flex items-center gap-2 rounded border-2 border-purple-600 bg-gradient-to-br from-bubblegum-pink to-purple-600 px-3 py-2 text-white shadow-lg">
      <span className="text-xl">{emoji}</span>
      <div className="flex flex-col">
        <span className="font-vt323 text-xs leading-tight">Tu Rango</span>
        <span className="font-vt323 text-sm font-bold leading-tight">{name}</span>
      </div>
      <div className="ml-auto flex items-center gap-1">
        <span className="font-vcr text-2xl font-bold">-{discount}%</span>
      </div>
    </div>
  );
}
