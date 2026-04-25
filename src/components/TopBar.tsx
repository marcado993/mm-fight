"use client";
import Link from "next/link";
import { useAuth, type UserProfile } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface TopBarProps {
  title?: string;
  rightAction?: React.ReactNode;
  backHref?: string;
  user?: UserProfile;
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
const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="7" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="12" cy="17" r="1.5" fill="currentColor"/>
  </svg>
);

export default function TopBar({ title, rightAction, backHref, user }: TopBarProps) {
  const { logout } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const roleLabel: Record<string, string> = { normal: "Fan", fighter: "Peleador", gym: "Gimnasio" };
  const roleIcon: Record<string, string> = { normal: "👤", fighter: "🥊", gym: "🏟️" };

  function handleLogout() {
    logout();
    router.push("/landing");
  }

  return (
    <header className="top-bar" style={{ position: "relative" }}>
      {backHref ? (
        <Link href={backHref} style={{ color: "var(--color-text)", display: "flex", alignItems: "center" }}>
          <BackIcon />
        </Link>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 28, height: 28, background: "var(--color-primary)", borderRadius: 6,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 11, letterSpacing: "-0.03em",
          }}>EC</div>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 14, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            {title ?? "MMA Ecuador"}
          </span>
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {rightAction}

        {/* Bell */}
        <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text-secondary)", position: "relative", display: "flex" }} aria-label="Notificaciones">
          <BellIcon />
          <span style={{ position: "absolute", top: -2, right: -2, width: 8, height: 8, borderRadius: "50%", background: "var(--color-primary)" }} />
        </button>

        {/* User menu */}
        {user && (
          <div style={{ position: "relative" }}>
            <button onClick={() => setMenuOpen(o => !o)} style={{
              background: "none", border: "1px solid var(--color-border)", borderRadius: 8,
              cursor: "pointer", color: "var(--color-text-secondary)", display: "flex",
              alignItems: "center", gap: 6, padding: "4px 8px",
            }}>
              <span style={{ fontSize: 14 }}>{roleIcon[user.role]}</span>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 11, display: "none" }}
                id="topbar-username">{user.name.split(" ")[0]}</span>
              <MenuIcon />
            </button>

            {menuOpen && (
              <>
                {/* Backdrop */}
                <div style={{ position: "fixed", inset: 0, zIndex: 199 }} onClick={() => setMenuOpen(false)} />
                {/* Dropdown */}
                <div style={{
                  position: "absolute", right: 0, top: "calc(100% + 8px)", zIndex: 200,
                  background: "var(--color-surface)", border: "1px solid var(--color-border)",
                  borderRadius: 14, minWidth: 200, overflow: "hidden",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                }}>
                  <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--color-border)" }}>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 15 }}>{user.name}</div>
                    <div style={{ fontSize: 12, color: "var(--color-text-muted)", marginTop: 2 }}>{roleIcon[user.role]} {roleLabel[user.role]}</div>
                    {user.verified && <span className="badge badge-success" style={{ marginTop: 6, fontSize: 10 }}>✅ Verificado</span>}
                  </div>
                  <div style={{ padding: "8px 0" }}>
                    {user.role === "fighter" && !user.verified && (
                      <Link href="/verify-identity" style={{ textDecoration: "none" }} onClick={() => setMenuOpen(false)}>
                        <div style={{ padding: "10px 16px", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 10, color: "var(--yellow-500)" }}>
                          🪪 Verificar identidad
                        </div>
                      </Link>
                    )}
                    <button onClick={handleLogout} style={{
                      width: "100%", textAlign: "left", background: "none", border: "none",
                      padding: "10px 16px", fontSize: 13, cursor: "pointer",
                      color: "var(--red-400)", display: "flex", alignItems: "center", gap: 10,
                      fontFamily: "var(--font-body)",
                    }}>
                      🚪 Cerrar sesión
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
