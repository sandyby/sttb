import React from "react";
import { useParams, Link } from "react-router";
import { Calendar, Tag, ArrowLeft, Share2, Facebook, Twitter } from "lucide-react";
import { newsArticles } from "../../data/mock-data";

export function BeritaDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const article = newsArticles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 pt-20">
        <div className="text-center">
          <h1 className="text-gray-900 dark:text-white mb-3">Berita tidak ditemukan</h1>
          <Link
            to="/berita"
            className="inline-flex items-center gap-2 text-[#E62129] font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Berita
          </Link>
        </div>
      </div>
    );
  }

  const relatedNews = newsArticles.filter(
    (a) => a.id !== article.id && a.category === article.category
  ).slice(0, 3);

  return (
    <>
      {/* Header */}
      <div className="bg-[#0A2C74] pt-28 pb-14">
        <div className="max-w-4xl mx-auto px-4">
          <Link
            to="/berita"
            className="inline-flex items-center gap-2 text-[#7FB4E5] hover:text-white text-sm mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Berita
          </Link>
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[#E62129] text-white text-xs font-medium">
              <Tag className="w-3 h-3" />
              {article.category}
            </span>
          </div>
          <h1
            className="text-white mb-4"
            style={{ fontSize: "clamp(1.5rem, 4vw, 2.4rem)", fontWeight: 700, lineHeight: 1.3 }}
          >
            {article.title}
          </h1>
          <div className="flex items-center gap-3 text-blue-200 text-sm">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <time dateTime={article.publishedAt}>
                {new Date(article.publishedAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            </div>
            <span>·</span>
            <span>Oleh {article.author}</span>
          </div>
        </div>
      </div>

      {/* Article content */}
      <div className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Main content */}
            <div className="lg:col-span-2">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-64 sm:h-80 object-cover rounded-xl mb-8"
              />
              <div
                className="prose prose-gray dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Share */}
              <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center gap-3">
                <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                  <Share2 className="w-4 h-4" /> Bagikan:
                </span>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs hover:bg-blue-700 transition-colors"
                >
                  <Facebook className="w-3.5 h-3.5" /> Facebook
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500 text-white text-xs hover:bg-sky-600 transition-colors"
                >
                  <Twitter className="w-3.5 h-3.5" /> Twitter
                </a>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {relatedNews.length > 0 && (
                <div className="sticky top-24">
                  <h3 className="text-gray-900 dark:text-white font-semibold mb-4 pb-2 border-b border-gray-100 dark:border-gray-800">
                    Berita Terkait
                  </h3>
                  <div className="space-y-4">
                    {relatedNews.map((n) => (
                      <Link
                        key={n.id}
                        to={`/berita/${n.slug}`}
                        className="group flex gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors"
                      >
                        <img
                          src={n.imageUrl}
                          alt={n.title}
                          className="w-16 h-14 object-cover rounded-lg flex-shrink-0"
                        />
                        <div>
                          <p className="text-gray-900 dark:text-white text-xs font-medium group-hover:text-[#E62129] transition-colors line-clamp-2 mb-1">
                            {n.title}
                          </p>
                          <p className="text-gray-400 text-xs">
                            {new Date(n.publishedAt).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "short",
                            })}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-[#0A2C74] rounded-xl text-white">
                    <h4 className="font-semibold mb-2">Daftar Sekarang</h4>
                    <p className="text-blue-100 text-xs mb-3 leading-relaxed">
                      Jadilah bagian dari keluarga besar STTB. Pendaftaran mahasiswa baru 2025/2026 masih terbuka.
                    </p>
                    <Link
                      to="/prosedur-admisi"
                      className="block text-center px-4 py-2 rounded-lg bg-[#E62129] text-white text-sm font-medium hover:bg-[#c4131a] transition-colors"
                    >
                      Info Pendaftaran
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
