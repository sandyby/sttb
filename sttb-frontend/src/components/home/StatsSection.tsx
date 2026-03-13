"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "motion/react";
import { Users, GraduationCap, BookOpen, Award, Clock, Globe } from "lucide-react";
import { stats } from "../../data/mock-data";

function Counter({ value, className, style }: { value: string; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const numericValue = parseInt(value.replace(/[^0-9]/g, "")) || 0;
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    if (isInView && ref.current) {
      animate(0, numericValue, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest) => {
          if (ref.current) {
            ref.current.textContent = Math.floor(latest).toLocaleString("id-ID") + suffix;
          }
        },
      });
    }
  }, [numericValue, isInView, suffix]);

  return <span ref={ref} className={className} style={style}>0{suffix}</span>;
}

const statItems = [
  {
    icon: Clock,
    value: `${new Date().getFullYear() - stats.yearsEstablished}+`,
    label: "Tahun Berdiri",
    sublabel: `Sejak ${stats.yearsEstablished}`,
    accent: "#E62129",
  },
  {
    icon: Users,
    value: `${stats.studentsTotal}+`,
    label: "Mahasiswa Aktif",
    sublabel: "S1 & S2",
    accent: "#0A2C74",
  },
  {
    icon: GraduationCap,
    value: `${stats.graduates.toLocaleString("id-ID")}+`,
    label: "Alumni",
    sublabel: "Melayani di seluruh Indonesia",
    accent: "#0570CD",
  },
  {
    icon: BookOpen,
    value: `${stats.programs}`,
    label: "Program Studi",
    sublabel: "S1 & S2 Teologi",
    accent: "#E62129",
  },
  {
    icon: Award,
    value: `${stats.faculty}+`,
    label: "Dosen",
    sublabel: "Bergelar Doktor",
    accent: "#0A2C74",
  },
  {
    icon: Globe,
    value: stats.accreditation,
    label: "Akreditasi BAN-PT",
    sublabel: "Peringkat Nasional",
    accent: "#0570CD",
  },
];

function StatCard({
  item,
  index,
}: {
  item: (typeof statItems)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group flex flex-col items-center text-center p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 cursor-default overflow-hidden transition-shadow duration-300 hover:shadow-xl"
    >
      {/* Animated color fill on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        style={{ background: `linear-gradient(135deg, ${item.accent}10, ${item.accent}05)` }}
      />

      {/* Top accent bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-0.5"
        animate={{ scaleX: hovered ? 1 : 0 }}
        initial={{ scaleX: 0 }}
        transition={{ duration: 0.3 }}
        style={{ background: item.accent, transformOrigin: "left" }}
      />

      {/* Icon */}
      <motion.div
        animate={{ scale: hovered ? 1.1 : 1, rotate: hovered ? 5 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-4"
        style={{ backgroundColor: `${item.accent}15` }}
      >
        <Icon className="w-5 h-5" style={{ color: item.accent }} />
      </motion.div>

      {/* Value */}
      <Counter
        value={item.value}
        className="relative text-3xl font-bold mb-1 tabular-nums"
        style={{ color: item.accent } as React.CSSProperties}
      />

      {/* Label */}
      <span className="relative text-gray-900 dark:text-white text-sm font-semibold">
        {item.label}
      </span>

      {/* Sublabel */}
      <span className="relative text-gray-400 dark:text-gray-500 text-xs mt-0.5 leading-snug">
        {item.sublabel}
      </span>
    </motion.div>
  );
}

export function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-6 h-px bg-[#E62129]" />
            <p className="text-[#E62129] text-xs font-bold uppercase tracking-widest">
              STTB dalam Angka
            </p>
            <div className="w-6 h-px bg-[#E62129]" />
          </div>
          <h2
            className="text-gray-900 dark:text-white"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700 }}
          >
            Dipercaya Melayani Gereja Indonesia
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 max-w-md mx-auto">
            Lebih dari lima dekade membentuk pemimpin gereja yang transformatif di seluruh Nusantara.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {statItems.map((item, index) => (
            <StatCard key={item.label} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
