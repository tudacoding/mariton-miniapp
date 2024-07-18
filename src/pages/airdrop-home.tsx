import HomeLayout from "@/modules/home/Layout";
import background from "@/assets/air/short-background-body.png";
import claimTokenGif from "@/assets/level-up/claim-token.gif";
import mainBanner from "@/assets/air/background-homefix.gif";
import { useDispatch } from "react-redux";
import { Dispatch } from "@/store/store";
import LevelUpDialog from "@/modules/home-dialog/LevelUpDialog";
import LeaderboardDialog from "@/modules/home-dialog/LeaderboardDialog";
import BaseButton from "@/components/BaseButton";
import { useStartMining } from "@/hooks/useStartMining";
import MiningTokenCount from "@/modules/airdrop/MiningTokenCount";
import useEndMining from "@/hooks/useEndMining";

export default function AirDopHome() {
  const { handleDialog, closeDialog } = useDispatch<Dispatch>().actionsStore;
  const { claimTokens } = useDispatch<Dispatch>().miningStore;
  const { mining } = useStartMining();
  const {
    speed = 0,
    mrtNextCost = 0,
    mrtNextSpeedIncreased = 0,
  } = mining?.speedLevel ?? {};
  const handleClaimToken = async () => {
    handleDialog({
      isVisible: true,
      children: <img src={claimTokenGif} />,
      classDialog: "h-full !bg-transparent",
    });
    setTimeout(() => {
      closeDialog({
        classDialog: "h-full !bg-transparent",
      });
    }, 1500);
    await claimTokens({});
  };

  useEndMining();
  return (
    <HomeLayout>
      <div className="h-full flex flex-col">
        <div className="grow overflow-auto w-full h-full relative">
          <img
            className="w-full h-full absolute z-[-10]"
            src={background}
            alt="bg-mission-body"
          />
          <div className="p-6 w-full h-full flex flex-col">
            <div className="rounded-2xl overflow-hidden grow relative flex justify-center items-center">
              <img className="w-full h-full object-cover" src={mainBanner} />
              <span className="absolute top-0 left-0 text-t-dark font-semibold text-xs my-1.5 mx-2 bg-black/10 px-1 rounded-2xl ">
                CURRENT SPEED {mining?.speedLevel?.speed?.toFixed(2) ?? 0.0}{" "}
                MRT/H
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 my-3">
              <BaseButton
                className={"text-lg font-bold !text-t-button !bg-card"}
                onClick={() => {
                  handleDialog({
                    isVisible: true,
                    children: <LeaderboardDialog />,
                    classWrapperDialog:
                      "p-0 !overflow-visible pb-4 max-w-[330px]",
                  });
                }}
              >
                Leaderboard
              </BaseButton>
              <BaseButton
                className={
                  "text-lg font-bold !text-t-button bg-card active:bg-primary"
                }
                onClick={handleClaimToken}
              >
                Claim
              </BaseButton>
            </div>
            <div className="flex flex-col">
              <MiningTokenCount />
              <div className="text-center">
                <BaseButton
                  onClick={() => {
                    handleDialog({
                      isVisible: true,
                      children: <LevelUpDialog />,
                      classWrapperDialog:
                        "p-0 !overflow-visible pb-6 max-w-[330px]",
                    });
                  }}
                  className="!bg-base !rounded-full text-white font-bold text-[22px] !pb-3 leading-none w-[200px]"
                >
                  LEVEL {mining?.speedLevel?.level}
                </BaseButton>
              </div>
            </div>
            <p className="py-3 text-t-dark text-xs font-semibold text-center whitespace-nowrap">
              COST {mrtNextCost.toFixed(3)} MRT NEWSPEED{" "}
              {(mrtNextSpeedIncreased + speed).toFixed(3)} MRT/H
            </p>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
