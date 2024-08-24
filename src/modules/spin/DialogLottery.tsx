import dialogLottery from "@/assets/game/dialog-lottery.png";
import { IInventory } from "@/types/models/lotteryItem";
import tonLogo from "@/assets/game/lottery-item/ton.png";
import coupon from "@/assets/game/lottery-item/coupon.png";
import puzzleFire from "@/assets/game/lottery-item/fire-puzzle.png";
import puzzleWater from "@/assets/game/lottery-item/water-puzzle.png";
import puzzleTree from "@/assets/game/lottery-item/tree-puzzle.png";
import { getDescriptionLotteryItem, getTitleLotteryItem } from "@/utils/string";
import { Dispatch } from "@/store/store";
import { useDispatch } from "react-redux";
interface IProps {
  item: IInventory;
}
const DialogLottery = ({ item }: IProps) => {
  const title = getTitleLotteryItem(item);
  const { actionsStore } = useDispatch<Dispatch>();
  return (
    <div
      onClick={() => actionsStore.handleDialog({ isVisible: false })}
      className="cursor-pointer top-0 relative h-fit"
    >
      <img className="" src={dialogLottery}></img>
      <div className="w-full flex flex-col items-center absolute z-10 top-12">
        <div className="w-3/4 h-40 bg-gray-50 rounded-lg border-2 border-amber-600 flex justify-center">
          {item.type === "ton" && (
            <div className="flex items-center">
              <img className="ml-2" src={tonLogo}></img>
            </div>
          )}
          {item.type === "discount" && (
            <div className="relative flex items-center">
              <img className="ml-2" src={coupon}></img>
              <span className="absolute left-10 text-amber-800 font-bold text-3xl">
                <div className="font-bold text-2xl">COUPON</div>
                <div className="font-bold text-6xl">{item.value} %</div>
              </span>
            </div>
          )}
          {item.type === "puzzle" && (
            <div className="relative flex items-center">
              {item.value === "fire" && (
                <img width={60} className="ml-2" src={puzzleFire}></img>
              )}
              {item.value === "water" && (
                <img width={60} className="ml-2" src={puzzleWater}></img>
              )}
              {item.value === "tree" && (
                <img width={60} className="ml-2" src={puzzleTree}></img>
              )}
            </div>
          )}
        </div>
        <div className="divide-y text-center">
          <div className="font-lalezar text-amber-900 my-4 text-2xl">
            {String(title).toUpperCase()}
          </div>
          <div className="text-amber-950 font-bold text-center py-4">
            Congratulations! <br /> {getDescriptionLotteryItem(item)}.
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogLottery;
