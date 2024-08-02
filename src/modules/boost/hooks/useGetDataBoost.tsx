import { KEY_MARITON_AMBASSADOR, XLink_2 } from "@/config";
import { BoostCardProps } from "../BoostCard";
import { toast } from "react-toastify";
import CheckInIcon from "@/assets/icons/CheckinIcon";
import RichJuniorIcon from "@/assets/icons/RichJuniorIcon";
import MrtAmbasshador from "@/assets/icons/MrtAmbasshador";
import { useMemo, useState } from "react";
import { maritonChannelLink, maritonChatLink, XLink } from "@/config";
import useCopy from "@/hooks/useCopy";
import { EDailyType } from "@/types/models/mining";
import LogoX from "@/assets/icons/LogoX";
import LogoTele from "@/assets/icons/LogoTele";
import BoostRepository from "@/api/repository/boost";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function GetDataBoost() {
  const [copy] = useCopy(KEY_MARITON_AMBASSADOR);
  const { account } = useSelector((s: RootState) => s.accountStore);
  const handelOneTimeMission = async (type: EDailyType) => {
    return await BoostRepository.oneTimeMission({
      type,
      account: account.id,
      status: "checking",
    });
  };
  const [id, setId] = useState<number>(0);
  const checkinBoosts: BoostCardProps[] = useMemo(
    () => [
      {
        sortDescription: "Boost +10% speed for 12h",
        title: "Daily Check in",
        type: EDailyType.CHECKIN,
        icon: <CheckInIcon />,
        description: "Boost +10% speed for 12h",
      },
      {
        sortDescription: "Boost +20% speed for 24h",
        description: (
          <span>
            Minimum 01 TON balance in your Wallet <br /> Boost +20% speed for
            24h
          </span>
        ),
        title: "Junior Rich Mariton",
        type: EDailyType.JUNIOR_RICH_MARITON,
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
        type: EDailyType.MARITON_AMBASSADOR,
        icon: <MrtAmbasshador />,
      },
    ],
    [copy]
  );
  const oneTimeBoosts = [
    {
      sortDescription: "Boost +30% mining speed",
      title: "Follow Mariton on X",
      description: (
        <span>
          X (Follow):{" "}
          <span
            className="underline"
            onClick={() => {
              window.open(XLink, "_blank");
            }}
          >
            {XLink}
          </span>
          <br /> Boost +30% mining speed
        </span>
      ),
      type: EDailyType.ONE_TIME_FOLLOW_X,
      icon: <LogoX className="h-10 w-10" />,
    },
    {
      sortDescription: "Boost +30% mining speed",
      title: "Like and Retweet Mariton's post on X",
      description: (
        <>
          <span className="whitespace-nowrap">Post (Like + Retweet):</span>
          <p
            className="underline"
            onClick={() => {
              window.open(XLink_2, "_blank");
            }}
          >
            {XLink}
          </p>
          Boost +30% mining speed
        </>
      ),
      type: EDailyType.ONE_TIME_LIKE_X,
      icon: <LogoX className="h-10 w-10" />,
    },
    {
      sortDescription: "Boost +30% mining speed",
      title: "Join Mariton Community",
      description: (
        <span>
          Chat (Join) :{" "}
          <span
            className="underline"
            onClick={async () => {
              window.open(maritonChatLink, "_blank");
              const res = await handelOneTimeMission(
                EDailyType.ONE_TIME_JOIN_CHAT_TELE
              );
              setId(res.data.data.id);
            }}
          >
            {maritonChatLink}
          </span>
          <br /> Boost +30% mining speed
          <span
            onClick={async () => {
              const res = await BoostRepository.oneTimeMissionCheck(id);
              console.log(res);
            }}
          >
            check
          </span>
        </span>
      ),
      type: EDailyType.ONE_TIME_JOIN_CHAT_TELE,
      icon: <LogoTele className="h-9 w-9" />,
    },
    {
      sortDescription: "Boost +30% mining speed",
      title: "Join Mariton Channel",
      description: (
        <span>
          Channel (Join):{" "}
          <span
            className="underline"
            onClick={() => {
              window.open(maritonChannelLink, "_blank");
            }}
          >
            {maritonChannelLink}
          </span>
          <br /> Boost +30% mining speed
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
