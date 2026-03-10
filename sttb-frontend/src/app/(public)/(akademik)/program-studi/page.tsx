"use client";

import { useState, useRef, useEffect, Fragment } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import {
    BookOpen, Clock, Award, ArrowRight, GraduationCap,
    ChevronRight, Sparkles, Users, Star, CheckCircle,
    Building2, Globe, Lightbulb, Heart
} from "lucide-react";
import { programs } from "@/data/mock-data";
import { FadeIn, StaggerGroup, StaggerItem } from "@/components/ui/FadeIn";

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
    "magister-teologi-pelayanan-pastoral-gereja-urban": ["Urban Ministry", "Pastoral", "Leadership"],
    "magister-teologi-transformasi-budaya-masyarakat": ["Transformasi", "Budaya", "Misiologi"],
    "magister-pendidikan-kristen": ["Pendidikan", "Riset", "Kepemimpinan"],
    "magister-ministri-marketplace": ["Bisnis", "Integrasi Iman", "Profesional"],
    "magister-ministri-kepemimpinan-pastoral": ["Manajemen Gereja", "Kepemimpinan", "Pembinaan"],
    "magister-ministri-teologi-pelayanan-gerejawi": ["Pelayanan", "Teologi Praktis", "Denominasi"],
};

// ── Animated counter hook ─────────────────────────────────────────────────
function useCountUp(target: number, duration = 2000) {
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
            { threshold: 0.5 }
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
    cx, cy, r, delay, color
}: { cx: number; cy: number; r: number; delay: number; color: string }) {
    return (
        <motion.circle
            cx={cx} cy={cy} r={r} fill={color} opacity={0.12}
            animate={{ cy: [cy, cy - 30, cy], opacity: [0.12, 0.22, 0.12] }}
            transition={{ duration: 6 + delay, repeat: Infinity, ease: "easeInOut", delay }}
        />
    );
}

// ── Stat Card ─────────────────────────────────────────────────────────────
function StatCard({ value, suffix, label, icon: Icon }: {
    value: number; suffix?: string; label: string; icon: React.FC<{ className?: string }>;
}) {
    const { count, ref } = useCountUp(value);
    return (
        <div ref={ref} className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
                <Icon className="w-5 h-5 text-[#E62129]" />
                <span className="text-3xl text-white" style={{ fontWeight: 800 }}>
                    {count}{suffix}
                </span>
            </div>
            <p className="text-blue-200 text-sm">{label}</p>
        </div>
    );
}

// ── Program Card ─────────────────────────────────────────────────────────
function ProgramCard({ program, index }: { program: typeof programs[0]; index: number }) {
    const [hovered, setHovered] = useState(false);
    const Icon = programIcons[program.slug] || BookOpen;
    const image = programImages[program.slug];
    const tags = programTags[program.slug] || [];
    const isS2 = program.level === "S2";

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
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
                        <motion.img
                            src={image}
                            alt={program.name}
                            className="w-full h-full object-cover"
                            fetchPriority="high"
                            animate={{ scale: hovered ? 1.08 : 1 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A2C74]/80 via-[#0A2C74]/30 to-transparent" />

                        {/* Level badge */}
                        <div className="absolute top-4 left-4 flex gap-2">
                            <span
                                className="px-2.5 py-1 rounded-full text-white text-xs font-bold"
                                style={{ background: isS2 ? "#0570CD" : "#E62129" }}
                            >
                                {program.level}
                            </span>
                            <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs border border-white/30">
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
                        <h3 className="text-gray-900 mb-2 leading-snug" style={{ fontSize: "1.05rem", fontWeight: 700 }}>
                            {program.name}
                        </h3>
                        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                            {program.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                            {tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-2 py-0.5 rounded-full text-xs"
                                    style={{ background: isS2 ? "#EFF6FF" : "#FEF2F2", color: isS2 ? "#0570CD" : "#E62129" }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Stats row */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1.5 text-gray-500">
                                    <Clock className="w-3.5 h-3.5 text-[#0570CD]" />
                                    <span className="text-xs">{program.duration.split(" ")[0]} tahun</span>
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
export default function ProgramStudiPage() {
    const [activeFilter, setActiveFilter] = useState<"all" | "S1" | "S2">("all");
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

    const filteredPrograms = programs.filter((p) =>
        activeFilter === "all" ? true : p.level === activeFilter
    );

    const s1Programs = programs.filter((p) => p.level === "S1");
    const s2Programs = programs.filter((p) => p.level === "S2");

    return (
        <>
            {/* ── HERO ─────────────────────────────────────────────────────── */}
            <div ref={heroRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#071a4a]">
                {/* Animated SVG background */}
                <div className="absolute inset-0">
                    <svg className="w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <radialGradient id="rg1" cx="30%" cy="40%" r="60%">
                                <stop offset="0%" stopColor="#0570CD" stopOpacity="0.35" />
                                <stop offset="100%" stopColor="#071a4a" stopOpacity="0" />
                            </radialGradient>
                            <radialGradient id="rg2" cx="80%" cy="60%" r="55%">
                                <stop offset="0%" stopColor="#E62129" stopOpacity="0.2" />
                                <stop offset="100%" stopColor="#071a4a" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        <rect width="1440" height="900" fill="#071a4a" />
                        <rect width="1440" height="900" fill="url(#rg1)" />
                        <rect width="1440" height="900" fill="url(#rg2)" />
                        <FloatingOrb cx={200} cy={200} r={180} delay={0} color="#0570CD" />
                        <FloatingOrb cx={1100} cy={600} r={220} delay={1.5} color="#E62129" />
                        <FloatingOrb cx={750} cy={150} r={120} delay={3} color="#0A2C74" />
                        <FloatingOrb cx={400} cy={700} r={160} delay={2} color="#0570CD" />
                        <FloatingOrb cx={1300} cy={200} r={100} delay={4} color="#E62129" />
                    </svg>
                </div>

                {/* Grid pattern overlay */}
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                        backgroundSize: "60px 60px",
                    }}
                />

                {/* Parallax content */}
                <motion.div
                    style={{ y: heroY, opacity: heroOpacity }}
                    className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full"
                >
                    {/* Breadcrumb */}
                    <FadeIn delay={0.1}>
                        <nav className="flex items-center gap-2 mb-8 text-sm">
                            <Link href="/" className="text-blue-300 hover:text-white transition-colors">Beranda</Link>
                            <ChevronRight className="w-3.5 h-3.5 text-blue-500" />
                            <span className="text-white/60">Program Studi</span>
                        </nav>
                    </FadeIn>

                    {/* Label chip */}
                    <FadeIn delay={0.15}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm mb-6">
                            <Sparkles className="w-4 h-4 text-[#E62129]" />
                            <span className="text-white/90 text-sm">Program Akademik STTB</span>
                        </div>
                    </FadeIn>

                    {/* Headline */}
                    <div className="max-w-4xl mb-2">
                        <FadeIn delay={0.2}>
                            <h1
                                className="text-white mb-0 leading-tight"
                                style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)", fontWeight: 800, letterSpacing: "-0.02em" }}
                            >
                                Temukan
                                <span className="block">
                                    <span className="text-transparent" style={{
                                        WebkitTextStroke: "2px rgba(255,255,255,0.3)"
                                    }}>Program</span>
                                    {" "}
                                    <span style={{ color: "#E62129" }}>Panggilan</span>
                                </span>
                                <span className="text-white">Anda</span>
                            </h1>
                        </FadeIn>
                    </div>

                    {/* Subtitle */}
                    <FadeIn delay={0.3}>
                        <p className="text-blue-100 max-w-2xl leading-relaxed mb-6" style={{ fontSize: "1.1rem" }}>
                            Delapan program studi teologi dan pendidikan Kristen yang dirancang untuk membentuk
                            pemimpin gereja yang Informed, Transformed, dan Transformative — siap melayani Indonesia
                            dan dunia.
                        </p>
                    </FadeIn>

                    {/* CTA Buttons */}
                    <FadeIn delay={0.4}>
                        <div className="flex flex-wrap gap-4 mb-8">
                            <Link
                                href="#programs"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById("programs")?.scrollIntoView({ behavior: "smooth" });
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
                    </FadeIn>

                    {/* Stats bar */}
                    <FadeIn delay={0.5}>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-6 rounded-2xl bg-white/8 backdrop-blur-md border border-white/15 max-w-3xl">
                            <StatCard value={8} label="Program Studi" icon={BookOpen} />
                            <StatCard value={2} label="Jenjang (S1 & S2)" icon={GraduationCap} />
                            <StatCard value={50} suffix="+" label="Tahun Berdiri" icon={Star} />
                            <StatCard value={3500} suffix="+" label="Alumni Aktif" icon={Users} />
                        </div>
                    </FadeIn>
                </motion.div>

                {/* Bottom wave */}
                <div className="absolute bottom-0 left-0 right-0 z-99">
                    <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" className="w-full h-16 sm:h-20">
                        <path d="M0,60 C360,0 1080,80 1440,20 L1440,80 L0,80 Z" fill="#f8fafc" />
                    </svg>
                </div>
            </div>

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
                            <h2 className="text-gray-900 mb-3" style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800 }}>
                                Semua Program Studi
                            </h2>
                            <p className="text-gray-500 max-w-xl mx-auto">
                                Dari jenjang Sarjana hingga Magister — pilih jalur yang sesuai dengan panggilan dan kebutuhan pelayanan Anda.
                            </p>
                        </div>
                    </FadeIn>

                    {/* Filter Tabs */}
                    <FadeIn delay={0.15}>
                        <div className="flex items-center justify-center mb-10">
                            <div className="inline-flex gap-1 p-1 rounded-xl bg-white border border-gray-200 shadow-sm">
                                {(["all", "S1", "S2"] as const).map((filter) => (
                                    <button
                                        key={filter}
                                        onClick={() => setActiveFilter(filter)}
                                        className="relative px-5 py-2 rounded-lg text-sm font-semibold transition-colors"
                                        style={{ color: activeFilter === filter ? "white" : "#6b7280" }}
                                    >
                                        {activeFilter === filter && (
                                            <motion.span
                                                layoutId="filter-pill"
                                                className="absolute inset-0 rounded-lg"
                                                style={{ background: filter === "S1" ? "#E62129" : filter === "S2" ? "#0570CD" : "#0A2C74" }}
                                                transition={{ type: "spring", stiffness: 400, damping: 35 }}
                                            />
                                        )}
                                        <span className="relative z-10">
                                            {filter === "all"
                                                ? `Semua (${programs.length})`
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
                            <h2 className="text-gray-900 mb-3" style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)", fontWeight: 800 }}>
                                S1 atau S2? Pilih Sesuai Panggilan
                            </h2>
                            <p className="text-gray-500 max-w-lg mx-auto">
                                Setiap jenjang dirancang dengan tujuan dan target yang berbeda. Temukan yang paling sesuai dengan tahap perjalanan pelayanan Anda.
                            </p>
                        </div>
                    </FadeIn>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* S1 Card */}
                        <FadeIn delay={0} direction="left">
                            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-500 group">
                                <div className="h-48 bg-gradient-to-br from-[#E62129] to-[#a01018] relative overflow-hidden">
                                    <div className="absolute inset-0 opacity-10"
                                        style={{
                                            backgroundImage: "radial-gradient(circle at 70% 30%, white 1px, transparent 1px)",
                                            backgroundSize: "24px 24px"
                                        }}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <motion.div
                                            className="text-center text-white"
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            <div className="text-7xl mb-2" style={{ fontWeight: 900, opacity: 0.25 }}>S1</div>
                                            <div className="text-2xl" style={{ fontWeight: 800 }}>Sarjana Teologi &</div>
                                            <div className="text-2xl" style={{ fontWeight: 800 }}>Pendidikan Kristen</div>
                                        </motion.div>
                                    </div>
                                </div>
                                <div className="p-6 bg-white">
                                    <div className="grid grid-cols-3 gap-3 mb-5">
                                        {[
                                            { label: "Durasi", value: "4 Tahun" },
                                            { label: "Program", value: "2 Prodi" },
                                            { label: "Gelar", value: "S.Th / S.Pd.K" },
                                        ].map((item) => (
                                            <div key={item.label} className="text-center p-3 bg-red-50 rounded-xl">
                                                <div className="text-[#E62129] text-sm mb-0.5" style={{ fontWeight: 700 }}>{item.value}</div>
                                                <div className="text-gray-500 text-xs">{item.label}</div>
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
                                            >
                                                {p.name.replace("Sarjana ", "")}
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
                                    <div className="absolute inset-0 opacity-10"
                                        style={{
                                            backgroundImage: "radial-gradient(circle at 30% 70%, white 1px, transparent 1px)",
                                            backgroundSize: "24px 24px"
                                        }}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <motion.div
                                            className="text-center text-white"
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            <div className="text-7xl mb-2" style={{ fontWeight: 900, opacity: 0.25 }}>S2</div>
                                            <div className="text-2xl" style={{ fontWeight: 800 }}>Program Magister</div>
                                            <div className="text-2xl" style={{ fontWeight: 800 }}>Teologi & Ministri</div>
                                        </motion.div>
                                    </div>
                                </div>
                                <div className="p-6 bg-white">
                                    <div className="grid grid-cols-3 gap-3 mb-5">
                                        {[
                                            { label: "Durasi", value: "2 Tahun" },
                                            { label: "Program", value: "6 Prodi" },
                                            { label: "Gelar", value: "M.Th / M.Min / M.Pd.K" },
                                        ].map((item) => (
                                            <div key={item.label} className="text-center p-3 bg-blue-50 rounded-xl">
                                                <div className="text-[#0570CD] text-sm mb-0.5" style={{ fontWeight: 700 }}>{item.value}</div>
                                                <div className="text-gray-500 text-xs">{item.label}</div>
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
                                                {p.name.replace("Magister ", "").replace("Teologi – ", "M.Th – ").replace("Ministri – ", "M.Min – ").replace("Pendidikan Kristen", "M.Pd.K")}
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
                <div className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                        backgroundSize: "40px 40px"
                    }}
                />
                <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
                    style={{ background: "radial-gradient(circle, #E62129 0%, transparent 70%)" }}
                />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeIn>
                        <div className="text-center mb-14">
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-sm mb-3 border border-white/20">
                                <Star className="w-3.5 h-3.5 text-yellow-400" />
                                Keunggulan STTB
                            </span>
                            <h2 className="text-white mb-3" style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)", fontWeight: 800 }}>
                                Mengapa Memilih STTB?
                            </h2>
                            <p className="text-blue-200 max-w-lg mx-auto">
                                Lebih dari 50 tahun membentuk pemimpin rohani yang berdampak bagi gereja dan masyarakat Indonesia.
                            </p>
                        </div>
                    </FadeIn>

                    <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" staggerDelay={0.08}>
                        {[
                            {
                                icon: Award,
                                title: "Akreditasi BAN-PT",
                                desc: "Semua program terakreditasi resmi oleh BAN-PT dan diakui secara nasional.",
                                color: "#E62129"
                            },
                            {
                                icon: Globe,
                                title: "Jaringan Internasional",
                                desc: "Kerjasama dengan Gordon-Conwell, Calvin Seminary, dan institusi teologi global.",
                                color: "#0570CD"
                            },
                            {
                                icon: Lightbulb,
                                title: "Sistem Blok Teaching",
                                desc: "Metode pembelajaran intensif yang terbukti efektif dan fleksibel untuk pelayan aktif.",
                                color: "#E62129"
                            },
                            {
                                icon: Heart,
                                title: "Komunitas Rohani",
                                desc: "Kehidupan kampus yang hangat, pembinaan rohani, dan asrama yang mendukung pertumbuhan iman.",
                                color: "#0570CD"
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
                                        style={{ background: `${item.color}22`, border: `1px solid ${item.color}44` }}
                                    >
                                        <item.icon className="w-5 h-5" style={{ color: item.color }} />
                                    </div>
                                    <h3 className="text-white mb-2" style={{ fontWeight: 700 }}>{item.title}</h3>
                                    <p className="text-blue-200 text-sm leading-relaxed">{item.desc}</p>
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
                            <div className="absolute inset-0 bg-gradient-to-br from-[#E62129] via-[#c4131a] to-[#0A2C74]" />
                            <div className="absolute inset-0 opacity-20"
                                style={{
                                    backgroundImage: "radial-gradient(circle at 2px 2px, white 1.5px, transparent 0)",
                                    backgroundSize: "32px 32px"
                                }}
                            />
                            <motion.div
                                className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20"
                                style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }}
                                animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
                                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <div className="relative z-10 p-10 sm:p-14">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 text-white/90 text-sm mb-5 border border-white/30">
                                    <Sparkles className="w-4 h-4" />
                                    Penerimaan Mahasiswa Baru 2025/2026
                                </div>
                                <h2 className="text-white mb-4" style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800 }}>
                                    Siap Melangkah<br />dalam Panggilan Anda?
                                </h2>
                                <p className="text-white/80 max-w-lg mx-auto mb-8 leading-relaxed">
                                    Bergabunglah dengan lebih dari 3.500 alumni STTB yang kini melayani di seluruh Indonesia dan dunia.
                                    Pendaftaran masih terbuka!
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link
                                        href="/prosedur-admisi"
                                        className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white font-semibold hover:bg-gray-50 transition-colors shadow-lg"
                                        style={{ color: "#E62129" }}
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