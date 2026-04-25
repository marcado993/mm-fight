"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth, type UserRole } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

/* ── Icons ─────────────────────────────────────────────────────── */
const IconHome = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>;
const IconRanking = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="14" width="4" height="7" rx="1"/><rect x="10" y="9" width="4" height="12" rx="1"/><rect x="18" y="4" width="4" height="17" rx="1"/></svg>;
const IconFighters = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="7" r="4"/><path d="M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"/></svg>;
const IconGyms = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6.5 6.5h11M6.5 17.5h11M4 12h16M7 3.5v17M17 3.5v17"/></svg>;
const IconEvents = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>;
const IconCommunity = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>;
const IconGloves = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>;
const IconLogout = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;
const IconBell = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>;
const IconShield = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;

type NavItem = { href: string; label: string; Icon: () => React.ReactElement };

const NAV_ITEMS: Record<UserRole, NavItem[]> = {
  normal: [
    { href: "/",           label: "Inicio",     Icon: IconHome },
    { href: "/rankings",   label: "Ranking",    Icon: IconRanking },
    { href: "/gyms",       label: "Gimnasios",  Icon: IconGyms },
    { href: "/fighters",   label: "Peleadores", Icon: IconFighters },
    { href: "/events",     label: "Eventos",    Icon: IconEvents },
    { href: "/communities",label: "Comunidad",  Icon: IconCommunity },
  ],
  fighter: [
    { href: "/",             label: "Inicio",     Icon: IconHome },
    { href: "/rankings",     label: "Ranking",    Icon: IconRanking },
    { href: "/events",       label: "Eventos",    Icon: IconEvents },
    { href: "/matchmaking",  label: "Retos",      Icon: IconGloves },
    { href: "/communities",  label: "Comunidad",  Icon: IconCommunity },
  ],
  gym: [
    { href: "/",             label: "Inicio",     Icon: IconHome },
    { href: "/rankings",     label: "Ranking",    Icon: IconRanking },
    { href: "/fighters",     label: "Peleadores", Icon: IconFighters },
    { href: "/matchmaking",  label: "Retos",      Icon: IconGloves },
    { href: "/events",       label: "Eventos",    Icon: IconEvents },
    { href: "/communities",  label: "Comunidad",  Icon: IconCommunity },
  ],
};

const ROLE_LABEL: Record<UserRole, string> = { normal: "Fan", fighter: "Peleador", gym: "Gimnasio" };
const ROLE_COLOR: Record<UserRole, string> = { normal: "var(--blue-500)", fighter: "var(--color-primary)", gym: "var(--orange-500)" };

interface AppShellProps {
  children: React.ReactNode;
  role: UserRole;
}

export default function AppShell({ children, role }: AppShellProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const items = NAV_ITEMS[role];

  function handleLogout() {
    logout();
    router.push("/landing");
  }

  const initials = user?.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() ?? "??";

  /* ── Sidebar content ── */
  const SidebarContent = () => (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "0" }}>
      {/* Logo */}
      <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, flexShrink: 0 }}>
            <Image src="/logo.png" alt="MMA EC Logo" width={36} height={36} style={{ objectFit: "contain" }} />
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 22, letterSpacing: "1px", color: "white", lineHeight: 1, textTransform: "uppercase" }}>
              MMA<span style={{ color: "var(--color-primary)" }}>EC</span>
            </div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-display)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Plataforma Oficial
            </div>
          </div>
        </Link>
      </div>

      {/* Nav items */}
      <nav style={{ flex: 1, padding: "12px 10px", overflowY: "auto" }}>
        <div style={{ marginBottom: 8, padding: "0 10px", fontSize: 9, fontFamily: "var(--font-display)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.25)" }}>
          Navegación
        </div>
        {items.map(({ href, label, Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "12px 14px", borderRadius: 0, marginBottom: 4,
                textDecoration: "none", transition: "all 0.1s", cursor: "pointer",
                color: active ? "white" : "rgba(255,255,255,0.45)",
                background: active ? "var(--color-primary)" : "transparent",
                borderLeft: active ? "6px solid var(--color-text)" : "6px solid transparent",
              }}
            >
              <span style={{ color: active ? "white" : "inherit", flexShrink: 0 }}><Icon /></span>
              <span style={{
                fontFamily: "var(--font-display)", fontSize: 18, letterSpacing: "1px",
                textTransform: "uppercase", marginTop: 2,
              }}>{label}</span>
              {active && <div style={{ marginLeft: "auto", width: 4, height: 4, borderRadius: "50%", background: "var(--color-primary)" }} />}
            </Link>
          );
        })}

        {/* Fighter verify shortcut */}
        {role === "fighter" && !user?.verified && (
          <Link href="/verify-identity" onClick={() => setMobileOpen(false)} style={{
            display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
            borderRadius: 10, marginTop: 8, textDecoration: "none",
            background: "rgba(234,179,8,0.1)", border: "1px solid rgba(234,179,8,0.2)",
            color: "var(--yellow-500)",
          }}>
            <IconShield />
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 12 }}>Verificar Identidad</span>
          </Link>
        )}
      </nav>

      {/* User card at bottom */}
      {user && (
        <div style={{ padding: "12px 10px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
            borderRadius: 12, background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}>
            {/* Avatar */}
            <div style={{
              width: 38, height: 38, borderRadius: 0, flexShrink: 0,
              background: `var(--neutral-800)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-display)", fontSize: 16, color: "var(--color-primary)",
              border: `2px solid var(--color-primary)`,
            }}>{initials}</div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 16, color: "white", textTransform: "uppercase", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {user.name}
              </div>
              <div style={{ fontSize: 12, color: "var(--color-primary)", fontFamily: "var(--font-display)", textTransform: "uppercase", letterSpacing: "1px" }}>
                {ROLE_LABEL[role]}
                {user.verified && " ✓"}
              </div>
            </div>

            <button onClick={handleLogout} title="Cerrar sesión" style={{
              background: "none", border: "none", cursor: "pointer",
              color: "rgba(255,255,255,0.3)", padding: 4, display: "flex", flexShrink: 0,
              transition: "color 0.2s",
            }}>
              <IconLogout />
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div style={{ display: "flex", minHeight: "100dvh", background: "var(--color-bg)" }}>

      {/* ── Desktop sidebar ── */}
      <aside style={{
        display: "none",
        position: "fixed", top: 0, left: 0, bottom: 0,
        width: 220, zIndex: 90,
        background: "rgba(10,10,10,0.98)", backdropFilter: "blur(20px)",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        flexDirection: "column",
      }} className="app-sidebar">
        <SidebarContent />
      </aside>

      {/* ── Mobile drawer overlay ── */}
      {mobileOpen && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Mobile drawer ── */}
      <aside style={{
        position: "fixed", top: 0, left: mobileOpen ? 0 : -260, bottom: 0,
        width: 240, zIndex: 201, transition: "left 0.3s cubic-bezier(0.4,0,0.2,1)",
        background: "rgba(10,10,10,0.99)", borderRight: "1px solid rgba(255,255,255,0.08)",
      }}>
        <SidebarContent />
      </aside>

      {/* ── Main content area ── */}
      <div className="app-main" style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

        {/* ── Mobile top bar ── */}
        <header className="mobile-topbar" style={{
          position: "sticky", top: 0, zIndex: 100,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "12px 16px",
          background: "rgba(10,10,10,0.97)", backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}>
          <button onClick={() => setMobileOpen(o => !o)} style={{
            background: "none", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8,
            padding: "7px 9px", cursor: "pointer", color: "white", display: "flex", alignItems: "center", gap: 6,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Image src="/logo.png" alt="Logo" width={28} height={28} style={{ objectFit: "contain" }} />
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 14, letterSpacing: "-0.01em" }}>
              MMA <span style={{ color: "var(--color-primary)" }}>Ecuador</span>
            </span>
          </div>

          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.5)", position: "relative", display: "flex" }}>
              <IconBell />
              <span style={{ position: "absolute", top: -2, right: -2, width: 7, height: 7, borderRadius: "50%", background: "var(--color-primary)" }} />
            </button>
            <div style={{
              width: 30, height: 30, borderRadius: "50%",
              background: `linear-gradient(135deg, ${ROLE_COLOR[role]}, rgba(0,0,0,0.6))`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 11,
              border: `1.5px solid ${ROLE_COLOR[role]}66`,
            }}>{initials}</div>
          </div>
        </header>

        {/* ── Desktop topbar (inside main, visible on desktop) ── */}
        <header className="desktop-topbar" style={{
          display: "none",
          position: "sticky", top: 0, zIndex: 100,
          alignItems: "center", justifyContent: "space-between",
          padding: "14px 32px",
          background: "rgba(10,10,10,0.95)", backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}>
          {/* Page title placeholder — filled by children if needed */}
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 16, letterSpacing: "0.04em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>
            {/* page title shown via CSS sibling trick or children */}
          </div>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <button style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.45)", position: "relative", display: "flex" }}>
              <IconBell />
              <span style={{ position: "absolute", top: -2, right: -2, width: 7, height: 7, borderRadius: "50%", background: "var(--color-primary)" }} />
            </button>
            <div style={{
              display: "flex", alignItems: "center", gap: 8, padding: "6px 12px",
              background: "rgba(255,255,255,0.04)", borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.07)",
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                background: `linear-gradient(135deg, ${ROLE_COLOR[role]}, rgba(0,0,0,0.5))`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 10,
              }}>{initials}</div>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 12, lineHeight: 1.2 }}>{user?.name?.split(" ")[0]}</div>
                <div style={{ fontSize: 9, color: ROLE_COLOR[role], fontFamily: "var(--font-display)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>{ROLE_LABEL[role]}</div>
              </div>
            </div>
          </div>
        </header>

        {/* ── Page content ── */}
        <div style={{ flex: 1, overflowX: "hidden" }}>
          {children}
        </div>

        {/* ── Mobile bottom nav ── */}
        <nav className="mobile-bottom-nav" style={{
          position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100,
          background: "rgba(8,8,8,0.98)", backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
          display: "flex",
        }}>
          {items.slice(0, 5).map(({ href, label, Icon }) => {
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link key={href} href={href} style={{
                flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
                justifyContent: "center", gap: 3, padding: "10px 2px",
                textDecoration: "none", position: "relative",
                color: active ? "var(--color-primary)" : "rgba(255,255,255,0.3)",
                transition: "color 0.2s",
              }}>
                {active && <div style={{ position: "absolute", top: 0, left: "15%", right: "15%", height: 2, background: "var(--color-primary)", borderRadius: "0 0 2px 2px", boxShadow: "0 0 8px var(--color-primary)" }} />}
                <Icon />
                <span style={{ fontFamily: "var(--font-display)", fontWeight: active ? 700 : 500, fontSize: 8.5, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
