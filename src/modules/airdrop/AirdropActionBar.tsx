// import backButton from "@/assets/game/back-button-appbar.png";
import mrtTokenBar from "@/assets/images/mrt-token-bar.png";
import tonTokenBar from "@/assets/images/ton-token-bar.png";
import BaseImage from "@/components/BaseImage";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useNavigate } from "react-router-dom";

const AirdropActionBar = ({ className = "" }: { className?: string }) => {
  const { tokensWallet } = useSelector((s: RootState) => s.accountStore);
  const nav = useNavigate();

  return (
    <div
      className={
        `top-0 z-20 font-bold flex justify-between py-2 gap-8` + className
      }
    >
      <div
        className="relative w-fit cursor-pointer"
        onClick={() => {
          nav("/wallet-ton");
        }}
      >
        <BaseImage
          className="w-[150px] h-auto"
          src={tonTokenBar}
          alt="mrt-token-bar"
        />
        <div className="absolute w-full h-full top-0 py-[10px] pl-[50px]">
          <span className="text-t-title">
            {(tokensWallet?.tonTokens ?? 0).toFixed(3)}
          </span>
        </div>
      </div>
      <div
        className="relative w-fit cursor-pointer"
        onClick={() => {
          nav("/wallet-mrt");
        }}
      >
        <BaseImage
          className="w-[150px] h-auto"
          src={mrtTokenBar}
          alt="mrt-token-bar"
        />
        <div className="absolute w-full h-full top-0 py-[10px] pl-[50px]">
          <span className="text-t-title">
            {(tokensWallet?.mrtTokens ?? 0).toFixed(3)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AirdropActionBar;
