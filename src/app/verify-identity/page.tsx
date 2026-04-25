"use client";
import React, { useState } from "react";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

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
        <div style={{ textAlign: "center", border: "4px solid var(--color-primary)", padding: 40, background: "var(--color-surface)" }}>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 40, color: "var(--color-primary)", marginBottom: 16 }}>ACCESO DENEGADO</div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, marginBottom: 24, textTransform: "uppercase" }}>Solo para peleadores</div>
          <Link href="/" style={{ padding: "12px 24px", background: "var(--color-text)", color: "var(--color-bg)", fontFamily: "var(--font-display)", fontWeight: 700, textDecoration: "none", textTransform: "uppercase" }}>Volver al inicio</Link>
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
    <div style={{ minHeight: "100dvh", position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px 20px" }}>
      {/* Obfuscated Background */}
      <div className="animate-slow-pan" style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 0, opacity: 0.25, filter: "blur(8px)" }}>
        <Image src="/octagon.png" alt="Background" fill style={{ objectFit: "cover" }} />
      </div>
      <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "var(--color-bg)", opacity: 0.6, zIndex: 0 }} />

      {/* Header */}
      <div style={{ marginBottom: 32, textAlign: "center", position: "relative", zIndex: 10 }}>
        <div style={{ display: "inline-block", background: "var(--color-primary)", color: "white", fontFamily: "var(--font-display)", fontSize: 24, padding: "8px 16px", marginBottom: 16, transform: "skewX(-10deg)" }}>
          <span style={{ transform: "skewX(10deg)", display: "block" }}>ID</span>
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 32, letterSpacing: "-0.03em", marginBottom: 6, textTransform: "uppercase" }}>Verificación de Identidad</h1>
        <p style={{ fontSize: 13, color: "var(--color-text-muted)", fontFamily: "var(--font-display)", textTransform: "uppercase", maxWidth: 320, margin: "0 auto" }}>
          Verifica tu cédula para activar tu perfil oficial
        </p>
      </div>

      <div className="animate-pulse-glow" style={{ width: "100%", maxWidth: 440, background: "var(--color-surface)", border: "2px solid var(--color-border)", padding: "32px 28px", position: "relative", zIndex: 10 }}>

        {/* ── Intro ── */}
        {step === "intro" && (
          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 28 }}>
              {[
                { icon: "CÉDULA", title: "Sube tu cédula", desc: "Fotografía frontal de tu ID ecuatoriano" },
                { icon: "SELFIE", title: "Tómate un selfie", desc: "Una foto clara de tu cara para comparar" },
                { icon: "AWS", title: "Verificación automática", desc: "Rekognition compara tu rostro y documento" },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="hover-lift" style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "14px 16px", background: "var(--neutral-900)", border: "1px solid var(--color-border)", borderRadius: 0 }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 12, background: "var(--color-primary)", color: "white", padding: "4px 8px", flexShrink: 0, textTransform: "uppercase" }}>{icon}</div>
                  <div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, marginBottom: 2, textTransform: "uppercase" }}>{title}</div>
                    <div style={{ fontSize: 12, color: "var(--color-text-muted)", fontFamily: "var(--font-body)" }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ padding: "10px 14px", background: "rgba(211,47,47,0.1)", border: "1px solid var(--color-primary)", borderRadius: 0, marginBottom: 20, fontSize: 12, color: "white", fontFamily: "var(--font-display)", textTransform: "uppercase" }}>
              🔒 Datos biométricos procesados temporalmente. Cero almacenamiento en servidor.
            </div>

            <button className="btn-primary" style={{ width: "100%" }} onClick={() => setStep("cedula")}>
              INICIAR PROTOCOLO →
            </button>
            <Link href="/" style={{ textDecoration: "none" }}>
              <button className="btn-secondary" style={{ width: "100%", marginTop: 10 }}>CANCELAR</button>
            </Link>
          </div>
        )}

        {/* ── Upload cédula ── */}
        {step === "cedula" && (
          <div>
            <div style={{ display: "inline-block", background: "var(--color-text)", color: "var(--color-bg)", padding: "4px 8px", fontFamily: "var(--font-display)", fontSize: 14, textTransform: "uppercase", marginBottom: 12 }}>PASO 1 :: CÉDULA</div>
            <p style={{ fontSize: 13, color: "var(--color-text-muted)", marginBottom: 24, fontFamily: "var(--font-display)", textTransform: "uppercase" }}>Sube fotografía frontal de marco completo.</p>

            <label htmlFor="cedula-upload" style={{
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              gap: 12, padding: "40px 20px", cursor: "pointer",
              border: `4px dashed ${cedulaFile ? "var(--color-primary)" : "var(--color-border)"}`,
              borderRadius: 0, background: "var(--neutral-900)",
              transition: "all 0.2s", marginBottom: 24,
            }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 24, color: cedulaFile ? "var(--color-primary)" : "var(--color-text)", lineHeight: 1 }}>{cedulaFile ? "[ OK ]" : "[ ADJUNTAR ]"}</div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, marginBottom: 4, textTransform: "uppercase", color: cedulaFile ? "var(--color-primary)" : "white" }}>
                  {cedulaFile ? cedulaFile.name : "SELECCIONAR ARCHIVO"}
                </div>
                <div style={{ fontSize: 12, color: "var(--color-text-muted)" }}>JPG / PNG / HEIC</div>
              </div>
              <input id="cedula-upload" type="file" accept="image/*" style={{ display: "none" }} onChange={e => setCedulaFile(e.target.files?.[0] ?? null)} />
            </label>

            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn-secondary" style={{ flex: 1 }} onClick={() => setStep("intro")}>ATRÁS</button>
              <button className="btn-primary animate-jab" style={{ flex: 2 }} disabled={!cedulaFile} onClick={() => setStep("selfie")}>
                CONTINUAR →
              </button>
            </div>
          </div>
        )}

        {/* ── Selfie ── */}
        {step === "selfie" && (
          <div>
            <div style={{ display: "inline-block", background: "var(--color-text)", color: "var(--color-bg)", padding: "4px 8px", fontFamily: "var(--font-display)", fontSize: 14, textTransform: "uppercase", marginBottom: 12 }}>PASO 2 :: SELFIE</div>
            <p style={{ fontSize: 13, color: "var(--color-text-muted)", marginBottom: 24, fontFamily: "var(--font-display)", textTransform: "uppercase" }}>Registra escaneo facial. Sin gafas, buena iluminación.</p>

            <label htmlFor="selfie-upload" style={{
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              gap: 12, padding: "40px 20px", cursor: "pointer",
              border: `4px dashed ${selfieFile ? "var(--color-primary)" : "var(--color-border)"}`,
              borderRadius: 0, background: "var(--neutral-900)",
              transition: "all 0.2s", marginBottom: 24,
            }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 24, color: selfieFile ? "var(--color-primary)" : "var(--color-text)", lineHeight: 1 }}>{selfieFile ? "[ OK ]" : "[ CAPTURAR ]"}</div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, marginBottom: 4, textTransform: "uppercase", color: selfieFile ? "var(--color-primary)" : "white" }}>
                  {selfieFile ? selfieFile.name : "INICIAR CÁMARA"}
                </div>
              </div>
              <input id="selfie-upload" type="file" accept="image/*" capture="user" style={{ display: "none" }} onChange={e => setSelfieFile(e.target.files?.[0] ?? null)} />
            </label>

            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn-secondary" style={{ flex: 1 }} onClick={() => setStep("cedula")}>ATRÁS</button>
              <button className="btn-primary animate-jab" style={{ flex: 2 }} disabled={!selfieFile} onClick={simulateRekognition}>
                EJECUTAR AWS
              </button>
            </div>
          </div>
        )}

        {/* ── Processing ── */}
        {step === "processing" && (
          <div style={{ textAlign: "left", padding: "20px 0" }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 24, marginBottom: 8, textTransform: "uppercase" }}>AWS REKOGNITION</div>
            <div style={{ fontSize: 13, color: "var(--color-text-muted)", marginBottom: 32, fontFamily: "var(--font-display)", textTransform: "uppercase" }}>Ejecutando cruce biométrico...</div>

            <div style={{ marginBottom: 24, borderLeft: "2px solid var(--color-border)", paddingLeft: 16 }}>
              {[
                { label: "CARGANDO DATOS", done: progress >= 20 },
                { label: "MALLA FACIAL EXTRAÍDA", done: progress >= 50 },
                { label: "COMPARANDO IDENTIDAD", done: progress >= 80 },
                { label: "BASE NACIONAL VERIFICADA", done: progress >= 95 },
              ].map(({ label, done }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 14, height: 14, background: done ? "var(--color-primary)" : "transparent", border: `2px solid ${done ? "var(--color-primary)" : "var(--color-border)"}`, transition: "all 0.3s" }} />
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 14, textTransform: "uppercase", color: done ? "white" : "var(--color-text-muted)", transition: "color 0.3s", letterSpacing: "1px" }}>{label}</span>
                </div>
              ))}
            </div>

            <div className="progress-bar" style={{ height: 12, borderRadius: 0, background: "var(--neutral-900)", border: "2px solid var(--color-text)" }}>
              <div className="progress-fill" style={{ width: `${progress}%`, background: "var(--color-primary)" }} />
            </div>
            <div style={{ marginTop: 12, textAlign: "right", fontSize: 16, color: "var(--color-primary)", fontFamily: "var(--font-display)", fontWeight: 900 }}>{progress}%</div>
          </div>
        )}

        {/* ── Done ── */}
        {step === "done" && (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ display: "inline-block", padding: "12px 24px", background: "var(--color-primary)", color: "white", fontFamily: "var(--font-display)", fontSize: 24, marginBottom: 24, textTransform: "uppercase", border: "4px solid var(--color-text)", boxShadow: "6px 6px 0px rgba(255,255,255,0.1)" }}>[ IDENTIDAD VALIDADA ]</div>
            <p style={{ fontSize: 14, color: "var(--color-text)", marginBottom: 32, fontFamily: "var(--font-display)", textTransform: "uppercase" }}>
              Perfil verificado. Modo combatiente activo.
            </p>
            <button className="btn-primary animate-jab" style={{ width: "100%" }} onClick={() => router.push("/")}>
              ENTRAR AL DOJO →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
