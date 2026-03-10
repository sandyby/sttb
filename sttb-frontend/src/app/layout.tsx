'use client';

import { PublicLayout } from "@/components/layout/PublicLayout";
import { ReactNode } from "react";
import "./globals.css"

export default function PublicRouteLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <main>
                    <PublicLayout>
                        {children}
                    </PublicLayout>
                </main>
            </body>
        </html>
    )
}