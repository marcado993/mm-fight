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
    <div className="modal-backdrop" style={{
      position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(4px)",
      display: "flex", justifyContent: "center",
    }}>
      <style>{`
        .modal-backdrop { align-items: flex-end; }
        .modal-content {
          width: 100%; max-width: 640px; height: 85vh; overflow-y: auto;
          background: var(--color-bg); border-top: 4px solid var(--color-primary);
          box-shadow: 0 -20px 60px rgba(255,0,0,0.15);
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
        }
        @media (min-width: 768px) {
          .modal-backdrop { align-items: center; }
          .modal-content {
            border: 4px solid var(--color-primary); height: 85vh; max-height: 800px;
            animation: popIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: 16px 16px 0px rgba(255,0,0,0.2);
          }
        }
        @keyframes slideUp { 
          from { transform: translateY(100%); opacity: 0.5; } 
          to { transform: translateY(0); opacity: 1; } 
        }
        @keyframes popIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .modal-close-strip {
          background: #111; color: var(--color-text-muted);
          transition: background 0.2s, color 0.2s;
        }
        .modal-close-strip:hover {
          background: var(--red-700); color: white;
        }
      `}</style>
      
      {/* Click outside to close */}
      <div style={{ position: "absolute", inset: 0 }} onClick={() => router.back()} />

      <div className="modal-content">
        {/* Close Strip */}
        <div onClick={() => router.back()} className="modal-close-strip" style={{
          position: "sticky", top: 0, right: 0, width: "100%", padding: "16px 20px",
          borderBottom: "2px solid var(--color-border)",
          fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 13,
          textTransform: "uppercase", letterSpacing: "2px", display: "flex", justifyContent: "space-between", alignItems: "center",
          zIndex: 10, cursor: "pointer"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 12, height: 12, background: "currentColor", transform: "rotate(45deg)", transition: "background 0.2s" }} className="close-diamond" />
            <span className="hidden md:inline">PRESIONA [ ESC ] O DA CLICK PARA </span>CERRAR PANEL
          </div>
          <div style={{ fontSize: 24, lineHeight: 1 }}>✕</div>
        </div>
        
        {/* Child Content */}
        {children}
      </div>
    </div>
  );
}
