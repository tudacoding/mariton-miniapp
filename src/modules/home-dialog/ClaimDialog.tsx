import backgroundDialog from "@/assets/level-up/background-dialog.png";
import levelUp from "@/assets/level-up/GIFT-claim.gif";
import coinPng from "@/assets/air/mariton-tk-ico.png";
import closeButton from "@/assets/game/close-button.png";
import upgradeButton from "@/assets/game/upgrade-button.png";
import BaseDivider from "@/components/BaseDivider";
import BaseProgress from "@/components/BaseProgress";
import BaseButton from "@/components/BaseButton";
import { useDispatch } from "react-redux";
import { Dispatch } from "@/store/store";

export default function ClaimDialog() {
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
          CLAIM
        </p>
        <div className="py-4 flex w-full justify-center">
          <img src={levelUp} alt="" className="" width={'70%'} />
        </div>
        <BaseDivider className="!h-[1px]"/>
        <div className="pt-6 text-t-title text-base text-center">
          <p className=" font-bold">Storage Capacity</p>
          <div className="py-3">
            <BaseProgress />
          </div>
          <p className="flex flex-row justify-center gap-1">
            <span className="font-bold text-2xl text-t-button">0.131256</span>
            <img src={coinPng} alt="" className="object-contain" />
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
