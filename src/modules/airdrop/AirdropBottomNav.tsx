import homeButton from "@/assets/air/air-home.png";
import boostButton from "@/assets/air/air-boost.png";
import inviteButton from "@/assets/air/air-invite.png";
import comingButton from "@/assets/air/air-coming.png";
import BaseImage from "@/components/BaseImage";
import config from "@/config";

const Navbar = () => {
    return (
        <div className="w-full font-bold text-center items-end p-4 flex justify-between absolute bottom-0 left-1/2 transform -translate-x-1/2">
            <div onClick={() => navigate("/")} className="flex flex-col items-center">
                <BaseImage width={"50%"} src={homeButton} alt="home-button" />
                <div>Home</div>
            </div>
            <div
                onClick={() => window.open(config.annoucementTelegram, "_blank")}
                className="flex flex-col items-center"
            >
                <BaseImage width={"50%"} src={boostButton} alt="news-button" />
                <div>Boost</div>
            </div>
            <div
                onClick={() => window.open(config.faq, "_blank")}
                className="flex flex-col items-center"
            >
                <BaseImage width={"50%"} src={inviteButton} alt="faq-button" />
                <div>Invite</div>
            </div>
            <div
                onClick={() => window.open(config.faq, "_blank")}
                className="flex flex-col items-center"
            >
                <BaseImage width={"50%"} src={comingButton} alt="faq-button" />
                <div>Airdrop</div>
            </div>
        </div>
    );
};

export default Navbar;
