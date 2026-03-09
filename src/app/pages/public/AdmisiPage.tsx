import React from "react";
import { Link } from "react-router";
import { CheckCircle, Calendar, FileText, Users, Phone, Mail, ArrowRight, BookOpen } from "lucide-react";

const steps = [
  {
    step: 1,
    title: "Registrasi Online",
    desc: "Isi formulir pendaftaran online melalui portal admisi STTB. Siapkan data diri, informasi gereja asal, dan pernyataan motivasi.",
    icon: FileText,
  },
  {
    step: 2,
    title: "Pengumpulan Berkas",
    desc: "Kirimkan berkas persyaratan yang diperlukan ke kantor STTB atau upload melalui portal. Berkas harus lengkap dan valid.",
    icon: BookOpen,
  },
  {
    step: 3,
    title: "Tes & Wawancara",
    desc: "Ikuti tes kemampuan akademik dan wawancara pastoral. Tes dapat dilakukan secara online atau offline.",
    icon: Users,
  },
  {
    step: 4,
    title: "Pengumuman & Registrasi",
    desc: "Cek pengumuman hasil seleksi. Jika diterima, lakukan registrasi ulang dan pembayaran biaya pendidikan.",
    icon: CheckCircle,
  },
];

const requirements = {
  s1: [
    "Fotokopi ijazah SMA/sederajat yang telah dilegalisir",
    "Fotokopi raport kelas XII semester 1 & 2",
    "Surat rekomendasi dari pendeta/gembala gereja setempat",
    "Surat keterangan sehat dari dokter",
    "Pas foto terbaru 3×4 sebanyak 4 lembar",
    "Fotokopi KTP/kartu identitas",
    "Pernyataan motivasi (statement of faith & calling)",
    "Surat pernyataan kesediaan mengikuti tata tertib STTB",
  ],
  s2: [
    "Fotokopi ijazah S1 teologi atau bidang terkait yang dilegalisir",
    "Transkrip nilai dengan IPK minimal 2.75",
    "Surat rekomendasi dari dua tokoh gereja atau akademisi",
    "Proposal penelitian atau rencana studi",
    "Curriculum vitae lengkap dengan pengalaman pelayanan",
    "Surat keterangan sehat",
    "Pas foto terbaru 3×4 sebanyak 4 lembar",
    "Pernyataan motivasi studi lanjut",
  ],
};

const schedule = [
  { period: "Gelombang I", reg: "1 Maret – 30 April 2025", test: "10 Mei 2025", announce: "20 Mei 2025" },
  { period: "Gelombang II", reg: "1 Mei – 30 Juni 2025", test: "12 Juli 2025", announce: "22 Juli 2025" },
  { period: "Gelombang III", reg: "1 Juli – 15 Agustus 2025", test: "25 Agustus 2025", announce: "1 September 2025" },
];

export function AdmisiPage() {
  return (
    <>
      {/* Hero */}
      <div className="pt-28 pb-16 bg-gradient-to-r from-[#0A2C74] to-[#0570CD]">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-[#7FB4E5] text-sm font-medium uppercase tracking-wider mb-2">
            Penerimaan Mahasiswa Baru
          </p>
          <h1
            className="text-white mb-3"
            style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 700 }}
          >
            Prosedur Admisi
          </h1>
          <p className="text-blue-200 max-w-2xl">
            Panduan lengkap pendaftaran mahasiswa baru Sekolah Tinggi Teologi
            Bandung Tahun Akademik 2025/2026.
          </p>
        </div>
      </div>

      {/* Steps */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#E62129] text-sm font-semibold uppercase tracking-wider mb-2">
              Langkah Pendaftaran
            </p>
            <h2 className="text-gray-900 dark:text-white" style={{ fontWeight: 700, fontSize: "1.75rem" }}>
              Cara Mendaftar ke STTB
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.step} className="relative">
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-[#E62129] to-gray-200 dark:to-gray-700 -translate-y-1/2 z-0" />
                  )}
                  <div className="relative z-10 flex flex-col items-center text-center p-5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                    <div className="w-14 h-14 rounded-full bg-[#E62129] flex items-center justify-center mb-4 relative">
                      <Icon className="w-6 h-6 text-white" />
                      <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#0A2C74] text-white text-xs flex items-center justify-center font-bold">
                        {s.step}
                      </span>
                    </div>
                    <h3 className="text-gray-900 dark:text-white font-semibold mb-2">{s.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <a
              href="https://admisi.sttb.ac.id"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-[#E62129] hover:bg-[#c4131a] text-white font-medium transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              Mulai Pendaftaran Online <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#E62129] text-sm font-semibold uppercase tracking-wider mb-2">
              Berkas Persyaratan
            </p>
            <h2 className="text-gray-900 dark:text-white" style={{ fontWeight: 700, fontSize: "1.75rem" }}>
              Dokumen yang Diperlukan
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* S1 */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#E62129] flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S1</span>
                </div>
                <div>
                  <h3 className="text-gray-900 dark:text-white font-bold">Program Sarjana</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">S.Th. & S.Pd.K.</p>
                </div>
              </div>
              <ul className="space-y-2.5">
                {requirements.s1.map((req, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#E62129] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* S2 */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#0A2C74] flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S2</span>
                </div>
                <div>
                  <h3 className="text-gray-900 dark:text-white font-bold">Program Magister</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">M.Th. & M.Min.</p>
                </div>
              </div>
              <ul className="space-y-2.5">
                {requirements.s2.map((req, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#0A2C74] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-[#E62129] text-sm font-semibold uppercase tracking-wider mb-2">
              Jadwal Penerimaan
            </p>
            <h2 className="text-gray-900 dark:text-white" style={{ fontWeight: 700, fontSize: "1.75rem" }}>
              Jadwal Admisi 2025/2026
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-900 dark:text-white font-semibold text-sm">Gelombang</th>
                  <th className="text-left py-3 px-4 text-gray-900 dark:text-white font-semibold text-sm">Periode Pendaftaran</th>
                  <th className="text-left py-3 px-4 text-gray-900 dark:text-white font-semibold text-sm">Jadwal Tes</th>
                  <th className="text-left py-3 px-4 text-gray-900 dark:text-white font-semibold text-sm">Pengumuman</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((s, i) => (
                  <tr key={i} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-1 rounded-md bg-[#E62129]/10 text-[#E62129] text-xs font-bold">
                        {s.period}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-gray-700 dark:text-gray-300 text-sm">
                      <Calendar className="w-3.5 h-3.5 inline mr-1.5 text-[#E62129]" />
                      {s.reg}
                    </td>
                    <td className="py-3.5 px-4 text-gray-700 dark:text-gray-300 text-sm">{s.test}</td>
                    <td className="py-3.5 px-4 text-gray-700 dark:text-gray-300 text-sm">{s.announce}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Contact */}
          <div className="mt-10 p-6 bg-[#0A2C74] rounded-2xl text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-bold mb-1">Butuh Bantuan?</h3>
              <p className="text-blue-200 text-sm">
                Tim admisi kami siap membantu Anda selama proses pendaftaran.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="tel:+62222012010"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm border border-white/20 transition-colors"
              >
                <Phone className="w-4 h-4" /> (022) 201-2010
              </a>
              <a
                href="mailto:admisi@sttb.ac.id"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#E62129] hover:bg-[#c4131a] text-white text-sm transition-colors"
              >
                <Mail className="w-4 h-4" /> admisi@sttb.ac.id
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
