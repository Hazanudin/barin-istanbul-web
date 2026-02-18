"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useAdminStore } from "../store/admin";

export default function HeroSection() {
    const heroTexts = useAdminStore((s) => s.settings.heroTexts);
    const heroImage = useAdminStore((s) => s.settings.heroImage) ?? "";

    return (
        <section id="home" className="relative overflow-hidden bg-cream">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center min-h-[60vh]">
                    {/* Left: Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="order-2 md:order-1 text-center md:text-left"
                    >
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="inline-block py-1.5 px-4 rounded-full bg-gold/10 text-gold text-xs font-semibold tracking-widest uppercase mb-6 border border-gold/20"
                        >
                            {heroTexts.badge}
                        </motion.span>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-primary leading-[1.1] mb-6"
                        >
                            {heroTexts.titleLine1}{" "}
                            <span className="italic text-gold-gradient gold-text-glow">{heroTexts.titleHighlight}</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.5 }}
                            className="text-primary/60 text-lg md:text-xl font-light leading-relaxed mb-8 max-w-lg mx-auto md:mx-0"
                        >
                            {heroTexts.subtitle}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                            className="flex flex-wrap gap-4 justify-center md:justify-start"
                        >
                            <a
                                href="#collection"
                                className="bg-gold-gradient hover:brightness-110 text-white px-8 py-3.5 rounded-full font-medium transition-all shadow-lg shadow-gold/30 gold-glow inline-flex items-center gap-2"
                            >
                                {heroTexts.ctaText}
                                <span className="material-icons-outlined text-lg">
                                    arrow_forward
                                </span>
                            </a>
                            <a
                                href="#about"
                                className="border-2 border-primary/20 hover:border-gold text-primary hover:text-gold px-8 py-3.5 rounded-full font-medium transition-all"
                            >
                                {heroTexts.ctaSecondary}
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Right: Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                        className="order-1 md:order-2 relative"
                    >
                        <div className="relative aspect-[3/4] md:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-primary/10">
                            <Image
                                src={heroImage}
                                alt="Elegant woman wearing premium Barinistanbul hijab"
                                fill
                                className="object-cover"
                                priority
                                unoptimized={heroImage.startsWith("data:")}
                            />
                            {/* Decorative gold accent */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
                        </div>

                        {/* Floating badge */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 1 }}
                            className="absolute -bottom-4 -left-4 md:bottom-8 md:-left-8 bg-white rounded-2xl shadow-xl p-4 border border-primary/5"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                                    <span className="material-icons-outlined text-gold text-xl">
                                        verified
                                    </span>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-primary">
                                        100% Autentik
                                    </p>
                                    <p className="text-[11px] text-primary/50">
                                        Langsung dari Turki
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
