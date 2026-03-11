"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload, Search, Trash2, Copy, Grid, List, Newspaper, Film, Filter, CheckCircle, Loader2, RefreshCcw } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import { useMediaList, useDeleteMedia } from "@/hooks/useMedia";
import { UploadMediaDialog } from "@/components/admin/media/UploadMediaDialog";

const typeIcons: Record<string, React.ElementType> = {
    image: Newspaper,
    video: Film,
};

const typeColors: Record<string, string> = {
    image: "#0570CD",
    video: "#E62129",
};

const filterTypes = ["semua", "article", "video"];

export default function AdminMediaPage() {
    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState("semua");
    const [sortBy, setSortBy] = useState<"newest" | "oldest" | "az" | "za">("newest");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [selected, setSelected] = useState<Set<string>>(new Set());
    const [deleteConfirm, setDeleteConfirm] = useState<string[] | null>(null);
    const [isUploadOpen, setIsUploadOpen] = useState(false);

    // Fetch live API data!
    const { data: mediaResponse, isLoading, refetch, isError, isRefetching } = useMediaList({
        pageSize: 100, // Show a lot for now until pagination is built
        type: filterType.toLowerCase() !== "semua" ? filterType : undefined,
    }); const media = mediaResponse?.items ?? [];

    const { mutateAsync: deleteMedia, isPending: isDeleting } = useDeleteMedia();

    // Filter frontend search since search param isn't bound to API search yet
    const filtered = media.filter(
        (m) => search === "" || m.title.toLowerCase().includes(search.toLowerCase())
    );

    // Sort frontend array
    filtered.sort((a, b) => {
        if (sortBy === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        if (sortBy === "oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        if (sortBy === "az") return a.title.localeCompare(b.title);
        if (sortBy === "za") return b.title.localeCompare(a.title);
        return 0;
    });

    const handleDelete = async (ids: string[]) => {
        try {
            // Delete sequentially or via Promise.all (API endpoint takes 1 ID at a time)
            await Promise.all(ids.map((id) => deleteMedia(id)));
            setSelected(new Set());
            setDeleteConfirm(null);
            toast.success(`${ids.length} file berhasil dihapus`);
        } catch (error) {
            toast.error("Gagal menghapus beberapa file");
        }
    };

    const handleCopyUrl = (url: string) => {
        navigator.clipboard.writeText(url)
            .then(() => toast.success("URL berhasil disalin"))
            .catch(() => toast.error("Gagal menyalin URL"));
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
            <UploadMediaDialog isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />

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
                        onClick={() => setIsUploadOpen(true)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#E62129] hover:bg-[#c4131a] text-white text-sm font-medium transition-colors shadow-sm"
                    >
                        <Upload className="w-4 h-4" /> Upload Media
                    </button>
                </div>
            </div>

            {/* Filters & view toggle */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4 shadow-sm">
                <div className="flex flex-wrap gap-3 items-center">
                    <div className="relative flex-1 min-w-56">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari file..." className="w-full pl-9 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0A2C74]" />
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Filter className="w-4 h-4 text-gray-400" />
                        {filterTypes.map((t) => (
                            <button key={t} onClick={() => setFilterType(t)} className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${filterType === t ? "bg-[#0A2C74] text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"}`}>
                                {t}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-1.5 ml-auto">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as any)}
                            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#0A2C74]"
                        >
                            <option value="newest">Terbaru</option>
                            <option value="oldest">Terlama</option>
                            <option value="az">A-Z</option>
                            <option value="za">Z-A</option>
                        </select>
                        <div className="h-5 w-px bg-gray-200 dark:bg-gray-700 mx-1 border-none visible"></div>
                        <div className="flex items-center gap-1">
                            <button onClick={() => setViewMode("grid")} className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white" : "text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"}`}><Grid className="w-4 h-4" /></button>
                            <button onClick={() => setViewMode("grid")} className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white" : "text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"}`}><Grid className="w-4 h-4" /></button>
                            <button onClick={() => setViewMode("list")} className={`p-2 rounded-lg transition-colors ${viewMode === "list" ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white" : "text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"}`}><List className="w-4 h-4" /></button>
                        </div>
                    </div>
                </div>
                {filtered.length > 0 && (
                    <div className="mt-3 flex items-center gap-2">
                        <input type="checkbox" checked={selected.size === filtered.length && filtered.length > 0} onChange={toggleSelectAll} className="w-4 h-4 rounded accent-[#0A2C74]" />
                        <span className="text-gray-500 dark:text-gray-400 text-xs">{selected.size > 0 ? `${selected.size} dipilih` : `${filtered.length} file`}</span>
                    </div>
                )}
            </div>

            {/* Grid / Loader */}
            {(isLoading || isRefetching) ? (
                <div className="min-h-64 flex flex-col items-center justify-center gap-3">
                    <Loader2 className="w-8 h-8 text-[#0A2C74] animate-spin" />
                    <span className="text-gray-500 font-medium text-sm">Memuat aset media...</span>
                </div>
            ) : isError ? (
                <div className="min-h-64 flex flex-col items-center justify-center gap-3 bg-white dark:bg-gray-900 rounded-xl border border-dashed border-gray-200 dark:border-gray-800">
                    <Newspaper className="w-12 h-12 text-gray-300 dark:text-gray-600" />
                    <span className="text-gray-500 font-medium text-sm">Gagal memuat media</span>
                    <button
                        onClick={() => refetch()}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#E62129] hover:bg-[#c4131a] text-white text-sm font-medium transition-colors shadow-sm"
                    >
                        <RefreshCcw className="w-4 h-4" /> Refresh
                    </button>
                </div>
            ) : filtered.length === 0 ? (
                <div className="min-h-64 flex flex-col items-center justify-center gap-3 bg-white dark:bg-gray-900 rounded-xl border border-dashed border-gray-200 dark:border-gray-800">
                    <Newspaper className="w-12 h-12 text-gray-300 dark:text-gray-600" />
                    <span className="text-gray-500 font-medium text-sm">Belum ada media ditemukan</span>
                    <button
                        onClick={() => setIsUploadOpen(true)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#E62129] hover:bg-[#c4131a] text-white text-sm font-medium transition-colors shadow-sm"
                    >
                        <Upload className="w-4 h-4" /> Upload Media
                    </button>
                </div>
            ) : viewMode === "grid" ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {filtered.map((item) => {
                        const Icon = typeIcons[item.type] || Newspaper;
                        const isSelected = selected.has(item.id);
                        return (
                            <motion.div
                                key={item.id}
                                layout
                                className={`bg-white dark:bg-gray-900 rounded-xl border-2 overflow-hidden shadow-sm hover:shadow-md transition-all group ${isSelected ? "border-primary" : "border-gray-100 dark:border-gray-800"}`}
                            >
                                <div className="relative aspect-video cursor-pointer bg-gray-100 dark:bg-gray-800/50 overflow-hidden" onClick={() => toggleSelect(item.id)}>
                                    {item.type && <span className={`shadow-lg absolute top-2 right-2 capitalize font-semibold text-[10px] px-2 py-1 rounded-full line-clamp-1 max-w-25 text-white truncate ${`${item.type === "video" ? "bg-primary text-white" : "bg-secondary text-white"} : "bg-accent"`} `}>
                                        {item.type}
                                    </span>}
                                    {(item.thumbnailUrl) ? (
                                        <Image
                                            src={item.thumbnailUrl ? (item.thumbnailUrl.startsWith("http") ? item.thumbnailUrl : `http://localhost:5001${item.thumbnailUrl}`) : (item.url.startsWith("http") ? item.url : `http://localhost:5001${item.url}`)}
                                            alt={item.title}
                                            height={0}
                                            width={0}
                                            sizes="w-full h-full"
                                            className="w-full h-full object-cover select-none" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <Icon className="w-8 h-8" style={{ color: typeColors[item.type] || "#0A2C74" }} />
                                        </div>
                                    )}
                                    {isSelected && (
                                        <div className="absolute inset-0 bg-primary/20 flex items-center justify-center backdrop-blur-[0.5px]">
                                            <CheckCircle className="w-8 h-8 text-primary bg-white rounded-full shadow-sm" />
                                        </div>
                                    )}
                                    <div className="absolute top-2 left-2">
                                        <input type="checkbox" checked={isSelected} onChange={() => toggleSelect(item.id)} onClick={(e) => e.stopPropagation()} className="w-4 h-4 rounded accent-primary " />
                                    </div>
                                </div>
                                <div className="p-3">
                                    <p className="text-gray-900 dark:text-white text-xs font-semibold truncate" title={item.title}>{item.title}</p>
                                    <div className="flex items-center justify-between mt-0.5">
                                        <p className="text-gray-400 text-[10px]">{new Date(item.createdAt).toLocaleDateString("id-ID")}</p>
                                        {item.tag && <span className="text-[10px] text-[#0A2C74] bg-[#0A2C74]/10 dark:text-blue-300 dark:bg-blue-900/30 px-1.5 py-0.5 rounded-sm line-clamp-1 max-w-25 truncate"
                                            title={item.tag}
                                        >
                                            #{item.tag}
                                        </span>}
                                    </div>
                                    <div className="flex w-fit items-center gap-1.5 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => handleCopyUrl(item.url.startsWith("http") ? item.url : `${process.env.NEXT_PUBLIC_API_BASE_URL}${item.url}`)} className="p-1.5 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-md text-gray-500 hover:text-[#0570CD] transition-colors" title="Copy URL">
                                            <Copy className="w-3.5 h-3.5" />
                                        </button>
                                        <button onClick={() => setDeleteConfirm([item.id])} className="p-1.5 bg-red-50 hover:bg-red-100 dark:bg-red-900/10 dark:hover:bg-red-900/30 rounded-md text-red-500 transition-colors" title="Hapus">
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            ) : (
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20">
                                <th className="w-12 px-4 py-3"><input type="checkbox" checked={selected.size === filtered.length && filtered.length > 0} onChange={toggleSelectAll} className="w-4 h-4 rounded accent-[#0A2C74]" /></th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">File</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">Tipe</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell">Kategori/Tag</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">Tanggal</th>
                                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((item) => {
                                const Icon = typeIcons[item.type] || Newspaper;
                                return (
                                    <tr key={item.id} className={`border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors ${selected.has(item.id) ? "bg-blue-50/30 dark:bg-blue-900/10" : ""}`}>
                                        <td className="px-4 py-3"><input type="checkbox" checked={selected.has(item.id)} onChange={() => toggleSelect(item.id)} className="w-4 h-4 rounded accent-[#0A2C74]" /></td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0 flex items-center justify-center border border-gray-200 dark:border-gray-700">
                                                    {(item.thumbnailUrl || item.type === "video" || item.type === "article") ? <Image
                                                        src={item.thumbnailUrl ? (item.thumbnailUrl.startsWith("http") ? item.thumbnailUrl : `http://localhost:5001${item.thumbnailUrl}`) : (item.url.startsWith("http") ? item.url : `http://localhost:5001${item.url}`)}
                                                        alt="" width={0} height={0} sizes="w-full h-full"
                                                        className="w-full h-full object-cover select-none" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} /> : <Icon className="w-5 h-5" style={{ color: typeColors[item.type] || "#0A2C74" }} />}
                                                </div>
                                                <span className="text-gray-900 dark:text-white text-sm font-medium truncate max-w-48">{item.title}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 hidden sm:table-cell">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium capitalize border" style={{ backgroundColor: `${typeColors[item.type]}10`, color: typeColors[item.type], borderColor: `${typeColors[item.type]}30` }}>
                                                <Icon className="w-3 h-3" /> {item.type}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 hidden lg:table-cell text-gray-500 dark:text-gray-400 text-xs">
                                            {item.category && <span className="block">{item.category}</span>}
                                            {item.tag && <span className="block text-gray-400">#{item.tag}</span>}
                                            {!item.category && !item.tag && "—"}
                                        </td>
                                        <td className="px-4 py-3 hidden md:table-cell text-gray-500 dark:text-gray-400 text-sm">
                                            {new Date(item.createdAt).toLocaleDateString("id-ID")}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <button onClick={() => handleCopyUrl(item.url.startsWith("http") ? item.url : `${process.env.NEXT_PUBLIC_API_BASE_URL}${item.url}`)} className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-500 hover:text-[#0570CD] transition-colors"><Copy className="w-4 h-4" /></button>
                                                <button onClick={() => setDeleteConfirm([item.id])} className="p-1.5 rounded-lg border border-red-100 dark:border-red-900/30 hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-[#E62129] transition-colors"><Trash2 className="w-4 h-4" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Delete confirm Dialog */}
            <AnimatePresence>
                {deleteConfirm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={isDeleting ? undefined : () => setDeleteConfirm(null)} />
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-2xl max-w-sm w-full border border-gray-100 dark:border-gray-800">
                            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
                                <Trash2 className="w-6 h-6 text-[#E62129]" />
                            </div>
                            <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-2">Hapus {deleteConfirm.length} File?</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">File akan dihapus secara permanen dari server dan tidak dapat dikembalikan. Apakah Anda yakin?</p>
                            <div className="flex gap-3 justify-end">
                                <button onClick={() => setDeleteConfirm(null)} disabled={isDeleting} className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 transition-colors">Batal</button>
                                <button onClick={() => handleDelete(deleteConfirm)} disabled={isDeleting} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#E62129] hover:bg-[#c4131a] text-white text-sm font-medium disabled:opacity-70 transition-colors">
                                    {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Ya, Hapus"}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
