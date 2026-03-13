"use client";

import React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { cn } from "@/components/ui/utils";
import { Variants } from "motion/react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

interface PageHeaderProps {
  title: string;
  category?: string;
  description?: string;
  breadcrumb?: { label: string; href: string }[];
  image?: string;
  backgroundImage?: string; // for backward compatibility
  className?: string;
  children?: React.ReactNode;
}

export default function PageHeader({
  title,
  category,
  description,
  breadcrumb,
  image,
  backgroundImage,
  className,
  children,
}: PageHeaderProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const heroImage = image || backgroundImage || "/images/hero-fallback.jpg";

  const isS1 = category?.toLowerCase().includes("s1") || false;

  return (
    <div
      className={cn(
        "relative w-full pt-32 pb-20 overflow-hidden bg-[#0A2C74]",
        className,
      )}
    >
      {/* Parallax Background */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br",
            isS1
              ? "from-primary-dark-accent via-primary/80 to-primary-light-accent/60"
              : "from-[#0A2C74]  via-[#0A2C74]/80 to-[#0570CD]/60",
          )}
        />
      </motion.div>

      {/* Signature STTB Shapes */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Trapezoid/Parallelogram overlays */}
        <div
          className="absolute top-0 right-0 w-1/3 h-full bg-[#E62129]/10"
          style={{ clipPath: "polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-[#7FB4E5]/5"
          style={{ clipPath: "polygon(0% 0%, 80% 0%, 100% 100%, 0% 100%)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Breadcrumb section */}
          {breadcrumb && breadcrumb.length > 0 && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-500">
              <Breadcrumb>
                <BreadcrumbList className="text-white/70">
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link
                        href="/"
                        className="hover:text-white transition-colors"
                      >
                        Beranda
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {breadcrumb.map((item, index) => (
                    <React.Fragment key={`${item.href}-${index}`}>
                      <BreadcrumbSeparator className="text-white/50" />
                      <BreadcrumbItem>
                        {index === breadcrumb.length - 1 ? (
                          <BreadcrumbPage className="text-white font-medium">
                            {item.label}
                          </BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink asChild>
                            <Link
                              href={item.href}
                              className="hover:text-white transition-colors"
                            >
                              {item.label}
                            </Link>
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    </React.Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          )}

          {/* Title & Category */}
          <div className="space-y-4">
            {category && (
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-3"
              >
                <div
                  className={cn("w-8 h-1", isS1 ? "bg-red-500" : "bg-blue-400")}
                />
                <span
                  className={cn(
                    "text-sm font-bold uppercase tracking-widest",
                    isS1 ? "text-red-500" : "text-blue-400",
                  )}
                >
                  {category}
                </span>
              </motion.div>
            )}

            <motion.h1
              variants={itemVariants}
              className="text-white leading-tight"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 800 }}
            >
              {title}
            </motion.h1>

            {description && (
              <motion.p
                variants={itemVariants}
                className="text-white/90 max-w-3xl text-lg leading-relaxed"
              >
                {description}
              </motion.p>
            )}

            {children && (
              <motion.div variants={itemVariants}>{children}</motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Bottom accent shape */}
      <div
        className="absolute -bottom-[1px] left-0 right-0 h-12 bg-white dark:bg-gray-900"
        style={{
          clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 100%)",
          transform: "translateZ(0)",
        }}
      />
    </div>
  );
}
