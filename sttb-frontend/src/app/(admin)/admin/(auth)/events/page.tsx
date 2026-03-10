"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Plus, Search, Edit2, Trash2, Eye, Filter, Calendar, MapPin, Tag, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";

interface Event {
    id: string;
    title: string;
    category: string;
    date: string;
    location: string;
    status: "published" | "draft";
    registrationOpen: boolean;
    imgUrl: string;
    description: string;
}

const initialEvents: Event[] = [
    { id: "1", title: "Open House STTB – Gelombang III", category: "Admisi", date: "2026-04-10", location: "Kampus STTB Bandung", status: "published", registrationOpen: true, imgUrl: "https://images.unsplash.com/photo-1626025612377-7d5d17362ff9?w=400", description: "Sesi terbuka bagi calon mahasiswa baru untuk mengenal lebih dekat kampus dan program studi STTB." },
    { id: "2", title: "Seminar Kepemimpinan Kristen", category: "Seminar", date: "2026-04-20", location: "Aula STTB", status: "published", registrationOpen: true, imgUrl: "https://images.unsplash.com/photo-1758413350815-7b06dbbfb9a7?w=400", description: "Seminar nasional tentang kepemimpinan transformatif dalam konteks pelayanan gereja." },
    { id: "3", title: "Wisuda STTB Angkatan 2025", category: "Akademik", date: "2026-05-15", location: "Graha Sanusi Hardjadinata", status: "published", registrationOpen: false, imgUrl: "https://images.unsplash.com/photo-1757143137392-0b1e1a27a7de?w=400", description: "Upacara wisuda mahasiswa program S1 dan S2 Angkatan 2025." },
    { id: "4", title: "Mission Education & Exposure (MEET)", category: "Misi", date: "2026-06-01", location: "Lokasi TBD", status: "draft", registrationOpen: false, imgUrl: "https://images.unsplash.com/photo-1764072970350-2ce4f354a483?w=400", description: "Program pembentukan misional mahasiswa selama satu bulan di lapangan misi." },
    { id: "5", title: "Konferensi Teologi Reformed", category: "Konferensi", date: "2026-07-08", location: "Bandung Convention Center", status: "draft", registrationOpen: false, imgUrl: "https://images.unsplash.com/photo-1675099124977-5aab6e554dbd?w=400", description: "Konferensi tahunan bersama gereja-gereja dan institusi Reformed se-Indonesia." },
];

const categories = ["Semua", "Admisi", "Seminar", "Akademik", "Misi", "Konferensi", "Pembinaan"];

function CreateEditModal({ event, onClose, onSave }: { event: Event | null; onClose: () => void; onSave: (e: Event) => void }) {
    const isEdit = !!event;
    const [form, setForm] = useState<Partial<Event>>(
        event ?? { title: "", category: "Admisi", date: "", location: "", status: "draft", registrationOpen: false, imgUrl: "", description: "" }
    );

    const handleSave = () => {
        if (!form.title?.trim()) { toast.error("Judul kegiatan wajib diisi"); return; }
        if (!form.date) { toast.error("Tanggal wajib diisi"); return; }
        onSave({ ...form, id: event?.id ?? String(Date.now()) } as Event);
        toast.success(isEdit ? "Kegiatan berhasil diperbarui" : "Kegiatan berhasil ditambahkan");
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto"
            >
                <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-6 py-4 rounded-t-2xl z-10">
                    <h2 className="text-gray-900 dark:text-white font-bold text-lg">
                        {isEdit ? "Edit Kegiatan" : "Tambah Kegiatan Baru"}
                    </h2>
                </div>
                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">Judul Kegiatan *</label>
                        <input className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E62129]" value={form.title ?? ""} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="Judul kegiatan" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">Kategori</label>
                            <select className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E62129]" value={form.category ?? ""} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}>
                                {categories.slice(1).map((c) => <option key={c}>{c}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">Tanggal *</label>
                            <input type="date" className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E62129]" value={form.date ?? ""} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">Lokasi</label>
                        <input className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E62129]" value={form.location ?? ""} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} placeholder="Lokasi acara" />
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">URL Gambar</label>
                        <input className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E62129]" value={form.imgUrl ?? ""} onChange={(e) => setForm((f) => ({ ...f, imgUrl: e.target.value }))} placeholder="https://..." />
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">Deskripsi</label>
                        <textarea rows={3} className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E62129] resize-none" value={form.description ?? ""} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} placeholder="Deskripsi singkat kegiatan..." />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">Status</label>
                            <select className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E62129]" value={form.status ?? "draft"} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as "published" | "draft" }))}>
                                <option value="published">Published</option>
                                <option value="draft">Draft</option>
                            </select>
                        </div>
                        <div className="flex items-end pb-1">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" checked={form.registrationOpen ?? false} onChange={(e) => setForm((f) => ({ ...f, registrationOpen: e.target.checked }))} className="w-4 h-4 rounded accent-[#E62129]" />
                                <span className="text-gray-700 dark:text-gray-300 text-sm">Pendaftaran Terbuka</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 px-6 py-4 flex gap-3 justify-end rounded-b-2xl">
                    <button onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Batal</button>
                    <button onClick={handleSave} className="px-5 py-2 rounded-lg bg-[#E62129] hover:bg-[#c4131a] text-white text-sm font-medium transition-colors">
                        {isEdit ? "Simpan Perubahan" : "Tambah Kegiatan"}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

export default function AdminKegiatanPage() {
    const [events, setEvents] = useState(initialEvents);
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("Semua");
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<Event | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    const filtered = events.filter((e) => {
        const matchSearch = search === "" || e.title.toLowerCase().includes(search.toLowerCase());
        const matchCat = activeCategory === "Semua" || e.category === activeCategory;
        return matchSearch && matchCat;
    });

    const handleSave = (ev: Event) => {
        setEvents((prev) => {
            const idx = prev.findIndex((e) => e.id === ev.id);
            if (idx >= 0) { const next = [...prev]; next[idx] = ev; return next; }
            return [ev, ...prev];
        });
    };

    const handleDelete = (id: string) => {
        setEvents((prev) => prev.filter((e) => e.id !== id));
        setDeleteConfirm(null);
        toast.success("Kegiatan berhasil dihapus");
    };

    const handleToggleStatus = (id: string) => {
        setEvents((prev) => prev.map((e) => e.id === id ? { ...e, status: e.status === "published" ? "draft" : "published" } : e));
        const ev = events.find((e) => e.id === id);
        toast.success(ev?.status === "published" ? "Kegiatan dijadikan draft" : "Kegiatan diterbitkan");
    };

    return (
        <div className="space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                    <h1 className="text-gray-900 dark:text-white font-bold text-2xl">Kegiatan</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">Kelola event dan kegiatan kampus STTB</p>
                </div>
                <div className="flex items-center gap-2">
                    <Link
                        href="/admin/events/create"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#E62129] hover:bg-[#c4131a] text-white text-sm font-medium transition-colors"
                    >
                        <Plus className="w-4 h-4" /> Tambah Kegiatan Baru
                    </Link>
                    <button
                        onClick={() => { setEditing(null); setShowModal(true); }}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#E62129] text-[#E62129] text-sm font-medium hover:bg-red-50 transition-colors"
                    >
                        <Plus className="w-4 h-4" /> Quick Add
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4">
                <div className="flex flex-wrap gap-3">
                    <div className="relative flex-1 min-w-56">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari kegiatan..." className="w-full pl-9 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E62129]" />
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                        <Filter className="w-4 h-4 text-gray-400" />
                        {categories.map((c) => (
                            <button key={c} onClick={() => setActiveCategory(c)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${activeCategory === c ? "bg-[#E62129] text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"}`}>{c}</button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-100 dark:border-gray-800">
                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Kegiatan</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">Tanggal</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell">Lokasi</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">Kategori</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((ev) => (
                                <tr key={ev.id} className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-800">
                                                <Image
                                                    src={ev.imgUrl}
                                                    alt=""
                                                    width={0}
                                                    sizes="w-full h-full"
                                                    height={0}
                                                    preload
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                                            </div>
                                            <div>
                                                <p className="text-gray-900 dark:text-white font-medium text-sm line-clamp-1">{ev.title}</p>
                                                <p className="text-gray-400 text-xs line-clamp-1 hidden sm:block">{ev.description}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 hidden md:table-cell">
                                        <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400 text-sm">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {new Date(ev.date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 hidden lg:table-cell">
                                        <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400 text-sm">
                                            <MapPin className="w-3.5 h-3.5" /> {ev.location}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 hidden sm:table-cell">
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                                            <Tag className="w-3 h-3" /> {ev.category}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <button onClick={() => handleToggleStatus(ev.id)} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium transition-colors ${ev.status === "published" ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100" : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200"}`}>
                                            {ev.status === "published" ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                                            {ev.status === "published" ? "Terbit" : "Draft"}
                                        </button>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-end gap-1">
                                            <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-[#0570CD] transition-colors"><Eye className="w-4 h-4" /></button>
                                            <Link href={`/admin/events/${ev.id}/edit`} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-[#0A2C74] transition-colors inline-flex"><Edit2 className="w-4 h-4" /></Link>
                                            <button onClick={() => setDeleteConfirm(ev.id)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-[#E62129] transition-colors"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filtered.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-4 py-12 text-center text-gray-400 dark:text-gray-500 text-sm">
                                        Tidak ada kegiatan yang ditemukan
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Delete confirm */}
            <AnimatePresence>
                {deleteConfirm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)} />
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative bg-white dark:bg-gray-900 rounded-xl p-6 shadow-2xl max-w-sm w-full">
                            <h3 className="text-gray-900 dark:text-white font-bold mb-2">Hapus Kegiatan?</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-5">Tindakan ini tidak dapat dibatalkan.</p>
                            <div className="flex gap-3 justify-end">
                                <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm">Batal</button>
                                <button onClick={() => handleDelete(deleteConfirm)} className="px-4 py-2 rounded-lg bg-[#E62129] hover:bg-[#c4131a] text-white text-sm font-medium">Hapus</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Modal */}
            <AnimatePresence>
                {showModal && <CreateEditModal event={editing} onClose={() => setShowModal(false)} onSave={handleSave} />}
            </AnimatePresence>
        </div>
    );
}