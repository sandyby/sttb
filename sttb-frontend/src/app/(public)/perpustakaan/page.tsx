"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
    BookOpen, Monitor, Clock, Phone, ExternalLink,
    Database, Search, Globe, BookMarked, ChevronDown, ChevronUp,
} from "lucide-react";
import { FadeIn, StaggerGroup, StaggerItem } from "@/components/ui/FadeIn";

const stats = [
    { value: "47.254", label: "Judul", icon: BookOpen, color: "text-[#E62129]", bg: "bg-red-50 dark:bg-red-900/20" },
    { value: "51.932", label: "Eksemplar", icon: BookMarked, color: "text-[#0A2C74]", bg: "bg-blue-50 dark:bg-blue-900/20" },
    { value: "1.595", label: "Sirkulasi", icon: Database, color: "text-[#0570CD]", bg: "bg-sky-50 dark:bg-sky-900/20" },
];

const physicalLinks = [
    { label: "Katalog Fisik (OPAC)", href: "http://library.sttb.ac.id", desc: "Cari koleksi buku fisik perpustakaan STTB" },
    { label: "Pustaka Pintar", href: "https://docs.google.com/forms/d/18xoNEwlURemRdvMCCypUSXAK57Ni1S26j3pHlokUwyM/viewform", desc: "Layanan peminjaman cerdas" },
    { label: "Perpanjang Mandiri", href: "http://library.sttb.ac.id/index.php?p=perpanjang", desc: "Perpanjang masa peminjaman secara online" },
];

const digitalLinks = [
    { label: "E-Library via EBSCO", href: "https://search.ebscohost.com/Login.aspx", badge: "E-Book & Jurnal" },
];

const onlineResources = [
    { label: "PERPUSNAS", href: "https://e-resources.perpusnas.go.id/", desc: "Perpustakaan Nasional RI" },
    { label: "OADTL", href: "http://oadtl.org/", desc: "Open Access Digital Theological Library" },
    { label: "OJS / TRANSFORMATIO", href: "http://e-journal.sttb.ac.id/", desc: "Jurnal ilmiah STTB" },
    { label: "GARUDA", href: "https://garuda.kemdikbud.go.id/", desc: "Garba Rujukan Digital Kemdikbud" },
    { label: "SINTA", href: "https://sinta.kemdikbud.go.id/journals", desc: "Science and Technology Index" },
    { label: "GLOBETHICS", href: "https://www.globethics.net/home", desc: "Etika global & teologi" },
    { label: "SCIMAGO", href: "https://www.scimagojr.com", desc: "Journal & Country Rank" },
];

const digitalCollections = [
    "Koleksi E-Book via EBSCO",
    "Jurnal Teologi ATLA",
    "Open Access E-Book",
];

const highlightBooks = [
    {
        title: "The Transcendent Character of the Good: Philosophical and Theological Perspectives",
        desc: "This volume addresses issues of moral pluralism and polarization by drawing attention to the transcendent character of the good.",
        img: "https://images.unsplash.com/photo-1527649144814-b7d57216058c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&q=80",
    },
    {
        title: "Kingdom Calling: Vocational Stewardship for the Common Good",
        desc: "Amy Sherman unpacks Proverbs 11:10 to develop a theology and program of vocational stewardship for churches and faith communities.",
        img: "https://images.unsplash.com/photo-1722962674485-d34e69a9a406?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&q=80",
    },
    {
        title: "A Christian Education in the Virtues: Character Formation and Human Flourishing",
        desc: "Examines the connection between human nature and human flourishing, drawing on ancient and medieval sources.",
        img: "https://images.unsplash.com/photo-1675099124977-5aab6e554dbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&q=80",
    },
];

const membershipFields = [
    "Nama Lengkap *",
    "Tanggal Lahir *",
    "Nama Institusi *",
    "Alamat *",
    "E-mail *",
    "No. Kontak *",
];

import PageHeader from "@/components/shared/PageHeader";

export default function PerpustakaanPage() {
    const [activeTab, setActiveTab] = useState<"keanggotaan" | "bebasputaka">("keanggotaan");
    const [memberForm, setMemberForm] = useState<Record<string, string>>({});
    const [bebasForm, setBebasForm] = useState<Record<string, string>>({});
    const [agree, setAgree] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    return (
        <>
            <PageHeader
                title="Perpustakaan STTB"
                category="Kampus STTB"
                description="Menjadi wadah transformasi pemikiran dan kehidupan. Koleksi lebih dari 47.000 judul buku dan akses digital melalui EBSCO dan ATLA."
                breadcrumb={[{ label: "Perpustakaan", href: "/perpustakaan" }]}
            />

            {/* Stats */}
            <section className="py-10 bg-white dark:bg-gray-900">
                <div className="max-w-5xl mx-auto px-4">
                    <StaggerGroup staggerDelay={0.1} className="grid grid-cols-3 gap-5">
                        {stats.map((s) => {
                            const Icon = s.icon;
                            return (
                                <StaggerItem key={s.label}>
                                    <div className="text-center p-5 rounded-xl border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow">
                                        <div className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center mx-auto mb-3`}>
                                            <Icon className={`w-6 h-6 ${s.color}`} />
                                        </div>
                                        <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm">{s.label}</p>
                                    </div>
                                </StaggerItem>
                            );
                        })}
                    </StaggerGroup>
                </div>
            </section>

            {/* Physical + Digital Library */}
            <section className="py-14 bg-gray-50 dark:bg-gray-950">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Physical */}
                        <FadeIn direction="left">
                            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden h-full">
                                <div className="bg-[#0A2C74] px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <BookOpen className="w-5 h-5 text-blue-300" />
                                        <h2 className="text-white font-bold">Perpustakaan Fisik</h2>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <div className="space-y-3 mb-5">
                                        {physicalLinks.map((l) => (
                                            <a
                                                key={l.label}
                                                href={l.href}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-[#0A2C74] hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all group"
                                            >
                                                <div>
                                                    <p className="text-gray-900 dark:text-white font-medium text-sm group-hover:text-[#0A2C74] dark:group-hover:text-blue-300">
                                                        {l.label}
                                                    </p>
                                                    <p className="text-gray-500 dark:text-gray-400 text-xs">{l.desc}</p>
                                                </div>
                                                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#0A2C74] dark:group-hover:text-blue-300 flex-shrink-0" />
                                            </a>
                                        ))}
                                    </div>
                                    <div className="border-t border-gray-100 dark:border-gray-800 pt-4 space-y-2">
                                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                            <Clock className="w-4 h-4 text-[#E62129]" />
                                            <span>Jam Layanan: 08.00 – 17.00 WIB</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                            <Phone className="w-4 h-4 text-[#E62129]" />
                                            <span>WhatsApp: 0851-7305-7735</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>

                        {/* Digital */}
                        <FadeIn direction="right">
                            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden h-full">
                                <div className="bg-[#E62129] px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <Monitor className="w-5 h-5 text-red-100" />
                                        <h2 className="text-white font-bold">Perpustakaan Digital</h2>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <div className="space-y-2 mb-5">
                                        {digitalCollections.map((d) => (
                                            <div key={d} className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#E62129]" />
                                                <span className="text-gray-700 dark:text-gray-300 text-sm">{d}</span>
                                            </div>
                                        ))}
                                    </div>
                                    {digitalLinks.map((l) => (
                                        <a
                                            key={l.label}
                                            href={l.href}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-[#E62129] hover:bg-red-50 dark:hover:bg-red-900/10 transition-all group mb-4"
                                        >
                                            <div>
                                                <p className="text-gray-900 dark:text-white font-medium text-sm group-hover:text-[#E62129]">
                                                    {l.label}
                                                </p>
                                                <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded mt-1 inline-block">
                                                    {l.badge}
                                                </span>
                                            </div>
                                            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#E62129] flex-shrink-0" />
                                        </a>
                                    ))}

                                    <div className="border-t border-gray-100 dark:border-gray-800 pt-4">
                                        <p className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">
                                            Sumber Online
                                        </p>
                                        <div className="grid grid-cols-2 gap-2">
                                            {onlineResources.map((r) => (
                                                <a
                                                    key={r.label}
                                                    href={r.href}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="flex items-center gap-1.5 text-xs text-[#0570CD] hover:underline hover:text-[#0A2C74] transition-colors"
                                                >
                                                    <Globe className="w-3 h-3 flex-shrink-0" />
                                                    {r.label}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Highlight Books */}
            <section className="py-14 bg-white dark:bg-gray-900">
                <div className="max-w-5xl mx-auto px-4">
                    <FadeIn>
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <p className="text-[#E62129] text-sm font-semibold uppercase tracking-wider mb-1">
                                    Highlight Buku
                                </p>
                                <h2
                                    className="text-gray-900 dark:text-white"
                                    style={{ fontWeight: 700, fontSize: "1.5rem" }}
                                >
                                    Koleksi Pilihan
                                </h2>
                            </div>
                        </div>
                    </FadeIn>

                    <StaggerGroup staggerDelay={0.12} className="space-y-4">
                        {highlightBooks.map((b) => (
                            <StaggerItem key={b.title}>
                                <div className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                                    <img
                                        src={b.img}
                                        alt={b.title}
                                        className="w-16 h-20 object-cover rounded-lg flex-shrink-0 shadow"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-gray-900 dark:text-white font-semibold text-sm leading-snug mb-2">
                                            {b.title}
                                        </h3>
                                        <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed line-clamp-2">
                                            {b.desc}
                                        </p>
                                    </div>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerGroup>
                </div>
            </section>

            {/* Membership Form */}
            <section className="py-14 bg-gray-50 dark:bg-gray-950">
                <div className="max-w-3xl mx-auto px-4">
                    <FadeIn>
                        <div className="text-center mb-8">
                            <p className="text-[#E62129] text-sm font-semibold uppercase tracking-wider mb-2">
                                Keanggotaan
                            </p>
                            <h2
                                className="text-gray-900 dark:text-white"
                                style={{ fontWeight: 700, fontSize: "1.5rem" }}
                            >
                                Daftar / Kelola Keanggotaan Perpustakaan
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                                Terbuka untuk umum, mahasiswa, alumni, dan mitra STTB.
                            </p>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.1}>
                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                            {/* Tabs */}
                            <div className="flex border-b border-gray-100 dark:border-gray-800">
                                {[
                                    { key: "keanggotaan", label: "Pendaftaran Anggota" },
                                    { key: "bebasputaka", label: "Bebas Pustaka (SKBP)" },
                                ].map((tab) => (
                                    <button
                                        key={tab.key}
                                        onClick={() => setActiveTab(tab.key as typeof activeTab)}
                                        className={`flex-1 py-3 text-sm font-medium transition-colors border-b-2 ${activeTab === tab.key
                                            ? "border-[#E62129] text-[#E62129]"
                                            : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                                            }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            <div className="p-6">
                                {activeTab === "keanggotaan" ? (
                                    <div className="space-y-4">
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            {membershipFields.map((field) => {
                                                const key = field.replace(" *", "").toLowerCase().replace(/ /g, "_");
                                                return (
                                                    <div key={field}>
                                                        <label className="block text-gray-700 dark:text-gray-300 text-sm mb-1">
                                                            {field}
                                                        </label>
                                                        <input
                                                            type={field.includes("email") || field.includes("E-mail") ? "email" : "text"}
                                                            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#E62129]/30 focus:border-[#E62129] transition-colors"
                                                            value={memberForm[key] || ""}
                                                            onChange={(e) => setMemberForm((f) => ({ ...f, [key]: e.target.value }))}
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        <div className="space-y-3">
                                            {[
                                                { label: "Pas Foto *", note: "Format: JPG/PNG, max 2MB" },
                                                { label: "Kartu Identitas *", note: "KTP/KTM, format: JPG/PDF" },
                                                { label: "Bukti Transfer Deposit & Biaya Pendaftaran *", note: "Format: JPG/PDF" },
                                            ].map((f) => (
                                                <div key={f.label}>
                                                    <label className="block text-gray-700 dark:text-gray-300 text-sm mb-1">{f.label}</label>
                                                    <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
                                                        <p className="text-gray-400 dark:text-gray-500 text-xs">{f.note}</p>
                                                        <button className="mt-2 text-xs text-[#0570CD] hover:underline">
                                                            Pilih File
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <label className="flex items-start gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={agree}
                                                onChange={(e) => setAgree(e.target.checked)}
                                                className="mt-0.5 accent-[#E62129]"
                                            />
                                            <span className="text-gray-600 dark:text-gray-400 text-sm">
                                                Data yang saya isi telah benar dan saya bersedia menaati semua peraturan yang ada. *
                                            </span>
                                        </label>

                                        <button
                                            onClick={() => agree && setSubmitted(true)}
                                            disabled={!agree}
                                            className="w-full py-2.5 rounded-lg bg-[#E62129] hover:bg-[#c4131a] disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium text-sm transition-colors"
                                        >
                                            {submitted ? "Terkirim! Kami akan segera menghubungi Anda." : "Kirim Pendaftaran"}
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                                            Permohonan non-aktif keanggotaan, berupa surat keterangan bebas pustaka (SKBP).
                                        </p>
                                        {["Nama Lengkap *", "No. Anggota *", "Nama Institusi *"].map((field) => {
                                            const key = field.replace(" *", "").toLowerCase().replace(/ /g, "_");
                                            return (
                                                <div key={field}>
                                                    <label className="block text-gray-700 dark:text-gray-300 text-sm mb-1">{field}</label>
                                                    <input
                                                        type="text"
                                                        className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#E62129]/30 focus:border-[#E62129] transition-colors"
                                                        value={bebasForm[key] || ""}
                                                        onChange={(e) => setBebasForm((f) => ({ ...f, [key]: e.target.value }))}
                                                    />
                                                </div>
                                            );
                                        })}
                                        <label className="flex items-start gap-2 cursor-pointer">
                                            <input type="checkbox" className="mt-0.5 accent-[#E62129]" />
                                            <span className="text-gray-600 dark:text-gray-400 text-sm">
                                                Data yang saya isi telah benar dan saya bersedia menaati semua peraturan yang ada. *
                                            </span>
                                        </label>
                                        <button className="w-full py-2.5 rounded-lg bg-[#0A2C74] hover:bg-[#083a8c] text-white font-medium text-sm transition-colors">
                                            Kirim Permohonan SKBP
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </>
    );
}
