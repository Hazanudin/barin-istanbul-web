"use client";

import Link from "next/link";
import { useAdminStore } from "../store/admin";

export default function Footer() {
    const socialLinks = useAdminStore((s) => s.settings.socialLinks) ?? {
        instagram: "",
        facebook: "",
        tiktok: "",
        twitter: "",
    };

    return (
        <footer id="about" className="bg-primary text-white/80 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <Link
                            href="/"
                            className="text-xl font-bold text-white mb-4 block"
                        >
                            BARIN<span className="text-gold-gradient gold-text-glow">ISTANBUL</span>
                        </Link>
                        <p className="text-white/50 text-sm leading-relaxed mb-6 font-light">
                            Menghadirkan elegansi hijab Turki premium untuk wanita Indonesia
                            modern. Kualitas terbaik langsung dari Istanbul.
                        </p>
                        <div className="flex space-x-4">
                            {socialLinks.instagram && (
                                <a
                                    href={socialLinks.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white/30 hover:text-gold transition-colors"
                                    aria-label="Instagram"
                                >
                                    <span className="material-icons-outlined text-xl">
                                        camera_alt
                                    </span>
                                </a>
                            )}
                            {socialLinks.facebook && (
                                <a
                                    href={socialLinks.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white/30 hover:text-gold transition-colors"
                                    aria-label="Facebook"
                                >
                                    <span className="material-icons-outlined text-xl">
                                        facebook
                                    </span>
                                </a>
                            )}
                            {socialLinks.tiktok && (
                                <a
                                    href={socialLinks.tiktok}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white/30 hover:text-gold transition-colors"
                                    aria-label="TikTok"
                                >
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.8.1V9a6.27 6.27 0 00-.8-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.05a8.16 8.16 0 004.76 1.52V7.12a4.84 4.84 0 01-1-.43z" />
                                    </svg>
                                </a>
                            )}
                            {socialLinks.twitter && (
                                <a
                                    href={socialLinks.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white/30 hover:text-gold transition-colors"
                                    aria-label="Twitter / X"
                                >
                                    <span className="material-icons-outlined text-xl">
                                        alternate_email
                                    </span>
                                </a>
                            )}
                            {/* Show placeholder icons if no social links are set */}
                            {!socialLinks.instagram && !socialLinks.facebook && !socialLinks.tiktok && !socialLinks.twitter && (
                                <>
                                    <span className="text-white/15">
                                        <span className="material-icons-outlined text-xl">camera_alt</span>
                                    </span>
                                    <span className="text-white/15">
                                        <span className="material-icons-outlined text-xl">facebook</span>
                                    </span>
                                    <span className="text-white/15">
                                        <span className="material-icons-outlined text-xl">alternate_email</span>
                                    </span>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Shop */}
                    <div>
                        <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
                            Belanja
                        </h4>
                        <ul className="space-y-2.5 text-sm text-white/50 font-light">
                            <li>
                                <Link
                                    href="#collection"
                                    className="hover:text-gold transition-colors"
                                >
                                    Koleksi Terbaru
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-gold transition-colors">
                                    Best Sellers
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-gold transition-colors">
                                    Premium Silk
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-gold transition-colors">
                                    Sale
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
                            Bantuan
                        </h4>
                        <ul className="space-y-2.5 text-sm text-white/50 font-light">
                            <li>
                                <Link href="#" className="hover:text-gold transition-colors">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-gold transition-colors">
                                    Hubungi Kami
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/30">
                    <p>© 2026 Barinistanbul. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-white/60">
                            Privacy Policy
                        </Link>
                        <Link href="#" className="hover:text-white/60">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
