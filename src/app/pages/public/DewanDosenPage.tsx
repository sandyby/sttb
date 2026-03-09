import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { Mail, GraduationCap, BookOpen, X, ChevronRight } from "lucide-react";
import { faculty } from "../../data/mock-data";

/* ─── DATA ───────────────────────────────────────────────── */

const additionalFaculty = [
  {
    id: "7",
    name: "Dr. Ronny Kristianus",
    title: "Dosen Tetap",
    degree: "Ph.D. in Practical Theology, University of South Africa",
    specialization: "Teologi Praktika, Konseling Pastoral",
    imageUrl: "https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  },
  {
    id: "8",
    name: "Pdt. Dr. Hendra Wijaya",
    title: "Dosen Tidak Tetap",
    degree: "Th.D. in Biblical Theology, Dallas Theological Seminary",
    specialization: "Teologi Biblika, Eksegesis",
    imageUrl: "https://images.unsplash.com/photo-1542178243-bc20204b769f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  },
];

const allFaculty = [...faculty, ...additionalFaculty];

const specializations = ["Semua", "Perjanjian Baru", "Perjanjian Lama", "Teologi", "Pendidikan", "Misiologi", "Konseling", "Sejarah"];

/* ─── FACULTY CARD ───────────────────────────────────────── */

function FacultyCard({
  person,
  index,
  onClick,
}: {
  person: typeof allFaculty[0];
  index: number;
  onClick: () => void;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  const isLeader = index < 2;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: (index % 4) * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group relative cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      whileHover={{ y: -6 }}
    >
      {/* Glow on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute -inset-0.5 rounded-2xl pointer-events-none z-0"
            style={{ background: "linear-gradient(135deg, #E62129, #0A2C74)", filter: "blur(8px)", opacity: 0.15 }}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm group-hover:shadow-2xl transition-all duration-500">
        {/* Image */}
        <div className="relative overflow-hidden" style={{ height: isLeader ? "260px" : "200px" }}>
          <motion.img
            src={person.imageUrl}
            alt={person.name}
            className="w-full h-full object-cover object-top"
            animate={{ scale: hovered ? 1.08 : 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Overlay on hover */}
          <motion.div
            className="absolute inset-0 flex items-end p-4"
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ background: "linear-gradient(to top, rgba(10,44,116,0.95) 0%, rgba(10,44,116,0.4) 60%, transparent 100%)" }}
          >
            <div className="flex items-center gap-2 text-white text-xs font-medium">
              <ChevronRight className="w-3.5 h-3.5" />
              Lihat Profil Lengkap
            </div>
          </motion.div>

          {/* Degree badge */}
          {isLeader && (
            <div className="absolute top-3 right-3">
              <div className="bg-[#E62129] text-white text-xs px-2.5 py-1 rounded-full font-bold shadow-lg">
                {person.title}
              </div>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          {!isLeader && (
            <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-[#E62129]/10 text-[#E62129] mb-2">
              {person.title}
            </span>
          )}
          <h3 className="text-gray-900 dark:text-white font-bold leading-snug text-sm mb-1.5">
            {person.name}
          </h3>
          <p className="text-[#0570CD] dark:text-blue-400 text-xs font-medium mb-1.5 flex items-center gap-1">
            <BookOpen className="w-3 h-3 flex-shrink-0" />
            {person.specialization}
          </p>
          <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">{person.degree}</p>
        </div>

        {/* Bottom accent bar */}
        <motion.div
          className="h-0.5"
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{ background: "linear-gradient(90deg, #E62129, #0A2C74, #0570CD)", transformOrigin: "left" }}
        />
      </div>
    </motion.div>
  );
}

/* ─── DETAIL MODAL ───────────────────────────────────────── */

function FacultyModal({ person, onClose }: { person: typeof allFaculty[0] | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {person && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image header */}
            <div className="relative h-56">
              <img
                src={person.imageUrl}
                alt={person.name}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2C74] via-[#0A2C74]/40 to-transparent" />
              <button
                onClick={onClose}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-4 left-5">
                <span className="bg-[#E62129] text-white text-xs px-3 py-1 rounded-full font-bold">
                  {person.title}
                </span>
                <h3 className="text-white font-bold text-lg mt-1 leading-snug">{person.name}</h3>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#0570CD]/10 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-4.5 h-4.5 text-[#0570CD]" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">Pendidikan</p>
                  <p className="text-gray-800 dark:text-gray-200 text-sm font-medium">{person.degree}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#E62129]/10 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-4.5 h-4.5 text-[#E62129]" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">Spesialisasi</p>
                  <p className="text-gray-800 dark:text-gray-200 text-sm font-medium">{person.specialization}</p>
                </div>
              </div>

              {(person as { email?: string }).email && (
                <a
                  href={`mailto:${(person as { email?: string }).email}`}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#E62129]/5 hover:bg-[#E62129]/10 transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#E62129]/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4.5 h-4.5 text-[#E62129]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">Email</p>
                    <p className="text-[#E62129] text-sm font-medium">{(person as { email?: string }).email}</p>
                  </div>
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── PAGE ────────────────────────────────────────────────── */

export function DewanDosenPage() {
  const [selectedFaculty, setSelectedFaculty] = useState<typeof allFaculty[0] | null>(null);
  const [filter, setFilter] = useState("Semua");

  const filtered = filter === "Semua"
    ? allFaculty
    : allFaculty.filter((f) =>
        f.specialization.toLowerCase().includes(filter.toLowerCase()) ||
        f.degree.toLowerCase().includes(filter.toLowerCase())
      );

  return (
    <>
      {/* Hero */}
      <div className="relative pt-28 pb-24 overflow-hidden min-h-[420px] flex items-center" style={{ background: "linear-gradient(135deg, #060C1A 0%, #0A2C74 60%, #0570CD 100%)" }}>
        {/* Decorative */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${100 + i * 80}px`,
                height: `${100 + i * 80}px`,
                right: `${-20 + i * 8}%`,
                top: `${10 + (i % 3) * 20}%`,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
            />
          ))}
        </div>

        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

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
              Dewan Dosen
            </h1>
            <p className="text-blue-200/80 max-w-xl leading-relaxed">
              Para pengajar bergelar doktor dari universitas teologi terkemuka dunia yang berdedikasi membentuk generasi pemimpin rohani Indonesia.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mt-8">
              {[
                { num: `${allFaculty.filter((f) => f.title === "Dosen Tetap" || f.title === "Wakil Ketua Akademik" || f.title === "Rektor").length}+`, label: "Dosen Tetap" },
                { num: "100%", label: "Bergelar S3/Doktor" },
                { num: "5+", label: "Negara Studi" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-white font-black" style={{ fontSize: "1.8rem", lineHeight: 1 }}>{s.num}</div>
                  <div className="text-blue-300 text-xs mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Filter bar */}
      <div className="sticky top-[56px] z-30 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
            <span className="text-gray-400 text-xs uppercase tracking-wider whitespace-nowrap flex-shrink-0">Filter:</span>
            {specializations.map((spec) => (
              <button
                key={spec}
                onClick={() => setFilter(spec)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                  filter === spec
                    ? "bg-[#E62129] text-white shadow-md shadow-red-200 dark:shadow-none"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="py-16 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <GraduationCap className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>Tidak ada dosen ditemukan untuk filter ini.</p>
            </div>
          ) : (
            <motion.div
              layout
              className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              <AnimatePresence>
                {filtered.map((f, i) => (
                  <motion.div
                    key={f.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <FacultyCard
                      person={f}
                      index={i}
                      onClick={() => setSelectedFaculty(f)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0A2C74, #060C1A)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute right-0 top-0 w-96 h-96 rounded-full bg-[#E62129]/5" style={{ transform: "translate(30%, -30%)" }} />
        </div>
        <div className="max-w-3xl mx-auto px-4 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-white font-bold mb-3" style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)" }}>
              Bergabung dengan Tim Pengajar STTB
            </h2>
            <p className="text-blue-200/70 leading-relaxed mb-6">
              STTB membuka kesempatan bagi para akademisi teologi yang berdedikasi untuk berkontribusi dalam misi mendidik pemimpin gereja Indonesia.
            </p>
            <a
              href="mailto:sdm@sttb.ac.id"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#E62129] text-white font-medium hover:bg-[#c4131a] transition-all shadow-lg"
            >
              <Mail className="w-4 h-4" />
              Hubungi Bagian SDM
            </a>
          </motion.div>
        </div>
      </section>

      {/* Detail Modal */}
      <FacultyModal person={selectedFaculty} onClose={() => setSelectedFaculty(null)} />
    </>
  );
}
