"use client";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useStore } from "@/lib/store";
import Image from "next/image";

export default function GlobalLoader() {
  const { isLoading, message, stopLoading } = useStore();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Clear loading state on route change completion
  useEffect(() => {
    // Artificial small delay to make the brutal animation visible
    const timer = setTimeout(() => {
      stopLoading();
    }, 400);
    return () => clearTimeout(timer);
  }, [pathname, searchParams, stopLoading]);

  if (!isLoading) return null;

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 99999,
      background: "rgba(10, 10, 10, 0.5)",
      backdropFilter: "blur(6px)",
      WebkitBackdropFilter: "blur(6px)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Animated logo */}
        <div style={{
          width: 80, height: 80, border: "4px solid var(--color-primary)",
          clipPath: "polygon(22% 0%, 78% 0%, 100% 22%, 100% 78%, 78% 100%, 22% 100%, 0% 78%, 0% 22%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 32,
          animation: "pulse-impact 1s infinite",
          background: "black"
        }}>
          <Image src="/loader-icon.png" width={56} height={56} alt="Loading" className="animate-spin" style={{ animationDuration: "3s" }} />
        </div>
        
        {/* Brutalist text */}
        <div style={{ fontFamily: "var(--font-display)", fontSize: 32, textTransform: "uppercase", color: "white", letterSpacing: "4px" }}>
          {message}
        </div>
        
        <div style={{ marginTop: 20, width: 200, height: 4, background: "var(--neutral-800)", overflow: "hidden" }}>
          <div style={{ width: "100%", height: "100%", background: "var(--color-primary)", animation: "marquee-slide-right 1s infinite linear" }} />
        </div>
      </div>
    </div>
  );
}
