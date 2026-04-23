"use client";
import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import TopBar from "@/components/TopBar";
import { fighters, events } from "@/lib/data";
import Link from "next/link";

const styleColors: Record<string, string> = {
  Striker: "var(--red-500)", Grappler: "var(--blue-500)", Mixto: "var(--orange-500)",
};

export default function HomePage() {
  const top3 = fighters.filter(f => f.level === "Pro").sort((a, b) => a.rank - b.rank).slice(0, 3);
  const liveEvent = events.find(e => e.status === "live");
  const nextEvent = events.find(e => e.status === "upcoming");

  return (
    <div style={{ background: "var(--color-bg)", minHeight: "100dvh", paddingBottom: 80 }}>
      <TopBar />

      <main style={{ padding: "0 16px 20px" }}>
        {/* Live banner */}
        {liveEvent && (
          <div style={{
            margin: "16px 0",
            padding: "12px 16px",
            background: "linear-gradient(135deg, var(--red-900), var(--red-700))",
            borderRadius: 12, border: "1px solid var(--color-primary)",
            display: "flex", alignItems: "center", gap: 10
          }}>
            <span className="live-dot" />
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              LIVE: {liveEvent.name}
            </span>
          </div>
        )}

        {/* Next event card */}
        {nextEvent && (
          <Link href="/events" style={{ textDecoration: "none" }}>
            <div style={{
              margin: "16px 0",
              padding: "18px 20px",
              background: "linear-gradient(135deg, #1a0a0a 0%, var(--color-surface) 100%)",
              borderRadius: 16, border: "1px solid var(--color-border-hover)",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              cursor: "pointer"
            }}>
              <div>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
                  <span className="badge badge-red">{nextEvent.type}</span>
                  <span className="live-dot" style={{ background: "var(--yellow-500)", animation: "none", width: 6, height: 6 }} />
                  <span style={{ fontSize: 11, color: "var(--yellow-500)", fontFamily: "var(--font-display)", fontWeight: 700, textTransform: "uppercase" }}>Próximo</span>
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 20, lineHeight: 1.1, marginBottom: 4 }}>{nextEvent.name}</div>
                {nextEvent.mainEvent && (
                  <div style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>⚔️ {nextEvent.mainEvent}</div>
                )}
                <div style={{ fontSize: 12, color: "var(--color-text-muted)", marginTop: 4 }}>
                  📅 {new Date(nextEvent.date).toLocaleDateString("es-EC", { day: "numeric", month: "long" })} · {nextEvent.city}
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 36, lineHeight: 1, color: "var(--color-primary)" }}>
                  {new Date(nextEvent.date).getDate()}
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 12, color: "var(--color-text-muted)", textTransform: "uppercase" }}>
                  {new Date(nextEvent.date).toLocaleDateString("es-EC", { month: "short" })}
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Rankings section title */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "24px 0 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 22 }}>🔥</span>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 22, letterSpacing: "-0.03em" }}>
              RANKING NACIONAL
            </h1>
          </div>
          <Link href="/rankings" style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 12, color: "var(--color-primary)", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Ver todo →
          </Link>
        </div>

        {/* Top 3 hero cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
          {top3.map((f, idx) => {
            const isFirst = idx === 0;
            const initials = f.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
            return (
              <Link key={f.id} href={`/fighters/${f.id}`} style={{ textDecoration: "none" }}>
                <div
                  className={isFirst ? "glow-red" : ""}
                  style={{
                    position: "relative", overflow: "hidden",
                    padding: isFirst ? "24px 20px" : "18px 20px",
                    background: isFirst
                      ? "linear-gradient(135deg, #2a0505 0%, #1a0303 50%, #0d0d0d 100%)"
                      : "var(--card-bg)",
                    borderRadius: 20,
                    border: `1px solid ${isFirst ? "var(--color-primary)" : "var(--card-border)"}`,
                    cursor: "pointer", transition: "transform 0.2s",
                  }}
                >
                  {/* Rank watermark */}
                  <div style={{
                    position: "absolute", right: -10, top: "50%", transform: "translateY(-50%)",
                    fontFamily: "var(--font-display)", fontWeight: 900,
                    fontSize: isFirst ? 120 : 90, lineHeight: 1,
                    color: isFirst ? "rgba(211,47,47,0.08)" : "rgba(255,255,255,0.03)",
                    userSelect: "none", pointerEvents: "none"
                  }}>#{f.rank}</div>

                  <div style={{ display: "flex", gap: 16, alignItems: "center", position: "relative" }}>
                    {/* Rank badge */}
                    <div style={{
                      width: isFirst ? 52 : 42, height: isFirst ? 52 : 42,
                      borderRadius: "50%", flexShrink: 0,
                      background: isFirst
                        ? "var(--color-primary)"
                        : idx === 1 ? "linear-gradient(135deg,#c0c0c0,#808080)" : "linear-gradient(135deg,#cd7f32,#8b4513)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "var(--font-display)", fontWeight: 900,
                      fontSize: isFirst ? 20 : 16, color: "white"
                    }}>{initials}</div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 4, flexWrap: "wrap" }}>
                        <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: isFirst ? 22 : 18, color: "var(--color-text)" }}>
                          {f.name}
                        </span>
                        {f.nickname && (
                          <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 12, color: "var(--color-text-secondary)" }}>
                            &quot;{f.nickname}&quot;
                          </span>
                        )}
                      </div>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 6 }}>
                        <span className={`badge badge-${f.level === "Pro" ? "pro" : "amateur"}`}>{f.level}</span>
                        <span className="badge badge-outline">{f.weightClass}</span>
                        <span className="badge badge-outline" style={{ color: styleColors[f.style] }}>{f.style}</span>
                      </div>
                      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                        <div className="record-display" style={{ fontSize: isFirst ? 20 : 16 }}>
                          <span className="record-w">{f.proRecord.w}</span>
                          <span style={{ color: "var(--color-text-muted)", fontWeight: 400, fontSize: 14 }}>-</span>
                          <span className="record-l">{f.proRecord.l}</span>
                          {f.proRecord.d > 0 && <><span style={{ color: "var(--color-text-muted)", fontWeight: 400, fontSize: 14 }}>-</span><span className="record-d">{f.proRecord.d}</span></>}
                        </div>
                        <span style={{ fontSize: 11, color: "var(--color-text-muted)" }}>{f.city}, {f.province}</span>
                      </div>
                    </div>

                    {/* Rank number */}
                    <div style={{
                      fontFamily: "var(--font-display)", fontWeight: 900,
                      fontSize: isFirst ? 42 : 32,
                      color: isFirst ? "var(--color-primary)" : "rgba(255,255,255,0.15)",
                      lineHeight: 1, flexShrink: 0
                    }}>#{f.rank}</div>
                  </div>

                  {/* Stat bars for #1 */}
                  {isFirst && (
                    <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                      {[
                        { label: "Striking", value: f.strikingPower },
                        { label: "Grappling", value: f.grappling },
                        { label: "Físico", value: f.conditioning },
                      ].map(({ label, value }) => (
                        <div key={label}>
                          <div style={{ fontSize: 10, fontFamily: "var(--font-display)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-text-muted)", marginBottom: 4 }}>{label}</div>
                          <div className="progress-bar" style={{ height: 5 }}>
                            <div className="progress-fill" style={{ width: `${value}%` }} />
                          </div>
                          <div style={{ fontSize: 10, color: "var(--color-text-secondary)", marginTop: 3, fontFamily: "var(--font-display)", fontWeight: 700 }}>{value}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Quick access */}
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 16, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.04em" }}>Acceso Rápido</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
          {[
            { href: "/fighters", icon: "🥊", label: "Peleadores", sub: `${fighters.length} activos` },
            { href: "/gyms", icon: "🏟️", label: "Gimnasios", sub: "4 registrados" },
            { href: "/matchmaking", icon: "⚔️", label: "War Room", sub: "3 retos activos" },
            { href: "/events", icon: "📅", label: "Ligas", sub: "2 próximos eventos" },
          ].map(({ href, icon, label, sub }) => (
            <Link key={href} href={href} style={{ textDecoration: "none" }}>
              <div className="card" style={{ padding: "18px 16px", cursor: "pointer" }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 15 }}>{label}</div>
                <div style={{ fontSize: 12, color: "var(--color-text-muted)", marginTop: 2 }}>{sub}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Feed */}
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 16, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.04em" }}>Feed</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { icon: "⚔️", color: "var(--color-primary)", text: "Andrés Silva retó a Diego Almeida", sub: "Hace 2 horas · Ligero" },
            { icon: "🏆", color: "var(--green-500)", text: "Luis Caicedo gana por KO en el Round 1", sub: "Ayer · Amateur Night 12" },
            { icon: "📈", color: "var(--yellow-500)", text: "Sebastián Reyes sube al #2 Amateur Mediano", sub: "Hace 3 días" },
          ].map((item, i) => (
            <div key={i} style={{ padding: "14px 16px", background: "var(--card-bg)", borderRadius: 12, border: "1px solid var(--card-border)", display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: `${item.color}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{item.icon}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{item.text}</div>
                <div style={{ fontSize: 11, color: "var(--color-text-muted)" }}>{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
