"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { NewsForm, type NewsFormData } from "@/components/admin/NewsForm";
import { useCreateNews } from "@/hooks/useAdminNews";
import { useNewsCategories } from "@/hooks/useNews";

export default function AdminNewsCreatePage() {
    const router = useRouter();
    const createNews = useCreateNews();
    const { data: categories = [] } = useNewsCategories();

    const handleSave = async (data: NewsFormData, status: "draft" | "published") => {
        await createNews.mutateAsync({
            title: data.title,
            slug: data.slug,
            content: data.content,
            excerpt: data.excerpt || null,
            thumbnailUrl: data.coverImageUrl || null,
            categoryId: data.categoryId || null,
            author: data.author || null,
            tags: data.tags || [],
            isFeatured: data.featured,
            isPublished: status === "published",
        });

        toast.success(status === "draft" ? "Berita disimpan sebagai draft" : "Berita berhasil diterbitkan!");
        router.push("/admin/news");
    };

    return (
        <div className="max-w-4xl mx-auto">
            <NewsForm categories={categories} onSave={handleSave} backHref="/admin/news" />
        </div>
    );
}
