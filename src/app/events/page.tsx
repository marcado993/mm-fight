"use client";
import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import TopBar from "@/components/TopBar";
import { events, provincialLeagues, type ProvinceLeague } from "@/lib/data";

const typeColors: Record<string, string> = {
  Nacional: "var(--color-primary)",
  Regional:  "var(--blue-500)",
  Selectivo: "var(--yellow-500)",
};

/* ─── Hex League Card ─────────────────────────────────── */
function HexLeagueCard({ league }: { league: ProvinceLeague }) {
  const hexClip = "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)";
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flexShrink: 0 }}>
      <div style={{ position: "relative", width: 110, height: 96 }}>
        <div style={{ position: "absolute", inset: 0, clipPath: hexClip, background: "var(--color-primary)" }} />
        <div style={{
          position: "absolute", inset: 3, clipPath: hexClip,
          background: league.color,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 3,
        }}>
          <span style={{ fontSize: 26, lineHeight: 1 }}>{league.icon}</span>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 9, color: "white", textTransform: "uppercase", letterSpacing: "0.07em", textAlign: "center", padding: "0 6px" }}>
            {league.shortName}
          </div>
        </div>
      </div>
      <div style={{ textAlign: "center", maxWidth: 100 }}>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 10, color: "var(--color-text)", textTransform: "uppercase", letterSpacing: "0.04em" }}>{league.name}</div>
        <div style={{ fontSize: 9, color: "var(--color-text-muted)", marginTop: 1 }}>{league.activeFighters} fighters</div>
      </div>
    </div>
  );
}

/* ─── VS Hero Card ─────────────────────────────────────── */
function ProximoEventoHero() {
  const nextEvent = events.find(e => e.status === "upcoming");
  if (!nextEvent) return null;
  const fight = nextEvent.fights[0];

  return (
    <div style={{
      position: "relative", borderRadius: 20, overflow: "hidden",
      background: "linear-gradient(180deg, #1a0303 0%, #0d0d0d 100%)",
      border: "1px solid var(--color-primary)",
      marginBottom: 24,
    }}>
      {/* Top badge */}
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        zIndex: 10,
        padding: "6px 24px",
        background: "var(--color-primary)",
        clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
        fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 11,
        textTransform: "uppercase", letterSpacing: "0.1em", color: "white",
        whiteSpace: "nowrap",
      }}>
        PRÓXIMO EVENTO
      </div>

      {/* VS section */}
      <div style={{ padding: "44px 20px 20px", position: "relative" }}>
        {/* Red glow bg */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 50% 60%, rgba(211,47,47,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Fighter names + VS */}
        {fight ? (
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 12, alignItems: "center", marginBottom: 16, position: "relative" }}>
            {/* Fighter 1 */}
            <div style={{ textAlign: "center" }}>
              <div style={{
                width: 70, height: 70, borderRadius: "50%",
                background: "linear-gradient(135deg, var(--red-800), var(--red-600))",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 22,
                border: "3px solid var(--color-primary)",
                margin: "0 auto 10px",
              }}>
                {fight.fighter1.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()}
              </div>
              <div style={{
                fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 20,
                letterSpacing: "-0.03em", lineHeight: 1, textTransform: "uppercase",
              }}>
                {fight.fighter1.split(" ")[1] || fight.fighter1.split(" ")[0]}
              </div>
              <div style={{ fontSize: 10, color: "var(--color-text-muted)", marginTop: 4, fontFamily: "var(--font-display)", fontWeight: 600 }}>
                {fight.weightClass}
              </div>
            </div>

            {/* VS badge */}
            <div style={{
              padding: "10px 14px",
              background: "var(--color-primary)",
              clipPath: "polygon(22% 0%, 78% 0%, 100% 22%, 100% 78%, 78% 100%, 22% 100%, 0% 78%, 0% 22%)",
              fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 18, color: "white",
              textAlign: "center", lineHeight: 1, flexShrink: 0,
              boxShadow: "0 0 20px rgba(211,47,47,0.5)",
            }}>
              VS
            </div>

            {/* Fighter 2 */}
            <div style={{ textAlign: "center" }}>
              <div style={{
                width: 70, height: 70, borderRadius: "50%",
                background: "linear-gradient(135deg, var(--neutral-700), var(--neutral-600))",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 22,
                border: "3px solid var(--color-border)",
                margin: "0 auto 10px",
              }}>
                {fight.fighter2.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()}
              </div>
              <div style={{
                fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 20,
                letterSpacing: "-0.03em", lineHeight: 1, textTransform: "uppercase",
              }}>
                {fight.fighter2.split(" ")[1] || fight.fighter2.split(" ")[0]}
              </div>
              <div style={{ fontSize: 10, color: "var(--color-text-muted)", marginTop: 4, fontFamily: "var(--font-display)", fontWeight: 600 }}>
                {fight.weightClass}
              </div>
            </div>
          </div>
        ) : (
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 22, textAlign: "center", marginBottom: 16 }}>
            {nextEvent.mainEvent ?? nextEvent.name}
          </div>
        )}

        {/* Date / venue bar */}
        <div style={{
          padding: "10px 14px",
          background: "rgba(0,0,0,0.5)",
          borderRadius: 10,
          display: "flex", justifyContent: "center", gap: 12,
          fontSize: 11, color: "var(--color-text-muted)",
          fontFamily: "var(--font-display)", fontWeight: 600,
          marginBottom: 16, flexWrap: "wrap", textAlign: "center",
        }}>
          <span>📅 {new Date(nextEvent.date).toLocaleDateString("es-EC", { day: "numeric", month: "long", year: "numeric" })}</span>
          <span style={{ color: "var(--color-border)" }}>|</span>
          <span>📍 {nextEvent.city}</span>
          <span style={{ color: "var(--color-border)" }}>|</span>
          <span>{nextEvent.venue}</span>
        </div>

        {/* CTA buttons */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <button className="btn-primary" style={{
            padding: "13px 10px", fontSize: 12, fontWeight: 900,
            letterSpacing: "0.04em", lineHeight: 1.2,
          }}>
            🎟️ COMPRAR<br />ENTRADAS
          </button>
          <button className="btn-secondary" style={{
            padding: "13px 10px", fontSize: 12, display: "flex",
            alignItems: "center", justifyContent: "center", gap: 6,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none"/>
            </svg>
            VER PPV
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────── */
export default function EventsPage() {
  const [calView, setCalView] = useState<"upcoming" | "completed">("upcoming");
  const filtered = events.filter(e => calView === "upcoming" ? e.status !== "completed" : e.status === "completed");

  return (
    <div style={{ background: "var(--color-bg)", minHeight: "100dvh", paddingBottom: 80 }}>
      <TopBar title="Ligas y Torneos" />

      {/* ── Header ── */}
      <div style={{ padding: "20px 20px 0", background: "linear-gradient(180deg, #1a0505 0%, var(--color-bg) 100%)" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 26, letterSpacing: "-0.03em", marginBottom: 16 }}>
          📅 THE CIRCUIT
        </h1>

        {/* ── Hero: Próximo Evento ── */}
        <ProximoEventoHero />

        {/* ── LIGAS PROVINCIALES ── */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <div className="section-heading" style={{ fontSize: 13 }}>LIGAS PROVINCIALES</div>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 11, color: "var(--color-primary)", textTransform: "uppercase", letterSpacing: "0.06em", cursor: "pointer" }}>
              VER TODAS →
            </span>
          </div>
          <div style={{
            display: "flex", gap: 10,
            overflowX: "auto", paddingBottom: 8, paddingTop: 4,
            scrollbarWidth: "none",
            marginLeft: -20, marginRight: -20,
            paddingLeft: 20, paddingRight: 20,
          }}>
            {provincialLeagues.map(l => <HexLeagueCard key={l.id} league={l} />)}
          </div>
        </div>

        {/* ── Calendar section header ── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 0 }}>
          <div className="section-heading" style={{ fontSize: 14 }}>CALENDARIO</div>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 11, color: "var(--color-primary)", textTransform: "uppercase", letterSpacing: "0.06em", cursor: "pointer" }}>
            VER TODOS →
          </span>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 0, borderBottom: "1px solid var(--color-border)", marginTop: 12 }}>
          {([["upcoming", "Próximos"], ["completed", "Resultados"]] as const).map(([key, label]) => (
            <button key={key} onClick={() => setCalView(key)} style={{
              padding: "9px 18px", border: "none", background: "none", cursor: "pointer",
              fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 12,
              textTransform: "uppercase", letterSpacing: "0.06em",
              color: calView === key ? "var(--color-primary)" : "var(--color-text-muted)",
              borderBottom: calView === key ? "2px solid var(--color-primary)" : "2px solid transparent",
              marginBottom: -1,
            }}>{label}</button>
          ))}
        </div>
      </div>

      {/* ── Calendar list ── */}
      <main style={{ padding: "12px 16px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.map((event) => {
            const dateObj = new Date(event.date);
            const dayNum = dateObj.getDate();
            const monthStr = dateObj.toLocaleDateString("es-EC", { month: "short" }).toUpperCase();

            return (
              <div key={event.id} style={{
                display: "flex", alignItems: "stretch", gap: 0,
                background: "var(--card-bg)",
                borderRadius: 14, border: "1px solid var(--card-border)",
                overflow: "hidden", cursor: "pointer",
                transition: "border-color 0.2s",
              }}>
                {/* Date block — parallelogram cut right edge */}
                <div style={{
                  flexShrink: 0, width: 64,
                  background: "var(--color-primary)",
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  padding: "14px 6px",
                  clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%)",
                }}>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 26, lineHeight: 1, color: "white" }}>{dayNum}</div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 10, color: "rgba(255,255,255,0.8)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{monthStr}</div>
                </div>

                {/* Event info */}
                <div style={{ flex: 1, padding: "12px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                  <div>
                    <div style={{ display: "flex", gap: 6, marginBottom: 4, flexWrap: "wrap", alignItems: "center" }}>
                      <span className="badge-para" style={{ fontSize: 9, padding: "3px 10px 3px 8px" }}>{event.type}</span>
                      {event.status === "live" && <span className="live-dot" />}
                    </div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 15, lineHeight: 1.2, marginBottom: 3 }}>
                      {event.name}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--color-text-muted)" }}>
                      {event.city}, {event.venue}
                    </div>
                    {event.mainEvent && (
                      <div style={{ fontSize: 11, color: "var(--color-text-secondary)", marginTop: 2 }}>
                        ⚔️ {event.mainEvent}
                      </div>
                    )}
                  </div>

                  {/* Arrow chevron */}
                  <div style={{ color: "var(--color-primary)", flexShrink: 0 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--color-text-muted)" }}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>📅</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15 }}>Sin eventos</div>
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
