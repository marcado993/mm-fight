"use client";
import { notFound, useParams } from "next/navigation";
import BottomNav from "@/components/BottomNav";
import TopBar from "@/components/TopBar";
import { fighters } from "@/lib/data";
import FighterProfile from "@/components/FighterProfile";

export default function FighterDetailPage() {
  const params = useParams<{ id: string }>();
  
  if (!params?.id) return null;
  
  const fighter = fighters.find((f) => f.id === params.id);
  if (!fighter) notFound();

  return (
    <div style={{ background: "var(--color-bg)", minHeight: "100dvh" }}>
      <TopBar backHref="/fighters" />
      <FighterProfile fighter={fighter} />
      <BottomNav />
    </div>
  );
}
