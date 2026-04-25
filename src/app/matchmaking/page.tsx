"use client";
import { useState, useEffect } from "react";
import AppShell from "@/components/AppShell";
import { challenges, getFighterById, getGymById } from "@/lib/data";
import type { Challenge } from "@/lib/data";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";

const statusConfig = {
  pending:   { label: "EN ESPERA",  color: "var(--yellow-400)", bg: "var(--neutral-900)", border: "var(--yellow-600)" },
  accepted:  { label: "PACTADO",   color: "var(--color-bg)",  bg: "var(--color-primary)", border: "var(--color-text)" },
  rejected:  { label: "DECLINADO",  color: "var(--color-bg)",    bg: "var(--neutral-500)", border: "var(--neutral-700)" },
  scheduled: { label: "PROGRAMADO", color: "white",   bg: "var(--blue-600)", border: "var(--color-text)" },
};

function ChallengeCard({ challenge, onAccept, onReject }: {
  challenge: Challenge;
  onAccept?: () => void;
  onReject?: () => void;
}) {
  const from = getFighterById(challenge.fromFighterId);
  const to   = getFighterById(challenge.toFighterId);
  const fromGym = getGymById(challenge.fromGymId);
  const toGym   = getGymById(challenge.toGymId);
  const status = statusConfig[challenge.status];
  const fromInit = from?.name.split(" ").map(n => n[0]).join("").slice(0,2).toUpperCase() ?? "??";
  const toInit   = to?.name.split(" ").map(n => n[0]).join("").slice(0,2).toUpperCase() ?? "??";

  return (
    <div style={{
      background: "var(--color-surface)",
      border: `4px solid ${challenge.status === "pending" ? "var(--color-primary)" : "var(--color-text)"}`,
      boxShadow: challenge.status === "pending" ? "6px 6px 0px rgba(208,0,0,0.4)" : "6px 6px 0px rgba(255,255,255,0.1)",
      marginBottom: 24,
      position: "relative"
    }}>
      {/* Status block top left */}
      <div style={{ position: "absolute", top: -4, left: -4, background: status.bg, border: `4px solid ${status.border}`, padding: "4px 12px", zIndex: 10 }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: 16, textTransform: "uppercase", color: status.color, textShadow: "1px 1px 0px rgba(0,0,0,0.5)" }}>
          {status.label}
        </span>
      </div>

      <div style={{ padding: "40px 24px 24px" }}>
        
        {/* Matchup */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 16, alignItems: "center", marginBottom: 24 }}>
          {/* Challenger */}
          <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{
              width: 80, height: 80, background: "var(--color-primary)",
              border: "4px solid var(--color-text)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-display)", fontSize: 32, color: "white",
              margin: "0 auto 12px",
            }}>{fromInit}</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 24, lineHeight: 1.1, textTransform: "uppercase" }}>{from?.name ?? "?"}</div>
            <div style={{ fontSize: 12, color: "var(--color-primary)", marginTop: 4, fontFamily: "var(--font-body)", fontWeight: 700, textTransform: "uppercase" }}>{fromGym?.name}</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 20, marginTop: 8, background: "var(--color-bg)", padding: "2px 8px", border: "2px solid var(--color-border)" }}>
              <span style={{ color: "var(--record-win)" }}>{from?.proRecord.w ?? 0}</span>
              <span style={{ color: "var(--color-text-muted)" }}>:</span>
              <span style={{ color: "var(--record-loss)" }}>{from?.proRecord.l ?? 0}</span>
            </div>
          </div>

          {/* VS block */}
          <div style={{
            width: 48, height: 48,
            background: "var(--color-text)", border: `4px solid ${challenge.status === "pending" ? "var(--color-primary)" : "var(--color-bg)"}`,
            fontFamily: "var(--font-display)", fontSize: 24, color: "var(--color-bg)",
            display: "flex", alignItems: "center", justifyContent: "center",
            transform: "rotate(-10deg)"
          }}>VS</div>

          {/* Defender */}
          <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{
              width: 80, height: 80, background: "var(--neutral-900)",
              border: "4px solid var(--color-text)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-display)", fontSize: 32, color: "white",
              margin: "0 auto 12px",
            }}>{toInit}</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 24, lineHeight: 1.1, textTransform: "uppercase" }}>{to?.name ?? "?"}</div>
            <div style={{ fontSize: 12, color: "var(--color-text-muted)", marginTop: 4, fontFamily: "var(--font-body)", fontWeight: 700, textTransform: "uppercase" }}>{toGym?.name}</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 20, marginTop: 8, background: "var(--neutral-900)", padding: "2px 8px", border: "2px solid var(--color-border)" }}>
              <span style={{ color: "white" }}>{to?.proRecord.w ?? 0}</span>
              <span style={{ color: "var(--color-text-muted)" }}>:</span>
              <span style={{ color: "var(--color-text-muted)" }}>{to?.proRecord.l ?? 0}</span>
            </div>
          </div>
        </div>

        {/* Message */}
        {challenge.message && (
          <div style={{ padding: "16px", background: "var(--neutral-900)", borderLeft: "8px solid var(--color-primary)", marginBottom: 16 }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 14, color: "var(--color-primary)", marginBottom: 4 }}>MENSAJE ABIERTO:</div>
            <p style={{ fontSize: 16, color: "white", fontFamily: "var(--font-body)", fontWeight: 700, textTransform: "uppercase" }}>"{challenge.message}"</p>
          </div>
        )}

        {/* Info Block */}
        <div style={{
          width: "100%", padding: "12px",
          background: "var(--color-bg)", border: "2px solid var(--color-border)",
          display: "flex", justifyContent: "center", gap: 16,
          fontFamily: "var(--font-display)", fontSize: 14, textTransform: "uppercase",
          flexWrap: "wrap", textAlign: "center", marginBottom: challenge.status === "pending" ? 24 : 0
        }}>
          <span style={{ color: "var(--color-primary)" }}>PESO: {challenge.weightClass}</span>
          {challenge.proposedDate && (
            <>
              <span style={{ color: "var(--color-border)" }}>|</span>
              <span style={{ color: "white" }}>FECHA: {new Date(challenge.proposedDate).toLocaleDateString("es-EC")}</span>
            </>
          )}
          {challenge.proposedVenue && (
            <>
              <span style={{ color: "var(--color-border)" }}>|</span>
              <span style={{ color: "var(--color-text-muted)" }}>SEDE: {challenge.proposedVenue}</span>
            </>
          )}
        </div>

        {/* Actions for pending */}
        {challenge.status === "pending" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 16 }}>
            <button onClick={onReject} style={{ padding: "16px", background: "transparent", border: "4px solid var(--color-text-muted)", color: "var(--color-text-muted)", fontFamily: "var(--font-display)", fontSize: 20, cursor: "pointer", textTransform: "uppercase" }}>IGNORAR</button>
            <button onClick={onAccept} style={{ padding: "16px", background: "var(--color-primary)", border: "4px solid var(--color-text)", color: "white", fontFamily: "var(--font-display)", fontSize: 20, cursor: "pointer", textTransform: "uppercase", boxShadow: "4px 4px 0px rgba(0,0,0,0.5)" }}>ACEPTAR CONDICIONES</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function MatchmakingPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState<"recibidos" | "enviados" | "historial">("recibidos");
  const [localChallenges, setLocalChallenges] = useState(challenges);
  const [showForm, setShowForm] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  useEffect(() => {
    if (!isLoading && !user) router.replace("/landing");
  }, [user, isLoading, router]);

  if (isLoading || !user) return null;

  const isGym = user.role === "gym";

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  const handleAccept = (id: string) => {
    setLocalChallenges(prev => prev.map(c => c.id === id ? { ...c, status: "accepted" } : c));
    showToast("RETO ACEPTADO. LA SANGRE ESTÁ SELLADA.");
  };
  const handleReject = (id: string) => {
    setLocalChallenges(prev => prev.map(c => c.id === id ? { ...c, status: "rejected" } : c));
    showToast("RETO IGNORADO.");
  };

  const received = localChallenges.filter(c => c.toFighterId === "f3" || c.toGymId === "g3");
  const sent     = localChallenges.filter(c => c.fromFighterId === "f2" || c.fromGymId === "g2");
  const history  = localChallenges.filter(c => c.status !== "pending");

  const tabData = tab === "recibidos" ? received : tab === "enviados" ? sent : history;

  return (
    <AppShell role={user.role}>
      <div style={{ paddingBottom: 40 }}>

      {/* Toast */}
      {toastMsg && (
        <div style={{
          position: "fixed", top: 80, left: "50%", transform: "translateX(-50%)",
          background: "var(--color-primary)", border: "4px solid var(--color-text)",
          padding: "16px 24px", zIndex: 200, color: "white",
          fontFamily: "var(--font-display)", fontSize: 20, textTransform: "uppercase",
          boxShadow: "6px 6px 0px rgba(0,0,0,0.8)"
        }}>{toastMsg}</div>
      )}

      {/* Header */}
      <div style={{ padding: "40px 20px 0", background: "var(--color-surface)", borderBottom: "4px solid var(--color-primary)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24, flexWrap: "wrap", gap: 16 }}>
          <div>
            <h1 style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: "var(--font-display)", fontSize: 48, letterSpacing: "2px", lineHeight: 1, textTransform: "uppercase", marginBottom: 8 }}>
              <Image src="/icon_swords.png" width={48} height={48} alt="War Room" />
              SALA DE GUERRA
            </h1>
            <p style={{ fontSize: 16, color: "var(--color-primary)", fontFamily: "var(--font-display)", textTransform: "uppercase", letterSpacing: "1px" }}>TERMINAL DE MATCHMAKING SUPERIOR</p>
          </div>
          {/* Only gym accounts can create challenges */}
          {isGym ? (
            <button style={{ padding: "16px 24px", background: "var(--color-text)", border: "none", color: "var(--color-bg)", fontFamily: "var(--font-display)", fontSize: 20, cursor: "pointer", textTransform: "uppercase" }} onClick={() => setShowForm(!showForm)}>
              + EMITIR DESAFÍO
            </button>
          ) : (
            <div style={{ padding: "8px 16px", background: "var(--neutral-900)", border: "2px solid var(--color-primary)" }}>
              <span style={{ fontSize: 12, color: "var(--color-primary)", fontFamily: "var(--font-display)", textTransform: "uppercase" }}>MODO LECTURA // SOLO GYMS DECLARAN GUERRA</span>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 16, marginTop: 32 }}>
          {(["recibidos","enviados","historial"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: "16px 24px", border: "none",
              background: tab === t ? "var(--color-primary)" : "transparent",
              cursor: "pointer", fontFamily: "var(--font-display)", fontSize: 20, textTransform: "uppercase",
              color: tab === t ? "white" : "var(--color-text-muted)",
              borderTop: "4px solid", borderLeft: "4px solid", borderRight: "4px solid",
              borderColor: tab === t ? "var(--color-text)" : "transparent",
              marginBottom: -4
            }}>{t}</button>
          ))}
        </div>
      </div>

      {/* New Challenge Form */}
      {showForm && (
        <div style={{ margin: "24px 16px", padding: "24px", background: "var(--color-surface)", border: "4px solid var(--color-text)", boxShadow: "6px 6px 0px var(--color-primary)" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 24, textTransform: "uppercase", marginBottom: 20 }}>REDACTAR NUEVO RETO OFICIAL</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <input style={{ padding: "16px", background: "var(--neutral-900)", border: "4px solid var(--color-border)", color: "white", fontFamily: "var(--font-display)", fontSize: 16, outline: "none", textTransform: "uppercase" }} placeholder="OBJETIVO (NOMBRE DEL PELEADOR)..." />
            <input style={{ padding: "16px", background: "var(--neutral-900)", border: "4px solid var(--color-border)", color: "white", fontFamily: "var(--font-display)", fontSize: 16, outline: "none", textTransform: "uppercase" }} placeholder="CATEGORÍA DE PESO LIMITADA..." />
            <textarea style={{ padding: "16px", background: "var(--neutral-900)", border: "4px solid var(--color-border)", color: "white", fontFamily: "var(--font-display)", fontSize: 16, outline: "none", textTransform: "uppercase", resize: "none", height: 120 }} placeholder="MENSAJE DE PROVOCACIÓN ABIERTA..." />
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 16, marginTop: 8 }}>
              <button onClick={() => setShowForm(false)} style={{ padding: "16px", background: "transparent", border: "4px solid var(--color-text-muted)", color: "var(--color-text-muted)", fontFamily: "var(--font-display)", fontSize: 20, cursor: "pointer", textTransform: "uppercase" }}>RETIRADA</button>
              <button onClick={() => { setShowForm(false); showToast("MISIVA ENVIADA CON ÉXITO."); }} style={{ padding: "16px", background: "var(--color-primary)", border: "4px solid var(--color-text)", color: "white", fontFamily: "var(--font-display)", fontSize: 20, cursor: "pointer", textTransform: "uppercase", boxShadow: "4px 4px 0px rgba(0,0,0,0.5)" }}>EJECUTAR DESAFÍO</button>
            </div>
          </div>
        </div>
      )}

      <main style={{ padding: "40px 16px" }}>
        {tabData.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 20px", color: "var(--color-text-muted)", background: "var(--color-surface)", border: "4px dashed var(--color-border)" }}>
            <Image src="/icon_swords.png" width={64} height={64} alt="Empty" style={{ opacity: 0.5, marginBottom: 16 }} />
            <div style={{ fontFamily: "var(--font-display)", fontSize: 24, textTransform: "uppercase" }}>LA ARENA ESTÁ VACÍA ({tab})</div>
            <div style={{ fontSize: 14, fontFamily: "var(--font-body)", fontWeight: 700, textTransform: "uppercase", marginTop: 8 }}>NO HAY ACTIVIDAD DETECTADA</div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {tabData.map(c => (
              <ChallengeCard
                key={c.id} challenge={c}
                onAccept={() => handleAccept(c.id)}
                onReject={() => handleReject(c.id)}
              />
            ))}
          </div>
        )}
      </main>
      </div>
    </AppShell>
  );
}
