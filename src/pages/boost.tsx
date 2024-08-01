import HomeLayout from "@/modules/home/Layout";
import BaseTitleDivider from "@/components/BaseTitleDivider";
import background from "@/assets/air/short-background-body.png";
import logoTele from "@/assets/game/telegram-logo.png";
import { twMerge } from "tailwind-merge";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { toast } from "react-toastify";
import CheckInIcon from "@/assets/icons/CheckinIcon";
import RichJuniorIcon from "@/assets/icons/RichJuniorIcon";
import MrtAmbasshador from "@/assets/icons/MrtAmbasshador";
import { KEY_MARITON_AMBASSADOR } from "@/config";
import useCopy from "@/hooks/useCopy";
import { EBoostType } from "@/types/models/mining";
import BoostCard, { BoostCardProps } from "@/modules/boost/BoostCard";
import LogoX from "@/assets/icons/LogoX";

export default function Boost() {
  const { boosts } = useSelector((s: RootState) => s.miningStore);
  const [copy] = useCopy(KEY_MARITON_AMBASSADOR);

  const checkinBoosts: BoostCardProps[] = [
    {
      sortDescription: "Boost +10% speed for 12h",
      title: "Daily Check in",
      type: EBoostType.CHECKIN,
      icon: <CheckInIcon />,
      description: "Boost +10% speed for 12h",
    },
    {
      sortDescription: "Boost +20% speed for 24h",
      description: (
        <span>
          Minimum 01 TON balance in your Wallet <br /> Boost +20% speed for 24h
        </span>
      ),
      title: "Junior Rich Mariton",
      type: EBoostType.JUNIOR_RICH_MARITON,
      icon: <RichJuniorIcon />,
    },
    {
      sortDescription: "Boost +10% speed for 8h",
      title: "Mariton Ambassador",
      description: (
        <span>
          Mariton Ambassador (Add{" "}
          <span
            className="underline"
            onClick={() => {
              copy();
              toast.success("Copy!");
            }}
          >
            '{KEY_MARITON_AMBASSADOR}'
          </span>{" "}
          to your Telegram name) <br /> Boost +10% speed for 8h
        </span>
      ),
      type: EBoostType.MARITON_AMBASSADOR,
      icon: <MrtAmbasshador />,
    },
  ];
  const oneTimeBoosts = [
    {
      sortDescription: "Boost +30% lifetime mining speed",
      title: "Follow Mariton on X",
      description: (
        <span>
          X (Follow): https://x.com/mariton_game
          <br /> Boost +30% lifetime mining speed
        </span>
      ),
      type: EBoostType.ONE_TIME_MISSION,
      icon: <LogoX className="h-10 w-10" />,
    },
    {
      sortDescription: "Boost +30% lifetime mining speed",
      title: "Like and Retweet Mariton's post on X",
      description: (
        <span>
          Post (Like + Retweet):
          https://x.com/Mariton_game/status/1818542419107102893
          <br /> Boost +30% lifetime mining speed
        </span>
      ),
      type: EBoostType.ONE_TIME_MISSION,
      icon: <LogoX className="h-10 w-10" />,
    },
    {
      sortDescription: "Boost +30% lifetime mining speed",
      title: "Join Mariton Community",
      description: (
        <span>
          Chat (Join) : https://t.me/Mariton_Chat
          <br /> Boost +30% lifetime mining speed
        </span>
      ),
      type: EBoostType.ONE_TIME_MISSION,
      icon: <img src={logoTele} alt="" className="h-9 w-9" />,
    },
    {
      sortDescription: "Boost +30% lifetime mining speed",
      title: "Join Mariton Channel",
      description: (
        <span>
          Channel (Join): https://t.me/MaritonAnn
          <br /> Boost +30% lifetime mining speed
        </span>
      ),
      type: EBoostType.ONE_TIME_MISSION,
      icon: <img src={logoTele} alt="" className="h-9 w-9" />,
    },
  ];
  return (
    <HomeLayout>
      <div className="h-full flex">
        <div className="relative grow flex">
          <img
            className="w-full h-full absolute z-[-10]"
            src={background}
            alt="bg-mission-body"
          />
          <div className={twMerge("grow overflow-auto px-6", "mb-5 mt-4")}>
            <BaseTitleDivider className="pt-0">Daily Mission</BaseTitleDivider>
            {checkinBoosts.map((item, index) => {
              const { type } = item;
              const isActive = boosts.find((b) => b.type === type);
              return (
                <BoostCard
                  index={index}
                  item={item}
                  key={index}
                  isActive={!!isActive}
                />
              );
            })}
            {/* <BaseTitleDivider className="pt-1">
              One-time Misson
            </BaseTitleDivider> */}
            {/* {oneTimeBoosts.map((item, index) => {
              const { type } = item;
              const isActive = boosts.find((b) => b.type === type);
              return (
                <BoostCard
                  index={index}
                  item={item}
                  key={index}
                  isActive={!!isActive}
                />
              );
            })} */}
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
