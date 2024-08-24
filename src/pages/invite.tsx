import HomeLayout from "@/modules/home/Layout";
import BaseButton from "@/components/BaseButton";
import { useEffect, useState } from "react";
import BaseTitleDivider from "@/components/BaseTitleDivider";
import BaseDivider from "@/components/BaseDivider";
import claimTokenGif from "@/assets/level-up/claim-token.gif";
import background from "@/assets/air/short-background-body.png";
import config from "@/config";
import { twMerge } from "tailwind-merge";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "@/store/store";
import { toast } from "react-toastify";
import useCopy from "@/hooks/useCopy";
import { useTonWallet } from "@tonconnect/ui-react";
import ListFriend from "@/modules/invite/ListFriends";
import Copy from "@/assets/icons/Copy";
import MaritonToken from "@/assets/icons/MaritonToken";
import ListAchievements from "@/modules/invite/ListAchievenments";
import { formatNumber } from "@/helpers";

export default function InvitePage() {
  const wallet = useTonWallet();
  const [tab, setTab] = useState<"achievement" | "friends">("achievement");
  const { mining, countFriends } = useSelector((s: RootState) => s.miningStore);
  const { account } = useSelector((s: RootState) => s.accountStore);
  const ref = mining
    ? `${config.botTele}invite_${account?.telegramUserId}`
    : "";
  const [copy] = useCopy(ref);
  const { claimRefTokens, getFriends } = useDispatch<Dispatch>().miningStore;
  const { openAnimateAndClose } = useDispatch<Dispatch>().actionsStore;
  const friendClaimTokens = mining?.friendClaimTokens ?? 0;
  const handleClaimToken = () => {
    openAnimateAndClose({ children: <img src={claimTokenGif} /> });
    claimRefTokens({});
  };
  useEffect(() => {
    getFriends({});
  }, [wallet]);
  return (
    <HomeLayout>
      <div className="h-full flex">
        <div className="relative grow">
          <img
            className="w-full h-full absolute z-[-10]"
            src={background}
            alt="bg-mission-body"
          />
          <div className="w-full h-full px-6 flex flex-col pb-5 pt-3">
            <BaseTitleDivider className="pt-1">Invite Link</BaseTitleDivider>
            <div className="flex flex-row gap-3 pb-2">
              <div className="py-2 text-t-description bg-card rounded-xl grow">
                <span className="line-clamp-1 px-1 text-sm whitespace-pre-wrap">
                  {" "}
                  {ref}{" "}
                </span>
              </div>
              <BaseButton
                className=" flex flex-row justify-center items-center gap-1 bg-b-secondary py-2"
                onClick={() => {
                  copy();
                  toast.success("Copy link successfully!");
                }}
              >
                <Copy />
                <span className="text-sm pt-0.5">Copy</span>
              </BaseButton>
            </div>
            <div className="rounded-xl bg-primary flex flex-row py-5 px-[14px] justify-between my-[6px]">
              <div className="flex flex-row gap-1 items-center justify-center">
                <span className="text-2xl text-t-button font-bold leading-none">
                  {formatNumber(friendClaimTokens, 6)}
                </span>
                <MaritonToken />
              </div>
              <div className="flex items-center">
                <BaseButton
                  onClick={handleClaimToken}
                  className={twMerge(
                    "text-t-title font-bold text-xs bg-light rounded-3xl pt-1 pb-0 h-full",
                    friendClaimTokens <= 0 && "!opacity-50"
                  )}
                  disabled={friendClaimTokens <= 0}
                >
                  Claim
                </BaseButton>
              </div>
            </div>
            <p className="text-center text-t-description text-xs font-semibold">
              Each time a friend claims, you receive 1% of $MRT tokens. You can
              claim to accumulate mined tokens.
            </p>
            <BaseDivider className="my-3" />
            <div className="grid grid-cols-2 gap-3 mb-2">
              <BaseButton
                className={twMerge(
                  "text-lg font-bold line-clamp-1 py-2 pb-1",
                  tab === "achievement"
                    ? "text-t-button"
                    : "bg-card text-t-description"
                )}
                onClick={() => setTab("achievement")}
              >
                Achievement
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
            {tab === "friends" ? <ListFriend /> : <ListAchievements />}
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
