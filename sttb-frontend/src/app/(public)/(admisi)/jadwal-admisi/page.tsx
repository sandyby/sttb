"use client";

import { useState, Fragment } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { Calendar, Clock, CheckCircle2, Phone, Mail, ArrowRight, FileText, User, Video, Monitor, Loader2 } from "lucide-react";
import { FadeIn, StaggerGroup, StaggerItem } from "@/components/ui/FadeIn";
import { admisiContact, methodIcons } from "@/data/admisi-data";
import { useAdmissionWaves } from "@/hooks/useAdmissionWaves";

function formatDeadline(dateStr: string) {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

function formatSchedule(str: string | null) {
    if (!str) return "";
    const d = new Date(str);
    if (isNaN(d.getTime())) return str;
    const dateStr = d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
    // Show time if not midnight
    if (d.getHours() !== 0 || d.getMinutes() !== 0) {
        const h = d.getHours().toString().padStart(2, "0");
        const m = d.getMinutes().toString().padStart(2, "0");
        return `${dateStr}, ${h}.${m} WIB`;
    }
    return dateStr;
}
import type { AdmissionWaveStep } from "@/types/admission";

export default function JadwalAdmisiPage() {
    const { data, isLoading } = useAdmissionWaves(true);
    const waves = data?.items ?? [];

    const [activeWaveId, setActiveWaveId] = useState<string | null>(null);

    // Use the first wave as default once loaded
    const defaultWave = waves[0] ?? null;
    const activeWave = waves.find((w) => w.id === activeWaveId) ?? defaultWave;

    if (isLoading) {
        return (
            <>
                <div className="pt-28 pb-20 bg-gradient-to-br from-[#0A2C74] to-[#0570CD] relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4">
                        <h1 className="text-white mb-4" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 800 }}>
                            Jadwal Pendaftaran Mahasiswa Baru
                        </h1>
                    </div>
                </div>
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-[#E62129]" />
                </div>
            </>
        );
    }

    return (
        <>
            {/* Hero */}
            <div className="pt-28 pb-20 bg-gradient-to-br from-[#0A2C74] to-[#0570CD] relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none opacity-5">
                    <div className="absolute top-1/2 right-10 w-72 h-72 rounded-full border-8 border-white" style={{ transform: "translateY(-50%)" }} />
                    <div className="absolute top-1/2 right-10 w-40 h-40 rounded-full border-4 border-white" style={{ transform: "translateY(-50%) translateX(16px)" }} />
                </div>
                <div className="max-w-7xl mx-auto px-4 relative">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-6 h-px bg-[#E62129]" />
                            <span className="text-[#E62129] text-xs font-semibold uppercase tracking-widest">Admisi</span>
                        </div>
                        <h1 className="text-white mb-4" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 800 }}>
                            Jadwal Pendaftaran Mahasiswa Baru
                        </h1>
                        <p className="text-blue-200 max-w-2xl leading-relaxed">
                            Pendaftaran Tahun Akademik 2026–2027. Tersedia {waves.length || 3} gelombang pendaftaran dengan jadwal tes yang telah ditentukan.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Wave overview cards */}
            {waves.length > 0 && (
                <section className="py-10 bg-white dark:bg-gray-900">
                    <div className="max-w-5xl mx-auto px-4">
                        <StaggerGroup staggerDelay={0.12} className="grid md:grid-cols-3 gap-5">
                            {waves.map((w) => (
                                <StaggerItem key={w.id}>
                                    <button
                                        onClick={() => setActiveWaveId(w.id)}
                                        className={`w-full text-left rounded-xl border-2 p-5 transition-all hover:shadow-md ${
                                            (activeWaveId ?? waves[0]?.id) === w.id
                                                ? "border-current shadow-lg"
                                                : "border-gray-100 dark:border-gray-800"
                                        }`}
                                        style={(activeWaveId ?? waves[0]?.id) === w.id ? { borderColor: w.color } : {}}
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <span
                                                className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                                                style={{ backgroundColor: `${w.color}15`, color: w.color }}
                                            >
                                                {w.label}
                                            </span>
                                            {w.status === "upcoming" && (
                                                <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full">
                                                    Terbuka
                                                </span>
                                            )}
                                            {w.status === "open" && (
                                                <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full">
                                                    Berjalan
                                                </span>
                                            )}
                                            {w.status === "closed" && (
                                                <span className="text-xs font-medium text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                                                    Tutup
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-gray-500 dark:text-gray-400 text-xs mb-1">Batas pendaftaran</p>
                                        <p className="text-gray-900 dark:text-white font-bold">{formatDeadline(w.deadline)}</p>
                                        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 space-y-1">
                                            {w.psikotesSchedule && (
                                                <p className="text-gray-500 dark:text-gray-400 text-xs">Psikotes: {formatSchedule(w.psikotesSchedule)}</p>
                                            )}
                                            {w.tertulisSchedule && (
                                                <p className="text-gray-500 dark:text-gray-400 text-xs">Tertulis: {formatSchedule(w.tertulisSchedule)}</p>
                                            )}
                                            {w.wawancaraSchedule && (
                                                <p className="text-gray-500 dark:text-gray-400 text-xs">Wawancara: {formatSchedule(w.wawancaraSchedule)}</p>
                                            )}
                                        </div>
                                    </button>
                                </StaggerItem>
                            ))}
                        </StaggerGroup>
                    </div>
                </section>
            )}

            {/* Detailed steps */}
            {activeWave && activeWave.steps.length > 0 && (
                <section className="py-10 bg-gray-50 dark:bg-gray-950">
                    <div className="max-w-4xl mx-auto px-4">
                        <FadeIn>
                            <div className="flex items-center gap-3 mb-6">
                                <div
                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                                    style={{ backgroundColor: activeWave.color }}
                                >
                                    {activeWave.waveNumber}
                                </div>
                                <h2 className="text-gray-900 dark:text-white font-bold text-lg">
                                    Aktivitas Penerimaan — {activeWave.label}
                                </h2>
                            </div>
                        </FadeIn>

                        <div className="relative">
                            <div
                                className="absolute left-[19px] top-3 bottom-3 w-0.5"
                                style={{ background: `linear-gradient(to bottom, ${activeWave.color}, ${activeWave.color}40)` }}
                            />
                            <StaggerGroup staggerDelay={0.07} className="space-y-3">
                                {activeWave.steps
                                    .slice()
                                    .sort((a, b) => a.stepNumber - b.stepNumber)
                                    .map((step: AdmissionWaveStep) => {
                                        const MethodIcon = methodIcons[step.via] || FileText;
                                        return (
                                            <StaggerItem key={step.stepNumber}>
                                                <div className="flex gap-4">
                                                    <div
                                                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 z-10 relative shadow-md"
                                                        style={{ backgroundColor: activeWave.color }}
                                                    >
                                                        {step.stepNumber}
                                                    </div>
                                                    <div className="flex-1 bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-100 dark:border-gray-800 hover:shadow-sm transition-shadow">
                                                        <h3 className="text-gray-900 dark:text-white font-semibold text-sm mb-1">{step.title}</h3>
                                                        <div className="flex flex-wrap gap-3">
                                                            {step.whenText && (
                                                                <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-xs">
                                                                    <Clock className="w-3 h-3" /> {formatSchedule(step.whenText)}
                                                                </span>
                                                            )}
                                                            {step.via && (
                                                                <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-xs">
                                                                    <MethodIcon className="w-3 h-3" /> {step.via}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </StaggerItem>
                                        );
                                    })}
                            </StaggerGroup>
                        </div>

                        {/* Notes */}
                        <FadeIn delay={0.3}>
                            <div className="mt-8 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-xl p-5">
                                <h3 className="text-amber-800 dark:text-amber-300 font-semibold text-sm mb-3 flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4" /> Catatan Penting
                                </h3>
                                <ul className="space-y-2">
                                    {[
                                        "Tanggal penutupan pendaftaran tiap gelombang adalah batas akhir di mana semua berkas pendaftaran sudah diterima oleh pihak Admisi STTB.",
                                        "Pendaftar yang berkasnya tidak lolos seleksi dokumen tidak akan dipanggil untuk ikut tes.",
                                        "Tanggal tes dan berbagai aktivitas admisi lainnya akan dikonfirmasi kembali dalam surat panggilan tes dan grup WhatsApp peserta.",
                                    ].map((note, i) => (
                                        <li key={i} className="flex items-start gap-2 text-amber-700 dark:text-amber-400 text-xs">
                                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0 mt-1" />
                                            {note}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </FadeIn>
                    </div>
                </section>
            )}

            {/* Contact + CTA */}
            <section className="py-14 bg-white dark:bg-gray-900">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-6">
                        <FadeIn direction="left">
                            <div className="bg-[#0A2C74] rounded-2xl p-6 text-white">
                                <h3 className="font-bold text-lg mb-4">Bantuan Informasi & Pengembalian Berkas</h3>
                                <div className="space-y-3">
                                    <a href={admisiContact.phoneTel} className="flex items-center gap-3 hover:text-blue-200 transition-colors">
                                        <Phone className="w-4 h-4 text-blue-300" />
                                        <span>{admisiContact.phone}</span>
                                    </a>
                                    <a href={`mailto:${admisiContact.email}`} className="flex items-center gap-3 hover:text-blue-200 transition-colors">
                                        <Mail className="w-4 h-4 text-blue-300" />
                                        <span>{admisiContact.email}</span>
                                    </a>
                                    <a href={`mailto:${admisiContact.emailBeasiswa}`} className="flex items-center gap-3 hover:text-blue-200 transition-colors">
                                        <Mail className="w-4 h-4 text-blue-300" />
                                        <span>{admisiContact.emailBeasiswa}</span>
                                        <span className="text-blue-300 text-xs">(Info Beasiswa)</span>
                                    </a>
                                </div>
                            </div>
                        </FadeIn>
                        <FadeIn direction="right">
                            <div className="bg-[#E62129] rounded-2xl p-6 text-white">
                                <h3 className="font-bold text-lg mb-4">Pendaftaran Mahasiswa Baru 2026–2027</h3>
                                <p className="text-red-100 text-sm mb-5 leading-relaxed">
                                    Daftarkan diri Anda sekarang melalui sistem pendaftaran online resmi STTB.
                                </p>
                                <div className="flex flex-col gap-3">
                                    <a
                                        href={admisiContact.portalUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-white text-[#E62129] font-semibold text-sm hover:bg-red-50 transition-colors"
                                    >
                                        Daftar Online <ArrowRight className="w-4 h-4" />
                                    </a>
                                    <Link
                                        href="/beasiswa"
                                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
                                    >
                                        Info Beasiswa
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
