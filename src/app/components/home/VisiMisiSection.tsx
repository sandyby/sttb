import React from "react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const pillars = [
  {
    key: "Pastor-Scholar",
    desc: "Jiwa gembala yang melayani, sekaligus intelektual yang terus belajar dan berkontribusi pada dunia ilmu pengetahuan dari perspektif Kristiani.",
    color: "#E62129",
    bg: "bg-red-50 dark:bg-red-950/40",
    border: "border-[#E62129]/30",
  },
  {
    key: "Injil Seutuhnya",
    desc: "Kuasa Injil yang mentransformasi seluruh aspek hidup manusia — di keluarga, gereja, sekolah, dan dunia kerja.",
    color: "#0A2C74",
    bg: "bg-blue-50 dark:bg-blue-950/40",
    border: "border-[#0A2C74]/30",
  },
  {
    key: "Seluruh Umat",
    desc: "Penebusan Kristus nyata melalui hidup setiap pengikut-Nya, bukan hanya mereka yang di seminari.",
    color: "#0570CD",
    bg: "bg-sky-50 dark:bg-sky-950/40",
    border: "border-[#0570CD]/30",
  },
  {
    key: "Masyarakat Urban",
    desc: "Mempersiapkan mahasiswa untuk melayani secara efektif di tengah konteks perkotaan yang kompleks.",
    color: "#E62129",
    bg: "bg-red-50 dark:bg-red-950/40",
    border: "border-[#E62129]/30",
  },
];

const misiList = [
  "Mempersiapkan pastor-scholar yang transformatif untuk melayani dalam konteks urban.",
  "Memberdayakan seluruh umat Allah untuk menghadirkan Injil seutuhnya melalui penelitian dan pendidikan non-formal.",
  "Mengembangkan tim dosen, struktur, keuangan, serta kemitraan untuk mendukung visi STTB.",
];

export function VisiMisiSection() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-[#E62129] text-sm font-semibold uppercase tracking-wider mb-2">
            Tentang STTB
          </p>
          <h2
            className="text-gray-900 dark:text-white mb-4"
            style={{ fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 2.6rem)", lineHeight: 1.2 }}
          >
            Visi & Misi
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Fondasi filosofis yang mengarahkan setiap aspek kehidupan dan pelayanan STTB —
            dari Lausanne Movement: <em className="text-gray-700 dark:text-gray-300">"Seluruh Umat membawa Seluruh Injil ke Seluruh Dunia."</em>
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Visi + Pillars */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Visi quote card */}
            <div className="relative mb-8">
              <div className="absolute -top-3 -left-3 w-16 h-16 rounded-full bg-[#E62129]/10 -z-10" />
              <div className="bg-gradient-to-br from-[#0A2C74] to-[#0570CD] rounded-2xl p-7 text-white shadow-xl">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-px bg-blue-300" />
                  <span className="text-blue-300 text-xs font-semibold uppercase tracking-widest">
                    Visi STTB
                  </span>
                </div>
                <p className="text-blue-50 leading-relaxed text-base md:text-lg italic">
                  "Menjadi institusi pendidikan teologi yang mempersiapkan{" "}
                  <strong className="text-white not-italic">pastor-scholar</strong>{" "}
                  yang transformatif dan memberdayakan seluruh umat Allah untuk
                  menghadirkan Injil seutuhnya di tengah konteks masyarakat urban."
                </p>
              </div>
              <div className="absolute -bottom-3 -right-3 w-20 h-20 rounded-full bg-[#E62129]/8 -z-10" />
            </div>

            {/* 4 Pillars */}
            <div className="grid grid-cols-2 gap-3">
              {pillars.map((p, i) => (
                <motion.div
                  key={p.key}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className={`${p.bg} border ${p.border} rounded-xl p-4`}
                >
                  <span
                    className="text-xs font-bold uppercase tracking-wider block mb-1.5"
                    style={{ color: p.color }}
                  >
                    {p.key}
                  </span>
                  <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                    {p.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Misi + Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Image with overlay label */}
            <div className="relative rounded-2xl overflow-hidden mb-8 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1626025612377-7d5d17362ff9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80"
                alt="Kehidupan kampus STTB"
                className="w-full h-56 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2C74]/80 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white font-bold text-lg leading-tight">
                  Komunitas yang Membentuk & Memperlengkapi
                </p>
                <p className="text-blue-200 text-xs mt-1">
                  Kehidupan kampus residensial STTB, Bandung
                </p>
              </div>
              {/* Year badge */}
              <div className="absolute top-4 right-4 bg-[#E62129] text-white rounded-xl px-3 py-2 text-center shadow-lg">
                <p className="text-xl font-black leading-none">30+</p>
                <p className="text-red-100 text-xs">tahun</p>
              </div>
            </div>

            {/* Misi list */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-0.5 bg-[#E62129]" />
                <span className="text-[#E62129] text-xs font-semibold uppercase tracking-widest">
                  Misi
                </span>
              </div>
              <div className="space-y-3">
                {misiList.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#E62129] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">{i + 1}</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                      {m}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            <Link
              to="/visi-misi"
              className="inline-flex items-center gap-2 text-[#E62129] font-semibold hover:gap-3 transition-all group"
            >
              Baca Selengkapnya{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
