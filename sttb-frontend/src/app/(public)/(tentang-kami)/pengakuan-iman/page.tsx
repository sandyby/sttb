"use client";

import { useState, Fragment } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FadeIn, StaggerGroup, StaggerItem } from "@/components/ui/FadeIn";

const articles = [
    {
        no: 1,
        title: "Alkitab — Firman Allah yang Sempurna",
        content: "Bahwa Alkitab secara keseluruhan, Perjanjian Lama dan Perjanjian Baru, adalah firman Allah yang diwahyukan dan diilhamkan tanpa kesalahan. Oleh karena itu, Alkitab adalah sumber otoritas tertinggi bagi iman dan kehidupan orang percaya di segala abad dan tempat.",
        verse: "2 Timotius 3:16-17",
        color: "#E62129",
    },
    {
        no: 2,
        title: "Allah — Tritunggal yang Mahakudus",
        content: "Bahwa Allah adalah Esa dan kekal, Mahakudus, dan penuh rahmat. Ia adalah pencipta, penguasa, dan pemelihara alam semesta beserta segala isinya, Tritunggal sebagai Bapa, Anak, dan Roh Kudus. Masing-masing adalah Pribadi yang tidak diciptakan, sehakekat, dan setara dalam kuasa dan kemuliaan. Ia berdaulat baik dalam keselamatan maupun dalam penghakiman umat manusia.",
        verse: "Ulangan 6:4; Matius 28:19",
        color: "#0A2C74",
    },
    {
        no: 3,
        title: "Manusia — Ciptaan & Kejatuhan",
        content: "Bahwa manusia, laki-laki dan perempuan, telah diciptakan oleh Allah menurut gambar-Nya, yang telah dimahkotai-Nya dengan kemuliaan serta mandat untuk memenuhi bumi, mengelola dan memelihara seluruh ciptaan-Nya. Tetapi manusia telah jatuh ke dalam dosa, terpisah dari Allah, dan kehilangan kemampuan untuk hidup sesuai dengan citranya sebagai ciptaan Allah, sehingga tidak mampu menyelamatkan dirinya sendiri.",
        verse: "Kejadian 1:26-27; Roma 3:23",
        color: "#0570CD",
    },
    {
        no: 4,
        title: "Yesus Kristus — Juruselamat Satu-satunya",
        content: "Bahwa Yesus Kristus adalah Anak Tunggal Allah, Allah sejati dan Manusia sejati, penebus dan satu-satunya jalan keselamatan bagi seluruh umat manusia. Ia dikandung dari Roh Kudus, lahir dari anak dara Maria, hidup tanpa dosa, sempurna dalam pengorbanan dan kasih. Ia mati di atas kayu salib, bangkit kembali dari antara orang mati dalam tubuh kebangkitan yang nyata, naik ke sorga, duduk di sebelah kanan Allah Bapa, menjadi Imam Besar Agung bagi orang percaya, dan pengantara tunggal antara Allah dan manusia, serta Raja di atas segala raja.",
        verse: "Yohanes 14:6; 1 Korintus 15:3-4",
        color: "#E62129",
    },
    {
        no: 5,
        title: "Roh Kudus — Allah yang Hidup dan Aktif",
        content: "Bahwa Roh Kudus adalah Allah yang hidup, yang menginsafkan manusia akan dosa, kebenaran, dan penghakiman. Ia melahirbarukan orang berdosa yang percaya, mendiami, menguduskan, dan memberi kuasa serta karunia-karunia kepada setiap orang percaya menurut kehendak-Nya demi kesaksian, persekutuan, dan pelayanan untuk pembangunan tubuh Kristus.",
        verse: "Yohanes 16:8; Efesus 4:11-12",
        color: "#0A2C74",
    },
    {
        no: 6,
        title: "Keselamatan — Anugerah Melalui Iman",
        content: "Bahwa manusia hanya dapat diselamatkan oleh kasih karunia melalui penebusan oleh Tuhan Yesus Kristus dan dibenarkan melalui iman, tanpa jasa, usaha, ataupun kesalehan dari pihak manusia. Melalui penyelamatan Allah dalam Kristus, gambar Allah pada manusia dipulihkan. Dengan demikian, manusia dimampukan untuk menjalani kehidupan yang penuh tanggung jawab dalam pengabdian dan kasih di hadapan Allah dan manusia.",
        verse: "Efesus 2:8-9; Roma 5:1",
        color: "#0570CD",
    },
    {
        no: 7,
        title: "Gereja — Tubuh Kristus yang Kudus",
        content: "Bahwa Gereja selaku garam dan terang dunia adalah himpunan semua orang percaya dari segala abad dan bangsa. Ia adalah tubuh Kristus yang kudus dan Am, dengan Kristus sebagai Kepalanya. Gereja memberitakan Kerajaan Allah melalui kebaktian, pengajaran, sakramen baptisan dan perjamuan kudus, serta pemberitaan Injil dan misi umat Allah seutuhnya di tengah dunia.",
        verse: "Matius 5:13-16; Efesus 1:22-23",
        color: "#E62129",
    },
    {
        no: 8,
        title: "Kedatangan Kembali Kristus — Pengharapan Akhir",
        content: "Bahwa kepastian kedatangan kembali Yesus Kristus secara nyata dan pribadi akan terjadi pada akhir zaman untuk menjemput umat-Nya untuk menghakimi seluruh umat manusia, baik yang hidup maupun yang mati. Pada kedatangan-Nya kedua kali itulah setiap orang mati akan dibangkitkan, orang percaya masuk ke dalam kehidupan yang kekal, orang yang tidak percaya masuk ke dalam kebinasaan yang kekal.",
        verse: "1 Tesalonika 4:16-17; Wahyu 20:11-15",
        color: "#0A2C74",
    },
];

export default function PengakuanImanPage() {
    const [active, setActive] = useState<number | null>(null);

    return (
        <>
            {/* Hero */}
            <div className="pt-28 pb-20 bg-gradient-to-br from-[#0A2C74] via-[#0A2C74] to-[#0570CD] relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none opacity-10">
                    {/* Cross silhouette */}
                    <div className="absolute right-20 top-10 w-2 h-40 bg-white rounded-full" />
                    <div className="absolute right-6 top-24 w-28 h-2 bg-white rounded-full" />
                </div>
                <div className="max-w-7xl mx-auto px-4 relative">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-6 h-px bg-[#E62129]" />
                            <span className="text-[#E62129] text-xs font-semibold uppercase tracking-widest">Tentang STTB</span>
                        </div>
                        <h1 className="text-white mb-4" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 800 }}>
                            Pengakuan Iman
                        </h1>
                        <p className="text-blue-200 max-w-2xl leading-relaxed">
                            Pernyataan kepercayaan yang menjadi fondasi teologis Sekolah Tinggi Teologi Bandung — merangkum apa yang kami percayai dan ajarkan.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Articles */}
            <section className="py-16 bg-gray-50 dark:bg-gray-950">
                <div className="max-w-4xl mx-auto px-4">
                    <FadeIn>
                        <div className="text-center mb-10">
                            <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
                                Klik pada setiap pasal untuk membaca penjelasan lengkap. Pengakuan iman ini mencerminkan tradisi
                                Reformed-Evangelical yang menjadi dasar pendidikan STTB.
                            </p>
                        </div>
                    </FadeIn>

                    <StaggerGroup staggerDelay={0.07} className="space-y-3">
                        {articles.map((a) => (
                            <StaggerItem key={a.no}>
                                <div
                                    className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                                    onClick={() => setActive(active === a.no ? null : a.no)}
                                >
                                    <div className="flex items-center p-5 gap-4">
                                        <div
                                            className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black flex-shrink-0 text-sm"
                                            style={{ backgroundColor: a.color }}
                                        >
                                            {a.no}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-gray-900 dark:text-white font-semibold leading-snug">
                                                <span className="text-gray-400 dark:text-gray-500 font-normal text-sm mr-2">
                                                    Kami Percaya
                                                </span>
                                                {a.title}
                                            </h3>
                                        </div>
                                        <motion.div
                                            animate={{ rotate: active === a.no ? 180 : 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="flex-shrink-0"
                                        >
                                            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </motion.div>
                                    </div>

                                    <AnimatePresence>
                                        {active === a.no && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                                className="overflow-hidden"
                                            >
                                                <div
                                                    className="px-5 pb-5 pt-0 border-t ml-14"
                                                    style={{ borderColor: `${a.color}30` }}
                                                >
                                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3 mt-3">
                                                        {a.content}
                                                    </p>
                                                    <div
                                                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold"
                                                        style={{ backgroundColor: `${a.color}10`, color: a.color }}
                                                    >
                                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                        </svg>
                                                        {a.verse}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerGroup>
                </div>
            </section>

            {/* Motto */}
            <FadeIn>
                <section className="py-14 bg-[#0A2C74]">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <p className="text-blue-300 text-xs uppercase tracking-widest mb-2">Motto STTB</p>
                        <p className="text-white/40 text-sm uppercase tracking-widest mb-6">DOMINO OPTIMO MAXIMO</p>
                        <div className="flex items-center justify-center gap-6 md:gap-12">
                            {["TO THE LORD", "THE BEST", "THE GREATEST"].map((m, i) => (
                                <Fragment key={m}>
                                    {i > 0 && <div className="w-px h-8 bg-blue-500/40" />}
                                    <span className="text-white font-bold text-sm md:text-base tracking-wider">{m}</span>
                                </Fragment>
                            ))}
                        </div>
                    </div>
                </section>
            </FadeIn>
        </>
    );
}
