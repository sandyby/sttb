import { ReactNode } from "react";
import "./globals.css"
import { Toaster } from "sonner";
import { QueryProvider } from "@/providers/QueryProvider";

export default function PublicRouteLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <QueryProvider>
                    {children}
                    <Toaster position="top-right" richColors />
                </QueryProvider>
            </body>
        </html>
    )
}