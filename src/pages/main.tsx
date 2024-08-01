import CityBuildings from "@/modules/home/CityBuildings";
import AirdopBtn from "@/modules/home/AirdopBtn";
import HomeLayout from "@/modules/home/Layout";

const MainPage = () => {
  return (
    <HomeLayout>
      <CityBuildings />
      <AirdopBtn />
    </HomeLayout>
  );
};

export default MainPage;
