import ActionBar from "@/modules/home/ActionBar";
import spinCircle from "@/assets/game/spin-circle.png";
import pickSpin from "@/assets/game/pick-spin.png";
import spinButton from "@/assets/game/spin-button.png";
import inviteFriends from "@/assets/game/invite-button.png";
import { useState } from "react";
import { useGetFirstRegister } from "@/hooks/useGetFirstRegister";

const SpinScreen = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const { account } = useGetFirstRegister();
  const numberSpin = account ? account.totalSpins - account.usedSpins : 0;
  return (
    <div className="relative h-screen">
      <div className="absolute z-40 w-full">
        <ActionBar />
      </div>

      <div className="absolute -top-40">
        <div className="relative">
          <img
            className={`${isSpinning ? "animate-spin" : ""}`}
            src={spinCircle}
          ></img>
          <img
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2"
            src={pickSpin}
          ></img>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        {!numberSpin ? (
          <div className="font-lalezar text-2xl mb-4 text-center">
            INVITE FRIENDS TO GET MORE SPIN
          </div>
        ) : (
          <div className="font-lalezar text-2xl mb-4">
            {numberSpin} SPIN AVAILABLE
          </div>
        )}
        {numberSpin ? (
          <img
            onClick={() => {
              setIsSpinning(!isSpinning);
            }}
            className="hover:opacity-50 cursor-pointer"
            src={spinButton}
          ></img>
        ) : (
          <img
            className="hover:opacity-50 cursor-pointer"
            src={inviteFriends}
          ></img>
        )}
      </div>
    </div>
  );
};

export default SpinScreen;
