"use client";
import Image from "next/image";
import { OctagonAvatar } from "@/components/FighterCard";
import { notFound, useParams } from "next/navigation";
import BottomNav from "@/components/BottomNav";
import TopBar from "@/components/TopBar";
import { gyms, fighters, getFightersByGym } from "@/lib/data";
import FighterCard from "@/components/FighterCard";
import Link from "next/link";

export default function GymDetailPage() {
  const params = useParams<{ id: string }>();
  const gym = gyms.find((g) => g.id === params.id);
  if (!gym) notFound();

  const roster = getFightersByGym(gym.id);
  const rivalGym = gym.rivalry ? gyms.find(g => g.id === gym.rivalry) : null;
  const winRate = gym.totalWins + gym.totalLosses > 0
    ? Math.round((gym.totalWins / (gym.totalWins + gym.totalLosses)) * 100) : 0;
  const initials = gym.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  const gymInitials = initials;

  return (
    <div style={{ background: "var(--color-bg)", minHeight: "100dvh", paddingBottom: 100 }}>
      <TopBar backHref="/gyms" />

      {/* Hero */}
      <div style={{
        position: "relative", overflow: "hidden", padding: "32px 20px 24px",
        background: "linear-gradient(160deg, #2a0505 0%, #1a0303 40%, var(--color-bg) 100%)",
        borderBottom: "1px solid var(--color-border)"
      }}>
        <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
          <div style={{
            width: 80, height: 80, flexShrink: 0, position: "relative", overflow: "hidden",
            background: "var(--neutral-900)", border: "4px solid var(--color-primary)",
            clipPath: "polygon(22% 0%, 78% 0%, 100% 22%, 100% 78%, 78% 100%, 22% 100%, 0% 78%, 0% 22%)",
          }}>
            <Image src="/gym-interior.png" alt="Gym" fill style={{ objectFit: "cover" }} />
          </div>
          <div>
            <div style={{ display: "flex", gap: 6, marginBottom: 6, flexWrap: "wrap" }}>
              <span className="badge badge-red">Elite Camp</span>
              <span className="badge badge-outline">{gym.province}</span>
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 24, lineHeight: 1.05, letterSpacing: "-0.03em" }}>{gym.name}</h1>
            <div style={{ fontSize: 12, color: "var(--color-text-muted)", marginTop: 4 }}>📍 {gym.city}</div>
          </div>
        </div>
        <div style={{ marginTop: 16, padding: "12px 16px", background: "rgba(0,0,0,0.3)", borderRadius: 12, borderLeft: "3px solid var(--color-primary)" }}>
          <p style={{ fontSize: 13, color: "var(--color-text-secondary)", fontStyle: "italic", lineHeight: 1.5 }}>&ldquo;{gym.tagline}&rdquo;</p>
        </div>
      </div>

      <main style={{ padding: "20px 16px" }}>
        {/* Key stats — hex badges like reference image */}
        <div style={{ display: "flex", justifyContent: "space-around", gap: 8, marginBottom: 20, padding: "10px 0" }}>
          {[
            { label: "Victorias", value: gym.totalWins, color: "var(--record-win)" },
            { label: "KO Rate", value: `${gym.koRate}%`, color: "var(--color-primary)" },
            { label: "Reputación", value: gym.reputationScore, color: "var(--yellow-500)" },
          ].map(({ label, value, color }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ position: "relative", width: 90, height: 80, margin: "0 auto 8px" }}>
                {/* Hex outer border */}
                <div style={{
                  position: "absolute", inset: 0,
                  clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                  background: color + "40"
                }} />
                {/* Hex inner */}
                <div style={{
                  position: "absolute", inset: 3,
                  clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                  background: "var(--color-surface-raised)",
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 18, color, lineHeight: 1 }}>{value}</span>
                </div>
              </div>
              <div style={{ fontSize: 10, color: "var(--color-text-muted)", fontFamily: "var(--font-display)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Record */}
        <div style={{ padding: "18px 20px", background: "var(--neutral-900)", border: "2px solid var(--color-border)", marginBottom: 16 }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 900, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 16 }}>RÉCORD ACUMULADO</div>
          <div style={{ display: "flex", justifyContent: "space-around", textAlign: "center" }}>
            <div><div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 32, color: "var(--record-win)" }}>{gym.totalWins}</div><div style={{ fontSize: 11, color: "var(--color-text-muted)", fontFamily: "var(--font-display)", textTransform: "uppercase" }}>VICTORIAS</div></div>
            <div style={{ display: "flex", alignItems: "center", color: "var(--color-border)" }}>—</div>
            <div><div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 32, color: "var(--record-loss)" }}>{gym.totalLosses}</div><div style={{ fontSize: 11, color: "var(--color-text-muted)", fontFamily: "var(--font-display)", textTransform: "uppercase" }}>DERROTAS</div></div>
            <div style={{ display: "flex", alignItems: "center", color: "var(--color-border)" }}>—</div>
            <div><div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 32, color: "var(--record-draw)" }}>{gym.totalDraws}</div><div style={{ fontSize: 11, color: "var(--color-text-muted)", fontFamily: "var(--font-display)", textTransform: "uppercase" }}>EMPATES</div></div>
          </div>
          <div style={{ marginTop: 24 }}>
            <div className="progress-bar" style={{ height: 8, background: "rgba(255,255,255,0.05)" }}>
              <div className="progress-fill" style={{ width: `${winRate}%`, background: "var(--color-primary)" }} />
            </div>
            <div style={{ fontSize: 11, color: "var(--color-text-muted)", marginTop: 8, textAlign: "right", fontFamily: "var(--font-display)", fontWeight: 600, letterSpacing: "1px" }}>{winRate}% WIN RATE</div>
          </div>
        </div>

        {/* Coaches */}
        <div style={{ padding: "18px 20px", background: "var(--neutral-900)", border: "2px solid var(--color-border)", marginBottom: 16 }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 900, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 14 }}>🎯 HEAD COACHES</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {gym.coaches.map((coach, i) => (
              <div key={i} style={{ padding: "12px 14px", background: "var(--color-bg)", border: "1px solid var(--color-border)", display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 32, height: 32, background: "var(--color-primary)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 16, color: "black", flexShrink: 0 }}>{coach[0]}</div>
                <span style={{ fontSize: 14, fontWeight: 600, fontFamily: "var(--font-display)", textTransform: "uppercase", letterSpacing: "1px" }}>{coach}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Rivalry */}
        {rivalGym && (
          <div style={{ padding: "16px 20px", background: "var(--color-surface)", border: "2px solid var(--red-700)", borderLeft: "6px solid var(--red-600)", marginBottom: 16 }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 14, textTransform: "uppercase", letterSpacing: "1px", color: "var(--red-500)", marginBottom: 12 }}>🔥 RIVALIDAD DIRECTA</div>
            <Link href={`/gyms/${rivalGym.id}`} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 48, height: 48, background: "black", border: "2px solid var(--red-700)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", flexShrink: 0 }}>
                 <Image src="/gym-interior.png" alt={rivalGym.name} fill style={{ objectFit: "cover" }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 16, color: "white", textTransform: "uppercase" }}>{rivalGym.name}</div>
                <div style={{ fontSize: 11, color: "var(--color-text-muted)", fontFamily: "var(--font-display)", textTransform: "uppercase", letterSpacing: "1px" }}>{rivalGym.city} · REP {rivalGym.reputationScore}</div>
              </div>
              <div style={{ color: "var(--color-primary)", fontFamily: "var(--font-display)", fontSize: 20 }}>→</div>
            </Link>
          </div>
        )}

        {/* Roster */}
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 16, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 12 }}>
          Active Roster · <span style={{ color: "var(--color-primary)" }}>{roster.length}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {roster.map(f => <FighterCard key={f.id} fighter={f} compact />)}
          {roster.length === 0 && (
            <div style={{ textAlign: "center", padding: "30px", color: "var(--color-text-muted)", fontSize: 13 }}>Sin peleadores registrados aún</div>
          )}
        </div>

        {/* CTA */}
        <div style={{ marginTop: 16 }}>
          <Link href="/matchmaking" style={{ textDecoration: "none" }}>
            <button className="btn-primary" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              🥊 Retar al Gym
            </button>
          </Link>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
