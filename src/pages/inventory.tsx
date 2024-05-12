/* eslint-disable @typescript-eslint/no-explicit-any */
import headBgLottery from "@/assets/game/head-background-lottery.png";
import bodyBgLottery from "@/assets/game/body-background-lottery.png";
import ActionBar from "@/modules/home/ActionBar";
import { useGetInventory } from "@/hooks/useGetInventory";
import { getTitleLotteryItem } from "@/utils/string";
import { get } from "lodash-es";
import ImageLotteryItem from "@/components/ImageLotteryItem";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "@/store/store";

const LotteryItem = (props: any) => {
  const attributes = get(props.item, "attributes.lottery_item.data.attributes");
  return (
    <div className="w-full h-400 bg-amber-50 rounded-lg p-2">
      <div className="relative flex justify-center border border-amber-400 rounded-lg p-4">
        <ImageLotteryItem item={attributes} />
        <div className="ml-1 text-amber-800 absolute top-0 left-0">
          {get(props.item, "id")}
        </div>
      </div>
      <div className="font-lalezar text-center text-amber-600 mt-4">
        {getTitleLotteryItem(attributes)}
      </div>
      <div className="rounded-3xl bg-yellow-400 h-8 p-1 text-center font-lalezar text-amber-800 text-2xl">
        {" "}
        x1
      </div>
    </div>
  );
};

const LotteryCard = (props: any) => {
  return (
    <div className="absolute top-0 w-full flex flex-col items-center p-4 justify-center">
      <div className="grid grid-cols-2 gap-4 w-80">
        {props.inventory &&
          props.inventory.map((item: any, index: number) => (
            <LotteryItem key={index} item={item} />
          ))}
      </div>
      <Pagination />
    </div>
  );
};

const Pagination = () => {
  const { accountStore } = useDispatch<Dispatch>();
  const { currentPage } = useSelector((s: RootState) => s.accountStore);
  const { pagination } = useSelector((s: RootState) => s.accountStore);
  return (
    <div className="join mt-4">
      <button
        disabled={(currentPage || 1) <= 1}
        onClick={() => {
          accountStore.setCurrentPage((currentPage || 1) - 1);
        }}
        className="join-item btn"
      >
        «
      </button>
      <button className="join-item btn">Page {currentPage || 1}</button>
      <button
        disabled={pagination && pagination.page * pagination.pageSize > pagination.total}
        onClick={() => {
          accountStore.setCurrentPage((currentPage || 1) + 1);
        }}
        className="join-item btn"
      >
        »
      </button>
    </div>
  );
};

const InventoryScreen = () => {
  const { inventory } = useGetInventory();
  return (
    <div className="h-screen">
      <div>
        <ActionBar />
      </div>
      <div className="flex flex-col items-center p-2">
        <img src={headBgLottery}></img>
        <div className="relative w-full h-full flex justify-center">
          <img className="absolute" src={bodyBgLottery}></img>
          <LotteryCard inventory={inventory} />
        </div>
      </div>
    </div>
  );
};

export default InventoryScreen;
