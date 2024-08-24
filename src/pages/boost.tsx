import HomeLayout from "@/modules/home/Layout";
import BaseTitleDivider from "@/components/BaseTitleDivider";
import background from "@/assets/air/short-background-body.png";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

import BoostCard from "@/modules/boost/BoostCard";
import useGetDataBoost from "@/modules/boost/hooks/useGetDataBoost";

export default function Boost() {
  const { boosts } = useSelector((s: RootState) => s.miningStore);
  const { checkinBoosts, oneTimeBoosts } = useGetDataBoost();

  return (
    <HomeLayout>
      <div className="h-full flex">
        <div className="relative grow flex">
          <img
            className="w-full h-full absolute z-[-10]"
            src={background}
            alt="bg-mission-body"
          />
          <div className="grow overflow-auto px-6 mb-5 mt-4">
            <BaseTitleDivider className="pt-0">Daily Mission</BaseTitleDivider>
            {checkinBoosts.map((item, index) => {
              const { type } = item;
              const isActive = boosts.find((b) => b.type === type);
              return (
                <BoostCard
                  index={index}
                  item={item}
                  key={index}
                  isActive={!!isActive}
                />
              );
            })}
            <BaseTitleDivider className="pt-1">
              One-time Misson
            </BaseTitleDivider>
            {oneTimeBoosts.map((item, index) => {
              const { type } = item;
              const isActive = boosts.find((b) => b.type === type);
              return (
                <BoostCard
                  index={index}
                  item={item}
                  key={index}
                  isActive={!!isActive}
                />
              );
            })}
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
