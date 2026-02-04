import useSWR from 'swr';
import { getDivas, getDivaTypes } from '@/lib/api/wordpress';
import type { WPCustomPost, WPTerm } from '@/types/wordpress';

const fallbackDivas: WPCustomPost[] = [
  {
    id: 1,
    date: '',
    date_gmt: '',
    guid: { rendered: '' },
    modified: '',
    modified_gmt: '',
    slug: 'diva-fantasma',
    status: 'publish',
    type: 'divas',
    link: '',
    title: { rendered: 'Diva Fantasma' },
    content: {
      rendered:
        '<p>Una presencia etérea de la noche. Su historia se escribe en cada neón que palpita.</p>',
      protected: false,
    },
    excerpt: {
      rendered: '<p>Una presencia etérea de la noche.</p>',
      protected: false,
    },
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
    slug: 'diva-analogica',
    status: 'publish',
    type: 'divas',
    link: '',
    title: { rendered: 'Diva Analógica' },
    content: {
      rendered:
        '<p>Reina de las cintas VHS y los secretos grabados en rebobinado.</p>',
      protected: false,
    },
    excerpt: {
      rendered: '<p>Reina de las cintas VHS y los secretos grabados.</p>',
      protected: false,
    },
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

const fallbackTypes: WPTerm[] = [
  { id: 1, name: 'Rivales', slug: 'rivales', taxonomy: 'tipo-diva' },
  { id: 2, name: 'Ex-novias', slug: 'ex-novias', taxonomy: 'tipo-diva' },
  { id: 3, name: 'Aliadas', slug: 'aliadas', taxonomy: 'tipo-diva' },
  { id: 4, name: 'Iconos', slug: 'iconos', taxonomy: 'tipo-diva' },
];

export const useDivas = () => {
  const { data, error, isLoading, mutate } = useSWR<WPCustomPost[]>(
    'divas',
    () => getDivas({ per_page: 100 }),
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000,
    }
  );

  return {
    divas: data || (error ? fallbackDivas : []),
    isLoading,
    isError: error,
    refresh: mutate,
  };
};

export const useDivaTypes = () => {
  const { data, error, isLoading, mutate } = useSWR<WPTerm[]>(
    'diva-types',
    getDivaTypes,
    {
      revalidateOnFocus: false,
      dedupingInterval: 300000,
    }
  );

  return {
    types: data || (error ? fallbackTypes : []),
    isLoading,
    isError: error,
    refresh: mutate,
  };
};
