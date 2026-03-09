"use client";

import React, { useState } from "react";
import { Link } from "react-router";
import { Search, Filter, Calendar, Tag, ArrowRight } from "lucide-react";
import { newsArticles } from "../../data/mock-data";

const categories = ["Semua", "Konferensi", "Akademik", "Beasiswa", "Kerjasama", "Seminar", "Fasilitas"];

export function BeritaPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");

  const filtered = newsArticles.filter((a) => {
    const matchSearch =
      search === "" ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      activeCategory === "Semua" || a.category === activeCategory;
    return matchSearch && matchCategory;
  });

  return (
    <>
      {/* Page Header */}
      <div className="bg-[#0A2C74] pt-28 pb-14">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-[#7FB4E5] text-sm font-medium uppercase tracking-wider mb-2">
            Informasi Terkini
          </p>
          <h1 className="text-white mb-3" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 700 }}>
            Berita STTB
          </h1>
          <p className="text-blue-200 max-w-xl">
            Ikuti perkembangan terbaru dari Sekolah Tinggi Teologi Bandung —
            kegiatan akademik, konferensi, dan informasi penting lainnya.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-900 sticky top-16 z-30 border-b border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari berita..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:border-[#E62129] focus:ring-1 focus:ring-[#E62129]/30 transition-all"
            />
          </div>

          {/* Categories */}
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-[#E62129] text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="py-14 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg mb-2">Tidak ada berita ditemukan</p>
              <p className="text-gray-500 text-sm">
                Coba ubah kata pencarian atau kategori yang Anda pilih.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((article) => (
                <article
                  key={article.id}
                  className="group flex flex-col bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[#E62129] text-white text-xs font-medium">
                        <Tag className="w-3 h-3" />
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 p-5">
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-2.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <time dateTime={article.publishedAt}>
                        {new Date(article.publishedAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </time>
                    </div>
                    <h2 className="text-gray-900 dark:text-white font-semibold group-hover:text-[#E62129] transition-colors mb-2 line-clamp-2 flex-1">
                      {article.title}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-4">
                      {article.excerpt}
                    </p>
                    <Link
                      to={`/berita/${article.slug}`}
                      className="inline-flex items-center gap-1 text-[#E62129] text-sm font-medium hover:gap-2 transition-all"
                    >
                      Baca Selengkapnya <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
