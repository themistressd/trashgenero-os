'use client';

import React from 'react';
import type { CartItem as CartItemType } from '@/types/woocommerce';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const price = parseFloat(item.product.price);
  const total = price * item.quantity;

  return (
    <div className="flex items-center gap-3 border-b-2 border-gray-300 bg-white p-3 last:border-b-0">
      {/* Thumbnail */}
      <div className="h-16 w-16 flex-shrink-0 overflow-hidden border-2 border-gray-400">
        {item.product.images.length > 0 ? (
          <img
            src={item.product.images[0].src}
            alt={item.product.images[0].alt}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gray-200">
            <span className="text-2xl">📦</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1">
        <h4 className="font-vt323 text-base font-bold text-gray-800">
          {item.product.name}
        </h4>
        <p className="font-vt323 text-sm text-gray-600">
          €{price.toFixed(2)} cada uno
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onUpdateQuantity(Math.max(0, item.quantity - 1))}
          className="h-7 w-7 border-2 bg-[#c0c0c0] font-vt323 text-base hover:bg-[#dfdfdf] active:bg-[#808080]"
          style={{
            borderTop: '2px solid #fff',
            borderLeft: '2px solid #fff',
            borderRight: '2px solid #808080',
            borderBottom: '2px solid #808080',
          }}
        >
          -
        </button>
        
        <span className="w-8 text-center font-vt323 text-base font-bold">
          {item.quantity}
        </span>
        
        <button
          onClick={() => onUpdateQuantity(item.quantity + 1)}
          className="h-7 w-7 border-2 bg-[#c0c0c0] font-vt323 text-base hover:bg-[#dfdfdf] active:bg-[#808080]"
          style={{
            borderTop: '2px solid #fff',
            borderLeft: '2px solid #fff',
            borderRight: '2px solid #808080',
            borderBottom: '2px solid #808080',
          }}
        >
          +
        </button>
      </div>

      {/* Total */}
      <div className="w-20 text-right font-vt323 text-base font-bold text-purple-600">
        €{total.toFixed(2)}
      </div>

      {/* Remove Button */}
      <button
        onClick={onRemove}
        className="h-7 w-7 border-2 bg-red-600 font-vt323 text-base text-white hover:bg-red-700 active:bg-red-800"
        style={{
          borderTop: '2px solid #fff',
          borderLeft: '2px solid #fff',
          borderRight: '2px solid #808080',
          borderBottom: '2px solid #808080',
        }}
        title="Eliminar"
      >
        🗑️
      </button>
    </div>
  );
}
