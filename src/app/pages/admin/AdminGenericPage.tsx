import React from "react";
import { Link } from "react-router";
import { Construction, ArrowLeft, LayoutDashboard } from "lucide-react";

interface AdminGenericPageProps {
  title: string;
  subtitle?: string;
  description?: string;
  /** Ikon lucide-react yang merepresentasikan modul ini. Default: Construction */
  icon?: React.ElementType;
  /** Warna latar ikon, misal "bg-blue-50 dark:bg-blue-900/20 text-[#0A2C74]". Default: amber */
  iconColor?: string;
}

export function AdminGenericPage({
  title,
  subtitle,
  description,
  icon: Icon = Construction,
  iconColor = "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400",
}: AdminGenericPageProps) {
  return (
    <div className="space-y-6">
      {/* Page header — sama persis dengan pola AdminDashboardPage */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-gray-900 dark:text-white"
            style={{ fontSize: "1.5rem", fontWeight: 700 }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
        <Link
          to="/admin/dashboard"
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Dashboard
        </Link>
      </div>

      {/* Under-construction card */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-10 flex flex-col items-center text-center">
        <div
          className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5 ${iconColor}`}
        >
          <Icon className="w-8 h-8" />
        </div>

        <h2
          className="text-gray-900 dark:text-white mb-2"
          style={{ fontWeight: 700, fontSize: "1.125rem" }}
        >
          Modul Sedang Dikembangkan
        </h2>

        <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md leading-relaxed mb-7">
          {description ||
            `Modul ${title} sedang dalam proses pengembangan dan akan segera tersedia. Fitur-fitur akan ditambahkan sesuai roadmap pengembangan CMS STTB.`}
        </p>

        {/* Roadmap placeholder */}
        <div className="w-full max-w-sm space-y-2 text-left">
          {[
            { label: "Desain antarmuka", done: true },
            { label: "Integrasi API backend", done: false },
            { label: "Pengujian & QA", done: false },
            { label: "Rilis ke produksi", done: false },
          ].map((step) => (
            <div
              key={step.label}
              className="flex items-center gap-3 text-sm"
            >
              <span
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  step.done
                    ? "border-green-500 bg-green-500"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              >
                {step.done && (
                  <svg
                    viewBox="0 0 10 8"
                    fill="none"
                    className="w-3 h-3 text-white"
                  >
                    <path
                      d="M1 4l2.5 2.5L9 1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
              <span
                className={
                  step.done
                    ? "text-gray-500 dark:text-gray-400 line-through"
                    : "text-gray-700 dark:text-gray-300"
                }
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-wrap gap-3 mt-8 justify-center">
          <Link
            to="/admin/dashboard"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#E62129] hover:bg-[#c4131a] text-white text-sm font-medium transition-colors"
          >
            <LayoutDashboard className="w-4 h-4" />
            Kembali ke Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
