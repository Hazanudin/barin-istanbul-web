"use client";

import { useState, useRef } from "react";
import { useAdminStore, Product, ColorOption } from "../../../store/admin";
import { formatRupiah } from "../../../constants/products";
import Image from "next/image";

const emptyProduct: Product = {
    id: "",
    name: "",
    price: 0,
    image: "",
    category: "",
    color: "",
    colorHex: "#888888",
    stock: 0,
    description: "",
    details: "",
    shippingInfo: "",
};

export default function ProductsPage() {
    const products = useAdminStore((s) => s.products);
    const categories = useAdminStore((s) => s.categories);
    const colors = useAdminStore((s) => s.colors);
    const addProduct = useAdminStore((s) => s.addProduct);
    const updateProduct = useAdminStore((s) => s.updateProduct);
    const deleteProduct = useAdminStore((s) => s.deleteProduct);
    const addCategory = useAdminStore((s) => s.addCategory);
    const renameCategory = useAdminStore((s) => s.renameCategory);
    const deleteCategory = useAdminStore((s) => s.deleteCategory);
    const addColor = useAdminStore((s) => s.addColor);
    const updateColor = useAdminStore((s) => s.updateColor);
    const deleteColor = useAdminStore((s) => s.deleteColor);

    const [showForm, setShowForm] = useState(false);
    const [showCategoryManager, setShowCategoryManager] = useState(false);
    const [showColorManager, setShowColorManager] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState<Product>(emptyProduct);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
    const [deleteCatConfirm, setDeleteCatConfirm] = useState<string | null>(null);
    const [deleteColorConfirm, setDeleteColorConfirm] = useState<string | null>(null);
    const [toast, setToast] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    // Category manager state
    const [newCategoryName, setNewCategoryName] = useState("");
    const [editingCat, setEditingCat] = useState<string | null>(null);
    const [editCatName, setEditCatName] = useState("");

    // Color manager state
    const [newColorName, setNewColorName] = useState("");
    const [newColorHex, setNewColorHex] = useState("#888888");
    const [editingColor, setEditingColor] = useState<string | null>(null);
    const [editColorName, setEditColorName] = useState("");
    const [editColorHex, setEditColorHex] = useState("");

    const fileInputRef = useRef<HTMLInputElement>(null);
    const newColorPickerRef = useRef<HTMLInputElement>(null);
    const editColorPickerRef = useRef<HTMLInputElement>(null);

    const filteredProducts = products.filter(
        (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(""), 3000);
    };

    const handleAdd = () => {
        setEditingId(null);
        setForm({
            ...emptyProduct,
            id: Date.now().toString(),
            category: categories[0] || "",
            color: colors[0]?.name || "",
            colorHex: colors[0]?.hex || "#888888",
        });
        setShowForm(true);
    };

    const handleEdit = (product: Product) => {
        setEditingId(product.id);
        setForm({ ...product });
        setShowForm(true);
    };

    const [uploading, setUploading] = useState(false);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            showToast("File harus berupa gambar!");
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            showToast("Ukuran file maksimal 5MB!");
            return;
        }

        setUploading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (data.url) {
                setForm((prev) => ({ ...prev, image: data.url }));
                showToast("Gambar berhasil diupload! ✓");
            } else {
                showToast("Gagal upload gambar!");
            }
        } catch {
            showToast("Gagal upload gambar!");
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name.trim()) { showToast("Nama produk wajib diisi!"); return; }
        if (!form.image) { showToast("Gambar produk wajib diisi!"); return; }
        if (form.price <= 0) { showToast("Harga harus lebih dari 0!"); return; }

        if (editingId) {
            updateProduct(editingId, form);
            showToast("Produk berhasil diperbarui! ✓");
        } else {
            addProduct(form);
            showToast("Produk baru berhasil ditambahkan! ✓");
        }
        setShowForm(false);
        setEditingId(null);
        setForm(emptyProduct);
    };

    const handleDelete = (id: string) => {
        deleteProduct(id);
        setDeleteConfirm(null);
        showToast("Produk berhasil dihapus!");
    };

    // Category CRUD handlers
    const handleAddCategory = () => {
        const name = newCategoryName.trim();
        if (!name) return;
        if (categories.includes(name)) { showToast("Kategori sudah ada!"); return; }
        addCategory(name);
        setNewCategoryName("");
        showToast("Kategori ditambahkan! ✓");
    };

    const handleRenameCategory = (oldName: string) => {
        const newName = editCatName.trim();
        if (!newName || newName === oldName) { setEditingCat(null); return; }
        if (categories.includes(newName)) { showToast("Nama kategori sudah digunakan!"); return; }
        renameCategory(oldName, newName);
        setEditingCat(null);
        setEditCatName("");
        showToast("Kategori berhasil diubah! ✓");
    };

    const handleDeleteCategory = (name: string) => {
        const count = products.filter((p) => p.category === name).length;
        if (count > 0) {
            showToast(`Tidak bisa hapus! ${count} produk masih menggunakan kategori ini.`);
            setDeleteCatConfirm(null);
            return;
        }
        deleteCategory(name);
        setDeleteCatConfirm(null);
        showToast("Kategori berhasil dihapus!");
    };

    // Color CRUD handlers
    const handleAddColor = () => {
        const name = newColorName.trim();
        if (!name) return;
        if (colors.some((c) => c.name === name)) { showToast("Nama warna sudah ada!"); return; }
        addColor({ name, hex: newColorHex });
        setNewColorName("");
        setNewColorHex("#888888");
        showToast("Warna ditambahkan! ✓");
    };

    const handleUpdateColor = (oldName: string) => {
        const name = editColorName.trim();
        if (!name) { setEditingColor(null); return; }
        if (name !== oldName && colors.some((c) => c.name === name)) {
            showToast("Nama warna sudah digunakan!");
            return;
        }
        updateColor(oldName, { name, hex: editColorHex });
        setEditingColor(null);
        setEditColorName("");
        setEditColorHex("");
        showToast("Warna berhasil diubah! ✓");
    };

    const handleDeleteColor = (name: string) => {
        const count = products.filter((p) => p.color === name).length;
        if (count > 0) {
            showToast(`Tidak bisa hapus! ${count} produk masih menggunakan warna ini.`);
            setDeleteColorConfirm(null);
            return;
        }
        deleteColor(name);
        setDeleteColorConfirm(null);
        showToast("Warna berhasil dihapus!");
    };

    // Select color in product form
    const handleSelectColor = (c: ColorOption) => {
        setForm((prev) => ({ ...prev, color: c.name, colorHex: c.hex }));
    };

    return (
        <div className="p-8">
            {/* Toast */}
            {toast && (
                <div className="fixed top-6 right-6 z-50 bg-emerald-500/90 backdrop-blur-sm text-white px-6 py-3 rounded-xl shadow-2xl shadow-emerald-500/20 text-sm font-medium flex items-center gap-2 animate-[slideIn_0.3s_ease-out]">
                    <span className="material-icons-outlined text-lg">check_circle</span>
                    {toast}
                </div>
            )}

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-1">Kelola Produk</h1>
                    <p className="text-white/40 font-light">{products.length} produk terdaftar</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowColorManager(true)}
                        className="border border-white/10 hover:bg-white/5 text-white/60 hover:text-white px-5 py-3 rounded-xl font-medium text-sm transition-all flex items-center gap-2"
                    >
                        <span className="material-icons-outlined text-lg">palette</span>
                        Warna
                    </button>
                    <button
                        onClick={() => setShowCategoryManager(true)}
                        className="border border-white/10 hover:bg-white/5 text-white/60 hover:text-white px-5 py-3 rounded-xl font-medium text-sm transition-all flex items-center gap-2"
                    >
                        <span className="material-icons-outlined text-lg">category</span>
                        Kategori
                    </button>
                    <button
                        onClick={handleAdd}
                        className="bg-gold hover:bg-gold-dark text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-gold/20 flex items-center gap-2"
                    >
                        <span className="material-icons-outlined text-lg">add</span>
                        Tambah Produk
                    </button>
                </div>
            </div>

            {/* Search */}
            <div className="mb-6">
                <div className="relative max-w-md">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-icons-outlined text-white/30 text-xl">search</span>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari produk..."
                        className="w-full pl-12 pr-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder-white/20 outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all text-sm"
                    />
                </div>
            </div>

            {/* ===================== CATEGORY MANAGER MODAL ===================== */}
            {showCategoryManager && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto shadow-2xl">
                        <div className="flex items-center justify-between p-6 border-b border-white/5 sticky top-0 bg-[#1a1a1a] rounded-t-2xl z-10">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <span className="material-icons-outlined text-gold">category</span>
                                Kelola Kategori
                            </h2>
                            <button onClick={() => { setShowCategoryManager(false); setEditingCat(null); setDeleteCatConfirm(null); }} className="text-white/40 hover:text-white transition-colors">
                                <span className="material-icons-outlined text-2xl">close</span>
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            {/* Add new category */}
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newCategoryName}
                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
                                    placeholder="Nama kategori baru..."
                                    className="flex-1 px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder-white/20 outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all text-sm"
                                />
                                <button onClick={handleAddCategory} className="bg-gold hover:bg-gold-dark text-white px-4 py-3 rounded-xl font-medium text-sm transition-all flex items-center gap-1">
                                    <span className="material-icons-outlined text-lg">add</span>
                                    Tambah
                                </button>
                            </div>

                            {/* Category list */}
                            <div className="space-y-2">
                                {categories.length === 0 ? (
                                    <p className="text-white/30 text-sm text-center py-6">Belum ada kategori.</p>
                                ) : (
                                    categories.map((cat) => {
                                        const count = products.filter((p) => p.category === cat).length;
                                        return (
                                            <div key={cat} className="flex items-center gap-3 p-3 bg-white/[0.03] rounded-xl border border-white/5 group">
                                                {editingCat === cat ? (
                                                    <div className="flex-1 flex gap-2">
                                                        <input type="text" value={editCatName} onChange={(e) => setEditCatName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleRenameCategory(cat)} className="flex-1 px-3 py-2 bg-white/[0.06] border border-gold/30 rounded-lg text-white text-sm outline-none focus:border-gold/50" autoFocus />
                                                        <button onClick={() => handleRenameCategory(cat)} className="px-3 py-2 bg-gold/20 text-gold rounded-lg text-sm font-medium hover:bg-gold/30 transition-colors">Simpan</button>
                                                        <button onClick={() => { setEditingCat(null); setEditCatName(""); }} className="px-3 py-2 text-white/40 hover:text-white text-sm transition-colors">Batal</button>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-medium text-white">{cat}</p>
                                                            <p className="text-xs text-white/30">{count} produk</p>
                                                        </div>
                                                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button onClick={() => { setEditingCat(cat); setEditCatName(cat); }} className="w-8 h-8 flex items-center justify-center rounded-lg text-white/40 hover:bg-blue-500/10 hover:text-blue-400 transition-all" title="Rename">
                                                                <span className="material-icons-outlined text-lg">edit</span>
                                                            </button>
                                                            {deleteCatConfirm === cat ? (
                                                                <div className="flex items-center gap-1">
                                                                    <button onClick={() => handleDeleteCategory(cat)} className="px-2 py-1 text-xs bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors">Hapus</button>
                                                                    <button onClick={() => setDeleteCatConfirm(null)} className="px-2 py-1 text-xs text-white/40 hover:text-white transition-colors">Batal</button>
                                                                </div>
                                                            ) : (
                                                                <button onClick={() => setDeleteCatConfirm(cat)} className="w-8 h-8 flex items-center justify-center rounded-lg text-white/40 hover:bg-red-500/10 hover:text-red-400 transition-all" title="Hapus">
                                                                    <span className="material-icons-outlined text-lg">delete</span>
                                                                </button>
                                                            )}
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ===================== COLOR MANAGER MODAL ===================== */}
            {showColorManager && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto shadow-2xl">
                        <div className="flex items-center justify-between p-6 border-b border-white/5 sticky top-0 bg-[#1a1a1a] rounded-t-2xl z-10">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <span className="material-icons-outlined text-gold">palette</span>
                                Kelola Warna
                            </h2>
                            <button onClick={() => { setShowColorManager(false); setEditingColor(null); setDeleteColorConfirm(null); }} className="text-white/40 hover:text-white transition-colors">
                                <span className="material-icons-outlined text-2xl">close</span>
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            {/* Add new color */}
                            <div className="flex gap-2 items-end">
                                {/* Color picker swatch */}
                                <div className="relative flex-shrink-0">
                                    <label className="text-xs text-white/40 mb-1 block">Warna</label>
                                    <div
                                        className="w-11 h-11 rounded-xl border-2 border-white/10 cursor-pointer overflow-hidden hover:border-gold/40 transition-colors shadow-inner"
                                        onClick={() => newColorPickerRef.current?.click()}
                                        style={{ backgroundColor: newColorHex }}
                                    />
                                    <input
                                        ref={newColorPickerRef}
                                        type="color"
                                        value={newColorHex}
                                        onChange={(e) => setNewColorHex(e.target.value)}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="text-xs text-white/40 mb-1 block">Nama warna</label>
                                    <input
                                        type="text"
                                        value={newColorName}
                                        onChange={(e) => setNewColorName(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleAddColor()}
                                        placeholder="Cream, Black, Olive..."
                                        className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder-white/20 outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all text-sm"
                                    />
                                </div>
                                <div className="w-24">
                                    <label className="text-xs text-white/40 mb-1 block">Hex</label>
                                    <input
                                        type="text"
                                        value={newColorHex}
                                        onChange={(e) => {
                                            let val = e.target.value;
                                            if (!val.startsWith("#")) val = "#" + val;
                                            setNewColorHex(val);
                                        }}
                                        placeholder="#F5E6CA"
                                        maxLength={7}
                                        className="w-full px-3 py-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-white font-mono placeholder-white/20 outline-none focus:border-gold/50 text-sm"
                                    />
                                </div>
                                <button onClick={handleAddColor} className="bg-gold hover:bg-gold-dark text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-all flex items-center gap-1 flex-shrink-0">
                                    <span className="material-icons-outlined text-lg">add</span>
                                    Tambah
                                </button>
                            </div>
                            <p className="text-white/25 text-xs flex items-center gap-1 -mt-1">
                                <span className="material-icons-outlined text-xs">info</span>
                                Klik kotak warna untuk membuka color picker, atau ketik kode hex langsung
                            </p>

                            {/* Color list */}
                            <div className="space-y-2">
                                {colors.length === 0 ? (
                                    <p className="text-white/30 text-sm text-center py-6">Belum ada warna.</p>
                                ) : (
                                    colors.map((col) => {
                                        const count = products.filter((p) => p.color === col.name).length;
                                        return (
                                            <div key={col.name} className="flex items-center gap-3 p-3 bg-white/[0.03] rounded-xl border border-white/5 group">
                                                {editingColor === col.name ? (
                                                    <div className="flex-1 flex gap-2 items-center">
                                                        {/* Edit: color picker */}
                                                        <div className="relative flex-shrink-0">
                                                            <div
                                                                className="w-9 h-9 rounded-lg border-2 border-gold/30 cursor-pointer overflow-hidden"
                                                                onClick={() => editColorPickerRef.current?.click()}
                                                                style={{ backgroundColor: editColorHex }}
                                                            />
                                                            <input
                                                                ref={editColorPickerRef}
                                                                type="color"
                                                                value={editColorHex}
                                                                onChange={(e) => setEditColorHex(e.target.value)}
                                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                            />
                                                        </div>
                                                        <input
                                                            type="text"
                                                            value={editColorName}
                                                            onChange={(e) => setEditColorName(e.target.value)}
                                                            onKeyDown={(e) => e.key === "Enter" && handleUpdateColor(col.name)}
                                                            className="flex-1 px-3 py-2 bg-white/[0.06] border border-gold/30 rounded-lg text-white text-sm outline-none focus:border-gold/50"
                                                            placeholder="Nama warna"
                                                            autoFocus
                                                        />
                                                        <input
                                                            type="text"
                                                            value={editColorHex}
                                                            onChange={(e) => {
                                                                let val = e.target.value;
                                                                if (!val.startsWith("#")) val = "#" + val;
                                                                setEditColorHex(val);
                                                            }}
                                                            className="w-20 px-2 py-2 bg-white/[0.06] border border-gold/30 rounded-lg text-white font-mono text-xs outline-none focus:border-gold/50"
                                                            maxLength={7}
                                                        />
                                                        <button onClick={() => handleUpdateColor(col.name)} className="px-3 py-2 bg-gold/20 text-gold rounded-lg text-sm font-medium hover:bg-gold/30 transition-colors">Simpan</button>
                                                        <button onClick={() => { setEditingColor(null); setEditColorName(""); setEditColorHex(""); }} className="px-3 py-2 text-white/40 hover:text-white text-sm transition-colors">Batal</button>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <div className="w-9 h-9 rounded-lg border border-white/10 flex-shrink-0 shadow-inner" style={{ backgroundColor: col.hex }} />
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-medium text-white">{col.name}</p>
                                                            <p className="text-xs text-white/30 font-mono">{col.hex} · {count} produk</p>
                                                        </div>
                                                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button
                                                                onClick={() => { setEditingColor(col.name); setEditColorName(col.name); setEditColorHex(col.hex); }}
                                                                className="w-8 h-8 flex items-center justify-center rounded-lg text-white/40 hover:bg-blue-500/10 hover:text-blue-400 transition-all"
                                                                title="Edit"
                                                            >
                                                                <span className="material-icons-outlined text-lg">edit</span>
                                                            </button>
                                                            {deleteColorConfirm === col.name ? (
                                                                <div className="flex items-center gap-1">
                                                                    <button onClick={() => handleDeleteColor(col.name)} className="px-2 py-1 text-xs bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors">Hapus</button>
                                                                    <button onClick={() => setDeleteColorConfirm(null)} className="px-2 py-1 text-xs text-white/40 hover:text-white transition-colors">Batal</button>
                                                                </div>
                                                            ) : (
                                                                <button onClick={() => setDeleteColorConfirm(col.name)} className="w-8 h-8 flex items-center justify-center rounded-lg text-white/40 hover:bg-red-500/10 hover:text-red-400 transition-all" title="Hapus">
                                                                    <span className="material-icons-outlined text-lg">delete</span>
                                                                </button>
                                                            )}
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ===================== PRODUCT FORM MODAL ===================== */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                        {/* Form Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/5 sticky top-0 bg-[#1a1a1a] rounded-t-2xl z-10">
                            <h2 className="text-xl font-bold text-white">
                                {editingId ? "Edit Produk" : "Tambah Produk Baru"}
                            </h2>
                            <button onClick={() => { setShowForm(false); setEditingId(null); }} className="text-white/40 hover:text-white transition-colors">
                                <span className="material-icons-outlined text-2xl">close</span>
                            </button>
                        </div>

                        {/* Form Body */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            {/* Image Upload */}
                            <div>
                                <label className="block text-sm font-medium text-white/60 mb-2">Gambar Produk *</label>
                                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                <div
                                    className={`w-full border-2 border-dashed border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-gold/40 hover:bg-white/[0.02] transition-all relative ${uploading ? "opacity-50 pointer-events-none" : ""
                                        }`}
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    {uploading && (
                                        <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/50 rounded-2xl backdrop-blur-[2px]">
                                            <div className="flex flex-col items-center gap-2">
                                                <div className="w-8 h-8 border-2 border-white/30 border-t-gold rounded-full animate-spin" />
                                                <span className="text-white text-xs font-medium">Uploading...</span>
                                            </div>
                                        </div>
                                    )}
                                    {form.image ? (
                                        <div className="relative w-full flex flex-col items-center gap-4">
                                            <div className="w-40 h-40 rounded-xl overflow-hidden shadow-lg">
                                                <Image src={form.image} alt="Preview" width={160} height={160} unoptimized={form.image.startsWith("data:")} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="material-icons-outlined text-base text-gold">check_circle</span>
                                                <span className="text-white/50 text-xs">Gambar terpilih</span>
                                                <span className="text-gold text-xs font-medium">— Klik untuk ganti</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="w-16 h-16 bg-white/[0.04] rounded-2xl flex items-center justify-center mb-3">
                                                <span className="material-icons-outlined text-3xl text-white/20">add_photo_alternate</span>
                                            </div>
                                            <p className="text-white/50 text-sm font-medium">Klik untuk upload gambar</p>
                                            <p className="text-white/25 text-xs mt-1">Format: JPG, PNG, WebP — Maks 5MB</p>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-white/60 mb-2">Nama Produk *</label>
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                                    placeholder="Medina Silk - Sand Beige"
                                    className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder-white/20 outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all text-sm"
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-white/60 mb-2">Deskripsi Produk</label>
                                <textarea
                                    value={form.description}
                                    onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                                    rows={3}
                                    placeholder="Deskripsi singkat tentang produk ini..."
                                    className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder-white/20 outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all text-sm resize-none"
                                />
                            </div>

                            {/* Price + Stock Row */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-white/60 mb-2">Harga (Rp) *</label>
                                    <input
                                        type="number"
                                        value={form.price || ""}
                                        onChange={(e) => setForm((prev) => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
                                        placeholder="189000"
                                        className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder-white/20 outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all text-sm"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-white/60 mb-2">Stok *</label>
                                    <input
                                        type="number"
                                        value={form.stock || ""}
                                        onChange={(e) => setForm((prev) => ({ ...prev, stock: parseInt(e.target.value) || 0 }))}
                                        placeholder="50"
                                        className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder-white/20 outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all text-sm"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Category Select */}
                            <div>
                                <label className="block text-sm font-medium text-white/60 mb-2">Kategori</label>
                                <select
                                    value={form.category}
                                    onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                                    className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all text-sm appearance-none cursor-pointer"
                                >
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat} className="bg-[#1a1a1a] text-white">{cat}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Color Select — pick from global colors */}
                            <div>
                                <label className="block text-sm font-medium text-white/60 mb-2">
                                    Pilih Warna
                                </label>
                                <div className="flex flex-wrap gap-2 p-3 bg-white/[0.04] border border-white/10 rounded-xl">
                                    {colors.length === 0 ? (
                                        <p className="text-white/30 text-xs py-2">Belum ada warna. Tambahkan warna melalui menu &quot;Warna&quot;.</p>
                                    ) : (
                                        colors.map((c) => (
                                            <button
                                                key={c.name}
                                                type="button"
                                                onClick={() => handleSelectColor(c)}
                                                className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all text-sm ${form.color === c.name
                                                    ? "border-gold bg-gold/10 text-white ring-1 ring-gold/30"
                                                    : "border-white/10 text-white/60 hover:border-white/20 hover:bg-white/[0.04]"
                                                    }`}
                                            >
                                                <span className="w-5 h-5 rounded-full border border-white/20 flex-shrink-0" style={{ backgroundColor: c.hex }} />
                                                <span className="text-xs font-medium">{c.name}</span>
                                            </button>
                                        ))
                                    )}
                                </div>
                                <p className="text-white/25 text-xs mt-1.5 flex items-center gap-1">
                                    <span className="material-icons-outlined text-xs">info</span>
                                    Kelola daftar warna melalui tombol &quot;Warna&quot; di halaman utama
                                </p>
                            </div>

                            {/* Details */}
                            <div>
                                <label className="block text-sm font-medium text-white/60 mb-2">
                                    Detail Produk
                                    <span className="text-white/30 text-xs font-normal ml-2">(gunakan baris baru untuk pemisahan)</span>
                                </label>
                                <textarea
                                    value={form.details}
                                    onChange={(e) => setForm((prev) => ({ ...prev, details: e.target.value }))}
                                    rows={5}
                                    placeholder={"Material: 100% Turkish Silk\nUkuran: S, M, L, XL\nFinishing: Hand-rolled hem"}
                                    className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder-white/20 outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all text-sm resize-none font-mono"
                                />
                            </div>

                            {/* Shipping & Returns */}
                            <div>
                                <label className="block text-sm font-medium text-white/60 mb-2">
                                    Pengiriman & Pengembalian
                                    <span className="text-white/30 text-xs font-normal ml-2">(gunakan baris baru untuk pemisahan)</span>
                                </label>
                                <textarea
                                    value={form.shippingInfo}
                                    onChange={(e) => setForm((prev) => ({ ...prev, shippingInfo: e.target.value }))}
                                    rows={4}
                                    placeholder={"Pengiriman gratis di atas Rp 500.000\nProses 1-2 hari kerja\nGaransi pengembalian 7 hari"}
                                    className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder-white/20 outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all text-sm resize-none font-mono"
                                />
                            </div>

                            {/* Submit */}
                            <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                                <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }} className="flex-1 py-3 rounded-xl border border-white/10 text-white/50 hover:bg-white/5 transition-all text-sm font-medium">
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={uploading}
                                    className={`flex-1 bg-gold hover:bg-gold-dark text-white py-3 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-gold/20 flex items-center justify-center gap-2 ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}
                                >
                                    {uploading ? (
                                        <>
                                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Menunggu Upload...
                                        </>
                                    ) : (
                                        <>
                                            <span className="material-icons-outlined text-lg">{editingId ? "save" : "add"}</span>
                                            {editingId ? "Simpan Perubahan" : "Tambah Produk"}
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl w-full max-w-sm p-6 shadow-2xl text-center">
                        <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <span className="material-icons-outlined text-3xl text-red-400">delete_forever</span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Hapus Produk?</h3>
                        <p className="text-white/40 text-sm mb-6">Tindakan ini tidak dapat dibatalkan. Produk akan dihapus secara permanen.</p>
                        <div className="flex gap-3">
                            <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-3 rounded-xl border border-white/10 text-white/50 hover:bg-white/5 transition-all text-sm font-medium">Batal</button>
                            <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-red-500/20">Hapus</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ===================== PRODUCTS TABLE ===================== */}
            <div className="bg-white/[0.03] border border-white/5 rounded-2xl overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-[80px_1fr_120px_100px_120px_100px] gap-4 px-6 py-4 border-b border-white/5 text-xs font-semibold text-white/40 uppercase tracking-wider">
                    <span>Gambar</span>
                    <span>Produk</span>
                    <span>Kategori</span>
                    <span>Harga</span>
                    <span>Stok</span>
                    <span className="text-right">Aksi</span>
                </div>

                {/* Table Body */}
                {filteredProducts.length === 0 ? (
                    <div className="p-12 text-center">
                        <span className="material-icons-outlined text-4xl text-white/10 mb-3 block">inventory_2</span>
                        <p className="text-white/30 text-sm">
                            {searchQuery ? "Tidak ada produk yang cocok" : "Belum ada produk. Tambah produk pertama Anda!"}
                        </p>
                    </div>
                ) : (
                    filteredProducts.map((product) => (
                        <div key={product.id} className="grid grid-cols-[80px_1fr_120px_100px_120px_100px] gap-4 px-6 py-4 border-b border-white/5 last:border-b-0 items-center hover:bg-white/[0.02] transition-colors">
                            {/* Image */}
                            <div className="w-14 h-14 rounded-lg overflow-hidden bg-white/[0.05] flex-shrink-0">
                                <Image src={product.image} alt={product.name} width={56} height={56} className="w-full h-full object-cover" />
                            </div>

                            {/* Name + Color */}
                            <div className="min-w-0">
                                <p className="text-sm font-medium text-white truncate">{product.name}</p>
                                <div className="flex items-center gap-1.5 mt-1">
                                    <span className="w-3 h-3 rounded-full border border-white/10" style={{ backgroundColor: product.colorHex || "#888" }} />
                                    <span className="text-white/40 text-xs">{product.color}</span>
                                </div>
                            </div>

                            {/* Category */}
                            <span className="text-white/50 text-xs px-2.5 py-1 bg-white/[0.05] rounded-full text-center truncate">{product.category}</span>

                            {/* Price */}
                            <span className="text-gold text-sm font-semibold">{formatRupiah(product.price)}</span>

                            {/* Stock */}
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                    <button onClick={() => updateProduct(product.id, { stock: Math.max(0, product.stock - 1) })} className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/[0.06] text-white/40 hover:bg-white/[0.1] hover:text-white transition-all">
                                        <span className="material-icons-outlined text-sm">remove</span>
                                    </button>
                                    <span className={`text-sm font-bold min-w-[32px] text-center ${product.stock < 10 ? "text-red-400" : "text-white"}`}>{product.stock}</span>
                                    <button onClick={() => updateProduct(product.id, { stock: product.stock + 1 })} className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/[0.06] text-white/40 hover:bg-white/[0.1] hover:text-white transition-all">
                                        <span className="material-icons-outlined text-sm">add</span>
                                    </button>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-end gap-1">
                                <button onClick={() => handleEdit(product)} className="w-8 h-8 flex items-center justify-center rounded-lg text-white/40 hover:bg-blue-500/10 hover:text-blue-400 transition-all" title="Edit">
                                    <span className="material-icons-outlined text-lg">edit</span>
                                </button>
                                <button onClick={() => setDeleteConfirm(product.id)} className="w-8 h-8 flex items-center justify-center rounded-lg text-white/40 hover:bg-red-500/10 hover:text-red-400 transition-all" title="Hapus">
                                    <span className="material-icons-outlined text-lg">delete</span>
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
