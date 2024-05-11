import dialogLottery from "@/assets/game/dialog-lottery.png";
import LotteryItem from "@/types/models/lotteryItem";
import tonLogo from "@/assets/game/lottery-item/ton.png";
import coupon from "@/assets/game/lottery-item/coupon.png";
import puzzleFire from "@/assets/game/lottery-item/fire-puzzle.png";
import puzzleWater from "@/assets/game/lottery-item/water-puzzle.png";
import puzzleTree from "@/assets/game/lottery-item/tree-puzzle.png";
import { getTitleLotteryItem } from "@/utils/string";
import { useNavigate } from "react-router-dom";
interface IProps {
  isOpenDialog: boolean;
  item: LotteryItem;
}
const DialogLottery = (props: IProps) => {
  const title = getTitleLotteryItem(props.item);
  const navigate = useNavigate();
  return (
    props.isOpenDialog && (
      <div
        onClick={() => navigate("/inventory")}
        className="absolute z-40 flex justify-center flex-col p-4 w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-900/50"
      >
        <div className="relative w-full flex flex-col items-center h-full mt-10">
          <img className="h-fit absolute" src={dialogLottery}></img>
          <div className="absolute top-12 w-full flex flex-col items-center">
            <div className="w-3/4 h-40 bg-gray-50 rounded-lg border-2 border-amber-600 flex justify-center">
              {props.item.type === "ton" && (
                <div className="flex items-center">
                  <span className="text-amber-800 font-bold text-3xl">
                    {props.item.value}
                  </span>
                  <img className="ml-2" src={tonLogo}></img>
                </div>
              )}
              {props.item.type === "discount" && (
                <div className="relative flex items-center">
                  <img className="ml-2" src={coupon}></img>
                  <span className="absolute left-10 text-amber-800 font-bold text-3xl">
                    <div className="font-bold text-2xl">COUPON</div>
                    <div className="font-bold text-6xl">
                      {props.item.value} %
                    </div>
                  </span>
                </div>
              )}
              {props.item.type === "puzzle" && (
                <div className="relative flex items-center">
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
            <div className="divide-y text-center">
              <div className="font-lalezar text-amber-900 my-4 text-2xl">
                {String(title).toUpperCase()}
              </div>
              <div className="text-amber-950 font-bold text-center py-4">
                Congratulations! <br /> You receive a {title}.
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default DialogLottery;
