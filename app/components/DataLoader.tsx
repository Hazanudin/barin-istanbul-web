"use client";

import { useEffect } from "react";
import { useAdminStore } from "../store/admin";

export default function DataLoader({ children }: { children: React.ReactNode }) {
    const loadFromServer = useAdminStore((s) => s.loadFromServer);
    const isLoaded = useAdminStore((s) => s.isLoaded);

    useEffect(() => {
        loadFromServer();
    }, [loadFromServer]);

    if (!isLoaded) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-primary z-[9999]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
                    <p className="text-white/40 text-sm font-light tracking-wide">Memuat data...</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
