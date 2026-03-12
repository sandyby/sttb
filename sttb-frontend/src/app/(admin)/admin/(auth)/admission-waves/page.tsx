"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Loader2, Calendar, ChevronUp, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { useAdminAdmissionWaveList, useAdminDeleteAdmissionWave } from "@/hooks/useAdminAdmissionWaves";

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

  const { data, isLoading } = useAdminAdmissionWaveList();
  const deleteWave = useAdminDeleteAdmissionWave();

  const waves = data?.items ?? [];

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
            {waves.length} gelombang terdaftar
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
                            Psikotes: {wave.psikotesSchedule}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400 text-xs">
                    {wave.deadline}
                  </td>
                  <td className="py-3 px-4 hidden md:table-cell text-gray-600 dark:text-gray-400 text-xs">
                    {wave.steps.length} aktivitas
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[wave.status] ?? STATUS_COLORS.closed}`}>
                      {STATUS_LABELS[wave.status] ?? wave.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 hidden lg:table-cell">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
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
        )}
      </div>
    </div>
  );
}
