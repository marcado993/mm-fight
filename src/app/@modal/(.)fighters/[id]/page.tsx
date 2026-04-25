import { notFound } from "next/navigation";
import { fighters } from "@/lib/data";
import BrutalistModal from "@/components/BrutalistModal";
import FighterProfile from "@/components/FighterProfile";

export default async function FighterIntercept({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const fighter = fighters.find((f) => f.id === resolvedParams.id);
  if (!fighter) notFound();

  return (
    <BrutalistModal>
      <FighterProfile fighter={fighter} />
    </BrutalistModal>
  );
}
