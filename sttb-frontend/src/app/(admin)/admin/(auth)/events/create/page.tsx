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
      isOnGoing: data.onGoing,
      location: data.location || null,
      locationDetails: data.locationDetail || null,
      imageUrl: data.coverImageUrl || null,
      categoryId,
      registrationUrl: data.registrationUrl || null,
      isRegistrationOpen: data.registrationOpen,
      registrationDeadline: data.registrationDeadline || null,
      maxParticipants: data.maxParticipants || null,
      mode: data.mode,
      isOnline: data.isOnline,
      streamingUrl: data.streamingUrl || null,
      organizer: data.organizer || null,
      contactEmail: data.contactEmail || null,
      tags: data.tags || [],
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
