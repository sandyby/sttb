"use client";

import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useEventList } from "@/hooks/useEvents";
import { getImageUrl } from "@/libs/api";
import { EventListItem } from "@/types/events";

export function EventsSection() {
  const { data, isLoading } = useEventList({ pageSize: 100 });

  const now = new Date().getTime();
  const closestEvents = [...(data?.items ?? [])]
    .sort((a, b) => {
      const distA = Math.abs(new Date(a.startDate).getTime() - now);
      const distB = Math.abs(new Date(b.startDate).getTime() - now);
      return distA - distB;
    })
    .slice(0, 4);

  return (
    <section className="py-20 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 w-full">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[#E62129] text-sm font-semibold uppercase tracking-wider mb-2">
              Jadwal Kegiatan
            </p>
            <h2
              className="text-gray-900 dark:text-white"
              style={{
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                fontWeight: 700,
              }}
            >
              Kegiatan Mendatang
            </h2>
          </div>
          <Link
            href="/kegiatan"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-sm hover:border-[#E62129] hover:text-[#E62129] transition-all"
          >
            Semua Kegiatan <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden animate-pulse"
              >
                <div className="h-40 bg-gray-100 dark:bg-gray-800" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-3/4" />
                  <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : closestEvents.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p>Belum ada kegiatan yang dijadwalkan.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {closestEvents.map((event, i) => {
              const dateObj = new Date(event.startDate);
              const day = dateObj.toLocaleDateString("id-ID", {
                day: "2-digit",
              });
              const month = dateObj.toLocaleDateString("id-ID", {
                month: "short",
              });
              const imgSrc = getImageUrl(event.imageUrl);

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group flex flex-col bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden bg-gray-100 dark:bg-gray-800">
                    {imgSrc ? (
                      <Image
                        src={imgSrc}
                        alt={event.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300 dark:text-gray-600">
                        <Calendar className="w-10 h-10" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    {/* Date badge */}
                    <div className="absolute top-3 right-3 bg-[#E62129] text-white rounded-lg px-2.5 py-1.5 text-center min-w-[46px]">
                      <div className="font-bold text-lg leading-none">
                        {day}
                      </div>
                      <div className="text-xs uppercase opacity-90">
                        {month}
                      </div>
                    </div>
                    {/* Category */}
                    {event.category && (
                      <div className="absolute bottom-3 left-3">
                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-white/20 backdrop-blur-sm text-white border border-white/30">
                          {event.category}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-4">
                    <h3 className="text-gray-900 dark:text-white font-semibold group-hover:text-[#E62129] transition-colors mb-2 line-clamp-2">
                      {event.title}
                    </h3>
                    <div className="space-y-1.5 text-xs text-gray-500 dark:text-gray-400 mb-3 flex-1">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#E62129]" />
                        <span>
                          {dateObj.toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                          {event.endDate && (
                            <span className="text-gray-400">
                              {" "}
                              –{" "}
                              {new Date(event.endDate).toLocaleDateString(
                                "id-ID",
                                { day: "numeric", month: "long" },
                              )}
                            </span>
                          )}
                        </span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#E62129]" />
                          <span className="line-clamp-1">{event.location}</span>
                        </div>
                      )}
                    </div>

                    {event.registrationUrl ? (
                      <a
                        href={event.registrationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E62129] text-white text-xs font-medium hover:bg-[#c4131a] transition-colors"
                      >
                        Daftar Sekarang
                      </a>
                    ) : (
                      <Link
                        href="/kegiatan"
                        className="inline-flex items-center gap-1 text-[#E62129] text-xs font-medium hover:gap-2 transition-all"
                      >
                        Info Selengkapnya <ArrowRight className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Mobile CTA */}
        <div className="text-center mt-8 md:hidden">
          <Link
            href="/kegiatan"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-sm"
          >
            Lihat Semua Kegiatan <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function EventCard({ event, index }: { event: EventListItem; index: number }) {
  const dateObj = new Date(event.startDate);
  const day = dateObj.toLocaleDateString("id-ID", { day: "2-digit" });
  const month = dateObj.toLocaleDateString("id-ID", { month: "short" });

  return (
    <motion.div
      key={event.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex flex-col bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <Image
          src={event.imageUrl || "/images/placeholder.jpg"}
          alt={event.title}
          fill
          priority
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        {/* Date badge */}
        <div className="absolute top-3 right-3 bg-[#E62129] text-white rounded-lg px-2.5 py-1.5 text-center min-w-[46px]">
          <div className="font-bold text-lg leading-none">{day}</div>
          <div className="text-xs uppercase opacity-90">{month}</div>
        </div>
        {/* Category */}
        <div className="absolute bottom-3 left-3">
          <span className="px-2 py-0.5 rounded text-xs font-medium bg-white/20 backdrop-blur-sm text-white border border-white/30">
            {event.category || "Kegiatan"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <h3 className="text-gray-900 dark:text-white font-semibold group-hover:text-[#E62129] transition-colors mb-2 line-clamp-2">
          {event.title}
        </h3>
        <div className="space-y-1.5 text-xs text-gray-500 dark:text-gray-400 mb-3 flex-1">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#E62129]" />
            <span>
              {dateObj.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
              {event.endDate && (
                <span className="text-gray-400">
                  {" "}
                  –{" "}
                  {new Date(event.endDate).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                  })}
                </span>
              )}
            </span>
          </div>
          {event.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#E62129]" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
          )}
        </div>

        {event.registrationUrl ? (
          <Link
            href={event.registrationUrl}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E62129] text-white text-xs font-medium hover:bg-[#c4131a] transition-colors"
          >
            Daftar Sekarang
          </Link>
        ) : (
          <Link
            href="/kegiatan"
            className="inline-flex items-center gap-1 text-[#E62129] text-xs font-medium hover:gap-2 transition-all"
          >
            Info Selengkapnya <ArrowRight className="w-3 h-3" />
          </Link>
        )}
      </div>
    </motion.div>
  );
}
