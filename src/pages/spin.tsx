import spinCircle from "@/assets/game/spin-circle.png";
import pickSpin from "@/assets/game/pick-spin.png";
import spinButton from "@/assets/game/spin-button.png";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "@/store/store";
import { get } from "lodash-es";
import { useTonWallet } from "@tonconnect/ui-react";
import { useNavigate } from "react-router-dom";
import DialogLottery from "@/modules/spin/DialogLottery";
import HomeLayout from "@/modules/home/Layout";
import BaseAction from "@/components/BaseAction";
import { IInventory } from "@/types/models/lotteryItem";

const SpinScreen = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const { spinLottery } = useDispatch<Dispatch>().spinStore;
  const { handleDialog } = useDispatch<Dispatch>().actionsStore;
  const { account } = useSelector((s: RootState) => s.accountStore);
  const [numberSpin, setNumberSpin] = useState(
    account ? account.totalSpins - account.usedSpins : 0
  );
  const wallet = useTonWallet();
  const navigate = useNavigate();
  const handleSpin = async () => {
    setIsSpinning(true);
    setNumberSpin(numberSpin - 1);
    setTimeout(async () => {
      const result: IInventory = await spinLottery({
        address: get(wallet, "account.address"),
        publicKey: get(wallet, "account.publicKey"),
      });
      if (result.id) {
        handleDialog({
          isVisible: true,
          children: <DialogLottery item={result} />,
          showBackgroundDialog: false,
        });
      }
      setIsSpinning(false);
    }, 3000);
  };

  return (
    <HomeLayout hideBottom>
      <div className="relative h-full flex flex-col justify-between">
        <div className="w-full flex items-center justify-center">
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

        <div className="flex flex-col items-center py-4">
          {!numberSpin ? (
            <div className="font-lalezar text-2xl mb-4 text-center whitespace-nowrap">
              ONE FREE SPIN EVERY DAY
            </div>
          ) : (
            <div className="font-lalezar text-2xl mb-4">
              {numberSpin} SPIN AVAILABLE
            </div>
          )}
          {!!numberSpin && (
            <BaseAction onClick={handleSpin}>
              <img
                className="hover:opacity-50 cursor-pointer"
                src={spinButton}
              ></img>
            </BaseAction>
          )}
          <div
            onClick={() => navigate(-1)}
            className="mt-2 font-bold hover:opacity-50 cursor-pointer underline"
          >
            Back to home!
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default SpinScreen;
