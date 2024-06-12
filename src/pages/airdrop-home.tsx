import HomeLayout from "@/modules/home/Layout";
import background from "@/assets/air/background-body-short.png";
import AirdropActionBar from "@/modules/airdrop/AirdropActionBar";
import mainBanner from "@/assets/air/background-homefix.gif";
import btnMaritonTK from "@/assets/air/mariton-tk-ico.png";
import { useDispatch } from "react-redux";
import { Dispatch } from "@/store/store";
import LevelUpDialog from "@/modules/home-dialog/LevelUpDialog";
import ClaimDialog from "@/modules/home-dialog/ClaimDialog";
import LeaderboardDialog from "@/modules/home-dialog/LeaderboardDialog";
import BaseButton from "@/components/BaseButton";

export default function AirDopHome() {
  const { handleDialog } = useDispatch<Dispatch>().actionsStore;

  return (
    <HomeLayout>
      <div className="w-full">
        <AirdropActionBar />
      </div>
      <div className="relative h-fix">
        <img className="absolute w-full h-full z-[-10]" src={background} />
        <div className="p-6">
          <div className="rounded-xl overflow-hidden">
            <img className="" src={mainBanner} />
          </div>
          <div className="grid grid-cols-2 gap-3 my-3">
            <BaseButton
              className={"text-lg font-bold !text-t-button !bg-card"}
              onClick={() => {
                handleDialog({
                  isVisible: true,
                  children: <LeaderboardDialog />,
                  classWrapperDialog: "!p-0 !overflow-visible",
                  classDialog: "top-[-20px]",
                });
              }}
            >
              Leaderboard
            </BaseButton>
            <BaseButton
              className={"text-lg font-bold !text-t-button !bg-card"}
              onClick={() => {
                handleDialog({
                  isVisible: true,
                  children: <ClaimDialog />,
                  classWrapperDialog: "!p-0 !overflow-visible",
                });
              }}
            >
              Claim
            </BaseButton>
          </div>
          <div className="flex flex-col px-[64px]">
            <p className="flex flex-row justify-center gap-1 py-3">
              <span className="font-bold text-2xl text-t-button">0.131256</span>
              <img src={btnMaritonTK} alt="" className="object-contain" />
            </p>
            <div className="text-center">
              <BaseButton className="!bg-base w-full !rounded-full text-white font-bold text-[22px] !pb-3 leading-none">
                Level 2
              </BaseButton>
            </div>
            <p className="py-2 text-t-dark text-xs font-semibold text-center">
              COST 0.5 MRT NEWSPEED 0.5 MRT/H
            </p>
            <div className="w-full grid grid-cols-2 gap-3 py-5">
              <BaseButton
                className="!text-t-button !rounded-3xl font-extrabold"
                onClick={() => {
                  handleDialog({
                    isVisible: true,
                    children: <LevelUpDialog />,
                    classWrapperDialog: "!p-0 !overflow-visible",
                  });
                }}
              >
                TON
              </BaseButton>
              <BaseButton
                className="!text-t-button !rounded-3xl font-extrabold"
                onClick={() => {
                  handleDialog({
                    isVisible: true,
                    children: <LevelUpDialog />,
                    classWrapperDialog: "!p-0 !overflow-visible",
                  });
                }}
              >
                MRT
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
