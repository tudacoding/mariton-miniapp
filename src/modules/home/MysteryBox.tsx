import BaseImage from "@/components/BaseImage";
import box from "@/assets/game/box.png";
import { NavLink } from "react-router-dom";

const MysteryBox = () => {
  return (
    <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bottom-32">
      <NavLink className="flex justify-center" to="/inventory">
        <BaseImage
          width={"40%"}
          src={box}
          alt="box"
        />
      </NavLink>
    </div>
  );
};

export default MysteryBox;
