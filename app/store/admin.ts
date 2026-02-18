import { create } from "zustand";

export interface ColorOption {
    name: string;
    hex: string;
}

export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    color: string;
    colorHex: string;
    stock: number;
    description: string;
    details: string;
    shippingInfo: string;
}

export interface HeroTexts {
    badge: string;
    titleLine1: string;
    titleHighlight: string;
    subtitle: string;
    ctaText: string;
    ctaSecondary: string;
}

export interface SocialLinks {
    instagram: string;
    facebook: string;
    tiktok: string;
    twitter: string;
}

export interface OrderItem {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
}

export interface Order {
    id: string;
    date: string;
    items: OrderItem[];
    total: number;
    itemCount: number;
}

export interface SiteSettings {
    waNumber: string;
    heroTexts: HeroTexts;
    heroImage: string;
    socialLinks: SocialLinks;
}

// ========== DEFAULTS ==========

const DEFAULT_DESCRIPTION = "Dibuat secara ahli di Bursa, hijab sutra premium ini menawarkan kilau mewah dan kenyamanan bernapas, sempurna untuk iklim tropis.";
const DEFAULT_DETAILS = "Material: 100% Turkish Silk Satin Premium\nUkuran: S (100×100cm), M (110×110cm), L (115×115cm), XL (120×120cm)\nFinishing: Jahit tepi rapi (Hand-rolled hem)\nOpacity: Tidak menerawang saat dilipat\nCare: Hand wash only, setrika suhu rendah";
const DEFAULT_SHIPPING = "Pengiriman gratis untuk pesanan di atas Rp 500.000.\nPesanan diproses dalam 1-2 hari kerja.\nGaransi pengembalian 7 hari jika produk cacat atau tidak sesuai.";

export const defaultCategories = ["Premium Silk", "Cotton Voile", "Chiffon", "Jersey", "Pashmina"];

export const defaultColors: ColorOption[] = [
    { name: "Cream", hex: "#F5E6CA" },
    { name: "Olive", hex: "#6B7F3B" },
    { name: "Black", hex: "#1a1a1a" },
    { name: "Pink", hex: "#D4A0A0" },
    { name: "Brown", hex: "#8B6F47" },
    { name: "Grey", hex: "#808080" },
    { name: "White", hex: "#FFFFFF" },
    { name: "Navy", hex: "#1B2A4A" },
    { name: "Maroon", hex: "#800000" },
    { name: "Sage", hex: "#9CAF88" },
];

export const defaultProducts: Product[] = [
    {
        id: "1",
        name: "Medina Silk - Sand Beige",
        price: 189000,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8TEk6sJg4hW6ZuCzNxoDQ-GuBIpZwKC_YpsF64sud-KrsMGeKkwz4eBnNcO04V1KelzvS1-WceJ42GtoLVgYfAHCSiVojX8q4I4buDsPQtQ14iXmsuRQYMMUeo2x_bmkoMYzS3rCS4NsUr3ZFZntwddKlDh0MCXGAq69cQqsyCNUJ3gOz9TpL0Sq_qcrvcvc8a-SIKRt3QVQEzFByuqryabeHzq--xDvhpceGpDIQlVUYy3c7zWH1aU7d6aRFsLs_uutGzOPpceo",
        category: "Premium Silk",
        color: "Cream",
        colorHex: "#F5E6CA",
        stock: 50,
        description: DEFAULT_DESCRIPTION,
        details: DEFAULT_DETAILS,
        shippingInfo: DEFAULT_SHIPPING,
    },
    {
        id: "2",
        name: "Anatolia Cotton - Olive",
        price: 145000,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8BC5ENrWeerV9EQpnnbaTxquSEr5ftMt9mc1fctCnbOJaZ8JfyITfHyC7DLUKeMqLa9N3sNsZVeaDY4T5AO0O4CRgeHXfkdjZ9_78ymb24c831oZ-_kutmFHq3JVZoRzOzxrT65xF4azo72Q8Xb2JqsDz0b3772k0mEoRkrUxlsMCJuv4AB8jWVw6mTOF5_HtP-_QlPvfEUUnGTp6TfOkbRXhE-zCy7yACFxeWnkjDjCZ6siGJCF5f9LIvKxLsQw-AXPpikaicpY",
        category: "Cotton Voile",
        color: "Olive",
        colorHex: "#6B7F3B",
        stock: 35,
        description: DEFAULT_DESCRIPTION,
        details: DEFAULT_DETAILS,
        shippingInfo: DEFAULT_SHIPPING,
    },
    {
        id: "3",
        name: "Istanbul Night - Black",
        price: 225000,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDOhovW7tT4YGhZ2-KLa5IgHRxRsBh4d9C4oGkxHQtB4qKXGWsvYmvPBxJQVtOmd2GEnoOcMrgt1_z67mew5MueIBZ5vufjUE46IN1Mcdi2fY4C89KdZp5cTdNqRxhwfmOwQD4VM6wC1P_b5PrMzrgQc06YHrjHZ162FR3yDuYlpxPIEWaYciYBeUQR5-mQc9SPQJSZJOsOI_Ii194a-EVddtle_6P_kxXGMYMrTQybBD7xM4J4xSiLLDW1yA6gXuurtmRt5v9Six8",
        category: "Premium Silk",
        color: "Black",
        colorHex: "#1a1a1a",
        stock: 25,
        description: DEFAULT_DESCRIPTION,
        details: DEFAULT_DETAILS,
        shippingInfo: DEFAULT_SHIPPING,
    },
    {
        id: "4",
        name: "Rose Quartz Pleated",
        price: 165000,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHaPRRxEbh2T263cDLb7Cm2pV9H8-R-3BrAerslY5B3sSgBt1z0Sxpoq97gw7olS8UbdG_oebYH_qVDndoVdCLuny6mnCyOnu8xiL4H7VUFoYLdq7nl1z0FlOUxBbvQDdS_TfVyO9BppTtm0LXO0VNlJbDel43dzL_fzcv-lT9931M6LtDPSrG_41ox41OjTeH-v6GdiXnn4qW1UB4CegK0LbQXrvym6mtfL1cTIfgHQcvnNzaqGor3zAbLzBjxeSO8VubLIH2yvk",
        category: "Chiffon",
        color: "Pink",
        colorHex: "#D4A0A0",
        stock: 40,
        description: DEFAULT_DESCRIPTION,
        details: DEFAULT_DETAILS,
        shippingInfo: DEFAULT_SHIPPING,
    },
    {
        id: "5",
        name: "Terra Cotta Basic",
        price: 135000,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-wP9sPE9Ro9ZhXgowLqKmiV7CG7fAXDZe6orDRlKMRI7mRTgnq6y3tr9iGFznryrftaOCJv1RHqOMFdy9gZyvvWnH5ujYMehnbqYVYpki4zZ5phNs5A4DzndsenTiRnnfrvwOBk2tTqXnwuPPCcp87lUA29W8fUqO6rEhpFHXgnHTkYMIWXwm0YyNTtgk4AxP5QzMAIeVUsSByiSILQMaa4yNTIvABEsBtZJN0vP6uxqYeZS9hPvzWHKsk-mPPLGkGcNxby6Xw5U",
        category: "Jersey",
        color: "Brown",
        colorHex: "#8B6F47",
        stock: 60,
        description: DEFAULT_DESCRIPTION,
        details: DEFAULT_DETAILS,
        shippingInfo: DEFAULT_SHIPPING,
    },
    {
        id: "6",
        name: "Bosphorus Breeze - Floral",
        price: 210000,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXg8KbYbIP_hgskJyRjygXi7ARFjPr_EMwiiNTlSxWcqSU7RgpGtLnY2OidnBJEcNRGj9uaEqsiVKoEFVQUU2zx7NPOt6adZXME-P1cfU3iOdYd2-O70iqhmSsPyCMuouUSHchvcIOIeIHMTi89vPmithiPalJDH_RnnhldJmSZ80tthY5H6VxI_VFbxUXQvlsSgTx0i4l6WdQn2VvILS25nejbUAyZL64Vm2MeFTSBlt7DmvaNTQ4FjR9SO3ckVZDZOy_GZttQT0",
        category: "Pashmina",
        color: "Cream",
        colorHex: "#F5E6CA",
        stock: 30,
        description: DEFAULT_DESCRIPTION,
        details: DEFAULT_DETAILS,
        shippingInfo: DEFAULT_SHIPPING,
    },
];

const defaultSettings: SiteSettings = {
    waNumber: "6281234567890",
    heroTexts: {
        badge: "✦ PREMIUM TURKISH HIJAB",
        titleLine1: "Elegansi dari",
        titleHighlight: "Istanbul",
        subtitle:
            "Koleksi hijab premium kami ditenun dengan sutra terbaik Turki, menghadirkan keanggunan yang tak lekang oleh waktu untuk wanita Indonesia modern.",
        ctaText: "Jelajahi Koleksi",
        ctaSecondary: "Lihat Katalog",
    },
    heroImage: "",
    socialLinks: {
        instagram: "https://instagram.com/barinistanbul",
        facebook: "https://facebook.com/barinistanbul",
        tiktok: "https://tiktok.com/@barinistanbul",
        twitter: "https://twitter.com/barinistanbul",
    },
};

function generateSampleOrders(): Order[] {
    const orders: Order[] = [];
    const now = new Date();

    for (let day = 0; day < 30; day++) {
        const date = new Date(now);
        date.setDate(date.getDate() - day);
        const orderCount = Math.floor(Math.random() * 3) + 1;

        for (let i = 0; i < orderCount; i++) {
            const items: OrderItem[] = [];
            let total = 0;
            let itemCount = 0;
            const numItems = Math.floor(Math.random() * 3) + 1;

            for (let j = 0; j < numItems; j++) {
                const sample =
                    defaultProducts[
                    Math.floor(Math.random() * defaultProducts.length)
                    ];
                const qty = Math.floor(Math.random() * 3) + 1;
                items.push({
                    productId: sample.id,
                    productName: sample.name,
                    quantity: qty,
                    price: sample.price,
                });
                total += sample.price * qty;
                itemCount += qty;
            }

            const hour = Math.floor(Math.random() * 14) + 8;
            const minute = Math.floor(Math.random() * 60);
            date.setHours(hour, minute, 0, 0);

            orders.push({
                id: `sample-${day}-${i}`,
                date: date.toISOString(),
                items,
                total,
                itemCount,
            });
        }
    }

    return orders;
}

// ========== STORE TYPES ==========

interface AdminData {
    products: Product[];
    categories: string[];
    colors: ColorOption[];
    settings: SiteSettings;
    orders: Order[];
}

interface AdminStore extends AdminData {
    isAuthenticated: boolean;
    isLoaded: boolean;
    isSaving: boolean;

    // Auth
    login: (password: string) => boolean;
    logout: () => void;

    // Data loading
    loadFromServer: () => Promise<void>;
    saveToServer: () => Promise<void>;

    // Products
    addProduct: (product: Product) => void;
    updateProduct: (id: string, product: Partial<Product>) => void;
    deleteProduct: (id: string) => void;

    // Categories
    addCategory: (name: string) => void;
    renameCategory: (oldName: string, newName: string) => void;
    deleteCategory: (name: string) => void;

    // Colors
    addColor: (color: ColorOption) => void;
    updateColor: (oldName: string, updated: ColorOption) => void;
    deleteColor: (name: string) => void;

    // Settings
    updateSettings: (settings: Partial<SiteSettings>) => void;
    updateHeroTexts: (texts: Partial<HeroTexts>) => void;
    updateSocialLinks: (links: Partial<SocialLinks>) => void;

    // Orders
    addOrder: (order: Order) => void;
}

const ADMIN_PASSWORD = "barin2026";

// Helper: save data to server (debounced)
let saveTimeout: NodeJS.Timeout | null = null;

function debouncedSave(getData: () => AdminData) {
    if (saveTimeout) clearTimeout(saveTimeout);
    saveTimeout = setTimeout(async () => {
        try {
            const data = getData();
            await fetch("/api/data", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
        } catch (err) {
            console.error("Failed to save to server:", err);
        }
    }, 500);
}

export const useAdminStore = create<AdminStore>()((set, get) => ({
    // Initial state
    isAuthenticated: false,
    isLoaded: false,
    isSaving: false,
    products: defaultProducts,
    categories: defaultCategories,
    colors: defaultColors,
    settings: defaultSettings,
    orders: generateSampleOrders(),

    // Auth (still uses local check, no need to persist server-side)
    login: (password: string) => {
        if (password === ADMIN_PASSWORD) {
            set({ isAuthenticated: true });
            // Save auth to sessionStorage so it survives page refresh
            if (typeof window !== "undefined") {
                sessionStorage.setItem("barin-auth", "true");
            }
            return true;
        }
        return false;
    },

    logout: () => {
        set({ isAuthenticated: false });
        if (typeof window !== "undefined") {
            sessionStorage.removeItem("barin-auth");
        }
    },

    // Load data from Vercel Blob
    loadFromServer: async () => {
        try {
            const res = await fetch("/api/data", { cache: "no-store" });
            const { data } = await res.json();

            if (data) {
                // Ensure products have all required fields with defaults
                const products = (data.products || defaultProducts).map(
                    (p: any) => ({
                        description: DEFAULT_DESCRIPTION,
                        details: DEFAULT_DETAILS,
                        shippingInfo: DEFAULT_SHIPPING,
                        colorHex: "#888888",
                        ...p,
                    })
                );

                set({
                    products,
                    categories: data.categories || defaultCategories,
                    colors: data.colors || defaultColors,
                    settings: {
                        ...defaultSettings,
                        ...data.settings,
                        heroTexts: {
                            ...defaultSettings.heroTexts,
                            ...data.settings?.heroTexts,
                        },
                        socialLinks: {
                            ...defaultSettings.socialLinks,
                            ...data.settings?.socialLinks,
                        },
                    },
                    orders: data.orders || generateSampleOrders(),
                    isLoaded: true,
                });
            } else {
                set({ isLoaded: true });
            }

            // Restore auth from sessionStorage
            if (typeof window !== "undefined") {
                const auth = sessionStorage.getItem("barin-auth");
                if (auth === "true") {
                    set({ isAuthenticated: true });
                }
            }
        } catch (err) {
            console.error("Failed to load from server:", err);
            set({ isLoaded: true });
        }
    },

    // Save data to Vercel Blob
    saveToServer: async () => {
        const state = get();
        debouncedSave(() => ({
            products: state.products,
            categories: state.categories,
            colors: state.colors,
            settings: state.settings,
            orders: state.orders,
        }));
    },

    // Products
    addProduct: (product) => {
        set((state) => ({ products: [...state.products, product] }));
        setTimeout(() => get().saveToServer(), 0);
    },

    updateProduct: (id, updates) => {
        set((state) => ({
            products: state.products.map((p) =>
                p.id === id ? { ...p, ...updates } : p
            ),
        }));
        setTimeout(() => get().saveToServer(), 0);
    },

    deleteProduct: (id) => {
        set((state) => ({
            products: state.products.filter((p) => p.id !== id),
        }));
        setTimeout(() => get().saveToServer(), 0);
    },

    // Categories
    addCategory: (name) => {
        set((state) => ({
            categories: state.categories.includes(name)
                ? state.categories
                : [...state.categories, name],
        }));
        setTimeout(() => get().saveToServer(), 0);
    },

    renameCategory: (oldName, newName) => {
        set((state) => ({
            categories: state.categories.map((c) =>
                c === oldName ? newName : c
            ),
            products: state.products.map((p) =>
                p.category === oldName ? { ...p, category: newName } : p
            ),
        }));
        setTimeout(() => get().saveToServer(), 0);
    },

    deleteCategory: (name) => {
        set((state) => ({
            categories: state.categories.filter((c) => c !== name),
        }));
        setTimeout(() => get().saveToServer(), 0);
    },

    // Colors
    addColor: (color) => {
        set((state) => ({
            colors: state.colors.some((c) => c.name === color.name)
                ? state.colors
                : [...state.colors, color],
        }));
        setTimeout(() => get().saveToServer(), 0);
    },

    updateColor: (oldName, updated) => {
        set((state) => ({
            colors: state.colors.map((c) =>
                c.name === oldName ? updated : c
            ),
            products: state.products.map((p) =>
                p.color === oldName
                    ? { ...p, color: updated.name, colorHex: updated.hex }
                    : p
            ),
        }));
        setTimeout(() => get().saveToServer(), 0);
    },

    deleteColor: (name) => {
        set((state) => ({
            colors: state.colors.filter((c) => c.name !== name),
        }));
        setTimeout(() => get().saveToServer(), 0);
    },

    // Settings
    updateSettings: (newSettings) => {
        set((state) => ({
            settings: { ...state.settings, ...newSettings },
        }));
        setTimeout(() => get().saveToServer(), 0);
    },

    updateHeroTexts: (texts) => {
        set((state) => ({
            settings: {
                ...state.settings,
                heroTexts: { ...state.settings.heroTexts, ...texts },
            },
        }));
        setTimeout(() => get().saveToServer(), 0);
    },

    updateSocialLinks: (links) => {
        set((state) => ({
            settings: {
                ...state.settings,
                socialLinks: { ...state.settings.socialLinks, ...links },
            },
        }));
        setTimeout(() => get().saveToServer(), 0);
    },

    // Orders
    addOrder: (order) => {
        set((state) => ({
            orders: [...state.orders, order],
        }));
        setTimeout(() => get().saveToServer(), 0);
    },
}));
