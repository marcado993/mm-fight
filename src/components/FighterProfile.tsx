"use client";
import Image from "next/image";
import Link from "next/link";
import { Fighter, getGymById } from "@/lib/data";
import { useAuth } from "@/lib/auth";

const styleColors: Record<string, string> = {
  Striker: "var(--red-500)", Grappler: "var(--blue-500)", Mixto: "var(--orange-500)",
};

export default function FighterProfile({ fighter }: { fighter: Fighter }) {
  const { user } = useAuth();
  const gym = getGymById(fighter.gymId);
  const p = fighter.proRecord;
  const a = fighter.amateurRecord;
  const winRate = p.w + p.l + p.d > 0
    ? Math.round((p.w / (p.w + p.l + p.d)) * 100) : 0;

  return (
    <>
      {/* Hero */}
      <div style={{
        position: "relative", overflow: "hidden",
        background: "linear-gradient(160deg, #2a0505 0%, #1a0303 40%, var(--color-bg) 100%)",
        padding: "32px 20px 24px",
        borderBottom: "1px solid var(--color-border)",
      }}>
        <div style={{ position: "absolute", right: -20, top: "50%", transform: "translateY(-50%)", fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 160, color: "rgba(211,47,47,0.05)", lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>#{fighter.rank}</div>
        <div style={{ display: "flex", gap: 20, alignItems: "flex-start", position: "relative" }}>
          <div style={{ width: 96, height: 96, flexShrink: 0, position: "relative", overflow: "hidden", background: "var(--neutral-900)", border: "4px solid var(--color-primary)", boxShadow: "4px 4px 0px rgba(255,0,0,0.2)" }}>
            <Image src="/fighter-silhouette.png" alt={fighter.name} fill style={{ objectFit: "cover", objectPosition: "top left" }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
              <span className={`badge badge-${fighter.level === "Pro" ? "pro" : "amateur"}`}>{fighter.level} Verificado</span>
              <span className="badge badge-outline">{fighter.weightClass} · {fighter.weightLbs} lbs</span>
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 26, lineHeight: 1.05, letterSpacing: "-0.03em" }}>{fighter.name}</h1>
            {fighter.nickname && <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, color: "var(--color-text-secondary)", marginTop: 2 }}>&ldquo;{fighter.nickname}&rdquo;</div>}
            <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
              <span style={{ fontSize: 12, color: "var(--color-text-muted)", display: "flex", alignItems: "center", gap: 4 }}>📍 {fighter.city}, {fighter.province}</span>
              {gym && <Link href={`/gyms/${gym.id}`} style={{ fontSize: 12, color: "var(--color-primary)", display: "flex", alignItems: "center", gap: 4, textDecoration: "none", fontWeight: 600 }}>🏋️ {gym.name}</Link>}
            </div>
          </div>
        </div>
      </div>

      <main style={{ padding: "20px 16px", paddingBottom: "40px" }}>
        {/* Record cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
          <div style={{ padding: "18px 16px", background: "var(--color-surface)", border: "2px solid var(--color-text)", position: "relative", boxShadow: "4px 4px 0px rgba(255,255,255,0.1)" }}>
            <div style={{ fontSize: 10, fontFamily: "var(--font-display)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", color: "var(--color-text-muted)", marginBottom: 6 }}>Récord PRO</div>
            <div className="record-display" style={{ fontSize: 28, marginBottom: 6 }}>
              <span className="record-w" style={{ fontFamily: "var(--font-display)" }}>{p.w}</span>
              <span style={{ color: "var(--color-text-muted)", fontWeight: 400, fontSize: 20 }}>-</span>
              <span className="record-l" style={{ fontFamily: "var(--font-display)" }}>{p.l}</span>
              {p.d > 0 && <><span style={{ color: "var(--color-text-muted)", fontWeight: 400, fontSize: 20 }}>-</span><span className="record-d" style={{ fontFamily: "var(--font-display)" }}>{p.d}</span></>}
            </div>
            <div style={{ fontSize: 11, color: "var(--color-text-muted)", fontFamily: "var(--font-display)", textTransform: "uppercase" }}>{winRate}% win rate</div>
          </div>
          <div style={{ padding: "18px 16px", background: "var(--color-surface)", border: "2px solid var(--color-border)" }}>
            <div style={{ fontSize: 10, fontFamily: "var(--font-display)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", color: "var(--color-text-muted)", marginBottom: 6 }}>Récord AMATEUR</div>
            <div className="record-display" style={{ fontSize: 28 }}>
              <span className="record-w" style={{ fontFamily: "var(--font-display)" }}>{a.w}</span>
              <span style={{ color: "var(--color-text-muted)", fontWeight: 400, fontSize: 20 }}>-</span>
              <span className="record-l" style={{ fontFamily: "var(--font-display)" }}>{a.l}</span>
              {a.d > 0 && <><span style={{ color: "var(--color-text-muted)", fontWeight: 400, fontSize: 20 }}>-</span><span className="record-d" style={{ fontFamily: "var(--font-display)" }}>{a.d}</span></>}
            </div>
            <div style={{ fontSize: 11, color: "var(--color-text-muted)", fontFamily: "var(--font-display)", textTransform: "uppercase" }}>{fighter.age} años</div>
          </div>
        </div>

        {/* Stats grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, marginBottom: 20 }}>
          {[
            { label: "Peso", value: `${fighter.weightLbs}` },
            { label: "Est", value: fighter.height },
            { label: "Alcance", value: fighter.reach },
            { label: "Rank", value: `#${fighter.rank}` },
          ].map(({ label, value }) => (
            <div key={label} style={{ padding: "12px 6px", textAlign: "center", background: "var(--neutral-900)", border: "1px solid var(--color-border)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 14, color: "white", marginBottom: 4 }}>{value}</div>
              <div style={{ fontSize: 10, color: "var(--color-text-muted)", textTransform: "uppercase", fontFamily: "var(--font-display)", letterSpacing: "1px" }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Skill Profile */}
        <div style={{ padding: "20px", background: "var(--neutral-900)", border: "2px solid var(--color-border)", borderLeft: `6px solid ${styleColors[fighter.style] || "var(--color-border)"}`, marginBottom: 16 }}>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 16, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 16 }}>
            PERFIL TÁCTICO · <span style={{ color: styleColors[fighter.style] || "white" }}>{fighter.style}</span>
          </div>
          {[
            { label: "Striking", value: fighter.strikingPower, icon: "👊" },
            { label: "Grappling", value: fighter.grappling, icon: "🤼" },
            { label: "Cardio", value: fighter.conditioning, icon: "💪" },
          ].map(({ label, value, icon }) => (
            <div key={label} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 13, color: "var(--color-text-secondary)", fontFamily: "var(--font-display)", textTransform: "uppercase", letterSpacing: "1px" }}>{icon} {label}</span>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 14, color: value >= 90 ? "var(--color-primary)" : "white" }}>{value}</span>
              </div>
              <div className="progress-bar" style={{ height: 8, background: "rgba(255,255,255,0.05)" }}>
                <div className="progress-fill" style={{ width: `${value}%`, background: value >= 90 ? "var(--color-primary)" : "var(--color-border)" }} />
              </div>
            </div>
          ))}
        </div>

        {/* Achievements */}
        {fighter.achievements.length > 0 && (
          <div style={{ padding: "20px", background: "var(--neutral-900)", border: "2px solid var(--color-border)", marginBottom: 16 }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 16, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 14 }}>🏆 PALMARÉS</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {fighter.achievements.map((ach, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: "rgba(255,255,255,0.05)", borderLeft: "2px solid var(--yellow-500)" }}>
                  <span style={{ fontSize: 13, color: "white", fontFamily: "var(--font-display)", textTransform: "uppercase", letterSpacing: "1px" }}>{ach}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fight history */}
        {fighter.fightHistory.length > 0 && (
          <div style={{ padding: "20px", background: "var(--neutral-900)", border: "2px solid var(--color-border)", borderLeft: "4px solid var(--color-text)", marginBottom: 16 }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 16, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 14 }}>⚔️ HISTORIAL SANGRIENTO</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {fighter.fightHistory.map((fight, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px", background: "var(--color-bg)", border: "1px solid var(--color-border)" }}>
                  <div style={{
                    width: 36, height: 36,
                    background: fight.result === "W" ? "var(--record-win)" : fight.result === "L" ? "var(--record-loss)" : "var(--record-draw)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 14,
                    color: "white", flexShrink: 0
                  }}>{fight.result}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 14, textTransform: "uppercase" }}>VS {fight.opponent}</div>
                    <div style={{ fontSize: 12, color: "var(--color-text-muted)", fontFamily: "var(--font-body)", textTransform: "uppercase" }}>{fight.method} · {fight.event}</div>
                  </div>
                  <div style={{ fontSize: 11, color: "var(--color-text-muted)", textAlign: "right", fontFamily: "var(--font-display)", textTransform: "uppercase", letterSpacing: "1px" }}>
                    {new Date(fight.date).toLocaleDateString("es-EC", { month: "short", year: "numeric" })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        {user?.role === "fighter" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 10 }}>
            <Link href="/matchmaking" style={{ textDecoration: "none" }}>
              <button className="btn-primary hover-lift" style={{ width: "100%", padding: "18px", fontSize: 16, border: "2px solid var(--color-primary)", background: "var(--color-primary)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, textTransform: "uppercase", fontFamily: "var(--font-display)", letterSpacing: "1px" }}>
                <div style={{ width: 12, height: 12, background: "white", transform: "rotate(45deg)" }} />
                RETAR
              </button>
            </Link>
          </div>
        )}
      </main>
    </>
  );
}
