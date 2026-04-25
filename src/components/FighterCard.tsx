import Link from "next/link";
import type { Fighter } from "@/lib/data";

interface FighterCardProps {
  fighter: Fighter;
  showRank?: boolean;
  compact?: boolean;
}

const styleColors: Record<string, string> = {
  Striker:  "var(--red-400)", // updated to brutalist lighter red for contrast against black
  Grappler: "var(--blue-500)",
  Mixto:    "var(--orange-500)",
};

/** Blocky Avatar for Brutalist look */
function BlockAvatar({
  initials, size = 64, border = true, color = "var(--color-primary)"
}: { initials: string; size?: number; border?: boolean; color?: string }) {
  return (
    <div style={{
      width: size, height: size, flexShrink: 0,
      background: "var(--neutral-900)",
      border: border ? `4px solid ${color}` : "none",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "var(--font-display)", fontSize: size * 0.4, color: "white"
    }}>
      {initials}
    </div>
  );
}

export { BlockAvatar as OctagonAvatar }; // exported for backward compatibility if needed

export default function FighterCard({ fighter, showRank = false, compact = false }: FighterCardProps) {
  const { proRecord: p, amateurRecord: a } = fighter;
  const proTotal = p.w + p.l + p.d;
  const initials = fighter.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  if (compact) {
    return (
      <Link href={`/fighters/${fighter.id}`} style={{ textDecoration: "none" }}>
        <div style={{ padding: "16px", background: "var(--color-surface)", border: "2px solid var(--color-text)", display: "flex", alignItems: "center", gap: 16, cursor: "pointer", transition: "background 0.1s" }} onMouseOver={e => e.currentTarget.style.background="var(--neutral-800)"} onMouseOut={e => e.currentTarget.style.background="var(--color-surface)"}>
          <BlockAvatar initials={initials} size={56} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 20, textTransform: "uppercase", color: "var(--color-text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {fighter.nickname ? `"${fighter.nickname}" // ${fighter.name}` : fighter.name}
            </div>
            <div style={{ fontSize: 12, color: "var(--color-primary)", fontFamily: "var(--font-display)", textTransform: "uppercase" }}>{fighter.weightClass}</div>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 24, padding: "4px 8px", background: "var(--color-bg)", border: "2px solid var(--color-border)" }}>
              <span style={{ color: "var(--record-win)" }}>{p.w}</span>
              <span style={{ color: "var(--color-text-muted)" }}>:</span>
              <span style={{ color: "var(--record-loss)" }}>{p.l}</span>
            </div>
            <div style={{ fontSize: 10, color: "var(--color-text)", textTransform: "uppercase", fontFamily: "var(--font-display)", marginTop: 4, background: fighter.level === "Pro" ? "var(--color-primary)" : "var(--neutral-600)", padding: "2px 4px", display: "inline-block" }}>
              {fighter.level}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/fighters/${fighter.id}`} style={{ textDecoration: "none" }}>
      <div style={{ 
        cursor: "pointer", position: "relative", overflow: "hidden",
        background: "var(--color-surface)", border: "4px solid var(--color-text)",
        padding: "24px", boxShadow: "6px 6px 0px rgba(255,255,255,0.1)",
        marginBottom: "16px"
      }}>
        {/* Header row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <BlockAvatar initials={initials} size={80} border={true} color={styleColors[fighter.style] || "var(--color-primary)"} />
            <div>
              <div style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap", fontFamily: "var(--font-display)", textTransform: "uppercase", fontSize: 12 }}>
                <span style={{ padding: "4px 8px", background: fighter.level === "Pro" ? "var(--color-primary)" : "var(--neutral-600)", border: "2px solid var(--color-text)", color: "white" }}>{fighter.level}</span>
                <span style={{ padding: "4px 8px", background: "transparent", border: "2px solid var(--color-text)", color: "var(--color-text)" }}>{fighter.weightClass}</span>
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 28, lineHeight: 1.1, textTransform: "uppercase" }}>
                {fighter.name}
              </div>
              {fighter.nickname && (
                <div style={{ fontFamily: "var(--font-display)", fontSize: 16, color: "var(--color-primary)", marginTop: 4, textTransform: "uppercase" }}>
                  "{fighter.nickname}"
                </div>
              )}
            </div>
          </div>
          {showRank && (
            <div style={{ position: "relative", width: 56, height: 56, flexShrink: 0 }}>
              <div style={{ width: "100%", height: "100%", background: "var(--color-primary)", border: "4px solid var(--color-text)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontSize: 24, color: "white" }}>
                #{fighter.rank}
              </div>
            </div>
          )}
        </div>

        {/* Location */}
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 16, color: "var(--color-text-muted)", fontSize: 14, fontFamily: "var(--font-display)", textTransform: "uppercase", letterSpacing: "1px" }}>
          📍 {fighter.city}, {fighter.province} // {fighter.gym}
        </div>

        <div style={{ width: "100%", height: 4, background: "var(--color-border)", marginBottom: 16 }} />

        {/* Records */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
          <div style={{ padding: "12px", background: "var(--neutral-900)", border: "2px solid var(--color-border)" }}>
            <div style={{ fontSize: 12, marginBottom: 4, fontFamily: "var(--font-body)", fontWeight: 700, textTransform: "uppercase" }}>Profesional</div>
            {proTotal > 0 ? (
              <div style={{ fontFamily: "var(--font-display)", fontSize: 24 }}>
                <span style={{ color: "var(--record-win)" }}>{p.w}</span> : <span style={{ color: "var(--record-loss)" }}>{p.l}</span>
                {p.d > 0 && <> : <span style={{ color: "var(--neutral-400)" }}>{p.d}</span></>}
              </div>
            ) : <span style={{ color: "var(--color-text-muted)", fontSize: 16 }}>—</span>}
          </div>
          <div style={{ padding: "12px", background: "var(--neutral-900)", border: "2px solid var(--color-border)" }}>
            <div style={{ fontSize: 12, marginBottom: 4, fontFamily: "var(--font-body)", fontWeight: 700, textTransform: "uppercase" }}>Amateur</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 24 }}>
              <span style={{ color: "var(--record-win)" }}>{a.w}</span> : <span style={{ color: "var(--record-loss)" }}>{a.l}</span>
              {a.d > 0 && <> : <span style={{ color: "var(--neutral-400)" }}>{a.d}</span></>}
            </div>
          </div>
        </div>

        {/* Skill stats as rigid blocks */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          {[
            { label: "Striking", value: fighter.strikingPower, color: "var(--red-500)" },
            { label: "Grappling", value: fighter.grappling, color: "var(--blue-500)" },
            { label: "Físico", value: fighter.conditioning, color: "var(--orange-500)" },
          ].map(({ label, value, color }) => (
            <div key={label} style={{ textAlign: "center", border: "2px solid var(--color-border)", padding: "12px 0 0" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 24, color, lineHeight: 1, textShadow: "1px 1px 0px rgba(255,255,255,0.1)" }}>{value}</div>
              <div style={{ fontSize: 10, fontFamily: "var(--font-display)", textTransform: "uppercase", letterSpacing: "1px", color: "var(--color-text-muted)", margin: "4px 0 8px" }}>{label}</div>
              <div style={{ width: "100%", height: 6, background: "var(--neutral-800)" }}>
                <div style={{ height: "100%", width: `${value}%`, background: color }} />
              </div>
            </div>
          ))}
        </div>

        {/* Style parallelogram badge -> changed to pure angled block */}
        <div style={{ marginTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ 
            padding: "8px 16px", background: styleColors[fighter.style] || "white", color: "black", 
            fontFamily: "var(--font-display)", fontSize: 16, textTransform: "uppercase", 
            transform: "skewX(-15deg)", display: "inline-block", fontWeight: 900
          }}>
            <span style={{ transform: "skewX(15deg)", display: "block" }}>{fighter.style}</span>
          </span>
          <span style={{ fontSize: 16, color: "var(--color-text)", fontFamily: "var(--font-display)" }}>{fighter.weightLbs} LBS</span>
        </div>
      </div>
    </Link>
  );
}
