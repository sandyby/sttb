"use client";

import { LucideIcon, Plus } from "lucide-react";
import Link from "next/link";
import { cn } from "@/components/ui/utils";

interface AdminEmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
}

export function AdminEmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
  className,
}: AdminEmptyStateProps) {
  return (
    <div className={cn("text-center py-20 bg-white dark:bg-gray-900 rounded-xl border border-dashed border-gray-200 dark:border-gray-800", className)}>
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-300 dark:text-gray-600">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-gray-900 dark:text-white font-semibold mb-1">
        {title}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs mx-auto mb-6">
        {description}
      </p>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#E62129] hover:bg-[#c4131a] text-white text-sm font-medium transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
