import useSWR from 'swr';
import { getPageBySlug } from '@/lib/api/wordpress';
import type { WPPage } from '@/types/wordpress';

const fallbackPage: WPPage = {
  id: 0,
  date: '',
  date_gmt: '',
  guid: { rendered: '' },
  modified: '',
  modified_gmt: '',
  slug: 'fallback',
  status: 'publish',
  type: 'page',
  link: '',
  title: { rendered: 'Contenido no disponible' },
  content: {
    rendered: '<p>Estamos afinando el hechizo. Vuelve pronto.</p>',
    protected: false,
  },
  excerpt: { rendered: '', protected: false },
  author: 0,
  featured_media: 0,
  comment_status: 'closed',
  ping_status: 'closed',
  sticky: false,
  template: '',
  format: 'standard',
  categories: [],
  tags: [],
};

export const usePage = (slug: string) => {
  const { data, error, isLoading, mutate } = useSWR<WPPage | null>(
    slug ? ['page', slug] : null,
    slug ? () => getPageBySlug(slug) : null,
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000,
    }
  );

  return {
    page: data || (error ? fallbackPage : null),
    isLoading,
    isError: error,
    refresh: mutate,
  };
};
