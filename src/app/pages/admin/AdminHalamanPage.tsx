import React, { useState } from "react";
import { Plus, Search, Edit2, Trash2, Eye, Globe, Clock, Link as LinkIcon, ChevronRight, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";

interface Page {
  id: string;
  title: string;
  slug: string;
  section: string;
  status: "published" | "draft";
  updatedAt: string;
}

const initialPages: Page[] = [
  { id: "1", title: "Beranda", slug: "/", section: "Publik", status: "published", updatedAt: "2026-03-08" },
  { id: "2", title: "Visi & Misi", slug: "/visi-misi", section: "Tentang", status: "published", updatedAt: "2026-03-05" },
  { id: "3", title: "Sejarah STTB", slug: "/sejarah", section: "Tentang", status: "published", updatedAt: "2026-03-01" },
  { id: "4", title: "Pengakuan Iman", slug: "/pengakuan-iman", section: "Tentang", status: "published", updatedAt: "2026-02-28" },
  { id: "5", title: "Pengurus Yayasan", slug: "/pengurus-yayasan", section: "Tentang", status: "published", updatedAt: "2026-02-20" },
  { id: "6", title: "Mars STTB", slug: "/mars-sttb", section: "Tentang", status: "published", updatedAt: "2026-02-15" },
  { id: "7", title: "Sarjana Teologi", slug: "/sarjana-teologi", section: "Program Studi", status: "published", updatedAt: "2026-02-10" },
  { id: "8", title: "Sarjana Pendidikan Kristen", slug: "/sarjana-pendidikan-kristen", section: "Program Studi", status: "published", updatedAt: "2026-02-10" },
  { id: "9", title: "Jadwal Admisi", slug: "/jadwal-admisi", section: "Admisi", status: "published", updatedAt: "2026-03-07" },
  { id: "10", title: "Info Persyaratan", slug: "/informasi-persyaratan", section: "Admisi", status: "published", updatedAt: "2026-03-07" },
  { id: "11", title: "Beasiswa", slug: "/beasiswa", section: "Admisi", status: "published", updatedAt: "2026-03-06" },
  { id: "12", title: "FAQ Admisi", slug: "/faq", section: "Admisi", status: "published", updatedAt: "2026-03-05" },
  { id: "13", title: "Pembinaan Mahasiswa", slug: "/pembinaan", section: "Kehidupan Kampus", status: "published", updatedAt: "2026-03-04" },
  { id: "14", title: "Senat Mahasiswa", slug: "/senat", section: "Kehidupan Kampus", status: "published", updatedAt: "2026-03-03" },
  { id: "15", title: "Fasilitas", slug: "/fasilitas", section: "Kehidupan Kampus", status: "draft", updatedAt: "2026-03-02" },
  { id: "16", title: "Biaya Studi", slug: "/biaya-studi", section: "Keuangan", status: "published", updatedAt: "2026-03-01" },
  { id: "17", title: "Kontak Kami", slug: "/kontak-kami", section: "Publik", status: "published", updatedAt: "2026-02-28" },
];

const sections = ["Semua", "Publik", "Tentang", "Program Studi", "Admisi", "Kehidupan Kampus", "Keuangan"];

const sectionColors: Record<string, string> = {
  "Publik": "#0570CD",
  "Tentang": "#0A2C74",
  "Program Studi": "#E62129",
  "Admisi": "#059669",
  "Kehidupan Kampus": "#7C3AED",
  "Keuangan": "#D97706",
};

function EditPageModal({ page, onClose, onSave }: { page: Page; onClose: () => void; onSave: (p: Page) => void }) {
  const [form, setForm] = useState({ ...page });
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="border-b border-gray-100 dark:border-gray-800 px-6 py-4">
          <h2 className="text-gray-900 dark:text-white font-bold">Edit Halaman: {page.title}</h2>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">Judul Halaman</label>
            <input className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E62129]" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">URL Slug</label>
            <input className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E62129] font-mono" value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">Seksi</label>
              <select className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E62129]" value={form.section} onChange={(e) => setForm((f) => ({ ...f, section: e.target.value }))}>
                {sections.slice(1).map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">Status</label>
              <select className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E62129]" value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as "published" | "draft" }))}>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
            <p className="text-amber-700 dark:text-amber-400 text-xs">Konten halaman dikelola langsung melalui kode aplikasi. Gunakan panel ini hanya untuk mengubah metadata halaman.</p>
          </div>
        </div>
        <div className="border-t border-gray-100 dark:border-gray-800 px-6 py-4 flex gap-3 justify-end">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm">Batal</button>
          <button onClick={() => { onSave({ ...form, updatedAt: new Date().toISOString().split("T")[0] }); onClose(); toast.success("Halaman berhasil diperbarui"); }} className="px-5 py-2 rounded-lg bg-[#E62129] hover:bg-[#c4131a] text-white text-sm font-medium">Simpan</button>
        </div>
      </motion.div>
    </div>
  );
}

export function AdminHalamanPage() {
  const [pages, setPages] = useState(initialPages);
  const [search, setSearch] = useState("");
  const [activeSection, setActiveSection] = useState("Semua");
  const [editing, setEditing] = useState<Page | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const filtered = pages.filter((p) => {
    const matchSearch = search === "" || p.title.toLowerCase().includes(search.toLowerCase()) || p.slug.toLowerCase().includes(search.toLowerCase());
    const matchSection = activeSection === "Semua" || p.section === activeSection;
    return matchSearch && matchSection;
  });

  // Group by section
  const grouped = filtered.reduce<Record<string, Page[]>>((acc, p) => {
    if (!acc[p.section]) acc[p.section] = [];
    acc[p.section].push(p);
    return acc;
  }, {});

  const handleSave = (p: Page) => setPages((prev) => prev.map((pg) => pg.id === p.id ? p : pg));
  const handleDelete = (id: string) => { setPages((prev) => prev.filter((p) => p.id !== id)); setDeleteConfirm(null); toast.success("Halaman berhasil dihapus"); };
  const handleToggle = (id: string) => {
    setPages((prev) => prev.map((p) => p.id === id ? { ...p, status: p.status === "published" ? "draft" : "published" } : p));
    const pg = pages.find((p) => p.id === id);
    toast.success(pg?.status === "published" ? "Halaman dijadikan draft" : "Halaman diterbitkan");
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-gray-900 dark:text-white font-bold text-2xl">Halaman</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">{pages.length} halaman terdaftar di website STTB</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#E62129] hover:bg-[#c4131a] text-white text-sm font-medium transition-colors" onClick={() => toast.info("Tambah halaman baru memerlukan akses kode sumber.")}>
          <Plus className="w-4 h-4" /> Halaman Baru
        </button>
      </div>

      {/* Filter */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari halaman..." className="w-full pl-9 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E62129]" />
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {sections.map((s) => (
              <button key={s} onClick={() => setActiveSection(s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${activeSection === s ? "bg-[#E62129] text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"}`}>{s}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Grouped pages */}
      {Object.entries(grouped).map(([section, sectionPages]) => (
        <div key={section} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
            <div className="w-2 h-4 rounded-full" style={{ backgroundColor: sectionColors[section] ?? "#666" }} />
            <span className="text-gray-900 dark:text-white font-semibold text-sm">{section}</span>
            <span className="text-gray-400 text-xs">({sectionPages.length})</span>
          </div>
          <div className="divide-y divide-gray-50 dark:divide-gray-800/50">
            {sectionPages.map((p) => (
              <div key={p.id} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors group">
                <Globe className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 dark:text-white font-medium text-sm">{p.title}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <LinkIcon className="w-3 h-3 text-gray-400" />
                    <span className="text-gray-400 text-xs font-mono">{p.slug}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="hidden lg:flex items-center gap-1 text-gray-400 text-xs">
                    <Clock className="w-3 h-3" />
                    {new Date(p.updatedAt).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}
                  </span>
                  <button onClick={() => handleToggle(p.id)} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium transition-colors ${p.status === "published" ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400" : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"}`}>
                    {p.status === "published" ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                    {p.status === "published" ? "Terbit" : "Draft"}
                  </button>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => setEditing(p)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-[#0A2C74] transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                    <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-[#0570CD] transition-colors"><Eye className="w-3.5 h-3.5" /></button>
                    <button onClick={() => setDeleteConfirm(p.id)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-[#E62129] transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-600" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <AnimatePresence>
        {editing && <EditPageModal page={editing} onClose={() => setEditing(null)} onSave={handleSave} />}
        {deleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative bg-white dark:bg-gray-900 rounded-xl p-6 shadow-2xl max-w-sm w-full">
              <h3 className="text-gray-900 dark:text-white font-bold mb-2">Hapus Halaman?</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-5">Halaman yang dihapus tidak dapat dikembalikan.</p>
              <div className="flex gap-3 justify-end">
                <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm">Batal</button>
                <button onClick={() => handleDelete(deleteConfirm!)} className="px-4 py-2 rounded-lg bg-[#E62129] hover:bg-[#c4131a] text-white text-sm font-medium">Hapus</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
