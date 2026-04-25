"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useStore } from "@/lib/store";
import type { UserRole } from "@/lib/auth";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";

/* ── Icons ─────────────────────────────────────────────────────────── */
const IconHome = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/>
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
const IconEvents = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
  </svg>
);
const IconCommunity = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
  </svg>
);
const IconGloves = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/>
    <line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
  </svg>
);
const IconProfile = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconChallenge = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12l2 2 4-4"/><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9"/><path d="M15 3.5A9 9 0 0120.5 9"/>
  </svg>
);

/* ── Nav configs per role ──────────────────────────────────────────── */
type NavItem = { href: string; label: string; Icon: () => React.ReactElement };

const NAV_ITEMS: Record<UserRole, NavItem[]> = {
  normal: [
    { href: "/",           label: "Inicio",     Icon: IconHome },
    { href: "/rankings",   label: "Ranking",    Icon: IconRanking },
    { href: "/gyms",       label: "Gimnasios",  Icon: IconGyms },
    { href: "/fighters",   label: "Peleadores", Icon: IconFighters },
    { href: "/events",     label: "Eventos",    Icon: IconEvents },
  ],
  fighter: [
    { href: "/",             label: "Inicio",     Icon: IconHome },
    { href: "/rankings",     label: "Ranking",    Icon: IconRanking },
    { href: "/events",       label: "Eventos",    Icon: IconEvents },
    { href: "/communities",  label: "Comunidad",  Icon: IconCommunity },
    { href: "/matchmaking",  label: "Retos",      Icon: IconGloves },
  ],
  gym: [
    { href: "/",             label: "Inicio",     Icon: IconHome },
    { href: "/rankings",     label: "Ranking",    Icon: IconRanking },
    { href: "/fighters",     label: "Peleadores", Icon: IconFighters },
    { href: "/matchmaking",  label: "Retos",      Icon: IconChallenge },
    { href: "/events",       label: "Eventos",    Icon: IconEvents },
  ],
};

interface BottomNavProps {
  role?: UserRole;
}

export default function BottomNav({ role = "normal" }: BottomNavProps) {
  const pathname = usePathname();
  const startLoading = useStore(state => state.startLoading);
  const { logout } = useAuth();
  const router = useRouter();
  const items = NAV_ITEMS[role];

  return (
    <nav style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(10, 10, 10, 0.97)", backdropFilter: "blur(16px)",
      borderTop: "1px solid rgba(255,255,255,0.07)",
      paddingBottom: "env(safe-area-inset-bottom, 0px)",
    }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: `repeat(${items.length}, 1fr)`,
        alignItems: "stretch",
      }}>
        {items.map(({ href, label, Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <div key={href} onClick={() => {
              if (!active) {
                startLoading("CARGANDO SECTOR...");
                router.push(href);
              }
            }} style={{
              cursor: "pointer", display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: 3,
              padding: "10px 2px 10px", position: "relative",
              color: active ? "var(--color-primary)" : "rgba(255,255,255,0.35)",
              transition: "color 0.2s, background 0.2s",
              background: active ? "rgba(255,0,0,0.05)" : "transparent"
            }}>
              {/* Active top line - Brutalist rigid */}
              {active && (
                <div style={{
                  position: "absolute", top: -1, left: 0, right: 0,
                  height: 4, background: "var(--color-primary)"
                }} />
              )}
              <Icon />
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 10, textTransform: "uppercase", letterSpacing: "1px", lineHeight: 1 }}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
