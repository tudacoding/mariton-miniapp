import congrats from "@/assets/game/congrats.png";
import firstBox from "@/assets/game/first-box.png";
import spinLight from "@/assets/game/spin-light.png";
import congratsBoard from "@/assets/game/congrats-board.png";
import nextButton from "@/assets/game/next-button.png";
import { NavLink } from "react-router-dom";

const FirstCongrats = () => {
  return (
    <div className="absolute bg-stone-800/50 h-full w-full z-50 p-4 flex items-center justify-center">
      <img className="absolute animate-spin-slow" src={spinLight}></img>
      <div className="absolute flex flex-col justify-between items-center">
        <img src={congrats}></img>
        <img className="w-28" src={firstBox}></img>
        <img src={congratsBoard}></img>
        <NavLink to="/spin">
          <img
            className="w-24 animate-bounce hover:opacity-50 cursor-pointer"
            src={nextButton}
          ></img>
        </NavLink>
      </div>
    </div>
  );
};

export default FirstCongrats;
