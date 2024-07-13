import walletButton from "@/assets/game/wallet-button.png";
import backButton from "@/assets/game/back-button-appbar.png";
import BaseImage from "@/components/BaseImage";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useNavigate } from "react-router-dom";

const AirdropActionBar = ({ className = "" }: { className?: string }) => {
  const { mining } = useSelector((s: RootState) => s.miningStore);
  const nav = useNavigate();

  return (
    <div
      className={`top-0 z-20 font-bold flex justify-between py-2` + className}
    >
      <div className="flex justify-start items-center">
        <BaseImage width={"80%"} src={backButton} alt="add-button" path="/" />
      </div>
      <div
        className="flex items-center justify-end relative"
        onClick={() => {
          nav("/wallet");
        }}
      >
        <BaseImage width={"80%"} src={walletButton} alt="wallet-button" />
        <div className="absolute w-4/5 px-3">
          <span>{(mining?.totalMinedTokens ?? 0).toFixed(3)}</span>
        </div>
      </div>
    </div>
  );
};

export default AirdropActionBar;
