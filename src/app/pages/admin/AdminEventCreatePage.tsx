import React from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { EventForm, type EventFormData } from "../../components/admin/EventForm";

export function AdminEventCreatePage() {
  const navigate = useNavigate();

  const handleSave = async (data: EventFormData, status: "draft" | "published") => {
    await new Promise(r => setTimeout(r, 900));
    toast.success(status === "draft" ? "Kegiatan disimpan sebagai draft" : "Kegiatan berhasil diterbitkan!");
    navigate("/admin/events");
  };

  return <EventForm onSave={handleSave} backHref="/admin/events" />;
}
