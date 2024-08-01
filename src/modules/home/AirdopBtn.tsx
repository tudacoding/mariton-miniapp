import logoHouse from "@/assets/air/namdvfix.gif";
import Mining from "@/assets/air/mining.png";
import BaseImage from "@/components/BaseImage";
import { useNavigate } from "react-router-dom";
import box from "@/assets/game/box.png";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "@/store/store";

const AirdopBtn = () => {
  const navigate = useNavigate();
  const { actionsStore } = useDispatch<Dispatch>();
  const { isVisibleSplash } = useSelector((s: RootState) => s.actionsStore);
  const navigateToMining = async () => {
    actionsStore.openSplashPopup({});
    setTimeout(
      () => {
        navigate("/airdrop-home");
      },
      isVisibleSplash ? 500 : 0
    );
  };
  return (
    <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center bottom-[10px] gap-3">
      <div
        onClick={navigateToMining}
        className="flex flex-col gap-3 items-center"
      >
        <BaseImage width={"50%"} src={Mining} alt="box" />
        <BaseImage width={"70%"} src={logoHouse} alt="box" className="ml-2" />
      </div>
      <BaseImage width={"40%"} src={box} alt="box" path="/inventory" />
    </div>
  );
};

export default AirdopBtn;
