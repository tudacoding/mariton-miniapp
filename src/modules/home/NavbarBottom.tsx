import newsButton from "@/assets/images/bottom-bar/news-button.png";
import homeButton from "@/assets/images/bottom-bar/air-home.png";
import faqButton from "@/assets/images/bottom-bar/faq-button.png";
import BaseImage from "@/components/BaseImage";
import config from "@/config";
import { twMerge } from "tailwind-merge";

const HomeNavbar = () => {
  const routers = [
    {
      title: "News",
      image: newsButton,
      alt: "news-button",
      onClick: () => window.open(config.annoucementTelegram, "_blank"),
    },
    {
      title: "Home",
      image: homeButton,
      alt: "home-button",
      onClick: () => {},
    },
    {
      title: "Invite",
      image: faqButton,
      alt: "faq-button",
      onClick: () => window.open(config.faq, "_blank"),
    },
  ];
  return (
    <div className="w-full font-bold text-center items-end p-4 absolute bottom-0 left-1/2 transform -translate-x-1/2 grid grid-cols-3 gap-2">
      {routers.map((item, index) => {
        return (
          <div
            key={index}
            className="flex flex-col items-center opacity-1"
            onClick={item.onClick}
          >
            <BaseImage
              src={item.image}
              alt={item.alt}
              className={twMerge("w-1/2", index === 1 && "w-[55%] py-1")}
            />
            <div className={"text-t-blur"}>{item.title}</div>
          </div>
        );
      })}
    </div>
  );
};

export default HomeNavbar;
