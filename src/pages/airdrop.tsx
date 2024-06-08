import ActionBar from "@/modules/home/ActionBar";
import AirNavbar from "@/modules/airdrop/AirNavbarBottom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const AirdropPage = () => {
    return (
      <div className="relative h-screen overflow-x-hidden">
        <ActionBar />
        <div className="w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span>Airdrop Page</span>
        </div>
        <AirNavbar>

        </AirNavbar>
      </div>
    );
  };

  export default AirdropPage;