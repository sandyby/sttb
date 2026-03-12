"use client";

import { useRouter } from "next/navigation";
import ProgramStudiForm from "@/components/admin/ProgramStudiForm";
import { useCreateStudyProgram } from "@/hooks/useAdminStudyPrograms";
import { toast } from "sonner";

export default function CreateStudyProgramPage() {
  const router = useRouter();
  const createProgram = useCreateStudyProgram();

  const handleSave = async (data: any) => {
    createProgram.mutate(data, {
      onSuccess: () => {
        toast.success("Program studi berhasil dibuat");
        router.push("/admin/study-programs");
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || "Gagal membuat program studi",
        );
      },
    });
  };

  return (
    <div className="py-4">
      <ProgramStudiForm onSave={handleSave} />
    </div>
  );
}
