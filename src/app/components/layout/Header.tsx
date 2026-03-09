"use client";

import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronDown,
  Menu,
  X,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Youtube,
  ExternalLink,
  Shield,
} from "lucide-react";
import { cn } from "../ui/utils";

/* ─── Nav data ───────────────────────────────────────────── */

interface NavChild {
  label: string;
  href?: string;
  external?: boolean;
}
interface NavItem {
  label: string;
  href?: string;
  children?: NavChild[];
}

const navItems: NavItem[] = [
  {
    label: "Tentang Kami",
    children: [
      { label: "Sejarah", href: "/sejarah" },
      { label: "Visi & Misi", href: "/visi-misi" },
      { label: "Mars STTB", href: "/mars-sttb" },
      { label: "Pengakuan Iman", href: "/pengakuan-iman" },
      { label: "Dewan Dosen", href: "/dewan-dosen" },
      { label: "Yayasan", href: "/pengurus-yayasan" },
    ],
  },
  {
    label: "Akademik",
    children: [
      { label: "Sarjana Teologi", href: "/sarjana-teologi" },
      {
        label: "Sarjana Pendidikan Kristen",
        href: "/sarjana-pendidikan-kristen",
      },
      {
        label: "MTh – Pelayanan Pastoral Gereja Urban",
        href: "/magister-teologi-pelayanan-pastoral-gereja-urban",
      },
      {
        label: "MMin – Teologi Pelayanan Gerejawi",
        href: "/magister-ministri-teologi-pelayanan-gerejawi",
      },
      {
        label: "Magister Pendidikan Kristen",
        href: "/magister-pendidikan-kristen",
      },
      {
        label: "MMin – Marketplace",
        href: "/magister-ministri-marketplace",
      },
      {
        label: "MMin – Kepemimpinan Pastoral",
        href: "/magister-ministri-kepemimpinan-pastoral",
      },
      {
        label: "MTh – Transformasi Budaya & Masyarakat",
        href: "/magister-teologi-transformasi-budaya-masyarakat",
      },
    ],
  },
  {
    label: "Admisi",
    children: [
      {
        label: "Pendaftaran Online",
        href: "http://sis.sttb.ac.id/pmb",
        external: true,
      },
      { label: "Jadwal Admisi", href: "/jadwal-admisi" },
      { label: "Prosedur Admisi", href: "/prosedur-admisi" },
      {
        label: "Info Persyaratan",
        href: "/informasi-persyaratan",
      },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    label: "Keuangan",
    children: [
      { label: "Biaya Studi", href: "/biaya-studi" },
      { label: "Beasiswa", href: "/beasiswa" },
      { label: "Dukung STTB", href: "/dukung-sttb" },
    ],
  },
  {
    label: "Kehidupan Kampus",
    children: [
      { label: "Fasilitas", href: "/fasilitas" },
      { label: "Pembinaan", href: "/pembinaan" },
      { label: "Senat", href: "/senat" },
    ],
  },
  { label: "Kegiatan", href: "/kegiatan" },
  { label: "Berita", href: "/berita" },
  { label: "Media", href: "/media" },
  { label: "LEAD", href: "/lead" },
  { label: "Perpustakaan", href: "/perpustakaan" },
];

/* ─── Desktop dropdown ───────────────────────────────────── */

function DesktopDropdown({
  items,
  isVisible,
}: {
  items: NavChild[];
  isVisible: boolean;
}) {
  return (
    <div
      className={cn(
        "absolute top-full left-0 mt-1.5 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 min-w-64 z-50 py-2 transition-all duration-200 origin-top",
        isVisible
          ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto"
          : "opacity-0 scale-y-95 -translate-y-1 pointer-events-none",
      )}
    >
      {items.map((item, i) =>
        item.external ? (
          <a
            key={i}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-[#E62129] transition-colors group"
          >
            {item.label}
            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        ) : (
          <Link
            key={i}
            to={item.href!}
            className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-[#E62129] transition-colors"
          >
            {item.label}
          </Link>
        ),
      )}
    </div>
  );
}

/* ─── Mobile menu item ───────────────────────────────────── */

function MobileNavItem({
  item,
  onClose,
  delay,
}: {
  item: NavItem;
  onClose: () => void;
  delay: number;
}) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const itemVariants = {
    hidden: { opacity: 0, x: -16 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay,
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      opacity: 0,
      x: -16,
      transition: { duration: 0.15 },
    },
  };

  if (!item.children) {
    const isActive = location.pathname === item.href;
    return (
      <motion.div variants={itemVariants}>
        <Link
          to={item.href!}
          onClick={onClose}
          className={cn(
            "flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors",
            isActive
              ? "bg-[#E62129]/10 text-[#E62129]"
              : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800",
          )}
        >
          {item.label}
          {isActive && (
            <div className="w-1.5 h-1.5 rounded-full bg-[#E62129]" />
          )}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div variants={itemVariants}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        {item.label}
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="overflow-hidden"
          >
            <div className="ml-4 mt-1 mb-2 pl-3 border-l-2 border-[#E62129]/20 space-y-0.5">
              {item.children.map((child, ci) =>
                child.external ? (
                  <a
                    key={ci}
                    href={child.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 py-2 px-2 rounded-lg text-sm text-gray-600 dark:text-gray-300 hover:text-[#E62129] hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                  >
                    {child.label}{" "}
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                ) : (
                  <Link
                    key={ci}
                    to={child.href!}
                    onClick={onClose}
                    className="block py-2 px-2 rounded-lg text-sm text-gray-600 dark:text-gray-300 hover:text-[#E62129] hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                  >
                    {child.label}
                  </Link>
                ),
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Header ─────────────────────────────────────────────── */

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<
    string | null
  >(null);
  const hoverTimeout = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, {
      passive: true,
    });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const onEnter = (label: string) => {
    if (hoverTimeout.current)
      clearTimeout(hoverTimeout.current);
    setActiveDropdown(label);
  };
  const onLeave = () => {
    hoverTimeout.current = setTimeout(
      () => setActiveDropdown(null),
      130,
    );
  };

  const isHomePage = location.pathname === "/";
  const transparent = !isScrolled && isHomePage && !mobileOpen;

  const menuVariants = {
    hidden: { opacity: 0, y: -8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.25,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.04,
        delayChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      y: -8,
      transition: {
        duration: 0.2,
        staggerChildren: 0.02,
        staggerDirection: -1,
      },
    },
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* ── Topbar (desktop only) ────────────────────────── */}
      <div className="bg-[#0A2C74] text-white text-xs py-1.5 px-4 hidden xl:block">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a
              href="tel:+62222012010"
              className="flex items-center gap-1.5 hover:text-[#7FB4E5] transition-colors"
            >
              <Phone className="w-3 h-3" />
              (022) 201-2010
            </a>
            <a
              href="mailto:info@sttb.ac.id"
              className="flex items-center gap-1.5 hover:text-[#7FB4E5] transition-colors"
            >
              <Mail className="w-3 h-3" />
              info@sttb.ac.id
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gray-300">Ikuti kami:</span>
            {[
              {
                href: "https://facebook.com/sttbbandung",
                Icon: Facebook,
                label: "Facebook",
              },
              {
                href: "https://instagram.com/sttb_bandung",
                Icon: Instagram,
                label: "Instagram",
              },
              {
                href: "https://youtube.com/@sttbbandung",
                Icon: Youtube,
                label: "YouTube",
              },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="hover:text-[#7FB4E5] transition-colors"
              >
                <Icon className="w-3.5 h-3.5" />
              </a>
            ))}
            <div className="w-px h-3 bg-white/30 mx-1" />
            <Link
              to="/admin/login"
              className="flex items-center gap-1.5 hover:text-[#7FB4E5] transition-colors font-medium"
            >
              <Shield className="w-3 h-3" />
              Portal Staff
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main navbar ──────────────────────────────────── */}
      <nav
        className={cn(
          "transition-all duration-300",
          transparent
            ? "bg-transparent"
            : "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-md",
        )}
      >
        <div className="max-w-screen-2xl mx-auto px-4 flex items-center justify-between h-14">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 flex-shrink-0"
          >
            <div className="w-9 h-9 rounded-full bg-[#E62129] flex items-center justify-center text-white font-bold text-base shadow-sm">
              S
            </div>
            <div className="hidden sm:block">
              <div
                className={cn(
                  "font-bold text-sm leading-tight transition-colors",
                  transparent
                    ? "text-white"
                    : "text-[#0A2C74] dark:text-white",
                )}
              >
                STTB
              </div>
              <div
                className={cn(
                  "text-xs leading-tight transition-colors",
                  transparent
                    ? "text-white/70"
                    : "text-gray-400 dark:text-gray-400",
                )}
              >
                Sekolah Tinggi Teologi Bandung
              </div>
            </div>
          </Link>

          {/* Desktop nav — xl+ */}
          <div className="hidden xl:flex items-center gap-0.5 flex-1 justify-center px-4">
            {navItems.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => onEnter(item.label)}
                  onMouseLeave={onLeave}
                >
                  <button
                    className={cn(
                      "flex items-center gap-0.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap",
                      transparent
                        ? "text-white/90 hover:text-white hover:bg-white/10"
                        : "text-gray-700 dark:text-gray-200 hover:text-[#E62129] hover:bg-red-50 dark:hover:bg-red-900/20",
                    )}
                    aria-haspopup="true"
                    aria-expanded={
                      activeDropdown === item.label
                    }
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "w-3 h-3 transition-transform flex-shrink-0",
                        activeDropdown === item.label
                          ? "rotate-180"
                          : "",
                      )}
                    />
                  </button>
                  <DesktopDropdown
                    items={item.children}
                    isVisible={activeDropdown === item.label}
                  />
                </div>
              ) : (
                <Link
                  key={item.label}
                  to={item.href!}
                  className={cn(
                    "px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap",
                    transparent
                      ? "text-white/90 hover:text-white hover:bg-white/10"
                      : "text-gray-700 dark:text-gray-200 hover:text-[#E62129] hover:bg-red-50 dark:hover:bg-red-900/20",
                    location.pathname === item.href &&
                      !transparent
                      ? "text-[#E62129]"
                      : "",
                  )}
                >
                  {item.label}
                </Link>
              ),
            )}
          </div>

          {/* Right CTAs */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link
              to="/kontak-kami"
              className={cn(
                "hidden xl:inline-flex items-center px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors",
                transparent
                  ? "border-white/40 text-white hover:bg-white/10"
                  : "border-[#0A2C74] text-[#0A2C74] dark:border-blue-400 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20",
              )}
            >
              Kontak
            </Link>
            <Link
              to="/prosedur-admisi"
              className="hidden xl:inline-flex items-center px-3 py-1.5 rounded-lg bg-[#E62129] text-white text-xs font-medium hover:bg-[#c4131a] transition-all shadow-sm"
            >
              Daftar Sekarang
            </Link>

            {/* Hamburger — below xl */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className={cn(
                "xl:hidden p-2 rounded-xl transition-colors",
                transparent
                  ? "text-white hover:bg-white/10"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
              )}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile fullscreen overlay menu ───────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-14 bg-black/30 backdrop-blur-sm xl:hidden z-40"
              onClick={() => setMobileOpen(false)}
            />

            {/* Menu panel — slides down */}
            <motion.div
              key="menu"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={menuVariants}
              className="fixed top-14 left-0 right-0 xl:hidden z-50 max-h-[calc(100vh-56px)] flex flex-col bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-2xl"
            >
              {/* Scrollable nav items */}
              <div className="flex-1 overflow-y-auto overscroll-contain px-3 py-3 space-y-0.5">
                {navItems.map((item, i) => (
                  <MobileNavItem
                    key={item.label}
                    item={item}
                    onClose={() => setMobileOpen(false)}
                    delay={i * 0.04}
                  />
                ))}
              </div>

              {/* Footer CTAs */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.35, duration: 0.3 },
                  },
                }}
                className="px-3 py-4 border-t border-gray-100 dark:border-gray-800 space-y-2 flex-shrink-0 bg-gray-50 dark:bg-gray-800/50"
              >
                <Link
                  to="/kontak-kami"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-[#0A2C74]/30 text-[#0A2C74] dark:text-blue-300 text-sm font-medium hover:bg-[#0A2C74]/5 transition-colors"
                >
                  Kontak Kami
                </Link>
                <Link
                  to="/prosedur-admisi"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#E62129] text-white text-sm font-medium hover:bg-[#c4131a] transition-colors shadow-sm"
                >
                  Daftar Sekarang
                </Link>
                {/* Admin login — mobile */}
                <Link
                  to="/admin/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-xs font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Shield className="w-3.5 h-3.5" />
                  Portal Staff
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}