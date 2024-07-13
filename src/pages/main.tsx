import land from "@/assets/game/land.png";
import NavbarBottom from "@/modules/home/NavbarBottom";
import ActionBar from "@/modules/home/ActionBar";
import CityBuildings from "@/modules/home/CityBuildings";
import AirdopBtn from "@/modules/home/AirdopBtn";
// import FirstCongrats from "@/modules/congrats/FirstCongrats";
// import { useSelector } from "react-redux";
// import { RootState } from "@/store/store";
import LuckySpin from "@/modules/home/LuckySpin";

const MainPage = () => {
  // const { account } = useSelector((s: RootState) => s.accountStore);
  return (
    <div className="relative h-screen overflow-x-hidden">
      {/* {account && !account.isUsedFirstSpin && <FirstCongrats />} */}

      <div className="absolute inset-0">
        <img src={land} alt="land" className="object-cover w-full h-full" />
      </div>

      <CityBuildings />
      <AirdopBtn />
      <LuckySpin />
      <ActionBar />

      <div className="absolute inset-x-0 bottom-0">
        <NavbarBottom />
      </div>
    </div>
  );
};

export default MainPage;
