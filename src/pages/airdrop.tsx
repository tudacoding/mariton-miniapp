import React, { useState } from 'react';
import ActionBar from "@/modules/home/ActionBar";
import AirNavbar from "@/modules/airdrop/AirNavbarBottom";
import missionHeader from "@/assets/game/mission-header.png";
import missionBody from "@/assets/game/mission-body.png";
import BoostActionButton from "@/modules/airdrop/BoostActionButton";
import logo from "@/assets/airdrop/air-logo-mission.png";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const AirdropPage = () => {
  const [view, setView] = useState<string>('home');

  const handleButtonClick = (buttonType: string) => {
    console.log('======= buttonType', buttonType);
    if (buttonType === 'airdrop') {
      // Reload the page
      window.location.reload();
    } else {
      // Change the view based on the buttonType
      setView(buttonType);
    }
  };
  return (
    <div className="relative h-screen overflow-x-hidden">
      <ActionBar />
      <div className="w-full absolute top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <img
          className="absolute top-0 z-10"
          src={missionHeader}
          alt="bg-mission-header"
        />
        <div className="absolute top-10 relative w-full">
          <img
            className="absolute w-full"
            src={missionBody}
            alt="bg-mission-body"
          />
        </div>
      </div>
      {view === 'home' ? (
        <div className="content">Default View Content</div>
      ) : (
        <div className="content">{view} View Content</div>
      )}
      <AirNavbar onButtonClick={handleButtonClick} />
    </div>
  );
};

  export default AirdropPage;