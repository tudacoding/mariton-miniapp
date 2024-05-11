import luckySpin from "@/assets/game/button-lucky-spin.png";
import { useNavigate } from "react-router-dom";

const LuckySpin = () => {
  const navigate = useNavigate();
  return (
    <div className="absolute top-16 ml-6">
      <img
        onClick={() => navigate("/spin")}
        className="animate-pulse cursor-pointer"
        width={100}
        src={luckySpin}
      ></img>
    </div>
  );
};

export default LuckySpin;
