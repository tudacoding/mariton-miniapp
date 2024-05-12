/* eslint-disable @typescript-eslint/no-explicit-any */
import tonLogo from "@/assets/game/lottery-item/ton.png";
import coupon from "@/assets/game/lottery-item/coupon.png";
import puzzleFire from "@/assets/game/lottery-item/fire-puzzle.png";
import puzzleWater from "@/assets/game/lottery-item/water-puzzle.png";
import puzzleTree from "@/assets/game/lottery-item/tree-puzzle.png";

const ImageLotteryItem = (props: any) => {
  return (
    <div className="">
      {props.item.type === "ton" && (
        <div className="flex items-center h-20">
          <span className="text-amber-800 font-bold text-3xl">
            {props.item.value}
          </span>
          <img className="ml-2 w-10" src={tonLogo}></img>
        </div>
      )}
      {props.item.type === "discount" && (
        <div className="relative flex items-center h-20">
          <img className="ml-2" src={coupon}></img>
          <span className="absolute left-8 text-amber-800 font-bold text-3xl">
            <div className="font-bold text-sm">COUPON</div>
            <div className="font-bold text-sm">{props.item.value} %</div>
          </span>
        </div>
      )}
      {props.item.type === "puzzle" && (
        <div className="relative flex items-center h-20">
          {props.item.value === "fire" && (
            <img width={60} className="ml-2" src={puzzleFire}></img>
          )}
          {props.item.value === "water" && (
            <img width={60} className="ml-2" src={puzzleWater}></img>
          )}
          {props.item.value === "tree" && (
            <img width={60} className="ml-2" src={puzzleTree}></img>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageLotteryItem;
