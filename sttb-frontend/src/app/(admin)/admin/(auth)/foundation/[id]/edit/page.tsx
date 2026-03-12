"use client";

import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { ChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useAdminFoundationMemberForEdit, useAdminUpdateFoundationMember } from "@/hooks/useAdminFoundation";
import { FoundationMemberForm } from "@/components/admin/foundation/FoundationMemberForm";

export default function EditFoundationMemberPage() {
  const { id } = useParams();
  const router = useRouter();
  const { member, isLoading, notFound } = useAdminFoundationMemberForEdit(id as string);
  const updateMember = useAdminUpdateFoundationMember();

  const onSubmit = async (data: any) => {
    try {
      await updateMember.mutateAsync({ id: id as string, payload: data });
      toast.success("Anggota yayasan berhasil diperbarui");
      router.push("/admin/foundation");
    } catch {
      toast.error("Gagal memperbarui anggota");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#E62129]" />
      </div>
    );
  }

  if (notFound) {
    return (
       <div className="text-center py-20">
        <h2 className="text-lg font-bold">Anggota tidak ditemukan</h2>
        <Link href="/admin/foundation" className="text-[#E62129] hover:underline mt-2 inline-block">
          Kembali ke daftar
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <FoundationMemberForm
        initialData={member}
        onSubmitAction={onSubmit}
        isPending={updateMember.isPending}
        backHref="/admin/foundation"
      />
    </div>
  );
}
