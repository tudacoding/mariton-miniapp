import boostLogo from "@/assets/air/air-logo-friend.png";
import HomeLayout from "@/modules/home/Layout";
import BaseTitleDivider from "@/components/BaseTitleDivider";
import BaseCard from "@/components/BaseCard";
import BaseButton from "@/components/BaseButton";
import background from "@/assets/air/background-body-short.png";
import { twMerge } from "tailwind-merge";

export default function Boost() {
  const checkinBoosts = [
    {
      description: "Boost +10% speed for 12h",
      title: "Daily Check in",
      onClick: () => {},
    },
    {
      description:
        "Minimum 01 TON balance in your Wallet to get 20% bonus speed for 24h",
      onClick: () => {},
      title: "Junior Rich Mariton",
    },
    {
      description: "Boost +10% speed for 8h",
      title: "Mariton Ambassador",
      onClick: () => {},
    },
  ];
  const oneTimeBoosts = [
    {
      description: "Send h to contact to increase 10% h in 12h",
      onClick: () => {},
    },
    {
      description: "Check in rich to increase 20% speed in 24h",
      onClick: () => {},
    },
    {
      description: "Check in TW to increase 20% speed in 8h",
      onClick: () => {},
    },
  ];
  return (
    <HomeLayout>
      <div className="h-full flex">
        <div className="relative grow flex">
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
              "grow overflow-auto px-6",
              // " mt-[86px]  mb-[30px]"
              "mb-5 mt-4"
            )}
          >
            <BaseTitleDivider className="pt-0">Daily Misson</BaseTitleDivider>
            {checkinBoosts.map(({ title, description, onClick }, index) => {
              return (
                <div key={index} className="pb-3">
                  <BaseCard
                    avatar={boostLogo}
                    title={title}
                    description={description}
                    onClick={onClick}
                    actionComponent={
                      <BaseButton className="pt-[5px] pb-[2px] px-[14px] rounded-2xl text-xs text-t-title font-bold">
                        Next
                      </BaseButton>
                    }
                  ></BaseCard>
                </div>
              );
            })}
            <BaseTitleDivider className="pt-1">
              One-time Misson
            </BaseTitleDivider>
            {oneTimeBoosts.map(({ description, onClick }, index) => {
              return (
                <div key={index} className="pb-3">
                  <BaseCard
                    avatar={boostLogo}
                    title="Daily check in"
                    description={description}
                    onClick={onClick}
                    actionComponent={
                      <BaseButton className="pt-[5px] pb-[2px] px-[14px] rounded-2xl text-xs text-t-title font-bold">
                        Next
                      </BaseButton>
                    }
                  ></BaseCard>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
