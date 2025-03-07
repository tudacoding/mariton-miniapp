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

export default function GetDataBoost() {
  const [copy] = useCopy(KEY_MARITON_AMBASSADOR);
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
    // {
    //   sortDescription: "Boost +30% mining speed",
    //   title: "Follow Mariton on X",
    //   description: (
    //     <span>
    //       X (Follow):{" "}
    //       <span
    //         className="underline"
    //         onClick={() => {
    //           window.open(XLink, "_blank");
    //         }}
    //       >
    //         {XLink}
    //       </span>
    //       <br /> Boost +30% mining speed
    //     </span>
    //   ),
    //   type: EDailyType.ONE_TIME_FOLLOW_X,
    //   icon: <LogoX className="h-10 w-10" />,
    // },
    // {
    //   sortDescription: "Boost +30% mining speed",
    //   title: "Like and Retweet Mariton's post on X",
    //   description: (
    //     <>
    //       <span className="whitespace-nowrap">Post (Like + Retweet):</span>
    //       <p
    //         className="underline"
    //         onClick={() => {
    //           window.open(XLink_2, "_blank");
    //         }}
    //       >
    //         {XLink}
    //       </p>
    //       Boost +30% mining speed
    //     </>
    //   ),
    //   type: EDailyType.ONE_TIME_LIKE_X,
    //   icon: <LogoX className="h-10 w-10" />,
    // },
    {
      sortDescription: "Boost +30% speed for 24h",
      title: "Join Mariton Community",
      description: (
        <span>
          Chat (Join) :{" "}
          <span
            className="underline"
            onClick={async () => {
              window.open(maritonChatLink, "_blank");
            }}
          >
            Join Group here
          </span>
          <br /> Boost +30% speed for 24h
        </span>
      ),
      type: EDailyType.ONE_TIME_JOIN_CHAT_TELE,
      icon: <LogoTele className="h-9 w-9" />,
    },
    {
      sortDescription: "Boost +30% speed for 24h",
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
            Join Channel here
          </span>
          <br /> Boost +30% speed for 24h
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
