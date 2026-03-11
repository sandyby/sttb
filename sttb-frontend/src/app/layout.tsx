import { ReactNode } from "react";
import "./globals.css"
import { Toaster } from "sonner";
import { Providers } from "./providers";

export default function PublicRouteLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    {children}
                    <Toaster position="top-right" richColors />
                </Providers>
            </body>
        </html >
    )
}