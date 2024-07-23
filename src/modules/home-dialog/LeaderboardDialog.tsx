import closeButton from "@/assets/game/close-button.png";
import BaseDivider from "@/components/BaseDivider";
import BaseButton from "@/components/BaseButton";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "@/store/store";
import { useState } from "react";
import BaseCard from "@/components/BaseCard";
import BaseAction from "@/components/BaseAction";
import { ILeaderboard } from "@/types/models/mining";
import Account from "@/types/models/account";
import MaritonToken from "@/assets/icons/MaritonToken";
import TonToken from "@/assets/icons/TonToken";

export default function LeaderboardDialog() {
  const { handleDialog } = useDispatch<Dispatch>().actionsStore;
  const { leaderboard } = useSelector((state: RootState) => state.miningStore);
  const [tab, setTab] = useState<"ref" | "mint">("ref");

  return (
    <>
      <div className="top-0 p-[20px] w-full">
        <p className="text-t-button text-center font-extrabold text-[24px]">
          LEADERBOARD
        </p>
        <BaseDivider className="mt-3 mb-4 !h-[1px]" />
        <div>
          <div className="grid grid-cols-2 gap-3 my-2">
            <BaseButton
              className={
                "text-lg font-extrabold pt-2 pb-1 " +
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
                "text-lg font-extrabold  pt-2 pb-1 " +
                (tab === "mint"
                  ? "!text-t-button"
                  : "!bg-card !text-t-description")
              }
              onClick={() => setTab("mint")}
            >
              TOP MINT
            </BaseButton>
          </div>
          <div className="overflow-y-auto overflow-clip grow pt-2 overflow-x-[unset] h-[calc(100vh-300px)] max-h-[500px]">
            {tab === "ref" ? (
              <LeaderboardRef leaderboardRef={leaderboard["refs"]} />
            ) : (
              <LeaderboardMint leaderboardMint={leaderboard["mints"]} />
            )}
          </div>
        </div>
        <div className="h-[20px]"></div>
      </div>
      <div className="absolute bottom-[-30px] flex flex-row justify-center w-full gap-4">
        <BaseAction
          onClick={() =>
            handleDialog({
              isVisible: false,
            })
          }
        >
          <img src={closeButton} alt="" className="object-contain" />
        </BaseAction>
      </div>
    </>
  );
}
function LeaderboardRef({ leaderboardRef }: { leaderboardRef: Account[] }) {
  const getReward = (amount: number, index: number) => {
    switch (index) {
      case 0:
        return (
          <div className="flex flex-row justify-center items-center gap-1 text-[22px] font-bold text-t-button">
            <span>{amount}</span>
          </div>
        );
      case 1:
        return (
          <div className="flex flex-row justify-center items-center gap-1 text-xl font-bold text-t-title">
            <span>{amount}</span>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-row justify-center items-center gap-1 text-lg font-bold text-t-description">
            <span>{amount}</span>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-row justify-center items-center gap-1 text-lg font-bold text-t-description">
            <span>{amount}</span>
          </div>
        );
      case 4:
        return (
          <div className="flex flex-row justify-center items-center gap-1 text-lg font-bold text-t-description">
            <span>{amount}</span>
          </div>
        );
      default:
        return <div></div>;
    }
  };
  return (
    <>
      {leaderboardRef?.map((item, index) => {
        const reward = getReward(item.totalRefs, index);
        return (
          <div key={index} className="pb-2.5">
            <BaseCard
              title={item.telegramName ?? "user"}
              actionComponent={reward}
            ></BaseCard>
          </div>
        );
      })}
    </>
  );
}
function LeaderboardMint({ leaderboardMint }: { leaderboardMint: Account[] }) {
  const getRewardTon = (index: number) => {
    switch (index) {
      case 0:
        return (
          <div className="flex flex-row justify-center items-center gap-1 text-[22px] font-bold text-t-button">
            <span>30</span>
            <TonToken className="w-5 h-5" />
          </div>
        );
      case 1:
        return (
          <div className="flex flex-row justify-center items-center gap-1 text-xl font-bold text-t-title">
            <span>20</span>
            <TonToken className="w-4 h-4" />
          </div>
        );
      case 2:
        return (
          <div className="flex flex-row justify-center items-center gap-1 text-lg font-bold text-t-description">
            <span>10</span>
            <TonToken className="w-3.5 h-3.5" />
          </div>
        );
      case 3:
        return (
          <div className="flex flex-row justify-center items-center gap-1 text-lg font-bold text-t-description">
            <span>10</span>
            <TonToken className="w-3.5 h-3.5" />
          </div>
        );
      case 4:
        return (
          <div className="flex flex-row justify-center items-center gap-1 text-lg font-bold text-t-description">
            <span>10</span>
            <TonToken className="w-3.5 h-3.5" />
          </div>
        );
      default:
        return <div></div>;
    }
  };
  return (
    <>
      {leaderboardMint?.map((item, index) => {
        const rewardTon = getRewardTon(index);
        return (
          <div key={index} className="pb-2.5">
            <BaseCard
              title={item.telegramName ?? "user"}
              description={
                <div className="flex flex-row gap-0.5">
                  {item.totalMrtTokensClaimed.toFixed(0)}{" "}
                  <MaritonToken className="h-3 w-3" />
                </div>
              }
              actionComponent={rewardTon}
              onClick={() => {}}
            ></BaseCard>
          </div>
        );
      })}
    </>
  );
}
