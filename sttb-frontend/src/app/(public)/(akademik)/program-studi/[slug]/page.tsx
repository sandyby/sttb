import Link from "next/link";
import Image from "next/image";
import { Clock, BookOpen, Award, Users, CheckCircle, ArrowRight, Phone } from "lucide-react";
import { programs } from "@/data/mock-data";

const programDetails: Record<string, {
    objectives: string[];
    courses: string[];
    careers: string[];
    duration: string;
    image: string;
}> = {
    "sarjana-teologi": {
        objectives: [
            "Memahami dan menafsirkan Alkitab secara tepat",
            "Menguasai teologi sistematik dan historis",
            "Mengembangkan keterampilan khotbah dan pengajaran",
            "Memahami konteks gereja dan masyarakat Indonesia",
            "Mengintegrasikan iman dengan kehidupan sehari-hari",
        ],
        courses: [
            "Penafsiran Alkitab (Hermeneutika)", "Teologi Sistematik I-IV", "Sejarah Gereja",
            "Bahasa Yunani & Ibrani", "Homiletika", "Konseling Pastoral",
            "Misiologi", "Etika Kristen", "Kepemimpinan Gerejawi", "Teologi Perjanjian Baru",
        ],
        careers: [
            "Pendeta / Gembala Sidang", "Penginjil & Misionaris", "Asisten Pendeta",
            "Staf Pelayanan Gereja", "Konselor Pastoral",
        ],
        duration: "4 tahun (8 semester)",
        image: "https://images.unsplash.com/photo-1536126750180-3c7d59643f99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    },
    "sarjana-pendidikan-kristen": {
        objectives: [
            "Menguasai prinsip-prinsip pendidikan Kristen",
            "Mengembangkan kurikulum pendidikan anak dan remaja",
            "Memimpin sekolah minggu dan program pemuda gereja",
            "Mengelola pendidikan agama Kristen di sekolah",
        ],
        courses: [
            "Dasar-Dasar Pendidikan Kristen", "Psikologi Perkembangan", "Kurikulum PAK",
            "Metode Mengajar Alkitab", "Pendidikan Anak", "Pendidikan Remaja",
            "Administrasi Pendidikan", "Konseling Remaja", "Pendidikan Agama di Sekolah",
        ],
        careers: [
            "Guru PAK di Sekolah", "Direktur Sekolah Minggu", "Direktur Pemuda Gereja",
            "Koordinator Pendidikan Gereja", "Pelatih Pemimpin Anak & Remaja",
        ],
        duration: "4 tahun (8 semester)",
        image: "https://images.unsplash.com/photo-1742549586702-c23994895082?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    },
};

const defaultDetail = {
    objectives: [
        "Mengembangkan pemahaman teologi yang mendalam dan aplikatif",
        "Membangun keterampilan kepemimpinan pastoral yang efektif",
        "Mempersiapkan pelayanan yang berdampak nyata bagi gereja",
        "Mengintegrasikan penelitian akademik dengan praktik pelayanan",
    ],
    courses: [
        "Teologi Biblika Lanjutan", "Metodologi Penelitian Teologi", "Kepemimpinan Pastoral",
        "Teologi Kontekstual", "Manajemen Gereja", "Tesis / Proyek Akhir",
    ],
    careers: [
        "Pendeta Senior", "Pemimpin Denominasi", "Dosen Teologi",
        "Konsultan Gereja", "Pemimpin Organisasi Kristen",
    ],
    duration: "2 tahun (4 semester)",
    image: "https://images.unsplash.com/photo-1505427214476-47e71e07abfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
};

export default async function ProgramPage({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    // const slug = location.pathname.replace(/^\//, "").replace(/\/$/, "");
    const program = programs.find((p) => p.slug === slug);

    if (!program) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-20">
                <div className="text-center">
                    <h1 className="text-gray-900 dark:text-white mb-3">Program studi tidak ditemukan!</h1>
                    <Link href="/" className="text-[#E62129]">Kembali ke Beranda</Link>
                </div>
            </div>
        );
    }

    const details = programDetails[program.slug] || defaultDetail;

    return (
        <>
            {/* Hero */}
            <div className="relative pt-28 pb-0 bg-gradient-to-r from-[#0A2C74] to-[#0570CD] overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <Image
                        src={details.image}
                        alt={program.name}
                        fill
                        priority
                        className="w-full h-full object-cover opacity-20"
                    />
                </div>
                <div className="relative max-w-7xl mx-auto px-4 pb-16">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                        <Link href="/" className="text-blue-200 hover:text-white text-sm">Beranda</Link>
                        <span className="text-blue-300">/</span>
                        <Link href="/program-studi" className="text-blue-200 hover:text-white text-sm">Program Studi</Link>
                        <span className="text-blue-300">/</span>
                        <span className="text-[#7FB4E5] text-sm">Program {program.level}</span>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                        <span className="px-2 py-1 rounded-md bg-[#E62129] text-white text-xs font-bold">
                            {program.level}
                        </span>
                        <span className="px-2 py-1 rounded-md bg-white/20 text-white text-xs">
                            {program.degree}
                        </span>
                    </div>
                    <h1
                        className="text-white mb-4 max-w-3xl"
                        style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, lineHeight: 1.2 }}
                    >
                        {program.name}
                    </h1>
                    <p className="text-blue-100 max-w-2xl leading-relaxed mb-8">
                        {program.description}
                    </p>

                    {/* Quick stats */}
                    <div className="flex flex-wrap gap-5">
                        {[
                            { icon: Clock, label: "Durasi", value: details.duration },
                            { icon: BookOpen, label: "Total SKS", value: `${program.credits} SKS` },
                            { icon: Award, label: "Gelar", value: program.degree },
                            { icon: Users, label: "Akreditasi", value: "BAN-PT" },
                        ].map((s) => {
                            const Icon = s.icon;
                            return (
                                <div key={s.label} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2.5 border border-white/20">
                                    <Icon className="w-4 h-4 text-[#7FB4E5]" />
                                    <div>
                                        <p className="text-white/60 text-xs">{s.label}</p>
                                        <p className="text-white font-semibold text-sm">{s.value}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Content */}
            <section className="py-14 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-3 gap-10">
                        {/* Main content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Objectives */}
                            <div>
                                <h2 className="text-gray-900 dark:text-white font-bold mb-5" style={{ fontSize: "1.25rem" }}>
                                    Tujuan Program
                                </h2>
                                <div className="space-y-3">
                                    {details.objectives.map((obj, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-[#E62129] mt-0.5 flex-shrink-0" />
                                            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{obj}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Courses */}
                            <div>
                                <h2 className="text-gray-900 dark:text-white font-bold mb-5" style={{ fontSize: "1.25rem" }}>
                                    Mata Kuliah Unggulan
                                </h2>
                                <div className="grid grid-cols-2 gap-2.5">
                                    {details.courses.map((course, i) => (
                                        <div key={i} className="flex items-center gap-2 p-2.5 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#E62129] flex-shrink-0" />
                                            <span className="text-sm text-gray-700 dark:text-gray-300">{course}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Career prospects */}
                            <div>
                                <h2 className="text-gray-900 dark:text-white font-bold mb-5" style={{ fontSize: "1.25rem" }}>
                                    Prospek Karir & Pelayanan
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {details.careers.map((career, i) => (
                                        <span key={i} className="px-3 py-1.5 rounded-full bg-[#0A2C74] text-white text-xs font-medium">
                                            {career}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1 space-y-5">
                            {/* Apply card */}
                            <div className="bg-[#0A2C74] rounded-2xl p-6 text-white">
                                <h3 className="font-bold mb-2">Daftarkan Diri Anda</h3>
                                <p className="text-blue-200 text-sm mb-4 leading-relaxed">
                                    Penerimaan mahasiswa baru 2025/2026 masih terbuka. Jangan lewatkan kesempatan ini.
                                </p>
                                <Link
                                    href="/prosedur-admisi"
                                    className="block text-center px-4 py-2.5 rounded-lg bg-[#E62129] text-white font-medium hover:bg-[#c4131a] transition-colors mb-3"
                                >
                                    Mulai Pendaftaran
                                </Link>
                                <Link
                                    href="/jadwal-admisi"
                                    className="block text-center px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm transition-colors border border-white/20"
                                >
                                    Lihat Jadwal Admisi
                                </Link>
                            </div>

                            {/* Program info */}
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 space-y-3">
                                <h3 className="text-gray-900 dark:text-white font-semibold">
                                    Informasi Program
                                </h3>
                                {[
                                    { label: "Jenjang", value: program.level === "S1" ? "Sarjana (S1)" : "Magister (S2)" },
                                    { label: "Gelar", value: program.degree },
                                    { label: "Durasi", value: details.duration },
                                    { label: "Total SKS", value: `${program.credits} SKS` },
                                    { label: "Akreditasi", value: "BAN-PT Peringkat B" },
                                    { label: "Bahasa Pengantar", value: "Indonesia" },
                                ].map((info) => (
                                    <div key={info.label} className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700 last:border-0">
                                        <span className="text-gray-500 dark:text-gray-400 text-sm">{info.label}</span>
                                        <span className="text-gray-900 dark:text-white text-sm font-medium">{info.value}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Contact */}
                            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                                <p className="text-gray-900 dark:text-white font-medium mb-2 text-sm">Butuh Informasi Lebih?</p>
                                <a href="tel:+62222012010" className="flex items-center gap-2 text-[#E62129] text-sm hover:underline">
                                    <Phone className="w-3.5 h-3.5" />
                                    (022) 201-2010
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}