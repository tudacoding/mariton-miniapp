/* eslint-disable @typescript-eslint/no-explicit-any */
import bodyBgLottery from "@/assets/game/mission-body.png";
import mainBanner from "@/assets/air/main-banner.png";
import leaderboardClaimBtnBg from "@/assets/air/leaderboard-claim-btn-bg.png";
import AirdropActionBar from "@/modules/airdrop/AirdropActionBar";
import AirdropBottomNav from "@/modules/airdrop/AirdropBottomNav";
import BaseImage from "@/components/BaseImage";


const HomeCard = () => {
    return (
        <div className="grid grid-flow-row auto-rows-max absolute top-0 w-full flex-col items-center p-5 justify-center">
            <img src={mainBanner} alt="main-banner" />
            <div className="w-full flex justify-between absolute top-80 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <BaseImage path="/leaderboard" width={"35%"} src={leaderboardClaimBtnBg} alt="leaderboard" />
                <BaseImage path="/claim" width={"35%"} src={leaderboardClaimBtnBg} alt="claim" />
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
