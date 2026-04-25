"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import AppShell from "@/components/AppShell";
import { useAuth } from "@/lib/auth";
import Image from "next/image";
import { gyms } from "@/lib/data";
import type { GymMarker } from "@/components/GymMap";
import Link from "next/link";

// Dynamic import — Leaflet needs window (no SSR)
const GymMap = dynamic(() => import("@/components/GymMap"), {
  ssr: false,
  loading: () => (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "var(--neutral-900)", color: "var(--color-primary)",
      fontFamily: "var(--font-display)", fontSize: 24, textTransform: "uppercase"
    }}>
      INICIALIZANDO SATÉLITE...
    </div>
  ),
});

// Prepare gym markers for map
const gymMarkers: GymMarker[] = gyms.map(g => ({
  id: g.id,
  name: g.name,
  city: g.city,
  province: g.province,
  lat: g.lat,
  lng: g.lng,
  reputationScore: g.reputationScore,
  activeFighters: g.activeFighters,
  koRate: g.koRate,
}));

export default function GymsPage() {
  const { user } = useAuth();
  const [view, setView] = useState<"list" | "map">("list");
  const [sort, setSort] = useState<"rep" | "wins" | "fighters">("rep");
  const [activeGymId, setActiveGymId] = useState<string | undefined>(undefined);

  const sorted = [...gyms].sort((a, b) => {
    if (sort === "rep")      return b.reputationScore - a.reputationScore;
    if (sort === "wins")     return b.totalWins - a.totalWins;
    return b.activeFighters - a.activeFighters;
  });

  return (
    <AppShell role={user?.role || "normal"}>
      {/* ── Header ── */}
      <div style={{ padding: "clamp(20px, 5vw, 40px) clamp(16px, 4vw, 20px) 20px", background: "var(--color-surface)", borderBottom: "4px solid var(--color-primary)" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16, marginBottom: 24 }}>
          <div>
            <h1 style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: "var(--font-display)", fontSize: "clamp(32px, 8vw, 48px)", letterSpacing: "2px", lineHeight: 1, textTransform: "uppercase", marginBottom: 8 }}>
              <Image src="/icon_stadium.png" alt="Gyms" width={48} height={48} style={{ width: "clamp(32px, 8vw, 48px)", height: "auto" }} />
              CUARTELES
            </h1>
            <p style={{ fontSize: "clamp(12px, 3vw, 16px)", color: "var(--color-primary)", fontFamily: "var(--font-display)", textTransform: "uppercase", letterSpacing: "1px" }}>
              GIMNASIOS REGISTRADOS // {gyms.length} SEDES
            </p>
          </div>

          {/* View toggle */}
          <div style={{ display: "flex", border: "4px solid var(--color-text)", flexShrink: 0, width: "auto", overflow: "hidden" }}>
            {(["list", "map"] as const).map(v => (
              <button key={v} onClick={() => setView(v)} style={{
                padding: "16px 24px",
                background: view === v ? "var(--color-text)" : "transparent",
                border: "none", cursor: "pointer",
                fontFamily: "var(--font-display)", fontSize: "clamp(14px, 4vw, 20px)",
                textTransform: "uppercase", flex: 1,
                color: view === v ? "var(--color-bg)" : "var(--color-text)",
              }}>
                {v === "list" ? "LISTA" : "MAPA"}
              </button>
            ))}
          </div>
        </div>

        {/* Sort chips — only on list view */}
        {view === "list" && (
          <div style={{ display: "flex", gap: 12, overflowX: "auto", scrollbarWidth: "none", alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ fontFamily: "var(--font-display)", color: "var(--color-text)", fontSize: "clamp(14px, 4vw, 16px)" }}>ORDENAR POR:</span>
            {(["rep", "wins", "fighters"] as const).map(s => (
              <button key={s} onClick={() => setSort(s)} style={{
                padding: "8px 16px", fontFamily: "var(--font-display)", fontSize: 16, textTransform: "uppercase", 
                background: sort === s ? "var(--color-primary)" : "transparent",
                color: sort === s ? "white" : "var(--color-text)",
                border: "2px solid", borderColor: sort === s ? "var(--color-primary)" : "var(--color-border)",
                cursor: "pointer", whiteSpace: "nowrap"
              }}>
                {s === "rep" ? "REPUTACIÓN" : s === "wins" ? "VICTORIAS" : "EFECTIVOS"}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── MAP VIEW ── */}
      {view === "map" && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {/* Map */}
          <div style={{ height: "52vh", width: "100%", position: "relative", borderBottom: "4px solid var(--color-text)" }}>
            <GymMap gyms={gymMarkers} activeId={activeGymId} onSelect={setActiveGymId} />
          </div>

          <div style={{ padding: "20px", flex: 1, background: "var(--color-surface)" }}>
            {activeGymId ? (() => {
              const gym = gyms.find(g => g.id === activeGymId)!;
              const winRate = Math.round((gym.totalWins / (gym.totalWins + gym.totalLosses)) * 100);
              const initials = gym.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
              return (
                <div style={{ padding: "24px", background: "var(--color-surface)", border: "4px solid var(--color-text)", boxShadow: "6px 6px 0px var(--color-primary)" }}>
                  <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 20 }}>
                    <div style={{
                      width: 64, height: 64, flexShrink: 0,
                      background: "var(--neutral-900)", border: "4px solid var(--color-primary)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "var(--font-display)", fontSize: 24, color: "white"
                    }}>{initials}</div>
                    <div>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: 28, lineHeight: 1.1, textTransform: "uppercase" }}>{gym.name}</div>
                      <div style={{ fontSize: 14, color: "var(--color-primary)", marginTop: 4, fontFamily: "var(--font-display)", textTransform: "uppercase" }}>UBICACIÓN: {gym.city}, {gym.province}</div>
                    </div>
                    <span style={{ marginLeft: "auto", background: "var(--color-text)", color: "var(--color-bg)", padding: "4px 12px", fontFamily: "var(--font-display)", fontSize: 16, textTransform: "uppercase" }}>RESPETO: {gym.reputationScore}</span>
                  </div>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginBottom: 20 }}>
                    {[
                      { label: "V", value: gym.totalWins, color: "var(--record-win)" },
                      { label: "D", value: gym.totalLosses, color: "var(--record-loss)" },
                      { label: "Win%", value: `${winRate}%`, color: "white" },
                      { label: "KO%", value: `${gym.koRate}%`, color: "var(--color-primary)" },
                    ].map(({ label, value, color }) => (
                      <div key={label} style={{ textAlign: "center", padding: "12px", background: "var(--neutral-900)", border: "2px solid var(--color-border)" }}>
                        <div style={{ fontFamily: "var(--font-display)", fontSize: 24, color, lineHeight: 1 }}>{value}</div>
                        <div style={{ fontSize: 10, color: "var(--color-text-muted)", fontFamily: "var(--font-display)", textTransform: "uppercase", marginTop: 4 }}>{label}</div>
                      </div>
                    ))}
                  </div>

                  <Link href={`/gyms/${gym.id}`} style={{ textDecoration: "none" }}>
                    <button style={{ width: "100%", padding: "16px", background: "var(--color-primary)", border: "none", color: "white", fontFamily: "var(--font-display)", fontSize: 20, textTransform: "uppercase", cursor: "pointer", boxShadow: "4px 4px 0px rgba(0,0,0,0.5)" }}>Infiltrar Cuartel →</button>
                  </Link>
                </div>
              );
            })() : (
              <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--color-text-muted)" }}>
                <Image src="/icon_stadium.png" width={48} height={48} alt="Radar" style={{ opacity: 0.5, marginBottom: 16 }} />
                <div style={{ fontFamily: "var(--font-display)", fontSize: 24, textTransform: "uppercase" }}>RADAR ACTIVO</div>
                <div style={{ fontSize: 14, fontFamily: "var(--font-body)", fontWeight: 700, textTransform: "uppercase" }}>Identifica un objetivo en el mapa</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── LIST VIEW ── */}
      {view === "list" && (
        <main style={{ padding: "40px 16px", display: "flex", flexDirection: "column", gap: 24 }}>
          {sorted.map((gym, idx) => {
            const winRate = gym.totalWins + gym.totalLosses > 0
              ? Math.round((gym.totalWins / (gym.totalWins + gym.totalLosses)) * 100) : 0;
            const initials = gym.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
            const rivalGym = gym.rivalry ? gyms.find(g => g.id === gym.rivalry) : null;

            return (
              <Link key={gym.id} href={`/gyms/${gym.id}`} style={{ textDecoration: "none" }}>
                <div style={{ padding: "24px", background: "var(--color-surface)", border: "4px solid var(--color-text)", position: "relative", overflow: "hidden", cursor: "pointer", boxShadow: "6px 6px 0px rgba(255,255,255,0.1)", transition: "transform 0.1s" }} onMouseDown={e => e.currentTarget.style.transform="translate(2px,2px)"} onMouseUp={e => e.currentTarget.style.transform="none"}>
                  <div style={{
                    position: "absolute", right: -10, top: "50%", transform: "translateY(-50%)",
                    fontFamily: "var(--font-display)", fontSize: 120,
                    color: "rgba(255,255,255,0.03)", userSelect: "none", pointerEvents: "none",
                  }}>#{idx + 1}</div>

                  <div style={{ display: "flex", gap: 16, alignItems: "flex-start", flexWrap: "wrap", marginBottom: 20, position: "relative" }}>
                    
                    <div style={{
                      width: 80, height: 80, flexShrink: 0,
                      background: "var(--neutral-900)", border: "4px solid var(--color-primary)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "var(--font-display)", fontSize: 32, color: "white",
                    }}>{initials}</div>

                    <div style={{ flex: "1 1 200px" }}>
                      <div style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap", fontFamily: "var(--font-display)", fontSize: "clamp(10px, 2.5vw, 12px)", textTransform: "uppercase" }}>
                        <span style={{ padding: "4px 8px", background: "var(--color-text)", color: "var(--color-bg)" }}>TERRITORIO: {gym.province}</span>
                        {gym.activeTitles > 0 && <span style={{ padding: "4px 8px", background: "var(--color-primary)", color: "white" }}>🏆 {gym.activeTitles} CAMPEonatos</span>}
                      </div>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: 32, lineHeight: 1.1, marginBottom: 4, textTransform: "uppercase" }}>{gym.name}</div>
                      <div style={{ fontSize: 14, color: "var(--color-text-muted)", fontFamily: "var(--font-display)", textTransform: "uppercase" }}>📍 {gym.city} // {gym.activeFighters} PELEADORES</div>
                    </div>

                    <div style={{ marginLeft: "auto", flexShrink: 0, background: "var(--color-bg)", padding: "12px", border: "2px solid var(--color-border)" }}>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: 36, color: "var(--color-primary)", lineHeight: 1 }}>{gym.reputationScore}</div>
                      <div style={{ fontSize: 12, color: "white", fontFamily: "var(--font-display)", textTransform: "uppercase", marginTop: 4 }}>REP</div>
                    </div>
                  </div>

                  <div style={{ width: "100%", height: 4, background: "var(--color-border)", marginBottom: 24 }} />

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(60px, 1fr))", gap: 12, marginBottom: rivalGym ? 24 : 0 }}>
                    {[
                      { label: "Victorias", value: gym.totalWins,  color: "var(--record-win)" },
                      { label: "Derrotas",  value: gym.totalLosses, color: "var(--record-loss)" },
                      { label: "Win %",     value: `${winRate}%`,   color: "white" },
                      { label: "KO Rate",   value: `${gym.koRate}%`, color: "var(--color-primary)" },
                    ].map(({ label, value, color }) => (
                      <div key={label} style={{ textAlign: "center", padding: "8px", background: "var(--neutral-900)", border: "2px solid var(--color-border)" }}>
                        <div style={{ fontFamily: "var(--font-display)", fontSize: 24, color }}>{value}</div>
                        <div style={{ fontSize: 10, color: "var(--color-text-muted)", fontFamily: "var(--font-display)", textTransform: "uppercase", marginTop: 4 }}>{label}</div>
                      </div>
                    ))}
                  </div>

                  {rivalGym && (
                    <div style={{ padding: "12px 16px", background: "var(--color-bg)", borderLeft: "4px solid var(--color-primary)", display: "flex", alignItems: "center", gap: 12 }}>
                      <Image src="/icon_fire.png" width={24} height={24} alt="Fire" />
                      <span style={{ fontSize: 14, fontFamily: "var(--font-display)", color: "white", textTransform: "uppercase", letterSpacing: "1px" }}>
                        ENEMIGO JURADO: <span style={{ color: "var(--color-primary)" }}>{rivalGym.name}</span>
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </main>
      )}
    </AppShell>
  );
}
