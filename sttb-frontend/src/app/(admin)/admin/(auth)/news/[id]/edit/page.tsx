"use client";

import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { NewsForm, type NewsFormData } from "@/components/admin/NewsForm";
import { useAdminNewsForEdit, useUpdateNews } from "@/hooks/useAdminNews";
import { useNewsCategories } from "@/hooks/useNews";

export default function AdminNewsEditPage() {
    const router = useRouter();
    const { id } = useParams<{ id: string }>();

    const { isLoading, detail, notFound } = useAdminNewsForEdit(id);
    const { data: categories = [] } = useNewsCategories();
    const updateNews = useUpdateNews();

    if (isLoading) {
        return (
            <div className="max-w-5xl mx-auto space-y-6 animate-pulse">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800" />
                    <div className="space-y-1.5">
                        <div className="h-5 w-40 bg-gray-100 dark:bg-gray-800 rounded" />
                        <div className="h-3.5 w-56 bg-gray-100 dark:bg-gray-800 rounded" />
                    </div>
                </div>
                <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-5">
                        <div className="h-40 rounded-2xl bg-gray-100 dark:bg-gray-800" />
                        <div className="h-80 rounded-2xl bg-gray-100 dark:bg-gray-800" />
                        <div className="h-28 rounded-2xl bg-gray-100 dark:bg-gray-800" />
                    </div>
                    <div className="space-y-5">
                        <div className="h-32 rounded-2xl bg-gray-100 dark:bg-gray-800" />
                        <div className="h-48 rounded-2xl bg-gray-100 dark:bg-gray-800" />
                        <div className="h-36 rounded-2xl bg-gray-100 dark:bg-gray-800" />
                    </div>
                </div>
            </div>
        );
    }

    if (notFound || !detail) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-4">
                    <span className="text-3xl">404</span>
                </div>
                <h2 className="text-gray-900 dark:text-white font-bold text-xl mb-2">Berita Tidak Ditemukan</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-5 text-sm">
                    Berita dengan ID <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">{id}</code> tidak ditemukan.
                </p>
                <button
                    onClick={() => router.push("/admin/news")}
                    className="px-5 py-2.5 rounded-xl bg-[#E62129] text-white text-sm font-medium hover:bg-[#c4131a] transition-colors"
                >
                    Kembali ke Daftar Berita
                </button>
            </div>
        );
    }

    const categoryId = categories.find((c) => c.name === detail.category)?.id ?? "";

    const initialData: Partial<NewsFormData & { id: string }> = {
        id,
        title: detail.title,
        slug: detail.slug,
        excerpt: detail.excerpt ?? "",
        content: detail.content,
        categoryId,
        author: "Redaksi STTB",
        status: detail.isPublished ? "published" : "draft",
        featured: detail.isFeatured,
        coverImageUrl: detail.thumbnailUrl ?? "",
        tags: [],
    };

    const handleSave = async (data: NewsFormData, status: "draft" | "published") => {
        await updateNews.mutateAsync({
            id,
            payload: {
                title: data.title,
                slug: data.slug,
                content: data.content,
                excerpt: data.excerpt || null,
                thumbnailUrl: data.coverImageUrl || null,
                categoryId: data.categoryId || null,
                isFeatured: data.featured,
                isPublished: status === "published",
            },
        });
        toast.success(status === "draft" ? "Perubahan disimpan sebagai draft" : "Berita berhasil diperbarui!");
        router.push("/admin/news");
    };

    return (
        <NewsForm
            categories={categories}
            initialData={initialData}
            onSave={handleSave}
            backHref="/admin/news"
        />
    );
}
