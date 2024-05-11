// import { useGetFirstRegister } from "@/hooks/useGetFirstRegister";
import headBgLottery from "@/assets/game/head-background-lottery.png";
import bodyBgLottery from "@/assets/game/body-background-lottery.png";
import ActionBar from "@/modules/home/ActionBar";
import eggImage from "@/assets/game/egg-fire.png";
import { useNavigate } from "react-router-dom";

const LotteryCard = () => {
  const navigate = useNavigate();
  return (
    <div className="absolute top-0 w-full flex flex-col items-center p-4">
      <div className="card card-side bg-base-100 shadow-xl">
        <figure>
          <img src={eggImage} alt="Movie" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Coupon 10%</h2>
          <p>Use this buy egg for discount 10%</p>
          <div className="card-actions justify-end">
            <button
              onClick={() => navigate("/shop")}
              className="btn btn-primary"
            >
              Buy now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Pagination = () => {
  return (
    <div className="join">
      <button className="join-item btn">«</button>
      <button className="join-item btn">Page 1</button>
      <button className="join-item btn">»</button>
    </div>
  );
};

const InventoryScreen = () => {
  // const { account } = useGetFirstRegister();
  const navigate = useNavigate();
  return (
    <div className="h-screen">
      <div>
        <ActionBar />
      </div>
      <div className="flex flex-col items-center">
        <img src={headBgLottery}></img>
        <div className="relative w-full h-full flex justify-center">
          <img className="absolute" src={bodyBgLottery}></img>
          <LotteryCard />
        </div>
        <div className="absolute bottom-40 flex flex-col">
          <Pagination />
          <div onClick={() => navigate("/")} className="btn mt-2">
            close
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryScreen;
