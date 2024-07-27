import BaseDivider from "@/components/BaseDivider";
import BaseDialog, { handleBaseDialog } from "@/components/BaseDialog";
import background from "@/assets/air/background-v2.png";
import Loading from "@/assets/icons/Loading";
import { useState } from "react";
import MaritonToken from "@/assets/icons/MaritonToken";
import BaseAction from "@/components/BaseAction";
import closeButton from "@/assets/game/close-button.png";
import boostButton from "@/assets/air/boost-button.png";
import BaseDialogV2 from "@/components/BaseDialogV2";
import BaseButton from "@/components/BaseButton";

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
    <BaseDialogV2
      id={id}
      rightAction={async () => {
        if (!loading) {
          setLoading(true);
          const res = await onAction();
          setLoading(false);
          return res;
        }
      }}
      rightButton={<img src={boostButton} className="h-12" />}
      childrenButton={<>Next</>}
      classChildrenButton="pt-[5px] pb-[2px] px-[14px] rounded-2xl text-xs text-t-title font-bold"
    >
      {loading && (
        <div className="z-50 absolute inset-[48%] transform -translate-x-1/2 -translate-y-1/2">
          <Loading className="text-[#6CA71B]" />
        </div>
      )}
      <div className="flex justify-center flex-col items-center top-0 w-full px-[30px] pt-6 pb-12">
        <p className="text-t-button text-center font-extrabold text-[24px] whitespace-nowrap">
          {item?.title}
        </p>
        <BaseDivider className="h-[1px] my-4" />
        <p className="pb-3">
          <span className="text-t-description font-bold text-base">
            {item?.description}
          </span>
          <MaritonToken className="inline-block ml-2 w-4 h-4" />
        </p>
      </div>
    </BaseDialogV2>
  );
}
