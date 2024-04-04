import BaseImage from "@/components/BaseImage";
import box from "@/assets/game/box.png";

const MysteryBox = () => {
  return (
    <div className="flex justify-center absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <BaseImage className="animate-bounce" width={"50%"} src={box} alt="box" />
    </div>
  );
};

export default MysteryBox;
