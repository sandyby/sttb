"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { admisiSteps, admisiWaves, admisiContact, admisiRequirements, methodIcons } from "@/data/admisi-data";
import { CheckCircle, Calendar, FileText, Users, Phone, Mail, ArrowRight, BookOpen, AlertCircle, CheckCircle2, ChevronDown, Clock, ExternalLink, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { useState, useEffect } from "react";
import Image from "next/image";
function Orb({ cx, cy, r, delay, color }: { cx: string; cy: string; r: string; delay: number; color: string }) {
    return (
        <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{ left: cx, top: cy, width: r, height: r, background: color, filter: "blur(60px)", transform: "translate(-50%,-50%)" }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.28, 0.15] }}
            transition={{ duration: 7 + delay, repeat: Infinity, ease: "easeInOut", delay }}
        />
    );
}

// ── Animated step connector line (SVG path draw) ──────────────────────────
function AnimatedPath({ progress }: { progress: number }) {
    return (
        <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block" viewBox="0 0 1000 120" preserveAspectRatio="none">
            <motion.path
                d="M 60 60 C 200 20, 350 100, 500 60 C 650 20, 800 100, 940 60"
                fill="none" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="8 6"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: progress }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            />
            <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#E62129" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#0570CD" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#0A2C74" stopOpacity="0.8" />
                </linearGradient>
            </defs>
        </svg>
    );
}

// ── Journey Step Card ─────────────────────────────────────────────────────
function JourneyStep({ step, index, isActive, onClick }: {
    step: typeof admisiSteps[0]; index: number; isActive: boolean; onClick: () => void;
}) {
    const Icon = step.icon;
    const isLeft = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
        >
            {/* Connector line to next (mobile vertical) */}
            {index < admisiSteps.length - 1 && (
                <div className="lg:hidden absolute left-7 top-full h-8 w-0.5 bg-gradient-to-b from-gray-200 to-transparent" />
            )}

            <motion.button
                onClick={onClick}
                className="w-full text-left group"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
            >
                <div
                    className="relative rounded-2xl border-2 overflow-hidden transition-all duration-400"
                    style={{
                        borderColor: isActive ? step.color : "transparent",
                        boxShadow: isActive ? `0 0 0 1px ${step.color}30, 0 20px 60px ${step.color}15` : "0 1px 3px rgba(0,0,0,0.06)",
                        background: isActive ? `linear-gradient(135deg, ${step.color}08, white)` : "white",
                    }}
                >
                    {/* Active glow bar */}
                    {isActive && (
                        <motion.div
                            layoutId="step-glow-bar"
                            className="absolute top-0 left-0 right-0 h-0.5"
                            style={{ background: `linear-gradient(90deg, ${step.color}, transparent)` }}
                        />
                    )}

                    <div className="p-5 sm:p-6">
                        <div className="flex items-start gap-4">
                            {/* Icon container */}
                            <div className="relative flex-shrink-0">
                                <motion.div
                                    className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300"
                                    style={{
                                        background: isActive
                                            ? `linear-gradient(135deg, ${step.color}, ${step.color}bb)`
                                            : `${step.color}12`,
                                    }}
                                    animate={{ rotate: isActive ? [0, -3, 3, 0] : 0 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <Icon className="w-6 h-6 transition-colors" style={{ color: isActive ? "white" : step.color }} />
                                </motion.div>
                                {/* Step number */}
                                <div
                                    className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs border-2 border-white shadow-sm"
                                    style={{ background: "#0A2C74", fontWeight: 800 }}
                                >
                                    {step.step}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <p className="text-xs mb-0.5" style={{ color: step.color, fontWeight: 600 }}>
                                    Langkah {step.step}
                                </p>
                                <h3 className="text-gray-900 leading-snug mb-0.5" style={{ fontWeight: 800, fontSize: "1.05rem" }}>
                                    {step.title}
                                </h3>
                                <p className="text-gray-400 text-xs mb-0">{step.subtitle}</p>
                            </div>

                            {/* Chevron */}
                            <motion.div
                                animate={{ rotate: isActive ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                                className="flex-shrink-0 mt-1"
                            >
                                <ChevronDown className="w-4 h-4 text-gray-300" />
                            </motion.div>
                        </div>

                        {/* Expanded detail */}
                        <AnimatePresence>
                            {isActive && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                    className="overflow-hidden"
                                >
                                    <div className="mt-4 pt-4 border-t" style={{ borderColor: `${step.color}20` }}>
                                        <p className="text-gray-600 text-sm leading-relaxed mb-3">{step.desc}</p>
                                        {/* Tip */}
                                        <div
                                            className="flex items-start gap-2.5 p-3 rounded-xl text-xs"
                                            style={{ background: `${step.color}08`, border: `1px solid ${step.color}20` }}
                                        >
                                            <Sparkles className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: step.color }} />
                                            <span className="text-gray-600">{step.tip}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.button>
        </motion.div>
    );
}

// ── Wave timeline card (compact) ──────────────────────────────────────────
function WaveCard({ wave, isActive, onClick }: {
    wave: typeof admisiWaves[0]; isActive: boolean; onClick: () => void;
}) {
    return (
        <motion.button
            onClick={onClick}
            className="w-full text-left"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
        >
            <div
                className="relative rounded-2xl border-2 p-5 transition-all duration-300 overflow-hidden"
                style={{
                    borderColor: isActive ? wave.color : "rgba(0,0,0,0.06)",
                    background: isActive ? `linear-gradient(135deg, ${wave.color}10, white)` : "white",
                    boxShadow: isActive ? `0 12px 40px ${wave.color}18` : "0 1px 4px rgba(0,0,0,0.04)",
                }}
            >
                {/* Active indicator */}
                {isActive && (
                    <motion.div
                        layoutId="wave-active-bar"
                        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                        style={{ background: wave.color }}
                    />
                )}

                <div className="flex items-center justify-between mb-3">
                    <span
                        className="text-xs uppercase tracking-widest px-2.5 py-1 rounded-full"
                        style={{ background: `${wave.color}15`, color: wave.color, fontWeight: 700 }}
                    >
                        {wave.label}
                    </span>
                    <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                            background: wave.status === "upcoming" ? "#dcfce7" : "#f3f4f6",
                            color: wave.status === "upcoming" ? "#16a34a" : "#9ca3af",
                            fontWeight: 500,
                        }}
                    >
                        {wave.status === "upcoming" ? "● Terbuka" : "Tutup"}
                    </span>
                </div>

                <p className="text-gray-400 text-xs mb-0.5">Batas pendaftaran</p>
                <p className="text-gray-900" style={{ fontWeight: 800 }}>{wave.deadline}</p>

                <div className="mt-3 pt-3 border-t border-gray-50 space-y-1">
                    <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: wave.color }} />
                        Psikotes: {wave.tests.psikotes}
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                        Tertulis: {wave.tests.tertulis}
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                        Wawancara: {wave.tests.wawancara}
                    </div>
                </div>
            </div>
        </motion.button>
    );
}

// ── Requirement Item ──────────────────────────────────────────────────────
function ReqItem({ text, index, color }: { text: string; index: number; color: string }) {
    return (
        <motion.li
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: index * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-start gap-3 group"
        >
            <div
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-white text-xs transition-transform group-hover:scale-110"
                style={{ background: color, fontWeight: 800 }}
            >
                {index + 1}
            </div>
            <span className="text-gray-700 text-sm leading-relaxed">{text}</span>
        </motion.li>
    );
}

import PageHeader from "@/components/shared/PageHeader";

export default function ProsedurAdmisiPage() {
    const [activeStep, setActiveStep] = useState<number | null>(0);
    const [activeTab, setActiveTab] = useState<"s1" | "s2">("s1");
    const [activeWave, setActiveWave] = useState("III");
    const [expandedWaveStep, setExpandedWaveStep] = useState<number | null>(null);
    const [pathProgress, setPathProgress] = useState(0);


    useEffect(() => {
        const timer = setTimeout(() => setPathProgress(1), 600);
        return () => clearTimeout(timer);
    }, []);

    const selectedWave = admisiWaves.find((w) => w.id === activeWave)!;

    return (
        <>
            <PageHeader
                title="Prosedur Pendaftaran"
                category="Admisi"
                description="Panduan lengkap langkah demi langkah untuk mendaftar sebagai mahasiswa di Sekolah Tinggi Teologi Bandung. Mulailah perjalanan panggilan Anda hari ini."
                breadcrumb={[
                    { label: "Admisi", href: "/jadwal-admisi" },
                    { label: "Prosedur", href: "/prosedur-admisi" }
                ]}
                image="https://images.unsplash.com/photo-1643050078046-55df21dfad42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1600"
            >
                <div className="flex flex-wrap gap-4 mb-6">
                    <a
                        href={admisiContact.portalUrl}
                        target="_blank" rel="noreferrer"
                        className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#E62129] text-white font-semibold hover:bg-[#c4131a] transition-all hover:shadow-xl hover:shadow-red-900/30 hover:-translate-y-0.5"
                    >
                        Daftar Sekarang
                        <ExternalLink className="w-4 h-4" />
                    </a>
                    <button
                        onClick={() => document.getElementById("jadwal")?.scrollIntoView({ behavior: "smooth" })}
                        className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl border border-white/20 bg-white/8 backdrop-blur-sm text-white font-semibold hover:bg-white/15 transition-all"
                    >
                        <Calendar className="w-4 h-4" />
                        Lihat Jadwal
                    </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl">
                    {[
                        { label: "Gelombang", value: "3" },
                        { label: "Jenjang Program", value: "S1 & S2" },
                        { label: "Proses Tes", value: "Online" },
                        { label: "Bahasa", value: "Indonesia" },
                    ].map((stat) => (
                        <div key={stat.label} className="bg-white/8 backdrop-blur-sm border border-white/12 rounded-xl p-3.5 text-center">
                            <div className="text-white text-sm mb-0.5" style={{ fontWeight: 800 }}>{stat.value}</div>
                            <div className="text-blue-200/60 text-xs">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </PageHeader>

            {/* ── STEPS JOURNEY ────────────────────────────────────────────── */}
            < section className="pt-8 pb-16 bg-white relative overflow-hidden" >
                {/* Subtle background pattern */}
                < div
                    className="absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage: "radial-gradient(circle at 1px 1px, #0A2C74 1px, transparent 0)",
                        backgroundSize: "32px 32px",
                    }
                    }
                />

                < div className="max-w-5xl mx-auto px-4 sm:px-6 relative" >
                    <FadeIn className="text-center mb-14">
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#E62129] text-sm mb-3">
                            <CheckCircle className="w-3.5 h-3.5" />
                            Langkah Pendaftaran
                        </span>
                        <h2 className="text-gray-900 mb-3" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800 }}>
                            4 Langkah Menuju STTB
                        </h2>
                        <p className="text-gray-500 max-w-lg mx-auto text-sm">
                            Klik setiap langkah untuk melihat panduan lengkap. Prosesnya sederhana — yang terpenting adalah panggilan Anda.
                        </p>
                    </FadeIn>

                    {/* Step cards — vertical accordion */}
                    <div className="grid lg:grid-cols-2 gap-4">
                        {admisiSteps.map((step, i) => (
                            <JourneyStep
                                key={step.step}
                                step={step}
                                index={i}
                                isActive={activeStep === i}
                                onClick={() => setActiveStep(activeStep === i ? null : i)}
                            />
                        ))}
                    </div>

                    {/* CTA */}
                    <FadeIn delay={0.3} className="mt-10 text-center">
                        <a
                            href={admisiContact.portalUrl}
                            target="_blank" rel="noreferrer"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#E62129] to-[#c4131a] text-white font-semibold hover:shadow-xl hover:shadow-red-200 hover:-translate-y-0.5 transition-all"
                        >
                            Mulai Pendaftaran Online
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </FadeIn>
                </div >
            </section >

            {/* ── REQUIREMENTS ─────────────────────────────────────────────── */}
            < section className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #050d1f 0%, #0A2C74 60%, #0570CD 100%)" }}>
                {/* Decorative */}
                < div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #E62129 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />
                < div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-5" style={{ background: "radial-gradient(circle, white 0%, transparent 70%)", transform: "translate(-30%, 30%)" }} />

                < div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10" >
                    <FadeIn className="text-center mb-12">
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm mb-3">
                            <FileText className="w-3.5 h-3.5" />
                            Berkas Persyaratan
                        </span>
                        <h2 className="text-white mb-3" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800 }}>
                            Dokumen yang Diperlukan
                        </h2>
                        <p className="text-blue-200/70 max-w-lg mx-auto text-sm">
                            Pastikan semua dokumen sudah siap sebelum mendaftar. Kelengkapan berkas menentukan tahap seleksi berikutnya.
                        </p>
                    </FadeIn>

                    {/* Tab toggle */}
                    <FadeIn delay={0.15} className="flex justify-center mb-10">
                        <div className="inline-flex gap-1 p-1.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15">
                            {(["s1", "s2"] as const).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className="relative px-8 py-2.5 rounded-xl text-sm font-bold transition-colors"
                                    style={{ color: activeTab === tab ? (tab === "s1" ? "#E62129" : "#0A2C74") : "rgba(255,255,255,0.6)" }}
                                >
                                    {activeTab === tab && (
                                        <motion.div
                                            layoutId="req-tab"
                                            className="absolute inset-0 rounded-xl bg-white"
                                            transition={{ type: "spring", stiffness: 400, damping: 35 }}
                                        />
                                    )}
                                    <span className="relative z-10">
                                        {tab === "s1" ? "Sarjana (S1)" : "Magister (S2)"}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </FadeIn>

                    {/* Requirements list */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.3 }}
                            className="grid sm:grid-cols-2 gap-3 max-w-3xl mx-auto"
                        >
                            {admisiRequirements[activeTab].map((req, i) => (
                                <motion.div
                                    key={req}
                                    initial={{ opacity: 0, x: -12 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.07, duration: 0.4 }}
                                    className="flex items-start gap-3 p-3.5 rounded-xl bg-white/8 backdrop-blur-sm border border-white/12 hover:bg-white/12 transition-colors"
                                >
                                    <div
                                        className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-xs flex-shrink-0 mt-0.5"
                                        style={{ background: activeTab === "s1" ? "#E62129" : "#0570CD", fontWeight: 800 }}
                                    >
                                        {i + 1}
                                    </div>
                                    <span className="text-white/85 text-sm leading-relaxed">{req}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {/* Download hint */}
                    <FadeIn delay={0.4} className="text-center mt-8">
                        <p className="text-blue-200/60 text-xs flex items-center justify-center gap-1.5">
                            <AlertCircle className="w-3.5 h-3.5" />
                            Formulir pendaftaran dapat diunduh setelah registrasi online.
                        </p>
                    </FadeIn>
                </div >
            </section >

            {/* ── JADWAL ADMISI ────────────────────────────────────────────── */}
            < section id="jadwal" className="py-20 bg-gray-50" >
                <div className="max-w-6xl mx-auto px-4 sm:px-6">

                    <FadeIn className="text-center mb-12">
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#0570CD] text-sm mb-3">
                            <Calendar className="w-3.5 h-3.5" />
                            Jadwal Penerimaan
                        </span>
                        <h2 className="text-gray-900 mb-3" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800 }}>
                            Jadwal Admisi 2026–2027
                        </h2>
                        <p className="text-gray-500 max-w-lg mx-auto text-sm">
                            Tersedia 3 gelombang penerimaan. Pilih gelombang yang sesuai dengan kesiapan berkas Anda.
                        </p>
                    </FadeIn>

                    {/* Wave selector */}
                    <div className="grid md:grid-cols-3 gap-4 mb-10">
                        {admisiWaves.map((wave) => (
                            <FadeIn key={wave.id}>
                                <WaveCard
                                    wave={wave}
                                    isActive={activeWave === wave.id}
                                    onClick={() => { setActiveWave(wave.id); setExpandedWaveStep(null); }}
                                />
                            </FadeIn>
                        ))}
                    </div>

                    {/* Selected wave detail */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeWave}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
                        >
                            {/* Wave header */}
                            <div
                                className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                                style={{ background: `linear-gradient(135deg, ${selectedWave.color}10, transparent)`, borderBottom: `1px solid ${selectedWave.color}15` }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm" style={{ background: selectedWave.color, fontWeight: 800 }}>
                                        {selectedWave.id}
                                    </div>
                                    <div>
                                        <h3 className="text-gray-900" style={{ fontWeight: 800, fontSize: "1.1rem" }}>
                                            Aktivitas — {selectedWave.label}
                                        </h3>
                                        <p className="text-gray-400 text-xs">Batas daftar: {selectedWave.deadline}</p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-3 text-xs">
                                    <span className="px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-100 text-gray-600">
                                        Psikotes: <strong>{selectedWave.tests.psikotes}</strong>
                                    </span>
                                    <span className="px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-100 text-gray-600">
                                        Tertulis: <strong>{selectedWave.tests.tertulis}</strong>
                                    </span>
                                    <span className="px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-100 text-gray-600">
                                        Wawancara: <strong>{selectedWave.tests.wawancara}</strong>
                                    </span>
                                </div>
                            </div>

                            {/* Steps list */}
                            <div className="p-6">
                                <div className="relative">
                                    {/* Vertical line */}
                                    <div
                                        className="absolute left-4 top-5 bottom-5 w-0.5"
                                        style={{ background: `linear-gradient(to bottom, ${selectedWave.color}, ${selectedWave.color}20)` }}
                                    />

                                    <div className="space-y-3">
                                        {selectedWave.steps.map((step, i) => {
                                            const MethodIcon = methodIcons[step.via] || FileText;
                                            const isExpanded = expandedWaveStep === i;
                                            return (
                                                <motion.div
                                                    key={step.no}
                                                    initial={{ opacity: 0, x: -12 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.04 }}
                                                    className="flex gap-4"
                                                >
                                                    {/* Step bubble */}
                                                    <div
                                                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0 z-10 relative shadow-sm"
                                                        style={{ background: selectedWave.color, fontWeight: 800 }}
                                                    >
                                                        {step.no}
                                                    </div>

                                                    {/* Content */}
                                                    <button
                                                        onClick={() => setExpandedWaveStep(isExpanded ? null : i)}
                                                        className="flex-1 text-left rounded-xl border border-gray-50 bg-gray-50 hover:bg-gray-100 hover:border-gray-100 transition-all p-3.5"
                                                    >
                                                        <div className="flex items-center justify-between gap-2">
                                                            <h4 className="text-gray-900 text-sm" style={{ fontWeight: 600 }}>{step.title}</h4>
                                                            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                                                <ChevronDown className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />
                                                            </motion.div>
                                                        </div>
                                                        <AnimatePresence>
                                                            {isExpanded && (
                                                                <motion.div
                                                                    initial={{ height: 0, opacity: 0 }}
                                                                    animate={{ height: "auto", opacity: 1 }}
                                                                    exit={{ height: 0, opacity: 0 }}
                                                                    transition={{ duration: 0.25 }}
                                                                    className="overflow-hidden"
                                                                >
                                                                    <div className="mt-2 flex flex-wrap gap-3 pt-2 border-t border-gray-100">
                                                                        <span className="flex items-center gap-1 text-gray-500 text-xs">
                                                                            <Clock className="w-3 h-3" /> {step.when}
                                                                        </span>
                                                                        <span className="flex items-center gap-1 text-gray-500 text-xs">
                                                                            <MethodIcon className="w-3 h-3" /> {step.via}
                                                                        </span>
                                                                    </div>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </button>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Notes */}
                                <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-100">
                                    <div className="flex items-start gap-2 mb-2">
                                        <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                                        <span className="text-amber-800 text-sm" style={{ fontWeight: 600 }}>Catatan Penting</span>
                                    </div>
                                    <ul className="space-y-1.5 ml-6">
                                        {[
                                            "Batas gelombang adalah akhir penerimaan berkas di kantor Admisi STTB.",
                                            "Berkas tidak lengkap tidak akan dipanggil tes.",
                                            "Konfirmasi jadwal tes akan dikirim via surat panggilan & grup WhatsApp.",
                                        ].map((note, i) => (
                                            <li key={i} className="flex items-start gap-1.5 text-amber-700 text-xs">
                                                <span className="w-1 h-1 rounded-full bg-amber-400 flex-shrink-0 mt-1.5" />
                                                {note}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mt-5 text-center">
                                    <Link
                                        href="/jadwal-admisi"
                                        className="inline-flex items-center gap-2 text-[#0570CD] text-sm font-semibold hover:underline"
                                    >
                                        Lihat jadwal lengkap & detail semua gelombang
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section >

            {/* ── CONTACT CTA ──────────────────────────────────────────────── */}
            < section className="py-20 bg-white" >
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <div className="grid md:grid-cols-5 gap-6 items-stretch">

                        {/* Contact card */}
                        <FadeIn direction="left" className="md:col-span-2">
                            <div className="h-full rounded-3xl p-7 flex flex-col justify-between" style={{ background: "linear-gradient(135deg, #0A2C74, #071a4a)" }}>
                                <div>
                                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-5">
                                        <Phone className="w-5 h-5 text-white" />
                                    </div>
                                    <h3 className="text-white mb-1" style={{ fontWeight: 800, fontSize: "1.2rem" }}>Butuh Bantuan?</h3>
                                    <p className="text-blue-200/70 text-sm mb-6 leading-relaxed">
                                        Tim admisi kami siap membantu Anda sepanjang proses pendaftaran.
                                    </p>
                                </div>
                                <div className="space-y-3">
                                    <a href={admisiContact.phoneTel} className="flex items-center gap-3 p-3 rounded-xl bg-white/8 border border-white/12 hover:bg-white/15 transition-colors text-white text-sm">
                                        <Phone className="w-4 h-4 text-blue-300 flex-shrink-0" />
                                        {admisiContact.phone}
                                    </a>
                                    <a href={`mailto:${admisiContact.email}`} className="flex items-center gap-3 p-3 rounded-xl bg-white/8 border border-white/12 hover:bg-white/15 transition-colors text-white text-sm">
                                        <Mail className="w-4 h-4 text-blue-300 flex-shrink-0" />
                                        {admisiContact.email}
                                    </a>
                                </div>
                            </div>
                        </FadeIn>

                        {/* Main CTA */}
                        <FadeIn delay={0.1} className="md:col-span-3">
                            <div className="h-full rounded-3xl overflow-hidden relative" style={{ background: "linear-gradient(135deg, #E62129, #a01018)" }}>
                                {/* Decorative circle */}
                                <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5" />
                                <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-white/5" />

                                <div className="relative z-10 p-7 flex flex-col h-full justify-between">
                                    <div>
                                        <div
                                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-white/90 text-xs mb-5"
                                            style={{ fontWeight: 600 }}
                                        >
                                            <Sparkles className="w-3 h-3" />
                                            TA 2026–2027 · Gelombang III Terbuka
                                        </div>
                                        <h3 className="text-white mb-3" style={{ fontWeight: 800, fontSize: "1.5rem", lineHeight: 1.2 }}>
                                            Siap Menjawab<br />Panggilan Anda?
                                        </h3>
                                        <p className="text-red-100/80 text-sm mb-6 leading-relaxed">
                                            Bergabunglah dengan ribuan alumni STTB yang kini melayani gereja dan masyarakat di seluruh Indonesia.
                                        </p>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <a
                                            href={admisiContact.portalUrl}
                                            target="_blank" rel="noreferrer"
                                            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-[#E62129] text-sm font-bold hover:bg-red-50 transition-colors shadow-lg"
                                        >
                                            Daftar Online
                                            <ExternalLink className="w-3.5 h-3.5" />
                                        </a>
                                        <Link
                                            href="/beasiswa"
                                            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-white/25 text-white text-sm font-bold hover:bg-white/10 transition-colors"
                                        >
                                            Info Beasiswa
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section >
        </>
    );
}