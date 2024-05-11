// import { useGetFirstRegister } from "@/hooks/useGetFirstRegister";
import headBgLottery from "@/assets/game/head-background-lottery.png";
import bodyBgLottery from "@/assets/game/body-background-lottery.png";
import ActionBar from "@/modules/home/ActionBar";
import eggImage from "@/assets/game/egg-fire.png";

const LotteryItem = () => {
  return (
    <div className="w-full h-400 bg-amber-50 rounded-lg p-2">
      <div className="flex justify-center border border-amber-400 rounded-lg p-4">
        <img src={eggImage}></img>
      </div>
      <div className="font-lalezar text-center text-amber-600 mt-4">
        Fire Dragon
      </div>
      <div className="rounded-3xl bg-yellow-400 h-8 p-1 text-center font-lalezar text-amber-800 text-2xl">
        {" "}
        x1
      </div>
    </div>
  );
};

const LotteryCard = () => {
  return (
    <div className="absolute top-0 w-full flex flex-col items-center p-4 justify-center">
      <div className="grid grid-cols-2 gap-4 w-80">
        <LotteryItem />
        <LotteryItem />
        <LotteryItem />
        <LotteryItem />
      </div>
      <Pagination />
    </div>
  );
};

const Pagination = () => {
  return (
    <div className="join mt-4">
      <button className="join-item btn">«</button>
      <button className="join-item btn">Page 1</button>
      <button className="join-item btn">»</button>
    </div>
  );
};

const InventoryScreen = () => {
  // const { account } = useGetFirstRegister();
  return (
    <div className="h-screen">
      <div>
        <ActionBar />
      </div>
      <div className="flex flex-col items-center p-2">
        <img src={headBgLottery}></img>
        <div className="relative w-full h-full flex justify-center">
          <img className="absolute" src={bodyBgLottery}></img>
          <LotteryCard />
        </div>
      </div>
    </div>
  );
};

export default InventoryScreen;
