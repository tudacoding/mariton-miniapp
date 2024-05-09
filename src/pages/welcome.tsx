import welcomeBackground from "@/assets/game/welcome-bg.png";
import logo from "@/assets/game/logo.png";
import { TonConnectButton } from "@tonconnect/ui-react";

const WelcomePage = () => {
  return (
    <div className="relative">
      <img src={welcomeBackground} alt="welcome-bg" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center">
          <img width={300} src={logo} alt="logo" />
          <span className="loading loading-infinity loading-lg text-black mb-2"></span>
          <TonConnectButton />
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
