"use client";
import { useState } from "react";
import { useAuth, type UserRole, type RegisterData } from "@/lib/auth";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { gyms } from "@/lib/data";

type Step = 1 | 2 | 3;

const WEIGHT_CLASSES = [
  "Paja","Mosca","Gallo","Pluma","Ligero",
  "Superligero","Welter","Superwelter","Mediano","Semipesado","Pesado",
];

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("normal");
  // Fighter extras
  const [weightClass, setWeightClass] = useState("Ligero");
  const [gymId, setGymId] = useState(gyms[0]?.id ?? "");
  // Gym extras
  const [gymCity, setGymCity] = useState("");
  const [gymProvince, setGymProvince] = useState("Pichincha");

  async function handleSubmit() {
    setError("");
    setLoading(true);
    try {
      const data: RegisterData = {
        name, email, password, role,
        ...(role === "fighter" && { weightClass, gymId, gymName: gyms.find(g => g.id === gymId)?.name }),
        ...(role === "gym" && { gymCity, gymProvince }),
      };
      await register(data);
      router.push("/");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al registrarse");
    } finally {
      setLoading(false);
    }
  }

  const ROLES: { value: UserRole; icon: string; title: string; desc: string }[] = [
    { value: "normal", icon: "👤", title: "Fan / Seguidor", desc: "Sigue peleadores, ve rankings y eventos" },
    { value: "fighter", icon: "🥊", title: "Peleador", desc: "Gestiona tu perfil, historial y verificación" },
    { value: "gym", icon: "🏟️", title: "Gimnasio", desc: "Administra tu equipo y crea desafíos" },
  ];

  const PROVINCES = ["Pichincha","Guayas","Azuay","Manabí","El Oro","Tungurahua","Loja","Imbabura","Chimborazo"];

  const inputStyle: React.CSSProperties = { marginBottom: 0 };

  return (
    <div style={{
      minHeight: "100dvh",
      background: "var(--color-bg)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "24px 20px",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Obfuscated Background */}
      <div className="animate-slow-pan" style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 0, opacity: 0.25, filter: "blur(8px)" }}>
        <Image src="/octagon.png" alt="Background" fill style={{ objectFit: "cover" }} />
      </div>
      <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "var(--color-bg)", opacity: 0.6, zIndex: 0 }} />

      {/* Content wrapper */}
      <div style={{ position: "relative", zIndex: 10, width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Logo */}
      <Link href="/landing" className="hover-lift" style={{ textDecoration: "none", marginBottom: 32, display: "block" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 44, height: 44 }}>
            <Image src="/logo.png" alt="Logo" width={44} height={44} style={{ filter: "drop-shadow(2px 2px 0px var(--color-primary))" }} />
          </div>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 22, letterSpacing: "-0.02em" }}>
            MMA <span style={{ color: "var(--color-primary)" }}>Ecuador</span>
          </span>
        </div>
      </Link>

      {/* Step indicator */}
      <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
        {([1,2,3] as Step[]).map(s => (
          <div key={s} style={{
            width: s <= step ? (s === step ? 28 : 20) : 20,
            height: 4, borderRadius: 2,
            background: s <= step ? "var(--color-primary)" : "var(--color-border)",
            transition: "all 0.3s",
          }} />
        ))}
      </div>

      <div className="animate-pulse-glow" style={{
        width: "100%", maxWidth: 460,
        background: "var(--color-surface)",
        border: "2px solid var(--color-border)",
        borderRadius: 0, padding: "32px 28px",
      }}>

        {/* ─ Step 1: Basic info ─ */}
        {step === 1 && (
          <>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 22, marginBottom: 6 }}>Crear cuenta</h1>
            <p style={{ fontSize: 13, color: "var(--color-text-muted)", marginBottom: 24 }}>Paso 1 de 3 — Datos básicos</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={{ fontSize: 11, fontFamily: "var(--font-display)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-text-muted)", display: "block", marginBottom: 6 }}>Nombre completo</label>
                <input value={name} onChange={e => setName(e.target.value)} className="input-dark" placeholder="Tu nombre" style={inputStyle} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontFamily: "var(--font-display)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-text-muted)", display: "block", marginBottom: 6 }}>Correo electrónico</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="input-dark" placeholder="tu@email.com" style={inputStyle} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontFamily: "var(--font-display)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-text-muted)", display: "block", marginBottom: 6 }}>Contraseña</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="input-dark" placeholder="••••••••" style={inputStyle} />
              </div>
              <button className="btn-primary" style={{ marginTop: 8 }} disabled={!name || !email || !password} onClick={() => setStep(2)}>
                Continuar →
              </button>
            </div>
          </>
        )}

        {/* ─ Step 2: Role selection ─ */}
        {step === 2 && (
          <>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 22, marginBottom: 6 }}>Elige tu rol</h1>
            <p style={{ fontSize: 13, color: "var(--color-text-muted)", marginBottom: 24 }}>Paso 2 de 3 — ¿Cómo participas?</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
              {ROLES.map(r => (
                <button key={r.value} onClick={() => setRole(r.value)} style={{
                  display: "flex", gap: 14, alignItems: "center",
                  padding: "16px 18px", borderRadius: 0, cursor: "pointer", textAlign: "left",
                  background: role === r.value ? "rgba(211,47,47,0.12)" : "var(--color-surface-raised)",
                  border: `2px solid ${role === r.value ? "var(--color-primary)" : "var(--color-border)"}`,
                  transition: "all 0.2s",
                }}>
                  <div style={{ fontSize: 28, flexShrink: 0 }}>{r.icon}</div>
                  <div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 15, marginBottom: 2 }}>{r.title}</div>
                    <div style={{ fontSize: 12, color: "var(--color-text-muted)" }}>{r.desc}</div>
                  </div>
                  <div style={{
                    marginLeft: "auto", width: 20, height: 20, borderRadius: 0, flexShrink: 0,
                    border: `2px solid ${role === r.value ? "var(--color-primary)" : "var(--color-border)"}`,
                    background: role === r.value ? "var(--color-primary)" : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {role === r.value && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "white" }} />}
                  </div>
                </button>
              ))}
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn-secondary" style={{ flex: 1 }} onClick={() => setStep(1)}>← Atrás</button>
              <button className="btn-primary" style={{ flex: 2 }} onClick={() => setStep(3)}>Continuar →</button>
            </div>
          </>
        )}

        {/* ─ Step 3: Role extras ─ */}
        {step === 3 && (
          <>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 22, marginBottom: 6 }}>
              {role === "normal" ? "¡Casi listo!" : role === "fighter" ? "Tu perfil de peleador" : "Tu gimnasio"}
            </h1>
            <p style={{ fontSize: 13, color: "var(--color-text-muted)", marginBottom: 24 }}>Paso 3 de 3</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 20 }}>
              {role === "normal" && (
                <div style={{ padding: 20, background: "var(--color-surface-raised)", border: "2px solid var(--color-border)", borderRadius: 0, textAlign: "center" }}>
                  <div style={{ fontSize: 40, marginBottom: 10 }}>👤</div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Perfecto, {name}!</div>
                  <div style={{ fontSize: 13, color: "var(--color-text-muted)" }}>Seguirás peleadores, verás rankings y eventos en tiempo real.</div>
                </div>
              )}

              {role === "fighter" && (
                <>
                  <div>
                    <label style={{ fontSize: 11, fontFamily: "var(--font-display)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-text-muted)", display: "block", marginBottom: 6 }}>Categoría de peso</label>
                    <select value={weightClass} onChange={e => setWeightClass(e.target.value)} className="input-dark" style={{ cursor: "pointer" }}>
                      {WEIGHT_CLASSES.map(w => <option key={w} value={w}>{w}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontFamily: "var(--font-display)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-text-muted)", display: "block", marginBottom: 6 }}>Gimnasio afiliado</label>
                    <select value={gymId} onChange={e => setGymId(e.target.value)} className="input-dark" style={{ cursor: "pointer" }}>
                      {gyms.map(g => <option key={g.id} value={g.id}>{g.name} — {g.city}</option>)}
                      <option value="independent">Independiente</option>
                    </select>
                  </div>
                  <div style={{ padding: "10px 14px", background: "rgba(234,179,8,0.1)", border: "1px solid rgba(234,179,8,0.25)", borderRadius: 0, fontSize: 12, color: "var(--yellow-500)" }}>
                    ⚠️ Deberás verificar tu cédula para activar tu perfil como peleador oficial.
                  </div>
                </>
              )}

              {role === "gym" && (
                <>
                  <div>
                    <label style={{ fontSize: 11, fontFamily: "var(--font-display)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-text-muted)", display: "block", marginBottom: 6 }}>Ciudad del gimnasio</label>
                    <input value={gymCity} onChange={e => setGymCity(e.target.value)} className="input-dark" placeholder="Ej: Guayaquil" />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontFamily: "var(--font-display)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-text-muted)", display: "block", marginBottom: 6 }}>Provincia</label>
                    <select value={gymProvince} onChange={e => setGymProvince(e.target.value)} className="input-dark" style={{ cursor: "pointer" }}>
                      {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                </>
              )}
            </div>

            {error && (
              <div style={{ padding: "10px 14px", background: "rgba(211,47,47,0.15)", border: "1px solid rgba(211,47,47,0.4)", borderRadius: 0, fontSize: 13, color: "var(--red-300)", marginBottom: 16 }}>
                {error}
              </div>
            )}

            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn-secondary" style={{ flex: 1 }} onClick={() => setStep(2)}>← Atrás</button>
              <button className="btn-primary" style={{ flex: 2, opacity: loading ? 0.7 : 1 }} disabled={loading} onClick={handleSubmit}>
                {loading ? "Creando…" : "Crear cuenta 🚀"}
              </button>
            </div>
          </>
        )}
      </div>

      <div style={{ marginTop: 20, fontSize: 14, color: "var(--color-text-muted)" }}>
        ¿Ya tienes cuenta?{" "}
        <Link href="/login" style={{ color: "var(--color-primary)", fontWeight: 700, textDecoration: "none" }}>Inicia sesión</Link>
      </div>
      </div>
    </div>
  );
}
