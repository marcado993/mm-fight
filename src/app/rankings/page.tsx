"use client";
import { useState, useMemo } from "react";
import AppShell from "@/components/AppShell";
import { useAuth } from "@/lib/auth";
import { fighters, type WeightClass, type Level, type Province } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";

const weightClasses: WeightClass[] = ["Paja","Mosca","Gallo","Pluma","Ligero","Superligero","Welter","Superwelter","Mediano","Semipesado","Pesado"];
const provinces: Province[] = ["Pichincha","Guayas","Azuay","Manabí","El Oro","Tungurahua"];
const levels: Level[] = ["Amateur","Pro"];
const styles = ["Striker","Grappler","Mixto"];

const styleColors: Record<string, string> = {
  Striker: "var(--red-500)", Grappler: "var(--blue-500)", Mixto: "var(--orange-500)",
};

export default function RankingsPage() {
  const { user } = useAuth();
  const [peso, setPeso] = useState<WeightClass | "">("");
  const [nivel, setNivel] = useState<Level | "">("");
  const [provincia, setProvincia] = useState<Province | "">("");
  const [estilo, setEstilo] = useState("");

  const filtered = useMemo(() => {
    return fighters
      .filter(f => (!peso || f.weightClass === peso)
        && (!nivel || f.level === nivel)
        && (!provincia || f.province === provincia)
        && (!estilo || f.style === estilo))
      .sort((a, b) => {
        if (a.level !== b.level) return a.level === "Pro" ? -1 : 1;
        return a.rank - b.rank;
      });
  }, [peso, nivel, provincia, estilo]);

  return (
    <AppShell role={user?.role || "normal"}>
      {/* Header */}
      <div style={{ padding: "40px 20px 20px", background: "var(--color-surface)", borderBottom: "4px solid var(--color-primary)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <Image src="/icon_fire.png" alt="Top Ranking" width={40} height={40} style={{ objectFit: "contain" }} />
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 48, letterSpacing: "2px", lineHeight: 1, textTransform: "uppercase" }}>
            RANKINGS
          </h1>
        </div>
        <p style={{ fontSize: 16, color: "var(--color-primary)", fontFamily: "var(--font-display)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 24 }}>
          COMPETENCIA NACIONAL // {filtered.length} COMBATIENTES EN LIZA
        </p>

        {/* Filters */}
        <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 16, scrollbarWidth: "none", alignItems: "center" }}>
          {/* Nivel */}
          {levels.map(l => (
            <button key={l} style={{ 
              padding: "8px 16px", fontFamily: "var(--font-display)", fontSize: 16, textTransform: "uppercase", 
              background: nivel === l ? "var(--color-primary)" : "transparent",
              color: nivel === l ? "white" : "var(--color-text)",
              border: "2px solid", borderColor: nivel === l ? "var(--color-primary)" : "var(--color-border)",
              cursor: "pointer", whiteSpace: "nowrap"
            }} onClick={() => setNivel(v => v === l ? "" : l)}>{l}</button>
          ))}
          <div style={{ width: 4, height: 24, background: "var(--color-border)", flexShrink: 0 }} />
          {/* Peso */}
          {weightClasses.map(w => (
            <button key={w} style={{ 
              padding: "8px 16px", fontFamily: "var(--font-display)", fontSize: 16, textTransform: "uppercase", 
              background: peso === w ? "var(--color-text)" : "transparent",
              color: peso === w ? "var(--color-bg)" : "var(--color-text)",
              border: "2px solid", borderColor: peso === w ? "var(--color-text)" : "var(--color-border)",
              cursor: "pointer", whiteSpace: "nowrap"
            }} onClick={() => setPeso(v => v === w ? "" : w)}>{w}</button>
          ))}
          <div style={{ width: 4, height: 24, background: "var(--color-border)", flexShrink: 0 }} />
          {/* Provincia */}
          {provinces.map(p => (
            <button key={p} style={{ 
              padding: "8px 16px", fontFamily: "var(--font-display)", fontSize: 16, textTransform: "uppercase", 
              background: provincia === p ? "var(--color-text)" : "transparent",
              color: provincia === p ? "var(--color-bg)" : "var(--color-text)",
              border: "2px solid", borderColor: provincia === p ? "var(--color-text)" : "var(--color-border)",
              cursor: "pointer", whiteSpace: "nowrap"
            }} onClick={() => setProvincia(v => v === p ? "" : p)}>{p}</button>
          ))}
        </div>
      </div>

      <main style={{ padding: "20px 16px 40px" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 20px", color: "var(--color-text-muted)", background: "var(--color-surface)", border: "4px dashed var(--color-border)" }}>
            <div style={{ marginBottom: 16 }}><Image src="/icon_swords.png" width={48} height={48} alt="Empty" style={{ opacity: 0.5 }} /></div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 24, textTransform: "uppercase" }}>SIN RETADORES ENCONTRADOS</div>
            <div style={{ fontSize: 14, marginTop: 8, fontFamily: "var(--font-body)", fontWeight: 700, textTransform: "uppercase" }}>LOS FILTROS ELIMINARON TODAS LAS AMENAZAS</div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {filtered.map((f, idx) => {
              const initials = f.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
              const isFirst = idx === 0 && !peso && !nivel && !provincia && !estilo;
              return (
                <Link key={f.id} href={`/fighters/${f.id}`} style={{ textDecoration: "none" }}>
                  <div style={{
                    padding: "20px",
                    background: isFirst ? "var(--neutral-900)" : "var(--color-surface)",
                    border: isFirst ? "4px solid var(--color-primary)" : "4px solid var(--color-text)",
                    display: "flex", alignItems: "center", gap: 16, cursor: "pointer",
                    boxShadow: isFirst ? "6px 6px 0px rgba(208,0,0,0.4)" : "4px 4px 0px rgba(255,255,255,0.1)",
                    transition: "transform 0.1s",
                  }} onMouseDown={e => e.currentTarget.style.transform = "translate(2px, 2px)"} onMouseUp={e => e.currentTarget.style.transform = "none"}>
                    {/* Position */}
                    <div style={{
                      width: 56, height: 56, flexShrink: 0,
                      background: isFirst ? "var(--color-primary)" : "var(--color-bg)",
                      border: "2px solid", borderColor: isFirst ? "var(--color-primary)" : "var(--color-border)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "var(--font-display)", fontSize: 28, color: isFirst ? "white" : "var(--color-primary)"
                    }}>
                      #{idx + 1}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: 24, lineHeight: 1.1, color: "var(--color-text)", textTransform: "uppercase", marginBottom: 6 }}>
                        {f.name} {f.nickname && <span style={{ color: "var(--color-primary)" }}>"{f.nickname}"</span>}
                      </div>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", fontFamily: "var(--font-display)", fontSize: 12, textTransform: "uppercase" }}>
                        <span style={{ padding: "2px 6px", background: f.level === "Pro" ? "var(--color-primary)" : "var(--neutral-600)", border: "1px solid var(--color-text)" }}>{f.level}</span>
                        <span style={{ padding: "2px 6px", border: "1px solid var(--color-border)", color: "var(--color-text-muted)" }}>{f.weightClass}</span>
                        <span style={{ alignSelf: "center", color: "var(--color-text-muted)" }}>// {f.city}</span>
                      </div>
                    </div>

                    <div style={{ textAlign: "right", flexShrink: 0, background: "var(--neutral-900)", padding: "10px", border: "2px solid var(--color-border)" }}>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: 28, lineHeight: 1 }}>
                        <span style={{ color: "var(--record-win)" }}>{f.proRecord.w}</span>
                        <span style={{ color: "var(--color-text-muted)", margin: "0 4px" }}>:</span>
                        <span style={{ color: "var(--record-loss)" }}>{f.proRecord.l}</span>
                      </div>
                      <div style={{ fontSize: 10, color: "var(--color-primary)", fontFamily: "var(--font-display)", textTransform: "uppercase", letterSpacing: "1px", marginTop: 4 }}>
                        RÉCORD PRO
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </AppShell>
  );
}
