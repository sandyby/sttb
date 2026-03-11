"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

/* ─── DATA ───────────────────────────────────────────────── */

const timeline = [
    {
        period: "1992 – 1998",
        year: "1992",
        label: "Pendirian & Awal Mula",
        desc: "Pdt. Caleb Tong, Pdt. Joseph Tong, dan Pdt. Dorothy I. Marx mendirikan STTB pada tahun 1992 dengan tujuan menghasilkan Pastor-Scholar berkerangka teologi Reformed Injili. Pdt. Daniel Lucas Lukito sebagai Dekan Akademik pertama meletakkan kerangka dasar. Penerbitan Jurnal Teologi STULOS dimulai, dan wisuda pertama diadakan pada 1996.",
        color: "#E62129",
        milestone: "Berdiri",
        side: "left" as const,
    },
    {
        period: "1999 – 2005",
        year: "1999",
        label: "Program Baru & Kepemimpinan",
        desc: "Ibu Dorothy I. Marx menjabat sebagai Rektor. Program baru dibuka: M.A. (Magister Artium) dan M.Th. (Magister Teologi). Asrama dosen dibangun bersebelahan dengan asrama mahasiswa. STTB menerbitkan seri buku 'Sola…' dan menyelenggarakan CYLF (Christian Youth Leadership Forum) secara nasional.",
        color: "#0A2C74",
        milestone: "Ekspansi",
        side: "right" as const,
    },
    {
        period: "2006 – 2010",
        year: "2006",
        label: "Peningkatan Kualitas & Mandarin",
        desc: "Kepemimpinan Pdt. Joseph Tong berkomitmen meningkatkan kualifikasi pengajar dengan mengutus dosen studi lanjut di USA. Terbit dua buku Seri Sola: Sola Scriptura dan Sola Fide. STTB membuka program studi berbahasa Mandarin (S.Th., M.Div., M.A.) sebagai kontribusi pelayanan misi di Tiongkok.",
        color: "#0570CD",
        milestone: "Internasional",
        side: "left" as const,
    },
    {
        period: "2011 – 2016",
        year: "2011",
        label: "Gedung Baru & Akreditasi Nasional",
        desc: "Pada 2011, STTB hadir dengan gedung baru berlantai tujuh untuk ruang kelas, kantor, asrama, aula, dan perpustakaan. Dibuka prodi baru: S.Pd.K. (2012) dan M.Min. Program M.Pd.K. (2015) memperlengkapi pemimpin pendidikan Kristen. Program studi mulai terakreditasi BAN-PT dan ATA (Asian Theological Association).",
        color: "#E62129",
        milestone: "Akreditasi",
        side: "right" as const,
    },
    {
        period: "2017 – Kini",
        year: "2017",
        label: "Transformasi Digital & Visi Misioner",
        desc: "Periode pembenahan kualitas dan penajaman visi. LEAD Center berkembang dengan modul Vocatio, Perspectives, dan materi digital. Program M.Th. fokus Transformasi Budaya & MMin Marketplace berkembang pesat. Kepemimpinan: Pdt. Chandra Koewoso (2017), Sutrisna Harjanto Ph.D. (2019 – kini).",
        color: "#0A2C74",
        milestone: "Digital",
        side: "left" as const,
    },
];

const logoMeanings = [
    { title: "API", desc: "Penyertaan dan pemenuhan Allah Roh Kudus — sumber hikmat, kuasa, dan kasih.", img: "/logo/api.png" },
    { title: "ALKITAB", desc: "Satu-satunya sumber pengetahuan yang benar tentang Allah (Sola Scriptura).", img: "/logo/alkitab.png" },
    { title: "SALIB & MAHKOTA", desc: "Panggilan untuk berpegang pada kebenaran dan merajakan Kristus.", img: "/logo/salib.png" },
    { title: "TONGKAT GEMBALA", desc: "Panggilan Tuhan untuk menggembalakan umat-Nya dengan setia.", img: "/logo/tongkat.png" },
];

const founders = [
    { name: "Rev. DR. Caleb Tong (Alm.)", role: "Pendiri", period: "1992–1999", img: "/assets/caleb-tong-rev-1.png" },
    { name: "Rev. DR. Joseph Tong, Ph.D.", role: "Pendiri & Rektor", period: "1999–2017", img: "/assets/joseph-tong-rev-1.png" },
    { name: "Rev. Dorothy I. Marx (Alm.)", role: "Pendiri & Rektor", period: "1999–2005", img: "/assets/dorothy-marx-rev-1.png" },
];

/* ─── HERO ───────────────────────────────────────────────── */

function Hero() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

    return (
        <div ref={ref} className="relative pt-28 pb-28 min-h-[520px] flex items-center overflow-hidden bg-[#060C1A]">
            <motion.div style={{ y: yBg }} className="absolute inset-0">
                <Image
                    src="https://images.unsplash.com/photo-1716625862188-f421d41bfb66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920&q=80"
                    alt=""
                    fill
                    priority
                    className="w-full h-full object-cover opacity-20" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #060C1A 40%, #0A2C74/50 100%)" }} />
            </motion.div>
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />

            <motion.div style={{ opacity }} className="max-w-7xl mx-auto px-4 relative z-10">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
                    <div className="flex items-center gap-2 mb-5">
                        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="w-8 h-px bg-[#E62129] origin-left" />
                        <span className="text-[#E62129] text-xs font-semibold uppercase tracking-widest">Tentang STTB</span>
                    </div>
                    <h1 className="text-white mb-5" style={{ fontWeight: 800, lineHeight: 1.05 }}>
                        {["Sejarah", "STTB"].map((word, i) => (
                            <motion.span key={i} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                className={`inline-block mr-3 ${i === 1 ? "text-[#E62129]" : ""}`}
                                style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}>{word}</motion.span>
                        ))}
                    </h1>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.7 }}
                        className="text-white/60 max-w-2xl leading-relaxed">
                        Lebih dari 30 tahun melayani gereja dan bangsa Indonesia — perjalanan iman yang digerakkan oleh visi besar untuk memuliakan Tuhan.
                    </motion.p>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.6 }}
                        className="mt-8 flex items-center gap-2 text-white/40 text-sm">
                        <ChevronDown className="w-4 h-4 animate-bounce" />
                        Gulir ke bawah untuk melihat perjalanan
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
}

/* ─── TIMELINE CARD ──────────────────────────────────────── */

function TimelineCard({ item, index, total }: { item: typeof timeline[0]; index: number; total: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    const [expanded, setExpanded] = useState(false);
    const isLeft = item.side === "left";

    return (
        <div ref={ref} className="relative flex items-start gap-0">

            {/* ── Mobile: simple stacked layout ── */}
            <div className="flex w-full md:hidden items-start gap-4 pb-10">
                {/* Node */}
                <div className="flex flex-col items-center flex-shrink-0 mt-1">
                    <motion.div
                        initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}}
                        transition={{ delay: 0.1, duration: 0.5, type: "spring", stiffness: 200 }}
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black shadow-lg z-10 flex-shrink-0"
                        style={{ backgroundColor: item.color }}
                    >
                        {index + 1}
                    </motion.div>
                    {index < total - 1 && (
                        <motion.div initial={{ scaleY: 0 }} animate={inView ? { scaleY: 1 } : {}}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="w-0.5 flex-1 min-h-[60px] mt-1 origin-top"
                            style={{ background: item.color }} />
                    )}
                </div>

                {/* Card */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="flex-1 bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => setExpanded(e => !e)}
                >
                    <div className="h-1" style={{ background: `linear-gradient(90deg, ${item.color}, ${item.color}60)` }} />
                    <div className="p-4">
                        <span className="inline-block px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide mb-2" style={{ backgroundColor: `${item.color}15`, color: item.color }}>{item.milestone}</span>
                        <div className="flex items-baseline gap-2 mb-1">
                            <span className="font-black" style={{ fontSize: "1.8rem", color: item.color, lineHeight: 1 }}>{item.year}</span>
                            <span className="text-gray-400 text-xs">{item.period.split("–")[1]?.trim()}</span>
                        </div>
                        <h3 className="text-gray-900 dark:text-white font-bold text-sm mb-1">{item.label}</h3>
                        <AnimatePresence initial={false}>
                            {expanded && (
                                <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.4 }} className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed overflow-hidden">
                                    {item.desc}
                                </motion.p>
                            )}
                        </AnimatePresence>
                        {!expanded && <p className="text-gray-400 text-xs">Ketuk untuk detail →</p>}
                    </div>
                </motion.div>
            </div>

            {/* ── Desktop: explicit 3-column alternating layout ── */}
            <div className="hidden md:grid w-full" style={{ gridTemplateColumns: "1fr 80px 1fr", gridTemplateRows: "auto" }}>
                {/* Column 1: card for left items, empty for right */}
                <div style={{ gridColumn: 1, gridRow: 1 }} className="pb-12 pr-6 flex items-start">
                    {isLeft && (
                        <motion.div
                            initial={{ opacity: 0, x: -50 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="w-full bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
                            onClick={() => setExpanded(e => !e)}
                        >
                            <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${item.color}, ${item.color}55)` }} />
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-2" style={{ backgroundColor: `${item.color}15`, color: item.color }}>{item.milestone}</span>
                                        <div className="flex items-baseline gap-2">
                                            <span className="font-black" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", color: item.color, lineHeight: 1 }}>{item.year}</span>
                                            <span className="text-gray-400 text-sm">{item.period.split("–")[1]?.trim()}</span>
                                        </div>
                                    </div>
                                    <motion.div animate={{ rotate: expanded ? 45 : 0 }} transition={{ duration: 0.3 }}
                                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 text-sm font-bold"
                                        style={{ backgroundColor: `${item.color}15`, color: item.color }}>+</motion.div>
                                </div>
                                <h3 className="text-gray-900 dark:text-white font-bold mb-1" style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)" }}>{item.label}</h3>
                                <AnimatePresence initial={false}>
                                    {expanded && (
                                        <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                            className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed overflow-hidden mt-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                                            {item.desc}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                                {!expanded && <p className="text-gray-400 text-xs mt-1">Klik untuk detail lengkap →</p>}
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Column 2: spine + node — always centered */}
                <div style={{ gridColumn: 2, gridRow: 1 }} className="flex flex-col items-center pt-4 relative pb-0">
                    {/* Node */}
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }} animate={inView ? { scale: 1, opacity: 1 } : {}}
                        transition={{ delay: 0.15, duration: 0.5, type: "spring", stiffness: 200 }}
                        className="relative z-10 flex-shrink-0"
                    >
                        <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-black text-lg shadow-xl border-4 border-white dark:border-gray-950" style={{ backgroundColor: item.color }}>
                            {index + 1}
                        </div>
                        <motion.div className="absolute inset-0 rounded-full" style={{ backgroundColor: item.color }}
                            animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0, 0.3] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} />
                    </motion.div>

                    {/* Vertical connector to next item */}
                    {index < total - 1 && (
                        <motion.div
                            initial={{ scaleY: 0 }} animate={inView ? { scaleY: 1 } : {}}
                            transition={{ delay: 0.4, duration: 0.9 }}
                            className="w-0.5 flex-1 min-h-[80px] mt-2 origin-top"
                            style={{ background: `linear-gradient(to bottom, ${item.color}, ${timeline[index + 1].color})` }}
                        />
                    )}
                </div>

                {/* Column 3: card for right items, empty for left */}
                <div style={{ gridColumn: 3, gridRow: 1 }} className="pb-12 pl-6 flex items-start">
                    {!isLeft && (
                        <motion.div
                            initial={{ opacity: 0, x: 50 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="w-full bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
                            onClick={() => setExpanded(e => !e)}
                        >
                            <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${item.color}, ${item.color}55)` }} />
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-2" style={{ backgroundColor: `${item.color}15`, color: item.color }}>{item.milestone}</span>
                                        <div className="flex items-baseline gap-2">
                                            <span className="font-black" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", color: item.color, lineHeight: 1 }}>{item.year}</span>
                                            <span className="text-gray-400 text-sm">{item.period.split("–")[1]?.trim()}</span>
                                        </div>
                                    </div>
                                    <motion.div animate={{ rotate: expanded ? 45 : 0 }} transition={{ duration: 0.3 }}
                                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 text-sm font-bold"
                                        style={{ backgroundColor: `${item.color}15`, color: item.color }}>+</motion.div>
                                </div>
                                <h3 className="text-gray-900 dark:text-white font-bold mb-1" style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)" }}>{item.label}</h3>
                                <AnimatePresence initial={false}>
                                    {expanded && (
                                        <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                            className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed overflow-hidden mt-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                                            {item.desc}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                                {!expanded && <p className="text-gray-400 text-xs mt-1">Klik untuk detail lengkap →</p>}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}

/* ─── PAGE ────────────────────────────────────────────────── */

export default function SejarahPage() {
    const timelineRef = useRef<HTMLElement>(null);
    const timelineInView = useInView(timelineRef, { once: true });

    return (
        <>
            <Hero />

            {/* Intro */}
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-14 items-center">
                        <motion.div initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
                            <p className="text-[#E62129] text-xs font-semibold uppercase tracking-wider mb-3">Sejarah</p>
                            <h2 className="text-gray-900 dark:text-white mb-5 font-bold" style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)" }}>Perjalanan Panjang<br />Melayani Tuhan</h2>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                                Sekolah Tinggi Teologi Bandung (STTB) didirikan pada tahun 1992 di Kota Bandung, Jawa Barat. Berakar dalam tradisi Reformed-Evangelical, STTB memberikan fondasi teologis yang kokoh kepada para mahasiswanya.
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                                Visi STTB adalah <em className="text-[#0A2C74] dark:text-blue-300 not-italic font-medium">&quot;Seluruh Umat membawa Seluruh Injil ke Seluruh Dunia&quot;</em> — visi yang melampaui dinding seminari dan menyentuh setiap aspek pelayanan Kristiani di Indonesia.
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                Hingga hari ini, STTB terus melahirkan alumni yang melayani sebagai pendeta, misionaris, pendidik, konselor pastoral, dan pemimpin Kristen di berbagai sektor Indonesia dan mancanegara.
                            </p>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="relative">
                            <div className="rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src="https://images.unsplash.com/photo-1763477950484-12fd6f42c67e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80"
                                    alt="Kampus STTB"
                                    width={600}
                                    height={600}
                                    preload
                                    className="w-full h-80 object-cover" />
                            </div>
                            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.6 }}
                                className="absolute -bottom-5 -left-5 bg-[#E62129] text-white px-5 py-3 rounded-2xl shadow-xl">
                                <div className="font-black text-2xl leading-none">30+</div>
                                <div className="text-white/80 text-xs mt-0.5">Tahun Melayani</div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section ref={timelineRef} className="py-20 bg-gray-50 dark:bg-gray-950 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden>
                    <motion.span initial={{ opacity: 0 }} animate={timelineInView ? { opacity: 0.04 } : {}} transition={{ duration: 1 }}
                        className="text-gray-900 dark:text-gray-200 font-black" style={{ fontSize: "clamp(8rem, 22vw, 20rem)", lineHeight: 1 }}>
                        STTB
                    </motion.span>
                </div>

                <div className="max-w-5xl mx-auto px-4 relative">
                    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
                        className="text-center mb-16">
                        <p className="text-[#E62129] text-xs font-semibold uppercase tracking-wider mb-2">Tonggak Sejarah</p>
                        <h2 className="text-gray-900 dark:text-white font-bold" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}>Perjalanan dari Masa ke Masa</h2>
                        <p className="text-gray-400 text-sm mt-2">Klik tiap kartu untuk membaca cerita lengkap</p>
                    </motion.div>

                    <div>
                        {timeline.map((item, i) => (
                            <TimelineCard key={item.period} item={item} index={i} total={timeline.length} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Logo Meanings */}
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="max-w-5xl mx-auto px-4">
                    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-12">
                        <p className="text-[#E62129] text-xs font-semibold uppercase tracking-widest mb-2">Arti Logo</p>
                        <h2 className="text-gray-900 dark:text-white font-bold" style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)" }}>Makna di Balik Logo STTB</h2>
                        <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="my-6 flex justify-center">
                            <Image 
                                src="/logo/Logo-STT-Bdg.jpg" 
                                alt="Logo STTB" 
                                width={250} 
                                height={250} 
                                className="rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 p-6"
                            />
                        </motion.div>
                        <p className="text-gray-400 text-sm max-w-xl mx-auto mt-2 leading-relaxed">Logo STTB menggambarkan pola pendidikan teologi yang memperlengkapi para mahasiswa menjadi hamba Allah yang baik, setia, dan penuh hikmat.</p>
                    </motion.div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {logoMeanings.map((item, i) => {
                            return (
                                <motion.div key={item.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 + 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                                    whileHover={{ y: -6 }}
                                    className="group p-6 rounded-2xl border border-gray-100 dark:border-gray-800 text-center hover:shadow-xl transition-all cursor-default">
                                    <motion.div className="w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-4 p-3"
                                        whileHover={{ rotate: 10 }} transition={{ type: "spring", stiffness: 300 }}>
                                        <Image
                                            src={item.img}
                                            alt={item.title}
                                            width={56}
                                            height={56}
                                            className="w-full h-full object-contain"
                                        />
                                    </motion.div>
                                    <h3 className="text-gray-900 dark:text-white font-bold text-sm mb-2">{item.title}</h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">{item.desc}</p>
                                    <div className="mt-4 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full mx-auto" />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Founders */}
            <section className="py-20 bg-gray-50 dark:bg-gray-950">
                <div className="max-w-4xl mx-auto px-4">
                    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-12">
                        <p className="text-[#E62129] text-xs font-semibold uppercase tracking-widest mb-2">Pendiri</p>
                        <h2 className="text-gray-900 dark:text-white font-bold" style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)" }}>Pendiri STTB</h2>
                    </motion.div>
                    <div className="grid sm:grid-cols-3 gap-8">
                        {founders.map((f, i) => (
                            <motion.div key={f.name} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                                transition={{ delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="text-center group">
                                <div className="relative w-36 h-36 mx-auto mb-4">
                                    <motion.div className="absolute inset-0 rounded-full border-2 border-[#E62129]/30"
                                        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.2, 0.5] }}
                                        transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }} />
                                    <div className="w-full h-full rounded-full overflow-hidden ring-4 ring-white dark:ring-gray-900 shadow-xl group-hover:ring-[#E62129]/40 transition-all">
                                        <Image
                                            src={f.img}
                                            alt={f.name}
                                            width={400}
                                            height={400}
                                            preload
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-[#E62129] flex items-center justify-center shadow-md">
                                        <span className="text-white text-xs font-bold">✦</span>
                                    </div>
                                </div>
                                <h3 className="text-gray-900 dark:text-white font-semibold text-sm leading-snug">{f.name}</h3>
                                <p className="text-[#E62129] text-xs mt-1 font-semibold">{f.role}</p>
                                <p className="text-gray-400 text-xs mt-0.5">{f.period}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
