'use client';

import React from 'react';
import { motion } from 'framer-motion';
import CartItem from './CartItem';
import DiscountBadge from './DiscountBadge';
import { useCartStore } from '@/lib/store/cartStore';
import { useGamification } from '@/lib/hooks/useGamification';
import { getRankDiscount } from '@/lib/constants/ranks';

interface CartViewProps {
  onCheckout: () => void;
  onContinueShopping: () => void;
}

export default function CartView({ onCheckout, onContinueShopping }: CartViewProps) {
  const { items, updateQuantity, removeItem, getSubtotal } = useCartStore();
  const { gamification } = useGamification();

  // Get user rank and discount
  const rankSlug = gamification?.rank?.slug || 'novicia-normativa';
  const rankData = getRankDiscount(rankSlug);

  // Calculate totals
  const subtotal = getSubtotal();
  const discountAmount = (subtotal * rankData.discount) / 100;
  const total = subtotal - discountAmount;

  if (items.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <span className="text-6xl">🛒</span>
        <h2 className="font-vcr text-2xl text-gray-800">Tu carrito está vacío</h2>
        <p className="font-vt323 text-base text-gray-600">
          ¡Añade algunos productos trash!
        </p>
        <button
          onClick={onContinueShopping}
          className="border-2 bg-purple-600 px-6 py-3 font-vt323 text-lg text-white hover:bg-purple-700"
          style={{
            borderTop: '2px solid #fff',
            borderLeft: '2px solid #fff',
            borderRight: '2px solid #808080',
            borderBottom: '2px solid #808080',
          }}
        >
          Ir a la tienda
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between border-b-2 border-gray-400 pb-3">
        <h2 className="font-vcr text-2xl text-purple-600">
          🛒 Tu Carrito ({items.length} {items.length === 1 ? 'producto' : 'productos'})
        </h2>
        <button
          onClick={onContinueShopping}
          className="border-2 bg-[#c0c0c0] px-3 py-1 font-vt323 text-base hover:bg-[#dfdfdf]"
          style={{
            borderTop: '2px solid #fff',
            borderLeft: '2px solid #fff',
            borderRight: '2px solid #808080',
            borderBottom: '2px solid #808080',
          }}
        >
          ← Seguir comprando
        </button>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-auto">
        <div className="mb-4 border-2 border-gray-400 bg-white">
          {items.map((item) => (
            <CartItem
              key={item.key}
              item={item}
              onUpdateQuantity={(qty) => updateQuantity(item.key, qty)}
              onRemove={() => removeItem(item.key)}
            />
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="space-y-3 border-t-2 border-gray-400 pt-4">
        {/* Rank Discount Badge */}
        {rankData.discount > 0 && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <DiscountBadge
              emoji={rankData.emoji}
              name={rankData.name}
              discount={rankData.discount}
            />
          </motion.div>
        )}

        {/* Price Summary */}
        <div className="space-y-2 rounded border-2 border-gray-400 bg-white p-4">
          {/* Subtotal */}
          <div className="flex justify-between font-vt323 text-base">
            <span>Subtotal:</span>
            <span>€{subtotal.toFixed(2)}</span>
          </div>

          {/* Discount */}
          {rankData.discount > 0 && (
            <div className="flex justify-between font-vt323 text-base text-green-600">
              <span>Descuento {rankData.emoji} (-{rankData.discount}%):</span>
              <span>-€{discountAmount.toFixed(2)}</span>
            </div>
          )}

          {/* Total */}
          <div className="flex justify-between border-t-2 border-gray-400 pt-2 font-vcr text-xl text-purple-600">
            <span>Total:</span>
            <span>€{total.toFixed(2)}</span>
          </div>
        </div>

        {/* Checkout Button */}
        <button
          onClick={onCheckout}
          className="w-full border-2 bg-purple-600 px-6 py-4 font-vcr text-xl text-white hover:bg-purple-700 active:bg-purple-800"
          style={{
            borderTop: '2px solid #fff',
            borderLeft: '2px solid #fff',
            borderRight: '2px solid #808080',
            borderBottom: '2px solid #808080',
          }}
        >
          💳 Proceder al Checkout
        </button>
      </div>
    </div>
  );
}
