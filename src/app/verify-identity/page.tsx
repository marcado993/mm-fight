"use client";
import React, { useState } from "react";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

type VerifyStep = "intro" | "cedula" | "selfie" | "processing" | "done";

export default function VerifyIdentityPage() {
  const { user, setVerified } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState<VerifyStep>("intro");
  const [cedulaFile, setCedulaFile] = useState<File | null>(null);
  const [selfieFile, setSelfieFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);

  if (!user || user.role !== "fighter") {
    return (
      <div style={{ minHeight: "100dvh", background: "var(--color-bg)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>🚫</div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Solo para peleadores</div>
          <Link href="/" style={{ color: "var(--color-primary)", fontFamily: "var(--font-display)", fontWeight: 700, textDecoration: "none" }}>← Volver al inicio</Link>
        </div>
      </div>
    );
  }

  function simulateRekognition() {
    setStep("processing");
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setVerified();
          setStep("done");
          return 100;
        }
        return p + 4;
      });
    }, 80);
  }

  return (
    <div style={{ minHeight: "100dvh", background: "var(--color-bg)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px 20px" }}>

      {/* Header */}
      <div style={{ marginBottom: 32, textAlign: "center" }}>
        <div style={{ fontSize: 40, marginBottom: 10 }}>🪪</div>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 24, letterSpacing: "-0.03em", marginBottom: 6 }}>Verificación de Identidad</h1>
        <p style={{ fontSize: 13, color: "var(--color-text-muted)", maxWidth: 320 }}>
          Verifica tu cédula para activar tu perfil oficial de peleador en MMA Ecuador
        </p>
      </div>

      <div style={{ width: "100%", maxWidth: 440, background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: 20, padding: "32px 28px" }}>

        {/* ── Intro ── */}
        {step === "intro" && (
          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 28 }}>
              {[
                { icon: "🪪", title: "Sube tu cédula", desc: "Fotografía frontal de tu cédula de identidad ecuatoriana" },
                { icon: "🤳", title: "Tómate un selfie", desc: "Una foto clara de tu cara para verificarla con tu cédula" },
                { icon: "🤖", title: "Verificación automática", desc: "AWS Rekognition compara tu rostro con la foto de tu documento" },
              ].map(({ icon, title, desc }) => (
                <div key={title} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "14px 16px", background: "var(--color-surface-raised)", borderRadius: 14 }}>
                  <div style={{ fontSize: 24, flexShrink: 0 }}>{icon}</div>
                  <div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{title}</div>
                    <div style={{ fontSize: 12, color: "var(--color-text-muted)" }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ padding: "10px 14px", background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.25)", borderRadius: 10, marginBottom: 20, fontSize: 12, color: "var(--blue-500)" }}>
              🔒 Tus datos biométricos son procesados de forma segura y no se almacenan en nuestros servidores.
            </div>

            <button className="btn-primary" style={{ width: "100%" }} onClick={() => setStep("cedula")}>
              Comenzar verificación →
            </button>
            <Link href="/" style={{ textDecoration: "none" }}>
              <button className="btn-secondary" style={{ width: "100%", marginTop: 10 }}>Cancelar</button>
            </Link>
          </div>
        )}

        {/* ── Upload cédula ── */}
        {step === "cedula" && (
          <div>
            <div style={{ marginBottom: 8, fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 18 }}>📄 Paso 1: Cédula</div>
            <p style={{ fontSize: 13, color: "var(--color-text-muted)", marginBottom: 24 }}>Sube una foto clara de la cara frontal de tu cédula ecuatoriana.</p>

            <label htmlFor="cedula-upload" style={{
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              gap: 12, padding: "32px 20px", cursor: "pointer",
              border: `2px dashed ${cedulaFile ? "var(--green-500)" : "var(--color-border)"}`,
              borderRadius: 16, background: cedulaFile ? "rgba(34,197,94,0.06)" : "var(--color-surface-raised)",
              transition: "all 0.2s", marginBottom: 20,
            }}>
              <span style={{ fontSize: 36 }}>{cedulaFile ? "✅" : "📎"}</span>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, marginBottom: 4 }}>
                  {cedulaFile ? cedulaFile.name : "Toca para subir foto"}
                </div>
                <div style={{ fontSize: 12, color: "var(--color-text-muted)" }}>JPG, PNG o HEIC · Máx. 5MB</div>
              </div>
              <input id="cedula-upload" type="file" accept="image/*" style={{ display: "none" }} onChange={e => setCedulaFile(e.target.files?.[0] ?? null)} />
            </label>

            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn-secondary" style={{ flex: 1 }} onClick={() => setStep("intro")}>← Atrás</button>
              <button className="btn-primary" style={{ flex: 2 }} disabled={!cedulaFile} onClick={() => setStep("selfie")}>
                Continuar →
              </button>
            </div>
          </div>
        )}

        {/* ── Selfie ── */}
        {step === "selfie" && (
          <div>
            <div style={{ marginBottom: 8, fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 18 }}>🤳 Paso 2: Selfie</div>
            <p style={{ fontSize: 13, color: "var(--color-text-muted)", marginBottom: 24 }}>Tómate una foto clara de tu rostro mirando a la cámara.</p>

            <label htmlFor="selfie-upload" style={{
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              gap: 12, padding: "32px 20px", cursor: "pointer",
              border: `2px dashed ${selfieFile ? "var(--green-500)" : "var(--color-border)"}`,
              borderRadius: 16, background: selfieFile ? "rgba(34,197,94,0.06)" : "var(--color-surface-raised)",
              transition: "all 0.2s", marginBottom: 20,
            }}>
              <span style={{ fontSize: 36 }}>{selfieFile ? "✅" : "🤳"}</span>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, marginBottom: 4 }}>
                  {selfieFile ? selfieFile.name : "Toca para subir selfie"}
                </div>
                <div style={{ fontSize: 12, color: "var(--color-text-muted)" }}>Buena iluminación · Sin gafas</div>
              </div>
              <input id="selfie-upload" type="file" accept="image/*" capture="user" style={{ display: "none" }} onChange={e => setSelfieFile(e.target.files?.[0] ?? null)} />
            </label>

            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn-secondary" style={{ flex: 1 }} onClick={() => setStep("cedula")}>← Atrás</button>
              <button className="btn-primary" style={{ flex: 2 }} disabled={!selfieFile} onClick={simulateRekognition}>
                Verificar identidad 🚀
              </button>
            </div>
          </div>
        )}

        {/* ── Processing ── */}
        {step === "processing" && (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: 40, marginBottom: 20 }}>🤖</div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 18, marginBottom: 6 }}>Verificando con AWS Rekognition…</div>
            <div style={{ fontSize: 13, color: "var(--color-text-muted)", marginBottom: 28 }}>Comparando tu rostro con tu cédula</div>

            <div style={{ textAlign: "left", marginBottom: 16 }}>
              {[
                { label: "Cargando documentos", done: progress >= 20 },
                { label: "Extrayendo rasgos faciales", done: progress >= 50 },
                { label: "Comparando identidades", done: progress >= 80 },
                { label: "Verificando base de datos", done: progress >= 95 },
              ].map(({ label, done }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", flexShrink: 0, background: done ? "var(--green-500)" : "var(--color-surface-raised)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, transition: "all 0.3s" }}>
                    {done ? "✓" : "○"}
                  </div>
                  <span style={{ fontSize: 13, color: done ? "var(--color-text)" : "var(--color-text-muted)", transition: "color 0.3s" }}>{label}</span>
                </div>
              ))}
            </div>

            <div className="progress-bar" style={{ height: 8, borderRadius: 4 }}>
              <div className="progress-fill" style={{ width: `${progress}%`, transition: "width 0.1s linear" }} />
            </div>
            <div style={{ marginTop: 8, fontSize: 12, color: "var(--color-text-muted)", fontFamily: "var(--font-display)", fontWeight: 700 }}>{progress}%</div>
          </div>
        )}

        {/* ── Done ── */}
        {step === "done" && (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(34,197,94,0.15)", border: "3px solid var(--green-500)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 32 }}>✅</div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 22, marginBottom: 8, color: "var(--green-500)" }}>¡Identidad Verificada!</div>
            <p style={{ fontSize: 14, color: "var(--color-text-muted)", marginBottom: 28 }}>
              Tu perfil oficial de peleador está ahora activo. Aparecerás en el directorio verificado de MMA Ecuador.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <button className="btn-primary" style={{ background: "var(--green-500)", color: "#000" }} onClick={() => router.push("/")}>
                Ver mi perfil →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
