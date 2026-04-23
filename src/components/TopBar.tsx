import Link from "next/link";

interface TopBarProps {
  title?: string;
  rightAction?: React.ReactNode;
  backHref?: string;
}

const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/>
  </svg>
);
const BackIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 5l-7 7 7 7"/>
  </svg>
);

export default function TopBar({ title, rightAction, backHref }: TopBarProps) {
  return (
    <header className="top-bar">
      {backHref ? (
        <Link href={backHref} style={{ color: "var(--color-text)", display: "flex", alignItems: "center" }}>
          <BackIcon />
        </Link>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 28, height: 28,
            background: "var(--color-primary)",
            borderRadius: 6,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 11,
            letterSpacing: "-0.03em"
          }}>EC</div>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 14, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-text)" }}>
            {title ?? "MMA Ecuador"}
          </span>
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {rightAction}
        <button
          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text-secondary)", position: "relative", display: "flex" }}
          aria-label="Notificaciones"
        >
          <BellIcon />
          <span style={{
            position: "absolute", top: -2, right: -2,
            width: 8, height: 8, borderRadius: "50%",
            background: "var(--color-primary)"
          }} />
        </button>
      </div>
    </header>
  );
}
