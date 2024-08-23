import tonLogo from "@/assets/game/lottery-item/ton.png";
import coupon from "@/assets/game/lottery-item/coupon.png";
import puzzleFire from "@/assets/game/lottery-item/fire-puzzle.png";
import puzzleWater from "@/assets/game/lottery-item/water-puzzle.png";
import puzzleTree from "@/assets/game/lottery-item/tree-puzzle.png";
import { ELotteryItem, EMonster, IInventory } from "@/types/models/lotteryItem";

const ImageLotteryItem = ({ item }: { item: IInventory }) => {
  return (
    <div className="h-16 flex justify-center">
      {item.type === ELotteryItem.TON && (
        <div className="flex items-center">
          <span className="text-amber-800 font-bold text-2xl">
            {item.value}
          </span>
          <img className="w-8 pl-1" src={tonLogo}></img>
        </div>
      )}
      {item.type === ELotteryItem.DISCOUNT && (
        <div className="relative flex items-center">
          <img className="" src={coupon}></img>
          <div className="absolute !text-amber-800 right-3 flex flex-col leading-none font-extrabold mx-auto">
            <span className="text-[14px]">COUPON</span>
            <span className="text-[28px]">{item.value}%</span>
          </div>
        </div>
      )}
      {item.type === ELotteryItem.PUZZLE && (
        <div className="relative flex items-center">
          {item.value === EMonster.FIRE && (
            <img width={54} className="ml-2" src={puzzleFire}></img>
          )}
          {item.value === EMonster.WATER && (
            <img width={54} className="ml-2" src={puzzleWater}></img>
          )}
          {item.value === EMonster.TREE && (
            <img width={54} className="ml-2" src={puzzleTree}></img>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageLotteryItem;
