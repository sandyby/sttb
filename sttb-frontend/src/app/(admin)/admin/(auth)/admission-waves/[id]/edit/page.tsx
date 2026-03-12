"use client";

import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useAdminAdmissionWaveForEdit, useAdminUpdateAdmissionWave } from "@/hooks/useAdminAdmissionWaves";
import { AdmissionWaveForm } from "@/components/admin/AdmissionWaveForm";
import type { CreateAdmissionWavePayload } from "@/types/admission";

export default function EditAdmissionWavePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { isLoading, wave, notFound } = useAdminAdmissionWaveForEdit(id);
  const updateWave = useAdminUpdateAdmissionWave();

  const handleSave = async (data: CreateAdmissionWavePayload) => {
    try {
      await updateWave.mutateAsync({ id, payload: data });
      toast.success("Gelombang berhasil diperbarui");
      router.push("/admin/admission-waves");
    } catch {
      toast.error("Gagal memperbarui gelombang");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-[#E62129]" />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 dark:text-gray-400">Gelombang tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <AdmissionWaveForm
        initialData={wave}
        onSaveAction={handleSave}
        backHref="/admin/admission-waves"
        isEditing
      />
    </div>
  );
}
