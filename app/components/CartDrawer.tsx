"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
    useCartStore,
    selectTotalItems,
    selectTotalPrice,
    getCartKey,
} from "../store/cart";
import { formatRupiah } from "../constants/products";
import { useAdminStore } from "../store/admin";

export default function CartDrawer() {
    const { items, isOpen, closeDrawer, removeItem, updateQuantity, clearCart } =
        useCartStore();
    const totalItems = useCartStore(selectTotalItems);
    const totalPrice = useCartStore(selectTotalPrice);
    const waNumber = useAdminStore((s) => s.settings.waNumber);
    const addOrder = useAdminStore((s) => s.addOrder);

    const handleWhatsAppCheckout = () => {
        if (items.length === 0) return;

        // Record the order in admin store
        const orderItems = items.map((item) => ({
            productId: item.product.id,
            productName: item.product.name,
            quantity: item.quantity,
            price: item.product.price,
        }));
        const orderItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

        addOrder({
            id: Date.now().toString(),
            date: new Date().toISOString(),
            items: orderItems,
            total: totalPrice,
            itemCount: orderItemCount,
        });

        const itemLines = items
            .map(
                (item) =>
                    `- ${item.product.name} (Warna: ${item.selectedColor}, Ukuran: ${item.selectedSize}, ${item.quantity}x) @ ${formatRupiah(item.product.price)}`
            )
            .join("\n");

        const message = `Halo Barinistanbul, saya ingin memesan:\n\n${itemLines}\n\nTotal: ${formatRupiah(totalPrice)}\n\nMohon info selanjutnya.`;

        const encoded = encodeURIComponent(message);
        window.open(`https://wa.me/${waNumber}?text=${encoded}`, "_blank");
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-50 drawer-overlay"
                        onClick={closeDrawer}
                    />

                    {/* Drawer Panel */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white shadow-2xl shadow-primary/20 flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-primary/5">
                            <div>
                                <h2 className="text-xl font-bold text-primary">
                                    Keranjang Belanja
                                </h2>
                                <p className="text-sm text-primary/40 mt-0.5">
                                    {totalItems} item
                                </p>
                            </div>
                            <button
                                onClick={closeDrawer}
                                className="text-primary/40 hover:text-primary transition-colors p-1"
                                aria-label="Close cart"
                            >
                                <span className="material-icons-outlined text-2xl">close</span>
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <span className="material-icons-outlined text-6xl text-primary/10 mb-4">
                                        shopping_bag
                                    </span>
                                    <p className="text-primary/40 font-light text-lg">
                                        Keranjang masih kosong
                                    </p>
                                    <button
                                        onClick={closeDrawer}
                                        className="mt-4 text-gold hover:text-gold-dark font-medium text-sm transition-colors"
                                    >
                                        Lanjut Belanja
                                    </button>
                                </div>
                            ) : (
                                items.map((item) => {
                                    const key = getCartKey(item);
                                    return (
                                        <motion.div
                                            key={key}
                                            layout
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="flex gap-4 bg-cream/50 rounded-xl p-3 border border-primary/5"
                                        >
                                            {/* Thumbnail */}
                                            <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-warm-gray">
                                                <Image
                                                    src={item.product.image}
                                                    alt={item.product.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>

                                            {/* Details */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-sm font-semibold text-primary truncate">
                                                    {item.product.name}
                                                </h3>

                                                {/* Color & Size Tags */}
                                                <div className="flex items-center gap-1.5 mt-1">
                                                    <span className="inline-flex items-center gap-1 bg-primary/5 text-primary/60 text-[10px] font-medium px-2 py-0.5 rounded-full capitalize">
                                                        <span className="w-2.5 h-2.5 rounded-full border border-primary/10" style={{ backgroundColor: item.selectedColor.toLowerCase() === 'cream' ? '#F5F5DC' : item.selectedColor.toLowerCase() }}></span>
                                                        {item.selectedColor}
                                                    </span>
                                                    <span className="inline-flex items-center bg-primary/5 text-primary/60 text-[10px] font-medium px-2 py-0.5 rounded-full">
                                                        {item.selectedSize}
                                                    </span>
                                                </div>

                                                <p className="text-gold font-bold text-sm mt-1">
                                                    {formatRupiah(item.product.price)}
                                                </p>

                                                {/* Quantity Controls */}
                                                <div className="flex items-center justify-between mt-2">
                                                    <div className="flex items-center border border-primary/10 rounded-lg overflow-hidden">
                                                        <button
                                                            onClick={() =>
                                                                updateQuantity(key, item.quantity - 1)
                                                            }
                                                            className="w-8 h-8 flex items-center justify-center text-primary/60 hover:bg-primary/5 transition-colors"
                                                        >
                                                            <span className="material-icons-outlined text-base">
                                                                remove
                                                            </span>
                                                        </button>
                                                        <span className="w-8 h-8 flex items-center justify-center text-sm font-semibold text-primary">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() =>
                                                                updateQuantity(key, item.quantity + 1)
                                                            }
                                                            className="w-8 h-8 flex items-center justify-center text-primary/60 hover:bg-primary/5 transition-colors"
                                                        >
                                                            <span className="material-icons-outlined text-base">
                                                                add
                                                            </span>
                                                        </button>
                                                    </div>

                                                    <button
                                                        onClick={() => removeItem(key)}
                                                        className="text-red-400 hover:text-red-500 transition-colors"
                                                        aria-label="Remove item"
                                                    >
                                                        <span className="material-icons-outlined text-lg">
                                                            delete_outline
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="border-t border-primary/5 p-6 space-y-4 bg-white">
                                {/* Total */}
                                <div className="flex items-center justify-between">
                                    <span className="text-primary/60 font-medium">Total</span>
                                    <span className="text-2xl font-bold text-gold">
                                        {formatRupiah(totalPrice)}
                                    </span>
                                </div>

                                {/* WhatsApp Checkout */}
                                <button
                                    onClick={handleWhatsAppCheckout}
                                    className="w-full bg-[#25D366] hover:bg-[#1fb855] text-white py-4 rounded-2xl font-bold text-base transition-all shadow-lg shadow-[#25D366]/20 flex items-center justify-center gap-3 active:scale-[0.98]"
                                >
                                    <svg
                                        className="w-6 h-6 fill-current"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    Checkout via WhatsApp
                                </button>

                                {/* Clear cart */}
                                <button
                                    onClick={clearCart}
                                    className="w-full text-primary/40 hover:text-red-400 text-sm font-medium transition-colors py-1"
                                >
                                    Kosongkan Keranjang
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
