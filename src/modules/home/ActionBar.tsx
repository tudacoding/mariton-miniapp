import backButton from "@/assets/game/back-button-appbar.png";
import BaseImage from "@/components/BaseImage";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useLocation } from "react-router-dom";

const ActionBar = () => {
  const location = useLocation();
  return (
    <div className={`w-full font-bold p-4 flex justify-between fixed top-0 z-[20]`}>
      <div className="flex justify-start">
        {location.pathname !== "/" ? (
          <BaseImage width={"80%"} src={backButton} alt="add-button" path="/" />
        ) : (
          <BaseImage
            width={"80%"}
            src={''}
            alt="wallet-button"
            path="/inventory"
          />
        )}
      </div>
      <div className="flex items-center">
        <TonConnectButton className="h-fit" />
      </div>
    </div>
  );
};

export default ActionBar;
