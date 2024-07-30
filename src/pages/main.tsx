import CityBuildings from "@/modules/home/CityBuildings";
import AirdopBtn from "@/modules/home/AirdopBtn";
import LuckySpin from "@/modules/home/LuckySpin";
import HomeLayout from "@/modules/home/Layout";

const MainPage = () => {
  return (
    <HomeLayout>
      <CityBuildings />
      <AirdopBtn />
      {/* <LuckySpin /> */}
    </HomeLayout>
  );
};

export default MainPage;
