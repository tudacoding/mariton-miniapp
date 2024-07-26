import levelUp from "@/assets/level-up/GIFT-level.gif";
import closeButton from "@/assets/game/close-button.png";
import upgradeButton from "@/assets/game/upgrade-button.png";
import BaseDivider from "@/components/BaseDivider";
import BaseButton from "@/components/BaseButton";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "@/store/store";
import { toast } from "react-toastify";
import { useMemo, useState } from "react";
import { IMining, LevelUpType } from "@/types/models/mining";
import { twMerge } from "tailwind-merge";
import MaritonToken from "@/assets/icons/MaritonToken";
import TonToken from "@/assets/icons/TonToken";
import BaseAction from "@/components/BaseAction";
import Loading from "@/assets/icons/Loading";
import { formatNumber } from "@/helpers";
function InforAfterLevelUp({
  mining,
  type,
  isTonUpdated,
  navigateWallet,
  notEnoughToken,
}: {
  mining: IMining;
  type: LevelUpType;
  isTonUpdated: boolean;
  notEnoughToken?: boolean;
  navigateWallet: (address: string) => void;
}) {
  const { handleDialog } = useDispatch<Dispatch>().actionsStore;

  const {
    level = 0,
    speed = 0,
    mrtNextCost = 0,
    tonNextCost = 0,
    mrtNextSpeedIncreased = 0,
  } = mining?.speedLevel ?? {};
  const isTon = type === "TON";
  const newSpeed = isTon ? speed * 2 : mrtNextSpeedIncreased + speed;
  return (
    <div>
      <div className="text-t-title text-base text-center">
        <p className=" font-bold">
          {isTon
            ? "Speed up with TON"
            : `Upgrade your level to ${Number(level) + 1}`}
        </p>
        {isTon && isTonUpdated ? (
          <p className="text-red-600 !text-sm pt-1">
            Each level can only upgrade speed once.
          </p>
        ) : (
          <>
            <div className="flex flex-row justify-center gap-1 items-center">
              <span className="pr-1">Cost:</span>
              <span className="font-bold text-t-button">
                {formatNumber(isTon ? tonNextCost : mrtNextCost, 3)}
              </span>
              {!isTon ? <MaritonToken /> : <TonToken />}
            </div>
            <p>
              <span>New speed: </span>
              <span className="font-bold">{formatNumber(newSpeed, 3)} </span>
              <span>MRT/H</span>
            </p>
          </>
        )}
      </div>
      {!(isTon && isTonUpdated) && notEnoughToken && (
        <div className="flex items-center justify-center gap-2">
          <p className="text-red-600 !text-sm">Not enough {type}!</p>
          <BaseAction
            onClick={() => {
              handleDialog({
                isVisible: false,
              });
              navigateWallet(type === "MRT" ? "/wallet-mrt" : "/wallet-ton");
            }}
            className="underline text-t-title"
          >
            Deposit
          </BaseAction>
        </div>
      )}
    </div>
  );
}
export default function LevelUpDialog({
  navigateWallet,
}: {
  navigateWallet: (address: string) => void;
}) {
  const { mining } = useSelector((s: RootState) => s.miningStore);
  const { tokensWallet } = useSelector((s: RootState) => s.accountStore);
  const { handleDialog } = useDispatch<Dispatch>().actionsStore;
  const { levelUpMining } = useDispatch<Dispatch>().miningStore;
  const [selectedType, setSelectedType] = useState<LevelUpType>("MRT");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    const res = await levelUpMining({
      type: selectedType,
    });
    if (res.id) {
      toast.success("Upgraded successfully!");
      handleDialog({
        isVisible: false,
      });
    }
    setLoading(false);
  };
  const isTonUpdated = useMemo(() => {
    if (mining?.speedLevel) {
      const { log, level } = mining?.speedLevel ?? {};
      return log?.[level]?.isTonUpdated;
    }
    return false;
  }, [mining.speedLevel]);

  const notEnoughToken = useMemo(() => {
    if (selectedType === "TON") {
      return (tokensWallet?.tonTokens ?? 0) < mining?.speedLevel?.tonNextCost;
    }
    return (tokensWallet?.mrtTokens ?? 0) < mining?.speedLevel?.mrtNextCost;
  }, [selectedType, tokensWallet, mining.speedLevel]);

  const disableButtonUpgrade = useMemo(() => {
    if (notEnoughToken) return true;
    return isTonUpdated && selectedType === "TON";
  }, [isTonUpdated, selectedType, notEnoughToken]);
  return (
    <>
      {loading && (
        <div className="h-[110%] w-full z-50 absolute flex justify-center items-center">
          <Loading className="text-[#6CA71B]" />
        </div>
      )}
      <div className="top-0 p-[30px] w-full">
        <p className="text-t-button text-center font-extrabold text-[24px]">
          LEVEL UP
        </p>
        <div className="py-2 flex w-full justify-center">
          <img src={levelUp} alt="" className="" width={"70%"} />
        </div>
        <div className="mx-auto flex justify-center gap-3 pb-4">
          <BaseButton
            className={twMerge(
              "rounded-3xl font-extrabold w-[100px]",
              selectedType === "TON"
                ? "text-t-button"
                : "bg-card text-t-description"
            )}
            onClick={() => setSelectedType("TON")}
          >
            TON
          </BaseButton>
          <BaseButton
            className={twMerge(
              "rounded-3xl font-extrabold w-[100px]",
              selectedType === "MRT"
                ? "text-t-button"
                : "bg-card text-t-description"
            )}
            onClick={() => setSelectedType("MRT")}
          >
            MRT
          </BaseButton>
        </div>
        <BaseDivider className="!h-[1px]" />
        <div className="py-6">
          <InforAfterLevelUp
            mining={mining}
            type={selectedType}
            isTonUpdated={isTonUpdated}
            notEnoughToken={notEnoughToken}
            navigateWallet={navigateWallet}
          />
        </div>
      </div>
      <div className="absolute bottom-[-20px] flex flex-row justify-center w-full gap-6">
        <BaseAction
          onClick={() =>
            handleDialog({
              isVisible: false,
            })
          }
        >
          <img src={closeButton} alt="" className="object-contain h-12" />
        </BaseAction>
        <BaseAction onClick={handleUpdate} disable={disableButtonUpgrade}>
          <img src={upgradeButton} alt="" className="object-contain h-12" />
        </BaseAction>
      </div>
    </>
  );
}
