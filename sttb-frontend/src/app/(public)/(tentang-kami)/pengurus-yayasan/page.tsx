"use client";

import { useRef, useState, useMemo } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "motion/react";
import { Shield, Star, Users, ChevronDown, Loader2 } from "lucide-react";
import { useFoundationMembers } from "@/hooks/useFoundation";
import { getImageUrl } from "@/libs/api";

/* ─── PEMBINA CARD ───────────────────────────────────────── */

const PENGURUS_COLORS = [
  { color: "#E62129", accentBg: "from-[#E62129] to-[#c4131a]" },
  { color: "#0A2C74", accentBg: "from-[#0A2C74] to-[#0570CD]" },
  { color: "#0570CD", accentBg: "from-[#0570CD] to-[#0A2C74]" },
  { color: "#E62129", accentBg: "from-[#E62129] to-[#E67B21]" },
];

function PembinaCard({ p, index }: { p: any; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.15,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative text-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative">
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
          <div className="absolute top-4 right-4">
            <div className="w-7 h-7 rounded-lg bg-[#E62129]/10 flex items-center justify-center">
              <Shield className="w-3.5 h-3.5 text-[#E62129]" />
            </div>
          </div>

          <div className="relative w-24 h-24 mx-auto mb-4">
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ border: "2px solid rgba(230,33,41,0.2)" }}
              animate={{ scale: hovered ? [1, 1.12, 1] : 1 }}
              transition={{ duration: 1.5, repeat: hovered ? Infinity : 0 }}
            />
            <div className="w-full h-full rounded-full overflow-hidden ring-2 ring-[#E62129]/20 group-hover:ring-[#E62129]/50 transition-all shadow-md bg-gray-50 dark:bg-gray-700 flex items-center justify-center">
              {p.imageUrl ? (
                <Image
                  src={getImageUrl(p.imageUrl) ?? p.imageUrl}
                  alt={p.name}
                  fill
                  className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <Shield className="w-8 h-8 text-gray-300" />
              )}
            </div>
          </div>

          <h3 className="text-gray-900 dark:text-white font-bold text-sm leading-snug">
            {p.name}
          </h3>
          <p className="text-[#E62129] text-xs font-semibold mt-1 mb-2">
            {p.position}
          </p>

          <AnimatePresence>
            {hovered && p.description && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed overflow-hidden"
              >
                {p.description}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── PENGURUS CARD ──────────────────────────────────────── */

function PengurusCard({ p, index }: { p: any; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const colorStyles = PENGURUS_COLORS[index % PENGURUS_COLORS.length];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{
        delay: index * 0.12,
        duration: 0.7,
        type: "spring",
        stiffness: 120,
      }}
      className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
      whileHover={{ y: -6 }}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${colorStyles.accentBg} opacity-100`}
      />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 20%, white 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div
        className="absolute top-0 right-0 font-black text-white/10 pointer-events-none select-none"
        style={{
          fontSize: "6rem",
          lineHeight: 0.8,
          transform: "translate(10%, -10%)",
        }}
      >
        {index + 1}
      </div>

      <div className="relative p-6 text-center">
        <div className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-wide">
          {p.position}
        </div>

        <div className="relative w-20 h-20 mx-auto mb-4">
          <div className="w-full h-full rounded-full overflow-hidden ring-4 ring-white/30 group-hover:ring-white/60 transition-all shadow-xl bg-white/10 flex items-center justify-center">
            {p.imageUrl ? (
              <Image
                src={getImageUrl(p.imageUrl) ?? p.imageUrl}
                alt={p.name}
                fill
                className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <Star className="w-6 h-6 text-white/50" />
            )}
          </div>
        </div>

        <h3 className="text-white font-bold leading-snug text-sm">{p.name}</h3>
      </div>
    </motion.div>
  );
}

/* ─── PAGE ────────────────────────────────────────────────── */

export default function PengurusYayasanPage() {
  const { data, isLoading } = useFoundationMembers();
  const [expandAnggota, setExpandAnggota] = useState(false);

  const { dewanPembina, dewanPengurus, anggota } = useMemo(() => {
    const members = data?.members ?? [];
    return {
      dewanPembina: members.filter(
        (m) => m.category?.toLowerCase() === "pembina",
      ),
      dewanPengurus: members.filter(
        (m) => m.category?.toLowerCase() === "pengurus",
      ),
      anggota: members.filter((m) => m.category?.toLowerCase() === "anggota"),
    };
  }, [data]);

  const visibleAnggota = expandAnggota ? anggota : anggota.slice(0, 4);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
        <Loader2 className="w-10 h-10 animate-spin text-[#E62129]" />
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <div
        className="relative pt-28 pb-24 min-h-[420px] flex items-center overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #060C1A 0%, #0A2C74 70%, #0570CD 100%)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {[180, 300, 420].map((size, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-white/5 pointer-events-none"
            style={{
              width: size,
              height: size,
              right: "-5%",
              top: "50%",
              transform: "translateY(-50%)",
            }}
            animate={{ rotate: [0, 360] }}
            transition={{
              duration: 20 + i * 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-2 mb-5">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-8 h-px bg-[#E62129] origin-left"
              />
              <span className="text-[#E62129] text-xs font-semibold uppercase tracking-widest">
                Tentang STTB
              </span>
            </div>
            <h1
              className="text-white mb-4"
              style={{
                fontWeight: 800,
                lineHeight: 1.05,
                fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              }}
            >
              Pengurus Yayasan
            </h1>
            <p className="text-blue-200/70 max-w-xl leading-relaxed">
              Yayasan Sekolah Tinggi Teologi Bandung dipimpin oleh para hamba
              Tuhan dan pemimpin Kristen yang berkomitmen pada visi pendidikan
              teologi yang berkualitas.
            </p>
          </motion.div>
        </div>
      </div>

      <section className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          aria-hidden
        >
          <span
            className="text-gray-100 dark:text-gray-800 font-black"
            style={{
              fontSize: "clamp(5rem, 18vw, 14rem)",
              lineHeight: 1,
              opacity: 0.5,
            }}
          >
            YAYASAN
          </span>
        </div>

        <div className="max-w-5xl mx-auto px-4 relative">
          {/* Dewan Pembina */}
          {dewanPembina.length > 0 && (
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
                  <span className="text-[#E62129] font-bold text-sm uppercase tracking-wider">
                    Dewan Pembina
                  </span>
                </div>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#E62129]/30" />
              </div>

              <div className="grid sm:grid-cols-3 gap-6">
                {dewanPembina.map((p, i) => (
                  <PembinaCard key={p.id} p={p} index={i} />
                ))}
              </div>
            </motion.div>
          )}

          {/* Connector visual */}
          {dewanPembina.length > 0 && dewanPengurus.length > 0 && (
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
          )}

          {/* Dewan Pengurus */}
          {dewanPengurus.length > 0 && (
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
                  <span className="text-[#0A2C74] dark:text-blue-300 font-bold text-sm uppercase tracking-wider">
                    Dewan Pengurus
                  </span>
                </div>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#0A2C74]/30" />
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {dewanPengurus.map((p, i) => (
                  <PengurusCard key={p.id} p={p} index={i} />
                ))}
              </div>
            </motion.div>
          )}

          {/* Connector visual */}
          {dewanPengurus.length > 0 && anggota.length > 0 && (
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
          )}

          {/* Anggota */}
          {anggota.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-8"
            >
              <div className="flex items-center justify-center gap-3 mb-10">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#0570CD]/30" />
                <div className="flex items-center gap-2.5 bg-[#0570CD]/10 px-5 py-2 rounded-full">
                  <Users className="w-4 h-4 text-[#0570CD]" />
                  <span className="text-[#0570CD] font-bold text-sm uppercase tracking-wider">
                    Anggota Dewan
                  </span>
                </div>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#0570CD]/30" />
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <AnimatePresence>
                  {visibleAnggota.map((member, i) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: i * 0.07, duration: 0.5 }}
                      className="group flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-[#0570CD]/40 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all"
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white font-black text-xs transition-transform group-hover:scale-110"
                        style={{
                          backgroundColor: i % 2 === 0 ? "#0570CD" : "#0A2C74",
                        }}
                      >
                        {i + 1}
                      </div>
                      <span className="text-gray-800 dark:text-white text-sm font-medium">
                        {member.name}
                      </span>
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
                    {expandAnggota
                      ? "Sembunyikan"
                      : `Lihat ${anggota.length - 4} Anggota Lainnya`}
                    <motion.div
                      animate={{ rotate: expandAnggota ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>

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
            <p
              className="text-gray-600 dark:text-gray-400 leading-relaxed"
              style={{ fontSize: "clamp(1rem, 2vw, 1.1rem)" }}
            >
              Yayasan STTB berkomitmen untuk mendukung dan mengembangkan
              institusi pendidikan teologi yang{" "}
              <strong className="text-[#0A2C74] dark:text-blue-300">
                menghasilkan pemimpin gereja yang transformatif
              </strong>{" "}
              — membawa Injil seutuhnya ke seluruh dunia melalui pendidikan
              berkualitas.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
