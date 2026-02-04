'use client';

import React, { useState, useEffect } from 'react';

interface FilterBarProps {
  onSearchChange: (search: string) => void;
  onCategoryChange: (categoryId: number | null) => void;
  onSortChange: (sort: string) => void;
  categories: Array<{ id: number; name: string; slug: string; count: number }>;
}

export default function FilterBar({
  onSearchChange,
  onCategoryChange,
  onSortChange,
  categories,
}: FilterBarProps) {
  const [search, setSearch] = useState('');

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search, onSearchChange]);

  return (
    <div className="mb-4 flex flex-wrap gap-3">
      {/* Search Input */}
      <div className="flex-1 min-w-[200px]">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border-2 bg-white px-3 py-2 font-vt323 text-base focus:outline-none"
          style={{
            borderTop: '2px solid #808080',
            borderLeft: '2px solid #808080',
            borderRight: '2px solid #fff',
            borderBottom: '2px solid #fff',
          }}
        />
      </div>

      {/* Category Filter */}
      <div>
        <select
          onChange={(e) => onCategoryChange(e.target.value ? Number(e.target.value) : null)}
          className="border-2 bg-[#c0c0c0] px-3 py-2 font-vt323 text-base focus:outline-none"
          style={{
            borderTop: '2px solid #fff',
            borderLeft: '2px solid #fff',
            borderRight: '2px solid #808080',
            borderBottom: '2px solid #808080',
          }}
        >
          <option value="">Todas las categorías</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name} ({cat.count})
            </option>
          ))}
        </select>
      </div>

      {/* Sort */}
      <div>
        <select
          onChange={(e) => onSortChange(e.target.value)}
          className="border-2 bg-[#c0c0c0] px-3 py-2 font-vt323 text-base focus:outline-none"
          style={{
            borderTop: '2px solid #fff',
            borderLeft: '2px solid #fff',
            borderRight: '2px solid #808080',
            borderBottom: '2px solid #808080',
          }}
        >
          <option value="default">Ordenar por...</option>
          <option value="price_asc">Precio: Menor a Mayor</option>
          <option value="price_desc">Precio: Mayor a Menor</option>
          <option value="date">Más Recientes</option>
          <option value="popularity">Más Populares</option>
        </select>
      </div>
    </div>
  );
}
