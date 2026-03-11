"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, MapPin, Clock, ChevronLeft, ChevronRight, Tag, ExternalLink } from "lucide-react";
import { FadeIn, StaggerGroup, StaggerItem } from "@/components/ui/FadeIn";
import { useEventList, useEventCategories } from "@/hooks/useEvents";
import type { EventListItem } from "@/types/events";

const MONTHS = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

type EventStatus = "upcoming" | "ongoing" | "expired";

function getStatus(startDate: string, endDate: string | null): EventStatus {
  const now = new Date();
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : null;

  if (now < start) return "upcoming";
  if (end && now <= end) return "ongoing";
  if (!end && now.toDateString() === start.toDateString()) return "ongoing";
  return "expired";
}

const statusConfig: Record<EventStatus, { label: string; cls: string }> = {
  upcoming: { label: "Mendatang", cls: "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300" },
  ongoing: { label: "Berlangsung", cls: "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300" },
  expired: { label: "Selesai", cls: "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400" },
};

function CalendarMini({
  year,
  month,
  events,
}: {
  year: number;
  month: number;
  events: EventListItem[];
}) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;
  const eventDays = new Set(
    events
      .filter((e) => {
        const d = new Date(e.startDate);
        return d.getFullYear() === year && d.getMonth() === month;
      })
      .map((e) => new Date(e.startDate).getDate()),
  );

  const cells: (number | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div>
      <div className="grid grid-cols-7 gap-0.5 mb-2">
        {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map((d) => (
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

const PAGE_SIZE = 5;

export function KegiatanClient() {
  const now = new Date();
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());
  const [currentYear, setCurrentYear] = useState(now.getFullYear());

  const { data: eventData, isLoading: eventsLoading } = useEventList({ pageSize: 100 });
  const { data: categories = [] } = useEventCategories();

  const events = eventData?.items ?? [];

  const filtered =
    activeCategory === "Semua"
      ? events
      : events.filter((e) => e.category === activeCategory);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const upcomingEvents = events
    .filter((e) => getStatus(e.startDate, e.endDate) !== "expired")
    .slice(0, 4);

  function prevMonth() {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  }

  function nextMonth() {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  }

  const allCategories = ["Semua", ...categories];

  if (eventsLoading) {
    return (
      <section className="py-12 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center py-20 text-gray-400">
            <div className="w-6 h-6 border-2 border-[#E62129] border-t-transparent rounded-full animate-spin mr-3" />
            Memuat kegiatan...
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Upcoming events strip */}
      {upcomingEvents.length > 0 && (
        <section className="py-10 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4">
            <FadeIn>
              <p className="text-[#E62129] text-sm font-semibold uppercase tracking-wider mb-5">
                Segera Berlangsung
              </p>
            </FadeIn>
            <StaggerGroup staggerDelay={0.1} className="grid md:grid-cols-2 gap-4">
              {upcomingEvents.map((ev) => {
                const d = new Date(ev.startDate);
                const status = getStatus(ev.startDate, ev.endDate);
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
                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium mb-1 ${statusConfig[status].cls}`}>
                          {statusConfig[status].label}
                        </span>
                        <h3 className="text-gray-900 dark:text-white font-semibold text-sm line-clamp-2 leading-snug">
                          {ev.title}
                        </h3>
                        {ev.location && (
                          <div className="flex items-center gap-1 mt-1 text-gray-500 dark:text-gray-400 text-xs">
                            <MapPin className="w-3 h-3" />
                            <span className="truncate">{ev.location}</span>
                          </div>
                        )}
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
                        onClick={prevMonth}
                        className="w-7 h-7 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4 text-gray-500" />
                      </button>
                      <button
                        onClick={nextMonth}
                        className="w-7 h-7 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors"
                      >
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </div>
                  <CalendarMini year={currentYear} month={currentMonth} events={events} />
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
                    {allCategories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => { setActiveCategory(cat); setCurrentPage(1); }}
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
                  key={`${activeCategory}-${currentPage}`}
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
                    paginated.map((ev, i) => {
                      const d = new Date(ev.startDate);
                      const status = getStatus(ev.startDate, ev.endDate);
                      const s = statusConfig[status];
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
                                <span className={`px-2 py-0.5 rounded text-xs font-medium ${s.cls}`}>
                                  {s.label}
                                </span>
                                {ev.category && (
                                  <span className="text-gray-400 dark:text-gray-500 text-xs">
                                    {ev.category}
                                  </span>
                                )}
                              </div>
                              <h3 className="text-gray-900 dark:text-white font-semibold leading-snug group-hover:text-[#E62129] transition-colors">
                                {ev.title}
                              </h3>
                              <div className="flex items-center gap-4 mt-2 text-gray-500 dark:text-gray-400 text-xs flex-wrap">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
                                  {ev.endDate && (
                                    <> – {new Date(ev.endDate).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}</>
                                  )}
                                </span>
                                {ev.location && (
                                  <span className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3" /> {ev.location}
                                  </span>
                                )}
                              </div>
                              {ev.registrationUrl && (
                                <a
                                  href={ev.registrationUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 mt-2 text-xs text-[#E62129] hover:underline font-medium"
                                >
                                  Daftar Sekarang <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setCurrentPage(p)}
                      className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                        currentPage === p
                          ? "bg-[#E62129] text-white"
                          : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-[#E62129] hover:text-[#E62129]"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
