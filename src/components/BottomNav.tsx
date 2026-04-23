"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

/* ── Icons ─────────────────────────────────────────── */
const IconHome = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>
    <path d="M9 21V12h6v9"/>
  </svg>
);
const IconRanking = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="14" width="4" height="7" rx="1"/><rect x="10" y="9" width="4" height="12" rx="1"/><rect x="18" y="4" width="4" height="17" rx="1"/>
  </svg>
);
const IconFighters = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="7" r="4"/><path d="M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"/>
  </svg>
);
const IconGyms = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6.5 6.5h11M6.5 17.5h11M4 12h16M7 3.5v17M17 3.5v17"/>
  </svg>
);
const IconChallenge = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12l2 2 4-4"/>
    <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9"/>
    <path d="M15 3.5A9 9 0 0120.5 9"/>
  </svg>
);
const IconEvents = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
  </svg>
);

const navItems = [
  { href: "/",            label: "Inicio",   Icon: IconHome },
  { href: "/rankings",    label: "Ranking",  Icon: IconRanking },
  { href: "/fighters",    label: "Fighters", Icon: IconFighters },
  { href: "/gyms",        label: "Gyms",     Icon: IconGyms },
  { href: "/matchmaking", label: "Retos",    Icon: IconChallenge },
  { href: "/events",      label: "Ligas",    Icon: IconEvents },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav style={{
      position: "fixed",
      bottom: 0, left: 0, right: 0,
      zIndex: 100,
      background: "rgba(10, 10, 10, 0.97)",
      backdropFilter: "blur(16px)",
      borderTop: "1px solid rgba(255,255,255,0.07)",
      paddingBottom: "env(safe-area-inset-bottom, 0px)",
    }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        alignItems: "stretch",
      }}>
        {navItems.map(({ href, label, Icon }) => {
          // Active if exact match or child route
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              style={{
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 3,
                padding: "10px 2px 10px",
                position: "relative",
                color: active ? "var(--color-primary)" : "rgba(255,255,255,0.35)",
                transition: "color 0.2s",
              }}
            >
              {/* Active indicator line at top */}
              {active && (
                <div style={{
                  position: "absolute",
                  top: 0,
                  left: "20%",
                  right: "20%",
                  height: 2,
                  background: "var(--color-primary)",
                  borderRadius: "0 0 2px 2px",
                  boxShadow: "0 0 8px var(--color-primary)",
                }} />
              )}
              <Icon />
              <span style={{
                fontFamily: "var(--font-display)",
                fontWeight: active ? 700 : 500,
                fontSize: 9,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                lineHeight: 1,
              }}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
