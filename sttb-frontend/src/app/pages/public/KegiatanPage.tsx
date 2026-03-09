import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, MapPin, Clock, ChevronLeft, ChevronRight, Tag } from "lucide-react";
import { FadeIn, StaggerGroup, StaggerItem } from "../../components/ui/FadeIn";

type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  organizer: string;
  status: "upcoming" | "ongoing" | "expired";
  featured?: boolean;
};

const categories = [
  "Semua",
  "Seminar",
  "Kelas Sit In",
  "Ibadah Kapel",
  "Retreat",
  "Pelatihan",
  "Kursus",
  "Kemitraan",
];

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Kelas Sit In Magister Pendidikan Kristen",
    date: "2026-03-09",
    time: "16:00 – 21:00",
    location: "Kampus STTB Bandung",
    category: "Kelas Sit In",
    organizer: "Divisi Akademik STTB",
    status: "ongoing",
    featured: true,
  },
  {
    id: "2",
    title: "PERSPECTIVES STUDY PROGRAM (PSP) ONLINE",
    date: "2026-03-10",
    time: "19:00 – 21:30",
    location: "STTB Zoom 1",
    category: "Kursus",
    organizer: "Divisi LEAD STTB",
    status: "upcoming",
    featured: true,
  },
  {
    id: "3",
    title: "Little STEP #5",
    date: "2026-03-15",
    time: "08:00 – 17:00",
    location: "Aula STTB Bandung",
    category: "Pelatihan",
    organizer: "Divisi Kemahasiswaan STTB",
    status: "upcoming",
    featured: false,
  },
  {
    id: "4",
    title: "Vocatio Marketplace Fellow Batch 5",
    date: "2026-03-20",
    time: "09:00 – 17:00",
    location: "Kampus STTB Bandung",
    category: "Kursus",
    organizer: "Divisi LEAD STTB",
    status: "upcoming",
    featured: false,
  },
  {
    id: "5",
    title: "Kelas Sit In Magister Teologi & Pelayanan Gerejawi",
    date: "2026-03-22",
    time: "17:00 – 21:00",
    location: "Ruang Kelas STTB",
    category: "Kelas Sit In",
    organizer: "Divisi Akademik STTB",
    status: "upcoming",
    featured: false,
  },
  {
    id: "6",
    title: "Open House S1 dan S2",
    date: "2026-04-05",
    time: "10:00 – 15:00",
    location: "Kampus STTB Bandung",
    category: "Seminar",
    organizer: "Divisi Admisi STTB",
    status: "upcoming",
    featured: false,
  },
  {
    id: "7",
    title: "Seminar Apologetika Kristen",
    date: "2026-04-12",
    time: "09:00 – 16:00",
    location: "Aula STTB Bandung",
    category: "Seminar",
    organizer: "Institusi STTB",
    status: "upcoming",
    featured: false,
  },
  {
    id: "8",
    title: "Ibadah Kapel Minggu",
    date: "2026-03-16",
    time: "09:00 – 10:30",
    location: "Kapel STTB",
    category: "Ibadah Kapel",
    organizer: "Divisi Kemahasiswaan STTB",
    status: "upcoming",
    featured: false,
  },
  {
    id: "9",
    title: "Magister Ministri Marketplace Kohort Balikpapan",
    date: "2026-04-18",
    time: "18:00 – 21:00",
    location: "Online / Zoom",
    category: "Kelas Sit In",
    organizer: "Divisi Akademik STTB",
    status: "upcoming",
    featured: false,
  },
];

const MONTHS = [
  "Januari","Februari","Maret","April","Mei","Juni",
  "Juli","Agustus","September","Oktober","November","Desember",
];

function CalendarMini({
  year,
  month,
  events,
}: {
  year: number;
  month: number;
  events: Event[];
}) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;
  const eventDays = new Set(
    events
      .filter((e) => {
        const d = new Date(e.date);
        return d.getFullYear() === year && d.getMonth() === month;
      })
      .map((e) => new Date(e.date).getDate())
  );

  const cells: (number | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div>
      <div className="grid grid-cols-7 gap-0.5 mb-2">
        {["Sen","Sel","Rab","Kam","Jum","Sab","Min"].map((d) => (
          <div key={d} className="text-center text-gray-400 dark:text-gray-500 text-xs py-1 font-medium">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((day, idx) => {
          const hasEvent = day && eventDays.has(day);
          return (
            <div
              key={idx}
              className={`text-center text-xs py-1.5 rounded-md transition-colors ${
                !day
                  ? ""
                  : hasEvent
                  ? "bg-[#E62129] text-white font-bold cursor-pointer"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-default"
              }`}
            >
              {day || ""}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const statusConfig = {
  upcoming: { label: "Mendatang", cls: "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300" },
  ongoing: { label: "Berlangsung", cls: "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300" },
  expired: { label: "Selesai", cls: "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400" },
};

export function KegiatanPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [currentMonth, setCurrentMonth] = useState(2); // March = 2
  const currentYear = 2026;

  const filtered =
    activeCategory === "Semua"
      ? mockEvents
      : mockEvents.filter((e) => e.category === activeCategory);

  const featuredEvents = mockEvents.filter((e) => e.featured);

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#7FB4E5] text-sm font-medium uppercase tracking-wider mb-2">
              STTB
            </p>
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
          </motion.div>
        </div>
      </div>

      {/* Featured events */}
      {featuredEvents.length > 0 && (
        <section className="py-10 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4">
            <FadeIn>
              <p className="text-[#E62129] text-sm font-semibold uppercase tracking-wider mb-5">
                Featured
              </p>
            </FadeIn>
            <StaggerGroup staggerDelay={0.1} className="grid md:grid-cols-2 gap-4">
              {featuredEvents.map((ev) => {
                const d = new Date(ev.date);
                return (
                  <StaggerItem key={ev.id}>
                    <div className="flex gap-4 p-4 bg-gradient-to-r from-[#0A2C74]/5 to-transparent rounded-xl border border-[#0A2C74]/20 dark:border-[#0570CD]/20 hover:shadow-md transition-shadow">
                      <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-[#E62129] flex flex-col items-center justify-center text-white">
                        <span className="text-lg font-bold leading-none">
                          {d.getDate().toString().padStart(2, "0")}
                        </span>
                        <span className="text-xs opacity-80 uppercase">
                          {MONTHS[d.getMonth()].slice(0, 3)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="inline-block px-2 py-0.5 rounded bg-[#E62129]/10 text-[#E62129] text-xs font-medium mb-1">
                          Featured
                        </span>
                        <h3 className="text-gray-900 dark:text-white font-semibold text-sm line-clamp-2 leading-snug">
                          {ev.title}
                        </h3>
                        <div className="flex items-center gap-1 mt-1 text-gray-500 dark:text-gray-400 text-xs">
                          <Clock className="w-3 h-3" />
                          <span>{ev.time}</span>
                          <span className="mx-1">·</span>
                          <MapPin className="w-3 h-3" />
                          <span className="truncate">{ev.location}</span>
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerGroup>
          </div>
        </section>
      )}

      <section className="py-12 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Sidebar: Calendar + categories */}
            <div className="space-y-6">
              {/* Mini calendar */}
              <FadeIn direction="left">
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-900 dark:text-white font-semibold text-sm">
                      {MONTHS[currentMonth]} {currentYear}
                    </h3>
                    <div className="flex gap-1">
                      <button
                        onClick={() => setCurrentMonth((m) => Math.max(0, m - 1))}
                        className="w-7 h-7 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4 text-gray-500" />
                      </button>
                      <button
                        onClick={() => setCurrentMonth((m) => Math.min(11, m + 1))}
                        className="w-7 h-7 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors"
                      >
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </div>
                  <CalendarMini
                    year={currentYear}
                    month={currentMonth}
                    events={mockEvents}
                  />
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <div className="w-3 h-3 rounded-sm bg-[#E62129]" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">Ada kegiatan</span>
                  </div>
                </div>
              </FadeIn>

              {/* Categories */}
              <FadeIn direction="left" delay={0.1}>
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5">
                  <h3 className="text-gray-900 dark:text-white font-semibold text-sm mb-3 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-[#E62129]" />
                    Kategori
                  </h3>
                  <div className="space-y-1">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          activeCategory === cat
                            ? "bg-[#E62129] text-white font-medium"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Events list */}
            <div className="lg:col-span-2">
              <FadeIn>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-gray-900 dark:text-white font-semibold">
                    {activeCategory === "Semua" ? "Semua Kegiatan" : activeCategory}
                    <span className="text-gray-400 dark:text-gray-500 font-normal text-sm ml-2">
                      ({filtered.length})
                    </span>
                  </h2>
                </div>
              </FadeIn>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {filtered.length === 0 ? (
                    <div className="text-center py-16 text-gray-400 dark:text-gray-600">
                      <Calendar className="w-10 h-10 mx-auto mb-3 opacity-50" />
                      <p>Tidak ada kegiatan dalam kategori ini.</p>
                    </div>
                  ) : (
                    filtered.map((ev, i) => {
                      const d = new Date(ev.date);
                      const s = statusConfig[ev.status];
                      return (
                        <motion.div
                          key={ev.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05, duration: 0.4 }}
                          className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5 hover:shadow-md transition-all group"
                        >
                          <div className="flex gap-4">
                            <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-[#E62129] flex flex-col items-center justify-center text-white">
                              <span className="text-xl font-bold leading-none">
                                {d.getDate().toString().padStart(2, "0")}
                              </span>
                              <span className="text-xs opacity-80 uppercase">
                                {MONTHS[d.getMonth()].slice(0, 3)}
                              </span>
                              <span className="text-xs opacity-60">{d.getFullYear()}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap mb-1">
                                <span
                                  className={`px-2 py-0.5 rounded text-xs font-medium ${s.cls}`}
                                >
                                  {s.label}
                                </span>
                                <span className="text-gray-400 dark:text-gray-500 text-xs">
                                  {ev.category}
                                </span>
                              </div>
                              <h3 className="text-gray-900 dark:text-white font-semibold leading-snug group-hover:text-[#E62129] transition-colors">
                                {ev.title}
                              </h3>
                              <div className="flex items-center gap-4 mt-2 text-gray-500 dark:text-gray-400 text-xs flex-wrap">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" /> {ev.time}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" /> {ev.location}
                                </span>
                              </div>
                              <p className="text-gray-400 dark:text-gray-500 text-xs mt-1.5">
                                Penyelenggara: {ev.organizer}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })
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
