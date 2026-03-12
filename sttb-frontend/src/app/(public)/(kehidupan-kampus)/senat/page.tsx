"use client";

import { motion } from "motion/react";
import { FadeIn, StaggerGroup, StaggerItem } from "@/components/ui/FadeIn";
import Link from "next/link";
import { ArrowRight, Music, Mic2, BookOpen, Heart, Church, Globe, GraduationCap, Trophy } from "lucide-react";
import Image from "next/image";
import PageHeader from "@/components/shared/PageHeader";

const activities = [
    {
        category: "Training Group",
        icon: Music,
        color: "#E62129",
        bg: "bg-red-50 dark:bg-red-900/20",
        items: ["Training Group Media & Au-Vi", "Training Group Panggung Boneka", "Training Group Musik Ibadah"],
        img: "https://images.unsplash.com/photo-1759874685095-8378bf6e7f57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    },
    {
        category: "Pembinaan & Pelayanan",
        icon: Heart,
        color: "#0A2C74",
        bg: "bg-blue-50 dark:bg-blue-900/20",
        items: ["Pameran Buku", "Pelatihan/Lokakarya", "Pelayanan Gereja", "Pelayanan Masyarakat"],
        img: "https://images.unsplash.com/photo-1764072970350-2ce4f354a483?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    },
    {
        category: "Perayaan & Peringatan",
        icon: Globe,
        color: "#0570CD",
        bg: "bg-sky-50 dark:bg-sky-900/20",
        items: ["Upacara HUT RI", "Malam Budaya", "Hari Reformasi", "Hari Natal / Paskah"],
        img: "https://images.unsplash.com/photo-1675099124977-5aab6e554dbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    },
    {
        category: "Kehidupan Kampus",
        icon: GraduationCap,
        color: "#E62129",
        bg: "bg-red-50 dark:bg-red-900/20",
        items: ["Orientasi Mahasiswa Baru", "Pemilihan Senat", "Wisuda & Dies Natalis STTB", "Games/Sport Day"],
        img: "/senat/senat-30.png",
    },
];

const roles = [
    { title: "Representasi Internal", desc: "Menjadi suara mahasiswa dalam forum-forum internal kampus dan akademik.", icon: Mic2 },
    { title: "Representasi Eksternal", desc: "Mewakili mahasiswa STTB dalam forum regional dan nasional.", icon: Globe },
    { title: "Koordinasi Kegiatan", desc: "Mengkoordinasikan kegiatan kampus dan kemahasiswaan sepanjang tahun.", icon: BookOpen },
    { title: "Pengembangan Bakat", desc: "Menyelenggarakan sarana pengembangan minat-bakat mahasiswa.", icon: Trophy },
];

export default function SenatPage() {
    return (
        <>
            <PageHeader
                title="Senat Mahasiswa"
                category="Kehidupan Kampus"
                description="Ladang sangat luas dan siap dituai, namun penuai sangat sedikit dan tidak siap. Senat hadir untuk mengasah dan membentuk kepemimpinan dalam diri setiap mahasiswa STTB."
                image="/senat/download.jpg"
                breadcrumb={[
                    { label: "Kampus", href: "#" },
                    { label: "Senat", href: "/senat" }
                ]}
            >
                <h2 className="text-white mt-4" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 800, lineHeight: 1.05 }}>
                    Students Today,
                    <br />
                    <span className="text-[#E62129]">Leaders Tomorrow!</span>
                </h2>
            </PageHeader>

            {/* About Senat */}
            <section className="py-16 bg-white dark:bg-gray-900">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <FadeIn direction="left">
                            <div>
                                <p className="text-[#E62129] text-sm font-semibold uppercase tracking-wider mb-3">Tentang Senat</p>
                                <h2 className="text-gray-900 dark:text-white mb-5" style={{ fontWeight: 700, fontSize: "1.5rem" }}>
                                    Wadah Pembentukan Kepemimpinan
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                                    Signifikansi dan urgensi kepemimpinan Kristen dalam misi Tuhan merupakan prioritas strategis
                                    bagi sinode, gereja, sekolah, lembaga pelayanan, dan ladang misi.
                                </p>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                                    Untuk mempersiapkan para pemimpin masa depan diperlukan bukan hanya pemahaman wawasan
                                    kepemimpinan melainkan juga pengalaman langsung dalam memimpin dengan disertai mentoring
                                    dalam prosesnya.
                                </p>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    Senat mahasiswa adalah wadah untuk mengasah kepemimpinan dalam diri mahasiswa. Senat
                                    memberikan solusi untuk menciptakan suasana belajar dan bertumbuh yang kondusif.
                                </p>
                            </div>
                        </FadeIn>
                        <FadeIn direction="right">
                            <div className="grid grid-cols-2 gap-3">
                                {roles.map((r) => {
                                    const Icon = r.icon;
                                    return (
                                        <div key={r.title} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
                                            <Icon className="w-6 h-6 text-[#E62129] mb-2" />
                                            <h4 className="text-gray-900 dark:text-white font-semibold text-sm mb-1">{r.title}</h4>
                                            <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">{r.desc}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Activities */}
            <section className="py-16 bg-gray-50 dark:bg-gray-950">
                <div className="max-w-5xl mx-auto px-4">
                    <FadeIn>
                        <div className="text-center mb-10">
                            <p className="text-[#E62129] text-sm font-semibold uppercase tracking-wider mb-2">Kegiatan</p>
                            <h2 className="text-gray-900 dark:text-white" style={{ fontWeight: 700, fontSize: "1.75rem" }}>
                                Kegiatan Senat STTB
                            </h2>
                        </div>
                    </FadeIn>

                    <StaggerGroup staggerDelay={0.12} className="grid md:grid-cols-2 gap-6">
                        {activities.map((act) => {
                            const Icon = act.icon;
                            return (
                                <StaggerItem key={act.category}>
                                    <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-shadow">
                                        <div className="relative h-36 overflow-hidden">
                                            <Image
                                                src={act.img}
                                                alt={act.category}
                                                fill
                                                className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                            <div
                                                className="absolute top-3 left-3 w-8 h-8 rounded-lg flex items-center justify-center"
                                                style={{ backgroundColor: act.color }}
                                            >
                                                <Icon className="w-4 h-4 text-white" />
                                            </div>
                                        </div>
                                        <div className="p-5">
                                            <h3 className="text-gray-900 dark:text-white font-bold mb-3" style={{ color: act.color }}>
                                                {act.category}
                                            </h3>
                                            <ul className="space-y-1.5">
                                                {act.items.map((item) => (
                                                    <li key={item} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                                                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: act.color }} />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </StaggerItem>
                            );
                        })}
                    </StaggerGroup>
                </div>
            </section>

            {/* CTA */}
            <FadeIn>
                <section className="py-14 bg-[#0A2C74]">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <Church className="w-12 h-12 text-blue-300 mx-auto mb-4" />
                        <h2 className="text-white mb-4" style={{ fontWeight: 700, fontSize: "1.75rem" }}>
                            Pembinaan Mahasiswa STTB
                        </h2>
                        <p className="text-blue-200 max-w-xl mx-auto leading-relaxed mb-6">
                            Senat bekerja bersama bidang kemahasiswaan untuk menciptakan pengalaman kampus yang menyeluruh —
                            akademik, rohani, dan kepemimpinan.
                        </p>
                        <Link
                            href="/pembinaan"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#E62129] hover:bg-[#c4131a] text-white font-medium transition-colors"
                        >
                            Pembinaan Mahasiswa <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </section>
            </FadeIn>
        </>
    );
}