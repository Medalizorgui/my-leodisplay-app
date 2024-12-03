import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CartItem = {
  productId: string;
  productName: string;
  basePrice: number;
  type?: string | null;
  barre?: string | null;
  tailles: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  bases: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  quantity: number;
  uploadedImageUrl?: string;
};

type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => ({
          items: [...state.items, item],
        })),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);