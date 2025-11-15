import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import "@/app/styles/animations.css";

import { AuthProvider } from "@/app/providers";
import ClientLayout from "@/app/components/client-layout";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Knowledge Bank Engine",
  description:
    "Explore knowledge from across the universe with AI-powered insights",
  manifest: "/manifest.json",
  icons: [
    { rel: "icon", sizes: "192x192", url: "/icon-192x192.png" },
    { rel: "icon", sizes: "512x512", url: "/icon-512x512.png" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>

      <body className="min-h-screen bg-background text-foreground">
        <AuthProvider>
          <ClientLayout>{children}</ClientLayout>
        </AuthProvider>

        {/* ✅ IMPORTANT FIX — register SW only in production */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (
                typeof window !== "undefined" &&
                "serviceWorker" in navigator &&
                window.location.hostname !== "localhost"
              ) {
                window.addEventListener("load", () => {
                  navigator.serviceWorker.register("/sw.js").catch(() => {});
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
