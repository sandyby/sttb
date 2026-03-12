"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Shield,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Star,
  Users,
  Building2,
  MoreHorizontal,
  Mail,
  Phone,
} from "lucide-react";
import { toast } from "sonner";
import { useAdminFoundationList, useAdminDeleteFoundationMember } from "@/hooks/useAdminFoundation";
import { getImageUrl } from "@/libs/api";
import { DeleteConfirmModal } from "@/components/admin/shared/DeleteConfirmModal";
import { AdminEmptyState } from "@/components/admin/shared/AdminEmptyState";

const CATEGORY_LABELS: Record<string, string> = {
  pembina: "Dewan Pembina",
  pengurus: "Dewan Pengurus",
  anggota: "Anggota Dewan",
};

const CATEGORY_COLORS: Record<string, string> = {
  pembina: "bg-red-100 dark:bg-red-900/30 text-[#E62129]",
  pengurus: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
  anggota: "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300",
};

const CATEGORY_ICONS: Record<string, any> = {
  pembina: Shield,
  pengurus: Star,
  anggota: Users,
};

const PAGE_SIZE = 10;

export default function AdminFoundationPage() {
  const [page, setPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [search, setSearch] = useState(""); // Added search state

  const { data, isLoading } = useAdminFoundationList({
    page,
    pageSize: PAGE_SIZE,
    category: categoryFilter || undefined,
    orderByRecent: true,
  });

  const deleteMember = useAdminDeleteFoundationMember();

  const totalPages = data ? Math.ceil(data.totalCount / PAGE_SIZE) : 1;
  const items = data?.members ?? [];

  const handleDelete = async () => {
    if (!deletingId) return;
    try {
      await deleteMember.mutateAsync(deletingId);
      toast.success("Anggota yayasan berhasil dihapus");
    } catch {
      toast.error("Gagal menghapus anggota");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Pengurus Yayasan</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {data?.totalCount ?? 0} orang terdaftar
          </p>
        </div>
        <Link
          href="/admin/foundation/create"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#E62129] text-white text-sm font-medium hover:bg-[#c4131a] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Tambah Anggota
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <select
          value={categoryFilter}
          onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}
          className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#E62129]/40"
        >
          <option value="">Semua Kategori</option>
          <option value="pembina">Dewan Pembina</option>
          <option value="pengurus">Dewan Pengurus</option>
          <option value="anggota">Anggota Dewan</option>
        </select>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-[#E62129]" />
          </div>
        ) : items.length === 0 ? (
          <AdminEmptyState
            icon={Users}
            title="Belum ada anggota"
            description={search ? "Tidak ada anggota yang sesuai dengan kriteria pencarian Anda." : "Belum ada data anggota yayasan yang terdaftar."}
            actionLabel="Tambah Anggota"
            actionHref="/admin/foundation/create"
          />
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Nama & Jabatan</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Kategori</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400 hidden md:table-cell">Urutan</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400 hidden lg:table-cell">Status</th>
                <th className="text-right py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {items.map((member) => {
                const Icon = CATEGORY_ICONS[member.category] || Users;
                return (
                  <tr key={member.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 flex-shrink-0 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                          {member.imageUrl ? (
                            <Image
                              src={getImageUrl(member.imageUrl) ?? member.imageUrl}
                              alt={member.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <Users className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white line-clamp-1">{member.name}</p>
                          <p className="text-xs text-gray-400 line-clamp-1">{member.position}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${CATEGORY_COLORS[member.category] ?? ""}`}>
                        <Icon className="w-3 h-3" />
                        {CATEGORY_LABELS[member.category] ?? member.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell">
                      <p className="text-gray-600 dark:text-gray-400 text-xs">
                        {member.displayOrder}
                      </p>
                    </td>
                    <td className="py-3 px-4 hidden lg:table-cell">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        member.isActive
                          ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                      }`}>
                        {member.isActive ? "Aktif" : "Nonaktif"}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/foundation/${member.id}/edit`}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setDeletingId(member.id)}
                          disabled={deletingId === member.id}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-[#E62129] hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50"
                          title="Hapus"
                        >
                          {deletingId === member.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
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
      <DeleteConfirmModal 
        isOpen={!!deletingId}
        onCloseAction={() => setDeletingId(null)}
        onConfirmAction={handleDelete}
        title="Hapus Anggota Yayasan?"
        description="Tindakan ini tidak dapat dibatalkan. Data anggota akan dihapus secara permanen."
        isPending={deleteMember.isPending}
      />
    </div>
  );
}
