import BaseImage from "@/components/BaseImage";
import homeButton from "@/assets/air/air-home.png";
import boostButton from "@/assets/air/air-boost.png";
import inviteButton from "@/assets/air/air-invite.png";
import comingButton from "@/assets/air/air-coming.png";
import { useLocation, useNavigate } from "react-router-dom";

const AirNavbar = () => {
  const nav = useNavigate();
  const location = useLocation();
  console.log(location);

  const onButtonClick = (type: string) => {
    nav(type);
  };
  const routers = [
    {
      title: "Home",
      link: "/airdrop-home",
      image: homeButton,
      alt: "home-button",
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
    <div className="w-full font-bold text-center p-4 flex justify-between z-[1000]">
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
