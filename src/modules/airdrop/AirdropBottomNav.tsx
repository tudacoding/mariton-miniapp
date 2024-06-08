import homeButton from "@/assets/air/air-home.png";
import boostButton from "@/assets/air/air-boost.png";
import inviteButton from "@/assets/air/air-invite.png";
import comingButton from "@/assets/air/air-coming.png";
import BaseImage from "@/components/BaseImage";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    return (
        <div className="w-full font-bold text-center items-end p-4 flex justify-between absolute bottom-0 left-1/2 transform -translate-x-1/2">
            <div onClick={() => navigate("/")} className="flex flex-col items-center">
                <BaseImage width={"50%"} src={homeButton} alt="home-button" />
                <div>Home</div>
            </div>
            <div
                onClick={() => navigate("/boost")}
                className="flex flex-col items-center"
            >
                <BaseImage width={"50%"} src={boostButton} alt="boost-button" />
                <div>Boost</div>
            </div>
            <div
                onClick={() => navigate("/invite")}
                className="flex flex-col items-center"
            >
                <BaseImage width={"50%"} src={inviteButton} alt="invite-button" />
                <div>Invite</div>
            </div>
            <div
                onClick={() => navigate("/airdrop")}
                className="flex flex-col items-center"
            >
                <BaseImage width={"50%"} src={comingButton} alt="airdrop-button" />
                <div>Airdrop</div>
            </div>
        </div>
    );
};

export default Navbar;
