"use client";

import { motion } from "motion/react";
import { BookOpen, Users, Lightbulb, Globe, ArrowRight, ExternalLink } from "lucide-react";
import { FadeIn, StaggerGroup, StaggerItem } from "@/components/ui/FadeIn";
import Link from "next/link";
import Image from "next/image";

const services = [
    {
        title: "Learning",
        subtitle: "Pembelajaran",
        icon: BookOpen,
        color: "bg-[#E62129]",
        lightColor: "bg-red-50 dark:bg-red-900/20 text-[#E62129]",
        desc: "Menyediakan akses bagi umat Tuhan untuk dapat mengikuti kelas-kelas dalam sekolah teologi secara audit (sit in). Orang-orang yang ingin diperlengkapi dalam wawasan dan keterampilan pelayanan tetapi tidak berkesempatan mengikuti pendidikan teologi secara formal tetap dapat belajar sesuai dengan waktu dan kebutuhan mereka.",
        detail: [
            "Kelas Audit (Sit In) — berbagai program studi",
            "Kuliah Umum (Public Lecture)",
            "Seminar Umum (Public Seminar)",
        ],
    },
    {
        title: "Equipping",
        subtitle: "Pemerlengkapan",
        icon: Users,
        color: "bg-[#0A2C74]",
        lightColor: "bg-blue-50 dark:bg-blue-900/20 text-[#0A2C74]",
        desc: "Menyelenggarakan kursus (certificate course), pelatihan (training course), dan klinik (crash course) dalam berbagai konten dan format. LEAD Center bekerja sama dengan berbagai bagian tubuh Kristus yang sudah mengembangkan bahan-bahan pembelajaran yang baik.",
        detail: [
            "Certificate Course",
            "Perspectives Study Program (PSP)",
            "Vocatio Marketplace Fellow",
        ],
    },
    {
        title: "Development",
        subtitle: "Pengembangan",
        icon: Lightbulb,
        color: "bg-[#0570CD]",
        lightColor: "bg-sky-50 dark:bg-sky-900/20 text-[#0570CD]",
        desc: "Mengembangkan bahan-bahan ajar dan sumber daya pembelajaran yang dapat dipakai oleh tubuh Kristus. Sebagai lembaga yang berkompetensi melakukan penelitian dan pengembangan, LEAD mengembangkan program studi nonformal.",
        detail: [
            "Modul Pembinaan Digital",
            "Bahan Pemuridan Dunia Kerja",
            "Materi Media Sosial",
        ],
    },
];

const programs = [
    {
        title: "Perspectives Study Program (PSP)",
        desc: "Program studi perspektif misi global yang diselenggarakan bekerja sama dengan Perspectives Indonesia. Memperlengkapi peserta untuk memahami misi Allah secara menyeluruh.",
        schedule: "Online / Setiap Minggu",
        link: "#",
    },
    {
        title: "Vocatio Marketplace Fellow",
        desc: "Program pemuridan dunia kerja untuk memperlengkapi profesional Kristen bermisi di marketplace. Menghubungkan iman dan panggilan dalam konteks pekerjaan sehari-hari.",
        schedule: "Batch per Semester",
        link: "#",
    },
    {
        title: "Kelas Sit In (Audit)",
        desc: "Kesempatan mengikuti kelas program studi formal STTB secara audit — baik S1 maupun S2 — tanpa harus terdaftar sebagai mahasiswa formal.",
        schedule: "Sesuai Kalender Akademik",
        link: "/kegiatan",
    },
    {
        title: "Little STEP",
        desc: "Program pelatihan intensif singkat yang dirancang untuk memperlengkapi peserta dalam waktu singkat dengan materi-materi esensial pembinaan Kristen.",
        schedule: "Periodik",
        link: "#",
    },
];

const mediaItems = [
    {
        title: 'City TransForMission #2: "Fokus Strategis Misi Urban"',
        date: "20 April 2023",
        category: "Video",
        img: "https://images.unsplash.com/photo-1675099124977-5aab6e554dbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    },
    {
        title: 'City TransForMission #01: "Urbanisasi & Misi"',
        date: "2 Maret 2023",
        category: "Video",
        img: "https://images.unsplash.com/photo-1607332796965-436d1bf61731?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    },
    {
        title: "Disciplesight: Figital Discipleship",
        date: "20 Agustus 2022",
        category: "Video",
        img: "https://images.unsplash.com/photo-1722962674485-d34e69a9a406?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    },
];

export default function LeadPage() {
    return (
        <>
            {/* Hero */}
            <div className="pt-28 pb-20 bg-gradient-to-br from-[#0A2C74] via-[#0A2C74] to-[#0570CD] relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none opacity-10">
                    <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white -translate-y-1/2 translate-x-1/4" />
                    <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-white translate-y-1/2 -translate-x-1/4" />
                </div>
                <div className="max-w-7xl mx-auto px-4 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="text-[#7FB4E5] text-sm font-medium uppercase tracking-wider mb-1">
                            Learning, Equipping, & Development
                        </p>
                        <h1
                            className="text-white mb-4"
                            style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 700 }}
                        >
                            LEAD Center
                        </h1>
                        <p className="text-blue-200 max-w-2xl leading-relaxed">
                            Pusat pendidikan dan pelatihan nonformal dari Sekolah Tinggi Teologi Bandung
                            — memperlengkapi orang-orang kudus bagi pekerjaan pelayanan.
                        </p>
                        <p className="text-blue-300 text-sm mt-3 italic">
                            &quot;…bagi pembangunan tubuh Kristus.&quot; — Efesus 4:12
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Vision Statement */}
            <section className="py-16 bg-white dark:bg-gray-900">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <FadeIn direction="left">
                            <div>
                                <p className="text-[#E62129] text-sm font-semibold uppercase tracking-wider mb-3">
                                    Tentang LEAD Center
                                </p>
                                <h2
                                    className="text-gray-900 dark:text-white mb-5"
                                    style={{ fontWeight: 700, fontSize: "1.6rem" }}
                                >
                                    Memperlengkapi Seluruh Umat Allah
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                                    STTB Learning, Equipping, And Development (L.E.A.D.) Center adalah
                                    pusat pendidikan dan pelatihan nonformal dari Sekolah Tinggi Teologi
                                    Bandung. Tujuannya adalah untuk &quot;memperlengkapi orang-orang kudus bagi
                                    pekerjaan pelayanan, bagi pembangunan tubuh Kristus&quot; (Ef 4:12).
                                </p>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                                    LEAD Center digerakkan oleh visi STTB: &quot;Seluruh Umat membawa Seluruh
                                    Injil ke Seluruh Dunia.&quot; Salah satu buah terpenting dari reformasi
                                    adalah dihayatinya keyakinan alkitabiah tentang keimaman semua orang
                                    percaya (<em>the priesthood of all believers</em>).
                                </p>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    LEAD Center ingin menjadi bagian dari tubuh Kristus yang menyediakan,
                                    menghasilkan, dan mendistribusikan kesempatan dan bahan pembinaan yang
                                    diperlukan bagi pelipatgandaan pekerja.
                                </p>
                            </div>
                        </FadeIn>
                        <FadeIn direction="right">
                            <Image
                                src="https://images.unsplash.com/photo-1607332796965-436d1bf61731?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80"
                                height={320}
                                width={0}
                                sizes="w-full"
                                preload
                                alt="LEAD Center STTB"
                                className="w-full h-80 object-cover rounded-2xl shadow-xl"
                            />
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Three Services */}
            <section className="py-16 bg-gray-50 dark:bg-gray-950">
                <div className="max-w-5xl mx-auto px-4">
                    <FadeIn>
                        <div className="text-center mb-10">
                            <p className="text-[#E62129] text-sm font-semibold uppercase tracking-wider mb-2">
                                Tiga Bidang Layanan
                            </p>
                            <h2
                                className="text-gray-900 dark:text-white"
                                style={{ fontWeight: 700, fontSize: "1.75rem" }}
                            >
                                Layanan LEAD Center
                            </h2>
                        </div>
                    </FadeIn>

                    <StaggerGroup staggerDelay={0.15} className="grid md:grid-cols-3 gap-6">
                        {services.map((s) => {
                            const Icon = s.icon;
                            return (
                                <StaggerItem key={s.title}>
                                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                                        <div className={`${s.color} px-5 py-4`}>
                                            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-3">
                                                <Icon className="w-5 h-5 text-white" />
                                            </div>
                                            <h3 className="text-white font-bold text-lg">{s.title}</h3>
                                            <p className="text-white/70 text-sm">{s.subtitle}</p>
                                        </div>
                                        <div className="p-5 flex-1 flex flex-col">
                                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 flex-1">
                                                {s.desc}
                                            </p>
                                            <div className="space-y-1.5">
                                                {s.detail.map((d) => (
                                                    <div key={d} className="flex items-center gap-2">
                                                        <div className={`w-1.5 h-1.5 rounded-full ${s.color}`} />
                                                        <span className="text-gray-600 dark:text-gray-400 text-xs">{d}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </StaggerItem>
                            );
                        })}
                    </StaggerGroup>
                </div>
            </section>

            {/* Programs */}
            <section className="py-16 bg-white dark:bg-gray-900">
                <div className="max-w-5xl mx-auto px-4">
                    <FadeIn>
                        <div className="text-center mb-10">
                            <p className="text-[#E62129] text-sm font-semibold uppercase tracking-wider mb-2">
                                Program Kami
                            </p>
                            <h2
                                className="text-gray-900 dark:text-white"
                                style={{ fontWeight: 700, fontSize: "1.75rem" }}
                            >
                                Program LEAD Center
                            </h2>
                        </div>
                    </FadeIn>

                    <StaggerGroup staggerDelay={0.1} className="grid md:grid-cols-2 gap-5">
                        {programs.map((p) => (
                            <StaggerItem key={p.title}>
                                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 group h-full flex flex-col">
                                    <h3 className="text-gray-900 dark:text-white font-semibold mb-2 group-hover:text-[#E62129] transition-colors">
                                        {p.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-3 flex-1">
                                        {p.desc}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                            📅 {p.schedule}
                                        </span>
                                        <Link
                                            href={p.link}
                                            className="inline-flex items-center gap-1 text-[#E62129] text-xs font-medium hover:underline"
                                        >
                                            Selengkapnya <ArrowRight className="w-3 h-3" />
                                        </Link>
                                    </div>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerGroup>
                </div>
            </section>

            {/* Media / Recent Content */}
            <section className="py-16 bg-gray-50 dark:bg-gray-950">
                <div className="max-w-5xl mx-auto px-4">
                    <FadeIn>
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <p className="text-[#E62129] text-sm font-semibold uppercase tracking-wider mb-1">
                                    Media Terbaru
                                </p>
                                <h2
                                    className="text-gray-900 dark:text-white"
                                    style={{ fontWeight: 700, fontSize: "1.5rem" }}
                                >
                                    Konten dari LEAD Center
                                </h2>
                            </div>
                            <Link
                                href="/media"
                                className="hidden sm:flex items-center gap-2 text-[#E62129] text-sm font-medium hover:underline"
                            >
                                Lihat Semua <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </FadeIn>

                    <StaggerGroup staggerDelay={0.12} className="grid md:grid-cols-3 gap-5">
                        {mediaItems.map((item) => (
                            <StaggerItem key={item.title}>
                                <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-shadow group">
                                    <div className="relative overflow-hidden">
                                        <Image
                                            src={item.img}
                                            alt={item.title}
                                            height={160}
                                            width={0}
                                            sizes="max-w-fit"
                                            preload
                                            className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#E62129] text-white text-xs font-medium">
                                            {item.category}
                                        </span>
                                    </div>
                                    <div className="p-4">
                                        <p className="text-gray-400 dark:text-gray-500 text-xs mb-2">{item.date}</p>
                                        <h3 className="text-gray-900 dark:text-white font-semibold text-sm leading-snug line-clamp-2 group-hover:text-[#E62129] transition-colors">
                                            {item.title}
                                        </h3>
                                    </div>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerGroup>

                    <div className="text-center mt-8 sm:hidden">
                        <Link
                            href="/media"
                            className="inline-flex items-center gap-2 text-[#E62129] text-sm font-medium hover:underline"
                        >
                            Lihat Semua Media <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <FadeIn>
                <section className="py-16 bg-[#0A2C74]">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <Globe className="w-12 h-12 text-blue-300 mx-auto mb-5" />
                        <h2
                            className="text-white mb-4"
                            style={{ fontWeight: 700, fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
                        >
                            Mari Bekerja Bersama bagi Kemuliaan-Nya!
                        </h2>
                        <p className="text-blue-200 max-w-2xl mx-auto leading-relaxed mb-8">
                            LEAD Center ingin menjadi bagian dari tubuh Kristus yang menyediakan,
                            menghasilkan, dan mendistribusikan kesempatan dan bahan pembinaan bagi
                            pelipatgandaan pekerja.
                        </p>
                        <div className="flex flex-wrap gap-3 justify-center">
                            <Link
                                href="/kegiatan"
                                className="px-6 py-3 rounded-lg bg-[#E62129] hover:bg-[#c4131a] text-white font-medium transition-colors"
                            >
                                Lihat Jadwal Kegiatan
                            </Link>
                            <Link
                                href="/kontak-kami"
                                className="px-6 py-3 rounded-lg border border-blue-400 text-blue-200 hover:bg-white/10 font-medium transition-colors"
                            >
                                Hubungi Kami
                            </Link>
                        </div>
                    </div>
                </section>
            </FadeIn>
        </>
    );
}
