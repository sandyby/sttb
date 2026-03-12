"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useAdminCreateFoundationMember } from "@/hooks/useAdminFoundation";
import { FoundationMemberForm } from "@/components/admin/foundation/FoundationMemberForm";

export default function CreateFoundationMemberPage() {
  const router = useRouter();
  const createMember = useAdminCreateFoundationMember();

  const onSubmit = async (data: any) => {
    try {
      await createMember.mutateAsync(data);
      toast.success("Anggota yayasan berhasil ditambahkan");
      router.push("/admin/foundation");
    } catch {
      toast.error("Gagal menambahkan anggota");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <FoundationMemberForm
        onSubmitAction={onSubmit}
        isPending={createMember.isPending}
        backHref="/admin/foundation"
      />
    </div>
  );
}
