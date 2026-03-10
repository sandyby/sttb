'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Music2, RotateCcw } from 'lucide-react';
import { FadeIn } from '@/components/ui/FadeIn';

const syncedLyrics = [
    { time: 8.25, text: "Mahasiswa STT Bandung sadarilah betapa besar" },
    { time: 16.23, text: "Kehormatan dan tanggung jawab yang Tuhan Yesus brikan padamu" },
    { time: 24.19, text: "'tuk Indonesia tanah airmu, ladang yang luas untuk digarap" },
    { time: 31.64, text: "oleh pekerja yang sudah siap untuk diutus oleh Tuhan-mu" },
    { time: 39.89, text: "Yang Maha Kuasa; Yang Maha Mulia; Yang Maha Kudus; Yang slalu setia!" },
    { time: 48.13, text: "STT Bandung, kamu dipanggil, kamu diutus; jawablah \"Ya Tuhan\"" },
    { time: 56.13, text: "Ya kami rela, kami bersedia dalam anugrah-Mu 'tuk diutus" },
    { time: 64.39, text: "\"Utus kami Tuhan!\"" },
] as const;

function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default function MarsSttbPage() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [activeIndex, setActiveIndex] = useState(-1);

    const audioRef = useRef<HTMLAudioElement>(null);
    const lyricsContainerRef = useRef<HTMLDivElement>(null);

    // ────────────────────────────────────────────────
    // Sync current time & highlight active lyric
    // ────────────────────────────────────────────────
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        setDuration(audio.duration);

        const handleTimeUpdate = () => {
            const time = audio.currentTime;
            setCurrentTime(time);

            // Find the latest lyric line whose time has passed
            let foundIndex = -1;
            for (let i = syncedLyrics.length - 1; i >= 0; i--) {
                if (time >= syncedLyrics[i].time) {
                    foundIndex = i;
                    break;
                }
            }
            setActiveIndex(foundIndex);
        };

        // ? not called krn laodedmedata ga ketrigger?
        const handleLoaded = () => {
            setDuration(audio.duration || 0);
        };

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoaded);
        audio.addEventListener('ended', () => setIsPlaying(false));

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoaded);
            audio.removeEventListener('ended', () => setIsPlaying(false));
        };
    }, []);

    // ────────────────────────────────────────────────
    // Auto-scroll to active lyric
    // ────────────────────────────────────────────────
    useEffect(() => {
        if (activeIndex < 0 || !lyricsContainerRef.current) return;

        const activeElement = lyricsContainerRef.current.children[activeIndex] as HTMLElement;
        if (activeElement) {
            activeElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    }, [activeIndex]);

    // ────────────────────────────────────────────────
    // Controls
    // ────────────────────────────────────────────────
    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(() => { });
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            const newTime = Number(e.target.value);
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const restartSong = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            setCurrentTime(0);
            setActiveIndex(-1);
            if (!isPlaying) {
                audioRef.current.play().catch(() => { });
                setIsPlaying(true);
            }
        }
    };

    return (
        <>
            {/* Hero Section – kept mostly as before */}
            <div className="pt-28 pb-20 bg-gradient-to-br from-[#0A2C74] to-[#0570CD] relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="text-[#7FB4E5] text-sm font-medium uppercase tracking-wider mb-2">
                            Tentang STTB
                        </p>
                        <h1 className="text-white mb-4" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 700 }}>
                            Mars STTB
                        </h1>
                        <p className="text-blue-200 max-w-xl leading-relaxed">
                            Lagu Mars Sekolah Tinggi Teologi Bandung, karya Dorothy I. Marx.
                            Sebuah ungkapan iman dan komitmen komunitas akademik STTB.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Audio Player */}
            <section className="py-12 bg-white dark:bg-gray-900">
                <div className="w-full sm:w-[70vw] md:w-[60vw] lg:w-[40vw] mx-auto px-4">
                    <FadeIn>
                        <div className="bg-gradient-to-br from-[#0A2C74] to-[#0570CD] rounded-2xl p-8 text-white shadow-2xl">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                                    <Music2 className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h2 className="font-bold text-lg">Mars STT Bandung</h2>
                                    <p className="text-blue-200 text-sm">Dorothy I. Marx</p>
                                </div>
                            </div>

                            {/* Progress bar + time */}
                            <div className="mb-6">
                                <div className="flex justify-between text-xs text-blue-200 mb-1.5">
                                    <span>{formatTime(currentTime)}</span>
                                    <span>{formatTime(duration)}</span>
                                </div>
                                <input
                                    type="range"
                                    min={0}
                                    max={duration || 100}
                                    value={currentTime}
                                    onChange={handleSeek}
                                    step={0.1}
                                    className="
                    w-full h-1.5 bg-white/30 rounded-full appearance-none cursor-pointer
                    accent-white
                  "
                                    style={{
                                        background: `linear-gradient(to right, white ${(currentTime) * 100}%, transparent 0)`,
                                    }}
                                />
                            </div>

                            {/* Play/Pause/Restart */}
                            <div className="flex justify-center items-center gap-6">
                                <div className="relative">
                                    <button
                                        onClick={togglePlay}
                                        className="
                                                        w-16 h-16 rounded-full bg-white flex items-center justify-center
                                                        hover:bg-blue-50 transition-colors shadow-lg
                                                      "
                                    >
                                        {isPlaying ? (
                                            <Pause className="w-8 h-8 text-[#0A2C74]" />
                                        ) : (
                                            <Play className="w-8 h-8 text-[#0A2C74] ml-1" />
                                        )}
                                    </button>
                                    <div className="
                                    absolute top-1/2
                                    -left-10
                                    md:-left-20 sm:-left-16 transform: -translate-1/2
                                    hover:bg-white rounded-full transition-all duration-150
                                    ">
                                        <button
                                            onClick={restartSong}
                                            className="w-10 h-10 flex items-center justify-center text-white transition-colors
                                            hover:bg-white-50
                                            hover:text-[#0A2C74]
                                            "
                                            title="Replay from start"
                                        >
                                            <RotateCcw className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <audio
                                ref={audioRef}
                                src="https://sttb.ac.id/storage/2022/05/Audio-Mars-STTB.mp3"
                                onEnded={() => setIsPlaying(false)}
                            />
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Lyrics – scrollable + highlighting */}
            <section className="py-14 bg-gray-50 dark:bg-gray-950">
                <div className="w-fit mx-auto px-4">
                    <FadeIn>
                        <div className="text-center mb-4">
                            <p className="text-[#E62129] text-sm font-semibold uppercase tracking-wider mb-2">
                                Lirik
                            </p>
                            <h2 className="text-gray-900 dark:text-white font-bold text-2xl">
                                Mars STT Bandung
                            </h2>
                        </div>
                    </FadeIn>

                    <div
                        ref={lyricsContainerRef}
                        className="
              max-h-[20vh] no-scrollbar overflow-y-auto scrollbar-thin grid place-items-center
              space-y-4 py-4 px-12
            "
                    >
                        {syncedLyrics.map((lyric, idx) => (
                            <motion.p
                                key={idx}
                                className={`
                  text-center text-lg leading-relaxed transition-all duration-300 w-fit  rounded-full
                  ${idx === activeIndex
                                        ? 'text-white font-bold scale-105 bg-[#0A2C74] mb-4 py-2 px-4'
                                        : 'text-gray-600 dark:text-white'
                                    }
                `}
                                animate={idx === activeIndex ? { scale: 1.05 } : { scale: 1 }}
                            >
                                {lyric.text}
                            </motion.p>
                        ))}
                    </div>
                </div>
            </section>

            {/* Attribution */}
            <section className="py-10 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        © Mars STT Bandung · Hak Cipta dilindungi. Karya:{" "}
                        <strong className="text-gray-700 dark:text-gray-300">Dorothy I. Marx</strong>
                    </p>
                </div>
            </section>
        </>
    );
}