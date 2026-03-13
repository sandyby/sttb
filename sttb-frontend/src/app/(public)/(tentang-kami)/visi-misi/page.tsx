"use client";

import { Fragment, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "motion/react";
import Image from "next/image";
import { cn } from "@/components/ui/utils";

/* ─── DATA ───────────────────────────────────────────────── */

const visiConcepts = [
    {
        id: "pastor-scholar",
        title: "Pastor-Scholar",
        number: "01",
        color: "#E62129",
        desc: "Memiliki jiwa gembala (kepemimpinan yang melayani di gereja, dunia pendidikan, maupun profesi lain) dan sekaligus pembelajar — semangat untuk terus belajar, daya nalar kritis seorang intelektual Kristen, dan kemampuan berkontribusi terhadap dunia ilmu pengetahuan dari perspektif Kristen.",
    },
    {
        id: "injil-utuh",
        title: "Berita Injil yang Utuh",
        number: "02",
        color: "#0A2C74",
        desc: "Kuasa Injil yang mampu mentransformasi seluruh aspek hidup manusia dan seluruh ciptaan yang sudah jatuh dalam dosa, yang kesempurnaannya baru akan terjadi setelah kedatangan Kristus yang kedua, namun cicipan awalnya sudah bisa dirasakan hari ini.",
    },
    {
        id: "umat-allah",
        title: "Seluruh Umat Allah",
        number: "03",
        color: "#0570CD",
        desc: "Kuasa penebusan Kristus dinyatakan melalui hidup setiap pengikut Kristus, di tengah keluarga, gereja, dan masyarakat.",
    },
    {
        id: "urban",
        title: "Masyarakat Urban",
        number: "04",
        color: "#E62129",
        desc: "Mahasiswa STTB dipersiapkan dengan fokus melayani masyarakat di perkotaan, tanpa menutup kemungkinan tuntunan lain yang Tuhan berikan kepada mereka di tempat lain.",
    },
];

const missions = [
    {
        num: "1",
        text: "Mempersiapkan pastor-scholar yang transformatif untuk melayani dalam konteks urban.",
        color: "#E62129",
    },
    {
        num: "2",
        text: "Memberdayakan seluruh umat Allah untuk menghadirkan Injil seutuhnya di tengah konteks masyarakat urban melalui penelitian dan pendidikan non-formal.",
        color: "#0A2C74",
    },
    {
        num: "3",
        text: "Mengembangkan tim dosen, struktur organisasi dan keuangan, serta kemitraan untuk mendukung pencapaian visi STTB.",
        color: "#0570CD",
    },
];

const coreValues = [
    {
        id: "christ",
        title: "CHRIST CENTERED",
        icon: "✝",
        color: "#E62129",
        points: [
            "Rencana keselamatan Allah atas seisi dunia yang berpusat di dalam karya penebusan Kristus.",
            "Mandat budaya dan mandat Injil dalam kerangka metanarasi Alkitab: Penciptaan–Kejatuhan–Penebusan–Penggenapan.",
        ],
    },
    {
        id: "teks",
        title: "TEKS – KONTEKS",
        icon: "📖",
        color: "#0A2C74",
        points: [
            "Setia kepada teks: Firman Tuhan dan warisan iman Bapa-Bapa Gereja.",
            "Responsif terhadap konteks: sosial dan generasional.",
        ],
    },
    {
        id: "penatalayanan",
        title: "PENATALAYANAN",
        icon: "🤝",
        color: "#0570CD",
        points: [
            "Integritas: kejujuran, transparansi, akuntabilitas — waktu, uang, relasi.",
            "Dedikasi: melayani dan mengupayakan yang terbaik bagi sesama.",
            "Kompetensi: kecakapan akademik, pelayanan, dan penelitian.",
        ],
    },
    {
        id: "transformatif",
        title: "TRANSFORMATIF",
        icon: "🔥",
        color: "#E62129",
        points: [
            "Karya penebusan Kristus yang transformatif dialami oleh semua stakeholder STTB: mahasiswa, dosen, staf, karyawan, yayasan, mitra pelayanan, gereja, dan masyarakat.",
        ],
    },
];

/* ─── FLIPPING CONCEPT CARD ─────────────────────────────── */

function ConceptCard({ concept, index }: { concept: typeof visiConcepts[0]; index: number }) {
    const [flipped, setFlipped] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={{
                opacity: inView ? 1 : 0,
                y: inView ? 0 : 40,
                scale: isHovered ? 1.025 : 1
            }}
            transition={{ delay: index * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative cursor-pointer"
            style={{ perspective: "1000px", height: "220px" }}
            onClick={() => setFlipped((f) => !f)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                style={{ transformStyle: "preserve-3d" }}
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-full relative"
            >
                {/* Front */}
                <div
                    className="absolute inset-0 rounded-2xl flex flex-col justify-between p-6 overflow-hidden"
                    style={{ backfaceVisibility: "hidden", backgroundColor: `${concept.color}08`, border: `1px solid ${concept.color}25` }}
                >
                    <div className="flex justify-between items-start">
                        <span
                            className="text-5xl font-black opacity-10 leading-none"
                            style={{ color: concept.color }}
                        >
                            {concept.number}
                        </span>
                        <motion.div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                            style={{ backgroundColor: concept.color }}
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        >
                            ✦
                        </motion.div>
                    </div>
                    <div>
                        <div
                            className="inline-block px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-widest mb-2"
                            style={{ backgroundColor: `${concept.color}15`, color: concept.color }}
                        >
                            Kunci
                        </div>
                        <h3 className="text-gray-900 dark:text-white font-bold text-lg leading-tight">
                            {concept.title}
                        </h3>
                        <p className="text-gray-400 dark:text-gray-500 text-xs mt-2">Sentuh/hover untuk detail →</p>
                    </div>
                </div>

                {/* Back */}
                <div
                    className="absolute inset-0 rounded-2xl flex flex-col justify-center p-6 overflow-hidden"
                    style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        backgroundColor: concept.color,
                    }}
                >
                    <span className="text-white/20 font-black text-4xl mb-3 block leading-none">{concept.number}</span>
                    <p className="text-white leading-relaxed text-sm">{concept.desc}</p>
                </div>
            </motion.div>
        </motion.div>
    );
}

/* ─── CORE VALUE CARD ───────────────────────────────────── */

function CoreValueCard({ val, index }: { val: typeof coreValues[0]; index: number }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={cn("group relative overflow-hidden rounded-2xl border cursor-pointer", open && "md:row-span-2", "transition-all duration-300 ease-out")}
            style={{ borderColor: `${val.color}20` }}
            onClick={() => setOpen((o) => !o)}
            whileHover={{ y: -4 }}
        >
            {/* Hover glow */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 0%, ${val.color}15, transparent 70%)` }}
            />

            {/* Header bar */}
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: open ? `1px solid ${val.color}20` : "1px solid transparent" }}>
                <div className="flex items-center gap-3">
                    <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 transition-transform group-hover:scale-110 duration-300"
                        style={{ backgroundColor: `${val.color}15` }}
                    >
                        {val.icon}
                    </div>
                    <h3 className="text-gray-900 dark:text-white font-bold tracking-wide text-sm">
                        {val.title}
                    </h3>
                </div>
                <motion.div
                    animate={{ rotate: open ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${val.color}20`, color: val.color }}
                >
                    <span className="text-xs font-bold">+</span>
                </motion.div>
            </div>

            {/* Body */}
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="px-5 py-4 space-y-3">
                            {val.points.map((p, i) => (
                                <div key={i} className="flex items-start gap-2.5">
                                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: val.color }} />
                                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{p}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}


/* ─── VISI SECTION ───────────────────────────────────────── */

function VisiSection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
            {/* Big background text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden>
                <span className="text-gray-100 dark:text-gray-800 font-black" style={{ fontSize: "clamp(6rem, 20vw, 16rem)", lineHeight: 1, opacity: 0.5 }}>
                    VISI
                </span>
            </div>

            <div className="max-w-6xl mx-auto px-4 relative">
                {/* Section label */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-14"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E62129]/10 text-[#E62129] text-xs font-bold uppercase tracking-widest mb-5">
                        <span>👁</span> Visi
                    </div>
                    <h2 className="text-gray-900 dark:text-white" style={{ fontWeight: 800, fontSize: "clamp(1.4rem, 3vw, 2rem)" }}>
                        Menjadi Institusi Pendidikan Teologi yang Transformatif
                    </h2>
                </motion.div>

                {/* Visi quote card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="relative rounded-3xl overflow-hidden mb-16 shadow-2xl"
                    style={{ background: "linear-gradient(135deg, #0A2C74, #0570CD)" }}
                >
                    {/* Decorative circles */}
                    <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white/5" style={{ transform: "translate(30%, -40%)" }} />
                    <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#E62129]/10" style={{ transform: "translate(-20%, 30%)" }} />

                    <div className="relative px-8 py-12 md:px-14 md:py-16 max-w-4xl mx-auto text-center">
                        <span className="text-blue-200/40 font-serif" style={{ fontSize: "5rem", lineHeight: 0.5, display: "block", marginBottom: "1rem" }}>&quot;</span>
                        <p className="text-blue-50 leading-relaxed" style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)" }}>
                            Menjadi institusi pendidikan teologi yang mempersiapkan{" "}
                            <strong className="text-white text-xl">pastor-scholar</strong>{" "}
                            yang transformatif dan memberdayakan{" "}
                            <strong className="text-white">seluruh umat Allah</strong>{" "}
                            untuk menghadirkan{" "}
                            <strong className="text-white">Injil seutuhnya</strong>{" "}
                            di tengah konteks{" "}
                            <strong className="text-white">masyarakat urban</strong>.
                        </p>
                    </div>
                </motion.div>

                {/* Concept cards — 3D flip */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {visiConcepts.map((c, i) => (
                        <ConceptCard key={c.id} concept={c} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ─── MISI SECTION ───────────────────────────────────────── */

function MisiSection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="py-24 bg-gray-50 dark:bg-gray-950 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden>
                <span className="text-gray-200 dark:text-gray-800 font-black" style={{ fontSize: "clamp(6rem, 20vw, 16rem)", lineHeight: 1, opacity: 0.5 }}>
                    MISI
                </span>
            </div>

            <div className="max-w-4xl mx-auto px-4 relative">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-14"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A2C74]/10 text-[#0A2C74] dark:bg-blue-900/20 dark:text-blue-300 text-xs font-bold uppercase tracking-widest mb-5">
                        <span>🎯</span> Misi
                    </div>
                    <h2 className="text-gray-900 dark:text-white" style={{ fontWeight: 800, fontSize: "clamp(1.4rem, 3vw, 2rem)" }}>
                        Tiga Pilar Pelayanan STTB
                    </h2>
                </motion.div>

                <div className="space-y-8 relative">
                    {/* Connector line */}
                    <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#E62129] via-[#0A2C74] to-[#0570CD] hidden md:block" />

                    {missions.map((m, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -60 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: i * 0.15 + 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            className="relative flex gap-5 items-start"
                        >
                            {/* Number */}
                            <motion.div
                                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-black text-lg flex-shrink-0 shadow-lg z-10"
                                style={{ backgroundColor: m.color }}
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                {m.num}
                            </motion.div>

                            {/* Content */}
                            <div
                                className="flex-1 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow"
                                style={{ borderLeft: `3px solid ${m.color}` }}
                            >
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{m.text}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ─── CORE VALUES SECTION ───────────────────────────────── */

function CoreValuesSection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="py-24 bg-white dark:bg-gray-900">
            <div className="max-w-5xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-14"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-bold uppercase tracking-widest mb-5">
                        <span>⚡</span> Nilai-Nilai Inti
                    </div>
                    <h2 className="text-gray-900 dark:text-white" style={{ fontWeight: 800, fontSize: "clamp(1.4rem, 3vw, 2rem)" }}>
                        Core Values STTB
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-3 max-w-xl mx-auto">
                        Klik pada tiap kartu untuk membuka detail nilai-nilai yang membentuk identitas STTB.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-max">
                    {coreValues.map((v, i) => (
                        <CoreValueCard key={v.id} val={v} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ─── MOTTO BANNER ───────────────────────────────────────── */

function MottoBanner() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    const mottoWords = ["TO THE LORD", "THE BEST", "THE GREATEST"];

    return (
        <section ref={ref} className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0A2C74, #060C1A)" }}>
            {/* Animated background shapes */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        width: `${80 + i * 40}px`,
                        height: `${80 + i * 40}px`,
                        left: `${10 + i * 15}%`,
                        top: `${10 + (i % 3) * 30}%`,
                        background: i % 2 === 0 ? "rgba(230,33,41,0.06)" : "rgba(255,255,255,0.03)",
                    }}
                    animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
                    transition={{ duration: 6 + i * 2, repeat: Infinity, ease: "easeInOut" }}
                />
            ))}

            <div className="max-w-4xl mx-auto px-4 text-center relative">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <p className="text-blue-300/60 text-xs uppercase tracking-[0.4em] mb-3">Motto STTB</p>
                    <motion.p
                        initial={{ letterSpacing: "0.05em" }}
                        animate={inView ? { letterSpacing: "0.4em" } : {}}
                        transition={{ delay: 0.3, duration: 1 }}
                        className="text-white/30 text-sm uppercase mb-8"
                    >
                        DOMINO OPTIMO MAXIMO
                    </motion.p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
                        {mottoWords.map((word, i) => (
                            <Fragment key={word}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.5 + i * 0.2, duration: 0.7 }}
                                    className="text-center"
                                >
                                    <span
                                        className="font-black tracking-widest block"
                                        style={{
                                            fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
                                            color: i === 1 ? "#E62129" : "white",
                                            textShadow: i === 1 ? "0 0 30px rgba(230,33,41,0.5)" : "none",
                                        }}
                                    >
                                        {word}
                                    </span>
                                </motion.div>
                                {i < mottoWords.length - 1 && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={inView ? { scale: 1 } : {}}
                                        transition={{ delay: 0.6 + i * 0.2 }}
                                        className="hidden md:block w-2 h-2 rounded-full bg-blue-400/40"
                                    />
                                )}
                            </Fragment>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

import PageHeader from "@/components/shared/PageHeader";

/* ─── PAGE ────────────────────────────────────────────────── */

export default function VisiMisiPage() {
    return (
        <>
            <PageHeader
                title="Visi & Misi STTB"
                category="Tentang STTB"
                description='Fondasi filosofis yang mengarahkan setiap aspek kehidupan dan pelayanan STTB — dari Lausanne Movement: "Seluruh Umat membawa Seluruh Injil ke Seluruh Dunia."'
                breadcrumb={[{ label: "Visi & Misi", href: "/visi-misi" }]}
                image="/visi-misi/domino-optimo-maximo.png"
            />
            <VisiSection />
            <MisiSection />
            <CoreValuesSection />
            <MottoBanner />
        </>
    );
}
