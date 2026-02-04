'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import FilterBar from './FilterBar';
import { useProducts, useCategories } from '@/lib/hooks/useProducts';
import { useCartStore } from '@/lib/store/cartStore';
import type { Product } from '@/types/woocommerce';

interface ProductGridProps {
  onProductClick: (productId: number) => void;
}

export default function ProductGrid({ onProductClick }: ProductGridProps) {
  const [search, setSearch] = useState('');
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [sort, setSort] = useState('default');

  const { categories } = useCategories();
  const { products, isLoading } = useProducts({
    search: search || undefined,
    category: categoryId || undefined,
  });
  const addItem = useCartStore((state) => state.addItem);

  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...products];

    switch (sort) {
      case 'price_asc':
        sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case 'price_desc':
        sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case 'date':
        sorted.sort((a, b) => 
          new Date(b.date_created).getTime() - new Date(a.date_created).getTime()
        );
        break;
      case 'popularity':
        sorted.sort((a, b) => b.total_sales - a.total_sales);
        break;
      default:
        break;
    }

    return sorted;
  }, [products, sort]);

  const handleQuickAdd = (product: Product) => {
    addItem({
      key: `${product.id}-${Date.now()}`,
      product_id: product.id,
      variation_id: 0,
      quantity: 1,
      data_hash: '',
      line_subtotal: parseFloat(product.price),
      line_subtotal_tax: 0,
      line_total: parseFloat(product.price),
      line_tax: 0,
      product,
    });
  };

  return (
    <div className="flex h-full flex-col">
      {/* Filters */}
      <div className="mb-4">
        <FilterBar
          onSearchChange={setSearch}
          onCategoryChange={setCategoryId}
          onSortChange={setSort}
          categories={categories}
        />
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-1 items-center justify-center">
          <div className="font-vt323 text-lg text-gray-600">
            Cargando productos...
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && sortedProducts.length === 0 && (
        <div className="flex flex-1 flex-col items-center justify-center gap-3">
          <span className="text-6xl">📦</span>
          <p className="font-vt323 text-lg text-gray-600">
            No se encontraron productos
          </p>
          <button
            onClick={() => {
              setSearch('');
              setCategoryId(null);
              setSort('default');
            }}
            className="border-2 bg-[#c0c0c0] px-4 py-2 font-vt323 text-base hover:bg-[#dfdfdf]"
            style={{
              borderTop: '2px solid #fff',
              borderLeft: '2px solid #fff',
              borderRight: '2px solid #808080',
              borderBottom: '2px solid #808080',
            }}
          >
            Limpiar filtros
          </button>
        </div>
      )}

      {/* Product Grid */}
      {!isLoading && sortedProducts.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid flex-1 grid-cols-3 gap-4 overflow-auto"
        >
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => onProductClick(product.id)}
              onQuickAdd={() => handleQuickAdd(product)}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}
