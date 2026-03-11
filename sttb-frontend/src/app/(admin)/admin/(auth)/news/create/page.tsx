"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { NewsForm, type NewsFormData } from "@/components/admin/NewsForm";

export default function AdminNewsCreatePage() {
    const router = useRouter();

    const handleSave = async (data: NewsFormData, status: "draft" | "published") => {
        await new Promise(r => setTimeout(r, 900));

        toast.success(status === "draft" ? "Berita disimpan sebagai draft" : "Berita berhasil diterbitkan!");
        router.push("/admin/news");
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Buat Berita Baru</h1>
            <NewsForm onSave={handleSave} backHref="/admin/news" />
        </div>
        // <NewsForm onSave={handleSave} backHref="/admin/news" />
    );
}
