import useSWR from 'swr';
import { getLookbooks } from '@/lib/api/wordpress';
import { shouldAllowApiMockFallback } from '@/lib/config/apiFallback';
import type { WPCustomPost } from '@/types/wordpress';

const fallbackLookbooks: WPCustomPost[] = [
  {
    id: 1,
    date: '',
    date_gmt: '',
    guid: { rendered: '' },
    modified: '',
    modified_gmt: '',
    slug: 'centerfold-neon',
    status: 'publish',
    type: 'lookbook',
    link: '',
    title: { rendered: 'Centerfold Neón' },
    content: {
      rendered:
        '<p>Editorial retrofuturista cargada de luces ácidas y texturas metálicas.</p>',
      protected: false,
    },
    excerpt: { rendered: '<p>Editorial retrofuturista.</p>', protected: false },
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
    date: '',
    date_gmt: '',
    guid: { rendered: '' },
    modified: '',
    modified_gmt: '',
    slug: 'centerfold-vcr',
    status: 'publish',
    type: 'lookbook',
    link: '',
    title: { rendered: 'Centerfold VCR' },
    content: {
      rendered:
        '<p>Un archivo perdido de cintas glam. Imágenes granuladas, actitud infinita.</p>',
      protected: false,
    },
    excerpt: { rendered: '<p>Archivo perdido de cintas glam.</p>', protected: false },
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

export const useLookbooks = () => {
  const { data, error, isLoading, mutate } = useSWR<WPCustomPost[]>(
    'lookbooks',
    () => getLookbooks({ per_page: 100 }),
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000,
    }
  );

  return {
    lookbooks: data || (error && shouldAllowApiMockFallback ? fallbackLookbooks : []),
    isLoading,
    isError: error,
    refresh: mutate,
  };
};
