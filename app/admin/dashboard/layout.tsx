"use client";

import { useAdminStore } from "../../store/admin";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const isAuthenticated = useAdminStore((s) => s.isAuthenticated);
    const logout = useAdminStore((s) => s.logout);
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/admin");
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) return null;

    return (
        <div className="min-h-screen bg-[#0f0f0f] flex">
            {/* Sidebar */}
            <aside className="w-64 bg-[#141414] border-r border-white/5 flex flex-col fixed h-full z-30">
                {/* Logo */}
                <div className="p-6 border-b border-white/5">
                    <Link href="/" className="block">
                        <h1 className="text-xl font-bold text-white tracking-tight">
                            BARIN
                            <span className="text-gold">ISTANBUL</span>
                        </h1>
                        <p className="text-white/30 text-xs mt-1 font-light">
                            Admin Panel
                        </p>
                    </Link>
                </div>

                {/* Nav */}
                <nav className="flex-1 p-4 space-y-1">
                    <SidebarLink
                        href="/admin/dashboard"
                        icon="dashboard"
                        label="Dashboard"
                    />
                    <SidebarLink
                        href="/admin/dashboard/products"
                        icon="inventory_2"
                        label="Produk"
                    />
                    <SidebarLink
                        href="/admin/dashboard/settings"
                        icon="settings"
                        label="Pengaturan"
                    />
                    <SidebarLink
                        href="/admin/dashboard/homepage"
                        icon="web"
                        label="Homepage"
                    />
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-white/5">
                    <button
                        onClick={() => {
                            logout();
                            router.push("/admin");
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400/80 hover:bg-red-500/10 hover:text-red-400 transition-all text-sm font-medium"
                    >
                        <span className="material-icons-outlined text-xl">
                            logout
                        </span>
                        Keluar
                    </button>
                    <Link
                        href="/"
                        target="_blank"
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/40 hover:bg-white/5 hover:text-white/60 transition-all text-sm font-medium mt-1"
                    >
                        <span className="material-icons-outlined text-xl">
                            open_in_new
                        </span>
                        Lihat Website
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64">
                {children}
            </main>
        </div>
    );
}

function SidebarLink({
    href,
    icon,
    label,
}: {
    href: string;
    icon: string;
    label: string;
}) {
    return (
        <Link
            href={href}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:bg-white/5 hover:text-white transition-all text-sm font-medium group"
        >
            <span className="material-icons-outlined text-xl group-hover:text-gold transition-colors">
                {icon}
            </span>
            {label}
        </Link>
    );
}
