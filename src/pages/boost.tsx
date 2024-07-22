import HomeLayout from "@/modules/home/Layout";
import BaseTitleDivider from "@/components/BaseTitleDivider";
import BaseCard from "@/components/BaseCard";
import BaseButton from "@/components/BaseButton";
import background from "@/assets/air/short-background-body.png";
import { twMerge } from "tailwind-merge";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "@/store/store";
import { toast } from "react-toastify";
import Loading from "@/assets/icons/Loading";
import { useState } from "react";
import Success from "@/assets/icons/Success";

export default function Boost() {
  const [loadingButtonId, setLoadingButtonId] = useState<number | null>(null);
  const { miningStore } = useDispatch<Dispatch>();
  const { account } = useSelector((s: RootState) => s.accountStore);
  const { boosts } = useSelector((s: RootState) => s.miningStore);
  const checkinBoosts = [
    {
      description: "Boost +10% speed for 12h",
      title: "Daily Check in",
      type: "CHECKIN",
      onClick: async (userId: number) => {
        const res = await miningStore.boostDaily({
          userId,
          type: "CHECKIN",
        });
        if (res) toast.success("Boost +10% speed for 12h");
      },
    },
    {
      description:
        "Minimum 01 TON balance in your Wallet to get 20% bonus speed for 24h",
      onClick: async (userId: number) => {
        const res = await miningStore.boostDaily({
          userId,
          type: "JUNIOR_RICH_MARITON",
        });
        if (res) toast.success("Boost +20% speed for 24h");
      },
      title: "Junior Rich Mariton",
      type: "JUNIOR_RICH_MARITON",
    },
    {
      description: "Add '💎 $MRT' to your Twitter name Add @MARITONonTON to your Twitter bio. Boost +10% speed for 8h",
      title: "Mariton Ambassador",
      onClick: async (userId: number) => {
        const res = await miningStore.boostDaily({
          userId,
          type: "UPDATE_TWITTER",
        });
        if (res) toast.success("Boost +10% speed for 8h");
      },
      type: "UPDATE_TWITTER",
    },
  ];
  // const oneTimeBoosts = [
  //   {
  //     description: "Send h to contact to increase 10% h in 12h",
  //     onClick: () => {},
  //   },
  //   {
  //     description: "Check in rich to increase 20% speed in 24h",
  //     onClick: () => {},
  //   },
  //   {
  //     description: "Check in TW to increase 20% speed in 8h",
  //     onClick: () => {},
  //   },
  // ];
  return (
    <HomeLayout>
      <div className="h-full flex">
        <div className="relative grow flex">
          <img
            className="w-full h-full absolute z-[-10]"
            src={background}
            alt="bg-mission-body"
          />
          <div
            className={twMerge(
              "grow overflow-auto px-6",
              "mb-5 mt-4"
            )}
          >
            <BaseTitleDivider className="pt-0">Daily Misson</BaseTitleDivider>
            {checkinBoosts.map(
              ({ title, description, onClick, type }, index) => {
                const isActive = boosts.find((b) => b.type === type);
                return (
                  <div key={index} className="pb-3">
                    <BaseCard
                      title={title}
                      description={description}
                      onClick={async () => {
                        if (!isActive && account.id) {
                          setLoadingButtonId(index);
                          await onClick(account.id);
                          setLoadingButtonId(null);
                        }
                      }}
                      actionComponent={
                        isActive ? (
                          <Success className="h-6 w-6 mx-3" />
                        ) : loadingButtonId === index ? (
                          <Loading className="text-primary w-6 h-6" />
                        ) : (
                          <BaseButton className="pt-[5px] pb-[2px] px-[14px] rounded-2xl text-xs text-t-title font-bold">
                            Next
                          </BaseButton>
                        )
                      }
                    ></BaseCard>
                  </div>
                );
              }
            )}
            {/* <BaseTitleDivider className="pt-1">
              One-time Misson
            </BaseTitleDivider> */}
            {/* {oneTimeBoosts.map(({ description, onClick }, index) => {
              return (
                <div key={index} className="pb-3">
                  <BaseCard
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
            })} */}
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
