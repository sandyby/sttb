"use client";

import { ElementType, useState, useRef } from "react";
import Image from "next/image";
import { Upload, Search, Trash2, Copy, Grid, List, Image as ImageIcon, FileText, Film, Music, Filter, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";

type MediaType = "image" | "video" | "document" | "audio";

interface MediaItem {
    id: string;
    name: string;
    type: MediaType;
    url: string;
    size: string;
    uploadedAt: string;
    usedIn?: string;
}

const initialMedia: MediaItem[] = [
    { id: "1", name: "sttb-kampus-depan.jpg", type: "image", url: "https://images.unsplash.com/photo-1626025612377-7d5d17362ff9?w=300", size: "1.2 MB", uploadedAt: "2026-03-01", usedIn: "Beranda" },
    { id: "2", name: "chapel-ibadah.jpg", type: "image", url: "https://images.unsplash.com/photo-1758413350815-7b06dbbfb9a7?w=300", size: "980 KB", uploadedAt: "2026-02-25", usedIn: "Pembinaan" },
    { id: "3", name: "wisuda-2025.jpg", type: "image", url: "https://images.unsplash.com/photo-1757143137392-0b1e1a27a7de?w=300", size: "2.4 MB", uploadedAt: "2026-02-20" },
    { id: "4", name: "mission-trip.jpg", type: "image", url: "https://images.unsplash.com/photo-1764072970350-2ce4f354a483?w=300", size: "1.8 MB", uploadedAt: "2026-02-15", usedIn: "Kegiatan" },
    { id: "5", name: "seminar-kepemimpinan.jpg", type: "image", url: "https://images.unsplash.com/photo-1675099124977-5aab6e554dbd?w=300", size: "756 KB", uploadedAt: "2026-02-10" },
    { id: "6", name: "perpustakaan.jpg", type: "image", url: "https://images.unsplash.com/photo-1722962674485-d34e69a9a406?w=300", size: "1.1 MB", uploadedAt: "2026-02-05", usedIn: "Perpustakaan" },
    { id: "7", name: "brosur-admisi-2026.pdf", type: "document", url: "#", size: "3.2 MB", uploadedAt: "2026-01-30" },
    { id: "8", name: "video-profil-sttb.mp4", type: "video", url: "#", size: "45.6 MB", uploadedAt: "2026-01-20", usedIn: "Beranda" },
    { id: "9", name: "mars-sttb.mp3", type: "audio", url: "#", size: "4.8 MB", uploadedAt: "2026-01-10", usedIn: "Mars STTB" },
];

const typeIcons: Record<MediaType, ElementType> = {
    image: ImageIcon,
    video: Film,
    document: FileText,
    audio: Music,
};

const typeColors: Record<MediaType, string> = {
    image: "#0570CD",
    video: "#E62129",
    document: "#0A2C74",
    audio: "#059669",
};

const filterTypes = ["Semua", "image", "video", "document", "audio"];

export default function AdminMediaPage() {
    const [media, setMedia] = useState(initialMedia);
    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState("Semua");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [selected, setSelected] = useState<Set<string>>(new Set());
    const [dragOver, setDragOver] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState<string[] | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const filtered = media.filter((m) => {
        const matchSearch = search === "" || m.name.toLowerCase().includes(search.toLowerCase());
        const matchType = filterType === "Semua" || m.type === filterType;
        return matchSearch && matchType;
    });

    const handleUpload = (files: FileList | null) => {
        if (!files) return;
        const newItems: MediaItem[] = Array.from(files).map((file, i) => ({
            id: String(Date.now() + i),
            name: file.name,
            type: file.type.startsWith("image") ? "image" : file.type.startsWith("video") ? "video" : file.type.startsWith("audio") ? "audio" : "document",
            url: URL.createObjectURL(file),
            size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
            uploadedAt: new Date().toISOString().split("T")[0],
        }));
        setMedia((prev) => [...newItems, ...prev]);
        toast.success(`${files.length} file berhasil diupload`);
    };

    const handleDelete = (ids: string[]) => {
        setMedia((prev) => prev.filter((m) => !ids.includes(m.id)));
        setSelected(new Set());
        setDeleteConfirm(null);
        toast.success(`${ids.length} file berhasil dihapus`);
    };

    const handleCopyUrl = (url: string) => {
        navigator.clipboard.writeText(url).then(() => toast.success("URL berhasil disalin")).catch(() => toast.error("Gagal menyalin URL"));
    };

    const toggleSelect = (id: string) => {
        setSelected((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    const toggleSelectAll = () => {
        if (selected.size === filtered.length) setSelected(new Set());
        else setSelected(new Set(filtered.map((m) => m.id)));
    };

    return (
        <div className="space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                    <h1 className="text-gray-900 dark:text-white font-bold text-2xl">Media</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">Kelola semua aset media STTB</p>
                </div>
                <div className="flex items-center gap-2">
                    {selected.size > 0 && (
                        <button
                            onClick={() => setDeleteConfirm([...selected])}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-red-50 dark:bg-red-900/20 text-[#E62129] text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors border border-red-100 dark:border-red-900/30"
                        >
                            <Trash2 className="w-4 h-4" /> Hapus ({selected.size})
                        </button>
                    )}
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#E62129] hover:bg-[#c4131a] text-white text-sm font-medium transition-colors"
                    >
                        <Upload className="w-4 h-4" /> Upload Media
                    </button>
                    <input ref={fileInputRef} type="file" multiple accept="image/*,video/*,audio/*,.pdf,.doc,.docx" className="hidden" onChange={(e) => handleUpload(e.target.files)} />
                </div>
            </div>

            {/* Drop zone */}
            <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${dragOver ? "border-[#E62129] bg-red-50 dark:bg-red-900/10" : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"}`}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => { e.preventDefault(); setDragOver(false); handleUpload(e.dataTransfer.files); }}
                onClick={() => fileInputRef.current?.click()}
            >
                <Upload className="w-8 h-8 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Seret & lepas file di sini, atau klik untuk memilih</p>
                <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">Mendukung gambar, video, audio, dan dokumen PDF/Word</p>
            </div>

            {/* Filters & view toggle */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4">
                <div className="flex flex-wrap gap-3 items-center">
                    <div className="relative flex-1 min-w-56">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari file..." className="w-full pl-9 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E62129]" />
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Filter className="w-4 h-4 text-gray-400" />
                        {filterTypes.map((t) => (
                            <button key={t} onClick={() => setFilterType(t)} className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${filterType === t ? "bg-[#E62129] text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"}`}>{t}</button>
                        ))}
                    </div>
                    <div className="flex items-center gap-1 ml-auto">
                        <button onClick={() => setViewMode("grid")} className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white" : "text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"}`}><Grid className="w-4 h-4" /></button>
                        <button onClick={() => setViewMode("list")} className={`p-2 rounded-lg ${viewMode === "list" ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white" : "text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"}`}><List className="w-4 h-4" /></button>
                    </div>
                </div>
                {filtered.length > 0 && (
                    <div className="mt-3 flex items-center gap-2">
                        <input type="checkbox" checked={selected.size === filtered.length && filtered.length > 0} onChange={toggleSelectAll} className="w-4 h-4 rounded accent-[#E62129]" />
                        <span className="text-gray-500 dark:text-gray-400 text-xs">{selected.size > 0 ? `${selected.size} dipilih` : `${filtered.length} file`}</span>
                    </div>
                )}
            </div>

            {/* Grid */}
            {viewMode === "grid" ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {filtered.map((item) => {
                        const Icon = typeIcons[item.type];
                        const isSelected = selected.has(item.id);
                        return (
                            <motion.div
                                key={item.id}
                                layout
                                className={`bg-white dark:bg-gray-900 rounded-xl border-2 overflow-hidden hover:shadow-md transition-all cursor-pointer group ${isSelected ? "border-[#E62129]" : "border-gray-100 dark:border-gray-800"}`}
                            >
                                <div className="relative aspect-video bg-gray-100 dark:bg-gray-800 overflow-hidden" onClick={() => toggleSelect(item.id)}>
                                    {item.type === "image" ? (
                                        <Image
                                            src={item.url}
                                            alt={item.name}
                                            height={0}
                                            width={0}
                                            sizes="w-full h-full"
                                            preload
                                            className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <Icon className="w-8 h-8" style={{ color: typeColors[item.type] }} />
                                        </div>
                                    )}
                                    {isSelected && (
                                        <div className="absolute inset-0 bg-[#E62129]/20 flex items-center justify-center">
                                            <CheckCircle className="w-8 h-8 text-[#E62129]" />
                                        </div>
                                    )}
                                    <div className="absolute top-1.5 left-1.5">
                                        <input type="checkbox" checked={isSelected} onChange={() => toggleSelect(item.id)} onClick={(e) => e.stopPropagation()} className="w-3.5 h-3.5 rounded accent-[#E62129]" />
                                    </div>
                                </div>
                                <div className="p-2.5">
                                    <p className="text-gray-900 dark:text-white text-xs font-medium truncate" title={item.name}>{item.name}</p>
                                    <p className="text-gray-400 text-xs">{item.size}</p>
                                    <div className="flex items-center gap-1 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => handleCopyUrl(item.url)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-[#0570CD] transition-colors"><Copy className="w-3.5 h-3.5" /></button>
                                        <button onClick={() => setDeleteConfirm([item.id])} className="p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-[#E62129] transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            ) : (
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-100 dark:border-gray-800">
                                <th className="w-8 px-4 py-3"><input type="checkbox" checked={selected.size === filtered.length && filtered.length > 0} onChange={toggleSelectAll} className="w-4 h-4 rounded accent-[#E62129]" /></th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">File</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">Tipe</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">Ukuran</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell">Digunakan di</th>
                                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((item) => {
                                const Icon = typeIcons[item.type];
                                return (
                                    <tr key={item.id} className={`border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors ${selected.has(item.id) ? "bg-red-50/30 dark:bg-red-900/10" : ""}`}>
                                        <td className="px-4 py-3"><input type="checkbox" checked={selected.has(item.id)} onChange={() => toggleSelect(item.id)} className="w-4 h-4 rounded accent-[#E62129]" /></td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0 flex items-center justify-center">
                                                    {item.type === "image" ? <Image
                                                        src={item.url}
                                                        alt=""
                                                        width={0}
                                                        height={0}
                                                        sizes="w-full h-full"
                                                        preload
                                                        className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} /> : <Icon className="w-5 h-5" style={{ color: typeColors[item.type] }} />}
                                                </div>
                                                <span className="text-gray-900 dark:text-white text-sm font-medium truncate max-w-48">{item.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 hidden sm:table-cell">
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium capitalize" style={{ backgroundColor: `${typeColors[item.type]}15`, color: typeColors[item.type] }}>
                                                <Icon className="w-3 h-3" /> {item.type}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 hidden md:table-cell text-gray-500 dark:text-gray-400 text-sm">{item.size}</td>
                                        <td className="px-4 py-3 hidden lg:table-cell text-gray-500 dark:text-gray-400 text-sm">{item.usedIn ?? "—"}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-end gap-1">
                                                <button onClick={() => handleCopyUrl(item.url)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-[#0570CD] transition-colors"><Copy className="w-4 h-4" /></button>
                                                <button onClick={() => setDeleteConfirm([item.id])} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-[#E62129] transition-colors"><Trash2 className="w-4 h-4" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Delete confirm */}
            <AnimatePresence>
                {deleteConfirm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)} />
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative bg-white dark:bg-gray-900 rounded-xl p-6 shadow-2xl max-w-sm w-full">
                            <h3 className="text-gray-900 dark:text-white font-bold mb-2">Hapus {deleteConfirm.length} File?</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-5">File yang dihapus tidak dapat dikembalikan.</p>
                            <div className="flex gap-3 justify-end">
                                <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm">Batal</button>
                                <button onClick={() => handleDelete(deleteConfirm)} className="px-4 py-2 rounded-lg bg-[#E62129] hover:bg-[#c4131a] text-white text-sm font-medium">Hapus</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
