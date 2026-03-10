'use client';

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/hooks/stores/auth-store";
import { AdminLayout } from "@/components/layout/AdminLayout";   // your existing admin layout

export default function AdminRouteLayout({
    children,
}: {
    children: ReactNode;
}) {
    const { isAuthenticated, user } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.replace("/admin/login");
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
        return <div className="min-h-screen flex items-center justify-center">Redirecting...</div>;
    }

    return <AdminLayout>{children}</AdminLayout>;
}