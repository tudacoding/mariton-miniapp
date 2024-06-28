import HomeLayout from "@/modules/home/Layout";
import coinPng from "@/assets/air/mariton-tk-ico.png";
import copySvg from "@/assets/icons/copy.svg";
import BaseButton from "@/components/BaseButton";
import { useState } from "react";
import BaseTitleDivider from "@/components/BaseTitleDivider";
import BaseDivider from "@/components/BaseDivider";
import BaseCard from "@/components/BaseCard";
import boostLogo from "@/assets/air/air-logo-friend.png";
import background from "@/assets/air/background-body-short.png";

import { twMerge } from "tailwind-merge";

export default function InvitePage() {
  const [tab, setTab] = useState<"achievenment" | "friends">("achievenment");
  const achievenments = [
    {
      title: "1 Friend",
      description: "Active Offline Mining",
      onClick: () => {},
      icon: "",
    },
    {
      title: "3 Friends",
      description: "+1% lifetime mining speed",
      onClick: () => {},
      icon: "",
    },
    {
      title: "5 Friends",
      description: "+3% lifetime mining speed",
      onClick: () => {},
      icon: "",
    },
    {
      title: "10 Friends",
      description: "+5% lifetime mining speed",
      onClick: () => {},
      icon: "",
    },
    {
      title: "20 Friends",
      description: "+10% lifetime mining speed",
      onClick: () => {},
      icon: "",
    },
    {
      title: "50 Friends",
      description: "+15% lifetime mining speed",
      onClick: () => {},
      icon: "",
    },
    {
      title: "100 Friends",
      description: "+20% lifetime mining speed",
      onClick: () => {},
      icon: "",
    },
  ];
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
              "pb-6 pt-3"
            )}
          >
            <BaseTitleDivider>Link invite</BaseTitleDivider>
            <div className="flex flex-row gap-3 pb-2">
              <div className="py-2 px-4 text-t-description bg-card rounded-xl grow">
                <p className="line-clamp-1 text-sm">
                  Each time a friend claims, they receive 1% of $MRT tokens. You
                  can claim to accumulate mined tokens.
                </p>
              </div>
              <BaseButton className="flex flex-row justify-center items-center gap-1 !bg-b-secondary !py-2">
                <img src={copySvg} alt="React Logo" />
                <span className="text-sm pt-0.5">Copy</span>
              </BaseButton>
            </div>
            <div className="rounded-xl bg-primary flex flex-row py-5 px-[14px] justify-between my-[6px]">
              <div className="flex flex-row gap-1 items-center justify-center">
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
                <BaseButton className="text-t-title font-bold text-xs bg-light rounded-3xl pt-1 pb-0 h-full">
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
                Friends (8)
              </BaseButton>
            </div>
            <div className="overflow-y-auto overflow-clip grow pt-2 overflow-x-[unset]">
              {achievenments.map(({ description, onClick, title }, index) => {
                return (
                  <div key={index} className="pb-3">
                    <BaseCard
                      avatar={boostLogo}
                      title={title}
                      description={description}
                      onClick={onClick}
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
