"use client";

import React, { useState } from "react";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  Filter,
  Calendar,
  Tag,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router";
import { newsArticles as initialArticles, type NewsArticle } from "../../data/mock-data";

const categories = ["Semua", "Konferensi", "Akademik", "Beasiswa", "Kerjasama", "Seminar", "Fasilitas"];

export function AdminNewsPage() {
  const [articles, setArticles] = useState(initialArticles);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const filtered = articles.filter((a) => {
    const matchSearch =
      search === "" ||
      a.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      activeCategory === "Semua" || a.category === activeCategory;
    return matchSearch && matchCategory;
  });

  const handleDelete = (id: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
    setDeleteConfirm(null);
    toast.success("Berita berhasil dihapus");
  };

  const handleToggleStatus = (id: string) => {
    setArticles((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, status: a.status === "published" ? "draft" : "published" }
          : a
      )
    );
    const article = articles.find((a) => a.id === id);
    toast.success(
      article?.status === "published"
        ? "Berita dijadikan draft"
        : "Berita diterbitkan"
    );
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 dark:text-white" style={{ fontSize: "1.4rem", fontWeight: 700 }}>
            Manajemen Berita
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {articles.length} artikel terdaftar
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/admin/news/create"
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#E62129] hover:bg-[#c4131a] text-white text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" /> Tambah Berita Baru
          </Link>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#E62129] text-[#E62129] text-sm font-medium hover:bg-red-50 transition-colors"
          >
            <Plus className="w-4 h-4" /> Quick Add
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari judul berita..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:border-[#E62129] transition-all"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-[#E62129] text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider">
                  Berita
                </th>
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider hidden md:table-cell">
                  Kategori
                </th>
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider hidden sm:table-cell">
                  Tanggal
                </th>
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider">
                  Status
                </th>
                <th className="text-right py-3 px-4 text-gray-600 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {filtered.map((article) => (
                <tr key={article.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-12 h-10 object-cover rounded-lg flex-shrink-0 hidden sm:block"
                      />
                      <div>
                        <p className="text-gray-900 dark:text-white text-sm font-medium line-clamp-1">
                          {article.title}
                        </p>
                        <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5 hidden sm:block">
                          Oleh {article.author}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 hidden md:table-cell">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-[#0A2C74] dark:text-blue-300">
                      <Tag className="w-3 h-3" />
                      {article.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 hidden sm:table-cell">
                    <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-xs">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(article.publishedAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleToggleStatus(article.id)}
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                        article.status === "published"
                          ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 hover:bg-green-200"
                          : "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-200"
                      }`}
                    >
                      {article.status === "published" ? (
                        <><CheckCircle className="w-3 h-3" /> Terbit</>
                      ) : (
                        <><XCircle className="w-3 h-3" /> Draft</>
                      )}
                    </button>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center justify-end gap-1">
                      <a
                        href={`/berita/${article.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-gray-400 hover:text-[#0570CD] hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                        title="Preview"
                      >
                        <Eye className="w-4 h-4" />
                      </a>
                      <Link
                        to={`/admin/news/${article.id}/edit`}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-[#0A2C74] hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors inline-flex"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => setDeleteConfirm(article.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-[#E62129] hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-400">
                    <Search className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p>Tidak ada berita ditemukan</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400">
          Menampilkan {filtered.length} dari {articles.length} berita
        </div>
      </div>

      {/* Create/Edit Modal (simplified) */}
      {(showCreateModal || editingArticle) && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <h2 className="text-gray-900 dark:text-white font-bold">
                {editingArticle ? "Edit Berita" : "Tambah Berita Baru"}
              </h2>
              <button
                onClick={() => { setShowCreateModal(false); setEditingArticle(null); }}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Judul Berita
                </label>
                <input
                  type="text"
                  defaultValue={editingArticle?.title}
                  placeholder="Masukkan judul berita..."
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:border-[#E62129] transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Kategori
                  </label>
                  <select
                    defaultValue={editingArticle?.category}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:border-[#E62129] transition-all"
                  >
                    {categories.slice(1).map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Status
                  </label>
                  <select
                    defaultValue={editingArticle?.status || "draft"}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:border-[#E62129] transition-all"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Terbitkan</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Ringkasan
                </label>
                <textarea
                  defaultValue={editingArticle?.excerpt}
                  rows={3}
                  placeholder="Ringkasan singkat artikel..."
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:border-[#E62129] transition-all resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Konten (Rich Text)
                </label>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <div className="flex items-center gap-1 p-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    {["B", "I", "U", "H1", "H2", "•", "1."].map((btn) => (
                      <button
                        key={btn}
                        className="px-2 py-1 rounded text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 transition-colors"
                      >
                        {btn}
                      </button>
                    ))}
                  </div>
                  <textarea
                    defaultValue={editingArticle?.content}
                    rows={8}
                    placeholder="Tulis konten berita di sini..."
                    className="w-full px-4 py-3 bg-white dark:bg-gray-900 text-sm focus:outline-none resize-none"
                  />
                </div>
              </div>
            </div>
            <div className="p-5 border-t border-gray-100 dark:border-gray-800 flex items-center justify-end gap-3">
              <button
                onClick={() => { setShowCreateModal(false); setEditingArticle(null); }}
                className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  toast.success(editingArticle ? "Berita berhasil diperbarui" : "Berita berhasil ditambahkan");
                  setShowCreateModal(false);
                  setEditingArticle(null);
                }}
                className="px-4 py-2 rounded-lg bg-[#E62129] hover:bg-[#c4131a] text-white text-sm font-medium transition-colors"
              >
                {editingArticle ? "Simpan Perubahan" : "Tambah Berita"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6 text-[#E62129]" />
            </div>
            <h3 className="text-gray-900 dark:text-white font-bold text-center mb-2">
              Hapus Berita?
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm text-center mb-5">
              Tindakan ini tidak dapat dibatalkan. Berita akan dihapus secara permanen.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-sm hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 px-4 py-2 rounded-lg bg-[#E62129] hover:bg-[#c4131a] text-white text-sm font-medium transition-colors"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}