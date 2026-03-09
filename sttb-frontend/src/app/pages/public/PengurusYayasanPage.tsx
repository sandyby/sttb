import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { Shield, Star, Users, ChevronDown } from "lucide-react";

/* ─── DATA ───────────────────────────────────────────────── */

const dewanPembina = [
  {
    name: "Pdt. Agus Gunawan, Ph.D.",
    role: "Dewan Pembina",
    desc: "Hamba Tuhan senior yang mendedikasikan hidupnya dalam pelayanan gereja dan pendidikan teologi.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300&q=80",
  },
  {
    name: "Pnt. Subianto Tjandra",
    role: "Dewan Pembina",
    desc: "Pemimpin Kristen berpengalaman dalam bidang bisnis dan pelayanan gerejawi.",
    img: "https://images.unsplash.com/photo-1552058544-f2b08422138a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300&q=80",
  },
  {
    name: "Pdt. Budiyanto Santosa, D.Min.",
    role: "Dewan Pembina",
    desc: "Gembala senior yang aktif dalam pembinaan pemimpin gereja di Indonesia.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300&q=80",
  },
];

const dewanPengurus = [
  {
    name: "Pnts. Benny Soenarjo",
    role: "Ketua",
    color: "#E62129",
    accentBg: "from-[#E62129] to-[#c4131a]",
    img: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300&q=80",
    order: 1,
  },
  {
    name: "Pnts. Ginawan Chondro",
    role: "Wakil Ketua",
    color: "#0A2C74",
    accentBg: "from-[#0A2C74] to-[#0570CD]",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300&q=80",
    order: 2,
  },
  {
    name: "Pnt. Arif Subagyo",
    role: "Sekretaris",
    color: "#0570CD",
    accentBg: "from-[#0570CD] to-[#0A2C74]",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300&q=80",
    order: 3,
  },
  {
    name: "Pnt. Widianto Tjandradipura",
    role: "Bendahara",
    color: "#E62129",
    accentBg: "from-[#E62129] to-[#E67B21]",
    img: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300&q=80",
    order: 4,
  },
];

const anggota = [
  "Pnts. Agus Tjandra",
  "Ev. Doroti Tunggal Widjaja, M.Th.",
  "Bp. Eddy Samuel Affendie",
  "Pnts. Edi Sukamto Josana",
  "Bp. Herjanto Gunawan",
  "Pnts. Joseph Koshan",
  "Pnt. Suwito Kwee",
];

/* ─── PEMBINA CARD ───────────────────────────────────────── */

function PembinaCard({ p, index }: { p: typeof dewanPembina[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group relative text-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Connection line down to pengurus section (decorative) */}
      <div className="relative">
        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          animate={{
            background: hovered
              ? "linear-gradient(135deg, rgba(230,33,41,0.15), rgba(10,44,116,0.10))"
              : "transparent",
          }}
          transition={{ duration: 0.4 }}
        />

        <div className="relative p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-500">
          {/* Shield badge */}
          <div className="absolute top-4 right-4">
            <div className="w-7 h-7 rounded-lg bg-[#E62129]/10 flex items-center justify-center">
              <Shield className="w-3.5 h-3.5 text-[#E62129]" />
            </div>
          </div>

          {/* Avatar */}
          <div className="relative w-24 h-24 mx-auto mb-4">
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ border: "2px solid rgba(230,33,41,0.2)" }}
              animate={{ scale: hovered ? [1, 1.12, 1] : 1 }}
              transition={{ duration: 1.5, repeat: hovered ? Infinity : 0 }}
            />
            <div className="w-full h-full rounded-full overflow-hidden ring-2 ring-[#E62129]/20 group-hover:ring-[#E62129]/50 transition-all shadow-md">
              <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
          </div>

          <h3 className="text-gray-900 dark:text-white font-bold text-sm leading-snug">{p.name}</h3>
          <p className="text-[#E62129] text-xs font-semibold mt-1 mb-2">{p.role}</p>

          <AnimatePresence>
            {hovered && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed overflow-hidden"
              >
                {p.desc}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── PENGURUS CARD ──────────────────────────────────────── */

function PengurusCard({ p, index }: { p: typeof dewanPengurus[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.12, duration: 0.7, type: "spring", stiffness: 120 }}
      className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
      whileHover={{ y: -6 }}
    >
      {/* Gradient bg */}
      <div className={`absolute inset-0 bg-gradient-to-br ${p.accentBg} opacity-100`} />
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 30% 20%, white 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

      {/* Order number — big background */}
      <div
        className="absolute top-0 right-0 font-black text-white/10 pointer-events-none select-none"
        style={{ fontSize: "6rem", lineHeight: 0.8, transform: "translate(10%, -10%)" }}
      >
        {p.order}
      </div>

      <div className="relative p-6 text-center">
        {/* Role chip */}
        <div className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-wide">
          {p.role}
        </div>

        {/* Avatar */}
        <div className="relative w-20 h-20 mx-auto mb-4">
          <div className="w-full h-full rounded-full overflow-hidden ring-4 ring-white/30 group-hover:ring-white/60 transition-all shadow-xl">
            <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          </div>
        </div>

        <h3 className="text-white font-bold leading-snug text-sm">{p.name}</h3>
      </div>
    </motion.div>
  );
}

/* ─── PAGE ────────────────────────────────────────────────── */

export function PengurusYayasanPage() {
  const anggotaRef = useRef(null);
  const anggotaInView = useInView(anggotaRef, { once: true });
  const [expandAnggota, setExpandAnggota] = useState(false);

  const visibleAnggota = expandAnggota ? anggota : anggota.slice(0, 4);

  return (
    <>
      {/* Hero */}
      <div className="relative pt-28 pb-24 min-h-[420px] flex items-center overflow-hidden" style={{ background: "linear-gradient(135deg, #060C1A 0%, #0A2C74 70%, #0570CD 100%)" }}>
        {/* Grid */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        {/* Animated rings */}
        {[180, 300, 420].map((size, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-white/5 pointer-events-none"
            style={{ width: size, height: size, right: "-5%", top: "50%", transform: "translateY(-50%)" }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20 + i * 8, repeat: Infinity, ease: "linear" }}
          />
        ))}

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-2 mb-5">
              <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="w-8 h-px bg-[#E62129] origin-left" />
              <span className="text-[#E62129] text-xs font-semibold uppercase tracking-widest">Tentang STTB</span>
            </div>
            <h1 className="text-white mb-4" style={{ fontWeight: 800, lineHeight: 1.05, fontSize: "clamp(2.2rem, 5vw, 3.5rem)" }}>
              Pengurus Yayasan
            </h1>
            <p className="text-blue-200/70 max-w-xl leading-relaxed">
              Yayasan Sekolah Tinggi Teologi Bandung dipimpin oleh para hamba Tuhan dan pemimpin Kristen yang berkomitmen pada visi pendidikan teologi yang berkualitas.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Org structure visual */}
      <section className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
        {/* Background YAYASAN */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden>
          <span className="text-gray-100 dark:text-gray-800 font-black" style={{ fontSize: "clamp(5rem, 18vw, 14rem)", lineHeight: 1, opacity: 0.5 }}>
            YAYASAN
          </span>
        </div>

        <div className="max-w-5xl mx-auto px-4 relative">
          {/* Dewan Pembina */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-14"
          >
            <div className="flex items-center justify-center gap-3 mb-10">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#E62129]/30" />
              <div className="flex items-center gap-2.5 bg-[#E62129]/10 px-5 py-2 rounded-full">
                <Shield className="w-4 h-4 text-[#E62129]" />
                <span className="text-[#E62129] font-bold text-sm uppercase tracking-wider">Dewan Pembina</span>
              </div>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#E62129]/30" />
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              {dewanPembina.map((p, i) => (
                <PembinaCard key={p.name} p={p} index={i} />
              ))}
            </div>
          </motion.div>

          {/* Connector visual */}
          <div className="flex justify-center mb-10">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center gap-1 origin-top"
            >
              <div className="w-px h-8 bg-gradient-to-b from-[#E62129] to-[#0A2C74]" />
              <div className="w-2 h-2 rounded-full bg-[#0A2C74]" />
              <div className="w-px h-8 bg-gradient-to-b from-[#0A2C74] to-[#0570CD]" />
            </motion.div>
          </div>

          {/* Dewan Pengurus */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-14"
          >
            <div className="flex items-center justify-center gap-3 mb-10">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#0A2C74]/30" />
              <div className="flex items-center gap-2.5 bg-[#0A2C74]/10 dark:bg-blue-900/20 px-5 py-2 rounded-full">
                <Star className="w-4 h-4 text-[#0A2C74] dark:text-blue-300" />
                <span className="text-[#0A2C74] dark:text-blue-300 font-bold text-sm uppercase tracking-wider">Dewan Pengurus</span>
              </div>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#0A2C74]/30" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {dewanPengurus.map((p, i) => (
                <PengurusCard key={p.name} p={p} index={i} />
              ))}
            </div>
          </motion.div>

          {/* Connector visual */}
          <div className="flex justify-center mb-10">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center gap-1 origin-top"
            >
              <div className="w-px h-8 bg-gradient-to-b from-[#0A2C74] to-[#0570CD]" />
              <div className="w-2 h-2 rounded-full bg-[#0570CD]" />
              <div className="w-px h-8 bg-gradient-to-b from-[#0570CD] to-[#0A2C74]" />
            </motion.div>
          </div>

          {/* Anggota */}
          <div ref={anggotaRef}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={anggotaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="mb-8"
            >
              <div className="flex items-center justify-center gap-3 mb-10">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#0570CD]/30" />
                <div className="flex items-center gap-2.5 bg-[#0570CD]/10 px-5 py-2 rounded-full">
                  <Users className="w-4 h-4 text-[#0570CD]" />
                  <span className="text-[#0570CD] font-bold text-sm uppercase tracking-wider">Anggota Dewan</span>
                </div>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#0570CD]/30" />
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <AnimatePresence>
                  {visibleAnggota.map((name, i) => (
                    <motion.div
                      key={name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={anggotaInView ? { opacity: 1, x: 0 } : {}}
                      exit={{ opacity: 0 }}
                      transition={{ delay: i * 0.07, duration: 0.5 }}
                      className="group flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-[#0570CD]/40 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all"
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white font-black text-xs transition-transform group-hover:scale-110"
                        style={{ backgroundColor: i % 2 === 0 ? "#0570CD" : "#0A2C74" }}
                      >
                        {i + 1}
                      </div>
                      <span className="text-gray-800 dark:text-white text-sm font-medium">{name}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {anggota.length > 4 && (
                <div className="text-center mt-5">
                  <button
                    onClick={() => setExpandAnggota((e) => !e)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#0570CD]/30 text-[#0570CD] text-sm font-medium hover:bg-[#0570CD]/5 transition-colors"
                  >
                    {expandAnggota ? "Sembunyikan" : `Lihat ${anggota.length - 4} Anggota Lainnya`}
                    <motion.div animate={{ rotate: expandAnggota ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision banner */}
      <section className="py-16 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#E62129]/10 text-[#E62129] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              <Shield className="w-3.5 h-3.5" />
              Komitmen Yayasan
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed" style={{ fontSize: "clamp(1rem, 2vw, 1.1rem)" }}>
              Yayasan STTB berkomitmen untuk mendukung dan mengembangkan institusi pendidikan teologi yang{" "}
              <strong className="text-[#0A2C74] dark:text-blue-300">menghasilkan pemimpin gereja yang transformatif</strong>{" "}
              — membawa Injil seutuhnya ke seluruh dunia melalui pendidikan berkualitas.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
