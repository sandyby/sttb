import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import {
  CheckCircle2,
  Phone,
  Mail,
  ArrowRight,
  GraduationCap,
} from "lucide-react";
import {
  FadeIn,
  StaggerGroup,
  StaggerItem,
} from "../../components/ui/FadeIn";

const programs = [
  {
    level: "S1",
    color: "#E62129",
    programs: [
      {
        title: "Sarjana Teologi (S.Th.)",
        requirements: [
          "Minimal lulusan SMA/sederajat",
          "Memiliki pengalaman pelayanan gerejawi/lembaga Kristen minimal 2 tahun",
          "Memiliki panggilan jelas sebagai hamba Tuhan penuh waktu",
          "Memiliki kemampuan dasar Bahasa Inggris yang baik, terutama membaca dan memahami teks berbahasa Inggris",
          "Memenuhi seluruh prosedur pendaftaran yang berlaku di STTB",
        ],
      },
      {
        title: "Sarjana Pendidikan Kristen (S.Pd.K.)",
        requirements: [
          "Minimal lulusan SMA/sederajat",
          "Memiliki pengalaman pelayanan gerejawi/lembaga Kristen minimal 2 tahun",
          "Memiliki panggilan jelas sebagai pendidik Kristen penuh waktu",
          "Memiliki kemampuan dasar Bahasa Inggris yang baik, terutama membaca dan memahami teks berbahasa Inggris",
          "Memenuhi seluruh prosedur pendaftaran yang berlaku di STTB",
        ],
      },
    ],
  },
  {
    level: "S2",
    color: "#0A2C74",
    programs: [
      {
        title: "Magister Pendidikan Kristen (M.Pd.K.)",
        requirements: [
          "Lulus program S1 (semua jurusan)",
          "Memiliki pengalaman pelayanan di sekolah/gereja minimal 2 tahun",
          "Memiliki kemampuan dasar Bahasa Inggris yang baik, terutama membaca dan memahami teks berbahasa Inggris",
          "Menyerahkan book review saat mendaftar di STTB",
          "Memenuhi seluruh prosedur pendaftaran yang berlaku di STTB",
        ],
      },
      {
        title: "Magister Ministri Marketplace (M.Min.)",
        requirements: [
          "Lulusan S-1 Teologi/Umum",
          "Memiliki pengalaman bekerja minimal 2 tahun",
          "Memiliki pengalaman pelayanan di gereja atau lembaga pelayanan minimal 1 tahun",
          "Menyerahkan book review saat mendaftar di STTB",
        ],
      },
    ],
  },
];

const generalReqs = [
  "Calon mahasiswa S1 sudah menyelesaikan pendidikan SMU/sederajat dari sekolah yang terdaftar/diakui oleh pemerintah.",
  "Calon mahasiswa S2 sudah menyelesaikan pendidikan S1 dari universitas yang terdaftar/diakui oleh pemerintah.",
  "Untuk calon mahasiswa yang telah menyelesaikan pendidikan umum lainnya (seperti B.A., M.A.) di luar Indonesia, penerimaan akan dipertimbangkan oleh STTB kasus per kasus.",
];

export function InfoPersyaratanPage() {
  return (
    <>
      {/* Hero */}
      <div className="pt-28 pb-20 bg-gradient-to-br from-[#0A2C74] to-[#0570CD] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-px bg-[#E62129]" />
              <span className="text-[#E62129] text-xs font-semibold uppercase tracking-widest">
                Admisi
              </span>
            </div>
            <h1
              className="text-white mb-4"
              style={{
                fontSize: "clamp(2rem, 4vw, 2.8rem)",
                fontWeight: 800,
              }}
            >
              Informasi Persyaratan
            </h1>
            <p className="text-blue-200 max-w-2xl leading-relaxed">
              Persyaratan lengkap pendaftaran mahasiswa baru
              STTB per program studi. Bacalah dengan teliti
              sebelum mendaftar.
            </p>
          </motion.div>
        </div>
      </div>

      {/* General requirements */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <FadeIn>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 mb-10">
              <h2 className="text-[#0A2C74] dark:text-blue-300 font-bold mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Persyaratan Umum
              </h2>
              <ul className="space-y-3">
                {generalReqs.map((r, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-gray-700 dark:text-gray-300 text-sm"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#0A2C74] dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {programs.map((lvl) => (
            <div key={lvl.level} className="mb-10">
              <FadeIn>
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: lvl.color }}
                  >
                    {lvl.level}
                  </div>
                  <h2 className="text-gray-900 dark:text-white font-bold text-xl">
                    Program{" "}
                    {lvl.level === "S1"
                      ? "Sarjana"
                      : "Magister"}
                  </h2>
                </div>
              </FadeIn>

              <StaggerGroup
                staggerDelay={0.12}
                className="space-y-4"
              >
                {lvl.programs.map((p) => (
                  <StaggerItem key={p.title}>
                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-md transition-shadow">
                      <div
                        className="px-5 py-3 border-l-4"
                        style={{
                          borderColor: lvl.color,
                          backgroundColor: `${lvl.color}08`,
                        }}
                      >
                        <h3 className="text-gray-900 dark:text-white font-semibold">
                          {p.title}
                        </h3>
                      </div>
                      <div className="p-5">
                        <ul className="space-y-2.5">
                          {p.requirements.map((req, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3"
                            >
                              <CheckCircle2
                                className="w-4 h-4 flex-shrink-0 mt-0.5"
                                style={{ color: lvl.color }}
                              />
                              <span className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                {req}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="py-14 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            <FadeIn direction="left">
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
                <h3 className="text-gray-900 dark:text-white font-bold mb-4">
                  Bantuan Informasi
                </h3>
                <div className="space-y-3">
                  <a
                    href="tel:081573360009"
                    className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-[#E62129] transition-colors text-sm"
                  >
                    <Phone className="w-4 h-4 text-[#E62129]" />{" "}
                    0815 7336 0009
                  </a>
                  <a
                    href="mailto:admisi@sttb.ac.id"
                    className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-[#E62129] transition-colors text-sm"
                  >
                    <Mail className="w-4 h-4 text-[#E62129]" />{" "}
                    admisi@sttb.ac.id
                  </a>
                  <a
                    href="mailto:beasiswa@sttb.ac.id"
                    className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-[#E62129] transition-colors text-sm"
                  >
                    <Mail className="w-4 h-4 text-[#E62129]" />{" "}
                    beasiswa@sttb.ac.id
                  </a>
                </div>
              </div>
            </FadeIn>
            <FadeIn direction="right">
              <div className="bg-[#E62129] rounded-2xl p-6 text-white">
                <h3 className="font-bold text-lg mb-3">
                  Siap Mendaftar?
                </h3>
                <p className="text-red-100 text-sm mb-5 leading-relaxed">
                  Ikuti event admisi STTB atau daftar langsung
                  secara online.
                </p>
                <div className="flex flex-col gap-2">
                  <a
                    href="http://sis.sttb.ac.id/pmb/formulir-pendaftaran.html"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-white text-[#E62129] font-semibold text-sm hover:bg-red-50 transition-colors"
                  >
                    Daftar Online{" "}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <Link
                    to="/jadwal-admisi"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
                  >
                    Lihat Jadwal Admisi
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}