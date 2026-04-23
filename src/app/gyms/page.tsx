"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import BottomNav from "@/components/BottomNav";
import TopBar from "@/components/TopBar";
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
      background: "#0d0d0d", color: "var(--color-text-muted)",
      fontFamily: "var(--font-display)", fontSize: 13,
    }}>
      Cargando mapa…
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
  const [view, setView] = useState<"list" | "map">("list");
  const [sort, setSort] = useState<"rep" | "wins" | "fighters">("rep");
  const [activeGymId, setActiveGymId] = useState<string | undefined>(undefined);

  const sorted = [...gyms].sort((a, b) => {
    if (sort === "rep")      return b.reputationScore - a.reputationScore;
    if (sort === "wins")     return b.totalWins - a.totalWins;
    return b.activeFighters - a.activeFighters;
  });

  return (
    <div style={{ background: "var(--color-bg)", minHeight: "100dvh", display: "flex", flexDirection: "column", paddingBottom: 80 }}>
      <TopBar title="Gimnasios" />

      {/* ── Header ── */}
      <div style={{ padding: "20px 20px 0" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 12 }}>
          <div>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 26, letterSpacing: "-0.03em", marginBottom: 2 }}>
              🏟️ GIMNASIOS
            </h1>
            <p style={{ fontSize: 13, color: "var(--color-text-muted)" }}>
              Élite Ecuador · {gyms.length} registrados
            </p>
          </div>

          {/* View toggle */}
          <div style={{
            display: "flex", borderRadius: 10, overflow: "hidden",
            border: "1px solid var(--color-border)",
          }}>
            {(["list", "map"] as const).map(v => (
              <button key={v} onClick={() => setView(v)} style={{
                padding: "8px 14px",
                background: view === v ? "var(--color-primary)" : "transparent",
                border: "none", cursor: "pointer",
                fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 11,
                textTransform: "uppercase", letterSpacing: "0.06em",
                color: view === v ? "white" : "var(--color-text-muted)",
                transition: "all 0.2s",
              }}>
                {v === "list" ? "☰ Lista" : "🗺 Mapa"}
              </button>
            ))}
          </div>
        </div>

        {/* Sort chips — only on list view */}
        {view === "list" && (
          <div style={{ display: "flex", gap: 8, marginBottom: 16, overflowX: "auto", scrollbarWidth: "none" }}>
            {(["rep", "wins", "fighters"] as const).map(s => (
              <button key={s} className={`chip${sort === s ? " active" : ""}`} onClick={() => setSort(s)}>
                {s === "rep" ? "Reputación" : s === "wins" ? "Victorias" : "Peleadores"}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── MAP VIEW ── */}
      {view === "map" && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {/* Map */}
          <div style={{ height: "52vh", width: "100%", position: "relative" }}>
            <GymMap
              gyms={gymMarkers}
              activeId={activeGymId}
              onSelect={setActiveGymId}
            />
          </div>

          {/* Selected gym card or tap hint */}
          <div style={{ padding: "16px", flex: 1 }}>
            {activeGymId ? (() => {
              const gym = gyms.find(g => g.id === activeGymId)!;
              const winRate = Math.round((gym.totalWins / (gym.totalWins + gym.totalLosses)) * 100);
              const initials = gym.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
              return (
                <div className="card" style={{ padding: "18px 20px" }}>
                  <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 14 }}>
                    <div style={{
                      width: 56, height: 56, flexShrink: 0,
                      borderRadius: 12,
                      background: "linear-gradient(135deg, var(--red-800), var(--red-500))",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 16,
                      border: "2px solid var(--color-primary)",
                    }}>{initials}</div>
                    <div>
                      <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 17, lineHeight: 1.1 }}>{gym.name}</div>
                      <div style={{ fontSize: 12, color: "var(--color-text-muted)", marginTop: 2 }}>📍 {gym.city}, {gym.province}</div>
                    </div>
                    <span className="badge badge-red" style={{ marginLeft: "auto" }}>Rep {gym.reputationScore}</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
                    {[
                      { label: "V", value: gym.totalWins, color: "var(--record-win)" },
                      { label: "D", value: gym.totalLosses, color: "var(--record-loss)" },
                      { label: "Win%", value: `${winRate}%`, color: "var(--color-text)" },
                      { label: "KO%", value: `${gym.koRate}%`, color: "var(--color-primary)" },
                    ].map(({ label, value, color }) => (
                      <div key={label} style={{ textAlign: "center", padding: "10px 6px", background: "var(--color-surface-raised)", borderRadius: 10 }}>
                        <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 18, color, lineHeight: 1 }}>{value}</div>
                        <div style={{ fontSize: 9, color: "var(--color-text-muted)", fontFamily: "var(--font-display)", fontWeight: 600, textTransform: "uppercase", marginTop: 2 }}>{label}</div>
                      </div>
                    ))}
                  </div>
                  <Link href={`/gyms/${gym.id}`} style={{ textDecoration: "none" }}>
                    <button className="btn-primary" style={{ width: "100%" }}>Ver perfil completo →</button>
                  </Link>
                </div>
              );
            })() : (
              <div style={{ textAlign: "center", paddingTop: 32, color: "var(--color-text-muted)" }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>🥊</div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14 }}>Toca un marcador</div>
                <div style={{ fontSize: 12, marginTop: 4 }}>para ver el gym</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── LIST VIEW ── */}
      {view === "list" && (
        <main style={{ padding: "0 16px 16px", display: "flex", flexDirection: "column", gap: 14 }}>
          {sorted.map((gym, idx) => {
            const winRate = gym.totalWins + gym.totalLosses > 0
              ? Math.round((gym.totalWins / (gym.totalWins + gym.totalLosses)) * 100) : 0;
            const initials = gym.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
            const rivalGym = gym.rivalry ? gyms.find(g => g.id === gym.rivalry) : null;

            return (
              <Link key={gym.id} href={`/gyms/${gym.id}`} style={{ textDecoration: "none" }}>
                <div className="card" style={{ padding: "20px", cursor: "pointer", position: "relative", overflow: "hidden" }}>
                  {/* Rank watermark */}
                  <div style={{
                    position: "absolute", right: -10, top: "50%", transform: "translateY(-50%)",
                    fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 100,
                    color: "rgba(255,255,255,0.02)", userSelect: "none", pointerEvents: "none",
                  }}>#{idx + 1}</div>

                  <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 16, position: "relative" }}>
                    {/* Logo */}
                    <div style={{
                      width: 64, height: 64, borderRadius: 16, flexShrink: 0,
                      background: "linear-gradient(135deg, var(--red-800), var(--red-500))",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 18, color: "white",
                      border: "2px solid var(--color-primary)",
                    }}>{initials}</div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", gap: 6, marginBottom: 6, flexWrap: "wrap" }}>
                        <span className="badge badge-red">{gym.province}</span>
                        {gym.activeTitles > 0 && <span className="badge badge-pro">🏆 {gym.activeTitles} títulos</span>}
                      </div>
                      <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 18, lineHeight: 1.1, marginBottom: 2 }}>{gym.name}</div>
                      <div style={{ fontSize: 12, color: "var(--color-text-muted)" }}>📍 {gym.city} · {gym.activeFighters} peleadores</div>
                    </div>

                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 26, color: "var(--color-primary)", lineHeight: 1 }}>{gym.reputationScore}</div>
                      <div style={{ fontSize: 10, color: "var(--color-text-muted)", fontFamily: "var(--font-display)", fontWeight: 600, textTransform: "uppercase" }}>REP</div>
                    </div>
                  </div>

                  <div className="divider" style={{ marginBottom: 14 }} />

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, marginBottom: rivalGym ? 14 : 0 }}>
                    {[
                      { label: "Victorias", value: gym.totalWins,  color: "var(--record-win)" },
                      { label: "Derrotas",  value: gym.totalLosses, color: "var(--record-loss)" },
                      { label: "Win %",     value: `${winRate}%`,   color: "var(--color-text)" },
                      { label: "KO Rate",   value: `${gym.koRate}%`, color: "var(--color-primary)" },
                    ].map(({ label, value, color }) => (
                      <div key={label} style={{ textAlign: "center" }}>
                        <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 18, color }}>{value}</div>
                        <div style={{ fontSize: 9, color: "var(--color-text-muted)", fontFamily: "var(--font-display)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</div>
                      </div>
                    ))}
                  </div>

                  {rivalGym && (
                    <div style={{ padding: "8px 12px", background: "rgba(211,47,47,0.08)", borderRadius: 8, border: "1px solid rgba(211,47,47,0.2)", display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 14 }}>🔥</span>
                      <span style={{ fontSize: 12, fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--color-text-secondary)" }}>
                        Rivalidad: vs <span style={{ color: "var(--color-primary)" }}>{rivalGym.name}</span>
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </main>
      )}

      <BottomNav />
    </div>
  );
}
