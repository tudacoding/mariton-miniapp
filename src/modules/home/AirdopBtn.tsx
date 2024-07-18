import logoHouse from "@/assets/air/namdvfix.gif";
import BaseImage from "@/components/BaseImage";
import { useNavigate } from "react-router-dom";
import box from "@/assets/game/box.png";
import { useDispatch } from "react-redux";
import { Dispatch } from "@/store/store";

const AirdopBtn = () => {
  const navigate = useNavigate();
  const { actionsStore } = useDispatch<Dispatch>();
  return (
    <div
      onClick={async () => {
        actionsStore.openSplashPopup();
        setTimeout(() => {
          navigate("/airdrop-home");
        }, 500);
      }}
      className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center bottom-[10px]"
    >
      <BaseImage width={"70%"} src={logoHouse} alt="box" />
      <BaseImage width={"40%"} src={box} alt="box" className="pt-12" />
    </div>
  );
};

export default AirdopBtn;
