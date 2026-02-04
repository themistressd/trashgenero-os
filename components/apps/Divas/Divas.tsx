'use client';

import React, { useMemo, useState } from 'react';
import { useDivas, useDivaTypes } from '@/lib/hooks/useDivas';
import type { WPCustomPost, WPEmbedded } from '@/types/wordpress';

type DivaFilter = 'all' | string;

const stripHtml = (html: string) => html.replace(/<[^>]+>/g, '').trim();

const getFeaturedImage = (embedded?: WPEmbedded) =>
  embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

export default function Divas() {
  const { divas, isLoading, isError } = useDivas();
  const { types } = useDivaTypes();
  const [activeFilter, setActiveFilter] = useState<DivaFilter>('all');
  const [selectedDiva, setSelectedDiva] = useState<WPCustomPost | null>(null);

  const filters = useMemo(
    () => [
      { id: 'all', label: 'Todas' },
      ...types.map((type) => ({ id: type.slug, label: type.name })),
    ],
    [types]
  );

  const filteredDivas = useMemo(() => {
    if (activeFilter === 'all') return divas;
    return divas.filter((diva) => {
      const terms = diva._embedded?.['wp:term']?.flat() || [];
      return terms.some((term) => term.slug === activeFilter);
    });
  }, [activeFilter, divas]);

  return (
    <div className="flex h-full flex-col bg-[#c0c0c0]">
      <div className="border-b-2 border-[#808080] px-4 py-3 font-vt323 text-xl text-[#000080]">
        Divas.rar — Lore & Personajes
      </div>

      <div className="flex flex-wrap gap-2 border-b-2 border-[#808080] px-3 py-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`win95-button px-3 py-1 font-vt323 text-sm ${
              activeFilter === filter.id ? 'bg-bubblegum-pink text-white' : ''
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-auto bg-[#c0c0c0] p-4">
        {isLoading && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="win95-input bg-white p-4">
                <div className="h-32 w-full animate-pulse bg-gray-200" />
                <div className="mt-3 h-4 w-2/3 animate-pulse bg-gray-200" />
                <div className="mt-2 h-3 w-full animate-pulse bg-gray-200" />
              </div>
            ))}
          </div>
        )}

        {!isLoading && filteredDivas.length === 0 && (
          <div className="win95-input bg-white p-6 text-center font-vt323 text-base text-gray-700">
            No hay divas disponibles. Vuelve pronto.
          </div>
        )}

        {!isLoading && filteredDivas.length > 0 && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredDivas.map((diva) => {
              const image = getFeaturedImage(diva._embedded);
              return (
                <button
                  key={diva.id}
                  onClick={() => setSelectedDiva(diva)}
                  className="win95-input flex h-full flex-col bg-white p-4 text-left transition hover:border-bubblegum-pink"
                >
                  <div className="flex h-32 w-full items-center justify-center overflow-hidden bg-gray-100">
                    {image ? (
                      <img src={image} alt={diva.title.rendered} className="h-full w-full object-cover" />
                    ) : (
                      <span className="font-vt323 text-sm text-gray-400">Sin imagen</span>
                    )}
                  </div>
                  <h3 className="mt-3 font-vt323 text-lg text-[#000080]">
                    {diva.title.rendered}
                  </h3>
                  <p className="mt-2 line-clamp-3 font-vt323 text-sm text-gray-600">
                    {stripHtml(diva.excerpt?.rendered || diva.content?.rendered || '') || 'Perfil en construcción.'}
                  </p>
                </button>
              );
            })}
          </div>
        )}

        {isError && !isLoading && (
          <p className="mt-4 font-vt323 text-sm text-red-600">
            Error de conexión. Mostrando datos de respaldo.
          </p>
        )}
      </div>

      {selectedDiva && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="win95-window relative max-h-[90vh] w-full max-w-2xl overflow-hidden">
            <div className="win95-window-title flex items-center justify-between bg-gradient-to-r from-purple-600 to-bubblegum-pink px-4 py-2">
              <span className="font-vt323 text-white">{selectedDiva.title.rendered}</span>
              <button
                className="win95-button px-2 py-0 text-sm"
                onClick={() => setSelectedDiva(null)}
              >
                X
              </button>
            </div>
            <div className="win95-window-body max-h-[80vh] overflow-auto bg-white p-6">
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="h-48 w-full overflow-hidden bg-gray-100 md:w-1/3">
                  {getFeaturedImage(selectedDiva._embedded) ? (
                    <img
                      src={getFeaturedImage(selectedDiva._embedded)}
                      alt={selectedDiva.title.rendered}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center font-vt323 text-sm text-gray-400">
                      Sin imagen
                    </div>
                  )}
                </div>
                <div className="flex-1 font-vt323 text-base text-gray-800">
                  <div
                    className="retro-content space-y-3"
                    dangerouslySetInnerHTML={{ __html: selectedDiva.content.rendered }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
