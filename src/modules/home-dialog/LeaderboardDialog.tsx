import closeButton from "@/assets/game/close-button.png";
import BaseDivider from "@/components/BaseDivider";
import boostBody from "@/assets/air/background-body.png";
import BaseButton from "@/components/BaseButton";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "@/store/store";
import { useState } from "react";
import BaseCard from "@/components/BaseCard";

export default function LeaderboardDialog() {
  const { handleDialog } = useDispatch<Dispatch>().actionsStore;
  const { leaderboard } = useSelector((state: RootState) => state.miningStore);
  const [tab, setTab] = useState<"ref" | "mint">("ref");

  return (
    <div className="h-full w-full relative">
      <img src={boostBody} alt="" className="absolute h-full w-full z-[-5]" />
      <div className="top-0 p-[20px] w-full">
        <p className="text-t-button text-center font-extrabold text-[24px]">
          LEADERBOARD
        </p>
        <BaseDivider className="mt-3 mb-4 !h-[1px]" />
        <div>
          <div className="grid grid-cols-2 gap-3 my-2">
            <BaseButton
              className={
                "text-lg font-extrabold " +
                (tab === "ref"
                  ? "!text-t-button"
                  : "!bg-card !text-t-description")
              }
              onClick={() => setTab("ref")}
            >
              TOP REF
            </BaseButton>
            <BaseButton
              className={
                "text-lg font-extrabold " +
                (tab === "mint"
                  ? "!text-t-button"
                  : "!bg-card !text-t-description")
              }
              onClick={() => setTab("mint")}
            >
              TOP MINT
            </BaseButton>
          </div>
          <div className="overflow-y-auto overflow-clip grow pt-2 overflow-x-[unset] h-[calc(100vh-300px)]">
            {leaderboard?.[tab === "mint" ? "refs" : "mints"]?.map(
              (item, index) => {
                const description =
                  tab === "mint"
                    ? `${item.totalRefs} ref`
                    : `${(item.totalMrtTokensClaimed).toFixed(3)} mint`;

                return (
                  <div key={index} className="pb-3">
                    <BaseCard
                      title={(item as any).telegramName ?? "user"}
                      description={description}
                      onClick={() => {}}
                    ></BaseCard>
                  </div>
                );
              }
            )}
          </div>
        </div>
        <div className="h-[20px]"></div>
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
      </div>
    </div>
  );
}
