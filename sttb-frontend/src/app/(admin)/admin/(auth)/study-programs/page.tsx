"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  Filter,
  GraduationCap,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  BarChart,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import {
  useAdminStudyProgramsList,
  useDeleteStudyProgram,
} from "@/hooks/useAdminStudyPrograms";
import { DeleteConfirmModal } from "@/components/admin/shared/DeleteConfirmModal";
import { AdminEmptyState } from "@/components/admin/shared/AdminEmptyState";

export default function AdminStudyProgramsPage() {
  const [search, setSearch] = useState("");
  const [activeLevel, setActiveLevel] = useState<"all" | "S1" | "S2">("all");
  const [page, setPage] = useState(1);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const PAGE_SIZE = 10;

  const { data, isLoading } = useAdminStudyProgramsList();
  const deleteProgram = useDeleteStudyProgram();

  // The backend doesn't support server-side filtering/pagination for this yet in my hook,
  // so let's do client-side if data is small, or assume it's paginated if the hook supports it.
  // Looking at useAdminStudyPrograms.ts, it doesn't take params yet.
  // Let's refine the hook or do client-side.

  const programs = data ?? [];

  const filtered = programs.filter((p) => {
    const matchSearch =
      search === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase());
    const matchLevel = activeLevel === "all" || p.level === activeLevel;
    return matchSearch && matchLevel;
  });

  const totalCount = filtered.length;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleDelete = (id: string) => {
    deleteProgram.mutate(id, {
      onSuccess: () => {
        toast.success("Program studi berhasil dihapus");
        setDeleteConfirm(null);
      },
      onError: () => {
        toast.error("Gagal menghapus program studi");
        setDeleteConfirm(null);
      },
    });
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 dark:text-white font-bold text-2xl">
            Manajemen Program Studi
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">
            {isLoading ? "Memuat..." : `${totalCount} program studi terdaftar`}
          </p>
        </div>
        <Link
          href="/admin/study-programs/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#E62129] hover:bg-[#c4131a] text-white text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" /> Tambah Program Baru
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari nama atau slug..."
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
            {(["all", "S1", "S2"] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => {
                  setActiveLevel(lvl);
                  setPage(1);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeLevel === lvl
                    ? "bg-[#E62129] text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200"
                }`}
              >
                {lvl === "all" ? "Semua Jenjang" : lvl}
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
                  Program Studi
                </th>
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider">
                  Jenjang
                </th>
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider">
                  Gelar
                </th>
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider">
                  SKS
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
                Array.from({ length: 3 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="py-4 px-4">
                      <div className="h-4 w-48 bg-gray-100 dark:bg-gray-800 rounded" />
                    </td>
                    <td className="py-4 px-4 hidden sm:table-cell">
                      <div className="h-4 w-12 bg-gray-100 dark:bg-gray-800 rounded" />
                    </td>
                    <td className="py-4 px-4 hidden md:table-cell">
                      <div className="h-4 w-16 bg-gray-100 dark:bg-gray-800 rounded" />
                    </td>
                    <td className="py-4 px-4 hidden lg:table-cell">
                      <div className="h-4 w-8 bg-gray-100 dark:bg-gray-800 rounded" />
                    </td>
                    <td className="py-4 px-4">
                      <div className="h-5 w-20 bg-gray-100 dark:bg-gray-800 rounded-full" />
                    </td>
                    <td className="py-4 px-4" />
                  </tr>
                ))
              ) : paginated.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-0">
                    <AdminEmptyState
                      icon={GraduationCap}
                      title="Tidak ada program studi"
                      description={
                        search
                          ? "Tidak ada program studi yang sesuai dengan kriteria pencarian Anda."
                          : "Belum ada data program studi yang terdaftar."
                      }
                      actionLabel="Tambah Program Studi"
                      actionHref="/admin/study-programs/new"
                      className="border-none rounded-none shadow-none"
                    />
                  </td>
                </tr>
              ) : (
                paginated.map((program) => (
                  <tr
                    key={program.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-[#0A2C74] dark:text-blue-300">
                          <GraduationCap className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-gray-900 dark:text-white text-sm font-medium">
                            {program.name}
                          </p>
                          <p className="text-gray-400 text-xs font-mono">
                            /{program.slug}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-sm text-gray-600 dark:text-gray-400">
                      {program.level}
                    </td>
                    <td className="py-3.5 px-4 text-sm text-gray-600 dark:text-gray-400">
                      {program.degree}
                    </td>
                    <td className="py-3.5 px-4 text-sm text-gray-600 dark:text-gray-400">
                      {program.credits}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                          program.isPublished
                            ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                            : "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400"
                        }`}
                      >
                        {program.isPublished ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <XCircle className="w-3 h-3" />
                        )}
                        {program.isPublished ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center justify-end gap-1">
                        <a
                          href={`/program-studi/${program.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg text-gray-400 hover:text-[#0570CD] hover:bg-blue-50 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </a>
                        <Link
                          href={`/admin/study-programs/${program.id}/edit`}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-[#0A2C74] hover:bg-blue-50 transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setDeleteConfirm(program.id)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-[#E62129] hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Modal */}
      <DeleteConfirmModal 
        isOpen={!!deleteConfirm}
        onCloseAction={() => setDeleteConfirm(null)}
        onConfirmAction={() => deleteConfirm && handleDelete(deleteConfirm)}
        title="Hapus Program Studi?"
        description="Tindakan ini permanen. Data mahasiswa yang terkait dengan program ini (jika ada) mungkin akan terdampak."
        isPending={deleteProgram.isPending}
      />
    </div>
  );
}
