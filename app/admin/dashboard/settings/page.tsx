"use client";

import { useState } from "react";
import { useAdminStore } from "../../../store/admin";

export default function SettingsPage() {
    const settings = useAdminStore((s) => s.settings);
    const updateSettings = useAdminStore((s) => s.updateSettings);
    const updateSocialLinks = useAdminStore((s) => s.updateSocialLinks);

    const [waNumber, setWaNumber] = useState(settings.waNumber);
    const [socials, setSocials] = useState(settings.socialLinks ?? {
        instagram: "",
        facebook: "",
        tiktok: "",
        twitter: "",
    });
    const [saved, setSaved] = useState(false);

    const handleSaveWA = () => {
        if (!waNumber.trim()) return;
        const cleaned = waNumber.replace(/[\s\-\(\)]/g, "");
        updateSettings({ waNumber: cleaned });
        setWaNumber(cleaned);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const handleSaveSocials = () => {
        updateSocialLinks(socials);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const socialFields = [
        {
            key: "instagram" as const,
            label: "Instagram",
            icon: "camera_alt",
            color: "text-pink-400",
            bgColor: "bg-pink-500/10",
            placeholder: "https://instagram.com/barinistanbul",
        },
        {
            key: "facebook" as const,
            label: "Facebook",
            icon: "facebook",
            color: "text-blue-400",
            bgColor: "bg-blue-500/10",
            placeholder: "https://facebook.com/barinistanbul",
        },
        {
            key: "tiktok" as const,
            label: "TikTok",
            icon: "music_note",
            color: "text-white",
            bgColor: "bg-white/10",
            placeholder: "https://tiktok.com/@barinistanbul",
        },
        {
            key: "twitter" as const,
            label: "Twitter / X",
            icon: "alternate_email",
            color: "text-sky-400",
            bgColor: "bg-sky-500/10",
            placeholder: "https://x.com/barinistanbul",
        },
    ];

    return (
        <div className="p-8 max-w-3xl">
            {/* Toast */}
            {saved && (
                <div className="fixed top-6 right-6 z-50 bg-emerald-500/90 backdrop-blur-sm text-white px-6 py-3 rounded-xl shadow-2xl shadow-emerald-500/20 text-sm font-medium flex items-center gap-2">
                    <span className="material-icons-outlined text-lg">
                        check_circle
                    </span>
                    Pengaturan berhasil disimpan! ✓
                </div>
            )}

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-1">
                    Pengaturan
                </h1>
                <p className="text-white/40 font-light">
                    Kelola pengaturan toko Anda
                </p>
            </div>

            {/* WhatsApp Settings */}
            <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-[#25D366]/10 rounded-xl flex items-center justify-center">
                        <svg
                            className="w-6 h-6 fill-[#25D366]"
                            viewBox="0 0 24 24"
                        >
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-white">
                            Nomor WhatsApp
                        </h2>
                        <p className="text-white/40 text-sm font-light">
                            Nomor yang digunakan untuk checkout via WhatsApp
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-white/60 mb-2">
                            Nomor WhatsApp (format internasional)
                        </label>
                        <div className="flex gap-3">
                            <div className="relative flex-1">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-sm">
                                    +
                                </span>
                                <input
                                    type="text"
                                    value={waNumber}
                                    onChange={(e) =>
                                        setWaNumber(e.target.value)
                                    }
                                    placeholder="6281234567890"
                                    className="w-full pl-8 pr-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder-white/20 outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all text-sm"
                                />
                            </div>
                            <button
                                onClick={handleSaveWA}
                                className="bg-gold hover:bg-gold-dark text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-gold/20 flex items-center gap-2"
                            >
                                <span className="material-icons-outlined text-lg">
                                    save
                                </span>
                                Simpan
                            </button>
                        </div>
                        <p className="text-white/30 text-xs mt-2">
                            Contoh: 6281234567890 (62 = kode negara Indonesia,
                            tanpa tanda +)
                        </p>
                    </div>

                    {/* Preview */}
                    <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4">
                        <p className="text-white/40 text-xs font-medium uppercase tracking-wider mb-2">
                            Preview
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center">
                                <svg
                                    className="w-5 h-5 fill-white"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-white text-sm font-medium">
                                    wa.me/{waNumber || "..."}
                                </p>
                                <p className="text-white/30 text-xs">
                                    Link checkout akan mengarah ke nomor ini
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Social Media Links */}
            <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                        <span className="material-icons-outlined text-2xl text-purple-400">
                            share
                        </span>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-white">
                            Sosial Media
                        </h2>
                        <p className="text-white/40 text-sm font-light">
                            Link sosial media yang tampil di footer website
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    {socialFields.map((field) => (
                        <div key={field.key} className="flex items-center gap-3">
                            <div className={`w-10 h-10 ${field.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                                <span className={`material-icons-outlined text-xl ${field.color}`}>
                                    {field.icon}
                                </span>
                            </div>
                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={socials[field.key]}
                                    onChange={(e) =>
                                        setSocials((prev) => ({
                                            ...prev,
                                            [field.key]: e.target.value,
                                        }))
                                    }
                                    placeholder={field.placeholder}
                                    className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder-white/20 outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all text-sm"
                                />
                            </div>
                            {socials[field.key] && (
                                <button
                                    onClick={() =>
                                        setSocials((prev) => ({
                                            ...prev,
                                            [field.key]: "",
                                        }))
                                    }
                                    className="w-10 h-10 flex items-center justify-center rounded-xl text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all flex-shrink-0"
                                    title="Hapus"
                                >
                                    <span className="material-icons-outlined text-lg">
                                        close
                                    </span>
                                </button>
                            )}
                        </div>
                    ))}

                    <button
                        onClick={handleSaveSocials}
                        className="w-full bg-gold hover:bg-gold-dark text-white py-3.5 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-gold/20 flex items-center justify-center gap-2 mt-2"
                    >
                        <span className="material-icons-outlined text-lg">
                            save
                        </span>
                        Simpan Sosial Media
                    </button>
                </div>

                {/* Preview */}
                <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4 mt-4">
                    <p className="text-white/40 text-xs font-medium uppercase tracking-wider mb-3">
                        Preview Footer
                    </p>
                    <div className="flex items-center gap-4">
                        {socials.instagram && (
                            <div className="flex items-center gap-2">
                                <span className="material-icons-outlined text-lg text-pink-400">camera_alt</span>
                                <span className="text-white/50 text-xs">Instagram</span>
                            </div>
                        )}
                        {socials.facebook && (
                            <div className="flex items-center gap-2">
                                <span className="material-icons-outlined text-lg text-blue-400">facebook</span>
                                <span className="text-white/50 text-xs">Facebook</span>
                            </div>
                        )}
                        {socials.tiktok && (
                            <div className="flex items-center gap-2">
                                <span className="material-icons-outlined text-lg text-white">music_note</span>
                                <span className="text-white/50 text-xs">TikTok</span>
                            </div>
                        )}
                        {socials.twitter && (
                            <div className="flex items-center gap-2">
                                <span className="material-icons-outlined text-lg text-sky-400">alternate_email</span>
                                <span className="text-white/50 text-xs">Twitter</span>
                            </div>
                        )}
                        {!socials.instagram && !socials.facebook && !socials.tiktok && !socials.twitter && (
                            <p className="text-white/25 text-xs italic">Belum ada sosial media yang diatur</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Admin Password Info */}
            <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                        <span className="material-icons-outlined text-2xl text-blue-400">
                            security
                        </span>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-white">
                            Keamanan
                        </h2>
                        <p className="text-white/40 text-sm font-light">
                            Informasi keamanan akun admin
                        </p>
                    </div>
                </div>
                <div className="bg-yellow-500/5 border border-yellow-500/10 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                        <span className="material-icons-outlined text-yellow-400 text-lg mt-0.5">
                            info
                        </span>
                        <div>
                            <p className="text-white/60 text-sm">
                                Password admin default:{" "}
                                <code className="bg-white/[0.06] px-2 py-0.5 rounded text-gold text-xs">
                                    barin2026
                                </code>
                            </p>
                            <p className="text-white/30 text-xs mt-1">
                                Untuk mengubah password, edit file{" "}
                                <code className="bg-white/[0.06] px-1.5 py-0.5 rounded text-xs">
                                    app/store/admin.ts
                                </code>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
