"use client";
import { notFound, useParams } from "next/navigation";
import BottomNav from "@/components/BottomNav";
import TopBar from "@/components/TopBar";
import { gyms } from "@/lib/data";
import GymProfile from "@/components/GymProfile";

export default function GymDetailPage() {
  const params = useParams<{ id: string }>();
  
  if (!params?.id) return null;
  
  const gym = gyms.find((g) => g.id === params.id);
  if (!gym) notFound();

  return (
    <div style={{ background: "var(--color-bg)", minHeight: "100dvh" }}>
      <TopBar backHref="/gyms" />
      <GymProfile gym={gym} />
      <BottomNav />
    </div>
  );
}
