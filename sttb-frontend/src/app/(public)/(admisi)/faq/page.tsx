"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { HelpCircle, ChevronDown, Phone, Mail, ArrowRight } from "lucide-react";
import { FadeIn, StaggerGroup, StaggerItem } from "@/components/ui/FadeIn";

type FAQItem = { q: string; a: string };

const sections: { id: string; title: string; color: string; items: FAQItem[] }[] = [
    {
        id: "memilih-s1",
        title: "Memilih Program Studi Sarjana (S1)",
        color: "#E62129",
        items: [
            {
                q: "Saya ingin menjadi Hamba Tuhan secara full time. Program apa yang tepat?",
                a: "Bagi Anda yang lulus SMA/diploma maka kami menyarankan Anda memilih program Sarjana Teologi. Jika sinode gereja tempat Anda melayani nantinya tidak mengharuskan lulusan S.Th., Anda juga dapat memilih program Sarjana Pendidikan Kristen.",
            },
            {
                q: "Saya ingin menjadi guru agama atau guru di sekolah Kristen.",
                a: "Kami menyarankan Anda untuk mengambil program studi Sarjana Pendidikan Kristen (S.Pd.). Lulusan S.Th. bisa saja menjadi guru Agama Kristen, namun bila tujuan Anda sejak awal adalah menjadi guru maka program S.Pd.K. jauh lebih tepat karena muatan ilmu-ilmu pendidikan jauh lebih banyak.",
            },
            {
                q: "Saya ingin bekerja di bidang misi dan menjadi misionaris.",
                a: "Kami menyarankan Anda untuk berkonsultasi dengan gereja atau tempat dimana Anda akan melayani. Beberapa denominasi membutuhkan Sarjana Teologi (S.Th.) sementara ada juga yang membutuhkan lulusan Sarjana Pendidikan (S.Pd.) untuk pelayanan misi dalam bidang pendidikan.",
            },
            {
                q: "Apakah dengan studi S1 di seminari dapat bekerja di luar gereja?",
                a: "Ya, baik lulusan Sarjana Teologi (S.Th.) dan Sarjana Pendidikan Kristen (S.Pd.) dapat bekerja di lingkungan nongereja. Kami menyarankan Anda mempertimbangkan panggilan dan rencana pelayanan ke depannya sebelum memilih untuk masuk S1 di seminari.",
            },
        ],
    },
    {
        id: "memilih-s2",
        title: "Memilih Program Studi Magister (S2)",
        color: "#0A2C74",
        items: [
            {
                q: "Saya ingin berkarir dalam hal akademik atau pendidikan.",
                a: "Kami menyarankan Anda untuk memilih program studi Magister Pendidikan (M.Pd.K.) dan membuat tesis/riset tentang metode pembelajaran. Bila Anda ingin berkarir dalam dunia pendidikan teologi, Magister Teologi (M.Th.) juga dapat menunjang karir Anda sebagai dosen teologi.",
            },
            {
                q: "Saya ingin menjadi Hamba Tuhan secara full time dengan studi S2.",
                a: "Bagi Anda yang lulus S1 maka kami menyarankan Anda untuk memilih program studi Magister Teologi (M.Th.). Anda akan menempuh jalur matrikulasi Magister Teologi. Khusus lulusan S.Pd.K. dari STTB dapat mengambil M.Th. tanpa mengikuti jalur matrikulasi.",
            },
            {
                q: "Saya ingin mengintegrasikan iman Kristen saya dalam karir yang sedang saya jalani.",
                a: "Kami menyarankan Anda untuk mengambil program studi Magister Ministri Pelayanan Marketplace (M.Min. Marketplace). Program ini dirancang khusus untuk memperlengkapi profesional Kristen bermisi di dunia kerja.",
            },
            {
                q: "Saya adalah aktivis gereja dan ingin diperlengkapi dalam bidang teologi.",
                a: "Kami menyarankan Anda mengambil program Magister Ministri Pelayanan Marketplace karena program ini menekankan banyak pengajaran teologi namun juga memberikan ilmu-ilmu praktis untuk melayani pemuridan di marketplace.",
            },
        ],
    },
    {
        id: "umum",
        title: "Pertanyaan Umum",
        color: "#0570CD",
        items: [
            {
                q: "Apakah STTB menyediakan beasiswa?",
                a: "STTB menyediakan beasiswa terbatas baik untuk program Sarjana maupun program Magister. Informasi dapat Anda pelajari pada halaman Beasiswa atau dengan bertanya langsung kepada Staf Beasiswa kami di: beasiswa@sttb.ac.id",
            },
            {
                q: "Apakah perkuliahan di STTB dilaksanakan secara online?",
                a: "Program Sarjana: STTB menyelenggarakan perkuliahan secara hybrid learning — mahasiswa asrama mengikuti tatap muka, mahasiswa yang sudah berkeluarga dan di luar asrama mengikuti secara online. Program Magister: Menggunakan sistem block teaching yang memungkinkan mahasiswa bekerja sambil studi.",
            },
            {
                q: "Berapa biaya studi di STTB?",
                a: "Biaya studi dibagi menjadi biaya rutin (administrasi semester dan biaya kuliah) dan insidentil (pendaftaran, tes, bimbingan skripsi/tesis, wisuda). Lihat detail lengkap di halaman Biaya Studi.",
            },
            {
                q: "Apakah saya dapat bekerja sambil kuliah?",
                a: "Untuk program Sarjana dan M.Th. Matrikulasi, bekerja tidaklah memungkinkan karena jadwal yang padat. Untuk program M.Th., M.Pd.K., dan M.Min. yang menggunakan sistem block teaching, Anda dapat bekerja/melayani sambil studi.",
            },
            {
                q: "Apakah saya harus tinggal di asrama?",
                a: "Mahasiswa S1 dan M.Th. Matrikulasi yang belum menikah wajib tinggal di asrama STTB. Mahasiswa S2 yang kuliah intensif dapat menginap di asrama hanya selama kelas berlangsung dengan membayar biaya yang telah ditetapkan.",
            },
        ],
    },
];

function FAQAccordionItem({ item, color }: { item: FAQItem; color: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden">
            <button
                onClick={() => setOpen((o) => !o)}
                className="w-full flex items-start justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors gap-4"
            >
                <span className="text-gray-900 dark:text-white font-medium text-sm">{item.q}</span>
                <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }} className="flex-shrink-0 mt-0.5">
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                </motion.div>
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden border-t border-gray-100 dark:border-gray-800"
                    >
                        <p className="px-4 py-3 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{item.a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

import PageHeader from "@/components/shared/PageHeader";

export default function FAQPage() {
    const [activeSection, setActiveSection] = useState("memilih-s1");
    const active = sections.find((s) => s.id === activeSection)!;

    return (
        <>
            <PageHeader
                title="Frequently Asked Questions"
                category="Admisi"
                description="Temukan jawaban atas pertanyaan yang sering diajukan seputar admisi, program studi, biaya, dan kehidupan kampus STTB."
                breadcrumb={[
                    { label: "Admisi", href: "/jadwal-admisi" },
                    { label: "FAQ", href: "/faq" }
                ]}
            />

            <section className="py-12 bg-gray-50 dark:bg-gray-950">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="grid lg:grid-cols-4 gap-8">
                        {/* Sidebar */}
                        <FadeIn direction="left">
                            <div className="space-y-2">
                                {sections.map((s) => (
                                    <button
                                        key={s.id}
                                        onClick={() => setActiveSection(s.id)}
                                        className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all ${activeSection === s.id
                                            ? "text-white shadow-md"
                                            : "text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:shadow-sm"
                                            }`}
                                        style={activeSection === s.id ? { backgroundColor: s.color } : {}}
                                    >
                                        <HelpCircle className="w-3.5 h-3.5 inline-block mr-2 opacity-60" />
                                        {s.title}
                                    </button>
                                ))}

                                <div className="mt-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4">
                                    <p className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">Kontak</p>
                                    <div className="space-y-2">
                                        <a href="tel:081573360009" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#E62129] transition-colors text-xs">
                                            <Phone className="w-3.5 h-3.5" /> 0815 7336 0009
                                        </a>
                                        <a href="mailto:admisi@sttb.ac.id" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#E62129] transition-colors text-xs">
                                            <Mail className="w-3.5 h-3.5" /> admisi@sttb.ac.id
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>

                        {/* Content */}
                        <div className="lg:col-span-3">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeSection}
                                    initial={{ opacity: 0, x: 16 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -16 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="w-2 h-6 rounded-full" style={{ backgroundColor: active.color }} />
                                        <h2 className="text-gray-900 dark:text-white font-bold">{active.title}</h2>
                                    </div>
                                    <div className="space-y-3">
                                        {active.items.map((item) => (
                                            <FAQAccordionItem key={item.q} item={item} color={active.color} />
                                        ))}
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* CTA */}
                            <FadeIn delay={0.3}>
                                <div className="mt-8 bg-[#E62129] rounded-2xl p-5 text-white">
                                    <h3 className="font-bold mb-2">Masih ada pertanyaan?</h3>
                                    <p className="text-red-100 text-sm mb-4">Hubungi tim admisi kami atau ikuti Open House STTB.</p>
                                    <div className="flex flex-wrap gap-3">
                                        <Link
                                            href="/kontak-kami"
                                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-[#E62129] font-semibold text-sm hover:bg-red-50 transition-colors"
                                        >
                                            Hubungi Kami <ArrowRight className="w-3.5 h-3.5" />
                                        </Link>
                                        <Link
                                            href="/kegiatan"
                                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
                                        >
                                            Kegiatan Mendatang
                                        </Link>
                                    </div>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
