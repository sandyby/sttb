import { getEventList, getEventCategories } from "@/lib/api";
import { KegiatanClient } from "./_components/KegiatanClient";

export default async function KegiatanPage() {
  const [data, categories] = await Promise.all([
    getEventList({ pageSize: 100 }),
    getEventCategories(),
  ]);

  return (
    <>
      {/* Hero */}
      <div className="pt-28 pb-20 bg-gradient-to-br from-[#0A2C74] to-[#0570CD] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 gap-4 h-full">
            {[...Array(48)].map((_, i) => (
              <div key={i} className="border border-white rounded-lg" />
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <p className="text-[#7FB4E5] text-sm font-medium uppercase tracking-wider mb-2">STTB</p>
          <h1
            className="text-white mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 700 }}
          >
            Kegiatan & Acara
          </h1>
          <p className="text-blue-200 max-w-2xl leading-relaxed">
            Jadwal kegiatan, seminar, kelas, dan acara Sekolah Tinggi Teologi Bandung.
            Ikuti dan jadilah bagian dari komunitas STTB.
          </p>
        </div>
      </div>

      <KegiatanClient events={data.items} categories={categories} />
    </>
  );
}
