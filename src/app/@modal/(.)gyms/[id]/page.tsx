import { notFound } from "next/navigation";
import { gyms } from "@/lib/data";
import BrutalistModal from "@/components/BrutalistModal";
import GymProfile from "@/components/GymProfile";

export default function GymIntercept({ params }: { params: { id: string } }) {
  const gym = gyms.find((g) => g.id === params.id);
  if (!gym) notFound();

  return (
    <BrutalistModal>
      <GymProfile gym={gym} />
    </BrutalistModal>
  );
}
