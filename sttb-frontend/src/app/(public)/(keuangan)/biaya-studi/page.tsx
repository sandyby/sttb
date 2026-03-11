"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import {
    GraduationCap, ChevronDown, ChevronUp, Info, ArrowRight,
} from "lucide-react";
import { FadeIn, StaggerGroup, StaggerItem } from "@/components/ui/FadeIn";

type FeeRow = { no?: number; jenis: string; nominal: string; };
type Program = {
    id: string;
    title: string;
    level: "S1" | "S2";
    color: string;
    rows: FeeRow[];
    notes: string[];
    link: string;
    extra?: {
        subtitle: string;
        rows: FeeRow[];
        note: string;
    };
};

const programs: Program[] = [
    {
        id: "sth",
        title: "Program Sarjana Teologi (S.Th.)",
        level: "S1",
        color: "#E62129",
        link: "/sarjana-teologi",
        rows: [
            { no: 1, jenis: "Administrasi — Pendaftaran & Tes Masuk", nominal: "Rp. 500.000,-" },
            { no: 2, jenis: "Administrasi Per Semester", nominal: "Rp. 500.000,-" },
            { no: 3, jenis: "Pendidikan (Biaya Kuliah) Per Semester", nominal: "Rp. 9.000.000,-" },
            { no: 4, jenis: "Kuliah/Bimbingan Khusus", nominal: "Rp. 1.500.000,-" },
            { no: 5, jenis: "Bimbingan Tugas Akhir", nominal: "Rp. 2.000.000,-" },
            { no: 6, jenis: "Wisuda", nominal: "Rp. 500.000,-" },
            { no: 7, jenis: "Cuti Akademik (per semester)", nominal: "Rp. 500.000,-" },
        ],
        notes: [
            "Pembayaran biaya pendidikan 1 semester (Rp.9.000.000,-) dapat dilakukan sekaligus atau dicicil 6 bulan sebesar Rp.1.500.000,-/bulan.",
            "Biaya administrasi semester dibayarkan di awal semester (bulan Januari & Juli) selama mahasiswa berstatus aktif.",
            "STTB memberikan subsidi untuk biaya akomodasi & konsumsi.",
            "Biaya sewaktu-waktu dapat berubah (dengan pemberitahuan sebelumnya).",
        ],
    },
    {
        id: "spdk",
        title: "Program Sarjana Pendidikan Kristen (S.Pd.K.)",
        level: "S1",
        color: "#E62129",
        link: "/sarjana-pendidikan-kristen",
        rows: [
            { no: 1, jenis: "Administrasi — Pendaftaran & Tes Masuk", nominal: "Rp. 500.000,-" },
            { no: 2, jenis: "Administrasi Per Semester", nominal: "Rp. 500.000,-" },
            { no: 3, jenis: "Pendidikan (Biaya Kuliah) Per Semester", nominal: "Rp. 9.000.000,-" },
            { no: 4, jenis: "Kuliah/Bimbingan Khusus", nominal: "Rp. 1.500.000,-" },
            { no: 5, jenis: "Bimbingan Tugas Akhir", nominal: "Rp. 2.000.000,-" },
            { no: 6, jenis: "Wisuda", nominal: "Rp. 500.000,-" },
            { no: 7, jenis: "Cuti Akademik (per semester)", nominal: "Rp. 500.000,-" },
        ],
        notes: [
            "Pembayaran biaya pendidikan 1 semester (Rp.9.000.000,-) dapat dilakukan sekaligus atau dicicil 6 bulan sebesar Rp.1.500.000,-/bulan.",
            "Biaya administrasi semester dibayarkan di awal semester (bulan Januari & Juli) selama mahasiswa berstatus aktif.",
            "STTB memberikan subsidi untuk biaya akomodasi & konsumsi.",
            "Biaya sewaktu-waktu dapat berubah (dengan pemberitahuan sebelumnya).",
        ],
    },
    {
        id: "mth",
        title: "Program Magister Teologi (M.Th.)",
        level: "S2",
        color: "#0A2C74",
        link: "/magister-teologi-pelayanan-pastoral-gereja-urban",
        rows: [
            { no: 1, jenis: "Administrasi — Pendaftaran & Tes Masuk", nominal: "Rp. 500.000,-" },
            { no: 2, jenis: "Administrasi Per Semester", nominal: "Rp. 500.000,-" },
            { no: 3, jenis: "Kuliah/Bimbingan Khusus", nominal: "Rp. 1.500.000,-" },
            { no: 4, jenis: "Pendidikan (Kuliah) Per Mata Kuliah", nominal: "Rp. 2.000.000,-" },
            { no: 5, jenis: "Bimbingan & Ujian Proposal Tesis", nominal: "Rp. 5.000.000,-" },
            { no: 6, jenis: "Bimbingan & Sidang Tesis", nominal: "Rp. 2.500.000,-" },
            { no: 7, jenis: "Wisuda", nominal: "Rp. 500.000,-" },
            { no: 8, jenis: "Cuti Akademik (per semester)", nominal: "Rp. 500.000,-" },
        ],
        notes: [
            "Biaya pendidikan/kuliah dibayarkan selambat-lambatnya 2 minggu sebelum perkuliahan dimulai.",
            "Biaya administrasi semester dibayarkan di awal semester (bulan Januari & Juli).",
            "Biaya sewaktu-waktu dapat berubah (dengan pemberitahuan sebelumnya).",
        ],
        extra: {
            subtitle: "Program Matrikulasi M.Th. (bagi yang tidak memiliki gelar S.Th.)",
            rows: [
                { jenis: "Biaya Kuliah Matrikulasi M.Th. per Semester", nominal: "Rp. 7.800.000,-" },
                { jenis: "Administrasi Per Semester", nominal: "Rp. 500.000,-" },
            ],
            note: "Dapat dicicil 6 bulan sebesar Rp.1.300.000,-/bulan.",
        },
    },
    {
        id: "mpdk",
        title: "Program Magister Pendidikan Kristen (M.Pd.K.)",
        level: "S2",
        color: "#0A2C74",
        link: "/magister-pendidikan-kristen",
        rows: [
            { no: 1, jenis: "Administrasi — Pendaftaran & Tes Masuk", nominal: "Rp. 500.000,-" },
            { no: 2, jenis: "Administrasi Per Semester", nominal: "Rp. 500.000,-" },
            { no: 3, jenis: "Kuliah/Bimbingan Khusus", nominal: "Rp. 1.500.000,-" },
            { no: 4, jenis: "Pendidikan (Kuliah) Per Mata Kuliah", nominal: "Rp. 2.000.000,-" },
            { no: 5, jenis: "Bimbingan & Ujian Proposal Tesis", nominal: "Rp. 5.000.000,-" },
            { no: 6, jenis: "Bimbingan & Sidang Tesis", nominal: "Rp. 2.500.000,-" },
            { no: 7, jenis: "Wisuda", nominal: "Rp. 500.000,-" },
            { no: 8, jenis: "Cuti Akademik (per semester)", nominal: "Rp. 500.000,-" },
        ],
        notes: [
            "Biaya pendidikan/kuliah dibayarkan selambat-lambatnya 2 minggu sebelum perkuliahan dimulai.",
            "Biaya administrasi semester dibayarkan di awal semester (bulan Januari & Juli).",
            "Biaya sewaktu-waktu dapat berubah (dengan pemberitahuan sebelumnya).",
        ],
    },
    {
        id: "mmin",
        title: "Program Magister Ministri (M.Min.) — Marketplace",
        level: "S2",
        color: "#0A2C74",
        link: "/magister-ministri-marketplace",
        rows: [
            { no: 1, jenis: "Administrasi — Pendaftaran & Tes Masuk", nominal: "Rp. 500.000,-" },
            { no: 2, jenis: "Administrasi Per Semester", nominal: "Rp. 500.000,-" },
            { no: 3, jenis: "Kuliah/Bimbingan Khusus", nominal: "Rp. 1.500.000,-" },
            { no: 4, jenis: "Pendidikan (Kuliah) Per Mata Kuliah", nominal: "Rp. 2.500.000,-" },
            { no: 5, jenis: "Tugas Akhir (Proyek)", nominal: "Rp. 2.500.000,-" },
            { no: 6, jenis: "Wisuda", nominal: "Rp. 500.000,-" },
            { no: 7, jenis: "Cuti Akademik (per semester)", nominal: "Rp. 500.000,-" },
        ],
        notes: [
            "Biaya pendidikan/kuliah dibayarkan selambat-lambatnya 2 minggu sebelum perkuliahan dimulai.",
            "Biaya administrasi semester dibayarkan di awal semester (bulan Januari & Juli).",
            "Biaya sewaktu-waktu dapat berubah (dengan pemberitahuan sebelumnya).",
        ],
    },
];

const quickLinks = [
    { label: "Pendaftaran Online", href: "http://sis.sttb.ac.id/pmb", external: true },
    { label: "Fasilitas STTB", href: "/fasilitas" },
    { label: "Kehidupan Kampus", href: "/pembinaan" },
    { label: "Beasiswa", href: "/beasiswa" },
    { label: "Dukung STTB", href: "/dukung-sttb" },
    { label: "FAQ", href: "/faq" },
];

function ProgramCard({ program }: { program: Program }) {
    const [open, setOpen] = useState(false);
    const levelColor = program.level === "S1" ? "bg-[#E62129]" : "bg-[#0A2C74]";

    return (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-md transition-shadow">
            <button
                onClick={() => setOpen((o) => !o)}
                className="w-full flex items-center justify-between p-5 text-left"
            >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-bold text-xs"
                        style={{ backgroundColor: program.color }}
                    >
                        {program.level}
                    </div>
                    <h3 className="text-gray-900 dark:text-white font-semibold leading-snug">
                        {program.title}
                    </h3>
                </div>
                {open ? (
                    <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0 ml-3" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 ml-3" />
                )}
            </button>

            {open && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-gray-100 dark:border-gray-800"
                >
                    <div className="p-5">
                        {/* Fee Table */}
                        <div className="overflow-x-auto rounded-lg border border-gray-100 dark:border-gray-800 mb-4">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-gray-50 dark:bg-gray-800">
                                        <th className="text-left px-4 py-3 text-gray-500 dark:text-gray-400 font-medium w-8">No.</th>
                                        <th className="text-left px-4 py-3 text-gray-500 dark:text-gray-400 font-medium">Jenis Biaya</th>
                                        <th className="text-right px-4 py-3 text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap">Nominal</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                                    {program.rows.map((row, i) => (
                                        <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                            <td className="px-4 py-3 text-gray-400 dark:text-gray-500">{row.no}</td>
                                            <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{row.jenis}</td>
                                            <td className="px-4 py-3 text-right font-semibold whitespace-nowrap" style={{ color: program.color }}>
                                                {row.nominal}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Extra (matrikulasi) */}
                        {program.extra && (
                            <div className="mb-4">
                                <p className="text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">
                                    {program.extra.subtitle}
                                </p>
                                <div className="overflow-x-auto rounded-lg border border-gray-100 dark:border-gray-800">
                                    <table className="w-full text-sm">
                                        <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                                            {program.extra.rows.map((row, i) => (
                                                <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{row.jenis}</td>
                                                    <td className="px-4 py-3 text-right font-semibold whitespace-nowrap" style={{ color: program.color }}>
                                                        {row.nominal}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <p className="text-gray-500 dark:text-gray-400 text-xs mt-2 italic">{program.extra.note}</p>
                            </div>
                        )}

                        {/* Notes */}
                        <div className="bg-amber-50 dark:bg-amber-900/10 rounded-lg p-4 mb-4">
                            <p className="text-amber-700 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-1">
                                <Info className="w-3 h-3" /> Catatan
                            </p>
                            <ul className="space-y-1.5">
                                {program.notes.map((note, i) => (
                                    <li key={i} className="text-amber-800 dark:text-amber-300 text-xs leading-relaxed flex items-start gap-1.5">
                                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                                        {note}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <Link
                            href={program.link}
                            className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
                            style={{ color: program.color }}
                        >
                            Info Program Selengkapnya <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </motion.div>
            )}
        </div>
    );
}

export default function BiayaStudiPage() {
    return (
        <>
            {/* Hero */}
            <div className="pt-28 pb-20 bg-gradient-to-br from-[#0A2C74] to-[#0570CD] relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none opacity-10">
                    <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white" style={{ transform: "translate(30%, -30%)" }} />
                </div>
                <div className="max-w-7xl mx-auto px-4 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="text-[#7FB4E5] text-sm font-medium uppercase tracking-wider mb-2">
                            Keuangan
                        </p>
                        <h1
                            className="text-white mb-4"
                            style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 700 }}
                        >
                            Biaya Studi
                        </h1>
                        <p className="text-blue-200 max-w-2xl leading-relaxed">
                            Informasi biaya pendidikan untuk semua program studi S1 dan S2
                            Sekolah Tinggi Teologi Bandung Tahun Akademik 2025/2026.
                        </p>
                    </motion.div>
                </div>
            </div>

            <section className="py-12 bg-gray-50 dark:bg-gray-950">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="grid lg:grid-cols-4 gap-8">
                        {/* Sidebar */}
                        <FadeIn direction="left">
                            <div className="space-y-4">
                                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5">
                                    <h3 className="text-gray-900 dark:text-white font-semibold text-sm mb-4 flex items-center gap-2">
                                        <GraduationCap className="w-4 h-4 text-[#E62129]" />
                                        Tautan Cepat
                                    </h3>
                                    <div className="space-y-1.5">
                                        {quickLinks.map((l) =>
                                            l.external ? (
                                                <a
                                                    key={l.label}
                                                    href={l.href}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-[#E62129] transition-colors"
                                                >
                                                    <ArrowRight className="w-3.5 h-3.5" />
                                                    {l.label}
                                                </a>
                                            ) : (
                                                <Link
                                                    key={l.label}
                                                    href={l.href}
                                                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-[#E62129] transition-colors"
                                                >
                                                    <ArrowRight className="w-3.5 h-3.5" />
                                                    {l.label}
                                                </Link>
                                            )
                                        )}
                                    </div>
                                </div>

                                {/* Level legend */}
                                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5">
                                    <h3 className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">
                                        Jenjang
                                    </h3>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-5 rounded bg-[#E62129] flex items-center justify-center text-white text-xs font-bold">S1</div>
                                            <span className="text-gray-600 dark:text-gray-400 text-xs">Sarjana</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-5 rounded bg-[#0A2C74] flex items-center justify-center text-white text-xs font-bold">S2</div>
                                            <span className="text-gray-600 dark:text-gray-400 text-xs">Magister</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>

                        {/* Programs */}
                        <div className="lg:col-span-3 space-y-4">
                            <FadeIn>
                                <div className="flex items-center justify-between mb-2">
                                    <h2 className="text-gray-900 dark:text-white font-semibold">
                                        Rincian Biaya per Program
                                    </h2>
                                </div>
                            </FadeIn>

                            <StaggerGroup staggerDelay={0.1} className="space-y-4">
                                {programs.map((prog) => (
                                    <StaggerItem key={prog.id}>
                                        <ProgramCard program={prog} />
                                    </StaggerItem>
                                ))}
                            </StaggerGroup>

                            {/* CTA daftar */}
                            <FadeIn delay={0.2}>
                                <div className="bg-[#E62129] rounded-xl p-6 text-white text-center mt-6">
                                    <h3 className="font-bold text-lg mb-2">Siap Mendaftar?</h3>
                                    <p className="text-red-100 text-sm mb-4">
                                        Daftarkan diri Anda sekarang melalui sistem pendaftaran online STTB.
                                    </p>
                                    <a
                                        href="http://sis.sttb.ac.id/pmb"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-block px-6 py-2.5 rounded-lg bg-white text-[#E62129] font-medium text-sm hover:bg-red-50 transition-colors"
                                    >
                                        Pendaftaran Online
                                    </a>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
