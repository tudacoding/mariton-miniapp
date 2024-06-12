import backgroundDialog from "@/assets/dialog-level/background-dialog.png";
import levelUp from "@/assets/dialog-level/level-up.png";
import coinPng from "@/assets/air/mariton-tk-ico.png";
import closeButton from "@/assets/game/close-button.png";
import upgradeButton from "@/assets/game/upgrade-button.png";
import BaseDivider from "@/components/BaseDivider";
import BaseButton from "@/components/BaseButton";
import { useDispatch } from "react-redux";
import { Dispatch } from "@/store/store";

export default function LevelUpDialog() {
  const { handleDialog } = useDispatch<Dispatch>().actionsStore;

  return (
    <div className="h-fix w-fix relative">
      <img
        src={backgroundDialog}
        alt=""
        className="absolute h-full w-full z-[-5]"
      />
      <div className="top-0 p-[30px] w-full">
        <p className="text-t-button text-center font-extrabold text-[24px]">
          LEVEL UP
        </p>
        <div className="py-10 flex w-full justify-center">
          <img src={levelUp} alt="" className="" />
        </div>
        <BaseDivider />
        <div className="pt-8 text-t-title text-base text-center">
          <p className=" font-bold">Update your level to 2</p>
          <p className="flex flex-row justify-center  gap-1">
            <span className="pr-1">Cost</span>
            <span className="font-bold text-t-button">2.5</span>
            <img src={coinPng} alt="" className="object-contain" />
          </p>
          <p>
            <span>New speed: </span>
            <span className="font-bold">0.5 </span>
            <span>MRT/H</span>
          </p>
        </div>
        <div className="h-[60px]"></div>
      </div>
      <div className="absolute bottom-[-30px] flex flex-row justify-center w-full gap-4">
        <BaseButton
          className="!p-0 !bg-transparent"
          onClick={() =>
            handleDialog({
              isVisible: false,
            })
          }
        >
          <img src={closeButton} alt="" className="object-contain" />
        </BaseButton>
        <BaseButton className="!p-0 !bg-transparent">
          <img src={upgradeButton} alt="" className="object-contain" />
        </BaseButton>
      </div>
    </div>
  );
}
