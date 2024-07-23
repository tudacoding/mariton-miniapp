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
import { useMemo, useState } from "react";
import Success from "@/assets/icons/Success";
import CheckInIcon from "@/assets/icons/CheckinIcon";
import RichJuniorIcon from "@/assets/icons/RichJuniorIcon";
import MrtAmbasshador from "@/assets/icons/MrtAmbasshador";
import BoostDialog from "@/modules/home-dialog/BoostDialog";
import { handleBaseDialog } from "@/components/BaseDialog";

export default function Boost() {
  const { miningStore } = useDispatch<Dispatch>();
  const { account } = useSelector((s: RootState) => s.accountStore);
  const { boosts } = useSelector((s: RootState) => s.miningStore);
  const checkinBoosts = useMemo(() => {
    return [
      {
        sortDescription: "Boost +10% speed for 12h",
        title: "Daily Check in",
        type: "CHECKIN",
        icon: <CheckInIcon />,
        description: "Boost +10% speed for 12h",
        onClick: async (userId: number) => {
          const res = await miningStore.boostDaily({
            userId,
            type: "CHECKIN",
          });
          if (res) toast.success("Boost +10% speed for 12h");
        },
      },
      {
        sortDescription: "Boost +20% bonus speed for 24h",
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
        icon: <RichJuniorIcon />,
      },
      {
        sortDescription: "Boost +10% speed for 8h",
        title: "Mariton Ambassador",
        description: `Mariton Ambassador (Add '💎 $MRT' to your Twitter name Add @MARITONonTON to your Twitter bio) Boost +10% speed for 8h`,
        onClick: async (userId: number) => {
          const res = await miningStore.boostDaily({
            userId,
            type: "UPDATE_TWITTER",
          });
          if (res) toast.success("Boost +10% speed for 8h");
        },
        type: "UPDATE_TWITTER",
        icon: <MrtAmbasshador />,
      },
    ];
  }, []);
  const handleClick = async (item: any, index: number) => {
    handleBaseDialog({
      isVisible: true,
      id: `boost_${index}`,
    });
    // actionsStore.handleDialog({
    //   isVisible: true,
    //   showBackgroundDialog: true,
    //   children: <BoostDialog item={item} onAction={() => {}} />,
    // });
  };
  return (
    <HomeLayout>
      <div className="h-full flex">
        <div className="relative grow flex">
          <img
            className="w-full h-full absolute z-[-10]"
            src={background}
            alt="bg-mission-body"
          />
          <div className={twMerge("grow overflow-auto px-6", "mb-5 mt-4")}>
            <BaseTitleDivider className="pt-0">Daily Misson</BaseTitleDivider>
            {checkinBoosts.map((item, index) => {
              const { title, sortDescription, type, icon, onClick } = item;
              const isActive = boosts.find((b) => b.type === type);
              return (
                <div key={index} className="pb-3">
                  <BoostDialog
                    id={`boost_${index}`}
                    item={item}
                    onAction={async () => {
                      if (!isActive && account.id) {
                        await onClick(account.id);
                        handleBaseDialog({
                          isVisible: false,
                          id: `boost_${index}`,
                        });
                      }
                    }}
                  />
                  <BaseCard
                    title={title}
                    description={sortDescription}
                    avatar={icon}
                    actionComponent={
                      isActive ? (
                        <Success className="h-6 w-6 mx-3" />
                      ) : (
                        <BaseButton
                          className="pt-[5px] pb-[2px] px-[14px] rounded-2xl text-xs text-t-title font-bold"
                          onClick={() => {
                            handleClick(item, index);
                          }}
                        >
                          Next
                        </BaseButton>
                      )
                    }
                  ></BaseCard>
                </div>
              );
            })}
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
