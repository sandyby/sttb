"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Tag, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useGetNews, NewsListItem } from "@/hooks/useNews";
import { Skeleton } from "@/components/ui/skeleton";

function NewsCardSkeleton() {
  return (
    <div className="group flex flex-col bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800">
      <Skeleton className="w-full h-48" />
      <div className="flex flex-col flex-1 p-5 space-y-3">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
}

function NewsCard({ article, index }: { article: NewsListItem; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex flex-col bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <Image
          src={article.thumbnailUrl ?? "https://placehold.co/192/png"}
          alt={article.title}
          fill
          priority
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[#E62129] text-white text-xs font-medium">
            <Tag className="w-3 h-3" />
            {article.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-2.5">
          {article.publishedAt && (
            <>
              <Calendar className="w-3.5 h-3.5" />
              <time dateTime={article.publishedAt}>
                {new Date(article.publishedAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
              <span>·</span>
              {/* <span>{article.author}</span> */}
            </>
          )}
        </div>
        <h3 className="text-gray-900 dark:text-white font-semibold group-hover:text-[#E62129] transition-colors mb-2 line-clamp-2 flex-1">
          {article.title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-4">
          {article.excerpt}
        </p>
        <Link
          href={`/berita/${article.slug}`}
          className="inline-flex items-center gap-1 text-[#E62129] text-sm font-medium hover:gap-2 transition-all"
        >
          Baca Selengkapnya <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </motion.article>
  );
}

export function NewsSection() {
  const { data, isLoading, error } = useGetNews(1, 4);

  if (error) {
    return (
      <section className="py-20 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center text-red-500">
            Failed to load news. Please try again later.
          </div>
        </div>
      </section>
    );
  }

  const allNews = data?.items || [];
  const featuredNews = allNews.find((n) => n.isFeatured) || allNews[0];
  const regularNews = allNews.slice(1, 4);

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[#E62129] text-sm font-semibold uppercase tracking-wider mb-2">
              Berita & Informasi
            </p>
            <h2
              className="text-gray-900 dark:text-white"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700 }}
            >
              Berita Terkini STTB
            </h2>
          </div>
          <Link
            href="/berita"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-sm hover:border-[#E62129] hover:text-[#E62129] transition-all"
          >
            Semua Berita <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Featured article - large */}
          {isLoading ? (
            <>
              <Skeleton className="lg:col-span-5 h-96 rounded-xl" />
              <div className="lg:col-span-7 space-y-5">
                <NewsCardSkeleton />
                <NewsCardSkeleton />
                <NewsCardSkeleton />
              </div>
            </>
          ) : featuredNews ? (
            <>
              <motion.article
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-5 group"
              >
                <Link href={`/berita/${featuredNews.slug}`} className="block">
                  <div className="relative overflow-hidden rounded-xl h-72 lg:h-80 mb-4">
                    <Image
                      src={featuredNews.thumbnailUrl || "/images/placeholder.jpg"}
                      alt={featuredNews.title}
                      fill
                      priority
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[#E62129] text-white text-xs font-medium mb-2">
                        <Tag className="w-3 h-3" />
                        {featuredNews.category || "Berita"}
                      </span>
                      <h3 className="text-white font-bold text-lg line-clamp-2 group-hover:text-red-200 transition-colors">
                        {featuredNews.title}
                      </h3>
                      <div className="flex items-center gap-2 text-white/70 text-xs mt-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <time>
                          {new Date(featuredNews.publishedAt || featuredNews.createdAt).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </time>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                    {featuredNews.excerpt}
                  </p>
                </Link>
              </motion.article>

              {/* Regular news list */}
              <div className="lg:col-span-7 space-y-5">
                {regularNews.map((article, i) => (
                  <motion.article
                    key={article.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="group flex gap-4 bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all hover:-translate-y-0.5"
                  >
                    <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={article.thumbnailUrl || "/images/placeholder.jpg"}
                        alt={article.title}
                        fill
                        priority
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="px-1.5 py-0.5 rounded text-xs font-medium bg-red-50 dark:bg-red-900/20 text-[#E62129]">
                          {article.category || "Berita"}
                        </span>
                        <time className="text-xs text-gray-400">
                          {new Date(article.publishedAt || article.createdAt).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </time>
                      </div>
                      <h3 className="text-gray-900 dark:text-white font-semibold text-sm group-hover:text-[#E62129] transition-colors line-clamp-2 mb-1.5">
                        {article.title}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 text-xs line-clamp-2">
                        {article.excerpt}
                      </p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </>
          ) : null}
        </div>

        {/* Mobile CTA */}
        <div className="text-center mt-8 md:hidden">
          <Link
            href="/berita"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-sm hover:border-[#E62129] hover:text-[#E62129] transition-all"
          >
            Lihat Semua Berita <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
