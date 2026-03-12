"use client";

import { useRef, useState, useMemo } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "motion/react";
import { Mail, GraduationCap, BookOpen, X, ChevronRight, ChevronLeft, Globe, Star, Users, Loader2 } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { useGetLecturers } from "@/hooks/useLecturers";
import { getImageUrl } from "@/lib/api";
import type { LecturerListItem } from "@/types/lecturers";

/* Leader Card */

function LeaderCard({
    person,
    index,
    onClick,
}: {
    person: LecturerListItem;
    index: number;
    onClick: () => void;
}) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });
    const [hovered, setHovered] = useState(false);

    const accentGrad = index === 0
        ? "from-[#E62129] to-[#0A2C74]"
        : "from-[#0A2C74] to-[#0570CD]";

    const imgSrc = getImageUrl(person.imageUrl) ?? "https://placehold.co/600x800/png";

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4 }}
            className="group relative cursor-pointer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={onClick}
        >
            <motion.div
                className={`absolute -inset-0.5 rounded-3xl bg-gradient-to-br ${accentGrad} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-md pointer-events-none`}
            />

            <div className="relative bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm group-hover:shadow-2xl transition-all duration-500">
                <div className={`h-1 bg-gradient-to-r ${accentGrad}`} />

                <div className="flex flex-col sm:flex-row">
                    <div className="relative sm:w-56 lg:w-64 flex-shrink-0 overflow-hidden" style={{ minHeight: "280px" }}>
                        <motion.img
                            src={imgSrc}
                            alt={person.name}
                            className="w-full h-full object-cover object-top absolute inset-0"
                            animate={{ scale: hovered ? 1.06 : 1 }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        />
                        <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-r from-transparent to-white dark:to-gray-900 hidden sm:block" />
                    </div>

                    <div className="flex-1 p-6 lg:p-8 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs text-white bg-gradient-to-r ${accentGrad}`} style={{ fontWeight: 700 }}>
                                    <Star className="w-3 h-3" />
                                    {person.title}
                                </span>
                            </div>

                            <h3 className="text-gray-900 dark:text-white mb-1 leading-tight" style={{ fontSize: "1.3rem", fontWeight: 800 }}>
                                {person.name}
                            </h3>

                            <p className="text-[#0570CD] dark:text-blue-400 text-sm mb-3 flex items-center gap-1.5">
                                <BookOpen className="w-3.5 h-3.5 flex-shrink-0" />
                                {person.specialization}
                            </p>

                            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                                {person.bio}
                            </p>

                            <div className="flex flex-wrap gap-1.5">
                                {person.courses.slice(0, 3).map((c) => (
                                    <span key={c} className="px-2.5 py-0.5 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs border border-gray-100 dark:border-gray-700">
                                        {c}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100 dark:border-gray-800">
                            <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                                <Globe className="w-3.5 h-3.5" />
                                {person.almaMater.split(",")[0]}
                            </div>
                            <motion.button
                                className="flex items-center gap-1.5 text-xs font-semibold"
                                style={{ color: index === 0 ? "#E62129" : "#0A2C74" }}
                                animate={{ x: hovered ? 4 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                Lihat Profil
                                <ChevronRight className="w-3.5 h-3.5" />
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

/* ─── FACULTY CARD ───────────────────────────────────────── */

function FacultyCard({
    person,
    index,
    onClick,
}: {
    person: LecturerListItem;
    index: number;
    onClick: () => void;
}) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });
    const [hovered, setHovered] = useState(false);
    const isNotTetap = person.rank === "tidak-tetap";

    const imgSrc = getImageUrl(person.imageUrl) ?? "https://placehold.co/600x800/png";

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: (index % 4) * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="group relative cursor-pointer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={onClick}
            whileHover={{ y: -5 }}
        >
            <div className="relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm group-hover:shadow-xl group-hover:border-gray-200 dark:group-hover:border-gray-700 transition-all duration-400">
                <div className="relative overflow-hidden" style={{ height: "210px" }}>
                    <motion.img
                        src={imgSrc}
                        alt={person.name}
                        className="w-full h-full object-cover object-top"
                        animate={{ scale: hovered ? 1.07 : 1 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    />

                    <motion.div
                        className="absolute inset-0 flex items-end p-4"
                        animate={{ opacity: hovered ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ background: "linear-gradient(to top, rgba(10,44,116,0.9) 0%, rgba(10,44,116,0.35) 60%, transparent 100%)" }}
                    >
                        <div className="flex items-center gap-1.5 text-white text-xs font-medium">
                            <ChevronRight className="w-3.5 h-3.5" />
                            Lihat Profil Lengkap
                        </div>
                    </motion.div>

                    {isNotTetap && (
                        <div className="absolute top-3 left-3">
                            <span className="bg-[#0570CD]/90 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full" style={{ fontWeight: 600 }}>
                                Tidak Tetap
                            </span>
                        </div>
                    )}
                </div>

                <div className="p-4">
                    <span className="inline-block px-2 py-0.5 rounded text-xs mb-2 bg-[#E62129]/8 text-[#E62129]" style={{ fontWeight: 600 }}>
                        {person.title}
                    </span>
                    <h3 className="text-gray-900 dark:text-white text-sm leading-snug mb-1.5" style={{ fontWeight: 700 }}>
                        {person.name}
                    </h3>
                    <p className="text-[#0570CD] dark:text-blue-400 text-xs flex items-center gap-1 mb-1.5" style={{ fontWeight: 500 }}>
                        <BookOpen className="w-3 h-3 flex-shrink-0" />
                        {person.specialization}
                    </p>
                    <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">{person.degree}</p>
                </div>

                <motion.div
                    className="h-0.5"
                    animate={{ scaleX: hovered ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                    style={{ background: "linear-gradient(90deg, #E62129, #0A2C74, #0570CD)", transformOrigin: "left" }}
                />
            </div>
        </motion.div>
    );
}

/* ─── DETAIL MODAL ───────────────────────────────────────── */

function FacultyModal({ person, onClose }: { person: LecturerListItem | null; onClose: () => void }) {
    const imgSrc = person ? (getImageUrl(person.imageUrl) ?? "https://placehold.co/600x800/png") : "";

    return (
        <AnimatePresence>
            {person && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.94, y: 24 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.94, y: 24 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl"
                        style={{ maxHeight: "90vh" }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex flex-col sm:flex-row h-full">
                            <div className="relative sm:w-56 flex-shrink-0 overflow-hidden" style={{ minHeight: "280px" }}>
                                <Image
                                    src={imgSrc}
                                    alt={person.name}
                                    height={300}
                                    width={500}
                                    className="absolute inset-0 w-full h-full object-cover object-top"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent sm:hidden" />
                                <div className="absolute bottom-4 left-4 sm:hidden">
                                    <span className="bg-[#E62129] text-white text-xs px-2.5 py-0.5 rounded-full" style={{ fontWeight: 700 }}>
                                        {person.title}
                                    </span>
                                    <p className="text-white mt-1 text-sm" style={{ fontWeight: 700 }}>{person.name}</p>
                                </div>

                                <div
                                    className="absolute bottom-0 left-0 right-0 h-1 hidden sm:block"
                                    style={{
                                        background: person.rank === "pimpinan"
                                            ? "linear-gradient(90deg, #E62129, #0A2C74)"
                                            : "linear-gradient(90deg, #0A2C74, #0570CD)"
                                    }}
                                />
                            </div>

                            <div className="flex-1 flex flex-col overflow-y-auto" style={{ maxHeight: "90vh" }}>
                                <div className="flex items-start justify-between p-5 border-b border-gray-100 dark:border-gray-800">
                                    <div className="hidden sm:block">
                                        <span
                                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs text-white mb-1.5"
                                            style={{
                                                fontWeight: 700,
                                                background: person.rank === "pimpinan"
                                                    ? "linear-gradient(135deg, #E62129, #0A2C74)"
                                                    : "#0A2C74"
                                            }}
                                        >
                                            {person.rank === "pimpinan" && <Star className="w-3 h-3" />}
                                            {person.title}
                                        </span>
                                        <h3 className="text-gray-900 dark:text-white leading-snug" style={{ fontWeight: 800, fontSize: "1.1rem" }}>
                                            {person.name}
                                        </h3>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="ml-auto w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center text-gray-500 transition-colors flex-shrink-0"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="p-5 space-y-4 flex-1">
                                    <div>
                                        <p className="text-gray-400 text-xs uppercase tracking-wider mb-1.5">Profil</p>
                                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{person.bio}</p>
                                    </div>

                                    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                                        <div className="w-8 h-8 rounded-lg bg-[#0570CD]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <GraduationCap className="w-4 h-4 text-[#0570CD]" />
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-xs uppercase tracking-wider mb-0.5">Pendidikan</p>
                                            <p className="text-gray-800 dark:text-gray-200 text-sm" style={{ fontWeight: 600 }}>{person.degree}</p>
                                            <p className="text-gray-400 text-xs mt-0.5">{person.origin}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-800">
                                        <div className="w-8 h-8 rounded-lg bg-[#E62129]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <BookOpen className="w-4 h-4 text-[#E62129]" />
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-xs uppercase tracking-wider mb-0.5">Bidang Keahlian</p>
                                            <p className="text-gray-800 dark:text-gray-200 text-sm" style={{ fontWeight: 600 }}>{person.specialization}</p>
                                        </div>
                                    </div>

                                    {person.courses.length > 0 && (
                                        <div>
                                            <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Mata Kuliah yang Diajarkan</p>
                                            <div className="flex flex-wrap gap-2">
                                                {person.courses.map((c) => (
                                                    <span
                                                        key={c}
                                                        className="px-3 py-1.5 rounded-xl text-xs bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-gray-700"
                                                        style={{ fontWeight: 500 }}
                                                    >
                                                        {c}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {person.email && (
                                        <a
                                            href={`mailto:${person.email}`}
                                            className="flex items-center gap-3 p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900/10 border border-gray-100 dark:border-gray-700 transition-colors group"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-[#E62129]/10 flex items-center justify-center flex-shrink-0">
                                                <Mail className="w-4 h-4 text-[#E62129]" />
                                            </div>
                                            <div>
                                                <p className="text-gray-400 text-xs uppercase tracking-wider mb-0.5">Kontak Email</p>
                                                <p className="text-[#E62129] text-sm group-hover:underline" style={{ fontWeight: 600 }}>{person.email}</p>
                                            </div>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

/* ─── PAGE ────────────────────────────────────────────────── */

export default function DewanDosenPage() {
    const [selectedFaculty, setSelectedFaculty] = useState<LecturerListItem | null>(null);
    const [filter, setFilter] = useState("Semua");
    const [regularPage, setRegularPage] = useState(1);
    const REGULAR_PAGE_SIZE = 8;

    const { data, isLoading, error } = useGetLecturers({ isActive: true, pageSize: 200 });
    const allLecturers = data?.items ?? [];

    const leaders = allLecturers.filter((f) => f.rank === "pimpinan");
    const regularFaculty = allLecturers.filter((f) => f.rank !== "pimpinan");

    const specializations = useMemo(() => {
        const terms = new Set<string>();
        regularFaculty.forEach((f) => {
            f.specialization.split(/[,&]/).map((s) => s.trim()).filter(Boolean).forEach((t) => terms.add(t));
        });
        return ["Semua", ...Array.from(terms).sort()];
    }, [regularFaculty]);

    const filteredRegular = filter === "Semua"
        ? regularFaculty
        : regularFaculty.filter((f) =>
            f.specialization.toLowerCase().includes(filter.toLowerCase()) ||
            f.degree.toLowerCase().includes(filter.toLowerCase())
        );

    const totalRegularPages = Math.max(1, Math.ceil(filteredRegular.length / REGULAR_PAGE_SIZE));
    const paginatedRegular = filteredRegular.slice(
        (regularPage - 1) * REGULAR_PAGE_SIZE,
        regularPage * REGULAR_PAGE_SIZE,
    );

    return (
        <>
            {/* ── HERO ──────────────────────────────────────────────── */}
            <div
                className="relative pt-28 pb-24 overflow-hidden min-h-[420px] flex items-center"
                style={{ background: "linear-gradient(135deg, #060C1A 0%, #0A2C74 60%, #0570CD 100%)" }}
            >
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute rounded-full"
                            style={{
                                width: `${100 + i * 80}px`, height: `${100 + i * 80}px`,
                                right: `${-20 + i * 8}%`, top: `${10 + (i % 3) * 20}%`,
                                background: "rgba(255,255,255,0.03)",
                                border: "1px solid rgba(255,255,255,0.06)",
                            }}
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
                        />
                    ))}
                </div>
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
                        backgroundSize: "60px 60px"
                    }}
                />

                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="flex items-center gap-2 mb-5">
                            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
                                className="w-8 h-px bg-[#E62129] origin-left" />
                            <span className="text-[#E62129] text-xs uppercase tracking-widest" style={{ fontWeight: 600 }}>Tentang STTB</span>
                        </div>
                        <h1 className="text-white mb-4" style={{ fontWeight: 800, lineHeight: 1.05, fontSize: "clamp(2.2rem, 5vw, 3.5rem)" }}>
                            Dewan Dosen
                        </h1>
                        <p className="text-blue-200/80 max-w-xl leading-relaxed">
                            Para pengajar bergelar doktor dari universitas teologi terkemuka dunia yang berdedikasi membentuk generasi pemimpin rohani Indonesia.
                        </p>
                        <div className="flex flex-wrap gap-6 mt-8">
                            {[
                                { num: `${regularFaculty.filter((f) => f.rank === "tetap").length}`, label: "Dosen Tetap" },
                                { num: "100%", label: "Bergelar S3/Doktor" },
                                { num: "5+", label: "Negara Studi" },
                                { num: `${leaders.length}`, label: "Pimpinan Akademik" },
                            ].map((s) => (
                                <div key={s.label}>
                                    <div className="text-white" style={{ fontSize: "1.8rem", fontWeight: 900, lineHeight: 1 }}>{s.num}</div>
                                    <div className="text-blue-300 text-xs mt-0.5">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Loading state */}
            {isLoading && (
                <div className="flex items-center justify-center py-32">
                    <Loader2 className="w-8 h-8 animate-spin text-[#E62129]" />
                </div>
            )}

            {/* Error state */}
            {error && (
                <div className="flex items-center justify-center py-32 text-gray-400">
                    Gagal memuat data dosen. Silakan coba lagi.
                </div>
            )}

            {!isLoading && !error && (
                <>
                    {/* ── PIMPINAN AKADEMIK ────────────────────────────────── */}
                    {leaders.length > 0 && (
                        <section className="py-16 bg-white dark:bg-gray-950">
                            <div className="max-w-7xl mx-auto px-4">
                                <FadeIn>
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#E62129] to-[#0A2C74] flex items-center justify-center">
                                            <Star className="w-4 h-4 text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-gray-900 dark:text-white" style={{ fontWeight: 800, fontSize: "1.25rem" }}>
                                                Pimpinan Akademik
                                            </h2>
                                            <p className="text-gray-400 text-xs">Pemimpin institusi STTB yang membentuk arah pendidikan teologi</p>
                                        </div>
                                    </div>
                                </FadeIn>

                                <div className="space-y-5">
                                    {leaders.map((person, i) => (
                                        <LeaderCard
                                            key={person.id}
                                            person={person}
                                            index={i}
                                            onClick={() => setSelectedFaculty(person)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* ── DOSEN TETAP & TIDAK TETAP ────────────────────────── */}
                    {regularFaculty.length > 0 && (
                        <section className="py-16 bg-gray-50 dark:bg-gray-900">
                            <div className="max-w-7xl mx-auto px-4">
                                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
                                    <FadeIn>
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-xl bg-[#0A2C74] flex items-center justify-center">
                                                <Users className="w-4 h-4 text-white" />
                                            </div>
                                            <div>
                                                <h2 className="text-gray-900 dark:text-white" style={{ fontWeight: 800, fontSize: "1.25rem" }}>
                                                    Dewan Pengajar
                                                </h2>
                                                <p className="text-gray-400 text-xs">Dosen tetap & tidak tetap berpengalaman di bidangnya</p>
                                            </div>
                                        </div>
                                    </FadeIn>
                                </div>

                                {/* Filter */}
                                <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-hide">
                                    <span className="text-gray-400 text-xs uppercase tracking-wider whitespace-nowrap flex-shrink-0">Filter:</span>
                                    {specializations.map((spec) => (
                                        <button
                                            key={spec}
                                            onClick={() => { setFilter(spec); setRegularPage(1); }}
                                            className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all flex-shrink-0 ${filter === spec
                                                ? "bg-[#E62129] text-white shadow-md shadow-red-200 dark:shadow-none"
                                                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-100 dark:border-gray-700"
                                                }`}
                                            style={{ fontWeight: 500 }}
                                        >
                                            {spec}
                                        </button>
                                    ))}
                                </div>

                                {filteredRegular.length === 0 ? (
                                    <div className="text-center py-20 text-gray-400">
                                        <GraduationCap className="w-12 h-12 mx-auto mb-3 opacity-30" />
                                        <p>Tidak ada dosen ditemukan untuk filter ini.</p>
                                    </div>
                                ) : (
                                    <>
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={`${filter}-${regularPage}`}
                                                initial={{ opacity: 0, y: 12 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                                            >
                                                {paginatedRegular.map((f, i) => (
                                                    <FacultyCard
                                                        key={f.id}
                                                        person={f}
                                                        index={i}
                                                        onClick={() => setSelectedFaculty(f)}
                                                    />
                                                ))}
                                            </motion.div>
                                        </AnimatePresence>

                                        {/* Pagination */}
                                        {totalRegularPages > 1 && (
                                            <div className="flex items-center justify-between mt-10">
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {(regularPage - 1) * REGULAR_PAGE_SIZE + 1}–{Math.min(regularPage * REGULAR_PAGE_SIZE, filteredRegular.length)} dari {filteredRegular.length} dosen
                                                </p>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => { setRegularPage((p) => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                                                        disabled={regularPage === 1}
                                                        className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 disabled:opacity-40 transition-colors"
                                                    >
                                                        <ChevronLeft className="w-4 h-4" />
                                                    </button>
                                                    {Array.from({ length: totalRegularPages }, (_, i) => i + 1).map((p) => (
                                                        <button
                                                            key={p}
                                                            onClick={() => { setRegularPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                                                            className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${p === regularPage
                                                                ? "bg-[#E62129] text-white"
                                                                : "border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800"
                                                            }`}
                                                        >
                                                            {p}
                                                        </button>
                                                    ))}
                                                    <button
                                                        onClick={() => { setRegularPage((p) => Math.min(totalRegularPages, p + 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                                                        disabled={regularPage === totalRegularPages}
                                                        className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 disabled:opacity-40 transition-colors"
                                                    >
                                                        <ChevronRight className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </section>
                    )}

                    {/* Empty state when no lecturers at all */}
                    {allLecturers.length === 0 && (
                        <section className="py-32 bg-white dark:bg-gray-950">
                            <div className="text-center text-gray-400">
                                <GraduationCap className="w-12 h-12 mx-auto mb-3 opacity-30" />
                                <p>Data dosen belum tersedia.</p>
                            </div>
                        </section>
                    )}
                </>
            )}

            {/* ── CTA ───────────────────────────────────────────────── */}
            <section className="py-16 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0A2C74, #060C1A)" }}>
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute right-0 top-0 w-96 h-96 rounded-full bg-[#E62129]/5" style={{ transform: "translate(30%, -30%)" }} />
                </div>
                <div className="max-w-3xl mx-auto px-4 text-center relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <h2 className="text-white mb-3" style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)", fontWeight: 700 }}>
                            Bergabung dengan Tim Pengajar STTB
                        </h2>
                        <p className="text-blue-200/70 leading-relaxed mb-6">
                            STTB membuka kesempatan bagi para akademisi teologi yang berdedikasi untuk berkontribusi dalam misi mendidik pemimpin gereja Indonesia.
                        </p>
                        <a
                            href="mailto:sdm@sttb.ac.id"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#E62129] text-white font-medium hover:bg-[#c4131a] transition-all shadow-lg"
                        >
                            <Mail className="w-4 h-4" />
                            Hubungi Bagian SDM
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* ── MODAL ─────────────────────────────────────────────── */}
            <FacultyModal person={selectedFaculty} onClose={() => setSelectedFaculty(null)} />
        </>
    );
}
