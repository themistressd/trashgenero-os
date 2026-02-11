'use client';

import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import type { Product } from '@/types/woocommerce';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  onQuickAdd: () => void;
}

export default function ProductCard({ product, onClick, onQuickAdd }: ProductCardProps) {
  const price = parseFloat(product.price);
  const regularPrice = parseFloat(product.regular_price);
  const hasDiscount = product.on_sale && regularPrice > price;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group cursor-pointer overflow-hidden border-2 bg-white transition-shadow hover:shadow-lg"
      style={{
        borderTop: '2px solid #fff',
        borderLeft: '2px solid #fff',
        borderRight: '2px solid #808080',
        borderBottom: '2px solid #808080',
      }}
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {product.images.length > 0 ? (
          <Image
            src={product.images[0].src}
            alt={product.images[0].alt}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
            width={512}
            height={512}
            unoptimized
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gray-200">
            <span className="text-4xl">📦</span>
          </div>
        )}

        {/* Sale Badge */}
        {hasDiscount && (
          <div className="absolute right-2 top-2 bg-red-600 px-2 py-1 font-vt323 text-xs text-white">
            -{Math.round(((regularPrice - price) / regularPrice) * 100)}%
          </div>
        )}

        {/* Stock Status */}
        {product.stock_status === 'outofstock' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60">
            <span className="font-vcr text-lg text-white">AGOTADO</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="mb-2 line-clamp-2 font-vt323 text-base font-bold text-gray-800">
          {product.name}
        </h3>

        {/* Price */}
        <div className="mb-3 flex items-center gap-2">
          {hasDiscount && (
            <span className="font-vt323 text-sm text-gray-500 line-through">
              €{regularPrice.toFixed(2)}
            </span>
          )}
          <span className="font-vt323 text-lg font-bold text-purple-600">
            €{price.toFixed(2)}
          </span>
        </div>

        {/* Quick Add Button */}
        {product.stock_status === 'instock' && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickAdd();
            }}
            className="w-full border-2 bg-[#c0c0c0] px-3 py-1 font-vt323 text-sm transition-colors hover:bg-[#dfdfdf] active:bg-[#808080]"
            style={{
              borderTop: '2px solid #fff',
              borderLeft: '2px solid #fff',
              borderRight: '2px solid #808080',
              borderBottom: '2px solid #808080',
            }}
          >
            🛒 Añadir al carrito
          </button>
        )}
      </div>
    </motion.div>
  );
}
