'use client';

import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { usePage } from '@/lib/hooks/usePage';

type TabKey = 'bio' | 'manifiesto' | 'about';

const tabs: Array<{ id: TabKey; label: string; icon: string }> = [
  { id: 'bio', label: 'BIO', icon: '⚡' },
  { id: 'manifiesto', label: 'MANIFIESTO', icon: '📜' },
  { id: 'about', label: 'ABOUT', icon: '🗂️' },
];

const aboutHtml = `
  <h3>TrashGènero OS</h3>
  <p>Un archivo viviente de estética trash, rituales digitales y memoria pop.</p>
  <ul>
    <li>Win95 vibes, luces de neón y glitch permanente.</li>
    <li>Apps mutantes conectadas al universo WordPress.</li>
    <li>Contenido curado para cultos y divas del underground.</li>
  </ul>
`;

export default function MistressD() {
  const [activeTab, setActiveTab] = useState<TabKey>('bio');
  const { page: bioPage, isLoading: isBioLoading, isError: bioError } = usePage('about');
  const { page: manifestoPage, isLoading: isManifestoLoading, isError: manifestoError } = usePage('manifiesto');

  const content = useMemo(() => {
    if (activeTab === 'about') {
      return { title: 'ABOUT', html: aboutHtml };
    }

    const page = activeTab === 'bio' ? bioPage : manifestoPage;
    return {
      title: page?.title?.rendered || 'Cargando...',
      html: page?.content?.rendered || '<p>Sin contenido disponible.</p>',
    };
  }, [activeTab, bioPage, manifestoPage]);

  const isLoading = (activeTab === 'bio' && isBioLoading) || (activeTab === 'manifiesto' && isManifestoLoading);
  const isError = (activeTab === 'bio' && bioError) || (activeTab === 'manifiesto' && manifestoError);

  return (
    <div className="flex h-full flex-col bg-[#c0c0c0]">
      <div className="border-b-2 border-[#808080] px-4 py-3 font-vt323 text-xl text-[#000080]">
        Mistress D.exe — Archivo personal
      </div>

      <div className="flex border-b-2 border-[#808080]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex items-center gap-2 px-4 py-2 font-vt323 text-base transition-colors ${
              activeTab === tab.id
                ? 'border-b-2 border-[#c0c0c0] bg-[#c0c0c0] text-gray-800'
                : 'border-2 border-[#808080] bg-[#dfdfdf] text-gray-600 hover:bg-[#c0c0c0]'
            }`}
            style={{
              borderTop: '2px solid #fff',
              borderLeft: '2px solid #fff',
              borderRight: '2px solid #808080',
              ...(activeTab === tab.id && {
                borderBottom: '2px solid #c0c0c0',
                marginBottom: '-2px',
              }),
            }}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
            {activeTab === tab.id && (
              <motion.div
                layoutId="mistress-active-tab"
                className="absolute bottom-0 left-0 right-0 h-1 bg-bubblegum-pink"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-auto bg-[#c0c0c0] p-4">
        {isLoading && (
          <div className="space-y-3">
            <div className="h-6 w-2/3 animate-pulse bg-gray-200" />
            <div className="h-4 w-full animate-pulse bg-gray-200" />
            <div className="h-4 w-5/6 animate-pulse bg-gray-200" />
            <div className="h-4 w-4/6 animate-pulse bg-gray-200" />
          </div>
        )}

        {!isLoading && (
          <div className="win95-input bg-white p-4">
            {isError && (
              <p className="mb-3 font-vt323 text-sm text-red-600">
                Error al cargar el contenido. Mostrando datos de respaldo.
              </p>
            )}
            <div className="retro-content space-y-3 font-vt323 text-base text-gray-800">
              <h2 className="text-xl font-bold text-[#000080]">{content.title}</h2>
              <div dangerouslySetInnerHTML={{ __html: content.html }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
