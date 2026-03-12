"use client";

import { useState } from "react";
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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import { useAdminNewsList, useDeleteNews } from "@/hooks/useAdminNews";
import { useNewsCategories } from "@/hooks/useNews";
import { getImageUrl } from "@/lib/api";

export default function AdminNewsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  const { data: categoriesData = [] } = useNewsCategories();
  const categories = ["Semua", ...categoriesData.map((c) => c.name)];

  const { data, isLoading } = useAdminNewsList({
    page,
    pageSize: PAGE_SIZE,
    category: activeCategory !== "Semua" ? activeCategory : undefined,
    search: search || undefined,
  });

  const totalPages = data ? Math.ceil(data.totalCount / PAGE_SIZE) : 1;

  const deleteNews = useDeleteNews();
  const articles = data?.items ?? [];

  const handleDelete = (id: string) => {
    deleteNews.mutate(id, {
      onSuccess: () => {
        toast.success("Berita berhasil dihapus");
        setDeleteConfirm(null);
      },
      onError: () => {
        toast.error("Gagal menghapus berita");
        setDeleteConfirm(null);
      },
    });
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-gray-900 dark:text-white"
            style={{ fontSize: "1.4rem", fontWeight: 700 }}
          >
            Manajemen Berita
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {isLoading
              ? "Memuat..."
              : `${data?.totalCount ?? 0} artikel terdaftar`}
          </p>
        </div>
        <Link
          href="/admin/news/create"
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#E62129] hover:bg-[#c4131a] text-white text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" /> Tambah Berita Baru
        </Link>
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
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:border-[#E62129] transition-all"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setPage(1);
                }}
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
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 hidden sm:block" />
                        <div className="space-y-1.5">
                          <div className="h-3.5 w-48 bg-gray-100 dark:bg-gray-800 rounded" />
                          <div className="h-3 w-24 bg-gray-100 dark:bg-gray-800 rounded" />
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 hidden md:table-cell">
                      <div className="h-3 w-20 bg-gray-100 dark:bg-gray-800 rounded" />
                    </td>
                    <td className="py-3.5 px-4 hidden sm:table-cell">
                      <div className="h-3 w-24 bg-gray-100 dark:bg-gray-800 rounded" />
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="h-5 w-16 bg-gray-100 dark:bg-gray-800 rounded-full" />
                    </td>
                    <td className="py-3.5 px-4" />
                  </tr>
                ))
              ) : articles.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-400">
                    <Search className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p>Tidak ada berita ditemukan</p>
                  </td>
                </tr>
              ) : (
                articles.map((article) => {
                  const imgSrc = getImageUrl(article.thumbnailUrl);
                  const dateStr = article.publishedAt ?? article.createdAt;
                  return (
                    <tr
                      key={article.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          {imgSrc ? (
                            <Image
                              src={imgSrc}
                              alt={article.title}
                              width={48}
                              height={40}
                              className="w-12 h-10 object-cover rounded-lg flex-shrink-0 hidden sm:block"
                            />
                          ) : (
                            <div className="w-12 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex-shrink-0 hidden sm:block" />
                          )}
                          <div>
                            <p className="text-gray-900 dark:text-white text-sm font-medium line-clamp-1">
                              {article.title}
                            </p>
                            <p className="text-gray-400 dark:text-gray-500 text-xs mt-0.5 hidden sm:block font-mono">
                              /{article.slug}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 hidden md:table-cell">
                        {article.category ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-[#0A2C74] dark:text-blue-300">
                            <Tag className="w-3 h-3" />
                            {article.category}
                          </span>
                        ) : (
                          <span className="text-gray-300 dark:text-gray-600 text-xs">
                            —
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 hidden sm:table-cell">
                        <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-xs">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(dateStr).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 flex gap-x-1">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                            article.isPublished
                              ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                              : "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400"
                          }`}
                        >
                          {article.isPublished ? (
                            <>
                              <CheckCircle className="w-3 h-3" /> Terbit
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3" /> Draft
                            </>
                          )}
                        </span>
                        {article.isFeatured && (
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/20 text-yellow-500 dark:text-yellow-400`}
                          >
                            {article.isPublished ? (
                              <>
                                <CheckCircle className="w-3 h-3" /> Terbit
                              </>
                            ) : (
                              <>
                                <XCircle className="w-3 h-3" /> Draft
                              </>
                            )}
                          </span>
                        )}
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
                            href={`/admin/news/${article.id}/edit`}
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
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-4 flex-wrap">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {isLoading
              ? "Memuat data..."
              : `Halaman ${page} dari ${totalPages} · ${data?.totalCount ?? 0} berita`}
          </p>
          {totalPages > 1 && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1 || isLoading}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(
                  (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1,
                )
                .reduce<(number | "…")[]>((acc, p, idx, arr) => {
                  if (idx > 0 && p - (arr[idx - 1] as number) > 1)
                    acc.push("…");
                  acc.push(p);
                  return acc;
                }, [])
                .map((p, i) =>
                  p === "…" ? (
                    <span
                      key={`ellipsis-${i}`}
                      className="px-2 text-xs text-gray-400"
                    >
                      …
                    </span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${page === p ? "bg-[#E62129] text-white" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                    >
                      {p}
                    </button>
                  ),
                )}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages || isLoading}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Next <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

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
              Tindakan ini tidak dapat dibatalkan. Berita akan dihapus secara
              permanen.
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
                disabled={deleteNews.isPending}
                className="flex-1 px-4 py-2 rounded-lg bg-[#E62129] hover:bg-[#c4131a] text-white text-sm font-medium transition-colors disabled:opacity-50"
              >
                {deleteNews.isPending ? "Menghapus..." : "Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
