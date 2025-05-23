import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { useState, useEffect } from 'react';
import { CartItem } from '@/types/product';

type CartState = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

// Using persist middleware to save cart in localStorage
export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);

          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }

          return {
            items: [...state.items, { ...item, quantity: 1 }],
          };
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Simple hook to safely use cart store with SSR/hydration
export function useLocalCartStore() {
  const store = useCartStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return {
    ...store,
    items: isClient ? store.items : [],
  };
}
