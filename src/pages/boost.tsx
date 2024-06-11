import BoostActionButton from "@/modules/airdrop/BoostActionButton";
import boostBody from "@/assets/air/air-body.png";
import boostLogo from "@/assets/air/air-logo-friend.png";
import HomeLayout from "@/modules/home/Layout";

export default function Boost() {
  return (
    <HomeLayout>
      <div className="h-full flex">
        <div className="relative grow mt-[60px]">
          <img
            className="w-full h-full absolute z-[-10]"
            src={boostBody}
            alt="bg-mission-body"
          />
          <div className="h-full w-full p-6 overflow-auto">
            <div className="h-[60px]">

            </div>
            <BoostActionButton
              logo={boostLogo}
              title="Daily check in"
              description="Send request to contact to increase 10% speed in 12h"
              completedMission=""
              onClick={() => {}}
            />
            <BoostActionButton
              logo={boostLogo}
              title="Daily check in"
              description="Send request to contact to increase 10% speed in 12h"
              completedMission=""
              onClick={() => {}}
            />
            <BoostActionButton
              logo={boostLogo}
              title="Daily check in"
              description="Send request to contact to increase 10% speed in 12h"
              completedMission=""
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
