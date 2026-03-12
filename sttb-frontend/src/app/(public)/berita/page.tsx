import { Suspense } from "react";
import { BeritaClient } from "./_components/BeritaClient";

import PageHeader from "@/components/shared/PageHeader";

export default function BeritaPage() {
  return (
    <>
      <PageHeader
        title="Berita STTB"
        category="Informasi Terkini"
        description="Ikuti perkembangan terbaru dari Sekolah Tinggi Teologi Bandung — kegiatan akademik, konferensi, dan informasi penting lainnya."
        breadcrumb={[{ label: "Berita", href: "/berita" }]}
      />

      <Suspense>
        <BeritaClient />
      </Suspense>
    </>
  );
}
