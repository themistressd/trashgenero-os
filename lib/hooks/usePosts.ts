import useSWR from 'swr';
import { getPosts } from '@/lib/api/wordpress';
import type { WPPost } from '@/types/wordpress';

const fallbackPosts: WPPost[] = [
  {
    id: 1,
    date: '2024-02-01',
    date_gmt: '',
    guid: { rendered: '' },
    modified: '',
    modified_gmt: '',
    slug: 'manifiesto-trash',
    status: 'publish',
    type: 'post',
    link: '',
    title: { rendered: 'Manifiesto Trash' },
    content: {
      rendered: '<p>Un juramento de estética tóxica y belleza radical.</p>',
      protected: false,
    },
    excerpt: { rendered: '<p>Un juramento de estética tóxica.</p>', protected: false },
    author: 0,
    featured_media: 0,
    comment_status: 'closed',
    ping_status: 'closed',
    sticky: false,
    template: '',
    format: 'standard',
    categories: [],
    tags: [],
  },
  {
    id: 2,
    date: '2024-02-10',
    date_gmt: '',
    guid: { rendered: '' },
    modified: '',
    modified_gmt: '',
    slug: 'manual-de-glitches',
    status: 'publish',
    type: 'post',
    link: '',
    title: { rendered: 'Manual de Glitches' },
    content: {
      rendered: '<p>Recetas para distorsionar la realidad con estilo.</p>',
      protected: false,
    },
    excerpt: { rendered: '<p>Recetas para distorsionar la realidad.</p>', protected: false },
    author: 0,
    featured_media: 0,
    comment_status: 'closed',
    ping_status: 'closed',
    sticky: false,
    template: '',
    format: 'standard',
    categories: [],
    tags: [],
  },
  {
    id: 3,
    date: '2024-02-22',
    date_gmt: '',
    guid: { rendered: '' },
    modified: '',
    modified_gmt: '',
    slug: 'cronicas-del-culto',
    status: 'publish',
    type: 'post',
    link: '',
    title: { rendered: 'Crónicas del culto' },
    content: {
      rendered: '<p>Notas internas y rituales documentados.</p>',
      protected: false,
    },
    excerpt: { rendered: '<p>Notas internas y rituales documentados.</p>', protected: false },
    author: 0,
    featured_media: 0,
    comment_status: 'closed',
    ping_status: 'closed',
    sticky: false,
    template: '',
    format: 'standard',
    categories: [],
    tags: [],
  },
];

export const usePosts = (params?: {
  per_page?: number;
  page?: number;
  categories?: number[];
  tags?: number[];
}) => {
  const { data, error, isLoading, mutate } = useSWR<WPPost[]>(
    ['posts', JSON.stringify(params)],
    () => getPosts(params),
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000,
    }
  );

  return {
    posts: data || (error ? fallbackPosts : []),
    isLoading,
    isError: error,
    refresh: mutate,
  };
};
