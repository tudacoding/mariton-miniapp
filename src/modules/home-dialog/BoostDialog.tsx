import BaseButton from "@/components/BaseButton";
import BaseDivider from "@/components/BaseDivider";
import BaseDialog from "@/components/BaseDialog";
import background from "@/assets/air/short-background-body.png";
import Loading from "@/assets/icons/Loading";
import { useState } from "react";
import MaritonToken from "@/assets/icons/MaritonToken";

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
          <div className="h-[110%] w-full z-50 absolute flex justify-center items-center">
            <Loading className="text-[#6CA71B]" />
          </div>
        )}
        <div className="flex justify-center flex-col items-center top-0 w-full px-[30px] py-6">
          <p className="text-t-button text-center font-extrabold text-[24px]">
            {item.title}
          </p>
          <BaseDivider className="h-[1px] my-4" />
          <p className="pb-3">
            <span className="text-t-description">{item.description}</span>
            <MaritonToken className="inline-block ml-2 w-4 h-4"/>
          </p>
          <BaseButton
            onClick={async () => {
              setLoading(true);
              await onAction();
              setLoading(false);
            }}
          >
            Boost
          </BaseButton>
        </div>
      </div>
    </BaseDialog>
  );
}
