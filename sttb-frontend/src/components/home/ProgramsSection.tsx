"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Award,
  ChevronRight,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useStudyProgramsList } from "@/hooks/useStudyPrograms";
import { FadeIn } from "../ui/FadeIn";

const s1Color = "var(--color-primary)";
const s2Color = "var(--color-accent)";

// Short taglines for each program - kept as fallback or specific override if needed
// though backend now has Tagline field
const taglines: Record<string, string> = {
  "sarjana-teologi": "Bentuk fondasi teologis yang kokoh",
  "sarjana-pendidikan-kristen": "Didik generasi iman masa depan",
  "magister-teologi-pelayanan-pastoral-gereja-urban":
    "Pelayanan kota yang kontekstual",
  "magister-teologi-transformasi-budaya-masyarakat":
    "Transformasi budaya & masyarakat",
  "magister-pendidikan-kristen": "Keahlian pedagogis berbasis iman",
  "magister-ministri-marketplace": "Integrasikan iman & dunia kerja",
  "magister-ministri-kepemimpinan-pastoral": "Kepemimpinan rohani yang efektif",
  "magister-ministri-teologi-pelayanan-gerejawi":
    "Teologi praktis lintas denominasi",
};

export function ProgramsSection() {
  const [activeTab, setActiveTab] = useState<"S1" | "S2">("S1");
  const { data: programs = [], isLoading } = useStudyProgramsList();

  // Only show published ones in public view
  const publishedPrograms = programs.filter((p) => p.isPublished);

  const s1Programs = publishedPrograms.filter((p) => p.level === "S1");
  const s2Programs = publishedPrograms.filter((p) => p.level === "S2");

  const validS1Sks = s1Programs
    .map((p) => p.credits)
    .filter((c) => typeof c === "number" && !isNaN(c));

  const validS2Sks = s2Programs
    .map((p) => p.credits)
    .filter((c) => typeof c === "number" && !isNaN(c));

  const displayedPrograms = activeTab === "S1" ? s1Programs : s2Programs;

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* ── Section header ─────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <FadeIn>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#E62129] text-sm mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                Program Akademik
              </div>
              <h2
                className="text-gray-900 dark:text-white"
                style={{
                  fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)",
                  fontWeight: 800,
                }}
              >
                Temukan Program
                <br />
                <span style={{ color: "#E62129" }}>Panggilan</span> Anda
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.1} direction="left">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <p className="text-gray-500 dark:text-gray-400 max-w-xs text-sm leading-relaxed">
                {publishedPrograms.length} program studi dari jenjang Sarjana
                hingga Magister, terakreditasi BAN-PT.
              </p>
              <Link
                href="/program-studi"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0A2C74] text-white text-sm font-semibold hover:bg-[#071a4a] transition-all whitespace-nowrap hover:shadow-lg hover:-translate-y-0.5"
              >
                Semua Program
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeIn>
        </div>

        {/* ── Main layout ────────────────────────────────────── */}
        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Left — Level switcher card */}
          <FadeIn direction="right" className="lg:col-span-2">
            <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-24">
              {/* Tab header */}
              <div className="flex">
                <button
                  onClick={() => setActiveTab("S1")}
                  className="relative flex-1 py-4 text-sm font-bold transition-colors"
                  style={{
                    color:
                      activeTab === "S1"
                        ? "white"
                        : "var(--color-muted-foreground)",
                  }}
                >
                  {activeTab === "S1" && (
                    <motion.div
                      layoutId="level-bg"
                      className="absolute inset-0"
                      style={{ background: s1Color }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 35,
                      }}
                    />
                  )}
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Sarjana — S1
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab("S2")}
                  className="relative flex-1 py-4 text-sm font-bold transition-colors"
                  style={{
                    color:
                      activeTab === "S2"
                        ? "white"
                        : "var(--color-muted-foreground)",
                  }}
                >
                  {activeTab === "S2" && (
                    <motion.div
                      layoutId="level-bg"
                      className="absolute inset-0"
                      style={{ background: s2Color }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 35,
                      }}
                    />
                  )}
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Award className="w-4 h-4" />
                    Magister — S2
                  </span>
                </button>
              </div>

              {/* Level summary */}
              <div
                className="px-5 pt-5 pb-3 border-b border-gray-100 dark:border-gray-800"
                style={{
                  background: activeTab === "S1" ? "#FEF2F2" : "#EFF6FF",
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm"
                    style={{
                      fontWeight: 800,
                      background: activeTab === "S1" ? s1Color : s2Color,
                    }}
                  >
                    {activeTab}
                  </div>
                  <div>
                    <p
                      className="text-gray-900 dark:text-gray-100 text-sm"
                      style={{ fontWeight: 700 }}
                    >
                      {activeTab === "S1"
                        ? "Program Sarjana"
                        : "Program Magister"}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {activeTab === "S1"
                        ? `${s1Programs.length} prodi · 4 tahun · Akreditasi BAN-PT`
                        : `${s2Programs.length} prodi · 2 tahun · Akreditasi BAN-PT`}
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 divide-x divide-gray-100 dark:divide-gray-800 border-b border-gray-100 dark:border-gray-800">
                {(activeTab === "S1"
                  ? [
                      ["4 thn", "Durasi"],
                      [
                        validS1Sks.length > 0 ? Math.max(...validS1Sks) : 0,
                        "Maks SKS",
                      ],
                      [s1Programs.length > 0 ? s1Programs.length : 0, "Prodi"],
                    ]
                  : [
                      ["2 thn", "Durasi"],
                      [
                        validS2Sks.length > 0 ? Math.max(...validS2Sks) : 0,
                        "Maks SKS",
                      ],
                      [s2Programs.length > 0 ? s2Programs.length : 0, "Prodi"],
                    ]
                ).map(([val, lbl]) => (
                  <div key={lbl} className="px-4 pt-6 py-2 text-center">
                    <div
                      className="text-gray-900 dark:text-white text-2xl"
                      style={{ fontWeight: 700 }}
                    >
                      {val}
                    </div>
                    <div className="text-gray-400 text-xs">{lbl}</div>
                  </div>
                ))}
              </div>

              {/* CTA inside card */}
              <div className="p-4">
                <Link
                  href="/program-studi"
                  className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90"
                  style={{
                    background: `linear-gradient(135deg, ${activeTab === "S1" ? "var(--color-primary), var(--color-primary-light-accent)" : "var(--color-accent), var(--color-accent-light)"})`,
                  }}
                >
                  <span>
                    Jelajahi {activeTab === "S1" ? "Sarjana" : "Magister"}
                  </span>
                  <GraduationCap className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </FadeIn>

          {/* Right — Program list */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-3"
              >
                {displayedPrograms.map((program, i) => (
                  <motion.div
                    key={program.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: i * 0.07,
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={`/program-studi/${program.slug}`}
                      className="group flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all duration-300 hover:border-gray-200"
                    >
                      {/* Degree badge */}
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 text-white text-xs transition-all duration-300 group-hover:scale-105"
                        style={{
                          background:
                            activeTab === "S1"
                              ? `linear-gradient(315deg, var(--color-primary), var(--color-primary-light-accent))`
                              : `linear-gradient(315deg, var(--color-accent), var(--color-accent-light))`,
                          fontWeight: 800,
                        }}
                      >
                        {program.degree}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-gray-900 dark:text-white mb-0.5 leading-snug transition-colors ${activeTab === "S1" ? "group-hover:text-[#E62129] dark:group-hover:text-red-400" : "group-hover:text-accent dark:group-hover:text-blue-400"}`}
                          style={{ fontWeight: 700, fontSize: "0.95rem" }}
                        >
                          {program.name}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {program.tagline || taglines[program.slug]}
                        </p>
                      </div>

                      {/* Arrow */}
                      <motion.div
                        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border border-gray-100 dark:border-gray-700 text-gray-300 dark:text-gray-600 group-hover:border-red-200 group-hover:text-[#E62129] transition-colors"
                        whileHover={{ x: 2 }}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Bottom CTA row */}
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-secondary">
                  <div className="text-center sm:text-left">
                    <p
                      className="text-white text-sm"
                      style={{ fontWeight: 700 }}
                    >
                      Belum yakin dengan program yang tepat?
                    </p>
                    <p className="text-blue-200 text-xs">
                      Lihat perbandingan lengkap semua program di halaman
                      Program Studi.
                    </p>
                  </div>
                  <Link
                    href="/program-studi"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#0A2C74] text-sm font-bold hover:bg-blue-50 transition-colors whitespace-nowrap flex-shrink-0"
                  >
                    Bandingkan Semua
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
