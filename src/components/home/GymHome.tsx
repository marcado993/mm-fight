"use client";
import Link from "next/link";
import { fighters as allFighters, events, challenges, gyms } from "@/lib/data";
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

export default function GymHome({ user }: { user: UserProfile }) {
  const nextEvent = events.find(e => e.status === "upcoming");
  const myGym = user.gymId ? gyms.find(g => g.id === user.gymId) : gyms[0]; // fallback for demo
  const myFighters = allFighters.filter(f => f.gymId === (myGym?.id ?? "g1")).slice(0, 4);
  const activeChallenges = challenges.filter(c => c.status !== "rejected").slice(0, 3);

  const initials = (user.gymName ?? user.name).split(" ").map(w => w[0]).join("").slice(0,2).toUpperCase();

  return (
    <main style={{ padding: "0 16px 40px" }}>

      {/* ── Welcome ── */}
      <div style={{ margin: "20px 0 24px", display: "flex", alignItems: "flex-end", justifyItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 12, color: "var(--color-primary)", fontFamily: "var(--font-display)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 4 }}>
            COMANDO DEL GIMNASIO
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 36, letterSpacing: "1px", textTransform: "uppercase", lineHeight: 1 }}>
            {user.gymName ?? user.name}
          </div>
        </div>
        <span style={{ 
            fontFamily: "var(--font-display)", fontSize: 16, color: "var(--color-bg)", 
            background: "var(--orange-500)", padding: "4px 12px", textTransform: "uppercase", 
            border: "2px solid var(--color-bg)", transform: "skewX(-10deg)" 
        }}>
          <span style={{ transform: "skewX(10deg)", display: "block" }}>ADMIN</span>
        </span>
      </div>

      {/* ── Gym stats card ── */}
      <div style={{
        marginBottom: 32, padding: "24px",
        background: "var(--color-surface)",
        border: "4px solid var(--color-text)",
        boxShadow: "6px 6px 0px var(--color-primary)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", right: -20, top: "40%", transform: "translateY(-50%)", opacity: 0.1, userSelect: "none" }}>
          <Image src="/gym_interior_hero_1777139781576.png" width={400} height={400} alt="Gym Background" style={{ objectFit: "cover" }} />
        </div>
        
        <div style={{ position: "relative", zIndex: 10 }}>
          <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 24 }}>
            <div style={{
              width: 80, height: 80, background: "var(--neutral-900)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-display)", fontSize: 32, color: "white",
              border: "4px solid var(--color-primary)",
            }}>{initials}</div>
            
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 28, textTransform: "uppercase", lineHeight: 1, marginBottom: 4 }}>{user.gymName ?? user.name}</div>
              <div style={{ fontSize: 14, color: "var(--color-text-muted)", fontFamily: "var(--font-display)", textTransform: "uppercase" }}>
                UBICACIÓN: {user.gymCity ?? myGym?.city ?? "Ecuador"} // PROVINCIA: {user.gymProvince ?? myGym?.province ?? ""}
              </div>
            </div>
            
            <div style={{ marginLeft: "auto", textAlign: "right", background: "var(--neutral-900)", padding: "12px", border: "2px solid var(--color-border)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 36, color: "var(--orange-500)", lineHeight: 1 }}>{myGym?.reputationScore ?? "N/A"}</div>
              <div style={{ fontSize: 12, color: "var(--color-text-muted)", fontFamily: "var(--font-body)", fontWeight: 700, textTransform: "uppercase" }}>REPUTACIÓN</div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 24 }}>
            {[
              { label: "Peleadores", value: myGym?.activeFighters ?? myFighters.length, color: "white" },
              { label: "Victorias",  value: myGym?.totalWins ?? 0,     color: "var(--record-win)" },
              { label: "Tasa de KO",    value: `${myGym?.koRate ?? 0}%`,  color: "var(--color-primary)" },
            ].map(({ label, value, color }) => (
              <div key={label} style={{ textAlign: "center", padding: "16px", background: "var(--neutral-900)", border: "2px solid var(--color-border)" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 36, color, lineHeight: 1, marginBottom: 4 }}>{value}</div>
                <div style={{ fontSize: 12, color: "var(--color-text-muted)", fontFamily: "var(--font-body)", fontWeight: 700, textTransform: "uppercase" }}>{label}</div>
              </div>
            ))}
          </div>

          <Link href="/matchmaking" style={{ textDecoration: "none" }}>
            <button style={{ width: "100%", padding: "16px", background: "var(--color-primary)", border: "4px solid var(--color-text)", color: "white", fontFamily: "var(--font-display)", fontSize: 20, textTransform: "uppercase", letterSpacing: "1px", cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", gap: 8, boxShadow: "4px 4px 0px rgba(0,0,0,0.4)" }}>
              <Image src="/icon_swords.png" width={24} height={24} alt="Swords" /> INICIAR UN RETO OFICIAL
            </button>
          </Link>
        </div>
      </div>

      {/* ── My fighters ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, letterSpacing: "1px", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 8 }}>
          <Image src="/icon_glove.png" alt="Glove" width={24} height={24} /> TU ESTABLO
        </h2>
        <Link href="/fighters" style={{ fontSize: 14, color: "var(--color-primary)", textDecoration: "none", fontFamily: "var(--font-display)", textTransform: "uppercase", letterSpacing: "1px" }}>GESTIONAR →</Link>
      </div>

      {myFighters.length === 0 ? (
        <div style={{ padding: "40px 20px", textAlign: "center", background: "var(--color-surface)", border: "4px solid var(--color-border)", marginBottom: 32 }}>
          <Image src="/icon_glove.png" alt="Glove" width={48} height={48} style={{ opacity: 0.5, marginBottom: 16 }} />
          <div style={{ fontFamily: "var(--font-display)", fontSize: 24, textTransform: "uppercase", marginBottom: 8 }}>SIN COMBATIENTES AÚN</div>
          <div style={{ fontSize: 14, color: "var(--color-text-muted)", fontFamily: "var(--font-body)", fontWeight: 700, textTransform: "uppercase" }}>Invita peleadores a afiliarse a tu gimnasio</div>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16, marginBottom: 40 }}>
          {myFighters.map(f => {
            const fInitials = f.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
            return (
              <Link key={f.id} href={`/fighters/${f.id}`} style={{ textDecoration: "none" }}>
                <div style={{ padding: "16px", background: "var(--color-surface)", border: "4px solid var(--color-text)", display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{
                    width: 60, height: 60, background: "var(--neutral-800)", border: "2px solid var(--color-border)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "var(--font-display)", fontSize: 24, flexShrink: 0,
                    color: "white"
                  }}>{fInitials}</div>
                  
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: 24, textTransform: "uppercase", lineHeight: 1.1, marginBottom: 4 }}>{f.name}</div>
                    <div style={{ fontSize: 12, color: "var(--color-text-muted)", fontFamily: "var(--font-body)", fontWeight: 700, textTransform: "uppercase" }}>{f.weightClass} // {f.style}</div>
                  </div>
                  
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: 24, marginBottom: 4 }}>
                      <span style={{ color: "var(--record-win)" }}>{f.proRecord.w}</span>
                      <span style={{ color: "var(--color-text-muted)", margin: "0 4px" }}>:</span>
                      <span style={{ color: "var(--record-loss)" }}>{f.proRecord.l}</span>
                    </div>
                    <span style={{ fontSize: 10, padding: "2px 8px", background: f.level === "Pro" ? "var(--color-primary)" : "var(--neutral-600)", border: "2px solid var(--color-bg)", fontFamily: "var(--font-display)", textTransform: "uppercase", color: "white" }}>
                      {f.level}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* ── Active Challenges ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, letterSpacing: "1px", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 8 }}>
          <Image src="/icon_swords.png" alt="Swords" width={24} height={24} /> RETOS ACTIVOS
        </h2>
        <Link href="/matchmaking" style={{ fontSize: 14, color: "var(--color-primary)", textDecoration: "none", fontFamily: "var(--font-display)", textTransform: "uppercase", letterSpacing: "1px" }}>VER TODOS →</Link>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 40 }}>
        {activeChallenges.map(ch => {
          const from = allFighters.find(f => f.id === ch.fromFighterId);
          const to   = allFighters.find(f => f.id === ch.toFighterId);
          return (
            <div key={ch.id} style={{ padding: "20px", background: "var(--color-surface)", border: "4px solid var(--color-border)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 20, textTransform: "uppercase", lineHeight: 1.1 }}>
                  {from?.name ?? "?"} <span style={{ color: "var(--color-primary)" }}>VS</span> {to?.name ?? "?"}
                </div>
                <span style={{ fontSize: 12, padding: "4px 8px", background: statusColors[ch.status], color: statusColors[ch.status] === "var(--color-primary)" ? "white" : "black", fontFamily: "var(--font-display)", textTransform: "uppercase", border: "2px solid var(--color-bg)" }}>
                  {statusLabels[ch.status]}
                </span>
              </div>
              <div style={{ fontSize: 12, color: "var(--color-text-muted)", marginBottom: 4, fontFamily: "var(--font-body)", fontWeight: 700, textTransform: "uppercase" }}>
                CATEGORÍA: {ch.weightClass} {ch.proposedDate ? `// 📅 FECHA: ${new Date(ch.proposedDate).toLocaleDateString("es-EC")}` : ""}
              </div>
              {ch.proposedVenue && <div style={{ fontSize: 12, color: "var(--color-primary)", fontFamily: "var(--font-body)", fontWeight: 700, textTransform: "uppercase" }}>📍 LUGAR PROPUESTO: {ch.proposedVenue}</div>}
            </div>
          );
        })}
      </div>

      {/* ── Next event ── */}
      {nextEvent && (
        <>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
            <Image src="/icon_stadium.png" alt="Stadium" width={24} height={24} /> EVENTO PRÓXIMO
          </h2>
          <Link href="/events" style={{ textDecoration: "none" }}>
            <div style={{ padding: "20px", background: "var(--color-surface)", border: "4px solid var(--color-text)", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", boxShadow: "6px 6px 0px var(--color-text)" }}>
              <div>
                <span style={{ background: "var(--color-primary)", color: "white", padding: "2px 8px", fontFamily: "var(--font-display)", fontSize: 12, textTransform: "uppercase", marginBottom: 8, display: "inline-block" }}>{nextEvent.type}</span>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 32, lineHeight: 1.1, marginBottom: 4, textTransform: "uppercase" }}>{nextEvent.name}</div>
                <div style={{ fontSize: 12, color: "var(--color-text-muted)", marginTop: 8, fontFamily: "var(--font-body)", fontWeight: 700, textTransform: "uppercase" }}>
                  📍 {nextEvent.city} // {nextEvent.fights.length} PELEAS CONFIRMADAS
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
