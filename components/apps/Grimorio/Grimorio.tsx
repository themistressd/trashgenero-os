'use client';

import React, { useMemo, useState } from 'react';
import { usePosts } from '@/lib/hooks/usePosts';
import type { WPPost } from '@/types/wordpress';

const stripHtml = (html: string) => html.replace(/<[^>]+>/g, '').trim();
const formatDate = (date?: string) =>
  date ? new Date(date).toLocaleDateString('es-ES') : 'Fecha oculta';

export default function Grimorio() {
  const [search, setSearch] = useState('');
  const [selectedPost, setSelectedPost] = useState<WPPost | null>(null);
  const { posts, isLoading, isError } = usePosts({ per_page: 20 });

  const filtered = useMemo(
    () =>
      posts.filter((post) =>
        post.title.rendered.toLowerCase().includes(search.toLowerCase())
      ),
    [posts, search]
  );

  return (
    <div className="flex h-full flex-col gap-4 bg-[#c0c0c0] p-4">
      <div className="border-b-2 border-[#808080] pb-3">
        <div className="font-vcr text-2xl text-bubblegum-pink">Grimorio.exe</div>
        <div className="font-vt323 text-sm text-gray-700">Archivo de textos, manifiestos y notas.</div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <label className="font-vt323 text-sm text-gray-700" htmlFor="grimorio-search">
          Buscar
        </label>
        <input
          id="grimorio-search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="win95-input flex-1"
          placeholder="Filtra por título..."
        />
      </div>

      <div className="space-y-3">
        {isLoading && (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={`grimorio-skeleton-${index}`}
                className="rounded border-2 border-[#808080] bg-[#dfdfdf] p-4"
              >
                <div className="h-4 w-2/3 animate-pulse bg-gray-300" />
                <div className="mt-2 h-3 w-full animate-pulse bg-gray-200" />
                <div className="mt-1 h-3 w-5/6 animate-pulse bg-gray-200" />
              </div>
            ))}
          </div>
        )}

        {!isLoading &&
          filtered.map((post) => (
            <button
              key={post.id}
              type="button"
              onClick={() => setSelectedPost(post)}
              className="w-full rounded border-2 border-[#808080] bg-[#dfdfdf] p-4 text-left transition hover:border-bubblegum-pink"
            >
              <div className="font-vcr text-lg text-gray-800">
                {post.title.rendered}
              </div>
              <div className="font-vt323 text-xs text-gray-600">
                {formatDate(post.date)}
              </div>
              <p className="mt-2 font-vt323 text-sm text-gray-700">
                {stripHtml(post.excerpt?.rendered || post.content?.rendered || '') ||
                  'Entrada en preparación.'}
              </p>
            </button>
          ))}

        {!isLoading && filtered.length === 0 && (
          <div className="rounded border-2 border-[#808080] bg-[#dfdfdf] p-4 font-vt323 text-sm text-gray-700">
            No hay entradas con ese filtro.
          </div>
        )}

        {isError && !isLoading && (
          <p className="font-vt323 text-xs text-red-600">
            Error de conexión. Mostrando contenido de respaldo.
          </p>
        )}
      </div>

      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="win95-window relative max-h-[90vh] w-full max-w-3xl overflow-hidden">
            <div className="win95-window-title flex items-center justify-between bg-gradient-to-r from-purple-600 to-bubblegum-pink px-4 py-2">
              <span className="font-vt323 text-white">{selectedPost.title.rendered}</span>
              <button
                className="win95-button px-2 py-0 text-sm"
                onClick={() => setSelectedPost(null)}
              >
                X
              </button>
            </div>
            <div className="win95-window-body max-h-[80vh] overflow-auto bg-white p-6">
              <div className="mb-3 font-vt323 text-xs text-gray-500">
                {formatDate(selectedPost.date)}
              </div>
              <div
                className="retro-content space-y-3 font-vt323 text-base text-gray-800"
                dangerouslySetInnerHTML={{ __html: selectedPost.content.rendered }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
