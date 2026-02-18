"use client";

import { useEffect } from "react";
import { useAdminStore } from "../store/admin";

export default function DataLoader({ children }: { children: React.ReactNode }) {
    const loadFromServer = useAdminStore((s) => s.loadFromServer);
    const isLoaded = useAdminStore((s) => s.isLoaded);

    useEffect(() => {
        loadFromServer();
    }, [loadFromServer]);

    // Non-blocking loader: render children immediately, fetch in background
    return <>{children}</>;
}
