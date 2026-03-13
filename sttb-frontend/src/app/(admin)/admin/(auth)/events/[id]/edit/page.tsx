"use client";

import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { EventForm, type EventFormData } from "@/components/admin/EventForm";
import {
  useAdminEventForEdit,
  useAdminUpdateEvent,
} from "@/hooks/useAdminEvents";
import { useEventCategories } from "@/hooks/useEvents";

function toDateString(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function toTimeString(iso: string) {
  const d = new Date(iso);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

export default function AdminEventEditPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { isLoading, event, notFound } = useAdminEventForEdit(id);
  const updateEvent = useAdminUpdateEvent();
  const { data: categories = [] } = useEventCategories();

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-pulse">
        <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded-xl w-1/3" />
        <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
      </div>
    );
  }

  if (notFound || !event) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-4">
          <span className="text-3xl">404</span>
        </div>
        <h2 className="text-gray-900 dark:text-white font-bold text-xl mb-2">
          Kegiatan Tidak Ditemukan
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-5 text-sm">
          Kegiatan dengan ID{" "}
          <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
            {id}
          </code>{" "}
          tidak ditemukan.
        </p>
        <button
          onClick={() => router.push("/admin/events")}
          className="px-5 py-2.5 rounded-xl bg-[#E62129] text-white text-sm font-medium hover:bg-[#c4131a] transition-colors"
        >
          Kembali ke Daftar Kegiatan
        </button>
      </div>
    );
  }

  const initialData: EventFormData & { id: string } = {
    id,
    title: event.title,
    category: event.category ?? "",
    startDate: toDateString(event.startDate),
    startTime: toTimeString(event.startDate),
    endDate: event.endDate ? toDateString(event.endDate) : "",
    endTime: event.endDate ? toTimeString(event.endDate) : "17:00",
    onGoing: event.isOnGoing,
    location: event.location ?? "",
    locationDetail: event.locationDetails ?? "",
    description: event.description,
    coverImageUrl: event.imageUrl ?? "",
    registrationUrl: event.registrationUrl ?? "",
    registrationOpen: event.isRegistrationOpen,
    registrationDeadline: event.registrationDeadline ? toDateString(event.registrationDeadline) : "",
    maxParticipants: event.maxParticipants ?? "",
    status: event.isPublished ? "published" : "draft",
    mode: (event.mode as any) ?? "offline",
    isOnline: event.isOnline,
    streamingUrl: event.streamingUrl ?? "",
    organizer: event.organizer ?? "",
    contactEmail: event.contactEmail ?? "",
    tags: event.tags ?? [],
  };

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

    await updateEvent.mutateAsync({
      id,
      payload: {
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
        registrationDeadline: data.registrationDeadline ? new Date(data.registrationDeadline).toISOString() : null,
        maxParticipants: data.maxParticipants || null,
        mode: data.mode,
        isOnline: data.isOnline,
        streamingUrl: data.streamingUrl || null,
        organizer: data.organizer || null,
        contactEmail: data.contactEmail || null,
        tags: data.tags,
        isPublished: status === "published",
      },
    });

    toast.success(
      status === "draft"
        ? "Perubahan disimpan sebagai draft"
        : "Kegiatan berhasil diperbarui!",
    );
    router.push("/admin/events");
  };

  return (
    <EventForm
      initialData={initialData}
      onSave={handleSave}
      backHref="/admin/events"
    />
  );
}
