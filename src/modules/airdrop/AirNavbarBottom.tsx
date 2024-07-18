import BaseImage from "@/components/BaseImage";
import homeButton from "@/assets/images/bottom-bar/air-home.png";
import boostButton from "@/assets/images/bottom-bar/air-boost.png";
import inviteButton from "@/assets/images/bottom-bar/air-invite.png";
import comingButton from "@/assets/images/bottom-bar/air-coming.png";
import miningButton from "@/assets/images/bottom-bar/air-mining.png";
import { useLocation, useNavigate } from "react-router-dom";

const AirNavbar = () => {
  const nav = useNavigate();
  const location = useLocation();

  const onButtonClick = (type: string) => {
    nav(type);
  };
  const routers = [
    {
      title: "Home",
      link: "/",
      image: homeButton,
      alt: "home-button",
    },
    {
      title: "Mining",
      link: "/airdrop-home",
      image: miningButton,
      alt: "mining",
    },
    {
      title: "Boost",
      link: "/boost",
      image: boostButton,
      alt: "boost-button",
    },
    {
      title: "Invite",
      link: "/invite",
      image: inviteButton,
      alt: "invite-button",
    },
    {
      title: "Airdrop",
      link: "/airdrop",
      image: comingButton,
      alt: "airdrop-button",
    },
  ];
  return (
    <div className="w-full font-bold text-center pb-2 pt-3 grid grid-cols-5">
      {routers.map((item, index) => {
        return (
          <div
            key={index}
            className="flex flex-col items-center"
            onClick={() => onButtonClick(item.link)}
          >
            <BaseImage width={"50%"} src={item.image} alt={item.alt} />
            <div
              className={item.link !== location.pathname ? "text-t-blur" : ""}
            >
              {item.title}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AirNavbar;
