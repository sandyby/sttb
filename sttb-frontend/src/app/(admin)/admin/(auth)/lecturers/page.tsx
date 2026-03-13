"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  GraduationCap,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Star,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import {
  useAdminLecturerList,
  useAdminDeleteLecturer,
} from "@/hooks/useAdminLecturers";
import { getImageUrl } from "@/libs/api";

const PAGE_SIZE = 10;

const RANK_LABELS: Record<string, string> = {
  pimpinan: "Pimpinan",
  tetap: "Dosen Tetap",
  "tidak-tetap": "Tidak Tetap",
};

const RANK_COLORS: Record<string, string> = {
  pimpinan: "bg-red-100 dark:bg-red-900/30 text-[#E62129]",
  tetap: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
  "tidak-tetap":
    "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300",
};

export default function AdminLecturersPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [rankFilter, setRankFilter] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data, isLoading } = useAdminLecturerList({
    page,
    pageSize: PAGE_SIZE,
    search: search || undefined,
    rank: rankFilter || undefined,
  });

  const deleteLecturer = useAdminDeleteLecturer();

  const totalPages = data ? Math.ceil(data.totalCount / PAGE_SIZE) : 1;
  const items = data?.items ?? [];

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Hapus dosen "${name}"? Tindakan ini tidak dapat dibatalkan.`))
      return;
    setDeletingId(id);
    try {
      await deleteLecturer.mutateAsync(id);
      toast.success("Dosen berhasil dihapus");
    } catch {
      toast.error("Gagal menghapus dosen");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Dewan Dosen
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {data?.totalCount ?? 0} dosen terdaftar
          </p>
        </div>
        <Link
          href="/admin/lecturers/create"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#E62129] text-white text-sm font-medium hover:bg-[#c4131a] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Tambah Dosen
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Cari nama atau keahlian..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#E62129]/40"
          />
        </div>
        <select
          value={rankFilter}
          onChange={(e) => {
            setRankFilter(e.target.value);
            setPage(1);
          }}
          className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#E62129]/40"
        >
          <option value="">Semua Rank</option>
          <option value="pimpinan">Pimpinan Akademik</option>
          <option value="tetap">Dosen Tetap</option>
          <option value="tidak-tetap">Dosen Tidak Tetap</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-[#E62129]" />
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20">
            <GraduationCap className="w-10 h-10 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Belum ada dosen
            </p>
            <Link
              href="/admin/lecturers/create"
              className="inline-flex items-center gap-1 mt-3 text-[#E62129] text-sm font-medium hover:underline"
            >
              <Plus className="w-3.5 h-3.5" /> Tambah dosen pertama
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                  Dosen
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400 hidden sm:table-cell">
                  Keahlian
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400 hidden md:table-cell">
                  Rank
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400 hidden lg:table-cell">
                  Status
                </th>
                <th className="text-right py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {items.map((lecturer) => (
                <tr
                  key={lecturer.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 flex-shrink-0 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                        {lecturer.imageUrl ? (
                          <Image
                            src={
                              getImageUrl(lecturer.imageUrl) ??
                              lecturer.imageUrl
                            }
                            alt={lecturer.name}
                            fill
                            className="object-cover object-top"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <GraduationCap className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white line-clamp-1">
                          {lecturer.name}
                        </p>
                        <p className="text-xs text-gray-400 line-clamp-1">
                          {lecturer.title}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 hidden sm:table-cell">
                    <p className="text-gray-600 dark:text-gray-400 text-xs line-clamp-2 max-w-[200px]">
                      {lecturer.specialization}
                    </p>
                  </td>
                  <td className="py-3 px-4 hidden md:table-cell">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${RANK_COLORS[lecturer.rank] ?? ""}`}
                    >
                      {lecturer.rank === "pimpinan" ? (
                        <Star className="w-3 h-3" />
                      ) : (
                        <Users className="w-3 h-3" />
                      )}
                      {RANK_LABELS[lecturer.rank] ?? lecturer.rank}
                    </span>
                  </td>
                  <td className="py-3 px-4 hidden lg:table-cell">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        lecturer.isActive
                          ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {lecturer.isActive ? "Aktif" : "Nonaktif"}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/lecturers/${lecturer.id}/edit`}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(lecturer.id, lecturer.name)}
                        disabled={deletingId === lecturer.id}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-[#E62129] hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50"
                        title="Hapus"
                      >
                        {deletingId === lecturer.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Halaman {page} dari {totalPages}
          </p>
          <div className="flex gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
