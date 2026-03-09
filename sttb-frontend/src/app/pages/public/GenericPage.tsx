import React from "react";
import { Link } from "react-router";
import { Construction, Home, ArrowLeft } from "lucide-react";

interface GenericPageProps {
  title: string;
  subtitle?: string;
  description?: string;
  breadcrumb?: string;
}

export function GenericPage({ title, subtitle, description, breadcrumb }: GenericPageProps) {
  return (
    <>
      {/* Hero */}
      <div className="pt-28 pb-16 bg-gradient-to-r from-[#0A2C74] to-[#0570CD]">
        <div className="max-w-7xl mx-auto px-4">
          {breadcrumb && (
            <p className="text-[#7FB4E5] text-sm font-medium uppercase tracking-wider mb-2">
              {breadcrumb}
            </p>
          )}
          <h1
            className="text-white mb-3"
            style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 700 }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="text-blue-200 max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Content placeholder */}
      <section className="py-20 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-900/20 mb-6">
            <Construction className="w-8 h-8 text-amber-600 dark:text-amber-400" />
          </div>
          <h2
            className="text-gray-900 dark:text-white mb-3"
            style={{ fontWeight: 700, fontSize: "1.5rem" }}
          >
            Halaman Sedang Dikembangkan
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-lg mx-auto leading-relaxed">
            {description ||
              `Konten halaman ${title} sedang dalam proses pengembangan dan akan segera tersedia. Terima kasih atas kesabaran Anda.`}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#E62129] hover:bg-[#c4131a] text-white text-sm font-medium transition-colors"
            >
              <Home className="w-4 h-4" /> Kembali ke Beranda
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-sm hover:bg-white dark:hover:bg-gray-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Kembali
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
