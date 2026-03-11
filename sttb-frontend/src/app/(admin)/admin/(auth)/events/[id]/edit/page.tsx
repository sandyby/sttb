"use client";

import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { EventForm, type EventFormData } from "@/components/admin/EventForm";

const initialEvents = [
    { id: "1", title: "Open House STTB – Gelombang III", category: "Admisi", date: "2026-04-10", location: "Kampus STTB Bandung", status: "published" as const, registrationOpen: true, imgUrl: "https://images.unsplash.com/photo-1626025612377-7d5d17362ff9?w=400", description: "Sesi terbuka bagi calon mahasiswa baru untuk mengenal lebih dekat kampus dan program studi STTB." },
    { id: "2", title: "Seminar Kepemimpinan Kristen", category: "Seminar", date: "2026-04-20", location: "Aula STTB", status: "published" as const, registrationOpen: true, imgUrl: "https://images.unsplash.com/photo-1758413350815-7b06dbbfb9a7?w=400", description: "Seminar nasional tentang kepemimpinan transformatif dalam konteks pelayanan gereja." },
    { id: "3", title: "Wisuda STTB Angkatan 2025", category: "Akademik", date: "2026-05-15", location: "Graha Sanusi Hardjadinata", status: "published" as const, registrationOpen: false, imgUrl: "https://images.unsplash.com/photo-1757143137392-0b1e1a27a7de?w=400", description: "Upacara wisuda mahasiswa program S1 dan S2 Angkatan 2025." },
    { id: "4", title: "Mission Education & Exposure (MEET)", category: "Misi", date: "2026-06-01", location: "Lokasi TBD", status: "draft" as const, registrationOpen: false, imgUrl: "https://images.unsplash.com/photo-1764072970350-2ce4f354a483?w=400", description: "Program pembentukan misional mahasiswa selama satu bulan di lapangan misi." },
    { id: "5", title: "Konferensi Teologi Reformed", category: "Konferensi", date: "2026-07-08", location: "Bandung Convention Center", status: "draft" as const, registrationOpen: false, imgUrl: "https://images.unsplash.com/photo-1675099124977-5aab6e554dbd?w=400", description: "Konferensi tahunan bersama gereja-gereja dan institusi Reformed se-Indonesia." },
];

export default function AdminEventEditPage() {
    const router = useRouter();
    const { id } = useParams<{ id: string }>();

    const event = initialEvents.find(e => e.id === id);

    if (!event) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-4">
                    <span className="text-3xl">404</span>
                </div>
                <h2 className="text-gray-900 dark:text-white font-bold text-xl mb-2">Kegiatan Tidak Ditemukan</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-5 text-sm">Kegiatan dengan ID <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">{id}</code> tidak ditemukan.</p>
                <button
                    onClick={() => router.push("/admin/events")}
                    className="px-5 py-2.5 rounded-xl bg-[#E62129] text-white text-sm font-medium hover:bg-[#c4131a] transition-colors"
                >
                    Kembali ke Daftar Kegiatan
                </button>
            </div>
        );
    }

    const handleSave = async (data: EventFormData, status: "draft" | "published") => {
        await new Promise(r => setTimeout(r, 900));

        toast.success(status === "draft" ? "Perubahan disimpan sebagai draft" : "Kegiatan berhasil diperbarui!");
        router.push("/admin/events");
    };

    return (
        <EventForm
            initialData={{ ...event, coverImageUrl: event.imgUrl }}
            onSave={handleSave}
            backHref="/admin/events"
        />
    );
}
