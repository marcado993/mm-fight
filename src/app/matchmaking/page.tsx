"use client";
import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import TopBar from "@/components/TopBar";
import { challenges, getFighterById, getGymById } from "@/lib/data";
import type { Challenge } from "@/lib/data";

const statusConfig = {
  pending:   { label: "Pendiente",  color: "var(--yellow-500)", bg: "rgba(234,179,8,0.12)" },
  accepted:  { label: "Aceptado",   color: "var(--green-500)",  bg: "rgba(34,197,94,0.12)" },
  rejected:  { label: "Rechazado",  color: "var(--red-400)",    bg: "rgba(239,68,68,0.12)" },
  scheduled: { label: "Programado", color: "var(--blue-500)",   bg: "rgba(59,130,246,0.12)" },
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
      background: "var(--card-bg)", borderRadius: 20,
      border: `1px solid ${challenge.status === "pending" ? "var(--color-primary)" : "var(--card-border)"}`,
      overflow: "hidden"
    }}>
      {/* Status bar */}
      <div style={{ padding: "10px 16px", background: status.bg, display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: status.color }} />
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: status.color }}>
          {status.label}
        </span>
        <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--color-text-muted)" }}>
          {challenge.weightClass}
        </span>
      </div>

      {/* Matchup */}
      <div style={{ padding: "20px 16px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 12, alignItems: "center", marginBottom: 16 }}>
          {/* Challenger */}
          <div style={{ textAlign: "center" }}>
            <div style={{
              width: 60, height: 60, borderRadius: "50%", margin: "0 auto 8px",
              background: "linear-gradient(135deg, var(--red-800), var(--red-600))",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 18, color: "white",
              border: "2px solid var(--color-primary)"
            }}>{fromInit}</div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 13, lineHeight: 1.2 }}>{from?.name ?? "?"}</div>
            <div style={{ fontSize: 11, color: "var(--color-text-muted)", marginTop: 2 }}>{fromGym?.name}</div>
            <div className="record-display" style={{ fontSize: 13, justifyContent: "center", marginTop: 4 }}>
              <span className="record-w">{from?.proRecord.w ?? 0}</span>
              <span style={{ color: "var(--color-text-muted)", fontWeight: 400, fontSize: 11 }}>-</span>
              <span className="record-l">{from?.proRecord.l ?? 0}</span>
            </div>
          </div>

          {/* VS */}
          <div style={{
            padding: "8px 14px", background: "var(--color-primary)", borderRadius: 10,
            fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 16, color: "white"
          }}>VS</div>

          {/* Defender */}
          <div style={{ textAlign: "center" }}>
            <div style={{
              width: 60, height: 60, borderRadius: "50%", margin: "0 auto 8px",
              background: "linear-gradient(135deg, var(--neutral-700), var(--neutral-600))",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 18, color: "white",
              border: "2px solid var(--card-border)"
            }}>{toInit}</div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 13, lineHeight: 1.2 }}>{to?.name ?? "?"}</div>
            <div style={{ fontSize: 11, color: "var(--color-text-muted)", marginTop: 2 }}>{toGym?.name}</div>
            <div className="record-display" style={{ fontSize: 13, justifyContent: "center", marginTop: 4 }}>
              <span className="record-w">{to?.proRecord.w ?? 0}</span>
              <span style={{ color: "var(--color-text-muted)", fontWeight: 400, fontSize: 11 }}>-</span>
              <span className="record-l">{to?.proRecord.l ?? 0}</span>
            </div>
          </div>
        </div>

        {/* Message */}
        {challenge.message && (
          <div style={{ padding: "10px 14px", background: "var(--color-surface-raised)", borderRadius: 10, marginBottom: 14, borderLeft: "3px solid var(--color-primary)" }}>
            <p style={{ fontSize: 13, color: "var(--color-text-secondary)", fontStyle: "italic" }}>&ldquo;{challenge.message}&rdquo;</p>
          </div>
        )}

        {/* Scheduled info */}
        {(challenge.proposedDate || challenge.proposedVenue) && (
          <div style={{ padding: "10px 14px", background: "var(--color-surface-raised)", borderRadius: 10, marginBottom: 14 }}>
            {challenge.proposedDate && (
              <div style={{ fontSize: 12, color: "var(--color-text-muted)", marginBottom: 2 }}>
                📅 {new Date(challenge.proposedDate).toLocaleDateString("es-EC", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
              </div>
            )}
            {challenge.proposedVenue && (
              <div style={{ fontSize: 12, color: "var(--color-text-muted)" }}>📍 {challenge.proposedVenue}</div>
            )}
          </div>
        )}

        {/* Actions for pending */}
        {challenge.status === "pending" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <button onClick={onReject} className="btn-secondary" style={{ width: "100%", padding: "10px 16px", fontSize: 13 }}>✕ Rechazar</button>
            <button onClick={onAccept} className="btn-primary" style={{ width: "100%", padding: "10px 16px", fontSize: 13 }}>✓ Aceptar</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function MatchmakingPage() {
  const [tab, setTab] = useState<"recibidos" | "enviados" | "historial">("recibidos");
  const [localChallenges, setLocalChallenges] = useState(challenges);
  const [showForm, setShowForm] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  const handleAccept = (id: string) => {
    setLocalChallenges(prev => prev.map(c => c.id === id ? { ...c, status: "accepted" } : c));
    showToast("✅ Reto aceptado. ¡Que empiece la batalla!");
  };
  const handleReject = (id: string) => {
    setLocalChallenges(prev => prev.map(c => c.id === id ? { ...c, status: "rejected" } : c));
    showToast("❌ Reto rechazado.");
  };

  const received = localChallenges.filter(c => c.toFighterId === "f3" || c.toGymId === "g3");
  const sent     = localChallenges.filter(c => c.fromFighterId === "f2" || c.fromGymId === "g2");
  const history  = localChallenges.filter(c => c.status !== "pending");

  const tabData = tab === "recibidos" ? received : tab === "enviados" ? sent : history;

  return (
    <div style={{ background: "var(--color-bg)", minHeight: "100dvh", paddingBottom: 100 }}>
      <TopBar title="War Room" />

      {/* Toast */}
      {toastMsg && (
        <div style={{
          position: "fixed", top: 80, left: "50%", transform: "translateX(-50%)",
          background: "var(--card-bg)", border: "1px solid var(--color-border)",
          padding: "12px 20px", borderRadius: 12, zIndex: 200,
          fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 13,
          boxShadow: "0 8px 24px rgba(0,0,0,0.5)"
        }}>{toastMsg}</div>
      )}

      {/* Header */}
      <div style={{ padding: "20px 20px 0", background: "linear-gradient(180deg, #1a0505 0%, var(--color-bg) 100%)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
          <div>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 28, letterSpacing: "-0.03em" }}>⚔️ WAR ROOM</h1>
            <p style={{ fontSize: 13, color: "var(--color-text-muted)", marginTop: 2 }}>Matchmaking Terminal</p>
          </div>
          <button className="btn-primary" style={{ padding: "10px 16px", fontSize: 12 }} onClick={() => setShowForm(!showForm)}>
            + Nuevo Reto
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 0, marginTop: 20, borderBottom: "1px solid var(--color-border)" }}>
          {(["recibidos","enviados","historial"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: "10px 16px", border: "none", background: "none", cursor: "pointer",
              fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 12, textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: tab === t ? "var(--color-primary)" : "var(--color-text-muted)",
              borderBottom: tab === t ? "2px solid var(--color-primary)" : "2px solid transparent",
              marginBottom: -1, transition: "color 0.2s"
            }}>{t}</button>
          ))}
        </div>
      </div>

      {/* New Challenge Form */}
      {showForm && (
        <div style={{ margin: "16px 16px 0", padding: "20px", background: "var(--card-bg)", borderRadius: 16, border: "1px solid var(--color-primary)" }}>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 16, marginBottom: 14 }}>Nuevo Reto</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <input className="input-dark" placeholder="Peleador contrincante..." />
            <input className="input-dark" placeholder="Categoría de peso..." />
            <textarea className="input-dark" placeholder="Mensaje (callout)..." style={{ resize: "none", height: 80 }} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <button className="btn-secondary" onClick={() => setShowForm(false)} style={{ fontSize: 13 }}>Cancelar</button>
              <button className="btn-primary" onClick={() => { setShowForm(false); showToast("🚀 Reto enviado!"); }} style={{ fontSize: 13 }}>Enviar Reto</button>
            </div>
          </div>
        </div>
      )}

      <main style={{ padding: "16px" }}>
        {tabData.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--color-text-muted)" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>⚔️</div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>Sin retos {tab}</div>
            <div style={{ fontSize: 13, marginTop: 4 }}>Los retos aparecerán aquí</div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
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

      <BottomNav />
    </div>
  );
}
