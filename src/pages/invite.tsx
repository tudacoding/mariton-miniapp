import HomeLayout from "@/modules/home/Layout";
import coinPng from "@/assets/air/mariton-tk-ico.png";
import copySvg from "@/assets/icons/copy.svg";
import BaseButton from "@/components/BaseButton";
import { useEffect, useState } from "react";
import BaseTitleDivider from "@/components/BaseTitleDivider";
import BaseDivider from "@/components/BaseDivider";
import claimTokenGif from "@/assets/level-up/claim-token.gif";
import background from "@/assets/air/background-body-short.png";
import config from "@/config";
import { twMerge } from "tailwind-merge";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "@/store/store";
import { toast } from "react-toastify";
import useCopy from "@/hooks/useCopy";
import ListAchievenments from "@/modules/invite/ListAchievenments";
import { useTonWallet } from "@tonconnect/ui-react";
import ListFriend from "@/modules/invite/ListFriends";

export default function InvitePage() {
  const wallet = useTonWallet();
  const [tab, setTab] = useState<"achievenment" | "friends">("achievenment");
  const { mining, countFriends } = useSelector((s: RootState) => s.miningStore);
  const ref = mining ? `${config.botTele}invite_${mining.telegramUserId}` : "";
  const [copy] = useCopy(ref);
  const { claimRefTokens, getFriends } = useDispatch<Dispatch>().miningStore;
  const { handleDialog, closeDialog } = useDispatch<Dispatch>().actionsStore;
  
  const handleClaimToken = () => {
    handleDialog({
      isVisible: true,
      children: <img src={claimTokenGif} />,
      classDialog: "h-full !bg-transparent",
    });
    setTimeout(() => {
      closeDialog({
        classDialog: "h-full !bg-transparent",
      });
    }, 1500);
    claimRefTokens({});
  };
  useEffect(() => {
    getFriends({});
  }, [wallet]);
  return (
    <HomeLayout>
      <div className="h-full flex">
        <div className="relative grow">
          {/* <div className="w-full h-full absolute z-[-10]">
            <BackgroundAirdrop />
          </div> */}
          <img
            className="w-full h-full absolute z-[-10]"
            src={background}
            alt="bg-mission-body"
          />
          <div
            className={twMerge(
              "w-full h-full px-6 flex flex-col",
              // "pb-[30px] pt-[86px]",
              "pb-5 pt-3"
            )}
          >
            <BaseTitleDivider className="pt-1">Link invite</BaseTitleDivider>
            <div className="flex flex-row gap-3 pb-2">
              <div className="py-2 px-4 text-t-description bg-card rounded-xl grow">
                <p className="line-clamp-1 text-sm">{ref}</p>
              </div>
              <BaseButton
                className="flex flex-row justify-center items-center gap-1 bg-b-secondary py-2"
                onClick={() => {
                  copy();
                  toast.success("Copy link successfully!");
                }}
              >
                <img src={copySvg} alt="React Logo" />
                <span className="text-sm pt-0.5">Copy</span>
              </BaseButton>
            </div>
            <div className="rounded-xl bg-primary flex flex-row py-5 px-[14px] justify-between my-[6px]">
              <div className="flex flex-row gap-1 items-center justify-center">
                <span className="text-2xl text-t-button font-bold leading-none">
                  {(mining?.friendClaimTokens ?? 0).toFixed(6)}
                </span>
                <img
                  src={coinPng}
                  alt="bg-mission-body"
                  className="object-contain"
                />
              </div>
              <div className="flex items-center">
                <BaseButton
                  onClick={handleClaimToken}
                  className="text-t-title font-bold text-xs bg-light rounded-3xl pt-1 pb-0 h-full"
                >
                  Claim
                </BaseButton>
              </div>
            </div>
            <p className="text-center text-t-description text-xs font-semibold">
              Each time a friend claims, they receive 1% of $MRT tokens. You can
              claim to accumulate mined tokens.
            </p>
            <BaseDivider className="my-3" />
            <div className="grid grid-cols-2 gap-3 mb-2">
              <BaseButton
                className={twMerge(
                  "text-lg font-bold line-clamp-1 py-2 pb-1",
                  tab === "achievenment"
                    ? "text-t-button"
                    : "bg-card text-t-description"
                )}
                onClick={() => setTab("achievenment")}
              >
                Achievenment
              </BaseButton>
              <BaseButton
                className={twMerge(
                  "text-lg font-bold line-clamp-1 pt-2 pb-1",
                  tab === "friends"
                    ? "text-t-button"
                    : "bg-card text-t-description"
                )}
                onClick={() => setTab("friends")}
              >
                Friends ({countFriends})
              </BaseButton>
            </div>
            <div className="overflow-y-auto overflow-clip grow pt-2 overflow-x-[unset]">
              {tab === "friends" ? <ListFriend /> : <ListAchievenments />}
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
