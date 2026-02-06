'use client';

import React from 'react';
import CartView from '@/components/apps/Trashtienda/CartView';

export default function Carrito() {
  return (
    <div className="flex h-full flex-col bg-[#c0c0c0] p-4">
      <div className="mb-4 border-b-2 border-[#808080] pb-3">
        <div className="font-vcr text-2xl text-bubblegum-pink">Carrito.exe</div>
        <div className="font-vt323 text-sm text-gray-700">
          Tu selección actual de reliquias para checkout.
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <CartView onCheckout={() => {}} onContinueShopping={() => {}} />
      </div>
    </div>
  );
}
