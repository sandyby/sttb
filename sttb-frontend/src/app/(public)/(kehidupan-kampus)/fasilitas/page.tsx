"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "motion/react";
import { BookOpen, Heart, Home, Monitor, Dumbbell, Users, ChevronRight, X, Camera, Grid3X3 } from "lucide-react";
import Masonry from "react-masonry-css";
import Image from "next/image";

/* ─── DATA ──────────────────────────────────────────────── */

const categories = [
    {
        id: "belajar",
        icon: BookOpen,
        emoji: "📚",
        label: "Belajar Bersama",
        tagline: "Ruang Belajar Berstandar Tinggi",
        color: "#E62129",
        gradient: "from-[#E62129] to-[#c4131a]",
        lightBg: "bg-red-50",
        desc: "Sebagai kampus perguruan tinggi, STTB menyediakan fasilitas optimal bagi kegiatan belajar-mengajar. Format ruang kelas didesain mengakomodasi berbagai format pembelajaran.",
        highlights: [
            { icon: Monitor, text: "Ruang Kelas Multi-format" },
            { icon: BookOpen, text: "Perpustakaan Instagramable" },
            { icon: Monitor, text: "Ruang Teleconference Hybrid" },
            { icon: Camera, text: "Studio Audio-Visual Didasko" },
        ],
        detail: "Format ruang kelas didesain mengakomodasi berbagai format pembelajaran. Perpustakaan didesain agar nyaman dan instagramable. Ruang teleconference dan ruangan kelas lainnya siap pakai bagi pembelajaran hybrid (onsite-online). Dilengkapi pula dengan studio audio-visual Didasko — tempat produksi media pengajaran STTB sekaligus tempat belajar pelayanan media bagi mahasiswa.",
        image: "https://images.unsplash.com/photo-1758413350815-7b06dbbfb9a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&q=80",
        gallery: [
            { url: "https://images.unsplash.com/photo-1741795746033-d50d48dc1da5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80", label: "Perpustakaan" },
            { url: "https://images.unsplash.com/photo-1761850215840-2775d7229cad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80", label: "Studio Didasko" },
            { url: "https://images.unsplash.com/photo-1758413350815-7b06dbbfb9a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80", label: "Ruang Kelas" },
        ],
    },
    {
        id: "bertumbuh",
        icon: Heart,
        emoji: "✝️",
        label: "Bertumbuh Bersama",
        tagline: "Pembentukan Rohani Utuh",
        color: "#0A2C74",
        gradient: "from-[#0A2C74] to-[#0570CD]",
        lightBg: "bg-blue-50",
        desc: "Pembelajaran di STTB menekankan pembentukan pribadi pelayan Tuhan secara utuh — tidak hanya sisi akademik tetapi seluruh dimensi kehidupan rohani.",
        highlights: [
            { icon: Users, text: "Ruang Konseling Pribadi & Kelompok" },
            { icon: Heart, text: "Tempat Hangout Kelompok Kecil" },
            { icon: Home, text: "Aula Ibadah & Seminar Besar" },
            { icon: Heart, text: "Rumah Doa Bethel (Retreat)" },
        ],
        detail: "STTB menyediakan fasilitas pendukung pertumbuhan rohani: ruang konseling pribadi dan konseling kelompok, beberapa tempat pertemuan hangout kelompok kecil, aula untuk pertemuan ibadah/seminar dengan audiens besar, serta fasilitas di luar kampus berupa rumah retreat — Rumah Doa Bethel.",
        image: "https://images.unsplash.com/photo-1763410723546-db98ef034af5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&q=80",
        gallery: [
            { url: "https://images.unsplash.com/photo-1763410723546-db98ef034af5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80", label: "Kapel & Aula Ibadah" },
            { url: "https://images.unsplash.com/photo-1627252500796-aae30da38937?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80", label: "Ruang Kelompok Kecil" },
            { url: "https://images.unsplash.com/photo-1696238572906-2a85322d2152?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80", label: "Komunitas Bersama" },
        ],
    },
    {
        id: "hidup",
        icon: Home,
        emoji: "🏠",
        label: "Hidup Bersama",
        tagline: "Komunitas Residensial Penuh",
        color: "#0570CD",
        gradient: "from-[#0570CD] to-[#0A2C74]",
        lightBg: "bg-sky-50",
        desc: "Pendidikan di STTB diselenggarakan secara residensial penuh — mahasiswa tinggal bersama sebagai satu komunitas sepanjang masa studi.",
        highlights: [
            { icon: Home, text: "4 Asrama (Dosen, Putra, Putri, Pascasarjana)" },
            { icon: Users, text: "Lounge & Ruang Makan Bersama" },
            { icon: Dumbbell, text: "Jogging & Senam" },
            { icon: Dumbbell, text: "Basket · Badminton · Futsal · Renang · Tenis Meja" },
        ],
        detail: "Ada empat asrama terintegrasi di lokasi kampus STTB: asrama dosen, asrama mahasiswa putra (aspra), asrama mahasiswa putri (aspri), dan asrama mahasiswa pascasarjana/tamu. Fasilitas asrama terdiri dari kamar tidur lengkap, kamar mandi dan toilet, lounge, ruang makan, serta berbagai sarana olahraga.",
        image: "https://images.unsplash.com/photo-1759200135568-566eb9ecaa81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&q=80",
        gallery: [
            { url: "https://images.unsplash.com/photo-1696238572906-2a85322d2152?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80", label: "Asrama Mahasiswa" },
            { url: "https://images.unsplash.com/photo-1759200135568-566eb9ecaa81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80", label: "Fasilitas Olahraga" },
            { url: "https://images.unsplash.com/photo-1758936382103-c1dbffcea2ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80", label: "Lapangan & Area Outdoor" },
        ],
    },
];

const stats = [
    { value: "4", label: "Asrama", sub: "Terintegrasi" },
    { value: "7+", label: "Lantai", sub: "Gedung Utama" },
    { value: "5+", label: "Olahraga", sub: "Tersedia" },
    { value: "1", label: "Studio", sub: "Audio-Visual" },
];

/* ─── MASONRY GALLERY ────────────────────────────────────── */

const galleryImages = [
    { url: "https://images.unsplash.com/photo-1758413350815-7b06dbbfb9a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80", label: "Ruang Kelas", tag: "Akademik" },
    { url: "https://images.unsplash.com/photo-1741795746033-d50d48dc1da5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80", label: "Perpustakaan", tag: "Akademik" },
    { url: "https://images.unsplash.com/photo-1761850215840-2775d7229cad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80", label: "Studio Audio-Visual Didasko", tag: "Akademik" },
    { url: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80", label: "Aula Seminar", tag: "Rohani" },
    { url: "https://images.unsplash.com/photo-1763410723546-db98ef034af5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80", label: "Kapel & Ruang Ibadah", tag: "Rohani" },
    { url: "https://images.unsplash.com/photo-1627252500796-aae30da38937?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80", label: "Ruang Kelompok Kecil", tag: "Rohani" },
    { url: "https://images.unsplash.com/photo-1762383805537-a5e222f79c8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80", label: "Rumah Doa Bethel", tag: "Rohani" },
    { url: "https://images.unsplash.com/photo-1696238572906-2a85322d2152?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80", label: "Asrama Mahasiswa", tag: "Residensial" },
    { url: "https://images.unsplash.com/photo-1763890763377-abd05301034d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80", label: "Komunitas Kampus", tag: "Residensial" },
    { url: "https://images.unsplash.com/photo-1687709645238-0470ff08a6bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80", label: "Ruang Makan Bersama", tag: "Residensial" },
    { url: "https://images.unsplash.com/photo-1770306029966-e43683aced03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80", label: "Lapangan Basket", tag: "Olahraga" },
    { url: "https://images.unsplash.com/photo-1759200135568-566eb9ecaa81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80", label: "Fasilitas Olahraga", tag: "Olahraga" },
    { url: "https://images.unsplash.com/photo-1758936382103-c1dbffcea2ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80", label: "Area Outdoor Kampus", tag: "Olahraga" },
    { url: "https://images.unsplash.com/photo-1769509068789-f242b5a6fc47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80", label: "Studio Podcast", tag: "Akademik" },
    { url: "https://images.unsplash.com/photo-1762185941323-326e8e39af98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80", label: "Koleksi Buku Teologi", tag: "Akademik" },
    { url: "https://images.unsplash.com/photo-1769021045407-d49e26aebcba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80", label: "Gedung Kampus", tag: "Kampus" },
    { url: "https://images.unsplash.com/photo-1732115234692-3ee71d5363af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80", label: "Area Kampus STTB", tag: "Kampus" },
];

const galleryTags = ["Semua", "Akademik", "Rohani", "Residensial", "Olahraga", "Kampus"];

const TAG_COLORS: Record<string, string> = {
    Akademik: "#E62129",
    Rohani: "#0A2C74",
    Residensial: "#0570CD",
    Olahraga: "#059669",
    Kampus: "#7C3AED",
};

const breakpointColumnsObj = {
    default: 4,
    1200: 4,
    900: 3,
    640: 2,
    350: 1,
};

function MasonryGallery() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    const [activeTag, setActiveTag] = useState("Semua");
    const [lightbox, setLightbox] = useState<typeof galleryImages[0] | null>(null);

    const filtered = activeTag === "Semua" ? galleryImages : galleryImages.filter((img) => img.tag === activeTag);

    return (
        <section ref={ref} className="py-20 bg-gray-950">
            {/* Lightbox */}
            <AnimatePresence>
                {lightbox && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4"
                        onClick={() => setLightbox(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="relative w-[90vw] h-[85vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={lightbox.url}
                                alt={lightbox.label}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                                className="object-contain rounded-2xl"
                                priority
                            />
                            <div className="absolute top-3 right-3">
                                <button
                                    onClick={() => setLightbox(null)}
                                    className="w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 flex items-center justify-center text-white transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="mt-3 text-center">
                                <span className="text-white/80 text-sm px-2 py-3 rounded-3xl bg-gradient-to-r from-[#0A2C74] to [#0570CD] ">{lightbox.label}</span>
                                <span
                                    className="ml-3 px-2 py-0.5 rounded-full text-xs font-medium"
                                    style={{
                                        backgroundColor: `${TAG_COLORS[lightbox.tag]}30`,
                                        color: TAG_COLORS[lightbox.tag],
                                    }}
                                >
                                    {lightbox.tag}
                                </span>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-10"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-semibold uppercase tracking-widest mb-5">
                        <Grid3X3 className="w-3.5 h-3.5" /> Galeri Fasilitas
                    </div>
                    <h2 className="text-white font-bold mb-2" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
                        Lihat Kampus STTB
                    </h2>
                    <p className="text-white/50 text-sm max-w-lg mx-auto">
                        Potret nyata kehidupan dan fasilitas kampus — klik foto untuk memperbesar.
                    </p>
                </motion.div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.15, duration: 0.5 }}
                    className="flex flex-wrap gap-2 justify-center mb-8"
                >
                    {galleryTags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setActiveTag(tag)}
                            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${activeTag === tag
                                ? "bg-[#E62129] text-white shadow-lg shadow-red-900/30"
                                : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                                }`}
                        >
                            {tag}
                        </button>
                    ))}
                </motion.div>

                {/* Masonry Grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    layout
                >
                    <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className="flex w-auto -ml-3"
                        columnClassName="pl-3"
                    >
                        {filtered.map((img, i) => (
                            <motion.div
                                key={img.url + img.tag}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: i * 0.04, duration: 0.4 }}
                                className="relative group cursor-pointer rounded-xl overflow-hidden mb-3"
                                onClick={() => setLightbox(img)}
                            >
                                <Image
                                    src={img.url}
                                    alt={img.label}
                                    width={800}           // actual image width (for aspect ratio)
                                    height={600}          // actual height (adjust to your real ratio)
                                    sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                    className="w-full h-auto object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                                    loading="lazy"        // important for gallery performance
                                />

                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end">
                                    {/* // TODO: fix lightbox images size, and change label stylings */}
                                    <span
                                        className="mb-1.5 self-start px-2 py-0.5 rounded-full text-xs font-medium"
                                        style={{
                                            backgroundColor: `${TAG_COLORS[img.tag]}40`,
                                            color: "white",
                                            backdropFilter: "blur(4px)",
                                        }}
                                    >
                                        {img.tag}
                                    </span>
                                    <p className="text-white text-xs font-semibold leading-tight px-2 py-3 rounded-bl-xl bg-gradient-to-r from-[#0A2C74] to [#0570CD] ">{img.label}</p>
                                </div>

                                {/* Camera icon */}
                                <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Camera className="w-3.5 h-3.5 text-white" />
                                </div>
                            </motion.div>
                        ))}
                    </Masonry>
                </motion.div>

                {/* View count */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5 }}
                    className="text-center text-white/30 text-xs mt-6"
                >
                    Menampilkan {filtered.length} dari {galleryImages.length} foto
                </motion.p>
            </div>
        </section>
    );
}

/* ─── SECTION CARD ─────────────────────────────────────── */

function CategorySection({ cat, index }: { cat: typeof categories[0]; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    const [lightboxImg, setLightboxImg] = useState<{ url: string; label: string } | null>(null);
    const isEven = index % 2 === 0;
    const Icon = cat.icon;

    return (
        <section ref={ref} className="py-24 overflow-hidden relative">
            {/* Ambient glow */}
            <div
                className="absolute pointer-events-none"
                style={{
                    width: "600px",
                    height: "600px",
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${cat.color}12 0%, transparent 70%)`,
                    top: "50%",
                    [isEven ? "left" : "right"]: "-200px",
                    transform: "translateY(-50%)",
                }}
            />

            <div className="max-w-7xl mx-auto px-4 relative">
                <div className={`grid lg:grid-cols-2 gap-16 items-center ${!isEven ? "lg:[direction:rtl]" : ""}`}>
                    {/* Text side */}
                    <motion.div
                        initial={{ opacity: 0, x: isEven ? -60 : 60 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="lg:[direction:ltr] space-y-6"
                    >
                        {/* Label */}
                        <div className="flex items-center gap-3">
                            <div
                                className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
                                style={{ background: `linear-gradient(135deg, ${cat.color}, ${cat.color}aa)` }}
                            >
                                <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: cat.color }}>
                                    Fasilitas
                                </p>
                                <h2
                                    className="text-gray-900 dark:text-white font-bold leading-tight"
                                    style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
                                >
                                    {cat.label}
                                </h2>
                            </div>
                        </div>

                        {/* Tagline */}
                        <div
                            className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold"
                            style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
                        >
                            {cat.tagline}
                        </div>

                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{cat.detail}</p>

                        {/* Highlights */}
                        <div className="grid grid-cols-2 gap-2.5">
                            {cat.highlights.map((h, i) => {
                                const HIcon = h.icon;
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 16 }}
                                        animate={inView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ delay: 0.15 + i * 0.07, duration: 0.5 }}
                                        className="flex items-start gap-2.5 p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm"
                                    >
                                        <div
                                            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                                            style={{ backgroundColor: `${cat.color}15` }}
                                        >
                                            <HIcon className="w-3.5 h-3.5" style={{ color: cat.color }} />
                                        </div>
                                        <span className="text-gray-700 dark:text-gray-300 text-xs leading-snug font-medium">{h.text}</span>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Image side */}
                    <motion.div
                        initial={{ opacity: 0, x: isEven ? 60 : -60, scale: 0.95 }}
                        animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                        className="lg:[direction:ltr] space-y-3"
                    >
                        {/* Main image */}
                        <div
                            className="relative rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
                            style={{ height: "300px" }}
                            onClick={() => setLightboxImg({ url: cat.image, label: cat.label })}
                        >
                            <Image
                                src={cat.image}
                                alt={cat.label}
                                preload
                                fill
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                                style={{ background: `${cat.color}50` }}
                            >
                                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                                    <Camera className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            {/* Color accent bar */}
                            <div
                                className="absolute bottom-0 left-0 right-0 h-1"
                                style={{ background: `linear-gradient(90deg, ${cat.color}, transparent)` }}
                            />
                        </div>

                        {/* Gallery row */}
                        <div className="grid grid-cols-3 gap-3">
                            {cat.gallery.map((img, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                                    className="relative rounded-xl overflow-hidden cursor-pointer group"
                                    style={{ height: "90px" }}
                                    onClick={() => setLightboxImg(img)}
                                >
                                    <Image
                                        src={img.url}
                                        alt={img.label}
                                        fill
                                        preload
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-1.5">
                                        <span className="text-white text-xs font-medium leading-tight">{img.label}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxImg && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
                        onClick={() => setLightboxImg(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            className="relative w-[70vw] max-w-6xl h-[60vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={lightboxImg.url}
                                alt={lightboxImg.label}
                                fill
                                className="object-contain rounded-2xl"
                                priority
                            />
                            <div className="absolute -top-4 -right-4">
                                <button
                                    onClick={() => setLightboxImg(null)}
                                    className="w-9 h-9 rounded-full bg-white/30 hover:bg-white/80 hover:text-[#0A2C74] flex items-center justify-center text-white transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                            <p className="text-white/70 text-center mt-3 text-sm">{lightboxImg.label}</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

/* ─── STATS BAR ─────────────────────────────────────────── */

function StatsBar() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    return (
        <section ref={ref} className="py-16 bg-[#0A2C74] relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white/5" style={{ transform: "translate(-30%, -30%)" }} />
                <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[#E62129]/10" style={{ transform: "translate(30%, 30%)" }} />
            </div>
            <div className="max-w-5xl mx-auto px-4 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                >
                    <p className="text-blue-300 text-xs uppercase tracking-widest font-semibold mb-2">Kampus STTB</p>
                    <h2 className="text-white font-bold" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
                        Fasilitas Lengkap, Komunitas Hidup
                    </h2>
                </motion.div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: i * 0.12, duration: 0.6 }}
                            className="text-center"
                        >
                            <div className="text-white font-black" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", lineHeight: 1 }}>
                                {s.value}
                            </div>
                            <div className="text-blue-200 font-semibold mt-1">{s.label}</div>
                            <div className="text-blue-400 text-sm">{s.sub}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ─── HERO ───────────────────────────────────────────────── */

function Hero() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

    return (
        <div ref={ref} className="relative pt-28 pb-24 min-h-[520px] flex items-center overflow-hidden bg-[#060C1A]">
            <motion.div style={{ y }} className="absolute inset-0">
                <Image
                    src="https://images.unsplash.com/photo-1732115234692-3ee71d5363af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920&q=80"
                    alt=""
                    fill
                    preload
                    className="w-full h-full object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#060C1A]/20 via-[#060C1A]/60 to-[#060C1A]" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#060C1A] via-transparent to-[#060C1A]/60" />
            </motion.div>

            <motion.div style={{ opacity }} className="max-w-7xl mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="flex items-center gap-2 mb-5">
                        <div className="w-8 h-px bg-[#E62129]" />
                        <span className="text-[#E62129] text-xs font-semibold uppercase tracking-widest">Kehidupan Kampus</span>
                    </div>
                    <h1
                        className="text-white mb-5"
                        style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 800, lineHeight: 1.05 }}
                    >
                        Fasilitas Kampus<br />
                        <span style={{ color: "#E62129" }}>STTB</span>
                    </h1>
                    <p className="text-white/70 max-w-2xl leading-relaxed" style={{ fontSize: "clamp(1rem, 1.5vw, 1.1rem)" }}>
                        Seluruh aspek kehidupan di kampus dan asrama — studi, pembinaan, interaksi komunitas,
                        praktik pelayanan, dan istirahat — senantiasa diarahkan untuk membentuk hati yang mengasihi
                        Tuhan dan sesama bagi kemuliaan-Nya.
                    </p>

                    {/* Category quick-nav */}
                    <div className="flex flex-wrap gap-3 mt-8">
                        {categories.map((cat) => (
                            <a
                                key={cat.id}
                                href={`#${cat.id}`}
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-all backdrop-blur-sm border border-white/10 hover:border-white/30"
                            >
                                <span>{cat.emoji}</span>
                                {cat.label}
                                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                            </a>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}

/* ─── DIVIDER ────────────────────────────────────────────── */

function SectionDivider({ color }: { color: string }) {
    return (
        <div className="relative py-8 overflow-hidden">
            <div className="flex items-center max-w-7xl mx-auto px-4 gap-4">
                <div className="flex-1 h-px bg-gray-100 dark:bg-gray-800" />
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                <div className="flex-1 h-px bg-gray-100 dark:bg-gray-800" />
            </div>
        </div>
    );
}

/* ─── CTA ─────────────────────────────────────────────────── */

function FacilitiesCTA() {
    return (
        <section className="py-20 bg-gray-50 dark:bg-gray-950">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#E62129]/10 text-[#E62129] text-xs font-semibold uppercase tracking-widest mb-5">
                        Bergabunglah dengan Komunitas STTB
                    </span>
                    <h2
                        className="text-gray-900 dark:text-white mb-5"
                        style={{ fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}
                    >
                        Rasakan Pengalaman Belajar<br />yang Transformatif
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto leading-relaxed mb-8">
                        Semua fasilitas ini dirancang untuk mengoptimalkan proses pembentukan pribadi dan pemerlengkapan
                        pelayanan mahasiswa STTB — agar siap melayani di gereja, masyarakat, dan dunia.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="http://sis.sttb.ac.id/pmb"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#E62129] text-white font-semibold hover:bg-[#c4131a] transition-all shadow-lg shadow-red-200 dark:shadow-none"
                        >
                            Daftar Sekarang
                            <ChevronRight className="w-4 h-4" />
                        </a>
                        <a
                            href="/kontak-kami"
                            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border-2 border-[#0A2C74] text-[#0A2C74] dark:border-blue-400 dark:text-blue-400 font-semibold hover:bg-[#0A2C74] hover:text-white dark:hover:bg-blue-900/20 transition-all"
                        >
                            Hubungi Kami
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

/* ─── PAGE ────────────────────────────────────────────────── */

export default function FasilitasPage() {
    return (
        <>
            <Hero />

            {/* Intro quote */}
            <section className="py-14 bg-white dark:bg-gray-900">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <blockquote
                            className="text-gray-700 dark:text-gray-300 italic leading-relaxed"
                            style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)" }}
                        >
                            &quot;Fasilitas-fasilitas di kampus dan asrama STTB dirancang untuk{" "}
                            <strong className="text-[#E62129] not-italic">mengoptimalkan proses pembentukan pribadi</strong>{" "}
                            dan pemerlengkapan pelayanan mahasiswa. Sepanjang masa studi, mahasiswa akan{" "}
                            <strong className="text-[#0A2C74] dark:text-blue-300 not-italic">belajar bersama, bertumbuh bersama, dan hidup bersama</strong>{" "}
                            dalam komunitas.&quot;
                        </blockquote>
                    </motion.div>
                </div>
            </section>

            {/* Three category sections */}
            {categories.map((cat, i) => (
                <div id={cat.id} key={cat.id}>
                    <CategorySection cat={cat} index={i} />
                    {i < categories.length - 1 && <SectionDivider color={categories[i + 1].color} />}
                </div>
            ))}

            {/* Masonry gallery */}
            <MasonryGallery />

            <StatsBar />
            <FacilitiesCTA />
        </>
    );
}