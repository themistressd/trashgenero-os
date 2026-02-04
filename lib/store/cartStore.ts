import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from '@/types/woocommerce';

interface CartState {
  items: CartItem[];
  subtotal: number;
  total: number;
  itemCount: number;

  // Actions
  addItem: (item: CartItem) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
  setCart: (items: CartItem[], subtotal: number, total: number) => void;
  getItemQuantity: (productId: number) => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      subtotal: 0,
      total: 0,
      itemCount: 0,

      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find(
            (i) => i.product_id === item.product_id
          );

          if (existingItem) {
            // Update quantity
            return {
              items: state.items.map((i) =>
                i.product_id === item.product_id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
              itemCount: state.itemCount + item.quantity,
            };
          }

          // Add new item
          return {
            items: [...state.items, item],
            itemCount: state.itemCount + item.quantity,
          };
        });
      },

      removeItem: (key) => {
        set((state) => {
          const item = state.items.find((i) => i.key === key);
          return {
            items: state.items.filter((i) => i.key !== key),
            itemCount: state.itemCount - (item?.quantity || 0),
          };
        });
      },

      updateQuantity: (key, quantity) => {
        set((state) => {
          const item = state.items.find((i) => i.key === key);
          const oldQuantity = item?.quantity || 0;
          const diff = quantity - oldQuantity;

          if (quantity <= 0) {
            return {
              items: state.items.filter((i) => i.key !== key),
              itemCount: state.itemCount - oldQuantity,
            };
          }

          return {
            items: state.items.map((i) =>
              i.key === key ? { ...i, quantity } : i
            ),
            itemCount: state.itemCount + diff,
          };
        });
      },

      clearCart: () => {
        set({ items: [], subtotal: 0, total: 0, itemCount: 0 });
      },

      setCart: (items, subtotal, total) => {
        const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
        set({ items, subtotal, total, itemCount });
      },

      getItemQuantity: (productId) => {
        const item = get().items.find((i) => i.product_id === productId);
        return item?.quantity || 0;
      },

      getSubtotal: () => {
        const items = get().items;
        return items.reduce((sum, item) => {
          const price = parseFloat(item.product.price) || 0;
          return sum + (price * item.quantity);
        }, 0);
      },
    }),
    {
      name: 'trash-os-cart',
    }
  )
);
