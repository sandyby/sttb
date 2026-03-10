import { ReactNode } from "react";
import "./globals.css"
import { Toaster } from "sonner";

export default function PublicRouteLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                {children}
                <Toaster position="top-right" richColors />
            </body>
        </html>
    )
}