"use client";

import Image from "next/image";
import Link from "next/link";
import { formatRupiah } from "../constants/products";
import { Product } from "../store/admin";
import { motion } from "framer-motion";

interface ProductCardProps {
    product: Product;
    index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group"
        >
            {/* Image Container with overlay button */}
            <Link href={`/product/${product.id}`} className="block relative rounded-2xl overflow-hidden aspect-[3/4] mb-4 bg-warm-gray cursor-pointer">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    unoptimized={product.image.startsWith("data:")}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Category badge */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-primary z-10">
                    {product.category}
                </div>

                {/* Stock badge */}
                {product.stock <= 10 && product.stock > 0 && (
                    <div className="absolute top-3 right-3 bg-red-500/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-bold text-white z-10">
                        Sisa {product.stock}
                    </div>
                )}

                {/* Pilih Varian button — overlaid at the bottom center of the image */}
                <div className="absolute inset-x-0 bottom-0 p-4 flex justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10">
                    <span className="bg-white/95 backdrop-blur-sm text-primary py-2.5 px-6 rounded-full font-semibold text-xs tracking-wide shadow-lg flex items-center gap-2 hover:bg-gold hover:text-white transition-colors">
                        <span className="material-icons-outlined text-sm">visibility</span>
                        Pilih Varian
                    </span>
                </div>
            </Link>

            {/* Info */}
            <div className="px-1">
                <Link href={`/product/${product.id}`} className="block">
                    <h3 className="text-base font-semibold text-primary mb-1 group-hover:text-gold transition-colors">
                        {product.name}
                    </h3>
                </Link>
                <p className="text-gold font-bold text-lg">
                    {formatRupiah(product.price)}
                </p>
            </div>
        </motion.div>
    );
}
