"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAdminCreateAdmissionWave } from "@/hooks/useAdminAdmissionWaves";
import { AdmissionWaveForm } from "@/components/admin/AdmissionWaveForm";
import type { CreateAdmissionWavePayload } from "@/types/admission";

export default function CreateAdmissionWavePage() {
  const router = useRouter();
  const createWave = useAdminCreateAdmissionWave();

  const handleSave = async (data: CreateAdmissionWavePayload) => {
    try {
      await createWave.mutateAsync(data);
      toast.success("Gelombang berhasil ditambahkan");
      router.push("/admin/admission-waves");
    } catch {
      toast.error("Gagal menambahkan gelombang");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <AdmissionWaveForm
        onSaveAction={handleSave}
        backHref="/admin/admission-waves"
      />
    </div>
  );
}
