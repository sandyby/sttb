"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { EventForm, type EventFormData } from "@/components/admin/EventForm";

export default function AdminEventCreatePage() {
    const router = useRouter();

    const handleSave = async (data: EventFormData, status: "draft" | "published") => {
        await new Promise(r => setTimeout(r, 900));

        toast.success(status === "draft" ? "Kegiatan disimpan sebagai draft" : "Kegiatan berhasil diterbitkan!");
        router.push("/admin/events");
    };

    return (
        <EventForm
            onSave={handleSave}
            backHref="/admin/events"
        />
    );
}