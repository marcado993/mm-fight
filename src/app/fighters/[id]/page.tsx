"use client";
import { notFound, useParams } from "next/navigation";
import BottomNav from "@/components/BottomNav";
import TopBar from "@/components/TopBar";
import { fighters, getGymById } from "@/lib/data";
import Link from "next/link";

const styleColors: Record<string, string> = {
  Striker: "var(--red-500)", Grappler: "var(--blue-500)", Mixto: "var(--orange-500)",
};

export default function FighterDetailPage() {
  const params = useParams<{ id: string }>();
  const fighter = fighters.find((f) => f.id === params.id);
  if (!fighter) notFound();

  const gym = getGymById(fighter.gymId);
  const initials = fighter.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  const p = fighter.proRecord;
  const a = fighter.amateurRecord;
  const winRate = p.w + p.l + p.d > 0
    ? Math.round((p.w / (p.w + p.l + p.d)) * 100) : 0;

  return (
    <div style={{ background: "var(--color-bg)", minHeight: "100dvh", paddingBottom: 100 }}>
      <TopBar backHref="/fighters" />

      {/* Hero */}
      <div style={{
        position: "relative", overflow: "hidden",
        background: "linear-gradient(160deg, #2a0505 0%, #1a0303 40%, var(--color-bg) 100%)",
        padding: "32px 20px 24px",
        borderBottom: "1px solid var(--color-border)",
      }}>
        {/* BG text watermark */}
        <div style={{
          position: "absolute", right: -20, top: "50%", transform: "translateY(-50%)",
          fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 160,
          color: "rgba(211,47,47,0.05)", lineHeight: 1, userSelect: "none", pointerEvents: "none"
        }}>#{fighter.rank}</div>

        <div style={{ display: "flex", gap: 20, alignItems: "flex-start", position: "relative" }}>
          {/* Avatar */}
          <div style={{
            width: 96, height: 96, borderRadius: 20, flexShrink: 0,
            background: `linear-gradient(135deg, var(--red-800), var(--red-600))`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 34, color: "white",
            border: "3px solid var(--color-primary)"
          }}>{initials}</div>

          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
              <span className={`badge badge-${fighter.level === "Pro" ? "pro" : "amateur"}`}>{fighter.level} Verificado</span>
              <span className="badge badge-outline">{fighter.weightClass} · {fighter.weightLbs} lbs</span>
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 26, lineHeight: 1.05, letterSpacing: "-0.03em" }}>
              {fighter.name}
            </h1>
            {fighter.nickname && (
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, color: "var(--color-text-secondary)", marginTop: 2 }}>
                &ldquo;{fighter.nickname}&rdquo;
              </div>
            )}
            <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
              <span style={{ fontSize: 12, color: "var(--color-text-muted)", display: "flex", alignItems: "center", gap: 4 }}>
                📍 {fighter.city}, {fighter.province}
              </span>
              {gym && (
                <Link href={`/gyms/${gym.id}`} style={{
                  fontSize: 12, color: "var(--color-primary)", display: "flex", alignItems: "center", gap: 4,
                  textDecoration: "none", fontWeight: 600
                }}>
                  🏋️ {gym.name}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <main style={{ padding: "20px 16px" }}>
        {/* Record cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
          <div style={{ padding: "18px 16px", background: "var(--card-bg)", borderRadius: 16, border: "1px solid var(--card-border)" }}>
            <div style={{ fontSize: 10, fontFamily: "var(--font-display)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-text-muted)", marginBottom: 6 }}>Récord PRO</div>
            <div className="record-display" style={{ fontSize: 28, marginBottom: 6 }}>
              <span className="record-w">{p.w}</span>
              <span style={{ color: "var(--color-text-muted)", fontWeight: 400, fontSize: 20 }}>-</span>
              <span className="record-l">{p.l}</span>
              {p.d > 0 && <><span style={{ color: "var(--color-text-muted)", fontWeight: 400, fontSize: 20 }}>-</span><span className="record-d">{p.d}</span></>}
            </div>
            <div style={{ fontSize: 11, color: "var(--color-text-muted)" }}>{winRate}% win rate</div>
          </div>
          <div style={{ padding: "18px 16px", background: "var(--card-bg)", borderRadius: 16, border: "1px solid var(--card-border)" }}>
            <div style={{ fontSize: 10, fontFamily: "var(--font-display)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-text-muted)", marginBottom: 6 }}>Récord AMATEUR</div>
            <div className="record-display" style={{ fontSize: 28 }}>
              <span className="record-w">{a.w}</span>
              <span style={{ color: "var(--color-text-muted)", fontWeight: 400, fontSize: 20 }}>-</span>
              <span className="record-l">{a.l}</span>
              {a.d > 0 && <><span style={{ color: "var(--color-text-muted)", fontWeight: 400, fontSize: 20 }}>-</span><span className="record-d">{a.d}</span></>}
            </div>
            <div style={{ fontSize: 11, color: "var(--color-text-muted)" }}>{fighter.age} años</div>
          </div>
        </div>

        {/* Stats grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, marginBottom: 20 }}>
          {[
            { label: "Peso", value: `${fighter.weightLbs} lbs` },
            { label: "Estatura", value: fighter.height },
            { label: "Alcance", value: fighter.reach },
            { label: "Ranking", value: `#${fighter.rank}` },
          ].map(({ label, value }) => (
            <div key={label} style={{ padding: "12px 10px", textAlign: "center", background: "var(--card-bg)", borderRadius: 12, border: "1px solid var(--card-border)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 14, color: "var(--color-text)", marginBottom: 2 }}>{value}</div>
              <div style={{ fontSize: 10, color: "var(--color-text-muted)", textTransform: "uppercase", fontFamily: "var(--font-display)", fontWeight: 600, letterSpacing: "0.06em" }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Skill Profile */}
        <div style={{ padding: "20px", background: "var(--card-bg)", borderRadius: 16, border: "1px solid var(--card-border)", marginBottom: 16 }}>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 14, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 16 }}>
            Skill Profile · <span style={{ color: styleColors[fighter.style] }}>{fighter.style}</span>
          </div>
          {[
            { label: "Striking Power", value: fighter.strikingPower, icon: "👊" },
            { label: "Grappling", value: fighter.grappling, icon: "🤼" },
            { label: "Conditioning", value: fighter.conditioning, icon: "💪" },
          ].map(({ label, value, icon }) => (
            <div key={label} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>{icon} {label}</span>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13, color: value >= 90 ? "var(--color-primary)" : "var(--color-text-secondary)" }}>{value}</span>
              </div>
              <div className="progress-bar" style={{ height: 6 }}>
                <div className="progress-fill" style={{ width: `${value}%` }} />
              </div>
            </div>
          ))}
        </div>

        {/* Achievements */}
        {fighter.achievements.length > 0 && (
          <div style={{ padding: "20px", background: "var(--card-bg)", borderRadius: 16, border: "1px solid var(--card-border)", marginBottom: 16 }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 14, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14 }}>🏆 Logros</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {fighter.achievements.map((ach, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: "var(--color-surface-raised)", borderRadius: 10 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--color-primary)", flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>{ach}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fight history */}
        {fighter.fightHistory.length > 0 && (
          <div style={{ padding: "20px", background: "var(--card-bg)", borderRadius: 16, border: "1px solid var(--card-border)", marginBottom: 16 }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 14, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14 }}>⚔️ Historial de Peleas</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {fighter.fightHistory.map((fight, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px", background: "var(--color-surface-raised)", borderRadius: 12 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: fight.result === "W" ? "rgba(34,197,94,0.15)" : fight.result === "L" ? "rgba(239,68,68,0.15)" : "rgba(156,163,175,0.15)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 14,
                    color: fight.result === "W" ? "var(--record-win)" : fight.result === "L" ? "var(--record-loss)" : "var(--record-draw)",
                    flexShrink: 0
                  }}>{fight.result}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14 }}>vs {fight.opponent}</div>
                    <div style={{ fontSize: 12, color: "var(--color-text-muted)" }}>{fight.method} · {fight.event}</div>
                  </div>
                  <div style={{ fontSize: 11, color: "var(--color-text-muted)", textAlign: "right" }}>
                    {new Date(fight.date).toLocaleDateString("es-EC", { month: "short", year: "numeric" })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <Link href="/matchmaking" style={{ textDecoration: "none" }}>
            <button className="btn-primary" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <span>⚔️</span> Retar
            </button>
          </Link>
          <Link href={`/gyms/${fighter.gymId}`} style={{ textDecoration: "none" }}>
            <button className="btn-secondary" style={{ width: "100%" }}>Ver Gym</button>
          </Link>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
