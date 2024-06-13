import newsButton from "@/assets/game/news-button.png";
import homeButton from "@/assets/game/home-button.png";
import faqButton from "@/assets/game/faq-button.png";
import BaseImage from "@/components/BaseImage";
import config from "@/config";

const Navbar = () => {
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
    <div className="w-full font-bold text-center items-end p-4 flex justify-between absolute bottom-0 left-1/2 transform -translate-x-1/2">
      {routers.map((item, index) => {
        return (
          <div
            key={index}
            className="flex flex-col items-center opacity-1"
            onClick={item.onClick}
          >
            <BaseImage width={"50%"} src={item.image} alt={item.alt} />
            <div className={"text-t-blur"}>{item.title}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Navbar;
