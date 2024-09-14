import { KEY_MARITON_AMBASSADOR, XLink_2 } from "@/config";
import { BoostCardProps } from "../BoostCard";
import { toast } from "react-toastify";
import CheckInIcon from "@/assets/icons/CheckinIcon";
import RichJuniorIcon from "@/assets/icons/RichJuniorIcon";
import MrtAmbasshador from "@/assets/icons/MrtAmbasshador";
import { useMemo } from "react";
import { maritonChannelLink, maritonChatLink, XLink } from "@/config";
import useCopy from "@/hooks/useCopy";
import { EDailyType } from "@/types/models/mining";
import LogoTele from "@/assets/icons/LogoTele";
import LogoX from "@/assets/icons/LogoX";
import { useDispatch } from "react-redux";
import { Dispatch } from "@/store/store";
const bonusSpeedOneTime = {
  1012: "Boost +10% speed for 12h",
  2024: "Boost +20% speed for 24h",
  1008: "Boost +10% speed for 8h",
  3024: "Boost +30% speed for 24h",
};
export default function GetDataBoost() {
  const { checkingBoost } = useDispatch<Dispatch>().miningStore;
  const [copy] = useCopy(KEY_MARITON_AMBASSADOR);
  const checkinBoosts: BoostCardProps[] = useMemo(
    () => [
      {
        sortDescription: bonusSpeedOneTime["1012"],
        title: "Daily Check in",
        type: EDailyType.CHECKIN,
        icon: <CheckInIcon />,
        description: bonusSpeedOneTime["1012"],
      },
      {
        sortDescription: bonusSpeedOneTime["2024"],
        description: (
          <span>
            Minimum 01 TON balance in your Wallet <br />{" "}
            {bonusSpeedOneTime["2024"]}
          </span>
        ),
        title: "Junior Rich Mariton",
        type: EDailyType.JUNIOR_RICH_MARITON,
        icon: <RichJuniorIcon />,
      },
      {
        sortDescription: bonusSpeedOneTime["1008"],
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
            to your Telegram name) <br /> {bonusSpeedOneTime["1008"]}
          </span>
        ),
        type: EDailyType.MARITON_AMBASSADOR,
        icon: <MrtAmbasshador />,
      },
    ],
    [copy]
  );
  const oneTimeBoosts = [
    {
      sortDescription: bonusSpeedOneTime[3024],
      title: "Follow Mariton on X",
      description: (
        <span>
          X:{" "}
          <span
            className="underline"
            onClick={() => {
              window.open(XLink, "_blank");
              checkingBoost({
                type: EDailyType.ONE_TIME_FOLLOW_X,
                bonusSpeed: 0,
                isActive: false,
              });
            }}
          >
            Follow here
          </span>
          <br /> {bonusSpeedOneTime[3024]}
        </span>
      ),
      type: EDailyType.ONE_TIME_FOLLOW_X,
      icon: <LogoX className="h-10 w-10" />,
    },
    {
      sortDescription: bonusSpeedOneTime[3024],
      title: "Like and Retweet Mariton's post",
      description: (
        <>
          <span className="whitespace-nowrap">Post: </span>
          <span
            className="underline"
            onClick={() => {
              window.open(XLink_2, "_blank");
              checkingBoost({
                type: EDailyType.ONE_TIME_LIKE_X,
                bonusSpeed: 0,
                isActive: false,
              });
            }}
          >
            Like and Retweet here
          </span>
          <br />
          {bonusSpeedOneTime[3024]}
        </>
      ),
      type: EDailyType.ONE_TIME_LIKE_X,
      icon: <LogoX className="h-10 w-10" />,
    },
    {
      sortDescription: bonusSpeedOneTime[3024],
      title: "Join Mariton Community",
      description: (
        <span>
          Chat:{" "}
          <span
            className="underline"
            onClick={async () => {
              window.open(maritonChatLink, "_blank");
            }}
          >
            Join Group here
          </span>
          <br /> {bonusSpeedOneTime[3024]}
        </span>
      ),
      type: EDailyType.ONE_TIME_JOIN_CHAT_TELE,
      icon: <LogoTele className="h-9 w-9" />,
    },
    {
      sortDescription: bonusSpeedOneTime[3024],
      title: "Join Mariton Channel",
      description: (
        <span>
          Channel:{" "}
          <span
            className="underline"
            onClick={() => {
              window.open(maritonChannelLink, "_blank");
            }}
          >
            Join Channel here
          </span>
          <br /> {bonusSpeedOneTime[3024]}
        </span>
      ),
      type: EDailyType.ONE_TIME_JOIN_CHANNEL_TELE,
      icon: <LogoTele className="h-9 w-9" />,
    },
  ];
  return {
    checkinBoosts,
    oneTimeBoosts,
  };
}
