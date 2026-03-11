'use client';

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/hooks/stores/auth-store";
import { AdminLayout } from "@/components/layout/AdminLayout";

export default function AdminRouteLayout({
    children,
}: {
    children: ReactNode;
}) {
    const router = useRouter();
    const { isAuthenticated, user } = useAuthStore();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted && !isAuthenticated) {
            const currPath = window.location.pathname;
            router.replace(`/admin/login?currPath=${encodeURIComponent(currPath)}`);
        }
    }, [isAuthenticated, isMounted, router]);

    if (!isMounted || !isAuthenticated) {
        return <div className="min-h-screen flex items-center justify-center">Redirecting...</div>;
    }

    return (
        <AdminLayout>
            {children}
        </AdminLayout>
    );
}