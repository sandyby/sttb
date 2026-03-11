"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useRef, useEffect } from "react";
import { Calendar, Tag, ArrowRight, Search, ChevronDown } from "lucide-react";
import { getImageUrl } from "@/lib/api";
import { useNewsList, useNewsCategories } from "@/hooks/useNews";

export function BeritaClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: categories = [] } = useNewsCategories();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeCategory = searchParams.get("category") ?? "Semua";
  const search = searchParams.get("search") ?? "";
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const { data, isLoading } = useNewsList({
    page,
    pageSize: 9,
    category: activeCategory !== "Semua" ? activeCategory : undefined,
    search: search || undefined,
  });

  const updateParams = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value && value !== "Semua") {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });
      params.delete("page");
      router.push(`/berita?${params.toString()}`);
    },
    [router, searchParams],
  );

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const allCategories = ["Semua", ...categories];
  const useDropdown = allCategories.length > 6;

  return (
    <>
      {/* Filters */}
      <div className="bg-white dark:bg-gray-900 sticky top-16 z-30 border-b border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari berita..."
              defaultValue={search}
              onChange={(e) => updateParams({ search: e.target.value })}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:border-[#E62129] focus:ring-1 focus:ring-[#E62129]/30 transition-all"
            />
          </div>

          {useDropdown ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
              >
                <span>{activeCategory === "Semua" ? "Semua Kategori" : activeCategory}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl shadow-lg overflow-hidden z-50">
                  <div className="max-h-64 overflow-y-auto py-1">
                    {allCategories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => { updateParams({ category: cat }); setDropdownOpen(false); }}
                        className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors ${
                          activeCategory === cat
                            ? "bg-[#E62129]/10 text-[#E62129]"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 flex-wrap">
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => updateParams({ category: cat })}
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
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="py-14 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-20 text-gray-400">
              <div className="w-6 h-6 border-2 border-[#E62129] border-t-transparent rounded-full animate-spin mr-3" />
              Memuat berita...
            </div>
          ) : !data || data.items.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg mb-2">Tidak ada berita ditemukan</p>
              <p className="text-gray-500 text-sm">
                Coba ubah kata pencarian atau kategori yang Anda pilih.
              </p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.items.map((article) => {
                  const imgSrc = getImageUrl(article.thumbnailUrl);
                  return (
                    <article
                      key={article.id}
                      className="group flex flex-col bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all hover:-translate-y-1"
                    >
                      <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-800">
                        {imgSrc ? (
                          <Image
                            src={imgSrc}
                            alt={article.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300 dark:text-gray-600 text-sm">
                            No Image
                          </div>
                        )}
                        {article.category && (
                          <div className="absolute top-3 left-3">
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[#E62129] text-white text-xs font-medium">
                              <Tag className="w-3 h-3" />
                              {article.category}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col flex-1 p-5">
                        <div className="flex items-center gap-2 text-xs text-gray-400 mb-2.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <time dateTime={article.publishedAt ?? article.createdAt}>
                            {new Date(article.publishedAt ?? article.createdAt).toLocaleDateString(
                              "id-ID",
                              { day: "numeric", month: "long", year: "numeric" },
                            )}
                          </time>
                        </div>
                        <h2 className="text-gray-900 dark:text-white font-semibold group-hover:text-[#E62129] transition-colors mb-2 line-clamp-2 flex-1">
                          {article.title}
                        </h2>
                        {article.excerpt && (
                          <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-4">
                            {article.excerpt}
                          </p>
                        )}
                        <Link
                          href={`/berita/${article.slug}`}
                          className="inline-flex items-center gap-1 text-[#E62129] text-sm font-medium hover:gap-2 transition-all"
                        >
                          Baca Selengkapnya <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Pagination */}
              {data.totalCount > data.pageSize && (
                <div className="flex justify-center gap-2 mt-10">
                  {Array.from({ length: Math.ceil(data.totalCount / data.pageSize) }, (_, i) => {
                    const p = i + 1;
                    const params = new URLSearchParams(searchParams.toString());
                    params.set("page", String(p));
                    return (
                      <Link
                        key={p}
                        href={`/berita?${params.toString()}`}
                        className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                          page === p
                            ? "bg-[#E62129] text-white"
                            : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-[#E62129] hover:text-[#E62129]"
                        }`}
                      >
                        {p}
                      </Link>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
