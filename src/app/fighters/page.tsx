"use client";
import { useState, useMemo } from "react";
import AppShell from "@/components/AppShell";
import { useAuth } from "@/lib/auth";
import Image from "next/image";
import FighterCard from "@/components/FighterCard";
import { fighters, type Level } from "@/lib/data";

export default function FightersPage() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [nivel, setNivel] = useState<Level | "">("");
  const [estilo, setEstilo] = useState("");

  const filtered = useMemo(() => fighters.filter(f =>
    (f.name.toLowerCase().includes(search.toLowerCase()) ||
     f.nickname?.toLowerCase().includes(search.toLowerCase()) ||
     f.gym.toLowerCase().includes(search.toLowerCase())) &&
    (!nivel || f.level === nivel) &&
    (!estilo || f.style === estilo)
  ), [search, nivel, estilo]);

  return (
    <AppShell role={user?.role || "normal"}>
      <div style={{ padding: "40px 16px 20px", background: "var(--color-surface)", borderBottom: "4px solid var(--color-primary)" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 48, letterSpacing: "2px", lineHeight: 1, textTransform: "uppercase", marginBottom: 16 }}>DIRECTORIO DE PELEADORES</h1>
        
        {/* Search */}
        <div style={{ position: "relative", marginBottom: 20 }}>
          <div style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", fontFamily: "var(--font-display)", fontSize: 24, color: "var(--color-primary)", userSelect: "none" }}>
            🔍
          </div>
          <input
            style={{ 
              width: "100%", padding: "16px 16px 16px 56px", 
              background: "var(--neutral-900)", border: "4px solid var(--color-text)",
              color: "white", fontFamily: "var(--font-display)", fontSize: 20, textTransform: "uppercase",
              outline: "none"
            }}
            placeholder="BUSCAR NOMBRE, APODO O GIMNASIO..."
            value={search} onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 12, marginBottom: 16, overflowX: "auto", scrollbarWidth: "none", paddingBottom: 8, alignItems: "center" }}>
          {(["","Amateur","Pro"] as const).map(l => (
            <button key={l} style={{
              padding: "8px 16px", fontFamily: "var(--font-display)", fontSize: 16, textTransform: "uppercase", 
              background: nivel === l ? "var(--color-primary)" : "transparent",
              color: nivel === l ? "white" : "var(--color-text)",
              border: "2px solid", borderColor: nivel === l ? "var(--color-primary)" : "var(--color-border)",
              cursor: "pointer", whiteSpace: "nowrap"
            }} onClick={() => setNivel(l as Level | "")}>{l || "TODOS LOS NIVELES"}</button>
          ))}
          <div style={{ width: 4, height: 24, background: "var(--color-border)", flexShrink: 0 }} />
          {["","Striker","Grappler","Mixto"].map(s => (
            <button key={s} style={{
              padding: "8px 16px", fontFamily: "var(--font-display)", fontSize: 16, textTransform: "uppercase", 
              background: estilo === s ? "var(--color-text)" : "transparent",
              color: estilo === s ? "var(--color-bg)" : "var(--color-text)",
              border: "2px solid", borderColor: estilo === s ? "var(--color-text)" : "var(--color-border)",
              cursor: "pointer", whiteSpace: "nowrap"
            }} onClick={() => setEstilo(e => e === s ? "" : s)}>{s || "CUALQUIER ESTILO"}</button>
          ))}
        </div>

        <div style={{ fontSize: 14, color: "var(--color-primary)", fontFamily: "var(--font-display)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>
          {filtered.length} COMBATIENTES ENCONTRADOS
        </div>
      </div>

      <main style={{ padding: "24px 16px 40px", display: "flex", flexDirection: "column", gap: 16 }}>
        {filtered.map(f => <FighterCard key={f.id} fighter={f} showRank={true} />)}
        
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 20px", color: "var(--color-text-muted)", background: "var(--color-surface)", border: "4px dashed var(--color-border)" }}>
            <div style={{ marginBottom: 16 }}>
              <Image src="/icon_glove.png" width={64} height={64} alt="Glove" style={{ opacity: 0.5 }} />
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 24, textTransform: "uppercase" }}>NINGÚN PELEADOR COINCIDE</div>
            <div style={{ fontSize: 14, marginTop: 8, fontFamily: "var(--font-body)", fontWeight: 700, textTransform: "uppercase" }}>LA BÚSQUEDA HA FALLADO. REDEFINE LOS PARÁMETROS.</div>
          </div>
        )}
      </main>
    </AppShell>
  );
}
