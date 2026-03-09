import React from "react";
import { Link } from "react-router";
import { Home, Search, ArrowLeft } from "lucide-react";

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 pt-20 px-4">
      <div className="text-center max-w-md">
        <div className="text-[#E62129] mb-4" style={{ fontSize: "8rem", fontWeight: 900, lineHeight: 1 }}>
          404
        </div>
        <h1 className="text-gray-900 dark:text-white mb-3" style={{ fontSize: "1.75rem", fontWeight: 700 }}>
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          Halaman yang Anda cari tidak ada atau telah dipindahkan. Silakan kembali ke beranda atau gunakan menu navigasi.
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
    </div>
  );
}
