"use client";

import { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/ui/BackToTop";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";

export default function PublicLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <Header />
      <motion.main
        key={pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.main>
      <Footer />
      <BackToTop />
    </>
  );
}

