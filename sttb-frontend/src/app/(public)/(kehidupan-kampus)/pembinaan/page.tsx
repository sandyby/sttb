"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { FadeIn, StaggerGroup, StaggerItem } from "@/components/ui/FadeIn";
import { Home, BookOpen, Users, Heart, Globe, Briefcase, ChevronRight } from "lucide-react";
import Image from "next/image";
import PageHeader from "@/components/shared/PageHeader";

const sections = [
    {
        id: "komunitas",
        icon: Home,
        title: "Kehidupan Komunitas",
        color: "#E62129",
        img: "https://images.unsplash.com/photo-1763477950484-12fd6f42c67e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
        content: [
            {
                heading: null,
                text: "Sepanjang masa studi, mahasiswa akan hidup bersama, belajar bersama, bertumbuh bersama dalam komunitas. Semua mahasiswa penuh waktu dalam program S.Th., S.Pd.K., dan M.Th. matrikulasi yang belum menikah wajib tinggal di dalam asrama.",

                points: null
            },
            {
                heading: null,
                text: "Sebagai bagian dari komunitas, setiap mahasiswa perlu belajar saling mengasihi, saling menolong, dan saling menjaga dalam mengelola dan membentuk kehidupan kampus dan asrama yang kondusif.",

                points: null
            },
        ],
    },
    {
        id: "kapel",
        icon: BookOpen,
        title: "Kapel & Forum Pembinaan",
        color: "#0A2C74",
        img: "https://images.unsplash.com/photo-1626025612377-7d5d17362ff9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
        content: [
            {
                heading: "Format Kapel",
                text: "Kapel dilaksanakan beberapa kali dalam setiap minggu dengan format yang bervariasi: Ibadah liturgis, Ibadah kontemporer, Ibadah kontemplatif, Persekutuan Doa Misi, dan lain-lain. Semua mahasiswa yang tinggal di asrama diwajibkan mengikuti kapel sesuai jadwal.",
                points: null
            },
            {
                heading: "Forum Pembinaan — 4 Bidang Transformasi",
                text: null,
                points: [
                    { label: "Formasi Pengajaran", desc: "Bertumbuh dalam pengenalan akan Tuhan dan firman-Nya" },
                    { label: "Formasi Spiritual", desc: "Bertumbuh dalam hubungan pribadi dengan Tuhan" },
                    { label: "Formasi Karakter", desc: "Bertumbuh dalam karakter serupa Kristus" },
                    { label: "Formasi Pelayanan", desc: "Bertumbuh dalam pelayanan di dalam tubuh Kristus dan misi di tengah dunia" },
                ],
            },
        ],
    },
    {
        id: "pastoral",
        icon: Heart,
        title: "Kelompok Pastoral",
        color: "#0570CD",
        img: "https://images.unsplash.com/photo-1675099124977-5aab6e554dbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
        content: [
            {
                heading: null,
                text: "Kelompok pastoral merupakan sarana untuk mendampingi mahasiswa secara pembelajaran-akademik, kerohanian-karakter, dan pelayanan-vokasional. Setiap kelompok dipimpin oleh seorang pembimbing pastoral sebagai orangtua rohani yang mendampingi sejumlah mahasiswa sepanjang empat tahun studi.",
                points: null
            },
            {
                heading: "Frekuensi Pertemuan",
                text: "Pertemuan kelompok dilakukan dua minggu sekali. Pertemuan pribadi-ke-pribadi dilakukan berdasarkan keperluan. Kondisi khusus seperti gangguan kesehatan, umpan balik karakter, dan permasalahan psikologis menjadi perhatian pembimbing pastoral.",
                points: null
            },
        ],
    },
    {
        id: "pemuridan",
        icon: Users,
        title: "Kelompok Pemuridan",
        color: "#E62129",
        img: "https://images.unsplash.com/photo-1722962674485-d34e69a9a406?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
        content: [
            {
                heading: null,
                text: "Kelompok pemuridan merupakan sarana untuk menolong mahasiswa belajar dan bertumbuh bersama mengenai dasar-dasar pertumbuhan iman Kristen — menjadi murid Kristus dan menjadikan orang lain murid Kristus di mana pun berada.",
                points: null
            },
            {
                heading: null,
                text: "Setiap kelompok dipimpin oleh pembimbing pemuridan yang menjadi 'kakak rohani' selama tiga semester pertama di STTB. Pertemuan kelompok dilakukan satu minggu sekali. Para pembimbing pemuridan dimentor secara khusus oleh pembina pemuridan putra dan putri.",
                points: null
            },
        ],
    },
    {
        id: "spiritual",
        icon: Globe,
        title: "Formasi Spiritual & Misional",
        color: "#0A2C74",
        img: "https://images.unsplash.com/photo-1764072970350-2ce4f354a483?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
        content: [
            {
                heading: "Formasi Spiritual",
                text: "Waktu teduh merupakan waktu untuk bersekutu dengan Tuhan secara pribadi melalui firman dan doa. Ada beberapa retreat yang diikuti mahasiswa: Retreat awal studi, 'mini retreat' hampir setiap semester, dan retreat akhir studi sebagai persiapan praktik pelayanan.",
                points: null
            },
            {
                heading: "Formasi Misional",
                text: "Formasi misional dilaksanakan untuk menolong mahasiswa mendapatkan wawasan dan keterampilan bermisi, pengalaman langsung di ladang misi, dan pembentukan gaya hidup misioner. Dilaksanakan dalam bentuk Mission Education & Exposure Training (MEET) selama satu bulan penuh pada akhir tahun kedua.",
                points: null
            },
        ],
    },
    {
        id: "pelayanan",
        icon: Briefcase,
        title: "Praktik Pelayanan",
        color: "#0570CD",
        img: "https://images.unsplash.com/photo-1757143137392-0b1e1a27a7de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
        content: [
            {
                heading: "Tujuan",
                text: "Praktik pelayanan bertujuan agar mahasiswa semakin diperlengkapi dalam wawasan dan keterampilan serta semakin diasah dalam hati dan keterbebanan untuk dapat melayani secara efektif melalui pengalaman langsung di gereja, sekolah, atau lembaga pelayanan.",
                points: null
            },
            {
                heading: "Bentuk Praktik Pelayanan",
                text: null,
                points: [
                    { label: "MEET", desc: "Mission Education & Exposure Training" },
                    { label: "Weekend Ministry", desc: "Praktik Pelayanan Akhir Pekan" },
                    { label: "Short-term Ministry", desc: "Praktik Pelayanan Jangka Pendek" },
                    { label: "Long-term Ministry", desc: "Praktik Pelayanan Jangka Panjang (1 Tahun)" },
                ],
            },
        ],
    },
];

export default function PembinaanPage() {
    const [activeId, setActiveId] = useState("komunitas");
    const active = sections.find((s) => s.id === activeId)!;

    return (
        <>
            <PageHeader
                title="Pembinaan Mahasiswa"
                category="Kehidupan Kampus"
                description="Pembentukan holistik yang melingkupi seluruh kehidupan mahasiswa — akademik, spiritual, karakter, dan pelayanan."
                image="https://images.unsplash.com/photo-1626025612377-7d5d17362ff9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920&q=80"
                breadcrumb={[
                    { label: "Kampus", href: "#" },
                    { label: "Pembinaan", href: "/pembinaan" }
                ]}
            />

            {/* Tabs + Content */}
            <section className="py-12 bg-gray-50 dark:bg-gray-950">
                <div className="max-w-5xl mx-auto px-4">
                    {/* Tab nav */}
                    <FadeIn>
                        <div className="flex flex-wrap gap-2 mb-8">
                            {sections.map((s) => {
                                const Icon = s.icon;
                                return (
                                    <button
                                        key={s.id}
                                        onClick={() => setActiveId(s.id)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all border ${activeId === s.id
                                            ? "text-white border-transparent shadow-md"
                                            : "text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 hover:shadow-sm"
                                            }`}
                                        style={activeId === s.id ? { backgroundColor: s.color, borderColor: s.color } : {}}
                                    >
                                        <Icon className="w-3.5 h-3.5" />
                                        <span className="hidden sm:inline">{s.title}</span>
                                        <span className="sm:hidden">{s.title.split(" ")[0]}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </FadeIn>

                    {/* Active content */}
                    <motion.div
                        key={activeId}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <div className="relative rounded-2xl overflow-hidden mb-6 shadow-xl">
                                    <Image src={active.img} alt={active.title}
                                        height={256}
                                        width={0}
                                        sizes="max-w-fit"
                                        className="w-full 
                                        h-64 object-cover"
                                        preload
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute bottom-4 left-4">
                                        <span
                                            className="px-3 py-1.5 rounded-full text-white text-xs font-bold"
                                            style={{ backgroundColor: active.color }}
                                        >
                                            {active.title}
                                        </span>
                                    </div>
                                </div>

                                {/* Nav next section */}
                                <div className="flex flex-col gap-2">
                                    {sections.filter((s) => s.id !== activeId).slice(0, 3).map((s) => {
                                        const Icon = s.icon;
                                        return (
                                            <button
                                                key={s.id}
                                                onClick={() => setActiveId(s.id)}
                                                className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all text-left group"
                                            >
                                                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${s.color}15` }}>
                                                    <Icon className="w-4 h-4" style={{ color: s.color }} />
                                                </div>
                                                <span className="text-gray-700 dark:text-gray-300 text-sm font-medium group-hover:text-gray-900 dark:group-hover:text-white">
                                                    {s.title}
                                                </span>
                                                <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="space-y-5">
                                {active.content.map((block, i) => (
                                    <div key={i}>
                                        {block.heading && (
                                            <h3
                                                className="font-bold mb-2 text-sm uppercase tracking-wider"
                                                style={{ color: active.color }}
                                            >
                                                {block.heading}
                                            </h3>
                                        )}
                                        {block.text && (
                                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                                                {block.text}
                                            </p>
                                        )}
                                        {block.points && (
                                            <div className="space-y-2 mt-2">
                                                {block.points.map((p) => (
                                                    <div
                                                        key={p.label}
                                                        className="flex items-start gap-3 p-3 rounded-xl"
                                                        style={{ backgroundColor: `${active.color}08`, borderLeft: `3px solid ${active.color}40` }}
                                                    >
                                                        <div>
                                                            <p className="font-semibold text-gray-900 dark:text-white text-sm">{p.label}</p>
                                                            <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">{p.desc}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Quote */}
            <FadeIn>
                <section className="py-14 bg-[#0A2C74]">
                    <div className="max-w-3xl mx-auto px-4 text-center">
                        <p className="text-blue-200 text-lg leading-relaxed italic mb-4">
                            &quot;Kapel merupakan kegiatan penting dalam kehidupan di kampus secara komunitas dan wajib diikuti.
                            Di dalam kapel kita mendengarkan Firman Tuhan dan berdoa bersama, belajar memimpin ibadah dan
                            menyampaikan Firman Tuhan, serta bergumul menangkap visi dan misi bagi pelayanan selanjutnya.&quot;
                        </p>
                        <div className="w-12 h-0.5 bg-[#E62129] mx-auto" />
                    </div>
                </section>
            </FadeIn>
        </>
    );
}
