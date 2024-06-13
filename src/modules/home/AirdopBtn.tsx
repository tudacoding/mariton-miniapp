import logoHouse from "@/assets/air/namdvfix.gif";
import minningText from "@/assets/game/minning.png";
import BaseImage from "@/components/BaseImage";
import { useNavigate } from "react-router-dom";
import box from "@/assets/game/box.png";

const AirdopBtn = () => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate("/airdrop-home");
      }}
      className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center bottom-[10px]"
    >
      <img
        src={minningText}
        alt="box"
        className="mb-[10px] w-[100px]" // Adds 10-pixel margin-bottom and sets the width to 50%
      />
      <BaseImage width={"70%"} src={logoHouse} alt="box" path="/airdrop-home" />
      <BaseImage width={"40%"} src={box} alt="box" className="pt-12" />
    </div>
  );
};

export default AirdopBtn;
