import walletButton from "@/assets/game/wallet-button.png";
import addButton from "@/assets/game/add-button.png";
import BaseImage from "@/components/BaseImage";

const AirdropActionBar = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`top-0 z-20 font-bold flex justify-between py-4` + className}>
      <div className="flex justify-start items-center">
        <BaseImage width={"80%"} src={addButton} alt="add-button" />
      </div>
      <div className="flex items-center justify-end">
        <BaseImage width={"80%"} src={walletButton} alt="wallet-button" />
      </div>
    </div>
  );
};

export default AirdropActionBar;
