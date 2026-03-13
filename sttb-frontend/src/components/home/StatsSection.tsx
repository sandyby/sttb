"use client";

import { motion, useInView, useSpring, useTransform, animate } from "motion/react";
import { useEffect, useRef } from "react";
import { Users, GraduationCap, BookOpen, Award, Clock, Globe } from "lucide-react";
import { stats } from "../../data/mock-data";

function Counter({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  
  // Extract number from string (e.g., "33+" -> 33)
  const numericValue = parseInt(value.replace(/[^0-9]/g, "")) || 0;
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    if (isInView && ref.current) {
      animate(0, numericValue, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest) => {
          if (ref.current) {
            ref.current.textContent = Math.floor(latest) + suffix;
          }
        },
      });
    }
  }, [numericValue, isInView, suffix]);

  return <span ref={ref} className={className}>0{suffix}</span>;
}

const statItems = [
  {
    icon: Clock,
    value: `${new Date().getFullYear() - stats.yearsEstablished}+`,
    label: "Tahun Berdiri",
    sublabel: `Sejak ${stats.yearsEstablished}`,
    color: "text-[#E62129]",
    bg: "bg-red-50 dark:bg-red-900/20",
  },
  {
    icon: Users,
    value: `${stats.studentsTotal}+`,
    label: "Mahasiswa Aktif",
    sublabel: "S1 & S2",
    color: "text-[#0A2C74]",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    icon: GraduationCap,
    value: `${stats.graduates.toLocaleString("id-ID")}+`,
    label: "Alumni",
    sublabel: "Melayani di seluruh Indonesia",
    color: "text-[#0570CD]",
    bg: "bg-sky-50 dark:bg-sky-900/20",
  },
  {
    icon: BookOpen,
    value: `${stats.programs}`,
    label: "Program Studi",
    sublabel: "S1 & S2 Teologi",
    color: "text-[#E62129]",
    bg: "bg-red-50 dark:bg-red-900/20",
  },
  {
    icon: Award,
    value: `${stats.faculty}+`,
    label: "Dosen",
    sublabel: "Bergelar Doktor",
    color: "text-[#0A2C74]",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    icon: Globe,
    value: stats.accreditation,
    label: "Akreditasi BAN-PT",
    sublabel: "Peringkat Nasional",
    color: "text-[#0570CD]",
    bg: "bg-sky-50 dark:bg-sky-900/20",
  },
];

export function StatsSection() {
  return (
    <section className="py-16 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-[#E62129] text-sm font-semibold uppercase tracking-wider mb-2">
            STTB dalam Angka
          </p>
          <h2 className="text-gray-900 dark:text-white" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700 }}>
            Dipercaya Melayani Gereja Indonesia
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {statItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="flex flex-col items-center text-center p-5 rounded-xl border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow"
              >
                <div className={`w-12 h-12 rounded-full ${item.bg} flex items-center justify-center mb-3`}>
                  <Icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <Counter 
                  value={item.value} 
                  className={`text-2xl font-bold ${item.color} mb-0.5`} 
                />
                <span className="text-gray-900 dark:text-white text-sm font-medium">
                  {item.label}
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">
                  {item.sublabel}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
