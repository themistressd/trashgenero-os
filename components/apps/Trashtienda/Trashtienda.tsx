'use client';

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ProductGrid from './ProductGrid';
import ProductDetail from './ProductDetail';
import CartView from './CartView';
import Checkout from './Checkout';
import SuccessModal from './SuccessModal';
import { useCartStore } from '@/lib/store/cartStore';

type ViewType = 'grid' | 'detail' | 'cart' | 'checkout';

export default function Trashtienda() {
  const [currentView, setCurrentView] = useState<ViewType>('grid');
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [successOrderId, setSuccessOrderId] = useState<number | null>(null);
  const itemCount = useCartStore((state) => state.itemCount);

  const handleProductClick = (productId: number) => {
    setSelectedProductId(productId);
    setCurrentView('detail');
  };

  const handleBackToGrid = () => {
    setCurrentView('grid');
    setSelectedProductId(null);
  };

  const handleViewCart = () => {
    setCurrentView('cart');
  };

  const handleCheckout = () => {
    setCurrentView('checkout');
  };

  const handleBackToCart = () => {
    setCurrentView('cart');
  };

  const handleOrderSuccess = (orderId: number) => {
    setSuccessOrderId(orderId);
    setCurrentView('grid');
  };

  const handleCloseSuccess = () => {
    setSuccessOrderId(null);
  };

  return (
    <div className="flex h-full flex-col bg-[#c0c0c0] p-4">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between border-b-2 border-gray-400 pb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🛍️</span>
          <h1 className="font-vcr text-2xl text-purple-600">Trashtienda.exe</h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Cart Button */}
          {currentView !== 'cart' && currentView !== 'checkout' && (
            <button
              onClick={handleViewCart}
              className="relative border-2 bg-[#c0c0c0] px-4 py-2 font-vt323 text-base hover:bg-[#dfdfdf] active:bg-[#808080]"
              style={{
                borderTop: '2px solid #fff',
                borderLeft: '2px solid #fff',
                borderRight: '2px solid #808080',
                borderBottom: '2px solid #808080',
              }}
            >
              <span className="flex items-center gap-2">
                <span>🛒</span>
                <span>Carrito</span>
              </span>
              {itemCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 font-vt323 text-xs text-white">
                  {itemCount}
                </span>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {currentView === 'grid' && (
          <ProductGrid onProductClick={handleProductClick} />
        )}

        {currentView === 'detail' && selectedProductId && (
          <ProductDetail
            productId={selectedProductId}
            onBack={handleBackToGrid}
          />
        )}

        {currentView === 'cart' && (
          <CartView
            onCheckout={handleCheckout}
            onContinueShopping={handleBackToGrid}
          />
        )}

        {currentView === 'checkout' && (
          <Checkout
            onSuccess={handleOrderSuccess}
            onBack={handleBackToCart}
          />
        )}
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {successOrderId && (
          <SuccessModal
            orderId={successOrderId}
            onClose={handleCloseSuccess}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
