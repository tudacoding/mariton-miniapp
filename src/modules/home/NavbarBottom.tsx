import newsButton from "@/assets/game/news-button.png";
import homeButton from "@/assets/game/home-button.png";
import faqButton from "@/assets/game/faq-button.png";
import BaseImage from "@/components/BaseImage";

const Navbar = () => {
  return (
    <div className="w-full font-bold text-center items-end p-4 flex justify-between absolute bottom-0 left-1/2 transform -translate-x-1/2">
      <div className="flex flex-col items-center">
        <BaseImage width={"50%"} src={newsButton} alt="news-button" />
        <div>News</div>
      </div>
      <div className="flex flex-col items-center">
        <BaseImage width={"50%"} src={homeButton} alt="home-button" />
        <div>Home</div>
      </div>
      <div className="flex flex-col items-center">
        <BaseImage width={"50%"} src={faqButton} alt="faq-button" />
        <div>FAQ</div>
      </div>
    </div>
  );
};

export default Navbar;
