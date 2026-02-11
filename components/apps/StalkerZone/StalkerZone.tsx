'use client';

import Image from 'next/image';
import React, { useEffect, useMemo, useState } from 'react';
import { SOCIAL_LINKS } from '@/lib/constants/socialLinks';

type TabKey = 'instagram' | 'tiktok' | 'onlyfans' | 'twitter';

interface InstagramPost {
  id: string;
  image: string;
  caption: string;
  date: string;
  link: string;
}

interface InstagramProfile {
  username: string;
  followers: string;
  description: string;
}

interface InstagramEdgeNode {
  id: string;
  display_url: string;
  taken_at_timestamp: number;
  shortcode: string;
  edge_media_to_caption?: { edges?: Array<{ node?: { text?: string } }> };
}

interface InstagramEdge {
  node: InstagramEdgeNode;
}

const mockProfile: InstagramProfile = {
  username: '@trashgnero',
  followers: '12.4k',
  description: 'Glitch diva. Rituals, neón & caos elegante.',
};

const mockPosts: InstagramPost[] = [
  {
    id: 'mock-1',
    image: 'https://placehold.co/300x300?text=TRASHG+01',
    caption: 'Ritual nocturno en 8 bits.',
    date: '2024-02-01',
    link: 'https://www.instagram.com/trashgnero/',
  },
  {
    id: 'mock-2',
    image: 'https://placehold.co/300x300?text=TRASHG+02',
    caption: 'Neón, latex y visiones.',
    date: '2024-02-10',
    link: 'https://www.instagram.com/trashgnero/',
  },
  {
    id: 'mock-3',
    image: 'https://placehold.co/300x300?text=TRASHG+03',
    caption: 'Archivo secreto desde la zona cero.',
    date: '2024-03-05',
    link: 'https://www.instagram.com/trashgnero/',
  },
  {
    id: 'mock-4',
    image: 'https://placehold.co/300x300?text=TRASHG+04',
    caption: 'Club nocturno, glitch infinito.',
    date: '2024-03-20',
    link: 'https://www.instagram.com/trashgnero/',
  },
];

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

export default function StalkerZone() {
  const [activeTab, setActiveTab] = useState<TabKey>('instagram');
  const [posts, setPosts] = useState<InstagramPost[]>(mockPosts);
  const [profile, setProfile] = useState<InstagramProfile>(mockProfile);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchInstagram = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://www.instagram.com/trashgnero/?__a=1&__d=dis');
        if (!response.ok) throw new Error('Instagram API error');
        const data = await response.json();
        const user = data?.graphql?.user;
        const edges = (user?.edge_owner_to_timeline_media?.edges || []) as InstagramEdge[];

        const fetchedPosts: InstagramPost[] = edges.slice(0, 9).map((edge) => ({
          id: edge.node.id,
          image: edge.node.display_url,
          caption: edge.node.edge_media_to_caption?.edges?.[0]?.node?.text || 'Nueva transmisión.',
          date: new Date(edge.node.taken_at_timestamp * 1000).toISOString(),
          link: `https://www.instagram.com/p/${edge.node.shortcode}/`,
        }));

        setProfile({
          username: `@${user?.username || 'trashgnero'}`,
          followers: user?.edge_followed_by?.count?.toLocaleString('es-ES') || mockProfile.followers,
          description: user?.biography || mockProfile.description,
        });

        if (fetchedPosts.length > 0) {
          setPosts(fetchedPosts);
        } else {
          setPosts(mockPosts);
        }
        setHasError(false);
      } catch {
        setPosts(mockPosts);
        setProfile(mockProfile);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInstagram();
  }, []);

  const socialButtons = useMemo(
    () => SOCIAL_LINKS.filter((link) => link.id !== 'instagram'),
    []
  );

  return (
    <div className="flex h-full flex-col bg-[#c0c0c0]">
      <div className="border-b-2 border-[#808080] px-4 py-3 font-vt323 text-xl text-[#000080]">
        STsLK3R_Z0NE — Redes Sociales Retro
      </div>

      <div className="flex border-b-2 border-[#808080]">
        {(['instagram', 'tiktok', 'onlyfans', 'twitter'] as TabKey[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative flex items-center gap-2 px-4 py-2 font-vt323 text-base transition-colors ${
              activeTab === tab
                ? 'border-b-2 border-[#c0c0c0] bg-[#c0c0c0] text-gray-800'
                : 'border-2 border-[#808080] bg-[#dfdfdf] text-gray-600 hover:bg-[#c0c0c0]'
            }`}
            style={{
              borderTop: '2px solid #fff',
              borderLeft: '2px solid #fff',
              borderRight: '2px solid #808080',
              ...(activeTab === tab && {
                borderBottom: '2px solid #c0c0c0',
                marginBottom: '-2px',
              }),
            }}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-hidden bg-[#c0c0c0] p-4">
        {activeTab === 'instagram' && (
          <div className="flex h-full flex-col gap-4">
            <div className="win95-input flex items-center justify-between bg-white px-4 py-3">
              <div>
                <div className="font-vt323 text-lg text-[#000080]">{profile.username}</div>
                <div className="font-vt323 text-sm text-gray-600">{profile.description}</div>
              </div>
              <div className="text-right font-vt323 text-sm text-gray-600">
                <div>Followers</div>
                <div className="text-lg text-bubblegum-pink">{profile.followers}</div>
              </div>
            </div>

            <div className="win95-input flex-1 overflow-auto bg-white p-4 retro-scrollbar">
              {isLoading && (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="space-y-2">
                      <div className="h-28 w-full animate-pulse bg-gray-200" />
                      <div className="h-3 w-3/4 animate-pulse bg-gray-200" />
                      <div className="h-3 w-1/2 animate-pulse bg-gray-200" />
                    </div>
                  ))}
                </div>
              )}

              {!isLoading && (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {posts.map((post) => (
                    <button
                      key={post.id}
                      onClick={() => window.open(post.link, '_blank', 'noopener,noreferrer')}
                      className="text-left transition hover:opacity-90"
                    >
                      <div className="h-28 w-full overflow-hidden bg-gray-100">
                        <Image src={post.image} alt={post.caption} className="h-full w-full object-cover" width={320} height={180} unoptimized />
                      </div>
                      <div className="mt-2 font-vt323 text-xs text-gray-700 line-clamp-2">
                        {post.caption}
                      </div>
                      <div className="font-vt323 text-[10px] text-gray-500">
                        {formatDate(post.date)}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {hasError && !isLoading && (
                <p className="mt-4 font-vt323 text-xs text-red-600">
                  Instagram bloqueó la petición. Mostrando datos de respaldo.
                </p>
              )}
            </div>
          </div>
        )}

        {activeTab !== 'instagram' && (
          <div className="flex h-full flex-col items-center justify-center gap-6 font-vt323">
            {socialButtons
              .filter((link) => link.id === activeTab)
              .map((link) => (
                <div key={link.id} className="win95-input bg-white p-8 text-center">
                  <div className="text-4xl">{link.icon}</div>
                  <h3 className="mt-2 text-xl text-[#000080]">{link.label}</h3>
                  {link.href === '#' ? (
                    <p className="mt-2 text-sm text-gray-500">Próximamente</p>
                  ) : (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block win95-button px-4 py-2 text-sm"
                    >
                      Abrir {link.label}
                    </a>
                  )}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
