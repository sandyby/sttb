import React from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { NewsForm, type NewsFormData } from "../../components/admin/NewsForm";

export function AdminNewsCreatePage() {
  const navigate = useNavigate();

  const handleSave = async (data: NewsFormData, status: "draft" | "published") => {
    // Simulate API call
    await new Promise(r => setTimeout(r, 900));
    toast.success(status === "draft" ? "Berita disimpan sebagai draft" : "Berita berhasil diterbitkan!");
    navigate("/admin/news");
  };

  return <NewsForm onSave={handleSave} backHref="/admin/news" />;
}
