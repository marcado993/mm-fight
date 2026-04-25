"use client";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AppShell from "@/components/AppShell";
import { provincialLeagues } from "@/lib/data";
import Image from "next/image";

export default function CommunitiesPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) router.replace("/landing");
  }, [user, isLoading, router]);

  if (isLoading || !user) return null;

  const feed = [
    { icon: <Image src="/icon_swords.png" width={24} height={24} alt="Swords" />, color: "var(--color-primary)",  province: "Guayas",     text: "ANDRÉS SILVA RETÓ A DIEGO ALMEIDA", sub: "Hace 2 horas" },
    { icon: <Image src="/icon_trophy.png" width={24} height={24} alt="Trophy" />, color: "var(--green-500)",        province: "Pichincha",  text: "SEBASTIÁN REYES MANTIENE INVICTO AMATEUR", sub: "Hace 5 horas" },
    { icon: <Image src="/icon_fire.png" width={24} height={24} alt="News" />,     color: "var(--yellow-500)",       province: "Manabí",     text: "WARRIOR SERIES 05 CONFIRMA CARTELERA COMPLETA", sub: "Ayer" },
    { icon: <Image src="/icon_stadium.png" width={24} height={24} alt="Rank" />,  color: "var(--orange-500)",       province: "Azuay",      text: "CARLOS MORÁN SUBE AL #1 LIGA AZUAY", sub: "Hace 2 días" },
    { icon: <Image src="/icon_stadium.png" width={24} height={24} alt="Venue" />, color: "var(--blue-500)",         province: "El Oro",     text: "NUEVO GIMNASIO SE UNE A LA LIGA EL ORO", sub: "Hace 3 días" },
  ];

  return (
    <AppShell role={user.role}>
      <main style={{ padding: "40px 16px 40px" }}>
        
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: "var(--font-display)", fontSize: 48, letterSpacing: "2px", lineHeight: 1, textTransform: "uppercase", marginBottom: 8 }}>
            <Image src="/icon_fire.png" alt="Ligas" width={48} height={48} />
            COMUNIDADES
          </h1>
          <p style={{ fontSize: 16, color: "var(--color-primary)", fontFamily: "var(--font-display)", textTransform: "uppercase", letterSpacing: "1px" }}>
            CONÉCTATE CON TU FACCIÓN PROVINCIAL
          </p>
        </div>

        {/* Leagues grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 16, marginBottom: 48 }}>
          {provincialLeagues.map(league => (
            <div key={league.id} style={{ 
              padding: "20px", cursor: "pointer", background: league.color, 
              border: "4px solid var(--color-text)", boxShadow: "4px 4px 0px var(--neutral-900)" 
            }}>
              <div style={{ fontSize: 40, marginBottom: 12, filter: "grayscale(100%) brightness(200%)" }}>{league.icon}</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 20, marginBottom: 8, color: "white", textTransform: "uppercase", textShadow: "1px 1px 0px black" }}>{league.name}</div>
              <div style={{ fontSize: 12, color: "black", fontFamily: "var(--font-body)", fontWeight: 700, textTransform: "uppercase", background: "white", padding: "4px 8px", display: "inline-block", marginBottom: 12 }}>
                {league.activeFighters} PELEADORES // {league.gyms} GYMS
              </div>
              {league.champion && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--yellow-400)", fontFamily: "var(--font-body)", fontWeight: 700, textTransform: "uppercase", backgroundColor: "rgba(0,0,0,0.4)", padding: "4px", marginBottom: 8 }}>
                  <Image src="/icon_trophy.png" width={16} height={16} alt="Trophy" />
                  REY: {league.champion}
                </div>
              )}
              {league.nextEvent && (
                <div style={{ fontSize: 12, color: "white", marginTop: 8, fontFamily: "var(--font-body)", fontWeight: 700, textTransform: "uppercase" }}>
                  PRÓXIMA GUERRA: {new Date(league.nextEvent).toLocaleDateString("es-EC", { day: "numeric", month: "short" })}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Community feed */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <Image src="/icon_fire.png" alt="Feed" width={32} height={32} />
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, textTransform: "uppercase" }}>TRANSMISIÓN NACIONAL</h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {feed.map((item, i) => (
            <div key={i} style={{ padding: "20px", background: "var(--color-surface)", border: "4px solid var(--color-border)", display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div style={{ width: 48, height: 48, background: "var(--color-bg)", border: `2px solid ${item.color}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{item.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 12, fontFamily: "var(--font-display)", textTransform: "uppercase", padding: "4px 8px", background: "var(--color-text)", color: "var(--color-bg)" }}>CANAL: {item.province}</span>
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 20, marginBottom: 4, textTransform: "uppercase" }}>{item.text}</div>
                <div style={{ fontSize: 12, color: "var(--color-primary)", fontFamily: "var(--font-body)", fontWeight: 700, textTransform: "uppercase" }}>{item.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Post input */}
        <div style={{ marginTop: 32, padding: "20px", background: "var(--neutral-900)", border: "4px solid var(--color-primary)", display: "flex", gap: 16, alignItems: "center", boxShadow: "6px 6px 0px rgba(255,255,255,0.1)" }}>
          <div style={{ width: 48, height: 48, background: "var(--color-primary)", border: "2px solid var(--color-text)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontSize: 20, color: "white", flexShrink: 0 }}>
            {user.name.split(" ").map(n => n[0]).join("").slice(0,2).toUpperCase()}
          </div>
          <input 
            style={{ flex: 1, padding: "16px", background: "var(--color-bg)", border: "4px solid var(--color-border)", fontSize: 16, color: "white", outline: "none", fontFamily: "var(--font-display)", textTransform: "uppercase" }}
            placeholder="EMITIR UN MENSAJE AL PÚBLICO..."
          />
          <button style={{ padding: "16px 24px", background: "var(--color-text)", border: "none", color: "var(--color-bg)", fontFamily: "var(--font-display)", fontSize: 20, cursor: "pointer", textTransform: "uppercase", flexShrink: 0 }}>
            PUBLICAR
          </button>
        </div>

      </main>
    </AppShell>
  );
}
