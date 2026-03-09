import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Award, CheckCircle2, AlertTriangle, ChevronDown, ChevronUp, Download, Mail } from "lucide-react";
import { FadeIn, StaggerGroup, StaggerItem } from "../../components/ui/FadeIn";

const scholarships = [
  {
    id: "pastor-scholar",
    level: "S1",
    name: "Beasiswa Pastor Scholar",
    color: "#E62129",
    bg: "bg-red-50 dark:bg-red-900/20",
    img: "https://images.unsplash.com/photo-1757143137392-0b1e1a27a7de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    desc: "Beasiswa bergengsi untuk mahasiswa S1 terpilih yang menjadikan STTB sebagai pilihan pertama dan memiliki prestasi akademik menonjol.",
    requirements: [
      "Diperuntukkan bagi mahasiswa S1 yang menjadikan STTB sebagai pilihan pertama",
      "Beasiswa meliputi biaya pendidikan dari semester 1",
      "Memiliki prestasi menonjol di SMA (rata-rata rapor minimal 8.0)",
      "Memiliki panggilan yang jelas",
      "Memiliki rekomendasi yang kuat",
      "Minimal IPK 2.75 pada semester 1 dan minimal IPK 3.0 pada semester 2–4",
      "Bersedia mengalokasikan waktu 15 jam/bulan untuk membantu kegiatan administrasi/akademik di STTB",
      "Kelanjutan beasiswa akan dievaluasi per semester",
      "Bersedia memenuhi ikatan dinas 0.5 N (setara 2 tahun) setelah lulus",
    ],
  },
  {
    id: "formatio",
    level: "S1",
    name: "Beasiswa Formatio",
    color: "#0A2C74",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    img: "https://images.unsplash.com/photo-1722962674485-d34e69a9a406?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    desc: "Beasiswa untuk mahasiswa S1 aktif yang telah memasuki tahun kedua studi dan menunjukkan prestasi akademik yang baik.",
    requirements: [
      "Beasiswa meliputi biaya pendidikan S1 dari tahun kedua atau telah menempuh semester 2",
      "Memiliki prestasi belajar yang baik serta lolos seleksi dan wawancara",
      "Kelanjutan beasiswa akan dievaluasi per semester",
      "Bersedia menyediakan waktu 15 jam/bulan untuk membantu kegiatan administrasi/akademik di STTB",
      "Bersedia memenuhi ikatan dinas 0.5 N",
    ],
  },
  {
    id: "transformative-leadership",
    level: "S1 – S2",
    name: "Beasiswa Transformative Leadership",
    color: "#0570CD",
    bg: "bg-sky-50 dark:bg-sky-900/20",
    img: "https://images.unsplash.com/photo-1607332796965-436d1bf61731?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    desc: "Beasiswa untuk mahasiswa S2 dengan prestasi akademik dan non-akademik menonjol yang berkomitmen dalam pelayanan.",
    requirements: [
      "Diperuntukkan bagi mahasiswa S2 dengan prestasi akademik maupun non-akademik yang menonjol",
      "Memiliki integritas dan panggilan yang jelas",
      "Meliputi maksimal 50% dari total biaya pendidikan",
      "Memberikan surat keterangan pelayanan minimal 10 jam di lembaga pelayanan atau domisili setempat",
      "Bersedia menjadi bagian kepanitiaan event STTB dan bersedia menjadi ketua & koordinator kelas",
      "Tidak diberlakukan ikatan dinas",
    ],
  },
];

const faqs = [
  { q: "Apakah STTB menyediakan beasiswa bagi mahasiswa?", a: "Ya, STTB menyediakan beasiswa bagi mahasiswa S1 dan S2." },
  { q: "Apa saja jenis beasiswa yang STTB tawarkan?", a: "Ada 3 jenis beasiswa: Pastor Scholar, Formatio, dan Transformative Leadership. Mahasiswa dapat mengajukan sesuai kriteria yang ditentukan." },
  { q: "Siapa saja yang bisa mendapatkan beasiswa?", a: "Secara umum yaitu mahasiswa aktif penuh waktu yang memenuhi syarat dan lolos proses seleksi." },
  { q: "Bagaimana cara saya mendaftar aplikasi beasiswa?", a: "Pendaftaran beasiswa dilakukan dengan mengunduh form aplikasi beasiswa yang disediakan serta melampirkan syarat-syarat yang ditentukan. Form beasiswa dapat diunduh di www.sttb.ac.id." },
  { q: "Kapan saya bisa mengirim aplikasi beasiswa?", a: "Aplikasi beasiswa dapat dikirimkan setiap saat selambat-lambatnya 3 minggu sebelum proses pendaftaran periode ditutup." },
  { q: "Apakah saya bisa kehilangan beasiswa selama masa studi?", a: "Bisa, jika hasil evaluasi setiap semester tidak mendukung, maka beasiswa akan dihentikan." },
  { q: "Jika tidak lolos seleksi, apakah bisa mengajukan lagi?", a: "Ya, jika mahasiswa yang pernah mengajukan beasiswa namun tidak berhasil, masih dapat mengajukan di periode berikutnya." },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        <span className="text-gray-900 dark:text-white font-medium text-sm pr-4">{q}</span>
        {open ? <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />}
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
            <p className="px-4 py-3 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function BeasiswaPage() {
  return (
    <>
      {/* Hero */}
      <div className="pt-28 pb-20 bg-gradient-to-br from-[#0A2C74] to-[#0570CD] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-px bg-[#E62129]" />
              <span className="text-[#E62129] text-xs font-semibold uppercase tracking-widest">Keuangan</span>
            </div>
            <h1 className="text-white mb-4" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 800 }}>
              Beasiswa STTB
            </h1>
            <p className="text-blue-200 max-w-2xl leading-relaxed">
              STTB menyediakan 3 kategori beasiswa bagi mereka yang membutuhkan sesuai kriteria dan persyaratan yang berlaku — Pastor Scholar, Formatio, dan Transformative Leadership.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Scholarships */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-10">
              <p className="text-[#E62129] text-sm font-semibold uppercase tracking-wider mb-2">3 Jenis Beasiswa</p>
              <h2 className="text-gray-900 dark:text-white" style={{ fontWeight: 700, fontSize: "1.75rem" }}>
                Pilih Beasiswa yang Sesuai
              </h2>
            </div>
          </FadeIn>

          <StaggerGroup staggerDelay={0.15} className="space-y-6">
            {scholarships.map((s) => (
              <StaggerItem key={s.id}>
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="grid md:grid-cols-5">
                    <div className="md:col-span-2 relative h-48 md:h-auto">
                      <img src={s.img} alt={s.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
                      <div className="absolute top-4 left-4">
                        <span
                          className="px-3 py-1.5 rounded-full text-white text-xs font-bold"
                          style={{ backgroundColor: s.color }}
                        >
                          {s.level}
                        </span>
                      </div>
                    </div>
                    <div className="md:col-span-3 p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Award className="w-5 h-5" style={{ color: s.color }} />
                        <h3 className="text-gray-900 dark:text-white font-bold text-lg" style={{ color: s.color }}>
                          {s.name}
                        </h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">{s.desc}</p>
                      <div className="space-y-1.5">
                        {s.requirements.map((r, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: s.color }} />
                            <span className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">{r}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Terms */}
      <section className="py-14 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            <FadeIn direction="left">
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-6">
                <h3 className="text-gray-900 dark:text-white font-bold mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#E62129]" />
                  Syarat & Ketentuan Umum
                </h3>
                <ul className="space-y-2.5">
                  {[
                    "Mengisi formulir beasiswa dan melengkapi dokumen penunjang sesuai jadwal",
                    "Memenuhi kriteria beasiswa dan mengikuti proses seleksi & wawancara",
                    "Mengikuti evaluasi semester yang diadakan oleh unit beasiswa",
                    "Memiliki prestasi akademik yang baik (IPK minimal 3.0 untuk mahasiswa aktif)",
                    "Bersedia memenuhi ikatan dinas (pada jenis beasiswa yang mewajibkan)",
                  ].map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-gray-400 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#E62129] flex-shrink-0 mt-2" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
            <FadeIn direction="right">
              <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
                <h3 className="text-amber-800 dark:text-amber-300 font-bold mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Sanksi Penerima Beasiswa
                </h3>
                <p className="text-amber-700 dark:text-amber-400 text-sm leading-relaxed mb-3">
                  Bagi penerima beasiswa yang melanggar ketentuan dan peraturan STTB serta mendapatkan Surat Peringatan:
                </p>
                <ul className="space-y-2">
                  {[
                    "Dana beasiswa akan diberhentikan pada semester berjalan",
                    "Penerima wajib mengembalikan seluruh dukungan beasiswa yang telah diterima",
                    "Penerima beasiswa akan diskorsing selama 1 semester",
                    "IPK semester I minimal 2.75, semester II minimal 3.0 — jika tidak terpenuhi beasiswa dihentikan",
                  ].map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-amber-700 dark:text-amber-400 text-xs">
                      <span className="flex-shrink-0 font-bold">{i + 1}.</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 bg-white dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-8">
              <p className="text-[#E62129] text-sm font-semibold uppercase tracking-wider mb-2">FAQ</p>
              <h2 className="text-gray-900 dark:text-white" style={{ fontWeight: 700, fontSize: "1.5rem" }}>
                Pertanyaan Seputar Beasiswa
              </h2>
            </div>
          </FadeIn>
          <StaggerGroup staggerDelay={0.08} className="space-y-3 mb-10">
            {faqs.map((f) => (
              <StaggerItem key={f.q}><FAQItem q={f.q} a={f.a} /></StaggerItem>
            ))}
          </StaggerGroup>

          {/* Download form */}
          <FadeIn delay={0.2}>
            <div className="bg-[#0A2C74] rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-2">Formulir Pengajuan Beasiswa</h3>
              <p className="text-blue-200 text-sm mb-5 leading-relaxed">
                Pemohon dapat mengunduh form aplikasi beasiswa, melengkapinya, dan mengirim melalui email ke{" "}
                <a href="mailto:beasiswa@sttb.ac.id" className="text-white underline">beasiswa@sttb.ac.id</a>.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://sttb.ac.id/storage/2026/01/Form-Aplikasi-Beasiswa-Baru-S1.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#E62129] hover:bg-[#c4131a] text-white font-semibold text-sm transition-colors"
                >
                  <Download className="w-4 h-4" /> Unduh Formulir S1
                </a>
                <a
                  href="https://sttb.ac.id/storage/2026/01/Form-Aplikasi-Beasiswa-Baru-S2.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/20 hover:bg-white/30 text-white font-semibold text-sm transition-colors"
                >
                  <Download className="w-4 h-4" /> Unduh Formulir S2
                </a>
                <a
                  href="mailto:beasiswa@sttb.ac.id"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-blue-400 text-blue-200 hover:bg-white/10 font-semibold text-sm transition-colors"
                >
                  <Mail className="w-4 h-4" /> beasiswa@sttb.ac.id
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
