"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { EventForm, type EventFormData } from "@/components/admin/EventForm";
import { useAdminCreateEvent } from "@/hooks/useAdminEvents";
import { useEventCategories } from "@/hooks/useEvents";

export default function AdminEventCreatePage() {
  const router = useRouter();
  const createEvent = useAdminCreateEvent();
  const { data: categories = [] } = useEventCategories();

  const handleSave = async (
    data: EventFormData,
    status: "draft" | "published",
  ) => {
    const startDate = data.startTime
      ? new Date(`${data.startDate}T${data.startTime}:00`).toISOString()
      : new Date(data.startDate).toISOString();

    const endDate = data.endDate
      ? data.endTime
        ? new Date(`${data.endDate}T${data.endTime}:00`).toISOString()
        : new Date(data.endDate).toISOString()
      : null;

    const categoryId =
      categories.find((c) => c.name === data.category)?.id ?? null;

    await createEvent.mutateAsync({
      title: data.title,
      description: data.description,
      startDate,
      endDate,
      location: data.location || null,
      imageUrl: data.coverImageUrl || null,
      categoryId,
      registrationUrl: data.registrationUrl || null,
      isPublished: status === "published",
    });

    toast.success(
      status === "draft"
        ? "Kegiatan disimpan sebagai draft"
        : "Kegiatan berhasil diterbitkan!",
    );
    router.push("/admin/events");
  };

  return <EventForm onSave={handleSave} backHref="/admin/events" />;
}
