import walletButton from "@/assets/game/wallet-button.png";
import backButton from "@/assets/game/back-button-appbar.png";
import BaseImage from "@/components/BaseImage";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useLocation, useNavigate } from "react-router-dom";
interface IProps {
  isUseAbsolute?: boolean;
}

const ActionBar = (props: IProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div
      className={`w-full font-bold text-center items-end p-4 flex justify-between ${props.isUseAbsolute
        ? "absolute top-0 left-1/2 transform -translate-x-1/2"
        : ""
        }`}
    >
      {location.pathname !== "/" ? (
        <div onClick={() => navigate("/")} className="flex justify-start">
          <BaseImage width={"80%"} src={backButton} alt="add-button" />
        </div>
      ) : (
        <div onClick={() => navigate("/inventory")} className="flex justify-start">
          <BaseImage width={"80%"} src={walletButton} alt="wallet-button" />
        </div>
      )}
      <div onClick={() => navigate("/test")} className="flex justify-center">
        <BaseImage width={"80%"} src={walletButton} alt="test-button" />
      </div>
      <div className="flex justify-end">
        <TonConnectButton />
      </div>
    </div>
  );
};

export default ActionBar;
