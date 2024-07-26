import BaseDivider from "@/components/BaseDivider";
import BaseDialog, { handleBaseDialog } from "@/components/BaseDialog";
import background from "@/assets/air/background-v2.png";
import Loading from "@/assets/icons/Loading";
import { useState } from "react";
import MaritonToken from "@/assets/icons/MaritonToken";
import BaseAction from "@/components/BaseAction";
import closeButton from "@/assets/game/close-button.png";
import boostButton from "@/assets/air/boost-button.png";

export default function BoostDialog({
  item,
  id,
  onAction,
}: {
  item: any;
  id: string;
  onAction: () => void;
}) {
  const [loading, setLoading] = useState(false);
  return (
    <BaseDialog id={id}>
      <div className="h-fix w-fix relative">
        <img src={background} className="absolute h-full w-full z-[-5]" />
        {loading && (
          <div className="z-50 absolute inset-[48%] transform -translate-x-1/2 -translate-y-1/2">
            <Loading className="text-[#6CA71B]" />
          </div>
        )}
        <div className="flex justify-center flex-col items-center top-0 w-full px-[30px] pt-6 pb-12">
          <p className="text-t-button text-center font-extrabold text-[24px] whitespace-nowrap">
            {item.title}
          </p>
          <BaseDivider className="h-[1px] my-4" />
          <p className="pb-3">
            <span className="text-t-description font-bold text-base">
              {item.description}
            </span>
            <MaritonToken className="inline-block ml-2 w-4 h-4" />
          </p>
        </div>
        <div className="absolute bottom-[-20px] flex flex-row justify-center w-full gap-6">
          <BaseAction
            onClick={() => {
              handleBaseDialog({
                isVisible: false,
                id,
              });
              setLoading(false);
            }}
          >
            <img src={closeButton} alt="" className="object-contain h-12" />
          </BaseAction>
          <BaseAction
            onClick={async () => {
              if (!loading) {
                setLoading(true);
                await onAction();
                setLoading(false);
              }
            }}
          >
            <img src={boostButton} alt="" className="object-contain h-[50px]" />
          </BaseAction>
        </div>
      </div>
    </BaseDialog>
  );
}
