"use client";
import React, { useState, useEffect, useRef } from "react";
import AppShell from "@/components/AppShell";
import { useAuth } from "@/lib/auth";
import Image from "next/image";

interface Comment {
  id: string;
  authorName: string;
  authorRole: string;
  content: string;
  timestamp: string;
  likes: number;
}

const initialComments: Comment[] = [
  {
    id: "c1",
    authorName: "Kevin 'El Loco' Rojas",
    authorRole: "Fighter",
    content: "¡Alguien para guantear este viernes en la noche? Preferiblemente peso ligero, vamos a sumar rounds pesados. 🥊🔥",
    timestamp: "Hace 2 horas",
    likes: 14,
  },
  {
    id: "c2",
    authorName: "Team Oyama",
    authorRole: "Gym",
    content: "Acabamos de subir los horarios de lucha olímpica para este fin de mes. Todos los cinturones son bienvenidos a la colisión.",
    timestamp: "Hace 5 horas",
    likes: 32,
  },
  {
    id: "c3",
    authorName: "Carlos 'La Sombra' Viteri",
    authorRole: "Fighter",
    content: "Las tarjetas de los jueces de ayer fueron un robo. Si ganas corriendo tres rounds completos, no eres un peleador. Hay niveles.",
    timestamp: "Ayer",
    likes: 89,
  }
];

export default function CommunitiesPage() {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const roleColors: Record<string, string> = { "Fan": "var(--blue-500)", "Fighter": "var(--color-primary)", "Gym": "var(--orange-500)" };

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;
    
    const roleLabel = user.role === "fighter" ? "Fighter" : user.role === "gym" ? "Gym" : "Fan";
    
    const comment: Comment = {
      id: Date.now().toString(),
      authorName: user.name,
      authorRole: roleLabel,
      content: newComment,
      timestamp: "Justo ahora",
      likes: 0,
    };
    
    setComments([comment, ...comments]);
    setNewComment("");
  };

  return (
    <AppShell role={user?.role || "normal"}>
      <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 70px)", background: "transparent" }}>
        
        {/* Header */}
        <header style={{ padding: "20px clamp(16px, 4vw, 32px)", borderBottom: "4px solid var(--color-primary)", background: "var(--color-surface)", display: "flex", alignItems: "center", gap: 16 }}>
           <div style={{ width: 48, height: 48, background: "var(--neutral-900)", border: "2px solid var(--color-primary)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontSize: 24, color: "var(--color-primary)" }}>
             🗣️
           </div>
           <div>
             <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 5vw, 36px)", textTransform: "uppercase", letterSpacing: "1px", lineHeight: 1 }}>Fosa Común</h1>
             <p style={{ fontSize: 13, color: "var(--color-text-muted)", fontFamily: "var(--font-display)", textTransform: "uppercase" }}>LA RED CERO FILTROS DEL MMA ECUATORIANO</p>
           </div>
        </header>

        {/* Input Box for making Comments */}
        <div style={{ padding: "20px clamp(16px, 4vw, 32px)", background: "var(--neutral-900)", borderBottom: "1px solid var(--color-border)" }}>
          <form onSubmit={handlePost} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
            <div style={{
              width: 50, height: 50, flexShrink: 0, position: "relative", overflow: "hidden",
              border: `2px solid var(--color-primary)`, background: "var(--neutral-800)"
            }}>
              <Image src="/fighter-silhouette.png" alt="Avatar" fill style={{ objectFit: "cover" }} />
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
              <textarea 
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                placeholder="Dispara un comentario al mundo..."
                style={{ 
                  width: "100%", minHeight: 80, padding: 12, background: "var(--color-bg)", border: "2px solid var(--color-border)",
                  color: "white", fontFamily: "var(--font-body)", fontSize: 14, resize: "none", outline: "none",
                }}
                onFocus={(e) => e.target.style.borderColor = "var(--color-primary)"}
                onBlur={(e) => e.target.style.borderColor = "var(--color-border)"}
              />
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button type="submit" disabled={!newComment.trim()} className="btn-primary" style={{ padding: "8px 24px", opacity: newComment.trim() ? 1 : 0.5 }}>
                  ENVIAR MENSAJE
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Board / Feed */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px clamp(16px, 4vw, 32px)", display: "flex", flexDirection: "column", gap: 20 }}>
          {comments.map((comment) => (
            <div key={comment.id} style={{ display: "flex", gap: 16 }}>
              <div style={{
                width: 48, height: 48, flexShrink: 0, position: "relative", overflow: "hidden",
                border: `2px solid ${roleColors[comment.authorRole] || "var(--color-border)"}`, background: "var(--neutral-900)"
              }}>
                <Image src="/fighter-silhouette.png" alt="Avatar" fill style={{ objectFit: "cover" }} />
              </div>
              <div style={{ flex: 1, background: "rgba(10,10,10,0.6)", padding: "16px", border: "1px solid var(--color-border)", borderLeft: `6px solid ${roleColors[comment.authorRole] || "var(--color-border)"}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <div>
                    <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 16, textTransform: "uppercase" }}>{comment.authorName}</span>
                    <span style={{ marginLeft: 8, fontSize: 10, padding: "2px 6px", background: roleColors[comment.authorRole] || "var(--color-border)", color: "white", fontFamily: "var(--font-display)", textTransform: "uppercase", letterSpacing: "1px" }}>
                      {comment.authorRole}
                    </span>
                  </div>
                  <span style={{ fontSize: 11, color: "var(--color-text-muted)" }}>{comment.timestamp}</span>
                </div>
                <p style={{ fontSize: 14, color: "var(--neutral-100)", lineHeight: 1.5, marginBottom: 16 }}>
                  {comment.content}
                </p>
                <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                  <button style={{ background: "transparent", border: "none", color: "var(--color-text-muted)", display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700 }} onMouseOver={e => e.currentTarget.style.color="var(--color-primary)"} onMouseOut={e => e.currentTarget.style.color="var(--color-text-muted)"}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg> {comment.likes}
                  </button>
                  <button style={{ background: "transparent", border: "none", color: "var(--color-text-muted)", display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700 }} onMouseOver={e => e.currentTarget.style.color="white"} onMouseOut={e => e.currentTarget.style.color="var(--color-text-muted)"}>
                    RESPUESTA
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </AppShell>
  );
}
