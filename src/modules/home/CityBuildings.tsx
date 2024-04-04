import shopHouse from "@/assets/game/shop.png";
import arenaHouse from "@/assets/game/arena.png";
import BaseImage from "@/components/BaseImage";

const CityBuildings = () => {
  return (
    <div className="w-full flex justify-between absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <BaseImage width={"40%"} src={shopHouse} alt="shop" />
      <BaseImage width={"40%"} src={arenaHouse} alt="arena" />
    </div>
  );
};

export default CityBuildings;
