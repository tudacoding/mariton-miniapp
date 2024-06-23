import useAutomationMining from "@/hooks/useAutomationMining";
import btnMaritonTK from "@/assets/air/mariton-tk-ico.png";

export default function MiningTokenCount() {
  const { amount } = useAutomationMining();

  return (
    <p className="flex flex-row justify-center gap-1 pb-2">
      <span className="font-bold text-2xl text-t-button">{amount}</span>
      <img src={btnMaritonTK} alt="" className="object-contain" />
    </p>
  );
}
