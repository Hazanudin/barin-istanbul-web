"use client";

import Link from "next/link";
import { useCartStore, selectTotalItems } from "../store/cart";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const totalItems = useCartStore(selectTotalItems);
    const openDrawer = useCartStore((s) => s.openDrawer);
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <>
            <nav className="sticky top-0 z-40 bg-cream/85 backdrop-blur-md border-b border-primary/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Mobile Hamburger */}
                        <div className="flex-1 flex items-center md:hidden">
                            <button
                                onClick={() => setMobileOpen(true)}
                                className="text-primary hover:text-gold transition-colors"
                                aria-label="Open menu"
                            >
                                <span className="material-icons-outlined text-2xl">menu</span>
                            </button>
                        </div>

                        {/* Left Links (Desktop) */}
                        <div className="hidden md:flex flex-1 justify-start space-x-8">
                            <Link
                                href="#home"
                                className="text-sm font-medium text-primary/70 hover:text-gold transition-colors tracking-wide"
                            >
                                Home
                            </Link>
                            <Link
                                href="#collection"
                                className="text-sm font-medium text-primary/70 hover:text-gold transition-colors tracking-wide"
                            >
                                Collection
                            </Link>
                            <Link
                                href="#about"
                                className="text-sm font-medium text-primary/70 hover:text-gold transition-colors tracking-wide"
                            >
                                About
                            </Link>
                        </div>

                        {/* Center Logo */}
                        <div className="flex-shrink-0 flex items-center justify-center flex-1">
                            <Link
                                href="/"
                                className="text-2xl font-bold tracking-tight text-primary"
                            >
                                BARIN
                                <span className="text-gold-gradient gold-text-glow">ISTANBUL</span>
                            </Link>
                        </div>

                        {/* Right: Cart Icon */}
                        <div className="flex flex-1 justify-end items-center">
                            <button
                                onClick={openDrawer}
                                className="relative text-primary hover:text-gold transition-colors p-2"
                                aria-label="Open cart"
                            >
                                <span className="material-icons-outlined text-2xl">
                                    shopping_bag
                                </span>
                                {totalItems > 0 && (
                                    <span className="absolute -top-0.5 -right-0.5 bg-gold-gradient text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md gold-glow">
                                        {totalItems}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-50 bg-primary/95 backdrop-blur-md flex flex-col items-center justify-center space-y-10 md:hidden"
                    >
                        <button
                            className="absolute top-6 right-6 text-white hover:text-gold transition-colors"
                            onClick={() => setMobileOpen(false)}
                            aria-label="Close menu"
                        >
                            <span className="material-icons-outlined text-3xl">close</span>
                        </button>
                        <Link
                            href="/"
                            className="text-2xl font-bold text-white mb-4"
                            onClick={() => setMobileOpen(false)}
                        >
                            BARIN<span className="text-gold-gradient gold-text-glow">ISTANBUL</span>
                        </Link>
                        {["Home", "Collection", "About"].map((item) => (
                            <Link
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="text-xl font-light text-white/90 hover:text-gold transition-colors tracking-wider"
                                onClick={() => setMobileOpen(false)}
                            >
                                {item}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
