"use client";

import { useState, useEffect } from "react";
import { useAdminStore } from "../store/admin";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const login = useAdminStore((s) => s.login);
    const isAuthenticated = useAdminStore((s) => s.isAuthenticated);
    const router = useRouter();

    // If already authenticated, redirect
    useEffect(() => {
        if (isAuthenticated) {
            router.push("/admin/dashboard");
        }
    }, [isAuthenticated, router]);

    if (isAuthenticated) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        setTimeout(() => {
            const success = login(password);
            if (success) {
                router.push("/admin/dashboard");
            } else {
                setError("Password salah. Coba lagi.");
                setLoading(false);
            }
        }, 600);
    };

    return (
        <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/3 rounded-full blur-[120px]" />
            </div>

            <div className="relative w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-10">
                    <Link href="/" className="inline-block">
                        <h1 className="text-3xl font-bold text-white tracking-tight">
                            BARIN<span className="text-gold">ISTANBUL</span>
                        </h1>
                    </Link>
                    <p className="text-white/30 text-sm mt-2 font-light">
                        Admin Dashboard
                    </p>
                </div>

                {/* Login Card */}
                <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <span className="material-icons-outlined text-3xl text-gold">
                                admin_panel_settings
                            </span>
                        </div>
                        <h2 className="text-xl font-bold text-white">
                            Login Admin
                        </h2>
                        <p className="text-white/40 text-sm mt-1 font-light">
                            Masukkan password untuk mengakses dashboard
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-white/60 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-icons-outlined text-white/30 text-xl">
                                    lock
                                </span>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Masukkan password..."
                                    className="w-full pl-12 pr-4 py-3.5 bg-white/[0.06] border border-white/10 rounded-xl text-white placeholder-white/20 outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all text-sm"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 px-4 py-3 rounded-xl border border-red-400/20">
                                <span className="material-icons-outlined text-base">
                                    error_outline
                                </span>
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gold hover:bg-gold-dark disabled:opacity-50 text-white py-3.5 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-gold/20 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <svg
                                        className="animate-spin w-5 h-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                        />
                                    </svg>
                                    Memverifikasi...
                                </>
                            ) : (
                                <>
                                    <span className="material-icons-outlined text-lg">
                                        login
                                    </span>
                                    Masuk Dashboard
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Back to home */}
                <div className="text-center mt-6">
                    <Link
                        href="/"
                        className="text-white/30 hover:text-gold text-sm transition-colors inline-flex items-center gap-1"
                    >
                        <span className="material-icons-outlined text-base">
                            arrow_back
                        </span>
                        Kembali ke Website
                    </Link>
                </div>
            </div>
        </div>
    );
}
