"use client";

import { useState, useRef, useEffect, Fragment } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import {
  BookOpen,
  Clock,
  Award,
  ArrowRight,
  GraduationCap,
  ChevronRight,
  Sparkles,
  Users,
  Star,
  CheckCircle,
  Building2,
  Globe,
  Lightbulb,
  Heart,
} from "lucide-react";
import { differenceInYears, constructNow } from "date-fns";
import { useStudyProgramsList } from "@/hooks/useStudyPrograms";
import { FadeIn, StaggerGroup, StaggerItem } from "@/components/ui/FadeIn";
import Image from "next/image";

// ── Program images mapped by slug ──────────────────────────────────────────
const programImages: Record<string, string> = {
  "sarjana-teologi":
    "https://images.unsplash.com/photo-1716666178997-6e4a056f07d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
  "sarjana-pendidikan-kristen":
    "https://images.unsplash.com/photo-1564144006388-615f4f4abb6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
  "magister-teologi-pelayanan-pastoral-gereja-urban":
    "https://images.unsplash.com/photo-1622378251100-2e83c1e07ccd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
  "magister-teologi-transformasi-budaya-masyarakat":
    "https://images.unsplash.com/photo-1714321813644-eb85ed00eeea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
  "magister-pendidikan-kristen":
    "https://images.unsplash.com/photo-1621912498418-99cc5b7f7775?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
  "magister-ministri-marketplace":
    "https://images.unsplash.com/photo-1632961965821-999763254f10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
  "magister-ministri-kepemimpinan-pastoral":
    "https://images.unsplash.com/photo-1638866413606-e070e7defe21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
  "magister-ministri-teologi-pelayanan-gerejawi":
    "https://images.unsplash.com/photo-1573591012925-76dd1f406bd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
};

// ── Program icons mapped by slug ──────────────────────────────────────────
const programIcons: Record<string, React.FC<{ className?: string }>> = {
  "sarjana-teologi": BookOpen,
  "sarjana-pendidikan-kristen": Lightbulb,
  "magister-teologi-pelayanan-pastoral-gereja-urban": Building2,
  "magister-teologi-transformasi-budaya-masyarakat": Globe,
  "magister-pendidikan-kristen": GraduationCap,
  "magister-ministri-marketplace": Star,
  "magister-ministri-kepemimpinan-pastoral": Users,
  "magister-ministri-teologi-pelayanan-gerejawi": Heart,
};

// ── Program short tag lines ─────────────────────────────────���────────────
const programTags: Record<string, string[]> = {
  "sarjana-teologi": ["Hermeneutika", "Homiletika", "Pastoral"],
  "sarjana-pendidikan-kristen": ["PAK", "Kurikulum", "Pedagogi"],
  "magister-teologi-pelayanan-pastoral-gereja-urban": [
    "Urban Ministry",
    "Pastoral",
    "Leadership",
  ],
  "magister-teologi-transformasi-budaya-masyarakat": [
    "Transformasi",
    "Budaya",
    "Misiologi",
  ],
  "magister-pendidikan-kristen": ["Pendidikan", "Riset", "Kepemimpinan"],
  "magister-ministri-marketplace": ["Bisnis", "Integrasi Iman", "Profesional"],
  "magister-ministri-kepemimpinan-pastoral": [
    "Manajemen Gereja",
    "Kepemimpinan",
    "Pembinaan",
  ],
  "magister-ministri-teologi-pelayanan-gerejawi": [
    "Pelayanan",
    "Teologi Praktis",
    "Denominasi",
  ],
};

// ── Animated counter hook ─────────────────────────────────────────────────
function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return { count, ref };
}

// ── Floating orb component ────────────────────────────────────────────────
function FloatingOrb({
  cx,
  cy,
  r,
  delay,
  color,
}: {
  cx: number;
  cy: number;
  r: number;
  delay: number;
  color: string;
}) {
  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={r}
      fill={color}
      opacity={0.12}
      animate={{ cy: [cy, cy - 30, cy], opacity: [0.12, 0.22, 0.12] }}
      transition={{
        duration: 6 + delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

// ── Stat Card ─────────────────────────────────────────────────────────────
function StatCard({
  value,
  suffix,
  label,
  icon: Icon,
}: {
  value: number;
  suffix?: string;
  label: string;
  icon: React.FC<{ className?: string }>;
}) {
  const { count, ref } = useCountUp(value);
  return (
    <div ref={ref} className="text-center">
      <div className="flex items-center justify-center gap-x-2 gap-y-1.5 mb-1">
        <Icon className="w-5 h-5 text-[#E62129]" />
        <span className="text-3xl text-white" style={{ fontWeight: 800 }}>
          {count}
          {suffix}
        </span>
      </div>
      <p className="text-blue-200 text-sm">{label}</p>
    </div>
  );
}

// ── Program Card ─────────────────────────────────────────────────────────
function ProgramCard({ program, index }: { program: any; index: number }) {
  const [hovered, setHovered] = useState(false);
  const Icon = programIcons[program.slug] || BookOpen;
  const image =
    // TODO: sementara force placeholder, nnti bikin image upload untuk study program (opsional?)
    // TODO: mungkin custom hook untuk cek apakah file exist di path itU?
    `${program.coverImageUrl.startsWith("/uploads/") ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${program.coverImageUrl}` : "https://placehold.co/285x210/png"}`;
  const tags =
    program.tags && program.tags.length > 0
      ? program.tags
      : programTags[program.slug] || [];
  const isS2 = program.level === "S2";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link href={`/program-studi/${program.slug}`} className="block group">
        <motion.div
          className="relative rounded-2xl overflow-hidden bg-white shadow-md border border-gray-100 h-full"
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          whileHover={{ y: -6, boxShadow: "0 24px 60px rgba(10,44,116,0.18)" }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Image */}
          <div className="relative h-52 overflow-hidden">
            <Image
              src={image}
              alt={program.name}
              fill
              preload
              className="w-full h-full object-cover"
              //   animate={{ scale: hovered ? 1.08 : 1 }}
              //   transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A2C74]/80 via-[#0A2C74]/30 to-transparent" />

            {/* Level badge */}
            <div className="absolute top-2 left-2 flex gap-x-1.5">
              <span
                className="px-4 py-2 rounded-full backdrop-blur-sm text-white text-xs font-bold"
                style={{
                  background: isS2
                    ? "var(--color-accent)"
                    : "var(--color-primary)",
                }}
              >
                {program.level}
              </span>
              <span
                className={`px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm ${isS2 ? "text-accent" : "text-primary"} text-xs font-semibold border-white/30`}
              >
                {program.degree}
              </span>
            </div>

            {/* Icon in corner */}
            <motion.div
              className="absolute bottom-4 right-4 w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center"
              animate={{ scale: hovered ? 1.1 : 1, rotate: hovered ? 5 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <Icon className="w-5 h-5 text-white" />
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-5">
            <h3
              className="text-gray-900 mb-2 leading-snug"
              style={{ fontSize: "1.05rem", fontWeight: 700 }}
            >
              {program.name}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
              {program.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-full text-xs"
                  style={{
                    background: isS2 ? "#EFF6FF" : "#FEF2F2",
                    color: isS2 ? "#0570CD" : "#E62129",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Stats row */}
            <div className="flex flex-col items-center justify-between pt-4 gap-y-4 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-gray-500">
                  <Clock className="w-3.5 h-3.5 text-[#0570CD]" />
                  <span className="text-xs">
                    {program.duration.split(" ")[0]} tahun
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-500">
                  <BookOpen className="w-3.5 h-3.5 text-[#E62129]" />
                  <span className="text-xs">{program.credits} SKS</span>
                </div>
              </div>

              <motion.div
                className="flex items-center gap-1 text-xs font-semibold"
                style={{ color: isS2 ? "#0570CD" : "#E62129" }}
                animate={{ x: hovered ? 4 : 0 }}
                transition={{ duration: 0.2 }}
              >
                Selengkapnya
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.div>
            </div>
          </div>

          {/* Bottom accent bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 rounded-b-2xl"
            style={{ background: isS2 ? "#0570CD" : "#E62129" }}
            initial={{ width: "0%" }}
            animate={{ width: hovered ? "100%" : "0%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────
import PageHeader from "@/components/shared/PageHeader";

export default function ProgramStudiPage() {
  const [activeFilter, setActiveFilter] = useState<"all" | "S1" | "S2">("all");
  const { data: programs = [], isLoading } = useStudyProgramsList();

  // Only show published
  const publishedPrograms = programs.filter((p) => p.isPublished);

  const filteredPrograms = publishedPrograms.filter((p) =>
    activeFilter === "all" ? true : p.level === activeFilter,
  );

  const s1Programs = publishedPrograms.filter((p) => p.level === "S1");
  const s2Programs = publishedPrograms.filter((p) => p.level === "S2");

  const uniqueS1Degrees = [...new Set(s1Programs.map((p) => p.degree))];
  const uniqueS2Degrees = [...new Set(s2Programs.map((p) => p.degree))];

  return (
    <>
      <PageHeader
        title="Temukan Program Panggilan Anda"
        category="Program Akademik"
        description="Delapan program studi teologi dan pendidikan Kristen yang dirancang untuk membentuk pemimpin gereja yang Informed, Transformed, dan Transformative — siap melayani Indonesia dan dunia."
        breadcrumb={[{ label: "Program Studi", href: "/program-studi" }]}
      >
        <div className="flex flex-wrap gap-4 mb-8">
          <Link
            href="#programs"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("programs")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#E62129] text-white font-semibold hover:bg-[#c4131a] transition-all hover:shadow-lg hover:shadow-red-900/30"
          >
            Jelajahi Program
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/prosedur-admisi"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 border border-white/25 text-white font-semibold hover:bg-white/20 backdrop-blur-sm transition-all"
          >
            Daftar Sekarang
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-6 rounded-2xl bg-white/8 backdrop-blur-md border border-white/15 max-w-3xl">
          <StatCard
            value={publishedPrograms.length}
            label="Program Studi"
            icon={BookOpen}
          />
          <StatCard
            value={[...new Set(publishedPrograms.map((p) => p.level))].length}
            label="Jenjang (S1 & S2)"
            icon={GraduationCap}
          />
          <StatCard
            value={Math.abs(differenceInYears(new Date(1992, 7, 1), new Date()))}
            suffix={"+"}
            label="Tahun Berdiri"
            icon={Star}
          />
          <StatCard
            value={3500}
            suffix="+"
            label="Alumni Aktif"
            icon={Users}
          />
        </div>
      </PageHeader>

      {/* ── PROGRAMS SECTION ─────────────────────────────────────────── */}
      <section id="programs" className="pb-16 pt-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <FadeIn>
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-[#E62129] text-sm mb-3 border border-red-100">
                <BookOpen className="w-3.5 h-3.5" />
                Kurikulum Unggulan
              </span>
              <h2
                className="text-gray-900 mb-3"
                style={{
                  fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                  fontWeight: 800,
                }}
              >
                Semua Program Studi
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                Dari jenjang Sarjana hingga Magister — pilih jalur yang sesuai
                dengan panggilan dan kebutuhan pelayanan Anda.
              </p>
            </div>
          </FadeIn>

          {/* Filter Tabs */}
          <FadeIn delay={0.15}>
            <div className="flex items-center justify-center mb-10">
              <div className="inline-flex gap-1 p-1.5 rounded-full bg-white border border-gray-200 shadow-sm">
                {(["all", "S1", "S2"] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className="relative px-3.5 py-1.5 rounded-full text-sm font-semibold transition-colors"
                    style={{
                      color: activeFilter === filter ? "white" : "#6b7280",
                    }}
                  >
                    {activeFilter === filter && (
                      <motion.span
                        layoutId="filter-pill"
                        className="absolute inset-0 rounded-full"
                        style={{
                          background:
                            filter === "S1"
                              ? "var(--color-primary)"
                              : filter === "S2"
                                ? "var(--color-accent)"
                                : "var(--color-secondary)",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 35,
                        }}
                      />
                    )}
                    <span className="relative z-10">
                      {filter === "all"
                        ? `Semua (${publishedPrograms.length})`
                        : filter === "S1"
                          ? `Sarjana – S1 (${s1Programs.length})`
                          : `Magister – S2 (${s2Programs.length})`}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Cards Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredPrograms.map((program, index) => (
                <ProgramCard key={program.id} program={program} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── JENJANG COMPARISON ───────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0570CD] text-sm mb-3 border border-blue-100">
                <GraduationCap className="w-3.5 h-3.5" />
                Panduan Memilih Jenjang
              </span>
              <h2
                className="text-gray-900 mb-3"
                style={{
                  fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
                  fontWeight: 800,
                }}
              >
                S1 atau S2? Pilih Sesuai Panggilan
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto">
                Setiap jenjang dirancang dengan tujuan dan target yang berbeda.
                Temukan yang paling sesuai dengan tahap perjalanan pelayanan
                Anda.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8">
            {/* S1 Card */}
            <FadeIn delay={0} direction="left">
              <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-500 group">
                <div className="h-48 bg-gradient-to-br from-[#E62129] to-[#a01018] relative overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 70% 30%, white 1px, transparent 1px)",
                      backgroundSize: "24px 24px",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="text-center text-white"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div
                        className="text-7xl mb-2"
                        style={{ fontWeight: 900, opacity: 0.25 }}
                      >
                        S1
                      </div>
                      <div className="text-2xl" style={{ fontWeight: 800 }}>
                        Sarjana Teologi &
                      </div>
                      <div className="text-2xl" style={{ fontWeight: 800 }}>
                        Pendidikan Kristen
                      </div>
                    </motion.div>
                  </div>
                </div>
                <div className="p-6 bg-white">
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    {[
                      { label: "Durasi", value: "4 Tahun" },
                      { label: "Program", value: `${s1Programs.length} Prodi` },
                      { label: "Gelar", value: uniqueS1Degrees.join(" / ") },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="text-center p-3 bg-red-50 rounded-xl"
                      >
                        <div
                          className="text-[#E62129] text-sm mb-0.5"
                          style={{ fontWeight: 700 }}
                        >
                          {item.value}
                        </div>
                        <div className="text-gray-500 text-xs">
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>
                  <ul className="space-y-2 mb-6">
                    {[
                      "Membangun fondasi teologis yang kokoh",
                      "Persiapan pelayanan penuh waktu",
                      "Sistem blok teaching intensif",
                      "Praktik lapangan 6 bulan",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 text-[#E62129] mt-0.5 shrink-0" />
                        <span className="text-gray-600 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-3">
                    {s1Programs.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/program-studi/${p.slug}`}
                        className="flex-1 text-center py-2.5 px-3 rounded-xl bg-[#E62129] text-white text-xs font-semibold hover:bg-[#c4131a] transition-colors"
                        title={p.name}
                      >
                        {p.name
                          .replace("Sarjana ", "")
                          .replace("Teologi", "S.Th")
                          .replace("Pendidikan Kristen", "S.Pd.K")}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* S2 Card */}
            <FadeIn delay={0.1} direction="right">
              <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-500 group">
                <div className="h-48 bg-gradient-to-br from-[#0A2C74] to-[#0570CD] relative overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 30% 70%, white 1px, transparent 1px)",
                      backgroundSize: "24px 24px",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="text-center text-white"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div
                        className="text-7xl mb-2"
                        style={{ fontWeight: 900, opacity: 0.25 }}
                      >
                        S2
                      </div>
                      <div className="text-2xl" style={{ fontWeight: 800 }}>
                        Program Magister
                      </div>
                      <div className="text-2xl" style={{ fontWeight: 800 }}>
                        Teologi & Ministri
                      </div>
                    </motion.div>
                  </div>
                </div>
                <div className="p-6 bg-white">
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    {[
                      { label: "Durasi", value: "2 Tahun" },
                      { label: "Program", value: `${s2Programs.length} Prodi` },
                      {
                        label: "Gelar",
                        value: uniqueS2Degrees.join(" / "),
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="text-center p-3 bg-blue-50 rounded-xl"
                      >
                        <div
                          className="text-[#0570CD] text-sm mb-0.5"
                          style={{ fontWeight: 700 }}
                        >
                          {item.value}
                        </div>
                        <div className="text-gray-500 text-xs">
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>
                  <ul className="space-y-2 mb-6">
                    {[
                      "Spesialisasi pelayanan yang mendalam",
                      "Riset teologi kontekstual",
                      "Cocok untuk pelayan dan profesional",
                      "Fleksibel – tersedia jalur Ministri",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 text-[#0570CD] mt-0.5 shrink-0" />
                        <span className="text-gray-600 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="grid grid-cols-2 gap-2">
                    {s2Programs.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/program-studi/${p.slug}`}
                        className="text-center py-2 px-2.5 rounded-lg bg-blue-50 text-[#0570CD] text-xs font-semibold hover:bg-blue-100 transition-colors border border-blue-100 truncate"
                        title={p.name}
                      >
                        {p.name
                          .replace("Magister ", "")
                          .replace("Teologi – ", "M.Th – ")
                          .replace("Ministri – ", "M.Min – ")
                          .replace("Pendidikan Kristen", "M.Pd.K")}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── WHY STTB ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#0A2C74] relative overflow-hidden">
        {/* Background decoration */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #E62129 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-sm mb-3 border border-white/20">
                <Star className="w-3.5 h-3.5 text-yellow-400" />
                Keunggulan STTB
              </span>
              <h2
                className="text-white mb-3"
                style={{
                  fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
                  fontWeight: 800,
                }}
              >
                Mengapa Memilih STTB?
              </h2>
              <p className="text-blue-200 max-w-lg mx-auto">
                Lebih dari 50 tahun membentuk pemimpin rohani yang berdampak
                bagi gereja dan masyarakat Indonesia.
              </p>
            </div>
          </FadeIn>

          <StaggerGroup
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
            staggerDelay={0.08}
          >
            {[
              {
                icon: Award,
                title: "Akreditasi BAN-PT",
                desc: "Semua program terakreditasi resmi oleh BAN-PT dan diakui secara nasional.",
                color: "#E62129",
              },
              {
                icon: Globe,
                title: "Jaringan Internasional",
                desc: "Kerjasama dengan Gordon-Conwell, Calvin Seminary, dan institusi teologi global.",
                color: "#0570CD",
              },
              {
                icon: Lightbulb,
                title: "Sistem Blok Teaching",
                desc: "Metode pembelajaran intensif yang terbukti efektif dan fleksibel untuk pelayan aktif.",
                color: "#E62129",
              },
              {
                icon: Heart,
                title: "Komunitas Rohani",
                desc: "Kehidupan kampus yang hangat, pembinaan rohani, dan asrama yang mendukung pertumbuhan iman.",
                color: "#0570CD",
              },
            ].map((item) => (
              <StaggerItem key={item.title}>
                <motion.div
                  className="rounded-2xl p-6 bg-white/8 border border-white/15 hover:bg-white/12 transition-colors cursor-default h-full"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{
                      background: `${item.color}22`,
                      border: `1px solid ${item.color}44`,
                    }}
                  >
                    <item.icon
                      className="w-5 h-5"
                      style={{ color: item.color }}
                    />
                  </div>
                  <h3 className="text-white mb-2" style={{ fontWeight: 700 }}>
                    {item.title}
                  </h3>
                  <p className="text-blue-200 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ── CTA SECTION ──────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <FadeIn>
            <div className="rounded-3xl overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary to-accent" />
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `
  repeating-linear-gradient(45deg, rgba(255, 0, 100, 0.1) 0, rgba(255, 0, 100, 0.1) 1px, transparent 1px, transparent 20px),
      repeating-linear-gradient(-45deg, rgba(255, 255, 255, 0.4) 0, rgba(0, 255, 200, 0.15) 1px, transparent 1px, transparent 20px)
        `,
                  backgroundSize: "40px 40px",
                }}
                // style={{
                //   backgroundImage:

                //     "radial-gradient(circular at 4px 2px, white 1.5px, transparent 0)",
                //   backgroundSize: "32px 32px",
                // }}
              />
              <motion.div
                className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20"
                style={{
                  background:
                    "radial-gradient(circle, white 0%, transparent 70%)",
                }}
                animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <div className="relative z-10 p-10 sm:p-14">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 text-white/90 text-sm mb-5 border border-white/30">
                  <Sparkles className="w-4 h-4" />
                  Penerimaan Mahasiswa Baru 2025/2026
                </div>
                <h2
                  className="text-white mb-4"
                  style={{
                    fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                    fontWeight: 800,
                  }}
                >
                  Siap Melangkah
                  <br />
                  dalam Panggilan Anda?
                </h2>
                <p className="text-white/80 max-w-lg mx-auto mb-8 leading-relaxed">
                  Bergabunglah dengan lebih dari 3.500 alumni STTB yang kini
                  melayani di seluruh Indonesia dan dunia. Pendaftaran masih
                  terbuka!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/prosedur-admisi"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white/90 hover:bg-white font-semibold transition-colors shadow-lg text-accent"
                  >
                    Mulai Pendaftaran
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/kontak-kami"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white/15 border border-white/30 text-white font-semibold hover:bg-white/25 backdrop-blur-sm transition-colors"
                  >
                    Hubungi Kami
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
