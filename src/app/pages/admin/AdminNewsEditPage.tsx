import React from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { NewsForm, type NewsFormData } from "../../components/admin/NewsForm";
import { newsArticles } from "../../data/mock-data";

export function AdminNewsEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const article = newsArticles.find(a => a.id === id);

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-4">
          <span className="text-3xl">404</span>
        </div>
        <h2 className="text-gray-900 dark:text-white font-bold text-xl mb-2">Berita Tidak Ditemukan</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-5 text-sm">Berita dengan ID <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">{id}</code> tidak ditemukan.</p>
        <button
          onClick={() => navigate("/admin/news")}
          className="px-5 py-2.5 rounded-xl bg-[#E62129] text-white text-sm font-medium hover:bg-[#c4131a] transition-colors"
        >
          Kembali ke Daftar Berita
        </button>
      </div>
    );
  }

  const handleSave = async (data: NewsFormData, status: "draft" | "published") => {
    // Simulate API call — in prod: PUT /api/news/:id
    await new Promise(r => setTimeout(r, 900));
    toast.success(status === "draft" ? "Perubahan disimpan sebagai draft" : "Berita berhasil diperbarui dan diterbitkan!");
    navigate("/admin/news");
  };

  return (
    <NewsForm
      initialData={article}
      onSave={handleSave}
      backHref="/admin/news"
    />
  );
}
