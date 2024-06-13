import HomeLayout from "@/modules/home/Layout";
import background from "@/assets/air/background-body-short.png";
import mainBanner from "@/assets/air/background-homefix.gif";
// import mainBanner from "@/assets/air/mining-animation.gif";
import btnMaritonTK from "@/assets/air/mariton-tk-ico.png";
import { useDispatch } from "react-redux";
import { Dispatch } from "@/store/store";
import LevelUpDialog from "@/modules/home-dialog/LevelUpDialog";
import LeaderboardDialog from "@/modules/home-dialog/LeaderboardDialog";
import BaseButton from "@/components/BaseButton";
import useAutomationMining from "@/hooks/useAutomationMining";

export default function AirDopHome() {
  const { handleDialog } = useDispatch<Dispatch>().actionsStore;
  const { amount } = useAutomationMining(0.1, 0);

  return (
    <HomeLayout>
      <div className="h-full flex flex-col">
        <div className="grow overflow-auto w-full h-full relative">
          {/* <div className="w-full h-fix relative"> */}
          <img
            className="w-full h-full absolute z-[-10]"
            src={background}
            alt="bg-mission-body"
          />
          <div className="p-6 w-full h-full flex flex-col">
            <div className="rounded-2xl overflow-hidden grow relative flex justify-center items-center">
              <img className="w-full h-full object-cover" src={mainBanner} />
              <span className="absolute top-0 left-0 text-t-dark font-semibold text-xs my-1.5 mx-2 bg-black/10 px-1 rounded-2xl ">
                CURRENT SPEED 0.1 MRT/H
              </span>
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
                  // handleDialog({
                  //   isVisible: true,
                  //   children: <ClaimDialog />,
                  //   classWrapperDialog: "!p-0 !overflow-visible",
                  // });
                }}
              >
                Claim
              </BaseButton>
            </div>
            <div className="flex flex-col">
              <p className="flex flex-row justify-center gap-1 pb-2">
                <span className="font-bold text-2xl text-t-button">
                  {amount}
                </span>
                <img src={btnMaritonTK} alt="" className="object-contain" />
              </p>
              <div className="text-center">
                <BaseButton
                  onClick={() => {
                    handleDialog({
                      isVisible: true,
                      children: <LevelUpDialog />,
                      classWrapperDialog: "!p-0 !overflow-visible",
                    });
                  }}
                  className="!bg-base !rounded-full text-white font-bold text-[22px] !pb-3 leading-none w-[200px]"
                >
                  Level 2
                </BaseButton>
              </div>
            </div>
            <p className="py-3 text-t-dark text-xs font-semibold text-center whitespace-nowrap">
              COST 0.5 MRT NEWSPEED 0.5 MRT/H
            </p>
          </div>
          {/* </div> */}
        </div>
      </div>
    </HomeLayout>
  );
}
