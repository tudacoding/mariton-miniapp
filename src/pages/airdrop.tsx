/* eslint-disable @typescript-eslint/no-explicit-any */
import bodyBgLottery from "@/assets/game/mission-body.png";
import mainBanner from "@/assets/air/background-homefix.gif";
import btnMaritonTK from "@/assets/air/mariton-tk-ico.png";
import AirdropActionBar from "@/modules/airdrop/AirdropActionBar";
import AirdropBottomNav from "@/modules/airdrop/AirdropBottomNav";

//
import { toast } from "react-toastify";


const HomeCard = () => {
  return (
    <div className="relative h-screen overflow-x-hidden overflow-y-hidden">
      <img className="left-1/2 transform -top-3/4 scale-75 flex flex-col items-center" src={mainBanner} alt="main-banner" />

      <div className="relative w-full font-bold text-center items-end p-4 flex justify-between left-1/2 transform -translate-x-1/2">
        <div
          onClick={() => {
            toast.success("Leaderboard");
          }}
          className="card card-compact bg-amber-50 shadow-xl p-4 mb-4 text-center text-red-800 hover:opacity-50 cursor-pointer"
        >
          <div className="font-bold">Leaderboard</div>
          <div className="text-nowrap text-xs">
          </div>
        </div>

        <div
          onClick={() => {
            toast.success("Claim");
          }}
          className="card card-compact bg-amber-50 shadow-xl p-4 mb-4 text-center text-red-800 hover:opacity-50 cursor-pointer"
        >
          <div className="font-bold">Claim</div>
          <div className="text-nowrap text-xs">
          </div>
        </div>
        {/* <div className="flex flex-col items-center" >
          <BaseImage path="/leaderboard" width={"100%"} src={btnLeaderBoard} alt="leaderboard" />
        </div> */}
        {/* <div className="flex flex-col items-center" >
          <BaseImage path="/claim" width={"100%"} src={btnClaim} alt="claim" />
        </div> */}
      </div>

      <div className="relative bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <div className="font-lalezar text-2xl mb-4 text-center">
          <div>0.131256</div>
          <img src={btnMaritonTK} alt="btnMaritonTK" />
        </div>

        <div className="card card-compact bg-amber-800 shadow-xl p-4 mb-4 text-center text-white hover:opacity-50 cursor-pointer">
          <div className="font-bold">level 2</div>
          <div className="text-nowrap text-xs">
          </div>
        </div>

        <div className="font-lalezar text-2xl text-amber-700 mb-4 text-center">
          <div>COST 0.5 MRT NEWSPEED 0.5 MRT/H</div>
        </div>
      </div>

      <div className="relative w-full font-bold text-center items-end p-4 flex justify-between left-1/2 transform -translate-x-1/2">
        <div
          onClick={() => {
            toast.success("TON");
          }}
          className="card card-compact bg-amber-300 shadow-xl p-4 mb-4 text-center text-red-800 hover:opacity-50 cursor-pointer"
        >
          <div className="font-bold">TON</div>
          <div className="text-nowrap text-xs">
          </div>
        </div>

        <div
          onClick={() => {
            toast.success("MRT");
          }}
          className="card card-compact bg-amber-300 shadow-xl p-4 mb-4 text-center text-red-800 hover:opacity-50 cursor-pointer"
        >
          <div className="font-bold">MRT</div>
          <div className="text-nowrap text-xs">
          </div>
        </div>
      </div>
    </div>
  );
};

const AirdropScreen = () => {
  return (
    <div className="relative h-screen overflow-x-hidden">
      <div>
        <AirdropActionBar />
      </div>
      <div className="flex flex-col items-center p-2">
        <div className="relative w-full h-full flex justify-center">
          <img className="absolute" src={bodyBgLottery}></img>
          <HomeCard />
        </div>
      </div>
      <AirdropBottomNav />
    </div>
  );
};

export default AirdropScreen;
