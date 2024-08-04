import ActionBar from "@/modules/home/ActionBar";
import spinCircle from "@/assets/game/spin-circle.png";
import pickSpin from "@/assets/game/pick-spin.png";
import spinButton from "@/assets/game/spin-button.png";
import inviteFriends from "@/assets/game/invite-button.png";
import { useState } from "react";
import { useGetFirstRegister } from "@/hooks/useGetFirstRegister";
import { useDispatch } from "react-redux";
import { Dispatch } from "@/store/store";
import { get } from "lodash-es";
import { useTonWallet } from "@tonconnect/ui-react";
import { useNavigate } from "react-router-dom";
import DialogLottery from "@/modules/spin/DialogLottery";
import useCopy from "@/hooks/useCopy";
import { toast } from "react-toastify";
import config from "@/config";

const SpinScreen = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const { account } = useGetFirstRegister();
  const { spinLottery, setIsOpenDialog } = useDispatch<Dispatch>().spinStore;
  const [numberSpin, setNumberSpin] = useState(
    account ? account.totalSpins - account.usedSpins : 0
  );
  const wallet = useTonWallet();
  const [loteryItem, setLoteryItem] = useState({ id: 0, type: "", value: "" });
  const navigate = useNavigate();
  const [copy] = useCopy(
    account ? `${config.botTele}${account.ref}` : ""
  );
  return (
    <div className="relative h-screen">
      <div className="absolute z-40 w-full">
        <ActionBar />
      </div>

      <div className="absolute -top-40 w-full flex items-center justify-center">
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

      <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        {/* {account && (
          <div
            onClick={() => {
              copy();
              toast.success("Copy successfully!");
            }}
            className="card card-compact bg-amber-500 shadow-xl p-4 mb-4 text-center text-amber-800 hover:opacity-50 cursor-pointer"
          >
            <div className="font-bold">Copy your referral link</div>
            <div className="text-nowrap text-xs">
              {config.botTele}{account.ref}
            </div>
          </div>
        )} */}

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
            onClick={async () => {
              setIsSpinning(true);
              setNumberSpin(numberSpin - 1);
              setTimeout(async () => {
                const result = await spinLottery({
                  address: get(wallet, "account.address"),
                  publicKey: get(wallet, "account.publicKey"),
                });
                setLoteryItem(result);
                setIsOpenDialog(true);
                setIsSpinning(false);
              }, 3000);
            }}
            className="hover:opacity-50 cursor-pointer"
            src={spinButton}
          ></img>
        ) : (
          <img
            onClick={() => navigate("/mission")}
            className="hover:opacity-50 cursor-pointer"
            src={inviteFriends}
          ></img>
        )}
        <div
          onClick={() => navigate(-1)}
          className="mt-2 font-bold hover:opacity-50 cursor-pointer"
        >
          No, thanks!
        </div>
      </div>
      <DialogLottery item={loteryItem} />
    </div>
  );
};

export default SpinScreen;
