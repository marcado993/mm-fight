"use client";
import Link from "next/link";
import Image from "next/image";
import { fighters, gyms } from "@/lib/data";

export default function LandingPage() {
  const top3 = fighters.filter(f => f.level === "Pro").sort((a,b) => a.rank - b.rank).slice(0, 3);

  return (
    <div style={{ background: "var(--color-bg)", minHeight: "100dvh", overflowX: "hidden", position: "relative" }}>

      {/* ── BRUTALIST NAV ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px clamp(20px, 5vw, 60px)",
        background: "var(--color-bg)",
        borderBottom: "4px solid var(--color-primary)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
          <span style={{ fontFamily: "var(--font-display)", fontSize: 24, letterSpacing: "1px", textTransform: "uppercase" }}>
            MMA<span style={{ color: "var(--color-primary)" }}>EC</span>
          </span>
        </div>
        
        {/* CENTER LINKS */}
        <div className="hidden md:flex items-center gap-10">
          <a href="#podio-absoluto" className="hover-lift" style={{ color: "var(--color-text)", textDecoration: "none", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 24, textTransform: "uppercase", letterSpacing: "1px" }}>TOP NACIONAL</a>
          <a href="#elige-tu-camino" className="hover-lift" style={{ color: "var(--color-text)", textDecoration: "none", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 24, textTransform: "uppercase", letterSpacing: "1px" }}>CUENTAS</a>
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Link href="/login" style={{ textDecoration: "none" }}>
            <button style={{ 
              fontFamily: "var(--font-display)", fontSize: 16, letterSpacing: "1px",
              padding: "10px 24px", background: "transparent", color: "var(--color-text)",
              border: "2px solid var(--color-border)", textTransform: "uppercase", cursor: "pointer"
            }}>ENTRAR</button>
          </Link>
          <Link href="/register" style={{ textDecoration: "none" }}>
            <button style={{ 
              fontFamily: "var(--font-display)", fontSize: 16, letterSpacing: "1px",
              padding: "10px 24px", background: "var(--color-primary)", color: "white",
              border: "2px solid var(--color-primary)", textTransform: "uppercase", cursor: "pointer"
            }}>UNIRSE</button>
          </Link>
        </div>
      </nav>

      {/* ── HERO: TINDER FOR FIGHTERS ── */}
      <section style={{
        position: "relative",
        minHeight: "85vh",
        display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap-reverse", gap: 60,
        padding: "60px clamp(20px, 5vw, 80px)",
        overflow: "hidden"
      }}>
        {/* Responsive Hero Background Layer */}
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, opacity: 0.25, pointerEvents: "none" }}>
          <Image src="/boxing_gloves_hero_1777139742742.png" alt="Hero Gloves" fill style={{ objectFit: "cover", objectPosition: "center" }} priority />
          <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "linear-gradient(to bottom, var(--color-bg) 0%, transparent 60%, var(--color-bg) 100%)" }} />
          <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "radial-gradient(circle at center, transparent 30%, var(--color-bg) 100%)" }} />
        </div>
        {/* Left: Huge Brutalist Text */}
        <div className="animate-pulse-slow" style={{ flex: "1 1 500px", zIndex: 10 }}>
          <div style={{ display: "inline-block", background: "var(--color-text)", color: "var(--color-bg)", padding: "4px 12px", fontFamily: "var(--font-display)", fontSize: 20, letterSpacing: "2px", transform: "skewX(-10deg)", marginBottom: 20 }}>
            <span style={{ transform: "skewX(10deg)", display: "block" }}>LA CALLE ES DIGITAL</span>
          </div>
          <h1 style={{ 
            fontFamily: "var(--font-display)", fontSize: "clamp(60px, 12vw, 130px)", 
            lineHeight: 0.85, letterSpacing: "2px", textTransform: "uppercase",
            textShadow: "4px 4px 0px var(--color-primary)",
            marginBottom: 20,
          }}>
            MATCH.<br/>PELEA.<br/><span style={{ color: "var(--color-primary)", textShadow: "none" }}>GANA.</span>
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "clamp(16px, 2vw, 22px)", color: "var(--color-text-muted)", maxWidth: 500, marginBottom: 40, borderLeft: "4px solid var(--color-primary)", paddingLeft: 16 }}>
            El ecosistema definitivo del MMA ecuatoriano. Gimnasios buscan rivales. Peleadores construyen su legado. Desliza, encuentra a tu próximo oponente y entra a la jaula.
          </p>
          <Link href="/register" style={{ textDecoration: "none", zIndex: 10, position: "relative" }}>
            <button className="animate-jab" style={{ 
              fontFamily: "var(--font-display)", fontSize: 24, letterSpacing: "2px",
              padding: "20px 48px", background: "var(--color-primary)", color: "white",
              border: "none", textTransform: "uppercase", cursor: "pointer",
              boxShadow: "8px 8px 0px var(--color-text)",
              clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)",
            }}>
              BUSCAR OPONENTE
            </button>
          </Link>
        </div>

        {/* Right: Mock "Tinder" UI Stack */}
        <div className="animate-bob-weave" style={{ flex: "1 1 400px", position: "relative", minHeight: 500, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}>
          {/* Card Back */}
          <div style={{
            position: "absolute", width: "100%", maxWidth: 360, height: 500,
            background: "var(--color-surface)", border: "4px solid var(--neutral-600)",
            transform: "rotate(6deg) translate(20px, 10px)",
            opacity: 0.5,
          }}></div>
          {/* Card Middle */}
          <div style={{
            position: "absolute", width: "100%", maxWidth: 360, height: 500,
            background: "var(--color-surface-raised)", border: "4px solid var(--neutral-500)",
            transform: "rotate(-4deg) translate(-20px, 5px)",
            opacity: 0.8,
          }}></div>
          {/* Card Front (Actual Fighter) */}
          <div style={{
            position: "absolute", width: "100%", maxWidth: 360, height: 500,
            background: "var(--color-bg)", border: "4px solid var(--color-primary)",
            zIndex: 10, display: "flex", flexDirection: "column",
            boxShadow: "-12px 12px 0px rgba(208, 0, 0, 0.4)",
          }}>
            <div style={{ flex: 1, position: "relative", background: "var(--neutral-900)", overflow: "hidden" }}>
               <Image src="/fighter-silhouette.png" alt="Fighter" fill style={{ objectFit: "cover", opacity: 0.8 }} />
               <div style={{ position: "absolute", top: 16, right: 16, background: "var(--color-primary)", color: "white", padding: "4px 12px", fontFamily: "var(--font-display)", fontSize: 18, transform: "rotate(10deg)" }}>
                 NUEVO RETO
               </div>
            </div>
            <div style={{ padding: 24, borderTop: "4px solid var(--color-primary)", background: "var(--color-surface)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 12 }}>
                <div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 32, lineHeight: 1, textTransform: "uppercase" }}>EL DESTRUCTOR</h3>
                  <div style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-display)", fontSize: 18 }}>GUAYAS · 77KG</div>
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 32, color: "var(--color-success)" }}>12-1</div>
              </div>
               <div style={{ display: "flex", gap: 12 }}>
                 <button style={{ flex: 1, padding: "16px", background: "transparent", border: "4px solid var(--color-text-muted)", color: "var(--color-text-muted)", fontFamily: "var(--font-display)", fontSize: 24, cursor: "pointer" }}>✕ IGNORAR</button>
                 <button style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "16px", background: "var(--color-primary)", border: "4px solid var(--color-primary)", color: "white", fontFamily: "var(--font-display)", fontSize: 24, cursor: "pointer" }}>
                   <Image src="/icon_swords.png" width={24} height={24} alt="Aceptar" /> ACEPTAR
                 </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SCROLLING MARQUEE ── */}
      <div style={{ 
        background: "var(--color-primary)", color: "var(--neutral-950)", 
        padding: "16px 0", overflow: "hidden", whiteSpace: "nowrap",
        borderTop: "4px solid var(--color-text)", borderBottom: "4px solid var(--color-text)",
        fontFamily: "var(--font-display)", fontSize: 32, letterSpacing: "2px",
      }}>
        <div className="animate-marquee-right" style={{ gap: 40 }}>
          <span>▰ NO HUYAS DEL COMBATE ▰ RETA A OTROS GIMNASIOS ▰ DEMUESTRA QUIÉN MANDA ▰ VERIFICA TU RÉCORD ▰ SANGRE Y SUDOR ▰</span>
          <span>NO HUYAS DEL COMBATE ▰ RETA A OTROS GIMNASIOS ▰ DEMUESTRA QUIÉN MANDA ▰ VERIFICA TU RÉCORD ▰ SANGRE Y SUDOR ▰</span>
          <span>NO HUYAS DEL COMBATE ▰ RETA A OTROS GIMNASIOS ▰ DEMUESTRA QUIÉN MANDA ▰ VERIFICA TU RÉCORD ▰ SANGRE Y SUDOR ▰</span>
          <span>NO HUYAS DEL COMBATE ▰ RETA A OTROS GIMNASIOS ▰ DEMUESTRA QUIÉN MANDA ▰ VERIFICA TU RÉCORD ▰ SANGRE Y SUDOR ▰</span>
        </div>
      </div>

      {/* ── TOP FIGHTERS GRID - BRUTALIST PODIUM ── */}
      <section id="podio-absoluto" style={{ 
        padding: "100px clamp(20px, 5vw, 80px)", position: "relative", overflow: "hidden",
        borderTop: "4px solid var(--color-primary)", borderBottom: "4px solid var(--color-text)" 
      }}>
        {/* Arena Background */}
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, opacity: 0.15, pointerEvents: "none" }}>
          <Image src="/octagon_aerial_1777139798761.png" alt="Arena Background" fill style={{ objectFit: "cover", objectPosition: "center" }} />
          <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "linear-gradient(to top, var(--color-bg) 0%, transparent 50%, var(--color-bg) 100%)" }} />
        </div>

        <div style={{ position: "relative", zIndex: 10 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px, 8vw, 80px)", textTransform: "uppercase", textAlign: "center", marginBottom: 80, textShadow: "4px 4px 0 var(--color-primary)" }}>
            EL PODIO ABSOLUTO
          </h2>
        
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "flex-end", gap: 24, minHeight: 450 }}>
          {[
            { f: top3[2], height: 280, flex: 1, type: "left" },
            { f: top3[0], height: 420, flex: 1.2, type: "center" },
            { f: top3[1], height: 350, flex: 1, type: "right" }
          ].map(({ f, height, flex, type }) => {
            if (!f) return null;
            const isCenter = type === "center";
            return (
              <div key={f.id} className="hover-lift" style={{ 
                height: height,
                display: "flex", flexDirection: "column", justifyContent: "flex-start",
                background: isCenter ? "var(--neutral-900)" : "var(--color-surface)", 
                border: isCenter ? "6px solid var(--color-primary)" : "4px solid var(--color-text)",
                padding: "50px 24px 24px", position: "relative",
                boxShadow: isCenter ? "8px 8px 0px rgba(208,0,0,0.4)" : "6px 6px 0px var(--color-primary)",
                flex: "1 1 280px", maxWidth: isCenter ? 400 : 340,
                marginTop: isCenter ? 0 : 40 // Push sides down on mobile wrapping
              }}>
                <div style={{ position: "absolute", top: -30, left: "50%", transform: "translateX(-50%)", background: isCenter ? "var(--color-primary)" : "var(--color-text)", color: isCenter ? "white" : "var(--color-bg)", fontFamily: "var(--font-display)", fontSize: 44, padding: "4px 24px", border: "4px solid var(--color-bg)", zIndex: 10, lineHeight: 1 }}>
                  #{f.rank}
                </div>
                
                <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                   <div style={{ fontFamily: "var(--font-display)", fontSize: isCenter ? 42 : 32, textTransform: "uppercase", lineHeight: 1.1, color: isCenter ? "white" : "var(--color-text)" }}>{f.name}</div>
                   {f.nickname && <div style={{ fontSize: isCenter ? 24 : 18, fontFamily: "var(--font-display)", color: "var(--color-primary)", marginTop: 8 }}>"{f.nickname}"</div>}
                </div>
                
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24, borderTop: isCenter ? "4px solid rgba(255,255,255,0.1)" : "4px solid var(--neutral-700)", paddingTop: 16 }}>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: 11, color: "var(--color-text-muted)", fontFamily: "var(--font-display)", textTransform: "uppercase" }}>GIMNASIO</div>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: 16, color: isCenter ? "white" : "var(--color-text)", textTransform: "uppercase", paddingTop: 4 }}>{f.gym}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 11, color: "var(--color-text-muted)", fontFamily: "var(--font-display)", textTransform: "uppercase" }}>RÉCORD</div>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: 32, color: "var(--color-success)", lineHeight: 1 }}>{f.proRecord.w}-{f.proRecord.l}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        </div> {/* End zIndex 10 container */}
      </section>

      {/* ── ROLE SELECTOR BRUTALIST ── */}
      <section id="elige-tu-camino" style={{ 
        padding: "60px clamp(20px, 5vw, 80px) 120px", 
        position: "relative",
        background: "url(/role-selector.png) center center / cover no-repeat", 
        borderTop: "4px solid var(--color-primary)" 
      }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,10,10,0.9)", zIndex: 0 }} />
        <div style={{ position: "relative", zIndex: 10 }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px, 6vw, 64px)", textTransform: "uppercase", marginBottom: 40 }}>ELIGE TU CAMINO</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>
          {[
            { id: "FAN", title: "FANÁTICO", desc: "Sigue los rankings, busca peleadores y no te pierdas un solo evento.", img: "/icon_stadium.png" },
            { id: "FIGHTER", title: "PELEADOR", desc: "Verificación de cédula obligatoria. Tu récord, tus estadísticas, tu guerra.", img: "/icon_glove.png" },
            { id: "GYM", title: "GIMNASIO", desc: "El único con el poder de oficializar peleas y retar a otros establos.", img: "/icon_swords.png" },
          ].map(r => (
            <div key={r.id} style={{ 
              border: "4px solid var(--color-border)", padding: "40px",
              display: "flex", flexDirection: "column", gap: 20, 
              transition: "border-color 0.2s, background 0.2s",
              cursor: "pointer"
            }} onMouseOver={e => { e.currentTarget.style.borderColor = "var(--color-primary)"; e.currentTarget.style.background = "var(--neutral-800)"; }}
               onMouseOut={e => { e.currentTarget.style.borderColor = "var(--color-border)"; e.currentTarget.style.background = "transparent"; }}
            >
              <Image src={r.img} alt={r.title} width={64} height={64} style={{ filter: "grayscale(100%) contrast(200%)" }} />
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 36, letterSpacing: "1px" }}>{r.title}</h3>
                <p style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 16, color: "var(--color-text-muted)" }}>{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Additional info / terms */}
        <div style={{ display: "flex", gap: 24, marginTop: 40, fontFamily: "var(--font-display)", textTransform: "uppercase", fontSize: 13, color: "var(--color-text-muted)" }}>
          <span>POLÍTICAS DE PRIVACIDAD</span>
          <span>TÉRMINOS DE SERVICIO</span>
        </div>
        </div>
      </section>
      
      {/* ── ULTRA BRUTAL FOOTER ── */}
      <footer style={{ background: "var(--color-text)", color: "var(--color-bg)", padding: "80px clamp(20px, 5vw, 80px)", borderTop: "8px solid var(--color-primary)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 40 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(60px, 10vw, 120px)", lineHeight: 0.8, letterSpacing: "-2px" }}>
            MMA<br/><span style={{ color: "var(--color-primary)" }}>ECUADOR</span>
          </h2>
          <div style={{ display: "flex", gap: 32, fontFamily: "var(--font-display)", fontSize: 24, textTransform: "uppercase" }}>
             <Link href="/login" style={{ color: "var(--color-bg)", textDecoration: "underline" }}>ENTRAR</Link>
             <Link href="/register" style={{ color: "var(--color-bg)", textDecoration: "underline" }}>REGISTRARSE</Link>
          </div>
        </div>
        <div style={{ marginTop: 80, borderTop: "4px solid var(--color-bg)", paddingTop: 20, fontFamily: "var(--font-display)", fontSize: 16, textTransform: "uppercase" }}>
          © 2026. LUCHA POR TU HONOR.
        </div>
      </footer>
    </div>
  );
}
