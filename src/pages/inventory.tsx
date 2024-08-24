import closeButton from "@/assets/game/close-button.png";

import { useGetInventory } from "@/hooks/useGetInventory";
import { getTitleLotteryItem } from "@/utils/string";
import ImageLotteryItem from "@/components/ImageLotteryItem";
import { useNavigate } from "react-router-dom";
import headBgLottery from "@/assets/game/head-background-lottery.png";
import bodyBgLottery from "@/assets/game/body-background-lottery.png";
import { IInventory } from "@/types/models/lotteryItem";

const LotteryItem = ({ item }: { item: IInventory }) => {
  return (
    <div className="w-full h-400 bg-amber-50 rounded-lg p-2">
      <div className="relative flex justify-center border border-amber-400 rounded-lg p-4">
        <ImageLotteryItem item={item} />
      </div>
      <div className="font-lalezar text-center text-amber-600 mt-2">
        {getTitleLotteryItem(item)}
      </div>
      <div className="rounded-3xl bg-yellow-400 p-1 pt-2 text-center font-lalezar text-amber-800 text-[24px] h-8 flex justify-center items-center">
        x{item.amount}
      </div>
    </div>
  );
};

import HomeLayout from "@/modules/home/Layout";
import BaseAction from "@/components/BaseAction";

export default function InventoryScreen() {
  const { listInventory } = useGetInventory();
  const nav = useNavigate();

  return (
    <HomeLayout hideBottom>
      <div className="w-full h-full flex flex-col relative">
        <img src={headBgLottery} className="h-[100px]"></img>
        <img
          src={bodyBgLottery}
          className="mt-[100px] absolute h-[calc(100%-140px)] w-full"
        ></img>
        <div className="overflow-y-auto overflow-clip grow overflow-x-[unset] relative h-[calc(100%-140px)] mt-4">
          <div className="grid grid-cols-2 gap-4 px-6 ">
            {listInventory?.map((item: any, index: number) => (
              <LotteryItem key={index} item={item} />
            ))}
          </div>
        </div>

        <div className="h-32 flex-none">
          <BaseAction
            className="absolute bottom-[12px] w-full flex justify-center"
            onClick={() => {
              nav("/");
            }}
          >
            <img src={closeButton} className="" />
          </BaseAction>
        </div>
      </div>
    </HomeLayout>
  );
}
