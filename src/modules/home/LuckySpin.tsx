import luckySpin from "@/assets/game/button-lucky-spin.png";
import mission from "@/assets/game/button-mission.png";
import { useNavigate } from "react-router-dom";

const LuckySpin = () => {
  const navigate = useNavigate();
  return (
    <div className="absolute top-16 flex items-center flex-col">
      <img
        onClick={() => navigate("/spin")}
        className="animate-pulse cursor-pointer mt-2"
        width={80}
        src={luckySpin}
      ></img>
      <img
        onClick={() => navigate("/mission")}
        className="animate-pulse cursor-pointer mt-2"
        width={60}
        src={mission}
      ></img>
    </div>
  );
};

export default LuckySpin;
