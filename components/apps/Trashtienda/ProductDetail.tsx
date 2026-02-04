'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProductGallery from './ProductGallery';
import DiscountBadge from './DiscountBadge';
import { useProduct } from '@/lib/hooks/useProducts';
import { useGamification } from '@/lib/hooks/useGamification';
import { useCartStore } from '@/lib/store/cartStore';
import { getRankDiscount } from '@/lib/constants/ranks';

interface ProductDetailProps {
  productId: number;
  onBack: () => void;
}

export default function ProductDetail({ productId, onBack }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const { product, isLoading } = useProduct(productId);
  const { gamification } = useGamification();
  const addItem = useCartStore((state) => state.addItem);

  // Get user rank and discount
  const rankSlug = gamification?.rank?.slug || 'novicia-normativa';
  const rankData = getRankDiscount(rankSlug);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="font-vt323 text-lg text-gray-600">Cargando producto...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3">
        <span className="text-6xl">❌</span>
        <p className="font-vt323 text-lg text-gray-600">Producto no encontrado</p>
        <button
          onClick={onBack}
          className="border-2 bg-[#c0c0c0] px-4 py-2 font-vt323 text-base hover:bg-[#dfdfdf]"
          style={{
            borderTop: '2px solid #fff',
            borderLeft: '2px solid #fff',
            borderRight: '2px solid #808080',
            borderBottom: '2px solid #808080',
          }}
        >
          ← Volver
        </button>
      </div>
    );
  }

  const price = parseFloat(product.price);
  const regularPrice = parseFloat(product.regular_price);
  const hasDiscount = product.on_sale && regularPrice > price;
  const isOutOfStock = product.stock_status === 'outofstock';

  const handleAddToCart = () => {
    addItem({
      key: `${product.id}-${Date.now()}`,
      product_id: product.id,
      variation_id: 0,
      quantity,
      data_hash: '',
      line_subtotal: price * quantity,
      line_subtotal_tax: 0,
      line_total: price * quantity,
      line_tax: 0,
      product,
    });
    
    // Reset quantity after adding
    setQuantity(1);
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between border-b-2 border-gray-400 pb-3">
        <button
          onClick={onBack}
          className="border-2 bg-[#c0c0c0] px-3 py-1 font-vt323 text-base hover:bg-[#dfdfdf]"
          style={{
            borderTop: '2px solid #fff',
            borderLeft: '2px solid #fff',
            borderRight: '2px solid #808080',
            borderBottom: '2px solid #808080',
          }}
        >
          ← Volver
        </button>

        {rankData.discount > 0 && (
          <DiscountBadge
            emoji={rankData.emoji}
            name={rankData.name}
            discount={rankData.discount}
          />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-2 gap-6">
          {/* Gallery */}
          <div>
            <ProductGallery images={product.images} />
          </div>

          {/* Details */}
          <div className="space-y-4">
            {/* Title */}
            <h1 className="font-vcr text-2xl text-purple-600">{product.name}</h1>

            {/* SKU */}
            {product.sku && (
              <p className="font-vt323 text-sm text-gray-600">SKU: {product.sku}</p>
            )}

            {/* Price */}
            <div className="flex items-center gap-3">
              {hasDiscount && (
                <span className="font-vt323 text-xl text-gray-500 line-through">
                  €{regularPrice.toFixed(2)}
                </span>
              )}
              <span className="font-vcr text-3xl text-purple-600">
                €{price.toFixed(2)}
              </span>
              {hasDiscount && (
                <span className="rounded bg-red-600 px-2 py-1 font-vt323 text-sm text-white">
                  -{Math.round(((regularPrice - price) / regularPrice) * 100)}% OFF
                </span>
              )}
            </div>

            {/* Short Description */}
            {product.short_description && (
              <p className="font-vt323 text-base text-gray-700">
                {product.short_description}
              </p>
            )}

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <span className="text-xl">
                {isOutOfStock ? '❌' : '✅'}
              </span>
              <span className={`font-vt323 text-base ${isOutOfStock ? 'text-red-600' : 'text-green-600'}`}>
                {isOutOfStock ? 'Agotado' : `En stock (${product.stock_quantity || 0} unidades)`}
              </span>
            </div>

            {/* Quantity Selector & Add to Cart */}
            {!isOutOfStock && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <label className="font-vt323 text-base">Cantidad:</label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="h-8 w-8 border-2 bg-[#c0c0c0] font-vt323 text-base hover:bg-[#dfdfdf]"
                      style={{
                        borderTop: '2px solid #fff',
                        borderLeft: '2px solid #fff',
                        borderRight: '2px solid #808080',
                        borderBottom: '2px solid #808080',
                      }}
                    >
                      -
                    </button>
                    
                    <span className="w-12 text-center font-vt323 text-lg font-bold">
                      {quantity}
                    </span>
                    
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="h-8 w-8 border-2 bg-[#c0c0c0] font-vt323 text-base hover:bg-[#dfdfdf]"
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
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full border-2 bg-purple-600 px-4 py-3 font-vt323 text-lg text-white hover:bg-purple-700 active:bg-purple-800"
                  style={{
                    borderTop: '2px solid #fff',
                    borderLeft: '2px solid #fff',
                    borderRight: '2px solid #808080',
                    borderBottom: '2px solid #808080',
                  }}
                >
                  🛒 Añadir al carrito - €{(price * quantity).toFixed(2)}
                </button>
              </div>
            )}

            {/* Categories */}
            {product.categories.length > 0 && (
              <div>
                <h3 className="mb-2 font-vt323 text-sm font-bold text-gray-800">
                  Categorías:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.categories.map((cat) => (
                    <span
                      key={cat.id}
                      className="rounded bg-gray-200 px-2 py-1 font-vt323 text-xs text-gray-700"
                    >
                      {cat.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Full Description */}
            {product.description && (
              <div className="border-t-2 border-gray-400 pt-4">
                <h3 className="mb-2 font-vt323 text-base font-bold text-gray-800">
                  Descripción:
                </h3>
                <div
                  className="font-vt323 text-sm text-gray-700"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
