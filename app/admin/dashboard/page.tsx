"use client";

import { useAdminStore } from "../../store/admin";
import { formatRupiah } from "../../constants/products";
import Link from "next/link";
import { useMemo } from "react";

export default function DashboardPage() {
    const products = useAdminStore((s) => s.products);
    const settings = useAdminStore((s) => s.settings);
    const orders = useAdminStore((s) => s.orders) ?? [];

    const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
    const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);
    const lowStock = products.filter((p) => p.stock < 10);
    const categories = [...new Set(products.map((p) => p.category))];

    // Calculate order stats
    const orderStats = useMemo(() => {
        const totalOrders = orders.length;
        const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
        const totalItemsSold = orders.reduce((sum, o) => sum + o.itemCount, 0);
        return { totalOrders, totalRevenue, totalItemsSold };
    }, [orders]);

    // Daily order data for the last 7 days
    const dailyOrders = useMemo(() => {
        const days: { label: string; date: string; orders: number; revenue: number; items: number }[] = [];
        const now = new Date();

        for (let i = 6; i >= 0; i--) {
            const d = new Date(now);
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split("T")[0];
            const dayLabel = d.toLocaleDateString("id-ID", { weekday: "short" });

            const dayOrders = orders.filter((o) => o.date.split("T")[0] === dateStr);
            days.push({
                label: dayLabel,
                date: dateStr,
                orders: dayOrders.length,
                revenue: dayOrders.reduce((sum, o) => sum + o.total, 0),
                items: dayOrders.reduce((sum, o) => sum + o.itemCount, 0),
            });
        }
        return days;
    }, [orders]);

    // Product popularity from orders
    const productPopularity = useMemo(() => {
        const map: Record<string, { name: string; count: number }> = {};
        orders.forEach((order) => {
            order.items.forEach((item) => {
                if (!map[item.productId]) {
                    map[item.productId] = { name: item.productName, count: 0 };
                }
                map[item.productId].count += item.quantity;
            });
        });
        return Object.values(map)
            .sort((a, b) => b.count - a.count)
            .slice(0, 6);
    }, [orders]);

    const maxDailyOrders = Math.max(...dailyOrders.map((d) => d.orders), 1);
    const maxStock = Math.max(...products.map((p) => p.stock), 1);
    const maxPopularity = Math.max(...productPopularity.map((p) => p.count), 1);

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-1">
                    Dashboard
                </h1>
                <p className="text-white/40 font-light">
                    Selamat datang di panel admin Barinistanbul
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                <StatCard
                    icon="inventory_2"
                    label="Total Produk"
                    value={products.length.toString()}
                    color="text-blue-400"
                    bg="bg-blue-400/10"
                />
                <StatCard
                    icon="warehouse"
                    label="Total Stok"
                    value={totalStock.toString()}
                    color="text-emerald-400"
                    bg="bg-emerald-400/10"
                />
                <StatCard
                    icon="shopping_cart"
                    label="Total Pesanan"
                    value={orderStats.totalOrders.toString()}
                    color="text-orange-400"
                    bg="bg-orange-400/10"
                />
                <StatCard
                    icon="account_balance_wallet"
                    label="Total Pendapatan"
                    value={formatRupiah(orderStats.totalRevenue)}
                    color="text-gold"
                    bg="bg-gold/10"
                />
            </div>

            {/* Charts Row 1: Daily Orders + Stock Levels */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Daily Orders Bar Chart */}
                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-lg font-bold text-white">
                                Pesanan 7 Hari Terakhir
                            </h2>
                            <p className="text-white/30 text-xs font-light mt-0.5">
                                Jumlah orang yang memesan per hari
                            </p>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-400/10 rounded-lg">
                            <span className="material-icons-outlined text-orange-400 text-base">
                                trending_up
                            </span>
                            <span className="text-orange-400 text-xs font-bold">
                                {orderStats.totalOrders} pesanan
                            </span>
                        </div>
                    </div>

                    {/* Bar Chart */}
                    <div className="flex items-end justify-between gap-3 h-48 mb-4">
                        {dailyOrders.map((day, i) => (
                            <div
                                key={day.date}
                                className="flex-1 flex flex-col items-center justify-end h-full"
                            >
                                <span className="text-white/60 text-xs font-bold mb-2">
                                    {day.orders}
                                </span>
                                <div
                                    className="w-full rounded-t-lg transition-all duration-700 ease-out relative group cursor-pointer"
                                    style={{
                                        height: `${Math.max((day.orders / maxDailyOrders) * 100, 4)}%`,
                                        background: `linear-gradient(to top, rgba(251, 146, 60, 0.3), rgba(251, 146, 60, ${0.5 + (day.orders / maxDailyOrders) * 0.5}))`,
                                        animationDelay: `${i * 100}ms`,
                                    }}
                                >
                                    <div className="absolute inset-0 rounded-t-lg bg-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    {/* Tooltip */}
                                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-[#1a1a1a] border border-white/10 px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                                        <p className="text-white text-xs font-bold">{day.orders} pesanan</p>
                                        <p className="text-white/40 text-[10px]">{formatRupiah(day.revenue)}</p>
                                    </div>
                                </div>
                                <span className="text-white/40 text-[10px] mt-2 font-medium">
                                    {day.label}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Summary row */}
                    <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5">
                        <div className="text-center">
                            <p className="text-white font-bold text-sm">{dailyOrders.reduce((s, d) => s + d.orders, 0)}</p>
                            <p className="text-white/30 text-[10px] mt-0.5">Total Pesanan</p>
                        </div>
                        <div className="text-center">
                            <p className="text-white font-bold text-sm">{dailyOrders.reduce((s, d) => s + d.items, 0)}</p>
                            <p className="text-white/30 text-[10px] mt-0.5">Item Terjual</p>
                        </div>
                        <div className="text-center">
                            <p className="text-gold font-bold text-sm">{formatRupiah(dailyOrders.reduce((s, d) => s + d.revenue, 0))}</p>
                            <p className="text-white/30 text-[10px] mt-0.5">Pendapatan</p>
                        </div>
                    </div>
                </div>

                {/* Product Stock Chart */}
                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-lg font-bold text-white">
                                Stok Barang
                            </h2>
                            <p className="text-white/30 text-xs font-light mt-0.5">
                                Level stok untuk setiap produk
                            </p>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-400/10 rounded-lg">
                            <span className="material-icons-outlined text-emerald-400 text-base">
                                warehouse
                            </span>
                            <span className="text-emerald-400 text-xs font-bold">
                                {totalStock} total
                            </span>
                        </div>
                    </div>

                    {/* Horizontal bar chart */}
                    <div className="space-y-4">
                        {products.slice(0, 6).map((product, i) => {
                            const percentage = (product.stock / maxStock) * 100;
                            const isLow = product.stock < 10;
                            const barColor = isLow
                                ? "from-red-500/40 to-red-400/70"
                                : product.stock < 30
                                    ? "from-yellow-500/30 to-yellow-400/60"
                                    : "from-emerald-500/30 to-emerald-400/60";
                            const textColor = isLow
                                ? "text-red-400"
                                : product.stock < 30
                                    ? "text-yellow-400"
                                    : "text-emerald-400";

                            return (
                                <div key={product.id}>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <span className="text-white/70 text-xs font-medium truncate max-w-[200px]">
                                            {product.name}
                                        </span>
                                        <span className={`text-xs font-bold ${textColor}`}>
                                            {product.stock}
                                        </span>
                                    </div>
                                    <div className="w-full h-3 bg-white/[0.04] rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full bg-gradient-to-r ${barColor} transition-all duration-1000 ease-out relative`}
                                            style={{
                                                width: `${Math.max(percentage, 3)}%`,
                                                animationDelay: `${i * 150}ms`,
                                            }}
                                        >
                                            <div className="absolute inset-0 rounded-full bg-white/10 animate-pulse" style={{ animationDuration: "3s" }} />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Legend */}
                    <div className="flex items-center gap-4 mt-5 pt-4 border-t border-white/5">
                        <div className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                            <span className="text-white/30 text-[10px]">Cukup (30+)</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                            <span className="text-white/30 text-[10px]">Menipis (10-29)</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                            <span className="text-white/30 text-[10px]">Rendah (&lt;10)</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Row 2: Product Popularity + Revenue Line */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Product Popularity */}
                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-lg font-bold text-white">
                                Produk Terlaris
                            </h2>
                            <p className="text-white/30 text-xs font-light mt-0.5">
                                Berdasarkan jumlah item yang dipesan
                            </p>
                        </div>
                        <span className="material-icons-outlined text-2xl text-purple-400/40">
                            leaderboard
                        </span>
                    </div>

                    <div className="space-y-3">
                        {productPopularity.length === 0 ? (
                            <div className="text-center py-8">
                                <span className="material-icons-outlined text-4xl text-white/10 mb-2 block">
                                    bar_chart
                                </span>
                                <p className="text-white/30 text-sm">Belum ada data pesanan</p>
                            </div>
                        ) : (
                            productPopularity.map((item, i) => {
                                const percentage = (item.count / maxPopularity) * 100;
                                const colors = [
                                    "from-gold/40 to-gold/70",
                                    "from-purple-500/30 to-purple-400/60",
                                    "from-blue-500/30 to-blue-400/60",
                                    "from-pink-500/30 to-pink-400/60",
                                    "from-cyan-500/30 to-cyan-400/60",
                                    "from-orange-500/30 to-orange-400/60",
                                ];
                                const textColors = [
                                    "text-gold",
                                    "text-purple-400",
                                    "text-blue-400",
                                    "text-pink-400",
                                    "text-cyan-400",
                                    "text-orange-400",
                                ];
                                const rankBadges = ["🥇", "🥈", "🥉"];

                                return (
                                    <div key={item.name} className="group">
                                        <div className="flex items-center justify-between mb-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm">
                                                    {i < 3 ? rankBadges[i] : `#${i + 1}`}
                                                </span>
                                                <span className="text-white/70 text-xs font-medium truncate max-w-[180px]">
                                                    {item.name}
                                                </span>
                                            </div>
                                            <span className={`text-xs font-bold ${textColors[i] || "text-white/50"}`}>
                                                {item.count} item
                                            </span>
                                        </div>
                                        <div className="w-full h-2.5 bg-white/[0.04] rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full bg-gradient-to-r ${colors[i] || colors[0]} transition-all duration-700`}
                                                style={{ width: `${Math.max(percentage, 5)}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* Revenue mini chart + Quick Actions */}
                <div className="space-y-6">
                    {/* Revenue Line Chart */}
                    <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-lg font-bold text-white">
                                    Revenue Harian
                                </h2>
                                <p className="text-white/30 text-xs font-light mt-0.5">
                                    Pendapatan per hari (7 hari)
                                </p>
                            </div>
                        </div>

                        {/* SVG area chart */}
                        <div className="relative h-32">
                            <svg viewBox="0 0 600 120" className="w-full h-full" preserveAspectRatio="none">
                                {/* Grid lines */}
                                {[0, 1, 2, 3].map((i) => (
                                    <line
                                        key={i}
                                        x1="0" y1={i * 40}
                                        x2="600" y2={i * 40}
                                        stroke="rgba(255,255,255,0.03)"
                                        strokeWidth="1"
                                    />
                                ))}

                                {/* Area fill */}
                                <defs>
                                    <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="rgb(212, 175, 55)" stopOpacity="0.3" />
                                        <stop offset="100%" stopColor="rgb(212, 175, 55)" stopOpacity="0.02" />
                                    </linearGradient>
                                </defs>

                                {(() => {
                                    const maxRev = Math.max(...dailyOrders.map(d => d.revenue), 1);
                                    const points = dailyOrders.map((d, i) => ({
                                        x: (i / 6) * 560 + 20,
                                        y: 110 - (d.revenue / maxRev) * 100,
                                    }));

                                    const lineStr = points.map((p) => `${p.x},${p.y}`).join(" ");
                                    const areaStr = `${points[0].x},110 ${lineStr} ${points[points.length - 1].x},110`;

                                    return (
                                        <>
                                            <polygon
                                                points={areaStr}
                                                fill="url(#areaGradient)"
                                            />
                                            <polyline
                                                points={lineStr}
                                                fill="none"
                                                stroke="rgb(212, 175, 55)"
                                                strokeWidth="2.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            {points.map((p, i) => (
                                                <circle
                                                    key={i}
                                                    cx={p.x}
                                                    cy={p.y}
                                                    r="4"
                                                    fill="#0f0f0f"
                                                    stroke="rgb(212, 175, 55)"
                                                    strokeWidth="2"
                                                />
                                            ))}
                                        </>
                                    );
                                })()}
                            </svg>

                            {/* X-axis labels */}
                            <div className="flex justify-between mt-1 px-1">
                                {dailyOrders.map((d) => (
                                    <span key={d.date} className="text-white/25 text-[9px] font-medium">
                                        {d.label}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
                        <h2 className="text-lg font-bold text-white mb-4">
                            Aksi Cepat
                        </h2>
                        <div className="grid grid-cols-2 gap-3">
                            <QuickAction
                                href="/admin/dashboard/products"
                                icon="add_circle"
                                label="Tambah Produk"
                                desc="Tambah produk baru"
                            />
                            <QuickAction
                                href="/admin/dashboard/products"
                                icon="edit"
                                label="Edit Produk"
                                desc="Ubah produk yang ada"
                            />
                            <QuickAction
                                href="/admin/dashboard/settings"
                                icon="phone_android"
                                label="No. WhatsApp"
                                desc="Ubah nomor WA"
                            />
                            <QuickAction
                                href="/admin/dashboard/homepage"
                                icon="web"
                                label="Teks Homepage"
                                desc="Edit teks hero"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Row: Low Stock + WA Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Low Stock Alert */}
                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-white">
                            Stok Rendah
                        </h2>
                        {lowStock.length > 0 && (
                            <span className="px-3 py-1 bg-red-500/10 text-red-400 text-xs font-bold rounded-full">
                                {lowStock.length} produk
                            </span>
                        )}
                    </div>
                    {lowStock.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                            <span className="material-icons-outlined text-4xl text-emerald-400/30 mb-3">
                                check_circle
                            </span>
                            <p className="text-white/40 text-sm font-light">
                                Semua produk memiliki stok yang cukup
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {lowStock.map((p) => (
                                <div
                                    key={p.id}
                                    className="flex items-center justify-between p-3 bg-red-500/5 border border-red-500/10 rounded-xl"
                                >
                                    <div>
                                        <p className="text-sm font-medium text-white">
                                            {p.name}
                                        </p>
                                        <p className="text-xs text-white/40">
                                            {p.category}
                                        </p>
                                    </div>
                                    <span className="text-red-400 font-bold text-sm">
                                        {p.stock} sisa
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* WA Number Info */}
                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#25D366]/10 rounded-xl flex items-center justify-center">
                                <svg
                                    className="w-6 h-6 fill-[#25D366]"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-white">
                                    Nomor WhatsApp Aktif
                                </p>
                                <p className="text-white/50 text-sm font-light">
                                    +{settings.waNumber}
                                </p>
                            </div>
                        </div>
                        <Link
                            href="/admin/dashboard/settings"
                            className="text-gold hover:text-gold-dark text-sm font-medium transition-colors"
                        >
                            Ubah
                        </Link>
                    </div>

                    {/* Order Stats Summary */}
                    <div className="grid grid-cols-3 gap-3 mt-5 pt-5 border-t border-white/5">
                        <div className="bg-white/[0.03] rounded-xl p-3 text-center">
                            <p className="text-xl font-bold text-white">{categories.length}</p>
                            <p className="text-white/30 text-[10px] mt-0.5">Kategori</p>
                        </div>
                        <div className="bg-white/[0.03] rounded-xl p-3 text-center">
                            <p className="text-xl font-bold text-white">{orderStats.totalItemsSold}</p>
                            <p className="text-white/30 text-[10px] mt-0.5">Item Terjual</p>
                        </div>
                        <div className="bg-white/[0.03] rounded-xl p-3 text-center">
                            <p className="text-xl font-bold text-gold">{formatRupiah(totalValue)}</p>
                            <p className="text-white/30 text-[10px] mt-0.5">Inventaris</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({
    icon,
    label,
    value,
    color,
    bg,
}: {
    icon: string;
    label: string;
    value: string;
    color: string;
    bg: string;
}) {
    return (
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
                <div
                    className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center`}
                >
                    <span
                        className={`material-icons-outlined text-xl ${color}`}
                    >
                        {icon}
                    </span>
                </div>
            </div>
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-white/40 text-xs mt-1 font-light">{label}</p>
        </div>
    );
}

function QuickAction({
    href,
    icon,
    label,
    desc,
}: {
    href: string;
    icon: string;
    label: string;
    desc: string;
}) {
    return (
        <Link
            href={href}
            className="flex flex-col items-center justify-center p-5 bg-white/[0.03] border border-white/5 rounded-xl hover:bg-white/[0.06] hover:border-gold/20 transition-all group text-center"
        >
            <span className="material-icons-outlined text-2xl text-white/40 group-hover:text-gold transition-colors mb-2">
                {icon}
            </span>
            <p className="text-sm font-medium text-white">{label}</p>
            <p className="text-[11px] text-white/30 mt-0.5">{desc}</p>
        </Link>
    );
}
