"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAdminScholarships } from "@/hooks/useAdminScholarships";
import ScholarshipForm from "../_components/ScholarshipForm";
import { CreateScholarshipRequest } from "@/types/scholarship";

export default function CreateScholarshipPage() {
    const router = useRouter();
    const { createMutation } = useAdminScholarships();

    const handleSubmit = async (values: CreateScholarshipRequest) => {
        try {
            await createMutation.mutateAsync(values);
            toast.success("Beasiswa berhasil dibuat");
            router.push("/admin/scholarships");
        } catch (error) {
            toast.error("Gagal membuat beasiswa");
        }
    };

    return (
        <div className="space-y-6">
            <ScholarshipForm 
                onSubmitAction={handleSubmit} 
                isPending={createMutation.isPending} 
                backHref="/admin/scholarships"
            />
        </div>
    );
}
