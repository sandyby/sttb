"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Loader2, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { useAdminAdmissionWaveList, useAdminDeleteAdmissionWave } from "@/hooks/useAdminAdmissionWaves";

function formatDeadline(dateStr: string) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

function formatSchedule(str: string | null) {
  if (!str) return "";
  const d = new Date(str);
  if (isNaN(d.getTime())) return str;
  const dateStr = d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
  if (d.getHours() !== 0 || d.getMinutes() !== 0) {
    const h = d.getHours().toString().padStart(2, "0");
    const m = d.getMinutes().toString().padStart(2, "0");
    return `${dateStr}, ${h}.${m}`;
  }
  return dateStr;
}

const STATUS_LABELS: Record<string, string> = {
  open: "Berjalan",
  closed: "Ditutup",
  upcoming: "Akan Datang",
};

const STATUS_COLORS: Record<string, string> = {
  open: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
  closed: "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400",
  upcoming: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
};

export default function AdminAdmissionWavesPage() {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 5;

  const { data, isLoading } = useAdminAdmissionWaveList({
    page,
    pageSize: PAGE_SIZE,
  });
  const deleteWave = useAdminDeleteAdmissionWave();

  const waves = data?.items ?? [];
  const totalCount = data?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const handleDelete = async (id: string, label: string) => {
    if (!confirm(`Hapus "${label}"? Tindakan ini tidak dapat dibatalkan.`)) return;
    setDeletingId(id);
    try {
      await deleteWave.mutateAsync(id);
      toast.success("Gelombang berhasil dihapus");
    } catch {
      toast.error("Gagal menghapus gelombang");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Jadwal Admisi</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {totalCount} gelombang terdaftar
          </p>
        </div>
        <Link
          href="/admin/admission-waves/create"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#E62129] text-white text-sm font-medium hover:bg-[#c4131a] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Tambah Gelombang
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-[#E62129]" />
          </div>
        ) : waves.length === 0 ? (
          <div className="text-center py-20">
            <Calendar className="w-10 h-10 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
            <p className="text-gray-500 dark:text-gray-400 text-sm">Belum ada gelombang admisi</p>
            <Link
              href="/admin/admission-waves/create"
              className="inline-flex items-center gap-1 mt-3 text-[#E62129] text-sm font-medium hover:underline"
            >
              <Plus className="w-3.5 h-3.5" /> Tambah gelombang pertama
            </Link>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Gelombang</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Batas Pendaftaran</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400 hidden md:table-cell">Aktivitas</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400 hidden lg:table-cell">Tampil</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                  {waves.map((wave) => (
                    <tr key={wave.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                            style={{ backgroundColor: wave.color }}
                          >
                            {wave.waveNumber}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{wave.label}</p>
                            {wave.psikotesSchedule && (
                              <p className="text-xs text-gray-400 line-clamp-1">
                                Psikotes: {formatSchedule(wave.psikotesSchedule)}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400 text-xs">
                        {formatDeadline(wave.deadline)}
                      </td>
                      <td className="py-3 px-4 hidden md:table-cell text-gray-600 dark:text-gray-400 text-xs">
                        {wave.steps.length} aktivitas
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap w-fit ${STATUS_COLORS[wave.status] ?? STATUS_COLORS.closed}`}>
                          {STATUS_LABELS[wave.status] ?? wave.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 hidden lg:table-cell">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap w-fit ${
                          wave.isActive
                            ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                        }`}>
                          {wave.isActive ? "Aktif" : "Nonaktif"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            href={`/admin/admission-waves/${wave.id}/edit`}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(wave.id, wave.label)}
                            disabled={deletingId === wave.id}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-[#E62129] hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50"
                            title="Hapus"
                          >
                            {deletingId === wave.id ? (
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
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-4 flex-wrap">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Halaman {page} dari {totalPages} · {totalCount} gelombang
                </p>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page <= 1 || isLoading}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" /> Prev
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                    .reduce<(number | "…")[]>((acc, p, idx, arr) => {
                      if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push("…");
                      acc.push(p);
                      return acc;
                    }, [])
                    .map((p, i) =>
                      p === "…" ? (
                        <span key={`ellipsis-${i}`} className="px-2 text-xs text-gray-400">
                          …
                        </span>
                      ) : (
                        <button
                          key={p}
                          onClick={() => setPage(p)}
                          className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${
                            page === p
                              ? "bg-[#E62129] text-white"
                              : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                          }`}
                        >
                          {p}
                        </button>
                      )
                    )}
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages || isLoading}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Next <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
