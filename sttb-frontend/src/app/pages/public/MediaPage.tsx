import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, FileText, Search, ExternalLink } from "lucide-react";
import { FadeIn, StaggerGroup, StaggerItem } from "../../components/ui/FadeIn";

type Format = "Semua" | "Video" | "Artikel";
type Category =
  | "Semua"
  | "Apologetika & Worldview"
  | "Belajar & Mengajar"
  | "Biblika"
  | "Misi & Penginjilan"
  | "Pastoral & Kepemimpinan"
  | "Pelayanan Anak"
  | "Pelayanan Remaja-Pemuda"
  | "Pendidikan Sekolah"
  | "Pendidikan Teologi"
  | "Penelitian & Penulisan"
  | "Spiritualitas"
  | "Etika"
  | "Historika"
  | "Pelayanan Keluarga"
  | "Pelayanan Dunia Kerja"
  | "Pembelajaran Digital"
  | "Pemuridan & Pembinaan"
  | "Sistematika";

type MediaItem = {
  id: string;
  title: string;
  date: string;
  format: "Video" | "Artikel";
  category: string;
  tag?: string;
  img: string;
};

const formats: Format[] = ["Semua", "Video", "Artikel"];
const categories: Category[] = [
  "Semua",
  "Apologetika & Worldview",
  "Belajar & Mengajar",
  "Biblika",
  "Misi & Penginjilan",
  "Pastoral & Kepemimpinan",
  "Pelayanan Anak",
  "Pelayanan Remaja-Pemuda",
  "Pendidikan Sekolah",
  "Pendidikan Teologi",
  "Penelitian & Penulisan",
  "Spiritualitas",
  "Etika",
  "Historika",
  "Pelayanan Keluarga",
  "Pelayanan Dunia Kerja",
  "Pembelajaran Digital",
  "Pemuridan & Pembinaan",
  "Sistematika",
];

const mediaItems: MediaItem[] = [
  {
    id: "1",
    title: 'City TransForMission #2: "Fokus Strategis Misi Urban"',
    date: "20 April 2023",
    format: "Video",
    category: "Misi & Penginjilan",
    tag: "LEAD",
    img: "https://images.unsplash.com/photo-1675099124977-5aab6e554dbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
  },
  {
    id: "2",
    title: 'City TransForMission #01: "Urbanisasi & Misi"',
    date: "2 Maret 2023",
    format: "Video",
    category: "Misi & Penginjilan",
    tag: "UMC",
    img: "https://images.unsplash.com/photo-1607332796965-436d1bf61731?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
  },
  {
    id: "3",
    title: "Persembahan Pujian STTB untuk Pelayanan Sekolah Minggu",
    date: "3 Desember 2022",
    format: "Video",
    category: "Pelayanan Anak",
    tag: "STT Bandung",
    img: "https://images.unsplash.com/photo-1759874685095-8378bf6e7f57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
  },
  {
    id: "4",
    title: "Unboxing Lifeguide Bible Studies",
    date: "10 November 2022",
    format: "Video",
    category: "Pemuridan & Pembinaan",
    tag: "Disciplesight",
    img: "https://images.unsplash.com/photo-1527649144814-b7d57216058c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
  },
  {
    id: "5",
    title: "Pelatihan Mahasiswa STTB: Pembuatan Pupuk Kompos Dari Sampah Organik",
    date: "6 September 2022",
    format: "Video",
    category: "Pelayanan Dunia Kerja",
    tag: "STT Bandung",
    img: "https://images.unsplash.com/photo-1722962674485-d34e69a9a406?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
  },
  {
    id: "6",
    title: "Mengenal Siapa STTB dan Visi Nya (Profil STTB 2022)",
    date: "1 September 2022",
    format: "Video",
    category: "Pendidikan Teologi",
    tag: "STT Bandung",
    img: "https://images.unsplash.com/photo-1716625862188-f421d41bfb66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
  },
  {
    id: "7",
    title: "Disciplesight (Discipleship Insight) STTB: Figital Discipleship",
    date: "20 Agustus 2022",
    format: "Video",
    category: "Pemuridan & Pembinaan",
    tag: "Disciplesight",
    img: "https://images.unsplash.com/photo-1757143137392-0b1e1a27a7de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
  },
  {
    id: "8",
    title: "Integrasi Iman dan Ilmu: Menuju Pendekatan yang Lebih Holistik",
    date: "20 Agustus 2022",
    format: "Artikel",
    category: "Belajar & Mengajar",
    img: "https://images.unsplash.com/photo-1771323994415-aba85604d4b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
  },
  {
    id: "9",
    title: "Pendidikan Teologi Di Tengah Dunia Yang Sedang Berubah",
    date: "20 Agustus 2021",
    format: "Artikel",
    category: "Pendidikan Teologi",
    img: "https://images.unsplash.com/photo-1527649144814-b7d57216058c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
  },
  {
    id: "10",
    title: "Menghadirkan Blended Learning dalam Pendidikan Teologi",
    date: "4 Maret 2021",
    format: "Artikel",
    category: "Pembelajaran Digital",
    img: "https://images.unsplash.com/photo-1607332796965-436d1bf61731?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
  },
  {
    id: "11",
    title: "Lahirnya Normal Baru di Keluarga, Sekolah, dan Gereja",
    date: "21 Agustus 2020",
    format: "Artikel",
    category: "Pelayanan Keluarga",
    img: "https://images.unsplash.com/photo-1675099124977-5aab6e554dbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
  },
  {
    id: "12",
    title: 'Menjalani Kehidupan di Era "NEW NORMAL"',
    date: "20 Agustus 2020",
    format: "Artikel",
    category: "Spiritualitas",
    img: "https://images.unsplash.com/photo-1722962674485-d34e69a9a406?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
  },
];

const externalLinks = [
  { label: "Jurnal STULOS", href: "#" },
  { label: "OJS", href: "http://e-journal.sttb.ac.id/" },
  { label: "Buletin STTB", href: "#" },
  { label: "Monograf", href: "#" },
  { label: "Katalog Fisik", href: "http://library.sttb.ac.id" },
  { label: "EBSCO Host", href: "https://search.ebscohost.com/Login.aspx" },
  { label: "Jurnal ATLA", href: "#" },
];

export function MediaPage() {
  const [activeFormat, setActiveFormat] = useState<Format>("Semua");
  const [activeCategory, setActiveCategory] = useState<Category>("Semua");
  const [searchQ, setSearchQ] = useState("");

  const filtered = mediaItems.filter((m) => {
    const formatMatch = activeFormat === "Semua" || m.format === activeFormat;
    const catMatch = activeCategory === "Semua" || m.category === activeCategory;
    const searchMatch =
      !searchQ || m.title.toLowerCase().includes(searchQ.toLowerCase());
    return formatMatch && catMatch && searchMatch;
  });

  return (
    <>
      {/* Hero */}
      <div className="pt-28 pb-20 bg-gradient-to-br from-[#0A2C74] to-[#0570CD] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full border-4 border-white" />
          <div className="absolute top-1/2 right-1/3 w-40 h-40 rounded-full border-4 border-white" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#7FB4E5] text-sm font-medium uppercase tracking-wider mb-2">
              Format · Media
            </p>
            <h1
              className="text-white mb-4"
              style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 700 }}
            >
              Media STTB
            </h1>
            <p className="text-blue-200 max-w-2xl leading-relaxed">
              Artikel, video, dan konten multimedia dari Sekolah Tinggi Teologi Bandung —
              memperlengkapi umat Allah dengan sumber daya pembelajaran berkualitas.
            </p>
          </motion.div>
        </div>
      </div>

      {/* External links bar */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap gap-2">
          {externalLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs hover:bg-[#E62129] hover:text-white transition-colors"
            >
              {l.label}
              <ExternalLink className="w-3 h-3" />
            </a>
          ))}
        </div>
      </div>

      <section className="py-12 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="space-y-5">
              <FadeIn direction="left">
                {/* Search */}
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Cari media..."
                      value={searchQ}
                      onChange={(e) => setSearchQ(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#E62129]/30"
                    />
                  </div>
                </div>

                {/* Format filter */}
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4">
                  <p className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">
                    Format
                  </p>
                  <div className="space-y-1">
                    {formats.map((f) => (
                      <button
                        key={f}
                        onClick={() => setActiveFormat(f)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                          activeFormat === f
                            ? "bg-[#E62129] text-white font-medium"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                        }`}
                      >
                        {f === "Video" && <Play className="w-3 h-3" />}
                        {f === "Artikel" && <FileText className="w-3 h-3" />}
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category filter */}
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4 max-h-80 overflow-y-auto">
                  <p className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">
                    Topik / Kategori
                  </p>
                  <div className="space-y-1">
                    {categories.map((c) => (
                      <button
                        key={c}
                        onClick={() => setActiveCategory(c as Category)}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors ${
                          activeCategory === c
                            ? "bg-[#0A2C74] text-white font-medium"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Content grid */}
            <div className="lg:col-span-3">
              <FadeIn>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-gray-900 dark:text-white font-semibold">
                    {activeFormat === "Semua" ? "Semua Media" : activeFormat}
                    {activeCategory !== "Semua" && (
                      <span className="text-gray-400 dark:text-gray-500 font-normal text-sm ml-2">
                        · {activeCategory}
                      </span>
                    )}
                    <span className="text-gray-400 dark:text-gray-500 font-normal text-sm ml-2">
                      ({filtered.length})
                    </span>
                  </h2>
                </div>
              </FadeIn>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeFormat}-${activeCategory}-${searchQ}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4"
                >
                  {filtered.length === 0 ? (
                    <div className="col-span-3 text-center py-16 text-gray-400 dark:text-gray-600">
                      <FileText className="w-10 h-10 mx-auto mb-3 opacity-50" />
                      <p>Tidak ada konten yang sesuai.</p>
                    </div>
                  ) : (
                    filtered.map((item, i) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.4 }}
                        className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all group cursor-pointer"
                      >
                        <div className="relative overflow-hidden">
                          <img
                            src={item.img}
                            alt={item.title}
                            className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                          <div className="absolute top-3 left-3 flex gap-1.5">
                            <span
                              className={`px-2 py-0.5 rounded text-white text-xs font-medium ${
                                item.format === "Video"
                                  ? "bg-[#E62129]"
                                  : "bg-[#0A2C74]"
                              }`}
                            >
                              {item.format === "Video" ? (
                                <span className="flex items-center gap-1">
                                  <Play className="w-2.5 h-2.5 fill-current" /> Video
                                </span>
                              ) : (
                                <span className="flex items-center gap-1">
                                  <FileText className="w-2.5 h-2.5" /> Artikel
                                </span>
                              )}
                            </span>
                            {item.tag && (
                              <span className="px-2 py-0.5 rounded bg-white/20 text-white text-xs font-medium backdrop-blur-sm">
                                {item.tag}
                              </span>
                            )}
                          </div>
                          {item.format === "Video" && (
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                                <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-gray-400 dark:text-gray-500 text-xs">{item.date}</span>
                            <span className="text-gray-200 dark:text-gray-700">·</span>
                            <span className="text-[#0570CD] text-xs">{item.category}</span>
                          </div>
                          <h3 className="text-gray-900 dark:text-white font-semibold text-sm leading-snug line-clamp-2 group-hover:text-[#E62129] transition-colors">
                            {item.title}
                          </h3>
                        </div>
                      </motion.div>
                    ))
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
