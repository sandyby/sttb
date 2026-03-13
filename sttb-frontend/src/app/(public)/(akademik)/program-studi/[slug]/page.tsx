import Link from "next/link";
import Image from "next/image";
import {
  Clock,
  BookOpen,
  Award,
  Users,
  CheckCircle,
  ArrowRight,
  Eye,
  Binoculars,
  Target,
  Phone,
} from "lucide-react";
import { programs } from "@/data/mock-data";

import { notFound } from "next/navigation";
import { getStudyProgramBySlug, getImageUrl } from "@/libs/api";

const DEFAULT_PROGRAM_IMAGE =
  "https://images.unsplash.com/photo-1505427214476-47e71e07abfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800";

import PageHeader from "@/components/shared/PageHeader";

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const program = await getStudyProgramBySlug(slug);

  if (!program) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-gray-900 dark:text-white mb-3">
            Program studi tidak ditemukan!
          </h1>
          <Link href="/" className="text-[#E62129]">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  const isS1 = program.level.toLowerCase() === "s1";
  const coverImg = getImageUrl(program.coverImageUrl) || DEFAULT_PROGRAM_IMAGE;

  return (
    <>
      <PageHeader
        title={program.name}
        category={`Program ${program.level}`}
        description={program.description || undefined}
        image={coverImg || undefined}
        breadcrumb={[
          { label: "Program Studi", href: "/program-studi" },
          { label: `Program ${program.level}`, href: "#" },
          { label: program.name, href: `/program-studi/${slug}` }
        ]}
      >
        <div className="flex flex-wrap gap-5 mt-8">
          {[
            { icon: Clock, label: "Durasi", value: program.duration },
            {
              icon: BookOpen,
              label: "Total SKS",
              value: `${program.credits} SKS`,
            },
            { icon: Award, label: "Gelar", value: program.degree },
            {
              icon: Users,
              label: "Akreditasi",
              value: program.accreditation || "BAN-PT",
            },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 border border-white/20 shadow-xl"
              >
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white/60 text-xs font-medium uppercase tracking-wider">
                    {s.label}
                  </p>
                  <p className="text-white font-bold text-sm">
                    {s.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </PageHeader>

      {/* Content */}
      <section className="py-14 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Vision */}
              <div className="flex gap-x-6">
                <div>
                  <h2
                    className="text-gray-900 dark:text-white font-bold mb-5"
                    style={{ fontSize: "1.25rem" }}
                  >
                    Visi Program
                  </h2>
                  <div className="flex gap-x-2">
                    {program.vision ? (
                      <>
                        <Eye className="w-5 h-5 text-[#E62129] mt-0.5 flex-shrink-0" />
                        <p className="text-gray-700 dark:text-gray-300 mt-0.5 text-sm leading-relaxed">
                          {program.vision}
                        </p>
                      </>
                    ) : (
                      <p className="text-gray-500 italic text-sm">
                        Informasi prospek karir belum tersedia.
                      </p>
                    )}
                  </div>
                </div>
                {/* Mission */}
                <div>
                  <h2
                    className="text-gray-900 dark:text-white font-bold mb-5"
                    style={{ fontSize: "1.25rem" }}
                  >
                    Misi Program
                  </h2>
                  <div className="flex gap-x-2">
                    {program.mission ? (
                      <>
                        <Eye className="w-5 h-5 text-[#E62129] mt-0.5 flex-shrink-0" />
                        <p className="text-gray-700 dark:text-gray-300 mt-0.5 text-sm leading-relaxed">
                          {program.mission}
                        </p>
                      </>
                    ) : (
                      <p className="text-gray-500 italic text-sm">
                        Informasi prospek karir belum tersedia.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Objectives */}
              <div>
                <h2
                  className="text-gray-900 dark:text-white font-bold mb-5"
                  style={{ fontSize: "1.25rem" }}
                >
                  Tujuan Program
                </h2>
                <div className="space-y-3">
                  {program.objectives.length > 0 ? (
                    program.objectives.map((obj, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#E62129] mt-0.5 flex-shrink-0" />
                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                          {obj}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 italic text-sm">
                      Informasi tujuan program belum tersedia.
                    </p>
                  )}
                </div>
              </div>

              {/* Courses */}
              <div>
                <h2
                  className="text-gray-900 dark:text-white font-bold mb-5"
                  style={{ fontSize: "1.25rem" }}
                >
                  Mata Kuliah Unggulan
                </h2>
                <div className="grid grid-cols-2 gap-2.5">
                  {program.courses.length > 0 ? (
                    program.courses.map((course, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 p-2.5 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E62129] flex-shrink-0" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {course}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 italic text-sm">
                      Daftar mata kuliah belum tersedia.
                    </p>
                  )}
                </div>
              </div>

              {/* Career prospects */}
              <div>
                <h2
                  className="text-gray-900 dark:text-white font-bold mb-5"
                  style={{ fontSize: "1.25rem" }}
                >
                  Prospek Karir & Pelayanan
                </h2>
                <div className="flex flex-wrap gap-2">
                  {program.careers.length > 0 ? (
                    program.careers.map((career, i) => (
                      <span
                        key={i}
                        className={`px-3 py-1.5 rounded-full ${isS1 ? "bg-primary" : "bg-accent"} text-white font-semibold text-xs font-medium`}
                      >
                        {career}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500 italic text-sm">
                      Informasi prospek karir belum tersedia.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-5">
              {/* Apply card */}
              <div
                className={`${isS1 ? "bg-gradient-to-tr from-primary-dark-accent to-primary-light-accent" : "bg-gradient-to-tr from-secondary to-accent"} rounded-2xl p-6 text-white`}
              >
                <h3 className="font-bold mb-2 text-white">
                  Daftarkan Diri Anda
                </h3>
                <p className="text-white/90 text-sm mb-4 leading-relaxed">
                  Penerimaan mahasiswa baru 2025/2026 masih terbuka. Jangan
                  lewatkan kesempatan ini.
                </p>
                <Link
                  href="/prosedur-admisi"
                  className={`block text-center px-4 py-2.5 rounded-lg ${isS1 ? "bg-gradient-to-br from-white/75 to-white/95 hover:bg-white/75   text-primary" : "bg-gradient-to-br from-white/80 to-white/95 hover:bg-white/75 text-accent"} backdrop-blur-sm font-medium text-md transition-all duration-200 ease-in-out mb-3`}
                >
                  Mulai Pendaftaran
                </Link>
                <Link
                  href="/jadwal-admisi"
                  className={`${isS1 ? "bg-red-100/20 hover:bg-red-100/30 text-red-100 hover:text-white" : "bg-white/10 hover:bg-white/20 text-white/90 hover:text-white"} block text-center px-4 py-2.5 rounded-lg {} text-md transition-colors border border-white/20`}
                >
                  Lihat Jadwal Admisi
                </Link>
              </div>

              {/* Program info */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 space-y-3">
                <h3 className="text-gray-900 dark:text-white font-semibold">
                  Informasi Program
                </h3>
                {[
                  {
                    label: "Jenjang",
                    value:
                      program.level === "S1" ? "Sarjana (S1)" : "Magister (S2)",
                  },
                  { label: "Gelar", value: program.degree },
                  { label: "Durasi", value: program.duration },
                  { label: "Total SKS", value: `${program.credits} SKS` },
                  {
                    label: "Akreditasi",
                    value: program.accreditation || "BAN-PT",
                  },
                  { label: "Bahasa Pengantar", value: "Indonesia" },
                ].map((info) => (
                  <div
                    key={info.label}
                    className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700 last:border-0"
                  >
                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                      {info.label}
                    </span>
                    <span className="text-gray-900 dark:text-white text-sm font-medium">
                      {info.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Contact */}
              <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-gray-900 dark:text-white font-medium mb-2 text-sm">
                  Butuh Informasi Lebih?
                </p>
                <a
                  href="tel:+6281573360009"
                  className="flex items-center gap-2 text-[#E62129] text-sm hover:underline"
                >
                  <Phone className="w-3.5 h-3.5" />
                  (+62)-815-7336-0009
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
