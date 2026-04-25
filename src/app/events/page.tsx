"use client";
import { useState } from "react";
import AppShell from "@/components/AppShell";
import { useAuth } from "@/lib/auth";
import Image from "next/image";
import { events, provincialLeagues, type ProvinceLeague } from "@/lib/data";

const typeColors: Record<string, string> = {
  Nacional: "var(--color-primary)",
  Regional:  "var(--blue-500)",
  Selectivo: "var(--yellow-500)",
};

/* ─── Harsh Hex League Card ─────────────────────────────────── */
function HexLeagueCard({ league }: { league: ProvinceLeague }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, flexShrink: 0 }}>
      {/* Brutalist Block instead of hexagon */}
      <div style={{ width: 120, height: 120, border: "4px solid var(--color-text)", background: league.color, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, padding: "8px", boxShadow: "4px 4px 0px var(--neutral-900)" }}>
        <span style={{ fontSize: 32, lineHeight: 1, filter: "grayscale(100%) brightness(200%)" }}>{league.icon}</span>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 16, color: "white", textTransform: "uppercase", textAlign: "center", textShadow: "1px 1px 0px black" }}>
          {league.shortName}
        </div>
      </div>
      <div style={{ textAlign: "center", maxWidth: 120 }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 14, color: "var(--color-text)", textTransform: "uppercase", lineHeight: 1.1, marginBottom: 4 }}>{league.name}</div>
        <div style={{ fontSize: 10, color: "var(--color-primary)", fontFamily: "var(--font-body)", fontWeight: 700, textTransform: "uppercase" }}>{league.activeFighters} COMBATIENTES</div>
      </div>
    </div>
  );
}

/* ─── VS Hero Card Brutalist ─────────────────────────────────────── */
function ProximoEventoHero() {
  const nextEvent = events.find(e => e.status === "upcoming");
  if (!nextEvent) return null;
  const fight = nextEvent.fights[0];

  return (
    <div style={{
      position: "relative",
      background: "var(--color-surface)",
      border: "4px solid var(--color-text)",
      marginBottom: 32,
      boxShadow: "8px 8px 0px var(--color-primary)"
    }}>
      {/* Top badge */}
      <div style={{
        position: "absolute", top: -16, left: 16, zIndex: 10,
        padding: "4px 16px",
        background: "var(--color-text)",
        border: "2px solid var(--color-primary)",
        color: "var(--color-bg)",
        fontFamily: "var(--font-display)", fontSize: 20,
        textTransform: "uppercase", whiteSpace: "nowrap",
      }}>
        EL PRÓXIMO EVENTO
      </div>

      <div style={{ padding: "40px 24px 24px", position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
        
        {fight ? (
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 16, alignItems: "center", marginBottom: 24, width: "100%" }}>
            
            {/* Fighter 1 */}
            <div style={{ textAlign: "center" }}>
              <div style={{
                width: 80, height: 80, background: "var(--color-primary)",
                border: "4px solid var(--color-text)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--font-display)", fontSize: 32, color: "white",
                margin: "0 auto 12px",
              }}>
                {fight.fighter1.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()}
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 28, lineHeight: 1, textTransform: "uppercase" }}>
                {fight.fighter1.split(" ")[1] || fight.fighter1.split(" ")[0]}
              </div>
              <div style={{ fontSize: 14, color: "var(--color-primary)", marginTop: 4, fontFamily: "var(--font-display)", textTransform: "uppercase" }}>
                {fight.weightClass}
              </div>
            </div>

            {/* VS block */}
            <div style={{
              width: 56, height: 56,
              background: "var(--color-text)", border: "4px solid var(--color-primary)",
              fontFamily: "var(--font-display)", fontSize: 32, color: "var(--color-bg)",
              display: "flex", alignItems: "center", justifyContent: "center",
              transform: "rotate(-10deg)"
            }}>
              VS
            </div>

            {/* Fighter 2 */}
            <div style={{ textAlign: "center" }}>
              <div style={{
                width: 80, height: 80, background: "var(--neutral-900)",
                border: "4px solid var(--color-text)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--font-display)", fontSize: 32, color: "white",
                margin: "0 auto 12px",
              }}>
                {fight.fighter2.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()}
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 28, lineHeight: 1, textTransform: "uppercase" }}>
                {fight.fighter2.split(" ")[1] || fight.fighter2.split(" ")[0]}
              </div>
              <div style={{ fontSize: 14, color: "var(--color-text-muted)", marginTop: 4, fontFamily: "var(--font-display)", textTransform: "uppercase" }}>
                {fight.weightClass}
              </div>
            </div>
          </div>
        ) : (
          <div style={{ fontFamily: "var(--font-display)", fontSize: 32, textAlign: "center", marginBottom: 24, textTransform: "uppercase" }}>
            {nextEvent.mainEvent ?? nextEvent.name}
          </div>
        )}

        {/* Info Block */}
        <div style={{
          width: "100%", padding: "16px",
          background: "var(--neutral-900)", border: "2px solid var(--color-border)",
          display: "flex", justifyContent: "center", gap: 16,
          fontFamily: "var(--font-display)", fontSize: 16, textTransform: "uppercase",
          marginBottom: 24, flexWrap: "wrap", textAlign: "center"
        }}>
          <span style={{ color: "var(--color-primary)" }}>FECHA // {new Date(nextEvent.date).toLocaleDateString("es-EC")}</span>
          <span style={{ color: "var(--color-border)" }}>|</span>
          <span style={{ color: "white" }}>LUGAR // {nextEvent.city} - {nextEvent.venue}</span>
        </div>

        {/* CTA buttons */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, width: "100%" }}>
          <button style={{
            padding: "16px", background: "var(--color-primary)", border: "4px solid var(--color-text)",
            color: "white", fontFamily: "var(--font-display)", fontSize: 20, cursor: "pointer",
            textTransform: "uppercase", boxShadow: "4px 4px 0px rgba(0,0,0,0.5)"
          }}>
            COMPRAR ENTRADAS DIRECTAS
          </button>
          <button style={{
            padding: "16px", background: "transparent", border: "4px solid var(--color-text)",
            color: "var(--color-text)", fontFamily: "var(--font-display)", fontSize: 20, cursor: "pointer",
            textTransform: "uppercase", display: "flex", alignItems: "center", justifyContent: "center", gap: 8
          }}>
            <Image src="/icon_stadium.png" alt="PPV" width={24} height={24} /> VER PPV
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────── */
export default function EventsPage() {
  const { user } = useAuth();
  const [calView, setCalView] = useState<"upcoming" | "completed">("upcoming");
  const filtered = events.filter(e => calView === "upcoming" ? e.status !== "completed" : e.status === "completed");

  return (
    <AppShell role={user?.role || "normal"}>
      {/* ── Header ── */}
      <div style={{ padding: "40px 20px 20px", background: "var(--color-surface)", borderBottom: "4px solid var(--color-primary)" }}>
        <h1 style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: "var(--font-display)", fontSize: 48, letterSpacing: "2px", lineHeight: 1, textTransform: "uppercase", marginBottom: 32 }}>
          <Image src="/icon_stadium.png" alt="Circuit" width={48} height={48} /> LUGARES DE PODER
        </h1>

        {/* ── Hero: Próximo Evento ── */}
        <ProximoEventoHero />

        {/* ── LIGAS PROVINCIALES ── */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 24, textTransform: "uppercase" }}>LIGAS PROVINCIALES ACTIVAS</div>
          </div>
          <div style={{
            display: "flex", gap: 16, overflowX: "auto", paddingBottom: 16,
            scrollbarWidth: "none", marginLeft: -20, marginRight: -20, paddingLeft: 20, paddingRight: 20,
          }}>
            {provincialLeagues.map(l => <HexLeagueCard key={l.id} league={l} />)}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 16, borderBottom: "2px solid var(--color-border)" }}>
          {([["upcoming", "CARTELERAS PRÓXIMAS"], ["completed", "RESULTADOS PASADOS"]] as const).map(([key, label]) => (
            <button key={key} onClick={() => setCalView(key)} style={{
              padding: "12px 24px", border: "none", background: calView === key ? "var(--color-text)" : "transparent",
              cursor: "pointer", fontFamily: "var(--font-display)", fontSize: 16, textTransform: "uppercase",
              color: calView === key ? "var(--color-bg)" : "var(--color-text-muted)",
              transform: calView === key ? "translateY(2px)" : "none",
              borderTopLeftRadius: 0, borderTopRightRadius: 0
            }}>{label}</button>
          ))}
        </div>
      </div>

      {/* ── Calendar list ── */}
      <main style={{ padding: "40px 16px" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 20px", color: "var(--color-text-muted)", background: "var(--color-surface)", border: "4px dashed var(--color-border)" }}>
            <Image src="/icon_stadium.png" width={48} height={48} alt="Empty" style={{ opacity: 0.5, marginBottom: 16 }} />
            <div style={{ fontFamily: "var(--font-display)", fontSize: 24, textTransform: "uppercase" }}>EL CALENDARIO ESTÁ VACÍO</div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {filtered.map((event) => {
              const dateObj = new Date(event.date);
              const dayNum = dateObj.getDate();
              const monthStr = dateObj.toLocaleDateString("es-EC", { month: "short" }).toUpperCase();
              return (
                <div key={event.id} style={{
                  padding: "20px", background: "var(--color-surface)",
                  border: "4px solid var(--color-text)",
                  display: "flex", gap: 20, alignItems: "stretch",
                  boxShadow: "4px 4px 0px rgba(255,255,255,0.1)"
                }}>
                  {/* Hard Date box */}
                  <div style={{
                    width: 72, background: "var(--color-bg)", border: "2px solid var(--color-border)",
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  }}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: 14, color: "var(--color-primary)", textTransform: "uppercase" }}>{monthStr}</span>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: 36, lineHeight: 1, color: "white" }}>{dayNum}</span>
                  </div>

                  <div style={{ flex: 1, padding: "8px 0" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
                      <span style={{ background: typeColors[event.type] || "var(--color-text)", color: typeColors[event.type] ? "white" : "var(--color-bg)", padding: "2px 8px", fontFamily: "var(--font-display)", fontSize: 12, textTransform: "uppercase" }}>{event.type}</span>
                      {event.status === "live" && (
                        <span style={{ color: "var(--color-primary)", fontFamily: "var(--font-display)", fontSize: 14, textTransform: "uppercase", animation: "pulse 2s infinite" }}>EN VIVO AHORA</span>
                      )}
                    </div>
                    
                    <div style={{ fontFamily: "var(--font-display)", fontSize: 24, lineHeight: 1.1, textTransform: "uppercase", marginBottom: 8 }}>{event.name}</div>
                    
                    {event.mainEvent && (
                      <div style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 14, color: "var(--color-primary)", marginBottom: 8, textTransform: "uppercase" }}>
                        MAIN EVENT // {event.mainEvent}
                      </div>
                    )}
                    
                    <div style={{ fontFamily: "var(--font-display)", fontSize: 14, color: "var(--color-text-muted)", textTransform: "uppercase" }}>
                      {event.city} · {event.venue} // {event.fights.length} PELEAS PRELIMINARES
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </AppShell>
  );
}
