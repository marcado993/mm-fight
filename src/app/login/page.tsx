"use client";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      router.push("/");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "100dvh",
      background: "var(--color-bg)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px 20px",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Obfuscated Background */}
      <div className="animate-slow-pan" style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 0, opacity: 0.25, filter: "blur(8px)" }}>
        <Image src="/gym-interior.png" alt="Background" fill style={{ objectFit: "cover" }} />
      </div>
      <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "var(--color-bg)", opacity: 0.6, zIndex: 0 }} />

      {/* Content wrapper */}
      <div style={{ position: "relative", zIndex: 10, width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Logo */}
      <Link href="/landing" className="hover-lift" style={{ textDecoration: "none", marginBottom: 40, display: "block" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 44, height: 44 }}>
            <Image src="/logo.png" alt="Logo" width={44} height={44} style={{ filter: "drop-shadow(2px 2px 0px var(--color-primary))" }} />
          </div>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 22, letterSpacing: "-0.02em" }}>
            MMA <span style={{ color: "var(--color-primary)" }}>Ecuador</span>
          </span>
        </div>
      </Link>

      <div className="animate-pulse-glow hover-lift" style={{
        width: "100%", maxWidth: 420,
        background: "var(--color-surface)",
        border: "2px solid var(--color-border)",
        borderRadius: 0, padding: "32px 28px",
      }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 24, marginBottom: 6 }}>
          Bienvenido de vuelta
        </h1>
        <p style={{ fontSize: 14, color: "var(--color-text-muted)", marginBottom: 28 }}>
          Inicia sesión para continuar
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ fontSize: 12, fontFamily: "var(--font-display)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-text-muted)", display: "block", marginBottom: 6 }}>
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="tu@email.com"
              className="input-dark"
              style={{ fontSize: 15 }}
            />
          </div>

          <div>
            <label style={{ fontSize: 12, fontFamily: "var(--font-display)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-text-muted)", display: "block", marginBottom: 6 }}>
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="input-dark"
              style={{ fontSize: 15 }}
            />
          </div>

          {error && (
            <div style={{ padding: "10px 14px", background: "rgba(211,47,47,0.15)", border: "1px solid rgba(211,47,47,0.4)", borderRadius: 0, fontSize: 13, color: "var(--red-300)" }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{ marginTop: 8, opacity: loading ? 0.7 : 1 }}
          >
            {loading ? "Ingresando…" : "Iniciar Sesión"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: 24, fontSize: 14, color: "var(--color-text-muted)" }}>
          ¿No tienes cuenta?{" "}
          <Link href="/register" style={{ color: "var(--color-primary)", fontWeight: 700, textDecoration: "none" }}>
            Regístrate
          </Link>
        </div>
      </div>

      {/* Demo boxes */}
      <div style={{
        marginTop: 24, width: "100%", maxWidth: 420,
        background: "rgba(255,255,255,0.03)", border: "1px solid var(--color-border)",
        borderRadius: 0, padding: "16px 20px",
      }}>
        <p style={{ fontSize: 11, fontFamily: "var(--font-display)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-text-muted)", marginBottom: 10 }}>
          💡 Cuentas Demo:
          <br/>fan@mmaecuador.com
          <br/>peleador@mmaecuador.com
          <br/>gym@mmaecuador.com
        </p>
        <button className="btn-secondary" style={{ width: "100%", fontSize: 13 }} onClick={() => { (document.querySelector('input[type="email"]') as HTMLInputElement).value = 'peleador@mmaecuador.com'; (document.querySelector('input[type="password"]') as HTMLInputElement).value = 'demo123'; }}>
          Autocompletar Peleador →
        </button>
      </div>
      </div>
    </div>
  );
}
