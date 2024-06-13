import HomeLayout from "@/modules/home/Layout";
import coinPng from "@/assets/air/mariton-tk-ico.png";
import copySvg from "@/assets/icons/copy.svg";
import BaseButton from "@/components/BaseButton";
import { useState } from "react";
import BaseTitleDivider from "@/components/BaseTitleDivider";
import BaseDivider from "@/components/BaseDivider";
import BaseCard from "@/components/BaseCard";
import boostLogo from "@/assets/air/air-logo-friend.png";
import { useDispatch } from "react-redux";
import { Dispatch } from "@/store/store";
import LevelUpDialog from "@/modules/home-dialog/LevelUpDialog";
import BackgroundAirdrop from "@/components/BackgroupAirdrop";

export default function InvitePage() {
  const { handleDialog } = useDispatch<Dispatch>().actionsStore;
  const [tab, setTab] = useState<"achievenment" | "friends">("achievenment");
  const friends = [1, 2, 4, 3];
  const openDialog = () => {
    handleDialog({
      isVisible: true,
      children: <LevelUpDialog />,
      classWrapperDialog: "!p-0 !overflow-visible",
    });
  };
  return (
    <HomeLayout>
      <div className="h-full flex">
        <div className="relative grow">
          <div className="w-full h-full absolute z-[-10]">
            <BackgroundAirdrop />
          </div>
          <div className="w-full h-full px-6 pb-[30px] flex flex-col pt-[86px]">
            <BaseTitleDivider>Link invite</BaseTitleDivider>
            <div className="flex flex-row gap-3 pb-2">
              <div className="py-3 px-4 text-t-description bg-card rounded-xl grow">
                <p className="line-clamp-1 text-sm">
                  Now you can import your SVG and use it
                </p>
              </div>
              <BaseButton className="flex flex-row justify-center items-center gap-1 !bg-b-secondary !py-3">
                <img src={copySvg} alt="React Logo" />
                <span className="text-sm">Copy</span>
              </BaseButton>
            </div>
            <div className="rounded-xl bg-primary flex flex-row py-5 px-[14px] justify-between my-[6px]">
              <div className="flex flex-row gap-2 items-center justify-center">
                <span className="text-2xl text-t-button font-bold leading-none">
                  0.123123
                </span>
                <img
                  src={coinPng}
                  alt="bg-mission-body"
                  className="object-contain"
                />
              </div>
              <div className="flex items-center">
                <BaseButton className="!text-t-title font-bold !text-xs !bg-light !rounded-3xl !pt-1 !pb-0">
                  Claim
                </BaseButton>
              </div>
            </div>
            <p className="text-center text-t-description text-xs  font-semibold">
              {"lorem ipsum dolor sit amet".toUpperCase()}
            </p>
            <BaseDivider className="my-3" />
            <div className="grid grid-cols-2 gap-3 mb-2">
              <BaseButton
                className={
                  "text-lg font-bold line-clamp-1 " +
                  (tab === "achievenment"
                    ? "!text-t-button"
                    : "!bg-card !text-t-description")
                }
                onClick={() => setTab("achievenment")}
              >
                Achievenment
              </BaseButton>
              <BaseButton
                className={
                  "text-lg font-bold " +
                  (tab === "friends"
                    ? "!text-t-button"
                    : "!bg-card !text-t-description")
                }
                onClick={() => setTab("friends")}
              >
                Friends (8)
              </BaseButton>
            </div>
            <div className="overflow-y-auto overflow-clip grow pt-2 overflow-x-[unset]">
              {friends.map((_, index) => {
                return (
                  <div key={index} className="pb-3">
                    <BaseCard
                      avatar={boostLogo}
                      title="item 1"
                      description="Check in TW to increase 20% speed in 8h"
                      onClick={() => openDialog()}
                      actionComponent={
                        <div className="border border-0.5 border-solid rounded-full h-6 w-6 border-t-description"></div>
                      }
                    ></BaseCard>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
