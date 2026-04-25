"use client";
import Link from "next/link";
import { fighters, events, gyms } from "@/lib/data";
import type { UserProfile } from "@/lib/auth";
import { useState } from "react";
import Image from "next/image";

const styleColors: Record<string, string> = {
  Striker: "var(--red-500)", Grappler: "var(--blue-500)", Mixto: "var(--orange-500)",
};

export default function NormalHome({ user }: { user: UserProfile }) {
  const top3 = fighters.filter(f => f.level === "Pro").sort((a,b) => a.rank - b.rank).slice(0, 3);
  const liveEvent = events.find(e => e.status === "live");
  const nextEvent = events.find(e => e.status === "upcoming");
  const featuredGyms = gyms.slice(0, 3);
  const [showTicketModal, setShowTicketModal] = useState(false);

  return (
    <main style={{ padding: "0 16px 40px" }}>

      {/* ── Welcome ── */}
      <div style={{ margin: "20px 0 24px", display: "flex", alignItems: "flex-end", justifyItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 12, color: "var(--color-primary)", fontFamily: "var(--font-display)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 4 }}>
            FANÁTICO DE LA JAULA
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 36, letterSpacing: "1px", textTransform: "uppercase", lineHeight: 1 }}>
            {user.name.split(" ")[0]}
          </div>
        </div>
        <span style={{ fontFamily: "var(--font-display)", fontSize: 16, color: "var(--color-bg)", background: "var(--color-text)", padding: "4px 12px", textTransform: "uppercase", border: "2px solid var(--color-primary)", transform: "skewX(-10deg)" }}>
          <span style={{ transform: "skewX(10deg)", display: "block" }}>VIP</span>
        </span>
      </div>

      {/* ── Live banner ── */}
      {liveEvent && (
        <div style={{ margin: "0 0 20px", padding: "16px", background: "var(--color-primary)", border: "4px solid var(--color-text)", display: "flex", alignItems: "center", gap: 10, boxShadow: "4px 4px 0px rgba(255,255,255,0.2)" }}>
          <span className="live-dot" style={{ background: "var(--neutral-900)" }} />
          <span style={{ fontFamily: "var(--font-display)", fontSize: 20, textTransform: "uppercase", letterSpacing: "1px", color: "var(--neutral-900)" }}>EN VIVO ONLINE: {liveEvent.name}</span>
        </div>
      )}

      {/* ── MOCKUP STYLE SEC: LIGAS Y EVENTOS VS HEADER ── */}
      {nextEvent && (() => {
        const [fighter1, fighter2] = nextEvent.mainEvent ? nextEvent.mainEvent.split(" vs ") : ["FIGHTER A", "FIGHTER B"];
        const name1 = fighter1.split(" ").pop() || "TORO";
        const name2 = fighter2.split(" ").pop() || "LOBO";
        
        return (
        <div style={{ marginBottom: 32, border: "4px solid var(--color-text)", background: "var(--color-surface)", overflow: "hidden" }}>
          {/* Top Banner VS Block */}
          <div style={{ position: "relative", height: 280, display: "flex", overflow: "hidden", background: "var(--neutral-900)" }}>
            {/* Fighter 1 (Left) */}
            <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
               <Image src="/fighter-silhouette.png" alt="F1" fill style={{ objectFit: "cover", objectPosition: "left top", opacity: 0.5 }} />
               <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent, rgba(5,5,5,0.9))" }} />
               <div style={{ position: "absolute", bottom: 44, left: 16, zIndex: 10 }}>
                 <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 6vw, 40px)", color: "white", textTransform: "uppercase", lineHeight: 1, textShadow: "2px 2px 0px var(--color-primary)" }}>{name1}</div>
               </div>
            </div>
            
            {/* Fighter 2 (Right) */}
            <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
               <Image src="/fighter-silhouette.png" alt="F2" fill style={{ objectFit: "cover", objectPosition: "left top", transform: "scaleX(-1)", opacity: 0.5 }} />
               <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to left, transparent, rgba(5,5,5,0.9))" }} />
               <div style={{ position: "absolute", bottom: 44, right: 16, zIndex: 10, textAlign: "right" }}>
                 <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 6vw, 40px)", color: "white", textTransform: "uppercase", lineHeight: 1, textShadow: "2px 2px 0px var(--color-primary)" }}>{name2}</div>
                 <div style={{ fontFamily: "var(--font-display)", fontSize: 14, color: "var(--color-primary)", textTransform: "uppercase" }}>NO. 3 :: 5</div>
               </div>
            </div>

            {/* Absolute positioning overlays */}
            <div style={{ position: "absolute", top: 20, left: "50%", transform: "translateX(-50%)", zIndex: 10 }}>
               <div style={{ background: "var(--color-primary)", padding: "4px 16px", transform: "skewX(-10deg)" }}>
                  <span style={{ display: "block", transform: "skewX(10deg)", color: "white", fontFamily: "var(--font-display)", fontSize: 16, letterSpacing: "1px", textTransform: "uppercase", whiteSpace: "nowrap" }}>PRÓXIMO EVENTO</span>
               </div>
            </div>
            
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 20 }}>
               <div style={{ position: "relative", width: 64, height: 72, background: "var(--color-primary)", clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                 <div style={{ fontFamily: "var(--font-display)", fontSize: 32, color: "white", lineHeight: 1, zIndex: 2, transform: "scale(1.1) translateY(-2px)", letterSpacing: "-1px" }}>VS</div>
                 {/* Inner border hack */}
                 <div style={{ position: "absolute", inset: 4, background: "var(--color-primary)", border: "2px solid white", clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}></div>
               </div>
            </div>

            {/* Date/Location Strip */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(10,10,10,0.9)", padding: "10px", textAlign: "center", borderTop: "2px solid var(--color-primary)", zIndex: 20 }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 12, color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>
                {new Date(nextEvent.date).toLocaleDateString("es-EC", { day: "numeric", month: "short" })} | {nextEvent.city} | COLISEO RUMIÑAHUI
              </span>
            </div>
          </div>

          {/* Action Buttons row */}
          <div style={{ display: "flex", position: "relative", zIndex: 100 }}>
             <button onClick={() => setShowTicketModal(true)} className="animate-jab" style={{ flex: 1, background: "var(--color-primary)", color: "white", padding: "16px 8px", border: "none", fontFamily: "var(--font-display)", fontSize: "clamp(16px, 4vw, 24px)", textTransform: "uppercase", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", borderRight: "4px solid var(--color-text)", lineHeight: 1.1 }}>
               COMPRAR<br/>ENTRADAS
             </button>
             <button className="animate-jab" style={{ flex: 1, background: "var(--neutral-900)", color: "white", padding: "16px", border: "none", fontFamily: "var(--font-display)", fontSize: "clamp(16px, 4vw, 24px)", textTransform: "uppercase", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, cursor: "pointer" }}>
               ▶ VER PPV
             </button>
          </div>
        </div>
        )
      })()}

      {/* ── TICKET MODAL ── */}
      {showTicketModal && nextEvent && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.9)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
           <div className="animate-pulse-glow" style={{ width: "100%", maxWidth: 380, background: "var(--color-bg)", border: "4px solid var(--color-primary)", position: "relative", boxShadow: "10px 10px 0px rgba(255,0,0,0.2)" }}>
             {/* Close btn */}
             <button onClick={() => setShowTicketModal(false)} style={{ position: "absolute", top: 12, right: 12, background: "rgba(0,0,0,0.5)", border: "2px solid white", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 24, cursor: "pointer", zIndex: 10 }}>×</button>

             {/* Ticket Header Graphic */}
             <div style={{ position: "relative", height: 180, overflow: "hidden", borderBottom: "4px dashed var(--color-border)" }}>
               <Image src="/octagon.png" alt="Ticket Bg" fill style={{ objectFit: "cover", opacity: 0.5 }} />
               <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, var(--color-bg), transparent)" }} />
               <div style={{ position: "absolute", bottom: 16, left: 16 }}>
                 <div style={{ fontFamily: "var(--font-display)", fontSize: 12, color: "var(--color-primary)", textTransform: "uppercase", letterSpacing: "2px" }}>ACCESO GENERAL</div>
                 <div style={{ fontFamily: "var(--font-display)", fontSize: 32, color: "white", textTransform: "uppercase", lineHeight: 1 }}>{nextEvent.name}</div>
               </div>
             </div>

             {/* Ticket Info */}
             <div style={{ padding: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
                   <div>
                      <div style={{ fontSize: 10, color: "var(--color-text-muted)", fontFamily: "var(--font-display)", textTransform: "uppercase" }}>FECHA</div>
                      <div style={{ fontSize: 16, fontFamily: "var(--font-display)", color: "white" }}>{new Date(nextEvent.date).toLocaleDateString("es-EC")}</div>
                   </div>
                   <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 10, color: "var(--color-text-muted)", fontFamily: "var(--font-display)", textTransform: "uppercase" }}>SECTOR</div>
                      <div style={{ fontSize: 16, fontFamily: "var(--font-display)", color: "white", textTransform: "uppercase" }}>GENERAL (S1)</div>
                   </div>
                </div>

                {/* Simulated Stripe Input */}
                <div style={{ marginBottom: 8, fontSize: 12, fontFamily: "var(--font-display)", textTransform: "uppercase", color: "var(--color-text-muted)" }}>[ Stripe Mock ] :: DATOS DE PAGO</div>
                <div style={{ border: "2px solid var(--color-border)", padding: 12, display: "flex", flexDirection: "column", gap: 12, marginBottom: 24, background: "var(--neutral-900)" }}>
                   <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--color-border)", paddingBottom: 8 }}>
                      <span style={{ fontFamily: "monospace", color: "white", letterSpacing: "1px" }}>4242 4242 4242 4242</span>
                      <span style={{ fontSize: 16 }}>💳</span>
                   </div>
                   <div style={{ display: "flex", gap: 12 }}>
                      <input type="text" placeholder="MM/AA" readOnly value="12/28" style={{ flex: 1, background: "transparent", border: "none", color: "white", fontFamily: "monospace", outline: "none" }} />
                      <input type="text" placeholder="CVC" readOnly value="123" style={{ width: 60, background: "transparent", border: "none", color: "white", fontFamily: "monospace", outline: "none" }} />
                   </div>
                </div>

                <button onClick={() => { alert('¡Simulación completada! En entorno de prod, irías a Stripe.com'); setShowTicketModal(false); }} className="btn-primary animate-jab" style={{ width: "100%", fontSize: 18, background: "var(--blue-500)", color: "white" }}>
                   PROCESAR $45.00 →
                </button>
             </div>
             
             {/* Barcode bottom */}
             <div style={{ height: 40, background: "white", margin: "0 24px 24px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", opacity: 0.9 }}>
                {Array.from({length: 40}).map((_, i) => (
                   <div key={i} style={{ width: Math.random() * 4 + 1, height: "100%", background: "black", marginRight: Math.random() * 3 }} />
                ))}
             </div>
           </div>
        </div>
      )}

      {/* ── CALENDARIO ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, letterSpacing: "1px", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 8, textShadow: "2px 2px 0px var(--color-primary)" }}>
          CALENDARIO
        </h2>
        <Link href="/events" style={{ fontSize: 12, color: "var(--color-primary)", textDecoration: "none", fontFamily: "var(--font-display)", textTransform: "uppercase", letterSpacing: "1px" }}>VER TODOS →</Link>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
        {events.slice(0, 2).map((event) => (
          <Link key={event.id} href="/events" style={{ textDecoration: "none" }}>
            <div className="hover-lift" style={{ display: "flex", border: "2px solid var(--color-border)", background: "var(--color-surface)", height: 80, alignItems: "stretch" }}>
              {/* Date Box */}
              <div style={{ width: 80, background: "var(--color-primary)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "white", padding: "4px" }}>
                <span style={{ fontSize: 12, fontFamily: "var(--font-display)", textTransform: "uppercase" }}>
                  {new Date(event.date).toLocaleDateString("es-EC", { month: "short" })}
                </span>
                <span style={{ fontSize: 32, fontFamily: "var(--font-display)", lineHeight: 1 }}>
                  {new Date(event.date).getDate()}
                </span>
              </div>
              {/* Info Box */}
              <div style={{ flex: 1, padding: "12px 16px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 18, textTransform: "uppercase", color: "white" }}>{event.name}</span>
                  <span style={{ color: "var(--color-primary)", fontSize: 10, fontFamily: "var(--font-display)", border: "1px solid var(--color-primary)", padding: "2px 6px", textTransform: "uppercase" }}>{event.status === "upcoming" ? "REGULAR" : "PASADO"}</span>
                </div>
                <div style={{ fontSize: 12, color: "var(--color-text-muted)", fontFamily: "var(--font-body)", fontWeight: 600, textTransform: "uppercase" }}>
                  {event.city} - ARENA PRINCIPAL
                </div>
              </div>
              <div style={{ width: 40, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-text-muted)", background: "var(--neutral-900)", borderLeft: "2px solid var(--color-border)" }}>
                ›
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* ── Featured Gyms ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, letterSpacing: "1px", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 8 }}>
          <Image src="/icon_stadium.png" alt="Gym" width={24} height={24} /> GIMNASIOS DESTACADOS
        </h2>
        <Link href="/gyms" style={{ fontSize: 14, color: "var(--color-primary)", textDecoration: "none", fontFamily: "var(--font-display)", textTransform: "uppercase", letterSpacing: "1px" }}>Ver →</Link>
      </div>
      <div style={{ display: "flex", gap: 16, overflowX: "auto", marginBottom: 32, paddingBottom: 16, scrollbarWidth: "none" }}>
        {featuredGyms.map(gym => {
          return (
            <Link key={gym.id} href={`/gyms/${gym.id}`} style={{ textDecoration: "none", flexShrink: 0 }}>
              <div style={{ width: 220, padding: "20px", background: "var(--color-surface)", border: "4px solid var(--color-text)", boxShadow: "4px 4px 0px rgba(255,255,255,0.15)" }}>
                <div style={{
                  width: 50, height: 50, marginBottom: 12,
                  background: "black", position: "relative", overflow: "hidden",
                  border: "3px solid var(--color-primary)",
                }}>
                   <Image src="/logo.png" alt="Gym" fill style={{ objectFit: "contain", padding: 4 }} />
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 20, marginBottom: 4, lineHeight: 1.1, textTransform: "uppercase" }}>{gym.name}</div>
                <div style={{ fontSize: 11, color: "var(--color-text-muted)", marginBottom: 12, fontFamily: "var(--font-body)", fontWeight: 700, textTransform: "uppercase" }}>Ubicación: {gym.city}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "2px solid var(--color-border)", paddingTop: 8 }}>
                  <span style={{ fontSize: 12, color: "var(--record-win)", fontFamily: "var(--font-display)", textTransform: "uppercase" }}>{gym.activeFighters} PELEADORES</span>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 16, color: "var(--color-primary)" }}>★ {gym.reputationScore}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* ── Quick access ── */}
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 16 }}>NAVEGACIÓN</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 40 }}>
        {[
          { href: "/fighters",    icon: "/icon_glove.png", label: "Peleadores", sub: `${fighters.length} activos` },
          { href: "/gyms",        icon: "/icon_stadium.png", label: "Gimnasios",  sub: `${gyms.length} registrados` },
          { href: "/events",      icon: "/icon_stadium.png", label: "Eventos",    sub: "Próximos choques" },
          { href: "/communities", icon: "/icon_fire.png", label: "Comunidades", sub: "Ligas de combate" },
        ].map(({ href, icon, label, sub }) => (
          <Link key={href} href={href} style={{ textDecoration: "none" }}>
            <div style={{ padding: "16px", background: "var(--color-surface)", border: "2px solid var(--color-border)", display: "flex", flexDirection: "column", alignItems: "center", gap: 12, transition: "background 0.2s" }} onMouseOver={e => e.currentTarget.style.borderColor="var(--color-primary)"} onMouseOut={e => e.currentTarget.style.borderColor="var(--color-border)"}>
              <Image src={icon} width={40} height={40} alt={label} style={{ filter: "grayscale(100%) contrast(200%)" }} />
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 20, textTransform: "uppercase" }}>{label}</div>
                <div style={{ fontSize: 11, color: "var(--color-text-muted)", fontFamily: "var(--font-body)", fontWeight: 700, textTransform: "uppercase" }}>{sub}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* ── Rankings ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, letterSpacing: "1px", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 8 }}>
          <Image src="/icon_fire.png" alt="Fire" width={24} height={24} /> EL TOP NACIONAL
        </h2>
        <Link href="/rankings" style={{ fontSize: 14, color: "var(--color-primary)", textDecoration: "none", fontFamily: "var(--font-display)", textTransform: "uppercase", letterSpacing: "1px" }}>Ver →</Link>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 }}>
        {top3.map((f, idx) => {
          const isFirst = idx === 0;
          return (
            <Link key={f.id} href={`/fighters/${f.id}`} style={{ textDecoration: "none" }}>
              <div style={{
                position: "relative", overflow: "hidden",
                padding: "20px",
                background: isFirst ? "var(--neutral-900)" : "var(--color-surface)",
                border: isFirst ? "4px solid var(--color-primary)" : "4px solid var(--color-text)",
                boxShadow: isFirst ? "6px 6px 0px rgba(208,0,0,0.4)" : "none",
                display: "flex", gap: 16, alignItems: "center",
              }}>
                <div style={{ position: "absolute", right: -20, top: "50%", transform: "translateY(-50%)", fontFamily: "var(--font-display)", opacity: 0.05, fontSize: 160, lineHeight: 1, color: "white", userSelect: "none" }}>#{f.rank}</div>
                
                <div style={{ position: "absolute", top: 0, left: 0, background: isFirst ? "var(--color-primary)" : "var(--color-text)", color: isFirst ? "white" : "var(--color-bg)", fontFamily: "var(--font-display)", fontSize: 18, padding: "4px 12px", borderBottomRightRadius: 4 }}>
                  #{f.rank}
                </div>
                
                <div style={{ width: 60, height: 60, background: "var(--neutral-900)", border: "2px solid var(--color-primary)", position: "relative", overflow: "hidden", marginTop: 12 }}>
                  <Image src="/fighter-silhouette.png" alt="Fighter" fill style={{ objectFit: "cover" }} />
                </div>
                
                <div style={{ flex: 1, zIndex: 2, marginTop: 12 }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 24, lineHeight: 1, textTransform: "uppercase", marginBottom: 6 }}>
                    {f.name} {f.nickname && <span style={{ color: "var(--color-primary)" }}>"{f.nickname}"</span>}
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", fontFamily: "var(--font-display)", fontSize: 14 }}>
                    <span style={{ color: "var(--color-text-muted)" }}>{f.weightClass}</span>
                    <span style={{ color: styleColors[f.style] || "white" }}>// {f.style}</span>
                  </div>
                </div>
                
                <div style={{ fontFamily: "var(--font-display)", fontSize: 28, textTransform: "uppercase", zIndex: 2, textAlign: "right" }}>
                  <span style={{ color: "var(--record-win)" }}>{f.proRecord.w}</span>
                  <span style={{ color: "var(--color-text-muted)", margin: "0 4px" }}>:</span>
                  <span style={{ color: "var(--record-loss)" }}>{f.proRecord.l}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
