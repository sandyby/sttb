"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Filter,
  Calendar,
  MapPin,
  Tag,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { useAdminEventList, useAdminDeleteEvent } from "@/hooks/useAdminEvents";
import { useEventCategories } from "@/hooks/useEvents";
import Image from "next/image";
import { getImageUrl } from "@/libs/api";
import { DeleteConfirmModal } from "@/components/admin/shared/DeleteConfirmModal";
import { AdminEmptyState } from "@/components/admin/shared/AdminEmptyState";
import AdminPagination from "@/components/admin/shared/AdminPagination";

const PAGE_SIZE = 10;

export default function AdminKegiatanPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [page, setPage] = useState(1);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "a-z" | "z-a">(
    "newest",
  );

  const { data, isLoading } = useAdminEventList({
    page,
    pageSize: PAGE_SIZE,
    category: activeCategory || undefined,
  });

  const { data: categoriesData } = useEventCategories();
  const deleteEvent = useAdminDeleteEvent();

  const events = data?.items ?? [];
  const totalCount = data?.totalCount ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  const handleDelete = async (id: string | string[]) => {
    try {
      if (Array.isArray(id)) {
        await Promise.all(id.map((i) => deleteEvent.mutateAsync(i)));
        setSelectedIds([]);
      } else {
        await deleteEvent.mutateAsync(id);
      }
      setDeleteConfirm(null);
      toast.success("Kegiatan berhasil dihapus");
    } catch {
      toast.error("Gagal menghapus kegiatan");
    }
  };

  const sortedEvents = [...(data?.items ?? [])].sort((a, b) => {
    if (sortBy === "newest")
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    if (sortBy === "oldest")
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    if (sortBy === "a-z") return a.title.localeCompare(b.title);
    if (sortBy === "z-a") return b.title.localeCompare(a.title);
    return 0;
  });

  const filtered = search
    ? sortedEvents.filter((e) =>
        e.title.toLowerCase().includes(search.toLowerCase()),
      )
    : sortedEvents;

  const toggleSelectAll = () => {
    if (selectedIds.length === filtered.length) setSelectedIds([]);
    else setSelectedIds(filtered.map((e) => e.id));
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const categoryNames = [
    "Semua",
    ...(categoriesData?.map((c) => c.name) ?? []),
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-gray-900 dark:text-white font-bold text-2xl">
            Kegiatan
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">
            Kelola event dan kegiatan kampus STTB
          </p>
        </div>
        <Link
          href="/admin/events/create"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#E62129] hover:bg-[#c4131a] text-white text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" /> Tambah Kegiatan Baru
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari kegiatan..."
              className="w-full pl-9 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E62129]"
            />
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <Filter className="w-4 h-4 text-gray-400" />
            {categoryNames.map((c) => (
              <button
                key={c}
                onClick={() => {
                  setActiveCategory(c === "Semua" ? "" : c);
                  setPage(1);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${(c === "Semua" ? !activeCategory : activeCategory === c) ? "bg-[#E62129] text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Top Pagination & Bulk Actions */}
      <div className="flex items-center justify-between gap-3 flex-wrap bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-3 shadow-sm">
        <div className="flex items-center gap-2">
          {selectedIds.length > 0 && (
            <button
              onClick={() => setDeleteConfirm("bulk")}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-900/20 text-[#E62129] text-xs font-semibold hover:bg-red-100 transition-colors border border-red-100 dark:border-red-800 shadow-sm"
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
              totalItems={totalCount}
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
              <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20 text-left">
                <th className="px-4 py-3 w-10">
                  <input
                    type="checkbox"
                    checked={
                      selectedIds.length === filtered.length &&
                      filtered.length > 0
                    }
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300 dark:border-gray-700 text-[#E62129] focus:ring-[#E62129] w-4 h-4 cursor-pointer translate-y-[1px]"
                  />
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Kegiatan
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">
                  Tanggal
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell">
                  Lokasi
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">
                  Kategori
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-12 text-center text-gray-400 dark:text-gray-500 text-sm"
                  >
                    Memuat data...
                  </td>
                </tr>
              )}
              {!isLoading &&
                filtered.map((ev) => (
                  <tr
                    key={ev.id}
                    className={`border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors ${selectedIds.includes(ev.id) ? "bg-red-50/30 dark:bg-red-900/10" : ""}`}
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(ev.id)}
                        onChange={() => toggleSelectOne(ev.id)}
                        className="rounded border-gray-300 dark:border-gray-700 text-[#E62129] focus:ring-[#E62129] w-4 h-4 cursor-pointer"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-800">
                          {getImageUrl(ev.imageUrl) && (
                            <Image
                              src={getImageUrl(ev.imageUrl)!}
                              alt=""
                              width={40}
                              height={40}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div>
                          <p className="text-gray-900 dark:text-white font-medium text-sm line-clamp-1">
                            {ev.title}
                          </p>
                          <p className="text-gray-400 text-xs line-clamp-1 hidden sm:block">
                            {ev.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400 text-sm">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(ev.startDate).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400 text-sm">
                        <MapPin className="w-3.5 h-3.5" /> {ev.location ?? "—"}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                        <Tag className="w-3 h-3" /> {ev.category ?? "—"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${ev.isPublished ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400" : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"}`}
                      >
                        {ev.isPublished ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <XCircle className="w-3 h-3" />
                        )}
                        {ev.isPublished ? "Terbit" : "Draft"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/events/${ev.id}/edit`}
                          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-[#0A2C74] transition-colors inline-flex"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setDeleteConfirm(ev.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-[#E62129] transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              {!isLoading && filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-0">
                    <AdminEmptyState
                      icon={Calendar}
                      title="Belum ada kegiatan"
                      description={
                        search
                          ? "Tidak ada kegiatan yang sesuai dengan kriteria pencarian Anda."
                          : "Belum ada data kegiatan yang terdaftar."
                      }
                      actionLabel="Tambah Kegiatan"
                      actionHref="/admin/events/create"
                      className="border-none rounded-none shadow-none"
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
          <AdminPagination
            currentPage={page}
            totalPages={totalPages}
            totalItems={totalCount}
            onPageChange={setPage}
            pageSize={PAGE_SIZE}
          />
        </div>
      </div>

      {/* Delete confirm */}
      <DeleteConfirmModal
        isOpen={!!deleteConfirm}
        onCloseAction={() => setDeleteConfirm(null)}
        onConfirmAction={() => {
          if (deleteConfirm === "bulk") {
            handleDelete(selectedIds);
          } else if (deleteConfirm) {
            handleDelete(deleteConfirm);
          }
        }}
        title={
          deleteConfirm === "bulk"
            ? `Hapus ${selectedIds.length} Kegiatan?`
            : "Hapus Kegiatan?"
        }
        description={
          deleteConfirm === "bulk"
            ? "Tindakan ini tidak dapat dibatalkan. Semua kegiatan yang dipilih akan dihapus secara permanen."
            : "Tindakan ini tidak dapat dibatalkan. Kegiatan akan dihapus secara permanen dari sistem."
        }
        isPending={deleteEvent.isPending}
      />
    </div>
  );
}
