import logoHouse from "@/assets/air/namdvfix.gif";
import minningText from "@/assets/game/minning.png";
import BaseImage from "@/components/BaseImage";
import { useNavigate } from "react-router-dom";

const AirdopBtn = () => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate("/airdrop-home");
      }}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
    >
      <img
        src={minningText}
        alt="box"
        className="mb-[10px] w-[100px]" // Adds 10-pixel margin-bottom and sets the width to 50%
      />
      <BaseImage width={"70%"} src={logoHouse} alt="box" path="/airdrop-home" />
    </div>
  );
};

export default AirdopBtn;
