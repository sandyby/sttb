import React, { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { Calendar, Clock, CheckCircle2, Phone, Mail, ArrowRight, FileText, User, Video, Monitor } from "lucide-react";
import { FadeIn, StaggerGroup, StaggerItem } from "../../components/ui/FadeIn";

const waves = [
  {
    id: "I",
    label: "Gelombang I",
    deadline: "13 Oktober 2025",
    status: "closed",
    color: "#E62129",
    tests: { psikotes: "17-18, 20, 27-29 Okt", tertulis: "21 Oktober", wawancara: "20 November" },
    steps: [
      { no: 1, title: "Batas Pengembalian Formulir", when: "Oktober, Senin minggu ketiga", via: "Via pos atau e-mail" },
      { no: 2, title: "Seleksi Dokumen Pendaftaran", when: "Oktober, Selasa minggu ketiga", via: "Onsite" },
      { no: 3, title: "Panggilan Tes", when: "Oktober, Rabu minggu ketiga", via: "Via email & WhatsApp" },
      { no: 4, title: "Psikotes Online Tahap 1 (Pengisian Form)", when: "Oktober, Jumat–Sabtu minggu ketiga", via: "Via website" },
      { no: 5, title: "Psikotes Online Tahap 2 (Tes Bersama)", when: "Oktober, Senin minggu keempat", via: "Via Zoom & website" },
      { no: 6, title: "Tes Tertulis Online (Teologi, Bahasa Indonesia, Bahasa Inggris)", when: "Oktober, Selasa minggu keempat", via: "Via Zoom & website" },
      { no: 7, title: "Psikotes Tahap 3 (Wawancara Psikolog)", when: "Oktober, Senin minggu ketiga", via: "Via Zoom" },
      { no: 8, title: "Wawancara dengan Dosen STTB", when: "November, Senin minggu ketiga", via: "Via Zoom" },
      { no: 9, title: "Pengumuman Hasil Penerimaan", when: "November, Rabu–Jumat minggu keempat", via: "Via e-mail & WhatsApp" },
    ],
  },
  {
    id: "II",
    label: "Gelombang II",
    deadline: "2 Februari 2026",
    status: "closed",
    color: "#0A2C74",
    tests: { psikotes: "6-7, 9, 16-18 Februari", tertulis: "10 Februari", wawancara: "3 Maret" },
    steps: [
      { no: 1, title: "Batas Pengembalian Formulir", when: "Maret, Senin minggu ketiga", via: "Via pos atau e-mail" },
      { no: 2, title: "Seleksi Dokumen Pendaftaran", when: "Maret, Selasa minggu ketiga", via: "Onsite" },
      { no: 3, title: "Panggilan Tes", when: "Maret, Rabu minggu ketiga", via: "Via email & WhatsApp" },
      { no: 4, title: "Psikotes Online Tahap 1 (Pengisian Form)", when: "Maret, Jumat–Sabtu minggu ketiga", via: "Via website" },
      { no: 5, title: "Psikotes Online Tahap 2 (Tes Bersama)", when: "Maret, Senin minggu keempat", via: "Via Zoom & website" },
      { no: 6, title: "Tes Tertulis Online (Teologi, Bahasa Indonesia, Bahasa Inggris)", when: "Maret, Selasa minggu keempat", via: "Via Zoom & website" },
      { no: 7, title: "Psikotes Tahap 3 (Wawancara Psikolog)", when: "April, Senin–Kamis minggu pertama", via: "Via Zoom" },
      { no: 8, title: "Wawancara dengan Dosen STTB", when: "April, Senin minggu ketiga", via: "Via Zoom" },
      { no: 9, title: "Pengumuman Hasil Penerimaan", when: "April, Rabu–Jumat minggu keempat", via: "Via e-mail & WhatsApp" },
    ],
  },
  {
    id: "III",
    label: "Gelombang III",
    deadline: "27 April 2026",
    status: "upcoming",
    color: "#0570CD",
    tests: { psikotes: "1-2, 4, 11-12 Mei", tertulis: "5 Mei", wawancara: "26 & 28 Mei" },
    steps: [
      { no: 1, title: "Batas Pengembalian Formulir", when: "Mei, Senin minggu ketiga", via: "Via pos atau e-mail" },
      { no: 2, title: "Seleksi Dokumen Pendaftaran", when: "Mei, Selasa minggu ketiga", via: "Onsite" },
      { no: 3, title: "Panggilan Tes", when: "Mei, Rabu minggu ketiga", via: "Via email & WhatsApp" },
      { no: 4, title: "Psikotes Online Tahap 1 (Pengisian Form)", when: "Mei, Jumat–Sabtu minggu ketiga", via: "Via website" },
      { no: 5, title: "Psikotes Online Tahap 2 (Tes Bersama)", when: "Mei, Senin minggu keempat", via: "Via Zoom & website" },
      { no: 6, title: "Tes Tertulis Online (Teologi, Bahasa Indonesia, Bahasa Inggris)", when: "Mei, Selasa minggu keempat", via: "Via Zoom & website" },
      { no: 7, title: "Psikotes Tahap 3 (Wawancara Psikolog)", when: "Juni, Senin–Kamis minggu pertama", via: "Via Zoom" },
      { no: 8, title: "Wawancara dengan Dosen STTB", when: "Juni, Senin minggu ketiga", via: "Via Zoom" },
      { no: 9, title: "Pengumuman Hasil Penerimaan", when: "Juni, Rabu–Jumat minggu keempat", via: "Via e-mail & WhatsApp" },
    ],
  },
];

const methodIcons: Record<string, React.ElementType> = {
  "Via Zoom & website": Video,
  "Via Zoom": Video,
  "Via website": Monitor,
  "Via email & WhatsApp": Mail,
  "Via pos atau e-mail": Mail,
  "Onsite": User,
  "Via e-mail & WhatsApp": Mail,
};

export function JadwalAdmisiPage() {
  const [activeWave, setActiveWave] = useState("III");

  const wave = waves.find((w) => w.id === activeWave)!;

  return (
    <>
      {/* Hero */}
      <div className="pt-28 pb-20 bg-gradient-to-br from-[#0A2C74] to-[#0570CD] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <div className="absolute top-1/2 right-10 w-72 h-72 rounded-full border-8 border-white" style={{ transform: "translateY(-50%)" }} />
          <div className="absolute top-1/2 right-10 w-40 h-40 rounded-full border-4 border-white" style={{ transform: "translateY(-50%) translateX(16px)" }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-px bg-[#E62129]" />
              <span className="text-[#E62129] text-xs font-semibold uppercase tracking-widest">Admisi</span>
            </div>
            <h1 className="text-white mb-4" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 800 }}>
              Jadwal Pendaftaran Mahasiswa Baru
            </h1>
            <p className="text-blue-200 max-w-2xl leading-relaxed">
              Pendaftaran Tahun Akademik 2026–2027. Tersedia 3 gelombang pendaftaran dengan jadwal tes yang telah ditentukan.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Wave overview cards */}
      <section className="py-10 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4">
          <StaggerGroup staggerDelay={0.12} className="grid md:grid-cols-3 gap-5">
            {waves.map((w) => (
              <StaggerItem key={w.id}>
                <button
                  onClick={() => setActiveWave(w.id)}
                  className={`w-full text-left rounded-xl border-2 p-5 transition-all hover:shadow-md ${
                    activeWave === w.id
                      ? "border-current shadow-lg"
                      : "border-gray-100 dark:border-gray-800"
                  }`}
                  style={activeWave === w.id ? { borderColor: w.color } : {}}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: `${w.color}15`, color: w.color }}
                    >
                      {w.label}
                    </span>
                    {w.status === "upcoming" && (
                      <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full">
                        Terbuka
                      </span>
                    )}
                    {w.status === "closed" && (
                      <span className="text-xs font-medium text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                        Tutup
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-xs mb-1">Batas pendaftaran</p>
                  <p className="text-gray-900 dark:text-white font-bold">{w.deadline}</p>
                  <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 space-y-1">
                    <p className="text-gray-500 dark:text-gray-400 text-xs">Psikotes: {w.tests.psikotes}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">Tertulis: {w.tests.tertulis}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">Wawancara: {w.tests.wawancara}</p>
                  </div>
                </button>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Detailed steps */}
      <section className="py-10 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4">
          <FadeIn>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: wave.color }}>
                {wave.id}
              </div>
              <h2 className="text-gray-900 dark:text-white font-bold text-lg">
                Aktivitas Penerimaan — {wave.label}
              </h2>
            </div>
          </FadeIn>

          <div className="relative">
            <div
              className="absolute left-[19px] top-3 bottom-3 w-0.5"
              style={{ background: `linear-gradient(to bottom, ${wave.color}, ${wave.color}40)` }}
            />
            <StaggerGroup staggerDelay={0.07} className="space-y-3">
              {wave.steps.map((step) => {
                const MethodIcon = methodIcons[step.via] || FileText;
                return (
                  <StaggerItem key={step.no}>
                    <div className="flex gap-4">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 z-10 relative shadow-md"
                        style={{ backgroundColor: wave.color }}
                      >
                        {step.no}
                      </div>
                      <div className="flex-1 bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-100 dark:border-gray-800 hover:shadow-sm transition-shadow">
                        <h3 className="text-gray-900 dark:text-white font-semibold text-sm mb-1">{step.title}</h3>
                        <div className="flex flex-wrap gap-3">
                          <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-xs">
                            <Clock className="w-3 h-3" /> {step.when}
                          </span>
                          <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-xs">
                            <MethodIcon className="w-3 h-3" /> {step.via}
                          </span>
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerGroup>
          </div>

          {/* Notes */}
          <FadeIn delay={0.3}>
            <div className="mt-8 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-xl p-5">
              <h3 className="text-amber-800 dark:text-amber-300 font-semibold text-sm mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Catatan Penting
              </h3>
              <ul className="space-y-2">
                {[
                  "Tanggal penutupan pendaftaran tiap gelombang adalah batas akhir di mana semua berkas pendaftaran sudah diterima oleh pihak Admisi STTB.",
                  "Pendaftar yang berkasnya tidak lolos seleksi dokumen tidak akan dipanggil untuk ikut tes.",
                  "Tanggal tes dan berbagai aktivitas admisi lainnya akan dikonfirmasi kembali dalam surat panggilan tes dan grup WhatsApp peserta.",
                ].map((note, i) => (
                  <li key={i} className="flex items-start gap-2 text-amber-700 dark:text-amber-400 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0 mt-1" />
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Contact + CTA */}
      <section className="py-14 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            <FadeIn direction="left">
              <div className="bg-[#0A2C74] rounded-2xl p-6 text-white">
                <h3 className="font-bold text-lg mb-4">Bantuan Informasi & Pengembalian Berkas</h3>
                <div className="space-y-3">
                  <a href="tel:081573360009" className="flex items-center gap-3 hover:text-blue-200 transition-colors">
                    <Phone className="w-4 h-4 text-blue-300" />
                    <span>0815 7336 0009</span>
                  </a>
                  <a href="mailto:admisi@sttb.ac.id" className="flex items-center gap-3 hover:text-blue-200 transition-colors">
                    <Mail className="w-4 h-4 text-blue-300" />
                    <span>admisi@sttb.ac.id</span>
                  </a>
                  <a href="mailto:beasiswa@sttb.ac.id" className="flex items-center gap-3 hover:text-blue-200 transition-colors">
                    <Mail className="w-4 h-4 text-blue-300" />
                    <span>beasiswa@sttb.ac.id</span>
                    <span className="text-blue-300 text-xs">(Info Beasiswa)</span>
                  </a>
                </div>
              </div>
            </FadeIn>
            <FadeIn direction="right">
              <div className="bg-[#E62129] rounded-2xl p-6 text-white">
                <h3 className="font-bold text-lg mb-4">Pendaftaran Mahasiswa Baru 2026–2027</h3>
                <p className="text-red-100 text-sm mb-5 leading-relaxed">
                  Daftarkan diri Anda sekarang melalui sistem pendaftaran online resmi STTB.
                </p>
                <div className="flex flex-col gap-3">
                  <a
                    href="http://sis.sttb.ac.id/pmb/formulir-pendaftaran.html"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-white text-[#E62129] font-semibold text-sm hover:bg-red-50 transition-colors"
                  >
                    Daftar Online <ArrowRight className="w-4 h-4" />
                  </a>
                  <Link
                    to="/beasiswa"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
                  >
                    Info Beasiswa
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
