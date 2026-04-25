import { notFound } from "next/navigation";
import { fighters } from "@/lib/data";
import BrutalistModal from "@/components/BrutalistModal";
import FighterProfile from "@/components/FighterProfile";

export default function FighterIntercept({ params }: { params: { id: string } }) {
  const fighter = fighters.find((f) => f.id === params.id);
  if (!fighter) notFound();

  return (
    <BrutalistModal>
      <FighterProfile fighter={fighter} />
    </BrutalistModal>
  );
}
