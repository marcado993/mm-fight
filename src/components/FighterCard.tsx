import Link from "next/link";
import type { Fighter } from "@/lib/data";

interface FighterCardProps {
  fighter: Fighter;
  showRank?: boolean;
  compact?: boolean;
}

const styleColors: Record<string, string> = {
  Striker:  "var(--red-500)",
  Grappler: "var(--blue-500)",
  Mixto:    "var(--orange-500)",
};

/** Octagon avatar using clip-path */
function OctagonAvatar({
  initials, size = 64, border = true,
}: { initials: string; size?: number; border?: boolean }) {
  const inner = size - (border ? 6 : 0);
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      {/* Border ring */}
      {border && (
        <div
          className="clip-octagon"
          style={{
            position: "absolute", inset: 0,
            background: "var(--color-primary)",
          }}
        />
      )}
      {/* Inner fill */}
      <div
        className="clip-octagon"
        style={{
          position: "absolute",
          inset: border ? 3 : 0,
          background: "linear-gradient(135deg, var(--red-800), var(--neutral-700))",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        <span style={{
          fontFamily: "var(--font-display)", fontWeight: 900,
          fontSize: inner * 0.3, color: "white",
          userSelect: "none",
        }}>{initials}</span>
      </div>
    </div>
  );
}

export { OctagonAvatar };

export default function FighterCard({ fighter, showRank = false, compact = false }: FighterCardProps) {
  const { proRecord: p, amateurRecord: a } = fighter;
  const proTotal = p.w + p.l + p.d;
  const initials = fighter.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  if (compact) {
    return (
      <Link href={`/fighters/${fighter.id}`} style={{ textDecoration: "none" }}>
        <div className="card-cut" style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}>
          <OctagonAvatar initials={initials} size={48} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 14, color: "var(--color-text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {fighter.nickname ? `"${fighter.nickname}"` : fighter.name}
            </div>
            <div style={{ fontSize: 12, color: "var(--color-text-muted)", marginTop: 2 }}>{fighter.name} · {fighter.weightClass}</div>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <div className="record-display" style={{ fontSize: 14, justifyContent: "flex-end" }}>
              <span className="record-w">{p.w}</span>
              <span style={{ color: "var(--color-text-muted)", fontWeight: 400 }}>-</span>
              <span className="record-l">{p.l}</span>
              {p.d > 0 && <><span style={{ color: "var(--color-text-muted)", fontWeight: 400 }}>-</span><span className="record-d">{p.d}</span></>}
            </div>
            <div style={{ fontSize: 10, color: "var(--color-text-muted)", textTransform: "uppercase", fontFamily: "var(--font-display)", marginTop: 2 }}>
              {fighter.level}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/fighters/${fighter.id}`} style={{ textDecoration: "none" }}>
      <div
        className="card-cut"
        style={{ cursor: "pointer", position: "relative", overflow: "hidden" }}
      >
        {/* Style colour tint */}
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(160deg, ${styleColors[fighter.style]}11 0%, transparent 60%)`,
          pointerEvents: "none"
        }} />

        <div style={{ padding: "20px 20px 16px" }}>
          {/* Header row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <OctagonAvatar initials={initials} size={72} />
              <div>
                <div style={{ display: "flex", gap: 6, marginBottom: 6, flexWrap: "wrap" }}>
                  <span className={`badge badge-${fighter.level === "Pro" ? "pro" : "amateur"}`}>{fighter.level}</span>
                  <span className="badge badge-outline">{fighter.weightClass}</span>
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 18, lineHeight: 1.1 }}>
                  {fighter.name}
                </div>
                {fighter.nickname && (
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 12, color: "var(--color-text-secondary)", marginTop: 2 }}>
                    &quot;{fighter.nickname}&quot;
                  </div>
                )}
              </div>
            </div>
            {showRank && (
              /* Octagon rank badge */
              <div style={{ position: "relative", width: 48, height: 48, flexShrink: 0 }}>
                <div className="clip-octagon" style={{ position: "absolute", inset: 0, background: "var(--color-primary)" }} />
                <div className="clip-octagon" style={{
                  position: "absolute", inset: 3,
                  background: "var(--neutral-950)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 13, color: "var(--color-primary)"
                }}>#{fighter.rank}</div>
              </div>
            )}
          </div>

          {/* Location */}
          <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 14, color: "var(--color-text-muted)", fontSize: 12 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            {fighter.city}, {fighter.province} · {fighter.gym}
          </div>

          <div className="divider" style={{ marginBottom: 14 }} />

          {/* Records */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            <div>
              <div className="section-heading" style={{ fontSize: 10, marginBottom: 6 }}>Profesional</div>
              {proTotal > 0 ? (
                <div className="record-display">
                  <span className="record-w">{p.w}</span>
                  <span style={{ color: "var(--color-text-muted)", fontWeight: 400, fontSize: 14 }}>-</span>
                  <span className="record-l">{p.l}</span>
                  {p.d > 0 && <><span style={{ color: "var(--color-text-muted)", fontWeight: 400, fontSize: 14 }}>-</span><span className="record-d">{p.d}</span></>}
                </div>
              ) : <span style={{ color: "var(--color-text-muted)", fontSize: 13 }}>—</span>}
            </div>
            <div>
              <div className="section-heading" style={{ fontSize: 10, marginBottom: 6 }}>Amateur</div>
              <div className="record-display">
                <span className="record-w">{a.w}</span>
                <span style={{ color: "var(--color-text-muted)", fontWeight: 400, fontSize: 14 }}>-</span>
                <span className="record-l">{a.l}</span>
                {a.d > 0 && <><span style={{ color: "var(--color-text-muted)", fontWeight: 400, fontSize: 14 }}>-</span><span className="record-d">{a.d}</span></>}
              </div>
            </div>
          </div>

          {/* Skill stats as hex badges */}
          <div style={{ display: "flex", gap: 12, justifyContent: "space-around" }}>
            {[
              { label: "Striking", value: fighter.strikingPower, color: "var(--red-500)" },
              { label: "Grappling", value: fighter.grappling, color: "var(--blue-500)" },
              { label: "Físico", value: fighter.conditioning, color: "var(--orange-500)" },
            ].map(({ label, value, color }) => (
              <div key={label} style={{ textAlign: "center" }}>
                {/* Mini octagon stat */}
                <div style={{ position: "relative", width: 52, height: 52, margin: "0 auto 6px" }}>
                  <div className="clip-octagon" style={{ position: "absolute", inset: 0, background: color + "33" }} />
                  <div className="clip-octagon" style={{
                    position: "absolute", inset: 2,
                    background: "var(--color-surface-raised)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexDirection: "column"
                  }}>
                    <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 14, color, lineHeight: 1 }}>{value}</span>
                  </div>
                </div>
                <div style={{ fontSize: 9, fontFamily: "var(--font-display)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-text-muted)" }}>{label}</div>
                {/* Style tag */}
                <div style={{ marginTop: 4 }}>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${value}%`, background: color }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Style parallelogram badge */}
          <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="badge-para">{fighter.style}</span>
            <span style={{ fontSize: 11, color: "var(--color-text-muted)", fontFamily: "var(--font-display)" }}>{fighter.weightLbs} lbs</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
