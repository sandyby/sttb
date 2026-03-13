"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

const slides = [
  {
    id: 1,
    tag: "Pendidikan Teologi • Bandung",
    title: "Dipanggil untuk\nMelayani,",
    titleAccent: "Dibekali untuk\nMemimpin.",
    subtitle:
      "Sekolah Tinggi Teologi Bandung — Membentuk Pastor-Scholar yang transformatif sejak 1992.",
    cta: "Daftar Sekarang",
    ctaHref: "/prosedur-admisi",
    secondaryCta: "Jadwal Admisi",
    secondaryHref: "/jadwal-admisi",
    imageUrl:
      "/cathedral-of-our-lady-of-peace_highres_web.jpg",
    accent: "#E62129",
  },
  {
    id: 2,
    tag: "8 Program Studi S1 & S2",
    title: "Seluruh Umat,\nSeluruh Injil,",
    titleAccent: "Seluruh Dunia.",
    subtitle:
      "Kurikulum Reformed-Evangelical berakar Alkitab, relevan dengan konteks masyarakat urban Indonesia.",
    cta: "Lihat Program Studi",
    ctaHref: "/program-studi",
    secondaryCta: undefined,
    secondaryHref: undefined,
    imageUrl:
      "https://images.unsplash.com/photo-1758413350815-7b06dbbfb9a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920&q=80",
    accent: "#0570CD",
  },
  {
    id: 3,
    tag: "LEAD Center · Pendidikan Nonformal",
    title: "Memperlengkapi\nSetiap Orang,",
    titleAccent: "Bagi Kemuliaan-Nya.",
    subtitle:
      "LEAD Center hadir untuk memperlengkapi seluruh umat Allah — bukan hanya mereka yang di seminari.",
    cta: "LEAD Center",
    ctaHref: "/lead",
    secondaryCta: "Kontak Kami",
    secondaryHref: "/kontak-kami",
    imageUrl:
      "https://images.unsplash.com/photo-1764072970350-2ce4f354a483?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920&q=80",
    accent: "#E62129",
  },
];

export function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const DURATION = 7000;

  const startProgress = () => {
    setProgress(0);
    if (progressRef.current) clearInterval(progressRef.current);
    progressRef.current = setInterval(() => {
      setProgress((p) => Math.min(p + 100 / (DURATION / 50), 100));
    }, 50);
  };

  useEffect(() => {
    if (!isPlaying) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    startProgress();
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
      startProgress();
    }, DURATION);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [isPlaying, current]);

  const go = (idx: number) => {
    setCurrent(idx);
    setIsPlaying(false);
    startProgress();
  };
  const prev = () => go((current - 1 + slides.length) % slides.length);
  const next = () => go((current + 1) % slides.length);

  const slide = slides[current];

  return (
    <section className="relative h-screen min-h-[640px] max-h-[960px] overflow-hidden bg-[#060C1A]">
      {/* Background images */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0 transition-opacity duration-1200"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <Image
            src={s.imageUrl}
            alt=""
            fill
            className="w-full h-full object-cover scale-105"
            style={{
              transform: i === current ? "scale(1)" : "scale(1.05)",
              transition: "transform 8s ease-out",
            }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060C1A]/90 via-[#060C1A]/60 to-[#060C1A]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060C1A]/70 via-transparent to-transparent" />
        </div>
      ))}

      {/* Decorative vertical line */}
      <div className="absolute top-0 bottom-0 left-[calc(50%-2px)] w-px bg-white/5 hidden xl:block" />

      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div className="flex-1 flex items-center w-full">
          <div className="max-w-7xl mx-auto px-6 w-full pt-28 md:pt-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-3xl"
              >
                {/* Tag */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="inline-flex items-center gap-2 mb-6"
                >
                  <div
                    className="w-8 h-px"
                    style={{ backgroundColor: slide.accent }}
                  />
                  <span
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: slide.accent }}
                  >
                    {slide.tag}
                  </span>
                </motion.div>

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-white mb-2"
                  style={{
                    fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
                    fontWeight: 800,
                    lineHeight: 1.05,
                    whiteSpace: "pre-line",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {slide.title}
                </motion.h1>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="mb-2"
                  style={{
                    fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
                    fontWeight: 800,
                    lineHeight: 1.05,
                    whiteSpace: "pre-line",
                    letterSpacing: "-0.02em",
                    color: slide.accent,
                  }}
                >
                  {slide.titleAccent}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-white/70 mb-4 max-w-xl leading-relaxed"
                  style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)" }}
                >
                  {slide.subtitle}
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="flex flex-wrap gap-4"
                >
                  <Link
                    href={slide.ctaHref}
                    className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-white font-semibold transition-all hover:scale-105 active:scale-95"
                    style={{ backgroundColor: slide.accent }}
                  >
                    {slide.cta}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  {slide.secondaryCta != undefined && (
                    <Link
                      href={slide.secondaryHref}
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-white font-semibold bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all hover:scale-105 active:scale-95"
                    >
                      {slide.secondaryCta}
                    </Link>
                  )}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1">
          <span className="text-white/40 text-xs uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5 text-white/40" />
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="relative z-10 pb-4">
          {/* Controls */}
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between w-full">
            {/* Slide indicators with progress */}
            <div className="flex items-center gap-3">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  className="relative h-0.5 overflow-hidden rounded-full transition-all duration-300"
                  style={{ width: i === current ? 56 : 24 }}
                >
                  <div className="absolute inset-0 bg-white/30" />
                  {i === current && (
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-[#E62129]"
                      style={{ width: `${progress}%` }}
                    />
                  )}
                </button>
              ))}
              <span className="text-white/40 text-xs ml-1">
                {String(current + 1).padStart(2, "0")} /{" "}
                {String(slides.length).padStart(2, "0")}
              </span>
            </div>

            {/* Arrow controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white/10 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white/10 transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
