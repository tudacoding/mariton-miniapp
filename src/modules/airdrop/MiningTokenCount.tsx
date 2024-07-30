import useAutomationMining from "@/hooks/useAutomationMining";
import MaritonToken from "@/assets/icons/MaritonToken";

export default function MiningTokenCount() {
  const { amount } = useAutomationMining();

  return (
    <div className="flex flex-row justify-center gap-1 pb-2 items-center">
      <span className="font-bold text-2xl text-t-button">{amount}</span>
      <MaritonToken />
    </div>
  );
}
