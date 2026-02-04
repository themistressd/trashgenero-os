'use client';

import React, { useMemo, useState } from 'react';
import { useLookbooks } from '@/lib/hooks/useLookbooks';
import type { WPCustomPost, WPEmbedded } from '@/types/wordpress';

const getFeaturedImage = (embedded?: WPEmbedded) =>
  embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

const extractImages = (html: string) => {
  if (typeof window === 'undefined') return [];
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  return Array.from(doc.querySelectorAll('img'))
    .map((img) => img.getAttribute('src'))
    .filter((src): src is string => Boolean(src));
};

export default function Centerfolds() {
  const { lookbooks, isLoading, isError } = useLookbooks();
  const [selectedLookbook, setSelectedLookbook] = useState<WPCustomPost | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryImages = useMemo(() => {
    if (!selectedLookbook) return [];
    const images = extractImages(selectedLookbook.content?.rendered || '');
    const featured = getFeaturedImage(selectedLookbook._embedded);
    const merged = featured ? [featured, ...images] : images;
    return Array.from(new Set(merged));
  }, [selectedLookbook]);

  return (
    <div className="flex h-full flex-col bg-[#c0c0c0]">
      <div className="border-b-2 border-[#808080] px-4 py-3 font-vt323 text-xl text-[#000080]">
        CENTERFOLDS.zip — Lookbook & Editoriales
      </div>

      <div className="flex-1 overflow-auto bg-[#c0c0c0] p-4">
        {isLoading && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="win95-input bg-white p-4">
                <div className="h-32 w-full animate-pulse bg-gray-200" />
                <div className="mt-3 h-4 w-2/3 animate-pulse bg-gray-200" />
                <div className="mt-2 h-3 w-1/2 animate-pulse bg-gray-200" />
              </div>
            ))}
          </div>
        )}

        {!isLoading && lookbooks.length === 0 && (
          <div className="win95-input bg-white p-6 text-center font-vt323 text-base text-gray-700">
            No hay editoriales disponibles. Vuelve pronto.
          </div>
        )}

        {!isLoading && lookbooks.length > 0 && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {lookbooks.map((lookbook) => (
              <button
                key={lookbook.id}
                onClick={() => {
                  setSelectedLookbook(lookbook);
                  setSelectedImage(getFeaturedImage(lookbook._embedded));
                }}
                className="win95-input flex h-full flex-col bg-white p-4 text-left transition hover:border-bubblegum-pink"
              >
                <div className="flex h-32 w-full items-center justify-center overflow-hidden bg-gray-100">
                  {getFeaturedImage(lookbook._embedded) ? (
                    <img
                      src={getFeaturedImage(lookbook._embedded)}
                      alt={lookbook.title.rendered}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="font-vt323 text-sm text-gray-400">Sin cover</span>
                  )}
                </div>
                <h3 className="mt-3 font-vt323 text-lg text-[#000080]">
                  {lookbook.title.rendered}
                </h3>
                <p className="mt-2 font-vt323 text-xs text-gray-500">
                  {lookbook.date ? new Date(lookbook.date).toLocaleDateString('es-ES') : 'Fecha oculta'}
                </p>
              </button>
            ))}
          </div>
        )}

        {isError && !isLoading && (
          <p className="mt-4 font-vt323 text-sm text-red-600">
            Error de conexión. Mostrando datos de respaldo.
          </p>
        )}
      </div>

      {selectedLookbook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="win95-window relative max-h-[95vh] w-full max-w-4xl overflow-hidden">
            <div className="win95-window-title flex items-center justify-between bg-gradient-to-r from-purple-600 to-bubblegum-pink px-4 py-2">
              <span className="font-vt323 text-white">{selectedLookbook.title.rendered}</span>
              <button
                className="win95-button px-2 py-0 text-sm"
                onClick={() => {
                  setSelectedLookbook(null);
                  setSelectedImage(null);
                }}
              >
                X
              </button>
            </div>
            <div className="win95-window-body max-h-[85vh] overflow-auto bg-white p-6">
              <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
                <div>
                  <div className="h-80 w-full overflow-hidden bg-gray-100">
                    {selectedImage ? (
                      <img src={selectedImage} alt="Lookbook" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center font-vt323 text-sm text-gray-400">
                        Sin imágenes
                      </div>
                    )}
                  </div>
                  {galleryImages.length > 0 && (
                    <div className="mt-4 grid grid-cols-4 gap-2">
                      {galleryImages.map((image) => (
                        <button
                          key={image}
                          onClick={() => setSelectedImage(image)}
                          className={`h-16 overflow-hidden border ${
                            selectedImage === image ? 'border-bubblegum-pink' : 'border-gray-200'
                          }`}
                        >
                          <img src={image} alt="Thumbnail" className="h-full w-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="font-vt323 text-base text-gray-800">
                  <div
                    className="retro-content space-y-3"
                    dangerouslySetInnerHTML={{ __html: selectedLookbook.content.rendered }}
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
