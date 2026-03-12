"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LecturerForm, type LecturerFormData } from "@/components/admin/LecturerForm";
import { useAdminCreateLecturer } from "@/hooks/useAdminLecturers";

export default function AdminLecturerCreatePage() {
  const router = useRouter();
  const createLecturer = useAdminCreateLecturer();

  const handleSave = async (data: LecturerFormData) => {
    await createLecturer.mutateAsync({
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
    });

    toast.success("Dosen berhasil ditambahkan!");
    router.push("/admin/lecturers");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <LecturerForm onSave={handleSave} backHref="/admin/lecturers" />
    </div>
  );
}
