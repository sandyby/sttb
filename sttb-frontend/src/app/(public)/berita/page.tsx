import { Suspense } from "react";
import { BeritaClient } from "./_components/BeritaClient";

export default function BeritaPage() {
  return (
    <>
      {/* Page Header */}
      <div className="bg-[#0A2C74] pt-28 pb-14">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-[#7FB4E5] text-sm font-medium uppercase tracking-wider mb-2">
            Informasi Terkini
          </p>
          <h1
            className="text-white mb-3"
            style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 700 }}
          >
            Berita STTB
          </h1>
          <p className="text-blue-200 max-w-xl">
            Ikuti perkembangan terbaru dari Sekolah Tinggi Teologi Bandung —
            kegiatan akademik, konferensi, dan informasi penting lainnya.
          </p>
        </div>
      </div>

      <Suspense>
        <BeritaClient />
      </Suspense>
    </>
  );
}
