"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, FileText, Search } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { getImageUrl } from "@/lib/api";
import { useMediaList, useMediaCategories } from "@/hooks/useMedia";

type Format = "Semua" | "Video" | "Artikel";

const FORMAT_MAP: Record<Exclude<Format, "Semua">, string> = {
  Video: "video",
  Artikel: "article",
};

const formats: Format[] = ["Semua", "Video", "Artikel"];

const PAGE_SIZE = 9;

export function MediaClient() {
  const [activeFormat, setActiveFormat] = useState<Format>("Semua");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQ, setSearchQ] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: mediaData, isLoading } = useMediaList({ pageSize: 100 });
  const { data: categories = [] } = useMediaCategories();

  const items = mediaData?.items ?? [];

  const filtered = items.filter((m) => {
    const formatMatch =
      activeFormat === "Semua" || m.type === FORMAT_MAP[activeFormat as Exclude<Format, "Semua">];
    const catMatch = activeCategory === "Semua" || m.category === activeCategory;
    const searchMatch = !searchQ || m.title.toLowerCase().includes(searchQ.toLowerCase());
    return formatMatch && catMatch && searchMatch;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function resetPage() {
    setCurrentPage(1);
  }

  const allCategories = ["Semua", ...categories.map((c) => c.name)];

  if (isLoading) {
    return (
      <section className="py-12 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center py-20 text-gray-400">
            <div className="w-6 h-6 border-2 border-[#E62129] border-t-transparent rounded-full animate-spin mr-3" />
            Memuat media...
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="space-y-4">
            <FadeIn direction="left">
              {/* Search */}
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Cari media..."
                    value={searchQ}
                    onChange={(e) => { setSearchQ(e.target.value); resetPage(); }}
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
                      onClick={() => { setActiveFormat(f); resetPage(); }}
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
                  {allCategories.map((c) => (
                    <button
                      key={c}
                      onClick={() => { setActiveCategory(c); resetPage(); }}
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
                key={`${activeFormat}-${activeCategory}-${searchQ}-${currentPage}`}
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
                  paginated.map((item, i) => {
                    const thumb = getImageUrl(item.thumbnailUrl);
                    const isVideo = item.type === "video";
                    const isArticle = item.type === "article";

                    return (
                      <motion.a
                        key={item.id}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.4 }}
                        className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all group cursor-pointer"
                      >
                        <div className="relative overflow-hidden">
                          {thumb ? (
                            <img
                              src={thumb}
                              alt={item.title}
                              className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-44 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                              {isVideo ? (
                                <Play className="w-10 h-10 text-gray-300 dark:text-gray-600" />
                              ) : (
                                <FileText className="w-10 h-10 text-gray-300 dark:text-gray-600" />
                              )}
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                          <div className="absolute top-3 left-3 flex gap-1.5">
                            <span
                              className={`px-2 py-0.5 rounded text-white text-xs font-medium ${
                                isVideo ? "bg-[#E62129]" : "bg-[#0A2C74]"
                              }`}
                            >
                              {isVideo && (
                                <span className="flex items-center gap-1">
                                  <Play className="w-2.5 h-2.5 fill-current" /> Video
                                </span>
                              )}
                              {isArticle && (
                                <span className="flex items-center gap-1">
                                  <FileText className="w-2.5 h-2.5" /> Artikel
                                </span>
                              )}
                              {!isVideo && !isArticle && item.type}
                            </span>
                            {item.tag && (
                              <span className="px-2 py-0.5 rounded bg-white/20 text-white text-xs font-medium backdrop-blur-sm">
                                {item.tag}
                              </span>
                            )}
                          </div>
                          {isVideo && (
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                                <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-gray-400 dark:text-gray-500 text-xs">
                              {new Date(item.createdAt).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </span>
                            {item.category && (
                              <>
                                <span className="text-gray-200 dark:text-gray-700">·</span>
                                <span className="text-[#0570CD] text-xs">{item.category}</span>
                              </>
                            )}
                          </div>
                          <h3 className="text-gray-900 dark:text-white font-semibold text-sm leading-snug line-clamp-2 group-hover:text-[#E62129] transition-colors">
                            {item.title}
                          </h3>
                        </div>
                      </motion.a>
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
  );
}
