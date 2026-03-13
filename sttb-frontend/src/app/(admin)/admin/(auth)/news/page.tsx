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
  Star,
  Inbox,
  Newspaper,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import { useAdminNewsList, useDeleteNews } from "@/hooks/useAdminNews";
import { useNewsCategories } from "@/hooks/useNews";
import { getImageUrl } from "@/libs/api";
import { DeleteConfirmModal } from "@/components/admin/shared/DeleteConfirmModal";
import { AdminEmptyState } from "@/components/admin/shared/AdminEmptyState";
import AdminPagination from "@/components/admin/shared/AdminPagination";

export default function AdminNewsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "a-z" | "z-a">(
    "newest",
  );
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

  const handleDelete = async () => {
    if (!deleteId && selectedIds.length === 0) return;

    if (deleteId === "bulk") {
      try {
        await Promise.all(selectedIds.map((id) => deleteNews.mutateAsync(id)));
        setSelectedIds([]);
        toast.success(`${selectedIds.length} berita berhasil dihapus`);
      } catch {
        toast.error("Beberapa berita gagal dihapus");
      } finally {
        setDeleteId(null);
      }
    } else if (deleteId) {
      deleteNews.mutate(deleteId, {
        onSuccess: () => {
          toast.success("Berita berhasil dihapus");
          setDeleteId(null);
        },
        onError: () => {
          toast.error("Gagal menghapus berita");
          setDeleteId(null);
        },
      });
    }
  };

  const sortedArticles = [...(data?.items ?? [])].sort((a, b) => {
    const dateA = new Date(a.publishedAt ?? a.createdAt).getTime();
    const dateB = new Date(b.publishedAt ?? b.createdAt).getTime();
    if (sortBy === "newest") return dateB - dateA;
    if (sortBy === "oldest") return dateA - dateB;
    if (sortBy === "a-z") return a.title.localeCompare(b.title);
    if (sortBy === "z-a") return b.title.localeCompare(a.title);
    return 0;
  });

  const articles = sortedArticles;

  const toggleSelectAll = () => {
    if (selectedIds.length === articles.length) setSelectedIds([]);
    else setSelectedIds(articles.map((a) => a.id));
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
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
            <Filter className="w-4 h-4 text-gray-400 shrink-0" />
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

      {/* Top Pagination & Bulk Actions */}
      <div className="flex items-center justify-between gap-3 flex-wrap bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-3">
        <div className="flex items-center gap-2">
          {selectedIds.length > 0 && (
            <button
              onClick={() => setDeleteId("bulk")}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-900/20 text-[#E62129] text-xs font-semibold hover:bg-red-100 transition-colors border border-red-100 dark:border-red-800"
            >
              <Trash2 className="w-3.5 h-3.5" /> Hapus Terpilih (
              {selectedIds.length})
            </button>
          )}
          <div className="flex items-center gap-1.5 ml-1">
            <span className="text-xs text-gray-400">Urutkan:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-xs font-semibold text-gray-700 dark:text-gray-300 focus:outline-none cursor-pointer"
            >
              <option value="newest">Terbaru</option>
              <option value="oldest">Terlama</option>
              <option value="a-z">A-Z</option>
              <option value="z-a">Z-A</option>
            </select>
          </div>
        </div>

        {totalPages > 1 && (
          <div className="flex-1 min-w-[300px]">
            <AdminPagination
              currentPage={page}
              totalPages={totalPages}
              totalItems={data?.totalCount ?? 0}
              onPageChange={setPage}
              pageSize={PAGE_SIZE}
            />
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <th className="py-3 px-4 w-10">
                  <input
                    type="checkbox"
                    checked={
                      selectedIds.length === articles.length &&
                      articles.length > 0
                    }
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300 dark:border-gray-700 text-[#E62129] focus:ring-[#E62129] w-4 h-4 cursor-pointer translate-y-px"
                  />
                </th>
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
                  <td colSpan={6} className="py-0">
                    <AdminEmptyState
                      icon={Newspaper}
                      title="Tidak ada berita ditemukan"
                      description="Belum ada data berita yang sesuai dengan filter saat ini. Coba ubah kata kunci atau kategori."
                      actionLabel="Tambah Berita Baru"
                      actionHref="/admin/news/create"
                      className="border-none rounded-none shadow-none"
                    />
                  </td>
                </tr>
              ) : (
                articles.map((article) => {
                  const imgSrc = getImageUrl(article.thumbnailUrl);
                  const dateStr = article.publishedAt ?? article.createdAt;
                  return (
                    <tr
                      key={article.id}
                      className={`hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${selectedIds.includes(article.id) ? "bg-red-50/30 dark:bg-red-900/10" : ""}`}
                    >
                      <td className="py-3.5 px-4">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(article.id)}
                          onChange={() => toggleSelectOne(article.id)}
                          className="rounded border-gray-300 dark:border-gray-700 text-[#E62129] focus:ring-[#E62129] w-4 h-4 cursor-pointer"
                        />
                      </td>
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
                            <div className="w-12 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 shrink-0 hidden sm:block" />
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
                              : "bg-gray-100 dark:bg-gray-900/20 text-gray-700/60 dark:text-white/60"
                          }`}
                        >
                          {article.isPublished ? (
                            <>
                              <CheckCircle className="w-3 h-3" /> Terbit
                            </>
                          ) : (
                            <>
                              <Inbox className="w-3 h-3" /> Draft
                            </>
                          )}
                        </span>
                        {article.isFeatured && (
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100/60 dark:bg-yellow-300/60 text-yellow-500 dark:text-white/60`}
                          >
                            <>
                              <Star className="w-3 h-3" /> Featured
                            </>
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
                            onClick={() => {
                              setDeleteId(article.id);
                            }}
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
        {/* Pagination */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
          <AdminPagination
            currentPage={page}
            totalPages={totalPages}
            totalItems={data?.totalCount ?? 0}
            onPageChange={setPage}
            pageSize={PAGE_SIZE}
          />
        </div>
      </div>

      {/* Delete confirm */}
      <DeleteConfirmModal
        isOpen={!!deleteId}
        onCloseAction={() => setDeleteId(null)}
        onConfirmAction={handleDelete}
        title={
          deleteId === "bulk"
            ? `Hapus ${selectedIds.length} Berita?`
            : "Hapus Berita?"
        }
        description={
          deleteId === "bulk"
            ? "Tindakan ini tidak dapat dibatalkan. Semua berita yang dipilih akan dihapus secara permanen."
            : "Tindakan ini tidak dapat dibatalkan. Berita akan dihapus secara permanen dari sistem."
        }
        isPending={deleteNews.isPending}
      />
    </div>
  );
}
