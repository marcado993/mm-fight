"use client";
import Image from "next/image";
import Link from "next/link";
import { Gym, getFightersByGym, gyms } from "@/lib/data";
import FighterCard from "@/components/FighterCard";
import { useAuth } from "@/lib/auth";

export default function GymProfile({ gym }: { gym: Gym }) {
  const { user } = useAuth();
  const roster = getFightersByGym(gym.id);
  const rivalGym = gym.rivalry ? gyms.find(g => g.id === gym.rivalry) : null;
  const winRate = gym.totalWins + gym.totalLosses > 0
    ? Math.round((gym.totalWins / (gym.totalWins + gym.totalLosses)) * 100) : 0;

  return (
    <>
      {/* Hero */}
      <div style={{
        position: "relative", overflow: "hidden", padding: "40px 20px 32px",
        background: "var(--neutral-900)", borderBottom: "4px solid var(--color-primary)"
      }}>
        <div style={{ position: "absolute", top: -20, left: -20, fontSize: 160, fontFamily: "var(--font-display)", color: "rgba(255,255,255,0.02)", lineHeight: 1, pointerEvents: "none" }}>GYMS</div>
        <div style={{ display: "flex", gap: 20, alignItems: "center", position: "relative", zIndex: 1 }}>
          <div style={{ width: 90, height: 90, flexShrink: 0, position: "relative", overflow: "hidden", background: "black", border: "4px solid var(--color-primary)", boxShadow: "6px 6px 0px rgba(255,0,0,0.2)" }}>
            <Image src="/gym-interior.png" alt="Gym" fill style={{ objectFit: "cover" }} />
          </div>
          <div>
            <div style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
              <span style={{ background: "var(--color-primary)", color: "white", padding: "4px 8px", fontFamily: "var(--font-display)", fontSize: 12, textTransform: "uppercase", letterSpacing: "1px" }}>ELITE CAMP</span>
              <span style={{ border: "2px solid var(--color-border)", color: "var(--color-text-muted)", padding: "2px 8px", fontFamily: "var(--font-display)", fontSize: 12, textTransform: "uppercase", letterSpacing: "1px" }}>{gym.province}</span>
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 32, lineHeight: 1, letterSpacing: "1px", textTransform: "uppercase" }}>{gym.name}</h1>
            <div style={{ fontSize: 12, color: "var(--color-primary)", marginTop: 6, fontFamily: "var(--font-display)", textTransform: "uppercase", letterSpacing: "1px" }}>:: {gym.city}</div>
          </div>
        </div>
        <div style={{ marginTop: 24, padding: "16px", background: "black", border: "2px solid var(--color-border)", borderLeft: "6px solid var(--color-primary)", position: "relative", zIndex: 1 }}>
          <span style={{ position: "absolute", top: 4, right: 8, fontSize: 40, fontFamily: "serif", color: "rgba(255,255,255,0.05)", lineHeight: 1 }}>&ldquo;</span>
          <p style={{ fontSize: 14, color: "var(--color-text-secondary)", fontStyle: "italic", lineHeight: 1.5, fontFamily: "var(--font-body)", fontWeight: 500, textTransform: "uppercase" }}>{gym.tagline}</p>
        </div>
      </div>

      <main style={{ padding: "20px 16px", paddingBottom: "40px" }}>
        {/* Key stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 24 }}>
          {[
            { label: "Victorias", value: gym.totalWins, color: "var(--record-win)" },
            { label: "KO Rate", value: `${gym.koRate}%`, color: "var(--color-primary)" },
            { label: "Reputación", value: gym.reputationScore, color: "var(--yellow-500)" },
          ].map(({ label, value, color }) => (
            <div key={label} style={{ padding: "16px 8px", background: "var(--neutral-900)", border: "2px solid var(--color-border)", borderBottom: `4px solid ${color}`, textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 24, color, lineHeight: 1, marginBottom: 6 }}>{value}</div>
              <div style={{ fontSize: 10, color: "white", fontFamily: "var(--font-display)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Record */}
        <div style={{ padding: "20px 20px", background: "var(--neutral-900)", border: "2px solid var(--color-border)", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
             <div style={{ width: 12, height: 12, background: "var(--color-primary)", transform: "rotate(45deg)" }} />
             <div style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 900, textTransform: "uppercase", letterSpacing: "1px", color: "white" }}>RÉCORD ACUMULADO</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "black", border: "2px solid var(--color-border)", padding: "16px" }}>
            <div style={{ textAlign: "center", flex: 1 }}>
               <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 36, color: "var(--record-win)", lineHeight: 1 }}>{gym.totalWins}</div>
               <div style={{ fontSize: 10, color: "var(--color-text-muted)", fontFamily: "var(--font-display)", textTransform: "uppercase", letterSpacing: "1px", marginTop: 4 }}>VICTORIAS</div>
            </div>
            <div style={{ width: 2, height: 40, background: "var(--color-border)" }} />
            <div style={{ textAlign: "center", flex: 1 }}>
               <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 36, color: "var(--record-loss)", lineHeight: 1 }}>{gym.totalLosses}</div>
               <div style={{ fontSize: 10, color: "var(--color-text-muted)", fontFamily: "var(--font-display)", textTransform: "uppercase", letterSpacing: "1px", marginTop: 4 }}>DERROTAS</div>
            </div>
            <div style={{ width: 2, height: 40, background: "var(--color-border)" }} />
            <div style={{ textAlign: "center", flex: 1 }}>
               <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 36, color: "var(--record-draw)", lineHeight: 1 }}>{gym.totalDraws}</div>
               <div style={{ fontSize: 10, color: "var(--color-text-muted)", fontFamily: "var(--font-display)", textTransform: "uppercase", letterSpacing: "1px", marginTop: 4 }}>EMPATES</div>
            </div>
          </div>
          <div style={{ marginTop: 20 }}>
            <div className="progress-bar" style={{ height: 10, background: "rgba(255,255,255,0.05)", border: "1px solid var(--color-border)", borderRadius: 0 }}>
              <div className="progress-fill" style={{ width: `${winRate}%`, background: "var(--color-primary)" }} />
            </div>
            <div style={{ fontSize: 11, color: "var(--color-primary)", marginTop: 8, textAlign: "right", fontFamily: "var(--font-display)", fontWeight: 900, letterSpacing: "1px" }}>{winRate}% WIN RATE</div>
          </div>
        </div>

        {/* Coaches */}
        <div style={{ padding: "20px 20px", background: "var(--neutral-900)", border: "2px solid var(--color-border)", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
             <div style={{ width: 12, height: 12, background: "var(--color-primary)", transform: "rotate(45deg)" }} />
             <div style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 900, textTransform: "uppercase", letterSpacing: "1px", color: "white" }}>HEAD COACHES</div>
          </div>
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
          <div style={{ padding: "20px", background: "var(--color-surface)", border: "2px solid var(--red-700)", borderLeft: "6px solid var(--red-600)", marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
               <div style={{ width: 12, height: 12, background: "var(--red-600)", transform: "rotate(45deg)" }} />
               <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 16, textTransform: "uppercase", letterSpacing: "1px", color: "var(--red-500)" }}>RIVALIDAD DIRECTA</div>
            </div>
            <Link href={`/gyms/${rivalGym.id}`} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 16, background: "black", padding: "12px", border: "1px solid var(--color-border)" }}>
              <div style={{ width: 48, height: 48, background: "var(--neutral-900)", border: "2px solid var(--red-700)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", flexShrink: 0 }}>
                 <Image src="/gym-interior.png" alt={rivalGym.name} fill style={{ objectFit: "cover" }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 18, color: "white", textTransform: "uppercase", letterSpacing: "1px", lineHeight: 1.1 }}>{rivalGym.name}</div>
                <div style={{ fontSize: 11, color: "var(--color-text-muted)", fontFamily: "var(--font-display)", textTransform: "uppercase", letterSpacing: "2px", marginTop: 4 }}>{rivalGym.city} · REP {rivalGym.reputationScore}</div>
              </div>
              <div style={{ color: "var(--color-primary)", fontFamily: "var(--font-display)", fontSize: 24, paddingRight: 8 }}>→</div>
            </Link>
          </div>
        )}

        {/* Roster */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
           <div style={{ width: 12, height: 12, background: "var(--color-primary)", transform: "rotate(45deg)" }} />
           <div style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 900, textTransform: "uppercase", letterSpacing: "1px", color: "white" }}>
             ACTIVE ROSTER <span style={{ color: "var(--color-primary)", marginLeft: 8 }}>:: {roster.length}</span>
           </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {roster.map(f => <FighterCard key={f.id} fighter={f} compact />)}
          {roster.length === 0 && <div style={{ textAlign: "center", padding: "30px", color: "var(--color-text-muted)", fontSize: 13 }}>Sin peleadores registrados aún</div>}
        </div>

        {/* CTA */}
        {user?.role && user.role !== "normal" && (
          <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1fr" }}>
            <Link href="/matchmaking" style={{ textDecoration: "none" }}>
              <button className="btn-primary hover-lift" style={{ width: "100%", padding: "18px", fontSize: 16, border: "2px solid var(--color-primary)", background: "var(--color-primary)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, textTransform: "uppercase", fontFamily: "var(--font-display)", letterSpacing: "1px" }}>
                <div style={{ width: 12, height: 12, background: "white", transform: "rotate(45deg)" }} />
                RETAR AL GYM
              </button>
            </Link>
          </div>
        )}
      </main>
    </>
  );
}
