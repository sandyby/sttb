"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Award,
  Pencil,
  Trash2,
  Loader2,
  Search,
  Edit2,
  ChevronLeft,
  ChevronRight,
  Inbox,
} from "lucide-react";
import { toast } from "sonner";
import { useAdminScholarships } from "@/hooks/useAdminScholarships";
import { useSession } from "next-auth/react";
import { getImageUrl } from "@/libs/api";
import { DeleteConfirmModal } from "@/components/admin/shared/DeleteConfirmModal";
import { AdminEmptyState } from "@/components/admin/shared/AdminEmptyState";

export default function AdminScholarshipsPage() {
  const { status: sessionStatus } = useSession();
  
  const [isActiveFilter, setIsActiveFilter] = useState<string>("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { listQuery, deleteMutation } = useAdminScholarships();
  const { data, isLoading: isQueryLoading } = listQuery;

  const isLoading = sessionStatus === "loading" || isQueryLoading;

  const items = data?.items ?? [];
  const filteredItems = isActiveFilter === "" 
    ? items 
    : items.filter((item: any) => item.isActive === (isActiveFilter === "true"));

  const handleDelete = async () => {
    if (!deletingId) return;
    try {
      await deleteMutation.mutateAsync(deletingId);
      toast.success("Beasiswa berhasil dihapus");
    } catch {
      toast.error("Gagal menghapus beasiswa");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Manajemen Beasiswa</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {items.length} beasiswa terdaftar
          </p>
        </div>
        <Link
          href="/admin/scholarships/create"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#E62129] text-white text-sm font-medium hover:bg-[#c4131a] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Tambah Beasiswa
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <select
          value={isActiveFilter}
          onChange={(e) => setIsActiveFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#E62129]/40"
        >
          <option value="">Semua Status</option>
          <option value="true">Aktif</option>
          <option value="false">Nonaktif</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-[#E62129]" />
          </div>
        ) : filteredItems.length === 0 ? (
          <AdminEmptyState 
            icon={Award}
            title="Belum ada beasiswa"
            description={isActiveFilter ? "Tidak ada beasiswa yang sesuai dengan kriteria filter Anda." : "Belum ada data beasiswa yang terdaftar."}
            actionLabel="Tambah Beasiswa"
            actionHref="/admin/scholarships/create"
          />
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Beasiswa</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400 hidden sm:table-cell">Jenjang</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400 hidden md:table-cell">Order</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400 hidden lg:table-cell">Status</th>
                <th className="text-right py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                        {item.imageUrl ? (
                          <Image
                            src={getImageUrl(item.imageUrl) ?? item.imageUrl}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <Inbox className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white line-clamp-1">{item.name}</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                           <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                           <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">{item.color}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 hidden sm:table-cell">
                    <span className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-medium">
                        {item.level}
                    </span>
                  </td>
                  <td className="py-3 px-4 hidden md:table-cell font-medium text-gray-500">
                    {item.displayOrder}
                  </td>
                  <td className="py-3 px-4 hidden lg:table-cell">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      item.isActive
                        ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                    }`}>
                      {item.isActive ? "Aktif" : "Nonaktif"}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/scholarships/${item.id}/edit`}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => setDeletingId(item.id)}
                        disabled={deletingId === item.id}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-[#E62129] hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50"
                        title="Hapus"
                      >
                        {deletingId === item.id ? (
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

      <DeleteConfirmModal 
        isOpen={!!deletingId}
        onCloseAction={() => setDeletingId(null)}
        onConfirmAction={handleDelete}
        title="Hapus Beasiswa?"
        description="Tindakan ini tidak dapat dibatalkan. Beasiswa akan dihapus secara permanen dari sistem."
        isPending={deleteMutation.isPending}
      />
    </div>
  );
}
