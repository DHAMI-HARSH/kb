"use client";

import { useAuth } from "@/app/providers";
import Navbar from "@/app/components/navbar";
import FloatingChatButton from "@/app/components/floating-chat-button";
import PWAInstallButton from "@/app/components/pwa-install-button";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { loading } = useAuth();

  // 🔥 Prevent hydration mismatch until Firebase finishes
  if (loading) {
    return <div style={{ padding: "2rem", color: "white" }}>Loading...</div>;
  }

  return (
    <div className="app-container">
      <Navbar />
      <FloatingChatButton />
      <PWAInstallButton />
      {children}
    </div>
  );
}
