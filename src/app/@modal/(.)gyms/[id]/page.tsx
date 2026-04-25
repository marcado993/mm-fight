import { notFound } from "next/navigation";
import { gyms } from "@/lib/data";
import BrutalistModal from "@/components/BrutalistModal";
import GymProfile from "@/components/GymProfile";

export default async function GymIntercept({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const gym = gyms.find((g) => g.id === resolvedParams.id);
  if (!gym) notFound();

  return (
    <BrutalistModal>
      <GymProfile gym={gym} />
    </BrutalistModal>
  );
}
