
"use client";

import Link from "next/link";
import { Newspaper, Calendar, Users, TrendingUp, Eye, ArrowRight, Plus, Loader2, Image as LucideImage } from "lucide-react";
import Image from "next/image";
import { useAdminDashboard } from "@/hooks/useAdminDashboard";
import { getImageUrl } from "@/libs/api";

export default function AdminDashboardPage() {
    const { stats: dashboardStats, recentNews, upcomingEvents, isLoading } = useAdminDashboard();

    const stats = [
        { label: "Total Berita", value: dashboardStats.totalNews, icon: Newspaper, color: "bg-red-50 dark:bg-red-900/20 text-[#E62129]", change: "+3 bulan ini" },
        { label: "Kegiatan Aktif", value: dashboardStats.activeEvents, icon: Calendar, color: "bg-blue-50 dark:bg-blue-900/20 text-[#0A2C74]", change: "+2 minggu ini" },
        { label: "Media Files", value: dashboardStats.totalMedia, icon: LucideImage, color: "bg-sky-50 dark:bg-sky-900/20 text-[#0570CD]", change: "+5 bulan ini" },
        { label: "Pengunjung/Bulan", value: dashboardStats.visitors, icon: Eye, color: "bg-purple-50 dark:bg-purple-900/20 text-purple-600", change: "+18% vs bulan lalu" },
    ];
    return (
        <div className="space-y-6">
            {/* Welcome */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-gray-900 dark:text-white" style={{ fontSize: "1.5rem", fontWeight: 700 }}>
                        Dashboard
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">
                        {new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                    </p>
                </div>
                <Link
                    href="/admin/news"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#E62129] hover:bg-[#c4131a] text-white text-sm font-medium transition-colors"
                >
                    <Plus className="w-4 h-4" /> Buat Berita
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((s) => {
                    const Icon = s.icon;
                    return (
                        <div key={s.label} className="bg-white dark:bg-gray-900 rounded-xl p-5 border border-gray-100 dark:border-gray-800 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-default">
                            <div className="flex items-center justify-between mb-3">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${s.color}`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <TrendingUp className="w-4 h-4 text-green-500" />
                            </div>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{s.value}</p>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">{s.label}</p>
                            <p className="text-green-600 dark:text-green-400 text-xs mt-1">{s.change}</p>
                        </div>
                    );
                })}
            </div>

            <div className="grid lg:grid-cols-3 gap-5">
                {/* Latest news */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                    <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800">
                        <h2 className="text-gray-900 dark:text-white font-semibold">Berita Terbaru</h2>
                        <Link href="/admin/news" className="text-[#E62129] text-xs hover:underline flex items-center gap-1">
                            Kelola Semua <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>
                    <div className="divide-y divide-gray-50 dark:divide-gray-800 min-h-[300px]">
                        {isLoading ? (
                            <div className="flex items-center justify-center py-20 text-gray-400">
                                <Loader2 className="w-6 h-6 animate-spin mr-2" />
                                Loading news...
                            </div>
                        ) : recentNews.length === 0 ? (
                            <div className="text-center py-20 text-gray-400 italic text-sm">Belum ada berita.</div>
                        ) : (
                            recentNews.map((article) => (
                                <div key={article.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                    <Image
                                        src={getImageUrl(article.thumbnailUrl) || "/images/placeholder.jpg"}
                                        alt={article.title}
                                        width={48}
                                        height={40}
                                        className="w-12 h-10 object-cover rounded-lg flex-shrink-0"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-gray-900 dark:text-white text-sm font-medium line-clamp-1">{article.title}</p>
                                        <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">
                                            {new Date(article.publishedAt || article.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                                        </p>
                                    </div>
                                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${article.isPublished
                                        ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                                        : "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400"
                                        }`}>
                                        {article.isPublished ? "Terbit" : "Draft"}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Quick actions + Upcoming events */}
                <div className="space-y-5">
                    {/* Quick actions */}
                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5">
                        <h2 className="text-gray-900 dark:text-white font-semibold mb-4">Aksi Cepat</h2>
                        <div className="space-y-2">
                            {[
                                { label: "Tambah Berita", href: "/admin/news/create", icon: Newspaper, color: "text-[#E62129] bg-red-50 dark:bg-red-900/20" },
                                { label: "Tambah Kegiatan", href: "/admin/events/create", icon: Calendar, color: "text-[#0A2C74] bg-blue-50 dark:bg-blue-900/20" },
                                { label: "Upload Media", href: "/admin/media", icon: LucideImage, color: "text-[#0570CD] bg-sky-50 dark:bg-sky-900/20" },
                            ].map((action) => {
                                const Icon = action.icon;
                                return (
                                    <Link
                                        key={action.label}
                                        href={action.href}
                                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                    >
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${action.color}`}>
                                            <Icon className="w-4 h-4" />
                                        </div>
                                        <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                                            {action.label}
                                        </span>
                                        <ArrowRight className="w-3.5 h-3.5 text-gray-400 ml-auto" />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Upcoming events */}
                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
                            <h2 className="text-gray-900 dark:text-white font-semibold text-sm">Kegiatan Mendatang</h2>
                            <Link href="/admin/events" className="text-[#E62129] text-xs hover:underline">
                                Lihat Semua
                            </Link>
                        </div>
                        <div className="divide-y divide-gray-50 dark:divide-gray-800 min-h-[200px]">
                            {isLoading ? (
                                <div className="flex items-center justify-center py-10 text-gray-400">
                                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                    <span className="text-sm">Loading events...</span>
                                </div>
                            ) : upcomingEvents.length === 0 ? (
                                <div className="text-center py-10 text-gray-400 italic text-xs">Tidak ada kegiatan mendatang.</div>
                            ) : (
                                upcomingEvents.map((event) => {
                                    const date = new Date(event.startDate);
                                    return (
                                        <div key={event.id} className="flex items-start gap-3 p-4">
                                            <div className="w-10 h-10 rounded-lg bg-[#E62129] flex flex-col items-center justify-center text-white flex-shrink-0">
                                                <span className="text-sm font-bold leading-none">
                                                    {date.getDate().toString().padStart(2, "0")}
                                                </span>
                                                <span className="text-xs opacity-80 uppercase">
                                                    {date.toLocaleDateString("id-ID", { month: "short" })}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="text-gray-900 dark:text-white text-xs font-medium line-clamp-1">
                                                    {event.title}
                                                </p>
                                                <p className="text-gray-400 text-xs mt-0.5">{event.location}</p>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
