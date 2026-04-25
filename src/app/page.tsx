"use client";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";

import NormalHome from "@/components/home/NormalHome";
import FighterHome from "@/components/home/FighterHome";
import GymHome from "@/components/home/GymHome";

export default function HomePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/landing");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div style={{ minHeight: "100dvh", background: "var(--color-bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 44, height: 44, background: "var(--color-primary)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 900, margin: "0 auto 16px" }}>EC</div>
          <div style={{ fontSize: 13, color: "var(--color-text-muted)", fontFamily: "var(--font-display)" }}>Cargando…</div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <AppShell role={user.role}>
      {user.role === "fighter" && <FighterHome user={user} />}
      {user.role === "gym"     && <GymHome user={user} />}
      {user.role === "normal"  && <NormalHome user={user} />}
    </AppShell>
  );
}

