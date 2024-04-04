import land from "@/assets/game/land.png";
import NavbarBottom from "@/modules/home/NavbarBottom";
import ActionBar from "@/modules/home/ActionBar";
import CityBuildings from "@/modules/home/CityBuildings";
import MysteryBox from "@/modules/home/MysteryBox";

const MainPage = () => {
  return (
    <div className="relative h-screen">
      <div className="w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <img src={land} alt="land" />
      </div>
      <MysteryBox />
      <CityBuildings />
      <ActionBar />
      <NavbarBottom />
    </div>
  );
};

export default MainPage;
