import logoHouse from "@/assets/game/logo.png";
import BaseImage from "@/components/BaseImage";
import { NavLink } from "react-router-dom";

const AirdopBtn = () => {
    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <NavLink className="flex justify-center" to="/airdrop">
                <BaseImage
                    className="animate-bounce"
                    width={"50%"}
                    src={logoHouse}
                    alt="box"
                />
            </NavLink>
        </div>
    );
};

export default AirdopBtn;
