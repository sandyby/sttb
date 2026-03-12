"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProgramStudiForm from "@/components/admin/ProgramStudiForm";
import {
  useAdminStudyProgramDetail,
  useUpdateStudyProgram,
} from "@/hooks/useAdminStudyPrograms";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function EditStudyProgramPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { data: program, isLoading } = useAdminStudyProgramDetail(id);
  const updateProgram = useUpdateStudyProgram();

  const handleSave = async (data: any) => {
    updateProgram.mutate(
      { id, payload: data },
      {
        onSuccess: () => {
          toast.success("Program studi berhasil diperbarui");
          router.push("/admin/study-programs");
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || "Gagal memperbarui program studi",
          );
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 text-[#E62129] animate-spin" />
        <p className="text-gray-500 animate-pulse">Memuat data program...</p>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Program Tidak Ditemukan
        </h2>
        <p className="text-gray-500">
          Data yang Anda cari tidak tersedia atau telah dihapus.
        </p>
        <button
          onClick={() => router.push("/admin/study-programs")}
          className="text-[#E62129] font-medium"
        >
          Kembali ke Daftar
        </button>
      </div>
    );
  }

  return (
    <div className="py-4">
      <ProgramStudiForm
        initialData={{
          ...program,
          level: program.level as "S1" | "S2",
          description: program.description ?? "",
          vision: program.vision ?? "",
          mission: program.mission ?? "",
          tagline: program.tagline ?? "",
          accreditation: program.accreditation ?? "",
          coverImageUrl: program.coverImageUrl ?? "",
        }}
        onSave={handleSave}
      />

    </div>
  );
}
