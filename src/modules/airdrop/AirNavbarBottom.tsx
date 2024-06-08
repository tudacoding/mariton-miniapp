import BaseImage from "@/components/BaseImage";
import config from "@/config";
import homeButton from "@/assets/air/air-home.png";
import boostButton from "@/assets/air/air-boost.png";
import inviteButton from "@/assets/air/air-invite.png";
import comingButton from "@/assets/air/air-coming.png";

interface AirNavbarProps {
    onButtonClick: (buttonType: string) => void;
  }

  const AirNavbar = ({ onButtonClick }: AirNavbarProps) => {
    console.log("AirNavbar rendered"); // Debugging log
    return (
      <div className="w-full font-bold text-center items-end p-4 flex justify-between absolute bottom-0 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center" onClick={() => onButtonClick('home')}>
          <BaseImage width={"50%"} src={homeButton} alt="home-button" />
          <div>Home</div>
        </div>
        <div className="flex flex-col items-center" onClick={() => onButtonClick('boost')}>
          <BaseImage width={"50%"} src={boostButton} alt="boost-button" />
          <div>Boost</div>
        </div>
        <div className="flex flex-col items-center" onClick={() => onButtonClick('invite')}>
          <BaseImage width={"50%"} src={inviteButton} alt="invite-button" />
          <div>Invite</div>
        </div>
        <div className="flex flex-col items-center" onClick={() => onButtonClick('airdrop')}>
          <BaseImage width={"50%"} src={comingButton} alt="airdrop-button" />
          <div>Airdrop</div>
        </div>
      </div>
    );
  };

  export default AirNavbar;