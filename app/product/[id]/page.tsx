"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useAdminStore } from "../../store/admin";
import { useCartStore } from "../../store/cart";
import { formatRupiah } from "../../constants/products";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../../components/Footer";

const AVAILABLE_SIZES = ["S", "M", "L", "XL"];

function getColorHex(colorName: string, products: any[]): string {
    // Find the colorHex from any product with this color name
    const match = products.find((p: any) => p.color?.toLowerCase() === colorName.toLowerCase());
    return match?.colorHex || '#888888';
}

export default function ProductDetailPage() {
    const params = useParams();
    const id = params?.id as string;

    const products = useAdminStore((s) => s.products);
    const product = products.find((p) => p.id === id);
    const relatedProducts = products
        .filter((p) => p.id !== id && p.stock > 0)
        .slice(0, 4);

    const addToCart = useCartStore((s) => s.addItem);
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [activeTab, setActiveTab] = useState<"details" | "shipping" | null>("details");
    const [errors, setErrors] = useState<{ color?: boolean; size?: boolean }>({});
    const [showToast, setShowToast] = useState(false);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
        setSelectedColor("");
        setSelectedSize("");
        setQuantity(1);
        setErrors({});
    }, [id]);

    if (!product) {
        return (
            <div className="min-h-screen bg-primary flex items-center justify-center text-white">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-2">Produk Tidak Ditemukan</h1>
                    <Link href="/" className="text-gold hover:underline">Kembali ke Beranda</Link>
                </div>
            </div>
        );
    }

    // Build available colors for this product
    const productColors = [product.color];
    // Add some variant colors based on similar products in the same category
    products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .forEach((p) => {
            if (!productColors.includes(p.color)) {
                productColors.push(p.color);
            }
        });

    const handleAddToCart = () => {
        const newErrors: { color?: boolean; size?: boolean } = {};

        if (!selectedColor) newErrors.color = true;
        if (!selectedSize) newErrors.size = true;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            // Scroll to the first error
            const errorEl = document.getElementById(newErrors.color ? "color-select" : "size-select");
            errorEl?.scrollIntoView({ behavior: "smooth", block: "center" });
            return;
        }

        setErrors({});
        addToCart(product, quantity, selectedColor, selectedSize);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <div className="min-h-screen bg-primary text-white font-sans">
            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 bg-primary/80 backdrop-blur-md border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/" className="text-xl font-bold tracking-tight">
                        BARIN<span className="text-gold-gradient gold-text-glow">ISTANBUL</span>
                    </Link>
                    <Link href="/" className="text-sm text-white/60 hover:text-white flex items-center gap-1">
                        <span className="material-icons-outlined text-sm">arrow_back</span>
                        Kembali
                    </Link>
                </div>
            </nav>

            <main className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Left Column - Image Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-[4/5] relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 group">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                unoptimized={product.image.startsWith("data:")}
                            />
                            {product.stock < 10 && (
                                <div className="absolute top-4 left-4 bg-red-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                                    Stok Terbatas: {product.stock}
                                </div>
                            )}
                        </div>
                        {/* Thumbnails */}
                        <div className="grid grid-cols-4 gap-4">
                            {[0, 1, 2].map((i) => (
                                <div key={i} className={`aspect-square relative rounded-xl overflow-hidden border cursor-pointer transition-all ${i === 0 ? 'border-gold ring-2 ring-gold/20' : 'border-white/10 hover:border-white/30 opacity-60 hover:opacity-100'}`}>
                                    <Image
                                        src={product.image}
                                        alt={`${product.name} view ${i + 1}`}
                                        fill
                                        className="object-cover"
                                        unoptimized={product.image.startsWith("data:")}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Product Details */}
                    <div className="flex flex-col">
                        <div className="mb-1">
                            <span className="text-gold text-xs font-bold tracking-widest uppercase">
                                {product.category}
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-playfair font-medium mb-4 leading-tight">
                            {product.name}
                        </h1>

                        <div className="flex items-center gap-4 mb-6">
                            <p className="text-2xl text-white font-light">
                                {formatRupiah(product.price)}
                            </p>
                            <div className="h-4 w-[1px] bg-white/20"></div>
                            <div className="flex items-center text-emerald-400 text-sm font-medium gap-1">
                                <span className="material-icons-outlined text-base">check_circle</span>
                                Tersedia
                            </div>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-8">
                            <div className="flex text-gold text-sm">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <span key={s} className="material-icons text-base">star</span>
                                ))}
                            </div>
                            <span className="text-white/40 text-sm">(128 Reviews)</span>
                        </div>

                        <p className="text-white/70 leading-relaxed font-light mb-8">
                            {product.description || "Produk premium berkualitas tinggi dari Barin Istanbul."}
                        </p>

                        {/* ===== Color Selection ===== */}
                        <div className="mb-6" id="color-select">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-bold text-white/40 uppercase tracking-wider">
                                    Pilih Warna: {selectedColor && <span className="text-white capitalize">{selectedColor}</span>}
                                </span>
                                {errors.color && (
                                    <span className="text-red-400 text-xs font-medium flex items-center gap-1 animate-pulse">
                                        <span className="material-icons-outlined text-sm">error</span>
                                        Wajib dipilih
                                    </span>
                                )}
                            </div>
                            <div className={`flex items-center gap-3 p-3 rounded-xl transition-all ${errors.color ? 'bg-red-500/5 border border-red-500/20' : 'border border-transparent'}`}>
                                {productColors.map((color) => {
                                    const hex = getColorHex(color, products);
                                    const isSelected = selectedColor === color;
                                    return (
                                        <button
                                            key={color}
                                            onClick={() => {
                                                setSelectedColor(color);
                                                setErrors((prev) => ({ ...prev, color: false }));
                                            }}
                                            className={`w-10 h-10 rounded-full relative transition-all ${isSelected
                                                ? "ring-2 ring-gold ring-offset-2 ring-offset-[#0f0f0f] scale-110"
                                                : "border border-white/20 hover:border-white/50 hover:scale-105"
                                                }`}
                                            title={color}
                                        >
                                            <span
                                                className="absolute inset-1 rounded-full"
                                                style={{ backgroundColor: hex }}
                                            />
                                            {isSelected && (
                                                <span className="absolute inset-0 flex items-center justify-center">
                                                    <span className={`material-icons text-xs ${hex === '#1a1a1a' || hex === '#000000' ? 'text-white' : 'text-black'}`}>
                                                        check
                                                    </span>
                                                </span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* ===== Size Selection ===== */}
                        <div className="mb-8" id="size-select">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-bold text-white/40 uppercase tracking-wider">
                                    Pilih Ukuran: {selectedSize && <span className="text-white">{selectedSize}</span>}
                                </span>
                                {errors.size && (
                                    <span className="text-red-400 text-xs font-medium flex items-center gap-1 animate-pulse">
                                        <span className="material-icons-outlined text-sm">error</span>
                                        Wajib dipilih
                                    </span>
                                )}
                            </div>
                            <div className={`flex items-center gap-3 p-3 rounded-xl transition-all ${errors.size ? 'bg-red-500/5 border border-red-500/20' : 'border border-transparent'}`}>
                                {AVAILABLE_SIZES.map((size) => {
                                    const isSelected = selectedSize === size;
                                    return (
                                        <button
                                            key={size}
                                            onClick={() => {
                                                setSelectedSize(size);
                                                setErrors((prev) => ({ ...prev, size: false }));
                                            }}
                                            className={`w-14 h-14 rounded-xl flex items-center justify-center text-sm font-bold transition-all ${isSelected
                                                ? "bg-gold text-white shadow-lg shadow-gold/30 scale-105"
                                                : "bg-white/[0.04] border border-white/10 text-white/60 hover:border-gold/40 hover:text-white hover:bg-white/[0.08]"
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    );
                                })}
                            </div>
                            {/* Size guide */}
                            <button className="mt-2 ml-3 text-gold/70 hover:text-gold text-xs font-medium flex items-center gap-1 transition-colors">
                                <span className="material-icons-outlined text-sm">straighten</span>
                                Panduan Ukuran
                            </button>
                        </div>

                        {/* Quantity & Add to Cart */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-10 pb-10 border-b border-white/5">
                            <div className="flex items-center border border-white/10 rounded-lg bg-white/[0.02]">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-12 h-12 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                                >
                                    -
                                </button>
                                <span className="w-12 text-center font-medium">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                    className="w-12 h-12 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                                >
                                    +
                                </button>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-gold-gradient hover:brightness-110 text-white font-medium py-3 px-8 rounded-lg transition-all shadow-lg shadow-gold/30 gold-glow flex items-center justify-center gap-2 group"
                            >
                                <span className="material-icons-outlined group-hover:scale-110 transition-transform">
                                    shopping_bag
                                </span>
                                Tambah ke Keranjang
                            </button>
                        </div>

                        {/* Validation hint */}
                        {(errors.color || errors.size) && (
                            <div className="mb-6 -mt-6 flex items-center gap-2 text-red-400 text-sm bg-red-400/5 border border-red-400/10 px-4 py-3 rounded-xl">
                                <span className="material-icons-outlined text-lg">warning</span>
                                <span>
                                    Silahkan pilih{" "}
                                    {errors.color && errors.size
                                        ? "warna dan ukuran"
                                        : errors.color
                                            ? "warna"
                                            : "ukuran"}{" "}
                                    terlebih dahulu
                                </span>
                            </div>
                        )}

                        {/* Accordions */}
                        <div className="space-y-4">
                            {/* Product Details */}
                            <div className="border border-white/10 rounded-xl overflow-hidden">
                                <button
                                    onClick={() => setActiveTab(activeTab === "details" ? null : "details")}
                                    className="w-full flex items-center justify-between p-4 bg-white/[0.02] hover:bg-white/[0.04] transition-colors text-left"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="material-icons-outlined text-white/40">info</span>
                                        <span className="font-medium text-sm">Detail Produk</span>
                                    </div>
                                    <span className={`material-icons-outlined transition-transform duration-300 ${activeTab === "details" ? "rotate-180" : ""}`}>
                                        expand_more
                                    </span>
                                </button>
                                <AnimatePresence>
                                    {activeTab === "details" && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="p-4 pt-0 text-sm text-white/60 font-light leading-relaxed border-t border-white/5">
                                                <ul className="list-disc pl-5 space-y-1 mt-2">
                                                    {(product.details || "").split("\n").filter(Boolean).map((line: string, i: number) => {
                                                        const parts = line.split(":");
                                                        if (parts.length >= 2) {
                                                            return (
                                                                <li key={i}><strong>{parts[0].trim()}:</strong> {parts.slice(1).join(":").trim()}</li>
                                                            );
                                                        }
                                                        return <li key={i}>{line.trim()}</li>;
                                                    })}
                                                </ul>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Shipping */}
                            <div className="border border-white/10 rounded-xl overflow-hidden">
                                <button
                                    onClick={() => setActiveTab(activeTab === "shipping" ? null : "shipping")}
                                    className="w-full flex items-center justify-between p-4 bg-white/[0.02] hover:bg-white/[0.04] transition-colors text-left"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="material-icons-outlined text-white/40">local_shipping</span>
                                        <span className="font-medium text-sm">Pengiriman & Pengembalian</span>
                                    </div>
                                    <span className={`material-icons-outlined transition-transform duration-300 ${activeTab === "shipping" ? "rotate-180" : ""}`}>
                                        expand_more
                                    </span>
                                </button>
                                <AnimatePresence>
                                    {activeTab === "shipping" && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="p-4 pt-0 text-sm text-white/60 font-light leading-relaxed border-t border-white/5">
                                                <ul className="list-disc pl-5 space-y-1 mt-2">
                                                    {(product.shippingInfo || "").split("\n").filter(Boolean).map((line: string, i: number) => (
                                                        <li key={i}>{line.trim()}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Values */}
                        <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/5">
                            <div className="text-center">
                                <span className="material-icons-outlined text-gold text-2xl mb-2">verified</span>
                                <p className="text-[10px] uppercase tracking-wider font-bold text-white/60">Authentic<br />Turkish Silk</p>
                            </div>
                            <div className="text-center">
                                <span className="material-icons-outlined text-gold text-2xl mb-2">local_shipping</span>
                                <p className="text-[10px] uppercase tracking-wider font-bold text-white/60">Fast Shipping<br />Indonesia Wide</p>
                            </div>
                            <div className="text-center">
                                <span className="material-icons-outlined text-gold text-2xl mb-2">assignment_return</span>
                                <p className="text-[10px] uppercase tracking-wider font-bold text-white/60">7-Day<br />Returns</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Complete The Look / Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mt-24 pt-16 border-t border-white/5">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-playfair font-medium mb-3">Lengkapi Koleksi Anda</h2>
                            <p className="text-white/40 font-light">Produk lain yang mungkin Anda sukai</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {relatedProducts.map((p) => (
                                <Link href={`/product/${p.id}`} key={p.id} className="group">
                                    <div className="aspect-[3/4] relative rounded-xl overflow-hidden bg-white/5 mb-4">
                                        <Image
                                            src={p.image}
                                            alt={p.name}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            unoptimized={p.image.startsWith("data:")}
                                        />
                                        {/* Quick View Overlay */}
                                        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                            <span className="w-full bg-white text-black py-2.5 rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1">
                                                <span className="material-icons-outlined text-sm">visibility</span>
                                                Lihat Detail
                                            </span>
                                        </div>
                                    </div>
                                    <h3 className="font-medium text-sm mb-1 group-hover:text-gold transition-colors">{p.name}</h3>
                                    <p className="text-white/50 text-xs">{formatRupiah(p.price)}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </main>

            <Footer />

            {/* Toast Notification */}
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 0 }}
                        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full shadow-2xl"
                    >
                        <span className="material-icons text-green-600">check_circle</span>
                        <span className="font-medium text-sm">
                            {selectedColor} • {selectedSize} — Ditambahkan ke keranjang!
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
