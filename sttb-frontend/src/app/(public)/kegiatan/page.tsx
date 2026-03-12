import { KegiatanClient } from "./_components/KegiatanClient";

import PageHeader from "@/components/shared/PageHeader";

export default function KegiatanPage() {
  return (
    <>
      <PageHeader
        title="Kegiatan & Acara"
        category="STTB"
        description="Jadwal kegiatan, seminar, kelas, dan acara Sekolah Tinggi Teologi Bandung. Ikuti dan jadilah bagian dari komunitas STTB."
        breadcrumb={[{ label: "Kegiatan", href: "/kegiatan" }]}
      />

      <KegiatanClient />
    </>
  );
}
