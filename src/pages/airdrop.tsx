import React, { useState } from 'react';
import ActionBar from "@/modules/home/ActionBar";
import AirNavbar from "@/modules/airdrop/AirNavbarBottom";
import missionHeader from "@/assets/game/mission-header.png";
import boostBody from "@/assets/air/air-body.png";
import ComingSoon from "@/modules/airdrop/ComingSoon";
import BoostActionButton from "@/modules/airdrop/BoostActionButton";
import boostLogo from "@/assets/air/air-logo-friend.png";
import comingSoonLogo from "@/assets/air/air-coming-soon.png";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const AirdropPage = () => {
  const [view, setView] = useState<string>('home');

  const handleButtonClick = (buttonType: string) => {
    console.log('======= buttonType', buttonType);
    setView(buttonType);
  };
  return (
    <div className="flex flex-col h-screen">
      <ActionBar />
      <div className="flex-grow flex items-center justify-center">
        {view === 'home' && (
          <div className="flex items-center justify-center h-full">
            <span>Home</span>
          </div>
        )}
        {view === 'boost' && (
          <div className="w-full absolute top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <img
              className="absolute top-0 z-10"
              src={missionHeader}
              alt="bg-mission-header"
            />
            <div className="absolute top-10 relative w-full">
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
        )}
        {view === 'invite' && (
          <div className="flex items-center justify-center h-full">
            <span>Invite</span>
          </div>
        )}
        {view === 'airdrop' && (
          <div className="flex items-center justify-center h-full">
            <ComingSoon
              imageSrc={comingSoonLogo}
              title="Airdrop"
              description="Airdrop feature coming soon"
            />
          </div>
        )}
      </div>
      <AirNavbar onButtonClick={handleButtonClick} />
    </div>
  );
};

export default AirdropPage;