import React from "react";
import { Link } from "react-router";
import { ArrowRight, Heart, BookOpen } from "lucide-react";
import { motion } from "motion/react";

export function CTASection() {
  return (
    <section className="py-20 bg-[#0A2C74] dark:bg-[#061840] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#E62129]/10" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-[#0570CD]/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/3" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Admisi CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E62129]/20 text-[#7FB4E5] text-xs font-medium mb-4 border border-[#E62129]/30">
              <BookOpen className="w-3.5 h-3.5" />
              Penerimaan Mahasiswa Baru 2026/2027
            </div>
            <h2
              className="text-white mb-4"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, lineHeight: 1.3 }}
            >
              Siap Menjawab Panggilan Tuhan?
            </h2>
            <p className="text-blue-100 mb-6 leading-relaxed">
              Bergabunglah dengan STTB dan mulailah perjalanan akademis teologi
              yang akan membentuk Anda menjadi pemimpin rohani yang berdampak.
              Pendaftaran dibuka untuk program S1 dan S2.
            </p>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <Link
                to="/prosedur-admisi"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#E62129] hover:bg-[#c4131a] text-white font-medium transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                Daftar Sekarang <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/biaya-studi"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium border border-white/20 transition-all hover:-translate-y-0.5"
              >
                Lihat Biaya Studi
              </Link>
            </div>
            <p className="mt-4 text-blue-200 text-sm">
              Tersedia beasiswa bagi calon mahasiswa berprestasi →{" "}
              <Link to="/beasiswa" className="text-white underline hover:no-underline">
                Info Beasiswa
              </Link>
            </p>
          </motion.div>

          {/* Right: Donate CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
              <div className="w-14 h-14 rounded-2xl bg-[#E62129] flex items-center justify-center mb-5">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <h3
                className="text-white mb-3"
                style={{ fontSize: "1.25rem", fontWeight: 700 }}
              >
                Dukung Misi STTB
              </h3>
              <p className="text-blue-100 mb-5 leading-relaxed">
                Setiap kontribusi Anda membantu STTB mencetak lebih banyak
                hamba Tuhan yang akan melayani gereja-gereja di seluruh
                Indonesia dan dunia.
              </p>
              <ul className="space-y-2.5 mb-6">
                {[
                  "Dana Beasiswa bagi mahasiswa kurang mampu",
                  "Pengembangan fasilitas & perpustakaan",
                  "Program penelitian teologi",
                  "Pelayanan misi & pengabdian masyarakat",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-blue-50">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E62129] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/dukung-sttb"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white text-[#0A2C74] font-semibold hover:bg-blue-50 transition-all hover:-translate-y-0.5"
              >
                <Heart className="w-4 h-4 text-[#E62129]" />
                Dukung STTB Sekarang
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}