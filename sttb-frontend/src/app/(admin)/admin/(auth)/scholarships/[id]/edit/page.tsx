"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAdminScholarships } from "@/hooks/useAdminScholarships";
import ScholarshipForm from "../../_components/ScholarshipForm";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { CreateScholarshipRequest } from "@/types/scholarship";

export default function EditScholarshipPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const { listQuery, updateMutation } = useAdminScholarships();

    const scholarship = listQuery.data?.items.find((s) => s.id === id);

    const handleSubmit = async (values: CreateScholarshipRequest) => {
        try {
            await updateMutation.mutateAsync({ id, payload: values });
            toast.success("Beasiswa berhasil diperbarui");
            router.push("/admin/scholarships");
        } catch (error) {
            toast.error("Gagal memperbarui beasiswa");
        }
    };

    if (listQuery.isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-[#E62129]" />
            </div>
        );
    }

    if (!scholarship) {
        return (
            <div className="text-center py-20">
                <p className="text-gray-500">Beasiswa tidak ditemukan.</p>
                <Link href="/admin/scholarships" className="text-[#E62129] hover:underline mt-2 inline-block"> Kembali ke daftar </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <ScholarshipForm 
                initialData={scholarship}
                onSubmitAction={handleSubmit} 
                isPending={updateMutation.isPending} 
                backHref="/admin/scholarships"
            />
        </div>
    );
}
