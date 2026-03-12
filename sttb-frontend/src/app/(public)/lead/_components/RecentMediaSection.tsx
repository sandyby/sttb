"use client";

import { Play, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";
import { FadeIn, StaggerGroup, StaggerItem } from "@/components/ui/FadeIn";
import { getImageUrl } from "@/libs/api";
import { useMediaList } from "@/hooks/useMedia";

export function RecentMediaSection() {
  const { data, isLoading } = useMediaList({ pageSize: 3 });
  const recentMedia = data?.items ?? [];

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-center py-10 text-gray-400">
            <div className="w-5 h-5 border-2 border-[#E62129] border-t-transparent rounded-full animate-spin mr-3" />
            Memuat media...
          </div>
        </div>
      </section>
    );
  }

  if (recentMedia.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-5xl mx-auto px-4">
        <FadeIn>
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-[#E62129] text-sm font-semibold uppercase tracking-wider mb-1">
                Media Terbaru
              </p>
              <h2
                className="text-gray-900 dark:text-white"
                style={{ fontWeight: 700, fontSize: "1.5rem" }}
              >
                Konten dari LEAD Center
              </h2>
            </div>
            <Link
              href="/media"
              className="hidden sm:flex items-center gap-2 text-[#E62129] text-sm font-medium hover:underline"
            >
              Lihat Semua <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </FadeIn>

        <StaggerGroup staggerDelay={0.12} className="grid md:grid-cols-3 gap-5">
          {recentMedia.map((item) => {
            const thumb = getImageUrl(item.thumbnailUrl);
            const isVideo = item.type === "video";
            return (
              <StaggerItem key={item.id}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-shadow group block"
                >
                  <div className="relative overflow-hidden">
                    {thumb ? (
                      <img
                        src={thumb}
                        alt={item.title}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-40 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        {isVideo ? (
                          <Play className="w-8 h-8 text-gray-300 dark:text-gray-600" />
                        ) : (
                          <FileText className="w-8 h-8 text-gray-300 dark:text-gray-600" />
                        )}
                      </div>
                    )}
                    <span
                      className={`absolute top-3 left-3 px-2 py-0.5 rounded text-white text-xs font-medium ${isVideo ? "bg-[#E62129]" : "bg-[#0A2C74]"}`}
                    >
                      {isVideo ? "Video" : "Artikel"}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-400 dark:text-gray-500 text-xs mb-2">
                      {new Date(item.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <h3 className="text-gray-900 dark:text-white font-semibold text-sm leading-snug line-clamp-2 group-hover:text-[#E62129] transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </a>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        <div className="text-center mt-8 sm:hidden">
          <Link
            href="/media"
            className="inline-flex items-center gap-2 text-[#E62129] text-sm font-medium hover:underline"
          >
            Lihat Semua Media <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
