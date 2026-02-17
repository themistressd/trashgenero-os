'use client';

import React, { useMemo, useState } from 'react';

type Clip = {
  id: string;
  title: string;
  type: 'Campaña' | 'Clip';
  duration: string;
  source: string;
};

const playlist: Clip[] = [
  {
    id: 'tv-001',
    title: 'TRASH_VISION.exe · Campaña VHS Ritual',
    type: 'Campaña',
    duration: '02:34',
    source: 'https://www.youtube.com/embed/aqz-KE-bpKQ',
  },
  {
    id: 'tv-002',
    title: 'Latex Cathedral — Teaser',
    type: 'Clip',
    duration: '01:12',
    source: 'https://www.youtube.com/embed/ScMzIvxBSi4',
  },
  {
    id: 'tv-003',
    title: 'Backstage: Neon Coven',
    type: 'Clip',
    duration: '03:08',
    source: 'https://www.youtube.com/embed/LXb3EKWsInQ',
  },
];

const modeLabel: Record<Clip['type'], string> = {
  Campaña: 'text-[#ff00ff]',
  Clip: 'text-[#0000ff]',
};

export default function Transmisiones() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const currentClip = playlist[currentIndex];

  const progress = useMemo(() => {
    if (!isPlaying) return 22;
    return 22 + ((currentIndex + 1) / playlist.length) * 60;
  }, [currentIndex, isPlaying]);

  const playPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    setIsPlaying(true);
  };

  const playNext = () => {
    setCurrentIndex((prev) => (prev + 1) % playlist.length);
    setIsPlaying(true);
  };

  return (
    <div className="flex h-full flex-col gap-4 bg-[#c0c0c0] p-4">
      <div className="border-b-2 border-[#808080] pb-3">
        <div className="font-vcr text-2xl text-bubblegum-pink">TRASH_VISION.exe</div>
        <div className="font-vt323 text-sm text-gray-700">TV Player estilo Winamp: campañas y clips en vivo, replays y contenido exclusivo.</div>
      </div>

      <div className="border-2 border-[#808080] bg-[#dfdfdf] p-3">
        <div className="mb-2 flex items-center justify-between gap-3 font-vt323 text-xs">
          <span className="text-[#000080]">Winamp Skin: TRASH_VISION SIGNAL</span>
          <span className={`${modeLabel[currentClip.type]} font-bold`}>{currentClip.type.toUpperCase()}</span>
        </div>

        <div className="mb-3 h-2 w-full border border-[#808080] bg-black">
          <div className="h-full bg-[#00ff00]" style={{ width: `${progress}%` }} />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button className="win95-button px-3 py-1 text-xs" onClick={playPrev}>
            ⏮ PREV
          </button>
          <button className="win95-button px-3 py-1 text-xs" onClick={() => setIsPlaying((v) => !v)}>
            {isPlaying ? '⏸ PAUSE' : '▶ PLAY'}
          </button>
          <button className="win95-button px-3 py-1 text-xs" onClick={playNext}>
            ⏭ NEXT
          </button>
          <span className="ml-auto font-vt323 text-xs text-gray-700">{currentClip.duration}</span>
        </div>
      </div>

      <div className="grid flex-1 gap-4 md:grid-cols-[2fr_1fr]">
        <div className="border-2 border-[#808080] bg-black p-2">
          <iframe
            title={currentClip.title}
            src={currentClip.source}
            className="h-full min-h-[240px] w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="border-2 border-[#808080] bg-[#dfdfdf] p-2">
          <div className="mb-2 border-b border-[#808080] pb-2 font-vcr text-base text-[#000080]">PLAYLIST.m3u</div>
          <div className="space-y-2 overflow-auto pr-1">
            {playlist.map((clip, index) => {
              const isActive = index === currentIndex;
              return (
                <button
                  key={clip.id}
                  onClick={() => {
                    setCurrentIndex(index);
                    setIsPlaying(true);
                  }}
                  className={`w-full border-2 px-2 py-2 text-left font-vt323 text-sm ${
                    isActive
                      ? 'border-[#000080] bg-[#c0c0ff] text-[#000080]'
                      : 'border-[#808080] bg-[#f4f4f4] text-gray-700'
                  }`}
                >
                  <div className="truncate">{clip.title}</div>
                  <div className="text-xs text-gray-500">{clip.type} · {clip.duration}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
