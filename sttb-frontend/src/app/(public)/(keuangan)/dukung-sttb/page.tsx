"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import {
  Heart,
  BookOpen,
  Building2,
  ChevronDown,
  ChevronUp,
  Copy,
  CheckCircle2,
  ArrowRight,
  CopyCheckIcon,
  CopyCheck,
} from "lucide-react";
import { FadeIn, StaggerGroup, StaggerItem } from "@/components/ui/FadeIn";
import Image from "next/image";
import PageHeader from "@/components/shared/PageHeader";

const priorities = [
  {
    id: "beasiswa",
    icon: Heart,
    title: "Beasiswa",
    color: "bg-[#E62129]",
    lightColor: "bg-red-50 dark:bg-red-900/20",
    iconColor: "text-[#E62129]",
    textColor: "#E62129",
    img: "https://images.unsplash.com/photo-1771323994415-aba85604d4b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    desc: "Sebagian pribadi yang Tuhan panggil untuk melanjutkan ke jenjang pendidikan S1 bahkan S2 terkadang terkendala dengan pendanaan, dan mereka tidak tahu bagaimana dan kemana mereka bisa mendapat dukungan untuk mewujudkan panggilan tersebut.",
    detail:
      "Dukungan beasiswa terbuka bagi mahasiswa yang sudah menjalani proses belajar sampai dengan semester ke-2 dengan minimal IPK 3,0 dan telah lulus proses seleksi serta wawancara dengan Tim Beasiswa sebelumnya.",
    link: "/beasiswa",
  },
  {
    id: "perpustakaan",
    icon: BookOpen,
    title: "Perpustakaan Digital",
    color: "bg-[#0A2C74]",
    lightColor: "bg-blue-50 dark:bg-blue-900/20",
    iconColor: "text-[#0A2C74]",
    textColor: "#0A2C74",
    img: "https://images.unsplash.com/photo-1527649144814-b7d57216058c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    desc: "Perpustakaan STTB memiliki sekitar 50.000 buku dan terus berusaha memperkaya koleksi buku-buku baru yang dibutuhkan. Selain koleksi buku fisik, STTB juga menyediakan akses layanan e-book dan e-journal.",
    detail:
      "Melalui provider Ebscohost, saat ini STTB memiliki e-library yang berisi koleksi e-books yang relevan untuk pendidikan teologi dan juga berlangganan akses terhadap database jurnal ATLA. Koleksi e-books tersebut dapat dimanfaatkan oleh dosen, mahasiswa, dan alumni.",
    link: "/perpustakaan",
  },
  {
    id: "lain",
    icon: Building2,
    title: "Dukungan Lain",
    color: "bg-[#0570CD]",
    lightColor: "bg-sky-50 dark:bg-sky-900/20",
    iconColor: "text-[#0570CD]",
    textColor: "#0570CD",
    img: "https://images.unsplash.com/photo-1716625862188-f421d41bfb66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    desc: "Sebagai lembaga pendidikan yang terus menciptakan pendidik-pendidik yang tidak hanya bertambah secara kuantitas tapi secara kualitas semakin baik. STTB tentunya tidak akan berhenti berinovasi dan berkembang.",
    detail:
      "Berbagai perencanaan ke depan telah dipersiapkan: pembangunan, digital ministry, pembuatan studio rekaman video dan audio, pembinaan hamba-hamba Tuhan di daerah-daerah, pelaksanaan seminar di tempat-tempat terpilih.",
    link: "/fasilitas",
  },
];

const faqs = [
  {
    q: "Apakah STTB memiliki program beasiswa?",
    a: "Ya, STTB memiliki 5 (lima) jenis beasiswa untuk mahasiswa S1 dan S2.",
  },
  {
    q: "Bagaimana saya dapat berpartisipasi mendukung program beasiswa?",
    a: "STTB sangat mengharapkan dukungan Bapak/Ibu untuk pengadaan beasiswa bagi mahasiswa S1 dan S2. Bapak/Ibu dapat mengisi form yang telah kami sediakan. Setelah form kami terima, unit beasiswa akan menghubungi Bapak/Ibu.",
  },
  {
    q: "Apakah STTB akan menyediakan laporan beasiswa bagi sponsor?",
    a: "Ya, STTB akan menyediakan laporan tahunan kepada Bapak/Ibu sponsor beasiswa.",
  },
  {
    q: "Berapa dana untuk dapat berpartisipasi dalam program beasiswa?",
    a: "Kami menyediakan gambaran besaran dana untuk setiap jenis beasiswa. Besaran ini dapat berubah dengan pemberitahuan sebelumnya seiring dengan perubahan besaran biaya. Untuk info lebih lengkap hubungi: beasiswa@sttb.ac.id.",
  },
  {
    q: "Bagaimana saya dapat memberikan dana sponsor beasiswa?",
    a: "Bapak/Ibu dapat melakukan transfer dana ke rekening STTB yang akan tertera di form pemberian sponsor beasiswa.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        <span className="text-gray-900 dark:text-white font-medium text-sm pr-4">
          {q}
        </span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
        )}
      </button>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="border-t border-gray-100 dark:border-gray-800 px-4 py-3 bg-gray-50 dark:bg-gray-800"
        >
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            {a}
          </p>
        </motion.div>
      )}
    </div>
  );
}

export default function DukungSttbPage() {
  const [copied, setCopied] = useState(false);

  const copyAccount = () => {
    navigator.clipboard.writeText("2823005555").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <>
      <PageHeader
        title="Dukung STTB"
        category="Keuangan"
        description="Bergabunglah dalam mendukung misi STTB melalui donasi dan kemitraan. Kontribusi Anda membantu membentuk pemimpin Kristen yang berdampak."
        breadcrumb={[
          { label: "Keuangan", href: "#" },
          { label: "Dukung STTB", href: "/dukung-sttb" },
        ]}
      />

      {/* Kontribusi Anda */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeIn direction="left">
              <div>
                <p className="text-[#E62129] text-sm font-semibold uppercase tracking-wider mb-3">
                  Kontribusi Anda
                </p>
                <h2
                  className="text-gray-900 dark:text-white mb-5"
                  style={{ fontWeight: 700, fontSize: "1.6rem" }}
                >
                  Bersama Mempersiapkan Pemimpin Masa Depan
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  Kontribusi Anda dapat menolong STTB melanjutkan amanat Kristus
                  untuk mempersiapkan dan mendidik pelayan-pelayan Tuhan yang
                  sangat dibutuhkan untuk menjawab tantangan zaman — agar
                  menjadi pelayan-pelayan Tuhan yang berdampak bagi masyarakat.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  STTB sebagai Sekolah Tinggi yang terbuka bagi siapapun yang
                  terpanggil untuk mau diperlengkapi, dibentuk dan dididik
                  melalui program Studi S1 dan S2.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Dukungan Bapak/Ibu akan sangat membantu biaya studi mahasiswa
                  yang memiliki kendala finansial, peningkatan sumber daya,
                  kualitas pendidik dan pendidikan, serta menunjang fasilitas
                  teknologi pembelajaran.
                </p>
              </div>
            </FadeIn>
            <FadeIn direction="right">
              <Image
                src="https://images.unsplash.com/photo-1771323994415-aba85604d4b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80"
                alt="Dukung STTB"
                width={400}
                height={400}
                className="w-full h-80 object-cover rounded-2xl shadow-xl"
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Prioritas Penggunaan */}
      <section className="py-16 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-5xl mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-10">
              <p className="text-[#E62129] text-sm font-semibold uppercase tracking-wider mb-2">
                Prioritas Penggunaan Donasi
              </p>
              <h2
                className="text-gray-900 dark:text-white"
                style={{ fontWeight: 700, fontSize: "1.75rem" }}
              >
                Kemana Dana Anda Akan Digunakan?
              </h2>
            </div>
          </FadeIn>

          <StaggerGroup
            staggerDelay={0.15}
            className="grid md:grid-cols-3 gap-6"
          >
            {priorities.map((p) => {
              const Icon = p.icon;
              return (
                <StaggerItem key={p.id}>
                  <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-shadow h-full flex flex-col">
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={p.img}
                        alt={p.title}
                        fill
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div
                        className={`absolute bottom-4 left-4 w-10 h-10 rounded-xl ${p.color} flex items-center justify-center`}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-gray-900 dark:text-white font-bold mb-2">
                        {p.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-3 flex-1">
                        {p.desc}
                      </p>
                      <p className="text-gray-500 dark:text-gray-500 text-xs leading-relaxed mb-4">
                        {p.detail}
                      </p>
                      <Link
                        href={p.link}
                        className="inline-flex items-center gap-1 text-sm font-medium hover:underline"
                        style={{ color: p.textColor }}
                      >
                        Selengkapnya <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      {/* Kesediaan Mendukung CTA */}
      <section className="py-14 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-8">
              <p className="text-[#E62129] text-sm font-semibold uppercase tracking-wider mb-2">
                Kesediaan Mendukung
              </p>
              <h2
                className="text-gray-900 dark:text-white mb-4"
                style={{ fontWeight: 700, fontSize: "1.75rem" }}
              >
                Menjadi Rekan Pengembangan Kerajaan Allah
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Dengan segala kerendahan hati, kami mengundang Bapak/Ibu untuk
                menjadi rekan bagi pengembangan Kerajaan Allah dengan
                menginvestasikan pemimpin-pemimpin masa depan yang dapat
                mentransformasi kehidupan dan komunitas.
              </p>
            </div>
          </FadeIn>

          {/* Bank Transfer Card */}
          <FadeIn delay={0.15}>
            <div className="max-w-md mx-auto">
              <div className="bg-gradient-to-br from-[#0A2C74] to-[#0570CD] rounded-2xl p-6 text-white shadow-xl">
                <p className="text-blue-200 text-xs font-semibold uppercase tracking-wider mb-4">
                  Transfer Bank
                </p>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">BCA a\n Surya Sumantri</p>
                    <p className="text-blue-200 text-sm">Yayasan STT Bandung</p>
                  </div>
                </div>
                <div className="bg-white/10 rounded-xl p-4 mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-blue-200 text-xs">Nomor Rekening</p>
                    <p className="text-white font-mono text-xl font-bold tracking-widest">
                      282 300 5555
                    </p>
                  </div>
                  <button
                    onClick={copyAccount}
                    className="w-10 h-10 rounded-lg bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
                    title="Salin nomor rekening"
                  >
                    {copied ? (
                      <CopyCheckIcon className="w-5 h-5 text-green-300" />
                    ) : (
                      <Copy className="w-5 h-5 text-white" />
                    )}
                  </button>
                </div>
                <p className="text-blue-300 text-xs text-center">
                  {copied
                    ? "✓ Nomor rekening disalin!"
                    : "Klik ikon salin untuk menyalin nomor rekening"}
                </p>
                <div className="mt-4 pt-4 border-t border-white/20">
                  <p className="text-blue-200 text-xs">
                    Konfirmasi transfer:{" "}
                    <a
                      href="mailto:keuangan@sttb.ac.id"
                      className="text-white underline underline-offset-2"
                    >
                      keuangan@sttb.ac.id
                    </a>
                  </p>
                </div>
              </div>

              {/* QR Code placeholder */}
              <div className="mt-4 bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-center border border-gray-100 dark:border-gray-700 grid place-items-center space-y-4">
                <Image
                  src={"/qr-code-dukungan.jpeg"}
                  placeholder="empty"
                  alt="QR Code Placeholder"
                  width={360 / 1.2}
                  height={490 / 1.2}
                  className="rounded-lg"
                />
                <p className="text-gray-500 dark:text-gray-400 text-xs">
                  Scan QR Code untuk transfer langsung
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-3xl mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-8">
              <p className="text-[#E62129] text-sm font-semibold uppercase tracking-wider mb-2">
                FAQ
              </p>
              <h2
                className="text-gray-900 dark:text-white"
                style={{ fontWeight: 700, fontSize: "1.5rem" }}
              >
                Pertanyaan Umum
              </h2>
            </div>
          </FadeIn>

          <StaggerGroup staggerDelay={0.08} className="space-y-3">
            {faqs.map((faq) => (
              <StaggerItem key={faq.q}>
                <FAQItem q={faq.q} a={faq.a} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Final CTA */}
      <FadeIn>
        <section className="py-14 bg-[#E62129]">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Heart className="w-12 h-12 text-red-200 mx-auto mb-4" />
            <h2
              className="text-white mb-4"
              style={{
                fontWeight: 700,
                fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
              }}
            >
              Terima Kasih untuk Dukungan Doa & Dana
            </h2>
            <p className="text-red-100 max-w-xl mx-auto leading-relaxed mb-6">
              Bagi STTB, kontribusi Bapak/Ibu sangat penting. Seberapapun
              nilainya akan sangat menolong kehidupan mahasiswa dan STTB.
            </p>
            <Link
              href="/kontak-kami"
              className="inline-block px-7 py-3 rounded-lg bg-white text-[#E62129] font-medium hover:bg-red-50 transition-colors"
            >
              Hubungi Kami
            </Link>
          </div>
        </section>
      </FadeIn>
    </>
  );
}
