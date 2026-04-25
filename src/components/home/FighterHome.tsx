"use client";
import Link from "next/link";
import { fighters, events, challenges, gyms } from "@/lib/data";
import type { UserProfile } from "@/lib/auth";
import Image from "next/image";

const statusColors: Record<string, string> = {
  pending: "var(--yellow-500)", accepted: "var(--color-primary)",
  rejected: "var(--color-text-muted)", scheduled: "var(--color-primary)",
};
const statusLabels: Record<string, string> = {
  pending: "PENDIENTE", accepted: "ACEPTADO",
  rejected: "RECHAZADO", scheduled: "PROGRAMADO",
};

export default function FighterHome({ user }: { user: UserProfile }) {
  const nextEvent = events.find(e => e.status === "upcoming");
  const liveEvent  = events.find(e => e.status === "live");
  const myGym = user.gymId ? gyms.find(g => g.id === user.gymId) : null;
  const myChallenges = challenges.slice(0, 2);

  return (
    <main style={{ padding: "0 16px 40px" }}>

      {/* ── Welcome ── */}
      <div style={{ margin: "20px 0 24px", display: "flex", alignItems: "flex-end", justifyItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 12, color: "var(--color-primary)", fontFamily: "var(--font-display)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 4 }}>
            PELEADOR ACTIVO
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 36, letterSpacing: "1px", textTransform: "uppercase", lineHeight: 1 }}>
            {user.name}
          </div>
        </div>
        <span style={{ 
            fontFamily: "var(--font-display)", fontSize: 16, color: "white", 
            background: user.verified ? "var(--color-primary)" : "var(--color-text-muted)", 
            padding: "4px 12px", textTransform: "uppercase", border: "2px solid var(--color-text)", transform: "skewX(-10deg)" 
        }}>
          <span style={{ transform: "skewX(10deg)", display: "block" }}>
             {user.verified ? "VERIFICADO" : "SIN VERIFICAR"}
          </span>
        </span>
      </div>

      {/* ── Fighter profile card ── */}
      <div style={{
        marginBottom: 32, padding: "24px",
        background: "var(--color-surface)",
        border: "4px solid var(--color-text)",
        boxShadow: "6px 6px 0px var(--color-primary)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", right: -40, top: "50%", transform: "translateY(-50%)", opacity: 0.1, userSelect: "none" }}>
          <Image src="/fighter_silhouette_1777139755513.png" width={250} height={300} alt="Fighter" />
        </div>
        
        <div style={{ position: "relative", zIndex: 10 }}>
          <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 24 }}>
            <div style={{
              width: 80, height: 80, background: "var(--neutral-900)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-display)", fontSize: 32, color: "white",
              border: "4px solid var(--color-primary)",
            }}>
              {user.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 28, textTransform: "uppercase", lineHeight: 1, marginBottom: 4 }}>{user.name}</div>
              <div style={{ fontSize: 14, color: "var(--color-primary)", fontFamily: "var(--font-display)", textTransform: "uppercase" }}>
                {user.weightClass && `⚖ ${user.weightClass}`} {myGym ? `// 🏟 ${myGym.name}` : ""}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 24 }}>
            {[
              { label: "Victorias", value: "0", color: "var(--record-win)" },
              { label: "Derrotas",  value: "0", color: "var(--record-loss)" },
              { label: "Empates",   value: "0", color: "var(--neutral-400)" },
            ].map(({ label, value, color }) => (
              <div key={label} style={{ textAlign: "center", padding: "16px", background: "var(--neutral-900)", border: "2px solid var(--color-border)" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 36, color, lineHeight: 1, marginBottom: 4 }}>{value}</div>
                <div style={{ fontSize: 12, color: "white", fontFamily: "var(--font-body)", fontWeight: 700, textTransform: "uppercase" }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Verify ID button */}
          {!user.verified ? (
            <Link href="/verify-identity" style={{ textDecoration: "none" }}>
              <button style={{ width: "100%", padding: "16px", background: "var(--color-text)", border: "none", color: "var(--color-bg)", fontFamily: "var(--font-display)", fontSize: 20, textTransform: "uppercase", letterSpacing: "1px", cursor: "pointer", boxShadow: "4px 4px 0px var(--color-primary)" }}>
                VERIFICAR IDENTIDAD PARA PELEAR Oficialmente
              </button>
            </Link>
          ) : (
            <div style={{ padding: "16px", background: "var(--color-primary)", border: "4px solid var(--color-text)", color: "white", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 20, textTransform: "uppercase" }}>PERFIL OFICIAL VERIFICADO</div>
            </div>
          )}
        </div>
      </div>

      {/* ── Live event ── */}
      {liveEvent && (
        <div style={{ marginBottom: 20, padding: "16px", background: "var(--color-primary)", border: "4px solid var(--color-text)", display: "flex", alignItems: "center", gap: 10, boxShadow: "4px 4px 0px rgba(255,255,255,0.2)" }}>
          <span className="live-dot" style={{ background: "var(--neutral-900)" }} />
          <span style={{ fontFamily: "var(--font-display)", fontSize: 20, textTransform: "uppercase", letterSpacing: "1px", color: "var(--neutral-900)" }}>EN VIVO: {liveEvent.name}</span>
        </div>
      )}

      {/* ── My Challenges ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, letterSpacing: "1px", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 8 }}>
          <Image src="/icon_swords.png" alt="Swords" width={24} height={24} /> TUS RETOS
        </h2>
        <Link href="/matchmaking" style={{ fontSize: 14, color: "var(--color-primary)", textDecoration: "none", fontFamily: "var(--font-display)", textTransform: "uppercase", letterSpacing: "1px" }}>GESTIONAR →</Link>
      </div>

      <div style={{ marginBottom: 16, padding: "12px", background: "var(--neutral-900)", borderLeft: "4px solid var(--color-primary)", color: "white", fontFamily: "var(--font-body)", fontSize: 12, textTransform: "uppercase", fontWeight: 700 }}>
        // Solo los gimnasios pueden INICIAR desafíos. Acepta tu destino abajo.
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 40 }}>
        {myChallenges.map(ch => {
          const from = fighters.find(f => f.id === ch.fromFighterId);
          const to = fighters.find(f => f.id === ch.toFighterId);
          return (
            <div key={ch.id} style={{ padding: "20px", background: "var(--color-surface)", border: "4px solid var(--color-border)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 24, textTransform: "uppercase", lineHeight: 1.1 }}>
                  {from?.name ?? "?"} <span style={{ color: "var(--color-primary)" }}>VS</span> {to?.name ?? "?"}
                </div>
                <span style={{ fontSize: 14, padding: "4px 12px", background: statusColors[ch.status], color: statusColors[ch.status] === "var(--color-primary)" ? "white" : "black", fontFamily: "var(--font-display)", textTransform: "uppercase", border: "2px solid var(--color-bg)" }}>
                  {statusLabels[ch.status]}
                </span>
              </div>
              <div style={{ fontSize: 14, color: "var(--color-text-muted)", marginBottom: ch.status === "pending" ? 16 : 0, fontFamily: "var(--font-display)", textTransform: "uppercase" }}>
                CATEGORÍA: {ch.weightClass} // INICIADO: {new Date(ch.createdAt).toLocaleDateString("es-EC")}
              </div>
              {ch.message && <div style={{ fontSize: 14, color: "var(--color-primary)", fontFamily: "var(--font-body)", fontWeight: 700, marginBottom: ch.status === "pending" ? 16 : 0, borderLeft: "2px solid var(--color-primary)", paddingLeft: 8 }}>"{ch.message}"</div>}
              {ch.status === "pending" && (
                <div style={{ display: "flex", gap: 12 }}>
                  <button style={{ flex: 1, padding: "12px", background: "transparent", border: "4px solid var(--color-text-muted)", color: "var(--color-text-muted)", fontFamily: "var(--font-display)", fontSize: 18, cursor: "pointer", textTransform: "uppercase" }}>IGNORAR</button>
                  <button style={{ flex: 1, padding: "12px", background: "var(--color-primary)", border: "4px solid var(--color-primary)", color: "white", fontFamily: "var(--font-display)", fontSize: 18, cursor: "pointer", textTransform: "uppercase" }}>ACEPTAR RETO</button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Next event preview ── */}
      {nextEvent && (
        <>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
            <Image src="/icon_stadium.png" alt="Stadium" width={24} height={24} /> EL PRÓXIMO CHOQUE
          </h2>
          <Link href="/events" style={{ textDecoration: "none" }}>
            <div style={{ padding: "20px", background: "var(--color-surface)", border: "4px solid var(--color-text)", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", boxShadow: "6px 6px 0px var(--color-text)" }}>
              <div>
                <span style={{ background: "var(--color-primary)", color: "white", padding: "2px 8px", fontFamily: "var(--font-display)", fontSize: 12, textTransform: "uppercase", marginBottom: 8, display: "inline-block" }}>{nextEvent.type}</span>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 32, lineHeight: 1.1, marginBottom: 4, textTransform: "uppercase" }}>{nextEvent.name}</div>
                <div style={{ fontSize: 12, color: "var(--color-text-muted)", marginTop: 8, fontFamily: "var(--font-body)", fontWeight: 700, textTransform: "uppercase" }}>
                  📍 {nextEvent.venue}, {nextEvent.city}
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0, background: "var(--color-bg)", padding: "12px", border: "2px solid var(--color-border)" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 40, lineHeight: 1, color: "var(--color-primary)" }}>{new Date(nextEvent.date).getDate()}</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 14, color: "var(--color-text-muted)", textTransform: "uppercase" }}>{new Date(nextEvent.date).toLocaleDateString("es-EC", { month: "short" })}</div>
              </div>
            </div>
          </Link>
        </>
      )}
    </main>
  );
}
