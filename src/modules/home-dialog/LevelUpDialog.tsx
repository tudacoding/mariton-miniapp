import backgroundDialog from "@/assets/air/short-background-body.png";
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
function InforAfterLevelUp({
  mining,
  type,
  isTonUpdated,
}: {
  mining: IMining;
  type: LevelUpType;
  isTonUpdated: boolean;
}) {
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
    <div className="py-6 text-t-title text-base text-center">
      <p className=" font-bold">
        {isTon
          ? "Speed up with TON"
          : `Update your level to ${Number(level) + 1}`}
      </p>
      {isTon && isTonUpdated ? (
        <>
          <p>Increase current speed by 2x with TON</p>
          <p className="text-red-600">
            Each level can only upgrade speed once.
          </p>
        </>
      ) : (
        <>
          <div className="flex flex-row justify-center gap-1 items-center">
            <span className="pr-1">Cost</span>
            <span className="font-bold text-t-button">
              {(isTon ? tonNextCost : mrtNextCost).toFixed(3)}
            </span>
            {!isTon ? <MaritonToken /> : <TonToken />}
          </div>
          <p>
            <span>New speed: </span>
            <span className="font-bold">{newSpeed.toFixed(3)} </span>
            <span>MRT/H</span>
          </p>
        </>
      )}
    </div>
  );
}
export default function LevelUpDialog() {
  const { mining } = useSelector((s: RootState) => s.miningStore);
  const { handleDialog } = useDispatch<Dispatch>().actionsStore;
  const { levelUpMining } = useDispatch<Dispatch>().miningStore;
  const [selectedType, setSelectedType] = useState<LevelUpType>("MRT");
  const handleUpdate = async () => {
    const res = await levelUpMining({
      type: selectedType,
    });
    if (res.id) {
      toast.success("Upgraded successfully!");
      handleDialog({
        isVisible: false,
      });
    } else if (res.data.type === "NOT_ENOUGH_MRT") {
      console.log("Not enough MRT");
    } else if (res.data.type === "NOT_ENOUGH_TON") {
      console.log("Not enough TON");
    }
  };
  const isTonUpdated = useMemo(() => {
    if (mining?.speedLevel) {
      const { log, level } = mining?.speedLevel ?? {};
      return log?.[level]?.isTonUpdated;
    }
    return false;
  }, [mining.speedLevel]);

  return (
    <div className="h-fix w-fix relative">
      <img
        src={backgroundDialog}
        alt=""
        className="absolute h-full w-full z-[-5]"
      />
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
        <InforAfterLevelUp
          mining={mining}
          type={selectedType}
          isTonUpdated={isTonUpdated}
        />
      </div>
      <div className="absolute bottom-[-30px] flex flex-row justify-center w-full gap-4">
        <BaseButton
          className="!p-0 !bg-transparent"
          onClick={() =>
            handleDialog({
              isVisible: false,
            })
          }
        >
          <img src={closeButton} alt="" className="object-contain" />
        </BaseButton>
        <BaseButton
          className="!p-0 !bg-transparent"
          onClick={handleUpdate}
          disabled={isTonUpdated && selectedType === "TON"}
        >
          <img src={upgradeButton} alt="" className="object-contain" />
        </BaseButton>
      </div>
    </div>
  );
}
