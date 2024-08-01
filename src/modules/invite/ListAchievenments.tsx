import BaseCard from "@/components/BaseCard";
import Success from "@/assets/icons/Success";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "@/store/store";
import { memo, useMemo, useState } from "react";
import { toast } from "react-toastify";
import Loading from "@/assets/icons/Loading";
import MissionAvatar from "@/components/MissionAvatar";

export default memo(function ListAchievements() {
  const [loadingButtonId, setLoadingButtonId] = useState<number | null>(null);
  const { mining } = useSelector((state: RootState) => state.miningStore);
  const { completeMissionFriend } = useDispatch<Dispatch>().miningStore;
  const level = mining?.speedLevel?.missionFriendsLevel ?? 0;
  const completeMission = async (levelUpgrade: number) => {
    if (level >= levelUpgrade) return;
    setLoadingButtonId(levelUpgrade - 1);
    const res = await completeMissionFriend({
      id: mining.id,
      data: { levelUpgrade },
    });
    setLoadingButtonId(null);
    if (res) toast.success("Mission completed");
  };
  const achievements = useMemo(() => {
    return [
      {
        title: "1 Friend",
        description: "Active Offline Mining",
        onClick: () => completeMission(1),
        icon: "",
        selected: level >= 1,
      },
      {
        title: "3 Friends",
        description: "+1% lifetime mining speed",
        onClick: () => completeMission(2),
        icon: "",
        selected: level >= 2,
      },
      {
        title: "5 Friends",
        description: "+3% lifetime mining speed",
        onClick: () => completeMission(3),
        icon: "",
        selected: level >= 3,
      },
      {
        title: "10 Friends",
        description: "+5% lifetime mining speed",
        onClick: () => completeMission(4),
        icon: "",
        selected: level >= 4,
      },
      {
        title: "20 Friends",
        description: "+10% lifetime mining speed",
        onClick: () => completeMission(5),
        icon: "",
        selected: level >= 5,
      },
      {
        title: "50 Friends",
        description: "+15% lifetime mining speed",
        onClick: () => completeMission(6),
        icon: "",
        selected: level >= 6,
      },
      {
        title: "100 Friends",
        description: "+20% lifetime mining speed",
        onClick: () => completeMission(7),
        icon: "",
        selected: level >= 7,
      },
    ];
  }, [level]);
  return (
    <div className="overflow-y-auto overflow-clip grow pt-2 overflow-x-[unset]">
      {achievements.map(({ description, onClick, title, selected }, index) => {
        const isLoading = loadingButtonId === index;
        return (
          <div key={index} className="pb-3">
            <BaseCard
              title={title}
              description={description}
              onClick={() => {
                !isLoading && onClick();
              }}
              isCustomAvatar
              avatar={<MissionAvatar index={index + 1} />}
              actionComponent={
                isLoading ? (
                  <Loading className="text-primary w-6 h-6" />
                ) : selected ? (
                  <div className="h-6 w-6">
                    <Success />
                  </div>
                ) : (
                  <div className="border border-0.5 border-solid rounded-full h-6 w-6 border-t-description"></div>
                )
              }
            ></BaseCard>
          </div>
        );
      })}
    </div>
  );
});
