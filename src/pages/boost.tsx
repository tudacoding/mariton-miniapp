import BoostActionButton from "@/modules/airdrop/BoostActionButton";
import missionHeader from "@/assets/game/mission-header.png";
import boostBody from "@/assets/air/air-body.png";
import boostLogo from "@/assets/air/air-logo-friend.png";
import HomeLayout from "@/modules/home/Layout";

export default function Boost() {
  return (
    <HomeLayout>
      <div className="w-full absolute top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <img
          className="absolute top-0 z-10"
          src={missionHeader}
          alt="bg-mission-header"
        />
        <div className="absolute top-10 w-full">
          <img
            className="absolute w-full"
            src={boostBody}
            alt="bg-mission-body"
          />
          <div className="w-full absolute p-6 mt-2">
            <BoostActionButton
              logo={boostLogo}
              title="Daily check in"
              description="Send request to contact to increase 10% speed in 12h"
              completedMission=""
              onClick={() => { }}
            />
            <BoostActionButton
              logo={boostLogo}
              title="Daily check in"
              description="Send request to contact to increase 10% speed in 12h"
              completedMission=""
              onClick={() => { }}
            />
            <BoostActionButton
              logo={boostLogo}
              title="Daily check in"
              description="Send request to contact to increase 10% speed in 12h"
              completedMission=""
              onClick={() => { }}
            />
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
