import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { Calendar, Tag, ArrowRight } from "lucide-react";
import { getNewsList, getNewsCategories, getImageUrl } from "@/lib/api";
import { NewsFilters } from "./_components/NewsFilters";

type SearchParams = Promise<{ category?: string; search?: string; page?: string }>;

export default async function BeritaPage({ searchParams }: { searchParams: SearchParams }) {
  const { category, search, page } = await searchParams;

  const [data, categories] = await Promise.all([
    getNewsList({
      page: page ? Number(page) : 1,
      pageSize: 9,
      category: category && category !== "Semua" ? category : undefined,
      search: search || undefined,
    }),
    getNewsCategories(),
  ]);

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

      {/* Filters — client component */}
      <Suspense>
        <NewsFilters categories={categories} />
      </Suspense>

      {/* News Grid */}
      <div className="py-14 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          {data.items.length === 0 ? (
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
                    const params = new URLSearchParams();
                    if (category && category !== "Semua") params.set("category", category);
                    if (search) params.set("search", search);
                    params.set("page", String(p));
                    return (
                      <Link
                        key={p}
                        href={`/berita?${params.toString()}`}
                        className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                          (page ? Number(page) : 1) === p
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
