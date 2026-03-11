"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, LogIn, Shield } from "lucide-react";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { loginSchema } from "@/libs/schemas/login-schema";
import { cn } from "@/components/ui/utils";
import type { z } from "zod";

type LoginFormData = z.infer<typeof loginSchema>;

export default function AdminLoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { data: session, status } = useSession();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const from = searchParams.get("from") || searchParams.get("callbackUrl") || "/admin";

    // Redirect if already authenticated
    useEffect(() => {
        if (status === "authenticated" && session) {
            router.replace(from);
        }
    }, [status, session, router, from]);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true);
        try {
            const result = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
            });

            if (result?.ok) {
                toast.success("Berhasil masuk!");
                router.push(from);
            } else {
                toast.error(result?.error || "Email atau password salah!");
            }
        } catch (error) {
            toast.error("Terjadi kesalahan! Silakan coba lagi nanti");
            console.error("Login error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Don't render if already authenticated
    if (status === "authenticated") {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex">
            {/* Left panel */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#0A2C74] via-[#0A2C74] to-[#0570CD] p-12 flex-col justify-center gap-y-4 relative overflow-hidden">
                {/* Decorations */}
                <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/5 -translate-y-1/4 translate-x-1/4" />
                <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-[#E62129]/10 translate-y-1/4 -translate-x-1/4" />

                <div className="relative w-fit flex flex-col gap-y-4">
                    <Link
                        href="/"
                        className="w-fit flex-shrink-0"
                    >
                        <Image
                            src="/sttb-logo-only.png"
                            alt="STTB Logo"
                            width={256}
                            height={0}
                            sizes="h-auto"
                            priority
                        />
                    </Link>
                    <h1 className="text-white w-fit" style={{ fontSize: "2.5rem", fontWeight: 700, lineHeight: 1.2 }}>
                        Portal Admin<br />Sekolah Tinggi<br />Teologi Bandung
                    </h1>
                    <p className="text-blue-200 leading-relaxed max-w-sm">
                        Pengelola konten website STTB
                    </p>
                </div>

                <div className="relative space-y-4">
                    {[
                        "Manajemen Berita & Konten",
                        "Pengelolaan Kegiatan & Acara",
                        "Galeri Media",
                        "Pengaturan Halaman",
                    ].map((f) => (
                        <div key={f} className="flex items-center gap-3 text-blue-100">
                            <div className="w-6 h-6 rounded-full bg-[#E62129]/30 flex items-center justify-center flex-shrink-0">
                                <svg className="w-3 h-3 text-[#E62129]" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span className="text-sm">{f}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right panel - Login form */}
            <div className="flex-1 flex items-center justify-center p-6">
                <div className="w-full max-w-md">
                    {/* Mobile logo */}
                    <div className="flex items-center justify-center gap-3 mb-4 lg:hidden">
                        <div className="flex flex-col items-center gap-y-1">
                            <Link
                                href="/"
                                className="w-fit flex-shrink-0"
                            >
                                <Image
                                    src="/sttb-logo-only.png"
                                    alt="STTB Logo"
                                    width={128}
                                    height={0}
                                    sizes="h-auto"
                                    priority
                                />
                            </Link>
                            <div className="text-gray-500 text-sm font-semibold">Portal Admin</div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-[#E62129]/10 flex items-center justify-center">
                                <Shield className="w-5 h-5 text-[#E62129]" />
                            </div>
                            <div>
                                <h2 className="text-gray-900 dark:text-white font-bold">Masuk ke Portal</h2>
                                <p className="text-gray-500 dark:text-gray-400 text-xs">
                                    Khusus staf & admin STTB
                                </p>
                            </div>
                        </div>

                        {/* Demo credentials notice */}
                        <div className="mb-5 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-900/30">
                            <p className="text-blue-700 dark:text-blue-300 text-xs">
                                <strong>Masukkan email dan password admin</strong> yang telah didaftarkan oleh backend.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            <div>
                                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1.5">
                                    Email <span className="text-[#E62129]">*</span>
                                </label>
                                <input
                                    {...register("email", {
                                        required: "Email wajib diisi",
                                        pattern: { value: /^\S+@\S+\.\S+$/, message: "Email tidak valid" },
                                    })}
                                    type="email"
                                    autoComplete="email"
                                    placeholder="admin@sttb.ac.id"
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-[#E62129] focus:ring-1 focus:ring-[#E62129]/30 transition-all"
                                />
                                {errors.email && (
                                    <p className="text-[#E62129] text-xs mt-1">{errors.email.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1.5">
                                    Password <span className="text-[#E62129]">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        {...register("password", {
                                            required: "Password wajib diisi",
                                            minLength: { value: 6, message: "Password minimal 6 karakter" },
                                        })}
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="current-password"
                                        placeholder="••••••••"
                                        className="w-full px-4 py-2.5 pr-11 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-[#E62129] focus:ring-1 focus:ring-[#E62129]/30 transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                        aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-[#E62129] text-xs mt-1">{errors.password.message}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting || isLoading}
                                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#E62129] hover:bg-[#c4131a] text-white font-medium transition-all disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-md"
                            >
                                {isSubmitting || isLoading ? (
                                    <>
                                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        Memproses...
                                    </>
                                ) : (
                                    <>
                                        <LogIn className="w-4 h-4" /> Masuk
                                    </>
                                )}
                            </button>
                        </form>

                        <p className="mt-5 text-center text-xs text-gray-400">
                            Halaman ini khusus untuk staf dan admin STTB. Tidak memiliki akun?{" "}
                            <a href="mailto:it@sttb.ac.id" className="text-[#E62129] hover:underline">
                                Hubungi IT
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
