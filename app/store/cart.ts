import { create } from "zustand";
import { Product } from "../constants/products";

export interface CartItem {
    product: Product;
    quantity: number;
    selectedColor: string;
    selectedSize: string;
}

interface CartStore {
    items: CartItem[];
    isOpen: boolean;
    addItem: (product: Product, quantity: number, color: string, size: string) => void;
    removeItem: (cartKey: string) => void;
    updateQuantity: (cartKey: string, quantity: number) => void;
    clearCart: () => void;
    toggleDrawer: () => void;
    openDrawer: () => void;
    closeDrawer: () => void;
}

// Unique key for each cart item based on product + color + size
function cartKey(productId: string, color: string, size: string) {
    return `${productId}_${color}_${size}`;
}

export function getCartKey(item: CartItem) {
    return cartKey(item.product.id, item.selectedColor, item.selectedSize);
}

export const useCartStore = create<CartStore>((set) => ({
    items: [],
    isOpen: false,

    addItem: (product, quantity = 1, color, size) =>
        set((state) => {
            const key = cartKey(product.id, color, size);
            const existing = state.items.find(
                (item) => getCartKey(item) === key
            );
            if (existing) {
                return {
                    items: state.items.map((item) =>
                        getCartKey(item) === key
                            ? { ...item, quantity: item.quantity + quantity }
                            : item
                    ),
                    isOpen: true,
                };
            }
            return {
                items: [
                    ...state.items,
                    { product, quantity, selectedColor: color, selectedSize: size },
                ],
                isOpen: true,
            };
        }),

    removeItem: (key) =>
        set((state) => ({
            items: state.items.filter((item) => getCartKey(item) !== key),
        })),

    updateQuantity: (key, quantity) =>
        set((state) => {
            if (quantity <= 0) {
                return {
                    items: state.items.filter((item) => getCartKey(item) !== key),
                };
            }
            return {
                items: state.items.map((item) =>
                    getCartKey(item) === key ? { ...item, quantity } : item
                ),
            };
        }),

    clearCart: () => set({ items: [] }),
    toggleDrawer: () => set((state) => ({ isOpen: !state.isOpen })),
    openDrawer: () => set({ isOpen: true }),
    closeDrawer: () => set({ isOpen: false }),
}));

// Selectors
export const selectTotalItems = (state: { items: CartItem[] }) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectTotalPrice = (state: { items: CartItem[] }) =>
    state.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );
