import { Suspense } from "react";
import { NewsFilters } from "./_components/NewsFilters";
import { NewsGrid } from "./_components/NewsGrid";

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

      {/* Filters */}
      <Suspense>
        <NewsFilters />
      </Suspense>

      {/* News Grid */}
      <div className="py-14 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <Suspense>
            <NewsGrid />
          </Suspense>
        </div>
      </div>
    </>
  );
}
