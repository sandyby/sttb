"use client";

import React, { ReactNode, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Newspaper,
  Calendar,
  Image as ImageIcon,
  FileText,
  LogOut,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  Bell,
  Settings,
  Users,
  Plus,
  Edit,
  ExternalLink,
} from "lucide-react";
import { cn } from "../ui/utils";
import { useSession, signOut } from "next-auth/react";
import { Toaster } from "sonner";

/* ─── Nav structure ──────────────────────────────────────── */

interface NavChild {
  label: string;
  href: string;
  icon?: React.ElementType;
}

interface NavGroup {
  label: string;
  href: string;
  icon: React.ElementType;
  children?: NavChild[];
}

const navGroups: NavGroup[] = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Berita",
    href: "/admin/news",
    icon: Newspaper,
    children: [
      { label: "Semua Berita", href: "/admin/news", icon: Newspaper },
      { label: "Tambah Baru", href: "/admin/news/create", icon: Plus },
    ],
  },
  {
    label: "Kegiatan",
    href: "/admin/events",
    icon: Calendar,
    children: [
      { label: "Semua Kegiatan", href: "/admin/events", icon: Calendar },
      { label: "Tambah Baru", href: "/admin/events/create", icon: Plus },
    ],
  },
  {
    label: "Media",
    href: "/admin/media",
    icon: ImageIcon,
  },
  {
    label: "Halaman",
    href: "/admin/pages",
    icon: FileText,
  },
  {
    label: "Pengguna",
    href: "/admin/users",
    icon: Users,
  },
];

/* ─── Sidebar NavItem ────────────────────────────────────── */

function SidebarItem({
  group,
  onClose,
}: {
  group: NavGroup;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const Icon = group.icon;
  const isActive = pathname === group.href || pathname.startsWith(group.href + "/");
  const [expanded, setExpanded] = useState(isActive);

  if (!group.children) {
    return (
      <li>
        <Link
          href={group.href}
          onClick={onClose}
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
            isActive
              ? "bg-[#E62129] text-white shadow-md"
              : "text-blue-100/80 hover:bg-white/10 hover:text-white",
          )}
        >
          <Icon className="w-4 h-4 flex-shrink-0" />
          <span className="flex-1">{group.label}</span>
          {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-60" />}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <button
        onClick={() => setExpanded(e => !e)}
        className={cn(
          "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
          isActive
            ? "bg-white/10 text-white"
            : "text-blue-100/80 hover:bg-white/10 hover:text-white",
        )}
      >
        <Icon className="w-4 h-4 flex-shrink-0" />
        <span className="flex-1 text-left">{group.label}</span>
        {isActive && (
          <span className="w-1.5 h-1.5 rounded-full bg-[#E62129] mr-1" />
        )}
        <ChevronDown
          className={cn("w-3.5 h-3.5 transition-transform opacity-60", expanded ? "rotate-180" : "")}
        />
      </button>

      {expanded && (
        <ul className="mt-1 ml-3 pl-3 border-l border-white/10 space-y-0.5">
          {group.children.map(child => {
            const CIcon = child.icon;
            const childActive = pathname === child.href;
            return (
              <li key={child.href}>
                <Link
                  href={child.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-all",
                    childActive
                      ? "bg-[#E62129] text-white"
                      : "text-blue-200/70 hover:bg-white/10 hover:text-white",
                  )}
                >
                  {CIcon && <CIcon className="w-3.5 h-3.5 flex-shrink-0" />}
                  {child.label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
}

/* ─── Breadcrumb helper ──────────────────────────────────── */

function getBreadcrumb(pathname: string): { parent?: string; current: string } {
  if (pathname.includes("/news/create")) return { parent: "Berita", current: "Tambah Baru" };
  if (pathname.match(/\/news\/\w+\/edit/)) return { parent: "Berita", current: "Edit Berita" };
  if (pathname.includes("/events/create")) return { parent: "Kegiatan", current: "Tambah Baru" };
  if (pathname.match(/\/events\/\w+\/edit/)) return { parent: "Kegiatan", current: "Edit Kegiatan" };
  const found = navGroups.find(n => n.href === pathname);
  return { current: found?.label ?? "Admin" };
}

/* ─── Layout ─────────────────────────────────────────────── */

export function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/admin/login" });
  };

  const closeSidebar = () => setSidebarOpen(false);
  const breadcrumb = getBreadcrumb(pathname);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* ─── Sidebar ─────────────────────────────────────────── */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-60 flex flex-col z-50 transition-transform duration-300",
          "bg-[#0A2C74] dark:bg-[#061840] text-white",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Logo */}
        <div className="px-4 py-4 border-b border-white/10 flex items-center justify-between">
          <Link href="/admin/dashboard" className="flex items-center gap-2.5" onClick={closeSidebar}>
            <Link
              href="/"
              className="w-fit flex-shrink-0"
            >
              <Image
                src="/sttb-logo-only.png"
                alt="STTB Logo"
                width={120}
                height={0}
                sizes="h-auto"
                priority
              />
            </Link>
            <div>
              <div className="font-bold text-sm leading-tight">STTB Admin</div>
              <div className="text-blue-300 text-xs opacity-80">Portal CMS</div>
            </div>
          </Link>
          <button onClick={closeSidebar} className="lg:hidden text-white/50 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* User info */}
        {
          user && (
            <div className="px-4 py-3 border-b border-white/10 flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-[#E62129] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {(user.name || "A").charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="mb-1">
                  <p className="text-white text-xs font-semibold truncate">{user.name}</p>
                  <p className="text-white/50 text-xs font-semibold truncate">{user.email}</p>
                </div>
                <p className="text-blue-300 text-xs capitalize opacity-80">{user.role}</p>
              </div>
            </div>
          )
        }

        {/* Nav */}
        <nav className="flex-1 py-3 px-3 overflow-y-auto space-y-1 no-scrollbar">
          <p className="text-blue-300/60 text-xs font-semibold uppercase tracking-widest px-3 mb-2">Menu Utama</p>
          <ul className="space-y-0.5">
            {navGroups.map(group => (
              <SidebarItem key={group.href} group={group} onClose={closeSidebar} />
            ))}
          </ul>

          {/* Separator */}
          <div className="my-3 border-t border-white/10" />

          {/* Quick actions */}
          <p className="text-blue-300/60 text-xs font-semibold uppercase tracking-widest px-3 mb-2">Aksi Cepat</p>
          <ul className="space-y-0.5">
            <li>
              <Link href="/admin/news/create" onClick={closeSidebar}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-blue-100/70 hover:bg-white/10 hover:text-white transition-all">
                <Plus className="w-3.5 h-3.5" /> Tulis Berita
              </Link>
            </li>
            <li>
              <Link href="/admin/events/create" onClick={closeSidebar}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-blue-100/70 hover:bg-white/10 hover:text-white transition-all">
                <Plus className="w-3.5 h-3.5" /> Tambah Kegiatan
              </Link>
            </li>
            <li>
              <Link href="/" target="_blank"
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-blue-100/70 hover:bg-white/10 hover:text-white transition-all">
                <ExternalLink className="w-3.5 h-3.5" /> Lihat Website
              </Link>
            </li>
          </ul>
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-white/10 space-y-0.5">
          <Link href="/admin/settings" onClick={closeSidebar}
            className={cn("flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
              pathname === "/admin/settings" ? "bg-[#E62129] text-white" : "text-blue-100/80 hover:bg-white/10 hover:text-white")}>
            <Settings className="w-4 h-4" /> Pengaturan
          </Link>
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-blue-100/80 hover:bg-red-500/20 hover:text-red-300 transition-all">
            <LogOut className="w-4 h-4" /> Keluar
          </button>
        </div>
      </aside >

      {/* ─── Main content ─────────────────────────────────────── */}
      < div className="flex-1 lg:ml-60 flex flex-col min-h-screen" >
        {/* Topbar */}
        < header className="sticky top-0 z-30 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center gap-3 shadow-sm" >
          <button onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <Menu className="w-5 h-5" />
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-sm flex-1">
            <Link href="/admin/dashboard" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors hidden sm:inline">Admin</Link>
            {breadcrumb.parent && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-gray-300 hidden sm:block" />
                <span className="text-gray-500 dark:text-gray-400 hidden sm:inline">{breadcrumb.parent}</span>
              </>
            )}
            <ChevronRight className="w-3.5 h-3.5 text-gray-300 hidden sm:block" />
            <span className="text-gray-900 dark:text-white font-semibold">{breadcrumb.current}</span>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-xl text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#E62129] rounded-full" />
            </button>
            {/* Admin Login indicator */}
            {user && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-400">
                <div className="w-5 h-5 rounded-full bg-[#E62129] flex items-center justify-center text-white font-bold" style={{ fontSize: "0.6rem" }}>
                  {(user.name || "A").charAt(0)}
                </div>
                <span className="font-medium">{user.name}</span>
                <button onClick={handleLogout} className="ml-1 text-gray-400 hover:text-[#E62129] transition-colors" title="Keluar">
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </header >

        {/* Page */}
        < main className="flex-1 p-5 overflow-auto" >
          {children}
        </main >
      </div >

      <Toaster position="top-right" richColors />
    </div >
  );
}
