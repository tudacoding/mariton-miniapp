import boostBody from "@/assets/air/background-body.png";
import boostLogo from "@/assets/air/air-logo-friend.png";
import HomeLayout from "@/modules/home/Layout";
import BaseTitleDivider from "@/components/BaseTitleDivider";
import BaseCard from "@/components/BaseCard";
import BaseButton from "@/components/BaseButton";

export default function Boost() {
  const items = [1, 2, 4, 3];

  return (
    <HomeLayout>
      <div className="h-full flex">
        <div className="relative grow mt-[10px] flex">
          <img
            className="w-full h-full absolute z-[-10]"
            src={boostBody}
            alt="bg-mission-body"
          />
          <div className="grow overflow-auto mt-[100px] mb-10 px-6">
            <BaseTitleDivider>Daily Misson</BaseTitleDivider>
            {items.map((item, index) => {
              return (
                <div key={index} className="pb-3">
                  <BaseCard
                    avatar={boostLogo}
                    title="item 1"
                    description="Check in TW to increase 20% speed in 8h"
                    onClick={() => {}}
                    actionComponent={
                      <BaseButton className="!py-1 !rounded-2xl !text-xs !text-t-title font-bold">
                        Next
                      </BaseButton>
                    }
                  ></BaseCard>
                </div>
              );
            })}
            <BaseTitleDivider>One-time Misson</BaseTitleDivider>
            {items.map((item, index) => {
              return (
                <div key={index} className="pb-3">
                  <BaseCard
                    avatar={boostLogo}
                    title="item 1"
                    description="Check in TW to increase 20% speed in 8h"
                    onClick={() => {}}
                    actionComponent={
                      <BaseButton className="!py-1 !rounded-2xl !text-xs !text-t-title font-bold">
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
