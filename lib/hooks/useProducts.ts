import useSWR from 'swr';
import { getProducts, getProductById, getCategories } from '@/lib/api/woocommerce';
import type { Product } from '@/types/woocommerce';

/**
 * Hook to fetch products
 */
export const useProducts = (params?: {
  per_page?: number;
  page?: number;
  category?: number;
  tag?: number;
  search?: string;
  featured?: boolean;
  on_sale?: boolean;
}) => {
  const key = ['products', JSON.stringify(params)];
  
  const { data, error, isLoading, mutate } = useSWR<Product[]>(
    key,
    () => getProducts(params),
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000,
    }
  );

  return {
    products: data || [],
    isLoading,
    isError: error,
    refresh: mutate,
  };
};

/**
 * Hook to fetch a single product
 */
export const useProduct = (productId: number | null) => {
  const { data, error, isLoading, mutate } = useSWR<Product>(
    productId ? ['product', productId] : null,
    productId ? () => getProductById(productId) : null,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  return {
    product: data,
    isLoading,
    isError: error,
    refresh: mutate,
  };
};

/**
 * Hook to fetch categories
 */
export const useCategories = () => {
  const { data, error, isLoading, mutate } = useSWR<Array<{ id: number; name: string; slug: string; count: number }>>(
    'categories',
    getCategories,
    {
      revalidateOnFocus: false,
      dedupingInterval: 300000, // 5 minutes cache
    }
  );

  return {
    categories: data || [],
    isLoading,
    isError: error,
    refresh: mutate,
  };
};
