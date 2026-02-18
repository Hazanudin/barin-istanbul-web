"use client";

import { useState } from "react";
import { categories, colors } from "../constants/products";
import { useAdminStore } from "../store/admin";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";

export default function ProductGrid() {
    const products = useAdminStore((s) => s.products);
    const [activeCategory, setActiveCategory] = useState("Semua");
    const [activeColor, setActiveColor] = useState<string | null>(null);

    const filtered = products.filter((p) => {
        const catMatch =
            activeCategory === "Semua" || p.category === activeCategory;
        const colorMatch = !activeColor || p.color === activeColor;
        const inStock = p.stock > 0;
        return catMatch && colorMatch && inStock;
    });

    return (
        <section id="collection" className="py-16 md:py-24 bg-cream">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="font-serif text-3xl md:text-4xl font-medium text-primary mb-3">
                        Koleksi <span className="italic text-gold">Pilihan</span>
                    </h2>
                    <p className="text-primary/50 font-light text-lg max-w-md mx-auto">
                        Pilih hijab premium Turki favoritmu
                    </p>
                </motion.div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-10"
                >
                    {/* Category pills */}
                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat
                                    ? "bg-gold text-white shadow-md shadow-gold/20"
                                    : "bg-white text-primary/60 hover:text-primary border border-primary/10 hover:border-gold/30"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Color dots */}
                    <div className="flex justify-center gap-3 items-center">
                        <span className="text-xs text-primary/40 font-medium uppercase tracking-wider mr-2">
                            Warna:
                        </span>
                        <button
                            onClick={() => setActiveColor(null)}
                            className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${activeColor === null
                                ? "border-gold"
                                : "border-primary/10 hover:border-primary/30"
                                }`}
                            title="Semua Warna"
                        >
                            <span className="text-[10px] font-bold text-primary/50">All</span>
                        </button>
                        {colors.map((c) => (
                            <button
                                key={c.name}
                                onClick={() =>
                                    setActiveColor(activeColor === c.name ? null : c.name)
                                }
                                className={`w-7 h-7 rounded-full border-2 transition-all hover:scale-110 ${activeColor === c.name
                                    ? "border-gold ring-2 ring-gold/30 scale-110"
                                    : "border-primary/10"
                                    }`}
                                style={{ backgroundColor: c.hex }}
                                title={c.name}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* Products Grid */}
                {filtered.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {filtered.map((product, index) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                index={index}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <span className="material-icons-outlined text-5xl text-primary/20 mb-4 block">
                            search_off
                        </span>
                        <p className="text-primary/40 text-lg font-light">
                            Tidak ada produk yang cocok dengan filter Anda.
                        </p>
                        <button
                            onClick={() => {
                                setActiveCategory("Semua");
                                setActiveColor(null);
                            }}
                            className="mt-4 text-gold hover:text-gold-dark font-medium text-sm transition-colors"
                        >
                            Reset Filter
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
