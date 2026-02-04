import useSWR from 'swr';
import { getCart } from '@/lib/api/woocommerce';
import { useCartStore } from '@/lib/store/cartStore';
import type { Cart } from '@/types/woocommerce';

/**
 * Hook to fetch and sync cart with the store
 */
export const useCart = () => {
  const setCart = useCartStore((state) => state.setCart);
  const localCart = useCartStore((state) => state.items);
  
  const { data, error, isLoading, mutate } = useSWR<Cart>(
    'cart',
    getCart,
    {
      revalidateOnFocus: false,
      dedupingInterval: 10000, // 10 seconds cache
      onSuccess: (cart) => {
        // Sync with local store
        const subtotal = parseFloat(cart.subtotal || '0');
        const total = parseFloat(cart.total || '0');
        setCart(cart.items, subtotal, total);
      },
    }
  );

  return {
    cart: data,
    localCart,
    isLoading,
    isError: error,
    refresh: mutate,
  };
};
