"use client";

import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { LecturerForm, type LecturerFormData } from "@/components/admin/LecturerForm";
import { useAdminLecturerForEdit, useAdminUpdateLecturer } from "@/hooks/useAdminLecturers";

export default function AdminLecturerEditPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { isLoading, lecturer, notFound } = useAdminLecturerForEdit(id);
  const updateLecturer = useAdminUpdateLecturer();

  const handleSave = async (data: LecturerFormData) => {
    await updateLecturer.mutateAsync({
      id,
      payload: {
        name: data.name,
        title: data.title,
        rank: data.rank,
        degree: data.degree,
        specialization: data.specialization,
        imageUrl: data.imageUrl || null,
        email: data.email || null,
        bio: data.bio,
        courses: data.courses,
        almaMater: data.almaMater,
        origin: data.origin,
        displayOrder: data.displayOrder,
        isActive: data.isActive,
      },
    });

    toast.success("Data dosen berhasil diperbarui!");
    router.push("/admin/lecturers");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-[#E62129]" />
      </div>
    );
  }

  if (notFound || !lecturer) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <AlertCircle className="w-10 h-10 text-gray-300 dark:text-gray-600 mb-3" />
        <p className="text-gray-500 dark:text-gray-400 mb-4">Dosen tidak ditemukan</p>
        <Link
          href="/admin/lecturers"
          className="text-[#E62129] text-sm font-medium hover:underline"
        >
          Kembali ke daftar dosen
        </Link>
      </div>
    );
  }

  const initialData: LecturerFormData = {
    name: lecturer.name,
    title: lecturer.title,
    rank: lecturer.rank,
    degree: lecturer.degree,
    specialization: lecturer.specialization,
    imageUrl: lecturer.imageUrl ?? "",
    email: lecturer.email ?? "",
    bio: lecturer.bio,
    courses: lecturer.courses,
    almaMater: lecturer.almaMater,
    origin: lecturer.origin,
    displayOrder: lecturer.displayOrder,
    isActive: lecturer.isActive,
  };

  return (
    <div className="max-w-4xl mx-auto">
      <LecturerForm
        initialData={initialData}
        onSave={handleSave}
        backHref="/admin/lecturers"
        isEditing
      />
    </div>
  );
}
