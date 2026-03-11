'use client';

import { ReactNode } from "react";
import { useSession } from "next-auth/react";
import { AdminLayout } from "@/components/layout/AdminLayout";

export default function AdminRouteLayout({
    children,
}: {
    children: ReactNode;
}) {
    const { status } = useSession({ required: true });

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
                <div className="flex flex-col items-center gap-4">
                    <svg className="animate-spin w-8 h-8 text-[#E62129]" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span className="text-gray-500 font-medium text-sm">Memuat Portal...</span>
                </div>
            </div>
        );
    }

    return (
        <AdminLayout>
            {children}
        </AdminLayout>
    );
}