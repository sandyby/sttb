import React from "react";
import { Link } from "react-router";
import { ArrowRight, BookOpen, Award } from "lucide-react";
import { motion } from "motion/react";
import { programs } from "../../data/mock-data";

export function ProgramsSection() {
  const s1Programs = programs.filter((p) => p.level === "S1");
  const s2Programs = programs.filter((p) => p.level === "S2");

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[#E62129] text-sm font-semibold uppercase tracking-wider mb-2">
            Program Akademik
          </p>
          <h2
            className="text-gray-900 dark:text-white mb-4"
            style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)", fontWeight: 700 }}
          >
            Temukan Program Studi Anda
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            STTB menawarkan 8 program studi teologi berkualitas tinggi dari
            jenjang Sarjana hingga Magister, dirancang untuk mempersiapkan
            pemimpin gereja masa depan.
          </p>
        </div>

        {/* S1 Programs */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-[#E62129] flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-gray-900 dark:text-white font-bold">
                Program Sarjana (S1)
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-xs">
                4 tahun · Terakreditasi BAN-PT
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {s1Programs.map((program, i) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  to={`/${program.slug}`}
                  className="group flex gap-4 p-5 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-[#E62129]/50 hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#E62129] transition-colors">
                    <span className="text-[#E62129] group-hover:text-white font-bold text-sm transition-colors">
                      {program.degree}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-gray-900 dark:text-white font-semibold group-hover:text-[#E62129] transition-colors mb-1">
                      {program.name}
                    </h4>
                    <p className="text-gray-500 dark:text-gray-400 text-xs line-clamp-2 mb-2">
                      {program.description}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span>{program.duration}</span>
                      <span>·</span>
                      <span>{program.credits} SKS</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#E62129] flex-shrink-0 mt-1 transition-all group-hover:translate-x-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* S2 Programs */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-[#0A2C74] flex items-center justify-center">
              <Award className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-gray-900 dark:text-white font-bold">
                Program Magister (S2)
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-xs">
                2 tahun · 6 konsentrasi tersedia
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {s2Programs.map((program, i) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link
                  to={`/${program.slug}`}
                  className="group flex flex-col p-5 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-[#0A2C74]/50 hover:shadow-md transition-all h-full"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-0.5 rounded-md bg-[#0A2C74]/10 text-[#0A2C74] dark:text-blue-300 text-xs font-semibold">
                      {program.degree}
                    </span>
                    <span className="text-xs text-gray-400">
                      {program.credits} SKS
                    </span>
                  </div>
                  <h4 className="text-gray-900 dark:text-white font-semibold group-hover:text-[#0A2C74] dark:group-hover:text-blue-300 transition-colors mb-2 flex-1">
                    {program.name}
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400 text-xs line-clamp-2 mb-3">
                    {program.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{program.duration}</span>
                    <span className="flex items-center gap-1 text-[#0A2C74] dark:text-blue-300 font-medium group-hover:gap-2 transition-all">
                      Pelajari <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link
            to="/prosedur-admisi"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-[#E62129] hover:bg-[#c4131a] text-white font-medium transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            Mulai Proses Pendaftaran <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
