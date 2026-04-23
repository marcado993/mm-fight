"use client";
import { useState, useMemo } from "react";
import BottomNav from "@/components/BottomNav";
import TopBar from "@/components/TopBar";
import FighterCard from "@/components/FighterCard";
import { fighters, type Level } from "@/lib/data";

export default function FightersPage() {
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
    <div style={{ background: "var(--color-bg)", minHeight: "100dvh", paddingBottom: 80 }}>
      <TopBar title="Peleadores" />

      <div style={{ padding: "16px 16px 0" }}>
        {/* Search */}
        <div style={{ position: "relative", marginBottom: 14 }}>
          <svg style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--color-text-disabled)" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            className="input-dark"
            style={{ paddingLeft: 40 }}
            placeholder="Buscar peleador, apodo o gimnasio..."
            value={search} onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16, overflowX: "auto", scrollbarWidth: "none", paddingBottom: 4 }}>
          {(["","Amateur","Pro"] as const).map(l => (
            <button key={l} className={`chip${nivel === l ? " active" : ""}`} onClick={() => setNivel(l as Level | "")}>{l || "Todos"}</button>
          ))}
          <div style={{ width: 1, background: "var(--color-border)", flexShrink: 0 }} />
          {["","Striker","Grappler","Mixto"].map(s => (
            <button key={s} className={`chip${estilo === s ? " active" : ""}`} onClick={() => setEstilo(e => e === s ? "" : s)}>{s || "Est. Todos"}</button>
          ))}
        </div>

        <div style={{ fontSize: 12, color: "var(--color-text-muted)", fontFamily: "var(--font-display)", fontWeight: 600, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          {filtered.length} peleadores
        </div>
      </div>

      <main style={{ padding: "0 16px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
        {filtered.map(f => <FighterCard key={f.id} fighter={f} showRank={true} />)}
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--color-text-muted)" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🥊</div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>Sin resultados</div>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
