"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function BrutalistModal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") router.back(); };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  if (!mounted) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(4px)",
      display: "flex", justifyContent: "center", alignItems: "flex-end",
    }}>
      <style>{`
        @keyframes slideUp { 
          from { transform: translateY(100%); opacity: 0.5; } 
          to { transform: translateY(0); opacity: 1; } 
        }
      `}</style>
      
      {/* Click outside to close */}
      <div style={{ position: "absolute", inset: 0 }} onClick={() => router.back()} />

      <div style={{
        position: "relative", width: "100%", maxWidth: 640, height: "85vh", overflowY: "auto",
        background: "var(--color-bg)", borderTop: "4px solid var(--color-primary)",
        boxShadow: "0 -20px 60px rgba(255,0,0,0.15)",
        animation: "slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
      }}>
        {/* Close Strip */}
        <div onClick={() => router.back()} style={{
          position: "sticky", top: 0, right: 0, width: "100%", padding: "16px",
          background: "black", borderBottom: "2px solid var(--color-border)",
          color: "white", fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 13,
          textTransform: "uppercase", letterSpacing: "2px", display: "flex", justifyContent: "center", alignItems: "center",
          gap: 10, zIndex: 10, cursor: "pointer"
        }}>
          <div style={{ width: 12, height: 12, background: "var(--color-primary)", transform: "rotate(45deg)" }} />
          CERRAR PANEL
        </div>
        
        {/* Child Content */}
        {children}
      </div>
    </div>
  );
}
