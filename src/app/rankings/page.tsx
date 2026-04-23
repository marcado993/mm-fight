"use client";
import { useState, useMemo } from "react";
import BottomNav from "@/components/BottomNav";
import TopBar from "@/components/TopBar";
import { fighters, type WeightClass, type Level, type Province } from "@/lib/data";
import Link from "next/link";

const weightClasses: WeightClass[] = ["Paja","Mosca","Gallo","Pluma","Ligero","Superligero","Welter","Superwelter","Mediano","Semipesado","Pesado"];
const provinces: Province[] = ["Pichincha","Guayas","Azuay","Manabí","El Oro","Tungurahua"];
const levels: Level[] = ["Amateur","Pro"];
const styles = ["Striker","Grappler","Mixto"];

const styleColors: Record<string, string> = {
  Striker: "var(--red-500)", Grappler: "var(--blue-500)", Mixto: "var(--orange-500)",
};

export default function RankingsPage() {
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
    <div style={{ background: "var(--color-bg)", minHeight: "100dvh", paddingBottom: 80 }}>
      <TopBar title="Rankings" />

      {/* Header */}
      <div style={{ padding: "20px 20px 0", background: "linear-gradient(180deg, #1a0505 0%, var(--color-bg) 100%)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 28 }}>🔥</span>
          <h1 className="font-display" style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 32, letterSpacing: "-0.04em", lineHeight: 1 }}>
            RANKINGS
          </h1>
        </div>
        <p style={{ fontSize: 13, color: "var(--color-text-muted)", marginBottom: 16 }}>
          Ranking Nacional · {filtered.length} peleadores
        </p>

        {/* Filters */}
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 16, scrollbarWidth: "none" }}>
          {/* Nivel */}
          {levels.map(l => (
            <button key={l} className={`chip${nivel === l ? " active" : ""}`} onClick={() => setNivel(v => v === l ? "" : l)}>{l}</button>
          ))}
          <div style={{ width: 1, background: "var(--color-border)", flexShrink: 0 }} />
          {/* Peso */}
          {weightClasses.map(w => (
            <button key={w} className={`chip${peso === w ? " active" : ""}`} onClick={() => setPeso(v => v === w ? "" : w)}>{w}</button>
          ))}
          <div style={{ width: 1, background: "var(--color-border)", flexShrink: 0 }} />
          {/* Provincia */}
          {provinces.map(p => (
            <button key={p} className={`chip${provincia === p ? " active" : ""}`} onClick={() => setProvincia(v => v === p ? "" : p)}>{p}</button>
          ))}
          <div style={{ width: 1, background: "var(--color-border)", flexShrink: 0 }} />
          {/* Estilo */}
          {styles.map(s => (
            <button key={s} className={`chip${estilo === s ? " active" : ""}`} onClick={() => setEstilo(v => v === s ? "" : s)} style={estilo === s ? { color: styleColors[s], borderColor: styleColors[s], background: `${styleColors[s]}22` } : {}}>{s}</button>
          ))}
        </div>
      </div>

      <main style={{ padding: "0 16px 16px" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--color-text-muted)" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>Sin resultados</div>
            <div style={{ fontSize: 13, marginTop: 4 }}>Ajusta los filtros</div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {filtered.map((f, idx) => {
              const initials = f.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
              const isFirst = idx === 0 && !peso && !nivel && !provincia && !estilo;
              return (
                <Link key={f.id} href={`/fighters/${f.id}`} style={{ textDecoration: "none" }}>
                  <div style={{
                    padding: "16px 18px",
                    background: isFirst ? "linear-gradient(135deg, #2a0505, #1a0303)" : "var(--card-bg)",
                    borderRadius: 16, border: `1px solid ${isFirst ? "var(--color-primary)" : "var(--card-border)"}`,
                    display: "flex", alignItems: "center", gap: 14, cursor: "pointer",
                    transition: "transform 0.2s, border-color 0.2s",
                  }}>
                    {/* Position */}
                    <div style={{
                      width: 42, height: 42, borderRadius: "50%", flexShrink: 0,
                      background: idx === 0 ? "var(--color-primary)" : idx === 1 ? "linear-gradient(135deg,#c0c0c0,#707070)" : idx === 2 ? "linear-gradient(135deg,#cd7f32,#8b4513)" : "var(--color-surface-raised)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 15, color: "white"
                    }}>
                      {idx < 3 ? initials : `#${idx + 1}`}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", marginBottom: 3 }}>
                        <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 15, color: "var(--color-text)" }}>{f.name}</span>
                        {f.nickname && <span style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 12, color: "var(--color-text-secondary)" }}>&quot;{f.nickname}&quot;</span>}
                      </div>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        <span className={`badge badge-${f.level === "Pro" ? "pro" : "amateur"}`}>{f.level}</span>
                        <span className="badge badge-outline">{f.weightClass}</span>
                        <span style={{ fontSize: 11, color: "var(--color-text-muted)", alignSelf: "center" }}>{f.city}</span>
                      </div>
                    </div>

                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div className="record-display" style={{ fontSize: 16, justifyContent: "flex-end" }}>
                        <span className="record-w">{f.proRecord.w}</span>
                        <span style={{ color: "var(--color-text-muted)", fontWeight: 400, fontSize: 13 }}>-</span>
                        <span className="record-l">{f.proRecord.l}</span>
                        {f.proRecord.d > 0 && <><span style={{ color: "var(--color-text-muted)", fontWeight: 400, fontSize: 13 }}>-</span><span className="record-d">{f.proRecord.d}</span></>}
                      </div>
                      <div style={{ fontSize: 10, color: "var(--color-text-muted)", fontFamily: "var(--font-display)", fontWeight: 600, textTransform: "uppercase", marginTop: 2 }}>
                        Pro Record
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
