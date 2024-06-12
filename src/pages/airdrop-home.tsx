import HomeLayout from "@/modules/home/Layout";
import bodyBgLottery from "@/assets/game/mission-body.png";
import AirdropActionBar from "@/modules/airdrop/AirdropActionBar";
import mainBanner from "@/assets/air/background-homefix.gif";
import { toast } from "react-toastify";
import btnMaritonTK from "@/assets/air/mariton-tk-ico.png";
import { useDispatch } from "react-redux";
import { Dispatch } from "@/store/store";
import LevelUpDialog from "@/modules/home-dialog/LevelUpDialog";
import ClaimDialog from "@/modules/home-dialog/ClaimDialog";
import LeaderboardDialog from "@/modules/home-dialog/LeaderboardDialog";

export default function AirDopHome() {
  const { handleDialog } = useDispatch<Dispatch>().actionsStore;

  return (
    <HomeLayout>
      <AirdropActionBar />
      <div className="w-full absolute items-center content-center justify-center top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-center">
        <div className="absolute top-10 w-full">
          <img
            className="absolute top-0 z-10 transform left-1/2 -translate-x-1/2 flex flex-col items-center"
            src={bodyBgLottery}
          />
          <img
            className="absolute -top-16 z-10 transform scale-50 flex flex-col items-center"
            src={mainBanner}
          />
        </div>
      </div>

      {/* Leaderboard & claim */}
      <div className="relative w-full font-bold text-center items-end p-4 flex justify-between left-1/2 transform -translate-x-1/2">
        <div
          onClick={() => {
            handleDialog({
              isVisible: true,
              children: <LeaderboardDialog />,
              classWrapperDialog: "!p-0 !overflow-visible",
              classDialog: 'top-[-20px]'
            });
          }}
          className="card card-compact bg-amber-50 shadow-xl p-4 mb-4 text-center text-red-800 hover:opacity-50 cursor-pointer font-bold"
        >
          Leaderboard
        </div>

        <div
          onClick={() => {
            handleDialog({
              isVisible: true,
              children: <ClaimDialog />,
              classWrapperDialog: "!p-0 !overflow-visible",
            });
          }}
          className="card card-compact bg-amber-50 shadow-xl p-4 mb-4 text-center text-red-800 hover:opacity-50 cursor-pointer font-bold"
        >
          Claim
        </div>
      </div>

      {/* btnMaritonTK */}
      <div className="font-lalezar text-2xl mb-4 text-center">
        <div>0.131256</div>
        <img src={btnMaritonTK} alt="btnMaritonTK" />
      </div>

      <div className="card card-compact bg-amber-800 shadow-xl p-4 mb-4 text-center text-white hover:opacity-50 cursor-pointer font-bold">
        level 2
      </div>

      <div className="font-lalezar text-2xl text-amber-700 mb-4 text-center">
        COST 0.5 MRT NEWSPEED 0.5 MRT/H
      </div>

      {/*  */}
      <div className="relative w-full font-bold text-center items-end p-4 flex justify-between left-1/2 transform -translate-x-1/2">
        <div
          onClick={() => {
            handleDialog({
              isVisible: true,
              children: <LevelUpDialog />,
              classWrapperDialog: "!p-0 !overflow-visible",
            });
          }}
          className="card card-compact bg-amber-300 shadow-xl p-4 mb-4 text-center text-red-800 hover:opacity-50 cursor-pointer"
        >
          <div className="font-bold">TON</div>
          <div className="text-nowrap text-xs"></div>
        </div>

        <div
          onClick={() => {
            toast.success("MRT");
          }}
          className="card card-compact bg-amber-300 shadow-xl p-4 mb-4 text-center text-red-800 hover:opacity-50 cursor-pointer"
        >
          <div className="font-bold">MRT</div>
          <div className="text-nowrap text-xs"></div>
        </div>
      </div>
    </HomeLayout>
  );
}
