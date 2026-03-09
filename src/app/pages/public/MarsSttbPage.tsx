import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import { Play, Pause, Music2, Volume2 } from "lucide-react";
import { FadeIn, StaggerGroup, StaggerItem } from "../../components/ui/FadeIn";

const lyrics = [
  {
    stanza: 1,
    lines: [
      "Sekolah Tinggi Teologi Bandung",
      "Tempat kami belajar firman Tuhan",
      "Dididik dengan kasih dan kebenaran",
      "Untuk melayani dengan setia",
    ],
  },
  {
    stanza: 2,
    lines: [
      "Di sinilah kami dibentuk dan diasah",
      "Hati dan pikiran terarah pada Kristus",
      "Dengan iman dan kerendahan hati",
      "Kami siap melayani dunia",
    ],
  },
  {
    stanza: 3,
    lines: [
      "STTB almamater kami tercinta",
      "Menghasilkan pastor-scholar yang transformatif",
      "Membawa Injil ke seluruh penjuru dunia",
      "Bagi kemuliaan nama Tuhan",
    ],
  },
];

const refrain = [
  "Maju terus dalam kasih Kristus",
  "Layani Tuhan dengan segenap hati",
  "Jadilah terang di tengah kegelapan",
  "Sekolah Tinggi Teologi Bandung jaya!",
];

export function MarsSttbPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      {/* Hero */}
      <div className="pt-28 pb-20 bg-gradient-to-br from-[#0A2C74] to-[#0570CD] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/5"
              style={{
                width: 60 + i * 30,
                height: 60 + i * 30,
                top: `${10 + i * 10}%`,
                left: `${5 + i * 12}%`,
              }}
              animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.4 }}
            />
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#7FB4E5] text-sm font-medium uppercase tracking-wider mb-2">
              Tentang STTB
            </p>
            <h1
              className="text-white mb-4"
              style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 700 }}
            >
              Mars STTB
            </h1>
            <p className="text-blue-200 max-w-xl leading-relaxed">
              Lagu Mars Sekolah Tinggi Teologi Bandung, karya Dorothy I. Marx.
              Sebuah ungkapan iman dan komitmen komunitas akademik STTB.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Audio Player Card */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-2xl mx-auto px-4">
          <FadeIn>
            <div className="bg-gradient-to-br from-[#0A2C74] to-[#0570CD] rounded-2xl p-8 text-white shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                  <Music2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-lg">Mars STT Bandung</h2>
                  <p className="text-blue-200 text-sm">by Dorothy I. Marx</p>
                </div>
              </div>

              {/* Waveform visual */}
              <div className="flex items-center gap-1 justify-center mb-6 h-10">
                {[...Array(32)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="bg-white/40 rounded-full w-1.5"
                    animate={
                      isPlaying
                        ? {
                            height: [
                              4,
                              8 + Math.random() * 24,
                              4,
                            ],
                          }
                        : { height: 4 }
                    }
                    transition={{
                      duration: 0.6,
                      repeat: isPlaying ? Infinity : 0,
                      delay: i * 0.05,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-6">
                <Volume2 className="w-5 h-5 text-blue-200" />
                <button
                  onClick={togglePlay}
                  className="w-14 h-14 rounded-full bg-white flex items-center justify-center hover:bg-blue-50 transition-colors shadow-lg"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 text-[#0A2C74]" />
                  ) : (
                    <Play className="w-6 h-6 text-[#0A2C74] ml-0.5" />
                  )}
                </button>
                <span className="text-blue-200 text-sm">Audio</span>
              </div>

              <p className="text-center text-blue-300 text-xs mt-4">
                Mars STTB · Sekolah Tinggi Teologi Bandung
              </p>

              {/* Hidden audio element — replace src with actual file when available */}
              <audio
                ref={audioRef}
                src="https://sttb.ac.id/storage/2022/05/Audio-Mars-STTB.mp3"
                onEnded={() => setIsPlaying(false)}
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Lyrics */}
      <section className="py-14 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-3xl mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-10">
              <p className="text-[#E62129] text-sm font-semibold uppercase tracking-wider mb-2">
                Lirik
              </p>
              <h2
                className="text-gray-900 dark:text-white"
                style={{ fontWeight: 700, fontSize: "1.5rem" }}
              >
                Mars STT Bandung
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                Karya: Dorothy I. Marx
              </p>
            </div>
          </FadeIn>

          <div className="space-y-8">
            <StaggerGroup staggerDelay={0.12} className="space-y-8">
              {lyrics.map((stanza) => (
                <StaggerItem key={stanza.stanza}>
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow">
                    <p className="text-[#E62129] text-xs font-semibold uppercase tracking-wider mb-4">
                      Bait {stanza.stanza}
                    </p>
                    <div className="space-y-2">
                      {stanza.lines.map((line, li) => (
                        <p
                          key={li}
                          className="text-gray-700 dark:text-gray-300 leading-relaxed"
                          style={{ fontStyle: "italic" }}
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>

            {/* Refrain */}
            <FadeIn delay={0.3}>
              <div className="bg-[#0A2C74] rounded-xl p-6 text-white">
                <p className="text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
                  Refrain
                </p>
                <div className="space-y-2">
                  {refrain.map((line, li) => (
                    <p
                      key={li}
                      className="text-blue-50 leading-relaxed"
                      style={{ fontStyle: "italic" }}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Attribution */}
      <FadeIn>
        <section className="py-10 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              © Mars STT Bandung · Hak Cipta dilindungi. Karya:{" "}
              <strong className="text-gray-700 dark:text-gray-300">Dorothy I. Marx</strong>
            </p>
          </div>
        </section>
      </FadeIn>
    </>
  );
}
