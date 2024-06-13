import logoHouse from "@/assets/air/namdvfix.gif";
import minningText from "@/assets/game/minning.png";
import BaseImage from "@/components/BaseImage";
import { NavLink } from "react-router-dom";

const AirdopBtn = () => {
    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <img
                src={minningText}
                alt="box"
                className="mb-[10px] w-[100px]" // Adds 10-pixel margin-bottom and sets the width to 50%
            />
            <NavLink className="flex justify-center" to="/airdrop-home">
                <BaseImage
                    // className="animate-bounce"
                    width={"50%"}
                    src={logoHouse}
                    alt="box"
                />
            </NavLink>
        </div>
    );
};

export default AirdopBtn;
