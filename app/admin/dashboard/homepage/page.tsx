"use client";

import { useState, useRef } from "react";
import { useAdminStore } from "../../../store/admin";
import Image from "next/image";

export default function HomepagePage() {
    const settings = useAdminStore((s) => s.settings);
    const updateHeroTexts = useAdminStore((s) => s.updateHeroTexts);
    const updateSettings = useAdminStore((s) => s.updateSettings);

    const [form, setForm] = useState(settings.heroTexts);
    const [heroImage, setHeroImage] = useState(settings.heroImage ?? "");
    const [saved, setSaved] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("File harus berupa gambar!");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert("Ukuran file maksimal 5MB!");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setHeroImage(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleSave = () => {
        updateHeroTexts(form);
        updateSettings({ heroImage: heroImage });
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const handleReset = () => {
        const defaults = {
            badge: "Koleksi Terbaru",
            titleLine1: "Elegansi",
            titleHighlight: "Hijab Turki",
            subtitle:
                "Koleksi Barinistanbul — kain premium Turki yang dirancang untuk keanggunan dan kenyamanan wanita Indonesia modern.",
            ctaText: "Lihat Koleksi",
            ctaSecondary: "Tentang Kami",
        };
        setForm(defaults);
        updateHeroTexts(defaults);
        // Don't reset image on text reset
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="p-8 max-w-5xl">
            {/* Toast */}
            {saved && (
                <div className="fixed top-6 right-6 z-50 bg-emerald-500/90 backdrop-blur-sm text-white px-6 py-3 rounded-xl shadow-2xl shadow-emerald-500/20 text-sm font-medium flex items-center gap-2">
                    <span className="material-icons-outlined text-lg">
                        check_circle
                    </span>
                    Perubahan berhasil disimpan! ✓
                </div>
            )}

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-1">
                        Edit Homepage
                    </h1>
                    <p className="text-white/40 font-light">
                        Sesuaikan teks dan gambar yang tampil di halaman utama
                    </p>
                </div>
                <button
                    onClick={handleReset}
                    className="text-white/40 hover:text-white text-sm font-medium transition-colors flex items-center gap-2 border border-white/10 px-4 py-2 rounded-xl hover:bg-white/5"
                >
                    <span className="material-icons-outlined text-lg">
                        restart_alt
                    </span>
                    Reset Default
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Editor */}
                <div className="space-y-6">
                    {/* Hero Image Upload */}
                    <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
                        <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <span className="material-icons-outlined text-lg text-gold">
                                image
                            </span>
                            Gambar Hero
                        </h3>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                        />

                        {/* Image Preview & Upload */}
                        <div className="relative group">
                            {heroImage ? (
                                <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-white/10">
                                    <Image
                                        src={heroImage}
                                        alt="Hero preview"
                                        fill
                                        className="object-cover"
                                        unoptimized={heroImage.startsWith("data:")}
                                    />
                                    {/* Overlay on hover */}
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button
                                            onClick={() => fileInputRef.current?.click()}
                                            className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-white/30 transition-colors"
                                        >
                                            <span className="material-icons-outlined text-lg">edit</span>
                                            Ganti Gambar
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full aspect-[4/5] rounded-xl border-2 border-dashed border-white/10 hover:border-gold/40 transition-colors flex flex-col items-center justify-center gap-3 bg-white/[0.02]"
                                >
                                    <span className="material-icons-outlined text-4xl text-white/20">
                                        cloud_upload
                                    </span>
                                    <div className="text-center">
                                        <p className="text-white/60 text-sm font-medium">
                                            Upload Gambar Hero
                                        </p>
                                        <p className="text-white/30 text-xs mt-1">
                                            JPG, PNG, WebP • Maks 5MB
                                        </p>
                                    </div>
                                </button>
                            )}
                        </div>

                        <p className="text-white/30 text-xs mt-3 flex items-center gap-1">
                            <span className="material-icons-outlined text-xs">info</span>
                            Rasio gambar yang disarankan: 3:4 atau 4:5 (portrait)
                        </p>
                    </div>

                    {/* Hero Badge */}
                    <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
                        <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <span className="material-icons-outlined text-lg text-gold">
                                badge
                            </span>
                            Badge Teks
                        </h3>
                        <input
                            type="text"
                            value={form.badge}
                            onChange={(e) =>
                                setForm((prev) => ({
                                    ...prev,
                                    badge: e.target.value,
                                }))
                            }
                            className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder-white/20 outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all text-sm"
                            placeholder="Koleksi Terbaru"
                        />
                    </div>

                    {/* Title */}
                    <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
                        <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <span className="material-icons-outlined text-lg text-gold">
                                title
                            </span>
                            Judul Hero
                        </h3>
                        <div className="space-y-3">
                            <div>
                                <label className="text-xs text-white/40 mb-1 block">
                                    Baris Pertama
                                </label>
                                <input
                                    type="text"
                                    value={form.titleLine1}
                                    onChange={(e) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            titleLine1: e.target.value,
                                        }))
                                    }
                                    className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder-white/20 outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all text-sm"
                                    placeholder="Elegansi"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-white/40 mb-1 block">
                                    Teks Highlight (warna gold, italic)
                                </label>
                                <input
                                    type="text"
                                    value={form.titleHighlight}
                                    onChange={(e) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            titleHighlight: e.target.value,
                                        }))
                                    }
                                    className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder-white/20 outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all text-sm"
                                    placeholder="Hijab Turki"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Subtitle */}
                    <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
                        <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <span className="material-icons-outlined text-lg text-gold">
                                notes
                            </span>
                            Deskripsi
                        </h3>
                        <textarea
                            value={form.subtitle}
                            onChange={(e) =>
                                setForm((prev) => ({
                                    ...prev,
                                    subtitle: e.target.value,
                                }))
                            }
                            rows={3}
                            className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder-white/20 outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all text-sm resize-none"
                            placeholder="Deskripsi singkat..."
                        />
                    </div>

                    {/* CTA Buttons */}
                    <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
                        <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <span className="material-icons-outlined text-lg text-gold">
                                smart_button
                            </span>
                            Tombol CTA
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-xs text-white/40 mb-1 block">
                                    Tombol Utama
                                </label>
                                <input
                                    type="text"
                                    value={form.ctaText}
                                    onChange={(e) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            ctaText: e.target.value,
                                        }))
                                    }
                                    className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder-white/20 outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all text-sm"
                                    placeholder="Lihat Koleksi"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-white/40 mb-1 block">
                                    Tombol Kedua
                                </label>
                                <input
                                    type="text"
                                    value={form.ctaSecondary}
                                    onChange={(e) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            ctaSecondary: e.target.value,
                                        }))
                                    }
                                    className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder-white/20 outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all text-sm"
                                    placeholder="Tentang Kami"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Save Button */}
                    <button
                        onClick={handleSave}
                        className="w-full bg-gold hover:bg-gold-dark text-white py-4 rounded-xl font-bold text-sm transition-all shadow-lg shadow-gold/20 flex items-center justify-center gap-2"
                    >
                        <span className="material-icons-outlined text-lg">
                            save
                        </span>
                        Simpan Perubahan
                    </button>
                </div>

                {/* Live Preview */}
                <div className="sticky top-8 space-y-6">
                    {/* Text Preview */}
                    <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-icons-outlined text-lg text-gold">
                                visibility
                            </span>
                            <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider">
                                Preview Teks
                            </h3>
                        </div>

                        {/* Preview Card */}
                        <div className="bg-[#faf8f5] rounded-xl p-6 space-y-4">
                            {/* Badge */}
                            <span className="inline-block py-1 px-3 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-semibold tracking-widest uppercase border border-[#D4AF37]/20">
                                {form.badge || "Badge..."}
                            </span>

                            {/* Title */}
                            <h1
                                className="text-2xl font-medium text-[#3D2B1F] leading-tight"
                                style={{
                                    fontFamily:
                                        "'Playfair Display', serif",
                                }}
                            >
                                {form.titleLine1 || "Judul"}{" "}
                                <span
                                    className="italic"
                                    style={{ color: "#D4AF37" }}
                                >
                                    {form.titleHighlight || "Highlight"}
                                </span>
                            </h1>

                            {/* Subtitle */}
                            <p className="text-[#3D2B1F]/60 text-xs leading-relaxed font-light">
                                {form.subtitle || "Deskripsi..."}
                            </p>

                            {/* Buttons */}
                            <div className="flex gap-2">
                                <span className="bg-[#D4AF37] text-white px-4 py-2 rounded-full text-[10px] font-medium">
                                    {form.ctaText || "CTA"}
                                </span>
                                <span className="border border-[#3D2B1F]/20 text-[#3D2B1F] px-4 py-2 rounded-full text-[10px] font-medium">
                                    {form.ctaSecondary || "CTA 2"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Image Preview */}
                    <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-icons-outlined text-lg text-gold">
                                photo_camera
                            </span>
                            <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider">
                                Preview Gambar
                            </h3>
                        </div>
                        {heroImage ? (
                            <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
                                <Image
                                    src={heroImage}
                                    alt="Hero preview"
                                    fill
                                    className="object-cover"
                                    unoptimized={heroImage.startsWith("data:")}
                                />
                            </div>
                        ) : (
                            <div className="aspect-[4/5] rounded-xl bg-white/[0.04] flex items-center justify-center">
                                <span className="text-white/20 text-sm">Belum ada gambar</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
